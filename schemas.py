from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class GradeSchema(BaseModel):
    student_id: int
    subject: str
    score: int
    type: str
    date: datetime

class KioskNewsSchema(BaseModel):
    top_students: List[Dict[str, str]]
    substitutions: List[str]
    announcements: List[str]

class AnalyticsReportSchema(BaseModel):
    student_name: str
    fail_probability: float
    recommendations: List[str]
    rating: float
