import os
import sys
import time

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Clean sys.path to ensure strict isolation from parent directories
sys.path = [CURRENT_DIR] + [p for p in sys.path if p and "frontend folder" not in p and p != CURRENT_DIR]

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import health, statements, tips, digest, life

app = FastAPI(
    title="NextOmni AI & Compute Microservice",
    description="Dedicated microservice for statement OCR, cognitive tip generation, intel synthesis, and LifeOS debriefs.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup for Next.js BFF
allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, tags=["Health"])
app.include_router(life.router, prefix="/api/v1/life", tags=["LifeOS Behavioral Intelligence"])
app.include_router(statements.router, prefix="/api/v1/statements", tags=["Statement OCR"])
app.include_router(tips.router, prefix="/api/v1/tips", tags=["Cognitive Tips"])
app.include_router(digest.router, prefix="/api/v1/digest", tags=["Intel Digest"])

@app.get("/")
def root():
    return {
        "microservice": "NextOmni AI Compute Engine",
        "status": "online",
        "docs": "/docs",
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
