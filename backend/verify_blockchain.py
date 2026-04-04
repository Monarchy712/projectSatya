from blockchain import w3, factory_contract, FACTORY_ADDRESS, check_is_government

# Blockchain verification logic yahan handle karinge properly
def verify_blockchain():
    print(f"Connecting to Factory: {FACTORY_ADDRESS}")
    if not w3.is_connected():
        print("❌ Failed connection.")
        return

    # isGovernment role check sync
    is_gov = check_is_government("0x88adD22b0107A7C7Ac4AEBD3C70ca057A933Ae71")
    print(f"✓ Check isGovernment: {is_gov}")
    
    # Tender fetching logic yahan
    tenders = factory_contract.functions.getAllTenders().call()
    print(f"✓ Total Tenders: {len(tenders)}")

if __name__ == "__main__":
    verify_blockchain()
