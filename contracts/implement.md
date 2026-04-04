# 🏗️ Tender Management System (Blockchain + EIP-712 Multisig)

This system implements a **fully on-chain tender lifecycle** with **EIP-712 multisignature milestone approvals**.

---

# 📦 CONTRACTS OVERVIEW

## 1. TenderFactory
* Deploys new Tender contracts
* Tracks all tenders
* Maps users → involved tenders

## 2. Tender 
* Handles bidding, contractor selection
* Manages milestones
* Enforces multisig approval (EIP-712)

---

# 🔁 COMPLETE SYSTEM FLOW

1. Government creates tender via `TenderFactory.createTender()`
2. Government selects contractor via `Tender.selectContractor()`
3. Contractor submits milestone via `Tender.submitMilestone()`
4. Admins sign off-chain (EIP-712)
5. Anyone executes milestone via `Tender.executeMilestone()`
6. Contract finalizes and pays contractor

---

# 🏭 TENDER FACTORY FUNCTIONS

- `createTender(...)`: Government only. Creates a new Tender contract.
- `getUserTenders(address user)`: Returns all tender contracts a user is involved in.
- `getAllTenders()`: Returns all tenders created.

---

# 📜 TENDER CONTRACT FUNCTIONS

- `getRoleName(address user)`: String role for frontend display.
- `selectContractor(address _contractor, uint256 _winningBid)`: Government only. Sets contractor and activates contract.
- `submitMilestone(uint256 id)`: Contractor only. Changes status to `UNDER_REVIEW`.
- `executeMilestone(uint256 id, bytes[] signatures)`: Anyone. Verifies 4 signatures and executes milestone.

---

# 🔐 EIP-712 SIGNING

Each admin signs:
- Domain: "Tender", "1", chainId, verifyingContract.
- Types: Approve(uint256 milestoneId, address tender).

---

**End of Documentation**
