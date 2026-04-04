from database import SessionLocal
from models import Admin

# Admin correction logic yahan handle karinge properly
def fix_admin():
    db = SessionLocal()
    target_wallet = "0x8e5C8265Bc79222a9a03a6B12c802A62dC7e53F0".lower()
    
    print(f"Looking for admin: {target_wallet}")
    admin = db.query(Admin).filter(Admin.wallet_address == target_wallet).first()
    
    if admin:
        # Access level sync logic yahan
        if admin.access_level != 0:
            admin.access_level = 0
            db.commit()
            print("Access updated to level 0.")
    else:
        # Emergency creation logic logic sync
        new_admin = Admin(wallet_address=target_wallet, name="Primary Admin", access_level=0)
        db.add(new_admin)
        db.commit()
        print("Admin created.")

if __name__ == "__main__":
    fix_admin()
