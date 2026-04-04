from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Contractor
<<<<<<< HEAD

# ensure tables exist first
Base.metadata.create_all(bind=engine)

def seed_data():
    # ye script initial contractors add karne ke liye hai testing ke liye
    db = SessionLocal()
    try:
        # contractors data as per user requirements
=======
import uuid

# ── Step 1: Ensure tables exist ──
Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    try:
        # Contractors provided by user
>>>>>>> bb97d8c (full logic flow is working (hopefully))
        contractor_data = [
            {
                "wallet": "0x88adD22b0107A7C7Ac4AEBD3C70ca057A933Ae71",
                "name": "Arjun Infra & Coastal Works",
                "reg_id": "SAT-2026-ARJ1",
                "specialty": "Marine & Port Infrastructure",
                "license": "M-INFRA-9921-A",
                "location": "Kochi, Kerala"
            },
            {
                "wallet": "0xFd58563e290Cf1785c349357889Bbb3AB16c29a1",
                "name": "Bhoomi Earthmovers Pvt. Ltd.",
                "reg_id": "SAT-2026-BHO2",
                "specialty": "Foundation & Excavation",
                "license": "E-MOVE-5582-B",
                "location": "Ahmedabad, Gujarat"
<<<<<<< HEAD
=======
            },
            {
                "wallet": "0x8027C0067047925faAE0D5C5967B08a69a2c7883",
                "name": "Chirag Green Energy",
                "reg_id": "SAT-2026-CHI3",
                "specialty": "Solar & Wind Connectivity",
                "license": "S-WIND-8812-C",
                "location": "Jodhpur, Rajasthan"
>>>>>>> bb97d8c (full logic flow is working (hopefully))
            }
        ]

        for data in contractor_data:
            addr = data["wallet"].lower()
            existing = db.query(Contractor).filter(Contractor.wallet_address == addr).first()
            if not existing:
                c = Contractor(
                    wallet_address=addr,
                    company_name=data["name"],
                    registration_id=data["reg_id"],
                    specialty=data["specialty"],
                    license_no=data["license"],
                    location=data["location"],
<<<<<<< HEAD
                    trust_score=75.0
                )
                db.add(c)
                print(f"✓ Added: {data['name']}")
            else:
                print(f"Exists: {data['name']}")

        db.commit()
    except Exception as e:
        print(f"Seeding error: {e}")
=======
                    trust_score=75.0 # Better starting score for verified contractors
                )
                db.add(c)
                print(f"✓ Added contractor: {data['name']} ({addr})")
            else:
                print(f"- Contractor already exists: {data['name']}")

        db.commit()
    except Exception as e:
        print(f"Error seeding contractors: {e}")
>>>>>>> bb97d8c (full logic flow is working (hopefully))
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
<<<<<<< HEAD
    seed_data()
=======
    seed()
>>>>>>> bb97d8c (full logic flow is working (hopefully))
