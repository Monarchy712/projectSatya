// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITenderFactory {
    function isGovernment(address) external view returns (bool);
}

contract Tender {

    enum TenderStatus { BIDDING, ACTIVE, COMPLETED, CANCELLED }
    enum MilestoneStatus { PENDING, UNDER_REVIEW, APPROVED }

    enum Role {
        NONE,
        ON_SITE_ENGINEER,
        COMPLIANCE_OFFICER,
        FINANCIAL_AUDITOR,
        SANCTIONING_AUTHORITY,
        CONTRACTOR,
        GOVERNMENT
    }

    address public factory;
    address public contractor;

    uint256 public startTime;
    uint256 public endTime;
    uint256 public biddingEndTime;

    uint256 public winningBid;
    uint256 public retainedPercent;

    uint256 public currentMilestone;

    TenderStatus public tenderStatus;

    address[4] public admins;
    mapping(address => Role) public roles;

    // struct for bid data
    struct Bid {
        address bidder;
        uint256 amount;
    }

    Bid[] public bids;
    mapping(address => bool) public hasBid;

    uint256 public totalFunds;

    // eip712 setup for multisig signatures
    bytes32 public DOMAIN_SEPARATOR;
    bytes32 public constant APPROVAL_TYPEHASH = keccak256("Approve(uint256 milestoneId,address tender)");

    mapping(uint256 => mapping(address => bool)) public hasSigned;
    mapping(uint256 => bool) public executed;

    struct Milestone {
        string name;
        uint256 percentage;
        uint256 deadline;
        MilestoneStatus status;
    }

    Milestone[] public milestones;

    event Funded(uint256 amount);
    event BidPlaced(address bidder, uint256 amount);
    event ContractorSelected(address contractor, uint256 bid);
    event MilestoneSubmitted(uint256 id);
    event MilestoneExecuted(uint256 id);

    modifier onlyGovernment() {
        require(ITenderFactory(factory).isGovernment(msg.sender), "Not government");
        _;
    }

    modifier onlyContractor() {
        require(msg.sender == contractor, "Not contractor");
        _;
    }

    modifier onlyActive() {
        require(tenderStatus == TenderStatus.ACTIVE, "Not active");
        _;
    }

    constructor(
        address _factory,
        address[] memory _admins,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _biddingEndTime,
        uint256 _retainedPercent,
        string[] memory _names,
        uint256[] memory _percentages,
        uint256[] memory _deadlines
    ) {
        // verify admin count and milestones
        require(_admins.length == 4, "Need 4 admins");
        require(_names.length == _percentages.length, "Invalid input");

        factory = _factory;
        admins = [_admins[0], _admins[1], _admins[2], _admins[3]];
        
        // assign roles to admins
        roles[_admins[0]] = Role.ON_SITE_ENGINEER;
        roles[_admins[1]] = Role.COMPLIANCE_OFFICER;
        roles[_admins[2]] = Role.FINANCIAL_AUDITOR;
        roles[_admins[3]] = Role.SANCTIONING_AUTHORITY;

        startTime = _startTime;
        endTime = _endTime;
        biddingEndTime = _biddingEndTime;
        retainedPercent = _retainedPercent;

        // domain separator for eip712 sigs
        uint256 chainId;
        assembly { chainId := chainid() }

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("Tender")),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );

        for (uint i = 0; i < _names.length; i++) {
            milestones.push(Milestone({
                name: _names[i],
                percentage: _percentages[i],
                deadline: _deadlines[i],
                status: MilestoneStatus.PENDING
            }));
        }

        tenderStatus = TenderStatus.BIDDING;
    }

    function placeBid(uint256 amount) external {
        // check if bidding is active
        require(tenderStatus == TenderStatus.BIDDING, "Not bidding");
        require(block.timestamp < biddingEndTime, "Ended");
        require(!hasBid[msg.sender], "Already bid");

        bids.push(Bid(msg.sender, amount));
        hasBid[msg.sender] = true;
        emit BidPlaced(msg.sender, amount);
    }

    function selectContractor(address _contractor, uint256 _winningBid) external payable onlyGovernment {
        // finalize bidder and move to active status
        require(block.timestamp >= biddingEndTime, "Not over");
        require(hasBid[_contractor], "Not bidder");
        require(msg.value == _winningBid, "Amount error");

        contractor = _contractor;
        roles[_contractor] = Role.CONTRACTOR;
        winningBid = _winningBid;
        totalFunds += msg.value;
        tenderStatus = TenderStatus.ACTIVE;

        emit ContractorSelected(_contractor, _winningBid);
    }

    function submitMilestone(uint256 id) external onlyContractor onlyActive {
        // contractor notifies milestone is done
        require(id == currentMilestone, "Wrong id");
        milestones[id].status = MilestoneStatus.UNDER_REVIEW;
        emit MilestoneSubmitted(id);
    }

    function executeMilestone(uint256 id, bytes[] calldata signatures) external {
        // multisig verification using eip712 recovered addresses
        require(id == currentMilestone, "Wrong milestone");
        require(!executed[id], "Already done");
        require(signatures.length == 4, "Signatures needed");

        bytes32 structHash = keccak256(abi.encode(APPROVAL_TYPEHASH, id, address(this)));
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, structHash));

        for (uint i = 0; i < 4; i++) {
            address signer = recover(digest, signatures[i]);
            require(!hasSigned[id][signer], "Duplicate");
            Role r = roles[signer];
            require(r != Role.NONE && r != Role.CONTRACTOR, "Invalid role for signing");
            hasSigned[id][signer] = true;
        }

        executed[id] = true;
        _payout(id);
        emit MilestoneExecuted(id);
    }

    function recover(bytes32 digest, bytes memory sig) internal pure returns (address) {
        // ecrecover helper
        bytes32 r; bytes32 s; uint8 v;
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        return ecrecover(digest, v, r, s);
    }

    function _payout(uint256 id) internal {
        // transfer funds to contractor for approved milestone
        Milestone storage m = milestones[id];
        uint256 payout = (winningBid * m.percentage) / 100;
        (bool sent,) = contractor.call{value: payout}("");
        require(sent, "Pay error");
        m.status = MilestoneStatus.APPROVED;
        currentMilestone++;
    }

    function getRoleName(address user) external view returns (string memory) {
        Role r = roles[user];
        if (r == Role.ON_SITE_ENGINEER) return "OnSiteEngineer";
        if (r == Role.COMPLIANCE_OFFICER) return "ComplianceOfficer";
        if (r == Role.FINANCIAL_AUDITOR) return "FinancialAuditor";
        if (r == Role.SANCTIONING_AUTHORITY) return "SanctioningAuthority";
        return "None";
    }

    receive() external payable {}
}
