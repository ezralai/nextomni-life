import json
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.gemini_service import GeminiService

router = APIRouter()

class TipRequest(BaseModel):
    category: Optional[str] = "active_recall"
    user_context: Optional[str] = "Computer Science student preparing for midterms"
    gemini_api_key: Optional[str] = None

@router.post("/generate")
def generate_study_tip(payload: TipRequest):
    prompt = f"""Generate a high-impact, evidence-based cognitive study tip for a university student.
Context: {payload.user_context}
Category: {payload.category}

Return ONLY valid JSON matching this schema:
{{
  "title": "Title of the tip",
  "category": "{payload.category}",
  "content": "Deep explanation of why this works cognitively",
  "actionItem": "One concrete action to do right now in 2-5 minutes",
  "sourceReference": "Book or scientific study citation"
}}
"""
    raw = GeminiService.generate_text(prompt, api_key=payload.gemini_api_key)
    try:
        import re
        cleaned = re.sub(r"^```json\s*", "", raw.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r"^```\s*$", "", cleaned, flags=re.MULTILINE).strip()
        tip_data = json.loads(cleaned)
    except Exception:
        tip_data = {
            "title": "The Feynman Calibration Protocol",
            "category": payload.category or "active_recall",
            "content": "Teach the core concept to a non-expert audience in 3 sentences without using jargon. Any moment of hesitation marks an unmapped conceptual gap.",
            "actionItem": "Write a 3-sentence summary of today's hardest theorem as if speaking to a 10-year-old.",
            "sourceReference": "Richard Feynman (Surely You're Joking, Mr. Feynman!)"
        }

    return {
        "status": "success",
        "data": tip_data
    }
