import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Admin, Contractor
from schemas import WalletConnect, WalletVerify, NonceResponse, TokenResponse

from auth import create_token, verify_signature

router = APIRouter(prefix="/api/auth/wallet", tags=["Wallet Auth"])

@router.post("/connect", response_model=NonceResponse)
def wallet_connect(payload: WalletConnect, db: Session = Depends(get_db)):
    # step 1: metamask connection. nonce return karinge
    address = payload.wallet_address.lower()
    
    # check if gov or contractor or committee
    # logic abhi simple rakha hai, next turns mein expand karinge
    
    nonce = secrets.token_hex(16)
    return NonceResponse(nonce=nonce, message=f"Sign this: {nonce}", role="admin")


@router.post("/verify", response_model=TokenResponse)
def wallet_verify(payload: WalletVerify, db: Session = Depends(get_db)):
  # step 2: signature verify karke token dena hai
    address = payload.wallet_address.lower()
    
    # yahan actual verification logic aayega
    token = create_token({"sub": address, "role": "admin", "wallet": address})
    
    return TokenResponse(
        access_token=token, 
        role="admin", 
        name="Admin User", 
        redirect_path="/admin"
    )
