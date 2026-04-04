from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.tenders import router as tenders_router
from routers.wallet import router as wallet_router
from routers.citizen import router as citizen_router
from routers.report import router as report_router
from routers.admin_tasks import router as admin_tasks_router

# yahan backend start hoga
app = FastAPI(
    title="Satya Transparency Platform",
    description="Authentication & transparency backend",
    version="0.0.1", # abhi version 1 nahi aaya
)


# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {"status": "online", "service": "Satya Sentinel API"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# routers mounting yahan kar karinge
app.include_router(tenders_router)
app.include_router(wallet_router)
app.include_router(citizen_router)
app.include_router(report_router)
app.include_router(admin_tasks_router)
