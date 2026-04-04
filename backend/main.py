from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.citizen import router as citizen_router
from routers.wallet import router as wallet_router, contractor_router
from routers.report import router as report_router
from routers.admin_tasks import router as admin_tasks_router
from routers.tenders import router as tenders_router
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

# Backend initialization yahan logic sync karinge
app = FastAPI(
    title="Satya Transparency Platform",
    description="Authentication & transparency backend for decentralized infrastructure reporting",
    version="1.0.0",
)

# CORS logic — allow specific dev server origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all routers organized tareeke se
app.include_router(citizen_router)
app.include_router(wallet_router)
app.include_router(contractor_router)
app.include_router(report_router)
app.include_router(admin_tasks_router)
app.include_router(tenders_router)

# Custom Error Handlers — Exception ke time par bhi CORS headers ensure karinge
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Credentials": "true",
        }
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Credentials": "true",
        }
    )

@app.get("/")
def root():
    return {"status": "online", "service": "Satya Sentinel API"}

@app.get("/health")
def health():
    return {"status": "healthy"}
