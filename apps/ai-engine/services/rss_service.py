from typing import List, Dict

class RssService:
    @staticmethod
    def get_curated_feed() -> List[Dict[str, str]]:
        return [
            {
                "id": "feed-1",
                "title": "Deep Learning Architectures for Real-Time Semantic Memory",
                "summary": "Recent advances in vector indexing allow personal operating systems to recall academic notes with sub-5ms latency.",
                "source": "MIT Technology Review",
                "url": "https://technologyreview.com",
                "publishedAt": "2026-10-05T08:00:00Z",
                "category": "Artificial Intelligence"
            },
            {
                "id": "feed-2",
                "title": "Circadian Synchronization and Optimal Cognitive Study Windows",
                "summary": "Peak analytical capability occurs 2-4 hours post-waking, followed by creative associative thinking in the late afternoon.",
                "source": "Nature Neuroscience",
                "url": "https://nature.com",
                "publishedAt": "2026-10-04T14:30:00Z",
                "category": "Cognitive Health"
            },
            {
                "id": "feed-3",
                "title": "Global Fintech & Wealth Aggregation Trends: The Open Banking Horizon",
                "summary": "Unified multi-institution dashboards empower individuals to reduce unmonitored subscription leakage by up to 34%.",
                "source": "Financial Times",
                "url": "https://ft.com",
                "publishedAt": "2026-10-03T11:15:00Z",
                "category": "Personal Finance"
            }
        ]
