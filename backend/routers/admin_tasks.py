from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import MilestoneApproval, TenderMetadata
from auth import get_current_user

router = APIRouter(tags=["Admin & Oversight Tasks"])

class SignPayload(BaseModel):
    tender_address: str
    milestone_id: int
    signature: str

@router.get("/api/committee/signatures")
def get_sigs(tender_address: str, milestone_id: int, db: Session = Depends(get_db)):
    # sig count check karne ke liye logic
    sigs = db.query(MilestoneApproval).filter(
        MilestoneApproval.tender_address == tender_address.lower(),
        MilestoneApproval.milestone_id == milestone_id,
    ).all()
    return {"count": len(sigs), "required": 4}


@router.post("/api/committee/sign")
def sign_milestone(payload: SignPayload, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    # committee signing logic yahan aayega
    if user["role"] != "committee":
        raise HTTPException(status_code=403, detail="Sirf committee sign kar sakti hai")
    
    # store sig in DB
    return {"message": "Signature recorded!", "success": True}


@router.post("/api/admin/tender-note")
def save_note(payload: dict, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    # admin manual selection note save karinge
    if user["role"] != "super_admin":
        raise HTTPException(status_code=403, detail="Admin only access!")
    return {"message": "Note saved!"}
