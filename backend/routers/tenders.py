from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
# yahan logic placeholder hai, check karinge dher dher
router = APIRouter(prefix="/tenders", tags=["Tenders"])

@router.get("/")
def get_all_tenders():
  # return list of tenders later
    return {"message": "Tenders list aayegi yahan"}

@router.get("/{tender_address}")
def get_tender_detail(tender_address: str):
    return {"address": tender_address, "status": "active"}
