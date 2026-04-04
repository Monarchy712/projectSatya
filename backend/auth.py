from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Header
from jose import jwt, JWTError
from eth_account.messages import encode_defunct
from eth_account import Account
from config import JWT_SECRET, JWT_ALGORITHM

def create_token(data: dict) -> str:
    # token create karinge with expiry
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(minutes=1440)
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict | None:
    # token decode karke verify karinge
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError:
        return None


def verify_signature(wallet_address: str, message: str, signature: str) -> bool:
  # metamask signature check karne ke liye logic
    try:
        msg = encode_defunct(text=message)
        recovered = Account.recover_message(msg, signature=signature)
        return recovered.lower() == wallet_address.lower()
    except:
        return False


def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload
