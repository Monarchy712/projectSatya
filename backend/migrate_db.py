from sqlalchemy import text
from database import engine

def migrate():
    # ye script database ke missing columns add karne ke liye hai
    with engine.connect() as conn:
        print("Contractors table mein naye columns add karinge...")
        cols = [
            ("registration_id", "VARCHAR"),
            ("specialty", "VARCHAR"),
            ("license_no", "VARCHAR"),
            ("location", "VARCHAR")
        ]
        for col, t in cols:
            try:
                conn.execute(text(f"ALTER TABLE contractors ADD COLUMN {col} {t};"))
                print(f"✓ Added column: {col}")
            except:
                print(f"! skip {col} (exist ho sakti hai)")
        
        # metadata table for tender notes
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS tender_metadata (
                tender_address VARCHAR PRIMARY KEY,
                selection_note VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """))

        # approvals table for multisig signs
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS milestone_approvals (
                id SERIAL PRIMARY KEY,
                tender_address VARCHAR NOT NULL,
                milestone_id INTEGER NOT NULL,
                admin_address VARCHAR NOT NULL,
                role VARCHAR NOT NULL,
                signature VARCHAR,
                signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """))

        conn.commit()
    print("Migration complete successfully!")

if __name__ == "__main__":
    migrate()
