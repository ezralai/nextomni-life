import time
from fastapi import APIRouter

router = APIRouter()
START_TIME = time.time()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "nextomni-ai-engine",
        "uptime_seconds": round(time.time() - START_TIME, 2),
        "version": "1.0.0",
        "engine": "FastAPI + Python 3"
    }
