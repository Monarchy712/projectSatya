"""
<<<<<<< HEAD
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
=======
Run this script once to create all tables in the Neon PostgreSQL database.
Usage: python init_db.py
"""
from database import engine, Base
from models import Admin, Contractor  # noqa: F401 — import so models register

if __name__ == "__main__":
    print("Creating tables in Neon PostgreSQL...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created successfully:")
    for table_name in Base.metadata.tables:
        print(f"  • {table_name}")
    print("\nYou can now insert admin records directly into the 'admins' table.")
    print("Use the /api/contractors/register endpoint or the UI to add contractors.")
>>>>>>> bb97d8c (full logic flow is working (hopefully))
