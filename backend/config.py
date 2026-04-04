import os
from dotenv import load_dotenv

# .env file load karinge
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")
# jwt secrets ke liye default rakha hai change me please
JWT_SECRET = os.getenv("JWT_SECRET", "fallback-secret-change-me")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")


# Blockchain aur IPFS keys yahan list honge
PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_API_SECRET = os.getenv("PINATA_API_SECRET")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
FACTORY_ADDRESS = os.getenv("FACTORY_ADDRESS")

# ML roboflow wali keys
ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL_ID = os.getenv("ROBOFLOW_MODEL_ID")
