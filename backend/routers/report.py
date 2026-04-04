from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from pydantic import BaseModel
from typing import List
from auth import get_current_user
from blockchain import contract, w3, account, get_identity_hash
from ml_utils import analyze_image, calculate_image_score

router = APIRouter(prefix="/api/reports", tags=["Reports"])

class ReportSubmit(BaseModel):
    contract_id: str
    cid: str
    confidence: float

@router.post("/validate")
async def validate_report(
    files: List[UploadFile] = File(...),
    user=Depends(get_current_user)
):
    # ML Validation logic yahan aayega
    # Citizen hi validate kar sakta hai reports ko
    if user.get("role") != "citizen":
        raise HTTPException(status_code=403, detail="Sirf citizens validate kar sakte hain")

    max_score = 0.0
    for file in files[:3]:
        content = await file.read()
        res = analyze_image(content)
        score = calculate_image_score(res)
        if score > max_score: max_score = score
        if max_score >= 20.0: break

    # agr score 20 se kam hai to ban kardo logic
    if max_score < 20.0:
        # yahan on-chain ban logic add karenge baad mein
        return {"success": False, "message": "AI rejected your report. Fraud detected!", "score": max_score}

    return {"success": True, "score": max_score, "message": "Construction defects verified by AI"}


@router.post("/submit")
def submit_report(payload: ReportSubmit, user=Depends(get_current_user)):
    # final report submission to blockchain
    if user.get("role") != "citizen":
        raise HTTPException(status_code=403, detail="Sirf citizens submit kar sakte hain")
    
    identity_hash = get_identity_hash(user.get("sub"))

    if not contract:
        raise HTTPException(status_code=500, detail="Blockchain Offline")

    # yahan actual tx submit karinge blockchain par
    return {"success": True, "message": "Report submitted on-chain!", "cid": payload.cid}
