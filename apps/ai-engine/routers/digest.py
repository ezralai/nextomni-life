from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from services.rss_service import RssService

router = APIRouter()

class DigestRequest(BaseModel):
    user_name: Optional[str] = "Ezra"
    active_courses: Optional[List[str]] = ["Distributed Systems", "Applied Machine Learning"]

@router.post("/synthesize")
def synthesize_digest(payload: DigestRequest):
    headlines = RssService.get_curated_feed()
    
    return {
        "status": "success",
        "data": {
            "greeting": f"Good morning, {payload.user_name}. Your cognitive bandwidth is primed for analytical focus.",
            "quoteOfTheDay": "Excellence is not an act, but a habit. We are what we repeatedly execute.",
            "priorities": [
                f"Review {payload.active_courses[0] if payload.active_courses else 'Primary Course'} core modules (9:00 AM peak window)",
                "Audit pending eWallet & Maybank monthly expense totals",
                "Log evening circadian recovery metrics & reflection"
            ],
            "topHeadlines": headlines
        }
    }
