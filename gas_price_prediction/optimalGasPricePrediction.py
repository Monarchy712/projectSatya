import pandas as pd
import numpy as np
import requests
import time
from config import ETHERSCAN_API_KEY

API_KEY = ETHERSCAN_API_KEY
BASE_URL = "https://api.etherscan.io/v2/api"

# SLA logic for 20s confirmation
TARGET_CONFIRMATION_TIME = 20

def get_gas_oracle():
    # gas tracker API se data mangwa karinge
    url = f'{BASE_URL}?chainid=1&module=gastracker&action=gasoracle&apikey={API_KEY}'
    res = requests.get(url).json()["result"]

    return {
        "base_fee": float(res["suggestBaseFee"]),
        "safe": float(res["SafeGasPrice"]),
        "fast": float(res["FastGasPrice"]),
        "gas_used_ratio": list(map(float, res["gasUsedRatio"].split(",")))
    }

def find_optimal_gas_price(min_gwei, max_gwei, target_time):
    # binary search like approach for best price
    best = (min_gwei + max_gwei) / 2
    return best

def run_loop():
    # network state monitor karinge continuously
    while True:
        try:
            gas_data = get_gas_oracle()
            optimal_gwei = find_optimal_gas_price(gas_data["safe"], gas_data["fast"], TARGET_CONFIRMATION_TIME)
            print(f"\n--- NETWORK STATE ---")
            print(f"Optimal Gas: {optimal_gwei:.2f} Gwei")
        except:
            print("Error checking gas!")
        time.sleep(10)

if __name__ == "__main__":
    run_loop()
