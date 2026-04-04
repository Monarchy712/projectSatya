from database import SessionLocal
from models import MilestoneApproval
from blockchain import execute_milestone_with_signatures, is_milestone_executed

# Contract finalization logic yahan handle karinge properly
def run_finalize():
    db = SessionLocal()
    tender_addr = "0xEBff8CF2e22dB40e1d0835B51ba289Cf452E0eEf".lower()
    milestone_id = 0
    
    # 1. On-chain execution check logic
    if is_milestone_executed(tender_addr, milestone_id):
        print("Milestone sync complete on blockchain.")
        return

    # 2. Signature collection logic yahan
    sigs = db.query(MilestoneApproval).filter(
        MilestoneApproval.tender_address == tender_addr,
        MilestoneApproval.milestone_id == milestone_id
    ).all()
    
    if len(sigs) >= 4:
        sig_list = [s.signature for s in sigs[:4]]
        # On-chain execution trigger yahan sync karinge
        tx = execute_milestone_with_signatures(tender_addr, milestone_id, sig_list)
        print(f"Success! Tx Hash: {tx.hash}")
    else:
        print(f"Not enough signatures (got {len(sigs)})")
    
    db.close()

if __name__ == "__main__":
    run_finalize()
