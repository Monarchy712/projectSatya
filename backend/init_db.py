"""
Neon PostgreSQL mein saari tables create karne ke liye ye script run karinge.
Usage: python init_db.py
"""
from database import engine, Base
import models # models import karna zaroori hai tables register karne ke liye

if __name__ == "__main__":
    print("PostgreSQL tables create ho rahe hain...")
    # saari tables generate karinge
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created successfully!")
    for table in Base.metadata.tables:
        print(f"  • {table}")
    print("\nAb admin records seed karinge manually ya endpoint se.")
