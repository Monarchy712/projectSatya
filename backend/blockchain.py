import os
import requests
import json
from web3 import Web3
from config import CONTRACT_ADDRESS, RPC_URL, PRIVATE_KEY, FACTORY_ADDRESS

# blockchain constants and abi
# get this from local contract files later
FACTORY_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "_gov", "type": "address"}],
        "name": "addGovernment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllTenders",
        "outputs": [
            {
                "components": [
                    {"internalType": "address", "name": "tender", "type": "address"},
                    {"internalType": "uint256", "name": "startTime", "type": "uint256"}
                ],
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

# setup web3 provider
# alchemy might need session without ssl verify in some environments
w3 = Web3(Web3.HTTPProvider(RPC_URL))

try:
    account = w3.eth.account.from_key(PRIVATE_KEY) if PRIVATE_KEY else None
    contract = w3.eth.contract(address=w3.to_checksum_address(CONTRACT_ADDRESS), abi=[]) if CONTRACT_ADDRESS else None
    factory_contract = w3.eth.contract(address=w3.to_checksum_address(FACTORY_ADDRESS), abi=FACTORY_ABI) if FACTORY_ADDRESS else None
except Exception as e:
    # silent fail for now
    contract = None
    factory_contract = None


def get_user_tenders(wallet_address: str) -> list:
    # calls factory to get tenders for user
    if not factory_contract:
        return []
    try:
        checksummed = w3.to_checksum_address(wallet_address)
        return factory_contract.functions.getUserTenders(checksummed).call()
    except:
        return []

def check_is_government(wallet_address: str) -> bool:
    # verify if wallet is gov entity
    if not factory_contract: return False
    try:
        return factory_contract.functions.isGovernment(w3.to_checksum_address(wallet_address)).call()
    except:
        return False
