from pydantic import BaseModel, field_validator
from typing import Optional, List
import re

# ── Aadhaar (Citizen) ──

class AadhaarSendOTP(BaseModel):
    aadhaar_number: str

    @field_validator("aadhaar_number")
    @classmethod
    def validate_aadhaar(cls, v):
        # space trim karke check karenge digits
        cleaned = re.sub(r"\s+", "", v)
        if not re.match(r"^\d{12}$", cleaned):
            raise ValueError("Aadhaar number exactly 12 digits honi chahiye")
        return cleaned


class WalletConnect(BaseModel):
    wallet_address: str

    @field_validator("wallet_address")
    @classmethod
    def validate_address(cls, v):
        if not re.match(r"^0x[a-fA-F0-9]{40}$", v):
            raise ValueError("Invalid Ethereum address")
        return v.lower()


class WalletVerify(BaseModel):
    wallet_address: str
    signature: str



# ── Tender Data (from Blockchain) ──

class BidData(BaseModel):
    bidder: str
    amount: str


class MilestoneData(BaseModel):
    name: str
    percentage: int
    deadline: int
    status: int
    signatures_collected: int
    is_executed: bool
