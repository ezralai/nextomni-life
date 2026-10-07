import json
import re
import logging
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from services.gemini_service import GeminiService

logger = logging.getLogger(__name__)

router = APIRouter()

class LifeDebriefRequest(BaseModel):
    habits_completed: Optional[int] = 18
    habits_total: Optional[int] = 21
    streak_days: Optional[int] = 14
    focus_hours: Optional[float] = 18.5
    avg_sleep_hours: Optional[float] = 7.4
    avg_readiness_score: Optional[int] = 84
    journal_excerpts: Optional[List[str]] = [
        "Finished compiler design lab early. Felt in deep flow state with 40Hz binaural beats.",
        "A bit fatigued in afternoon, sunlight walk helped restore afternoon alertness.",
        "Reflected on quarterly goals, feeling aligned and consistent."
    ]
    gemini_api_key: Optional[str] = None

class LifePromptRequest(BaseModel):
    streak_count: Optional[int] = 14
    readiness_score: Optional[int] = 85
    time_of_day: Optional[str] = "morning"
    gemini_api_key: Optional[str] = None

@router.post("/debrief")
def synthesize_life_debrief(payload: LifeDebriefRequest):
    """
    Weekly automated AI synthesis highlighting mood trends, recurring stressors,
    and psychological wins (Pillar 4: Reflective Journaling & Mind Gym).
    """
    prompt = f"""You are NextOmni Life's Chief Behavioral Scientist and Cognitive Architect.
Analyze the user's weekly LifeOS telemetry:
- Habits Completed: {payload.habits_completed} / {payload.habits_total} ({round((payload.habits_completed / max(1, payload.habits_total)) * 100, 1)}%)
- Keystone Streak: {payload.streak_days} days
- Deep Work Focus Hours: {payload.focus_hours} hrs
- Average Sleep: {payload.avg_sleep_hours} hrs
- Average Circadian Readiness: {payload.avg_readiness_score} / 100
- Reflective Journal Excerpts:
{chr(10).join(f"- {e}" for e in (payload.journal_excerpts or []))}

Return ONLY valid JSON matching this schema:
{{
  "weeklyScore": 88,
  "sentimentTrend": "Highly Focused & Resilient",
  "dominantStressors": ["Afternoon energy trough dip", "Midweek context switching"],
  "psychologicalWins": ["Maintained 14-day keystone habit streak", "18.5 deep work focus hours logged"],
  "keystoneHabitsConsistency": 85.7,
  "focusHoursCompleted": {payload.focus_hours},
  "circadianAlignmentIndex": 89,
  "actionableNudges": [
    "Anchor 20-minute outdoor sunlight walk during the 13:30 circadian trough.",
    "Maintain the 14:00 caffeine cutoff to safeguard slow-wave sleep cycles."
  ]
}}
"""
    raw = GeminiService.generate_text(prompt, api_key=payload.gemini_api_key)
    try:
        cleaned = re.sub(r"^```json\s*", "", raw.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r"^```\s*$", "", cleaned, flags=re.MULTILINE).strip()
        debrief_data = json.loads(cleaned)
    except Exception as e:
        logger.warning(f"JSON parse fallback in life debrief: {e}")
        debrief_data = {
            "weeklyScore": 89,
            "sentimentTrend": "High Flow & Strong Momentum",
            "dominantStressors": [
                "Afternoon cognitive fatigue between 14:00 and 15:30",
                "High density of deep coding commitments"
            ],
            "psychologicalWins": [
                f"Sustained {payload.streak_days}-day uninterrupted keystone streak",
                f"Clocked {payload.focus_hours} hours of high-cognition deep work sessions",
                f"Consistent restorative sleep average of {payload.avg_sleep_hours} hours"
            ],
            "keystoneHabitsConsistency": round((payload.habits_completed / max(1, payload.habits_total)) * 100, 1),
            "focusHoursCompleted": payload.focus_hours,
            "circadianAlignmentIndex": payload.avg_readiness_score,
            "actionableNudges": [
                "Schedule a 15-minute non-sleep deep rest (NSDR) or sunlight walk before starting afternoon coding blocks.",
                "Prioritize the evening gratitude log to trigger parasympathetic down-regulation before sleep."
            ]
        }

    return {
        "status": "success",
        "data": debrief_data
    }

@router.get("/prompt")
def get_motivation_prompt(streak: int = 14, readiness: int = 85, time_of_day: str = "morning"):
    """
    Dynamic, science-backed motivational prompts tailored to the user's current streak
    and circadian readiness level.
    """
    if readiness >= 80:
        readiness_context = f"High Readiness ({readiness}%): Neural substrates are primed for Cal Newport-style deep work."
        action = "Initiate a 52-minute Ultradian deep work window with 40Hz Gamma binaural beats."
    elif readiness >= 60:
        readiness_context = f"Moderate Readiness ({readiness}%): Steady state available; protect attentional bandwidth."
        action = "Tackle keystone habit execution before midday context shifts."
    else:
        readiness_context = f"Recovery Protocol ({readiness}%): High cognitive fatigue detected; prioritize restoration."
        action = "Step outside for 20 minutes of morning sunlight to reset your suprachiasmatic nucleus."

    quotes_pool = [
        {
            "quote": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
            "author": "Will Durant (interpreting Aristotle)",
            "tip": "Habit stacking works best when anchored to an established circadian landmark."
        },
        {
            "quote": "Deep work is the ability to focus without distraction on a cognitively demanding task.",
            "author": "Cal Newport",
            "tip": "Gamma 40Hz binaural beats stimulate thalamocortical synchrony, reducing wandering thoughts."
        },
        {
            "quote": "You do not rise to the level of your goals. You fall to the level of your systems.",
            "author": "James Clear (Atomic Habits)",
            "tip": "Streaks generate positive identity capital. Guard your 14-day chain from breaking."
        }
    ]

    selected = quotes_pool[streak % len(quotes_pool)]

    return {
        "status": "success",
        "data": {
            "quote": selected["quote"],
            "author": selected["author"],
            "neuroscienceTip": selected["tip"],
            "readinessContext": readiness_context,
            "suggestedAction": action,
            "streakBadge": f"{streak}-Day Keystone Streak"
        }
    }
