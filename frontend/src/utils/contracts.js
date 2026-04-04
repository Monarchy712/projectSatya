import { ethers } from 'ethers';

// ── Factory Contract Address logic ──
export const FACTORY_ADDRESS = "0x14Ad25e51ccfa7Dab42Daa3f61db604D68a29305";

export const FACTORY_ABI = [
    {
        inputs: [{ internalType: "address", name: "_gov", type: "address" }],
        name: "addGovernment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            { internalType: "address[]", name: "_admins", type: "address[]" },
            { internalType: "uint256", name: "_startTime", type: "uint256" },
            { internalType: "uint256", name: "_endTime", type: "uint256" },
            { internalType: "uint256", name: "_biddingEndTime", type: "uint256" },
            { internalType: "uint256", name: "_retainedPercent", type: "uint256" },
            { internalType: "string[]", name: "_names", type: "string[]" },
            { internalType: "uint256[]", name: "_percentages", type: "uint256[]" },
            { internalType: "uint256[]", name: "_deadlines", type: "uint256[]" }
        ],
        name: "createTender",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "getAllTenders",
        outputs: [
            {
                components: [
                    { internalType: "address", name: "tender", type: "address" },
                    { internalType: "uint256", name: "startTime", type: "uint256" },
                    { internalType: "uint256", name: "endTime", type: "uint256" },
                    { internalType: "uint256", name: "biddingEndTime", type: "uint256" }
                ],
                internalType: "struct TenderFactory.TenderMeta[]",
                name: "",
                type: "tuple[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "isGovernment",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function"
    }
];

// ── Tender Contract (EIP-712 Multisig) ABI logic ──
export const TENDER_ABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "bytes[]", "name": "signatures", "type": "bytes[]" }
        ],
        "name": "executeMilestone",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentMilestone",
        "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ],
        "name": "getRoleName",
        "outputs": [ { "internalType": "string", "name": "", "type": "string" } ],
        "stateMutability": "view",
        "type": "function"
    }
];

export const TENDER_STATUS = ['BIDDING', 'ACTIVE', 'COMPLETED', 'CANCELLED'];
export const MILESTONE_STATUS = ['PENDING', 'UNDER_REVIEW', 'APPROVED'];

// Provider aur Signer helpers yahan sync logic karinge
export function getProvider() {
    return new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Qq97YUiLlpEOjydTQA3QE');
}

export async function getSigner() {
    if (!window.ethereum) throw new Error('MetaMask not installed');
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
}

// EIP-712 Signer helper for committee dashboard
export async function signMilestoneApproval(signer, tenderAddress, milestoneId) {
    const domain = {
        name: 'Tender',
        version: '1',
        chainId: 11155111,
        verifyingContract: tenderAddress,
    };
    const types = {
        Approve: [
            { name: 'milestoneId', type: 'uint256' },
            { name: 'tender', type: 'address' },
        ],
    };
    const value = { milestoneId, tender: tenderAddress };
    return await signer.signTypedData(domain, types, value);
}
