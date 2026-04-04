from database import SessionLocal
from models import MilestoneApproval
import json

<<<<<<< HEAD
# DB connection logic yahan check karinge properly
db = SessionLocal()
tender_addr = "0xEBff8CF2e22dB40e1d0835B51ba289Cf452E0eEf".lower()

# Signature fetching logic sync karinge
=======
db = SessionLocal()
tender_addr = "0xEBff8CF2e22dB40e1d0835B51ba289Cf452E0eEf".lower()
>>>>>>> bb97d8c (full logic flow is working (hopefully))
sigs = db.query(MilestoneApproval).filter(MilestoneApproval.tender_address == tender_addr).all()

print(f"Total signatures for {tender_addr}: {len(sigs)}")
for s in sigs:
    print(f"Milestone {s.milestone_id}: {s.admin_address} ({s.role})")

db.close()
