from fastapi import APIRouter, HTTPException
from typing import List
from blockchain import get_all_tenders_aggregated, get_tender_details
from schemas import TenderDetail, MessageResponse

router = APIRouter(prefix="/api/tenders", tags=["Tenders"])

@router.get("/list", response_model=List[TenderDetail])
def list_tenders():
    # Blockchain se saare tenders (milestones and bids) ki list fetch kar rahe hain
    try:
        data = get_all_tenders_aggregated()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch aggregated tender data: {str(e)}")

@router.get("/{address}", response_model=TenderDetail)
def get_tender(address: str):
    # Kisi specific tender ki details nikaalne ke liye yeh endpoint use hota hai
    try:
        data = get_tender_details(address)
        return data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Tender not found or sync failed: {str(e)}")
