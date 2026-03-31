from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import random
from datetime import datetime

from database import init_db, get_db
from ai_service import AIService
from scheduler import SchedulerService

app = FastAPI(title="Aqbobek Lyceum Portal API")

# Автоматическое создание таблиц при запуске (в Docker)
@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def read_root():
    return {"status": "success", "message": "Aqbobek Lyceum API is running."}

# --- Mock API BilimClass Emulator ---
@app.get("/api/mock/bilimclass/grades/{student_id}")
async def get_mock_grades(student_id: int):
    subjects = ["Math", "Physics", "History", "CS"]
    return [
        {
            "id": i,
            "subject": random.choice(subjects),
            "score": random.randint(30, 100),
            "type": random.choice(["SOR", "SOCH", "Current"]),
            "date": datetime.now()
        } for i in range(5)
    ]

# --- Kiosk Mode ---
@app.get("/api/kiosk/wall-newspaper")
async def get_wall_newspaper(db: Session = Depends(get_db)):
    return {
        "top_students": [
            {"name": "Алихан Е.", "points": "98.5"},
            {"name": "Мария С.", "points": "97.2"}
        ],
        "substitutions": [
            "Физика (10А) -> Каб. 201 (Замена: Иванова И.И.)",
            "Математика (11Б) -> Отмена (Учитель на семинаре)"
        ],
        "announcements": ["Хакатон AIS Hack 3.0 начнется в 10:00!", "Сбор макулатуры в пятницу."]
    }

# --- Analytics & AI ---
@app.get("/api/analytics/predict/{student_id}")
async def get_student_prediction(student_id: int, db: Session = Depends(get_db)):
    return {
        "student_id": student_id,
        "fail_probability": 0.15,
        "recommendation": "Повторите тему 'Квантовая механика' перед СОЧ."
    }

# --- Admin Actions ---
@app.post("/api/admin/teacher-sick/{teacher_id}")
async def trigger_sick_leave(teacher_id: int, db: Session = Depends(get_db)):
    notifications = SchedulerService.handle_teacher_sick(db, teacher_id)
    return {"status": "triggered", "message": "Расписание обновлено.", "notifications": notifications}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
