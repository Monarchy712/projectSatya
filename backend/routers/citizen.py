from fastapi import APIRouter, HTTPException
from schemas import AadhaarSendOTP, AadhaarVerifyOTP, TokenResponse, MessageResponse
from auth import create_token
from blockchain import contract, get_identity_hash

router = APIRouter(prefix="/api/auth/aadhaar", tags=["Citizen Auth"])

# OTP hamesha 5334 hi rahega testing ke liye
VALID_OTP = "5334"

# In-memory sessions store karinge temporary
_otp_sessions: set[str] = set()


@router.post("/send-otp", response_model=MessageResponse)
def send_otp(payload: AadhaarSendOTP):
    # cleaned aadhaar number nikalenge
    cleaned = payload.aadhaar_number.replace(" ", "")
    
    # logic simple hai: session add karo aur masked response bhejo
    _otp_sessions.add(cleaned)
    masked = "XXXX-XXXX-" + cleaned[-4:]
    
    return MessageResponse(
        message=f"OTP sent to mobile linked with Aadhaar {masked}",
        success=True,
    )


@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(payload: AadhaarVerifyOTP):
    # OTP verify karke citizen token dena hai
    cleaned = payload.aadhaar_number.replace(" ", "")

    if cleaned not in _otp_sessions:
        raise HTTPException(status_code=400, detail="Pehle OTP request karinge")

    if payload.otp != VALID_OTP:
        raise HTTPException(status_code=400, detail="Wrong OTP. Try again!")

    _otp_sessions.discard(cleaned)

    # citizen role assign karinge token mein
    token = create_token({
        "sub": cleaned,
        "role": "citizen",
        "aadhaar_last4": cleaned[-4:],
    })

    return TokenResponse(
        access_token=token,
        role="citizen",
        name=f"Citizen •••• {cleaned[-4:]}",
    )
