import sys
import os
import unittest

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
AI_ENGINE_DIR = os.path.dirname(CURRENT_DIR)
sys.path.insert(0, AI_ENGINE_DIR)

from fastapi.testclient import TestClient
from main import app

class TestLifeEngine(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn(data["status"], ["healthy", "ok"])

    def test_life_motivation_prompt(self):
        response = self.client.get("/api/v1/life/prompt?streak=14&readiness=85&time_of_day=morning")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["status"], "success")
        data = body["data"]
        self.assertIn("quote", data)
        self.assertIn("author", data)
        self.assertIn("neuroscienceTip", data)
        self.assertIn("14-Day Keystone Streak", data["streakBadge"])

    def test_life_debrief_synthesis(self):
        payload = {
            "habits_completed": 19,
            "habits_total": 21,
            "streak_days": 14,
            "focus_hours": 18.5,
            "avg_sleep_hours": 7.4,
            "avg_readiness_score": 88,
            "journal_excerpts": [
                "Hit flow state with binaural soundscape.",
                "Crushed algorithm revision."
            ]
        }
        response = self.client.post("/api/v1/life/debrief", json=payload)
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["status"], "success")
        data = body["data"]
        self.assertIn("weeklyScore", data)
        self.assertIn("psychologicalWins", data)
        self.assertIn("actionableNudges", data)
        self.assertTrue(len(data["actionableNudges"]) >= 1)

if __name__ == "__main__":
    unittest.main()
