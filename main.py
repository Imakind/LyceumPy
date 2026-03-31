from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import random
from datetime import datetime, timedelta

from database import init_db, get_db
from ai_service import AIService
from scheduler import SchedulerService

app = FastAPI(title="Aqbobek Lyceum Portal API")

# Настройка CORS для запросов с Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3030"], # Порты для dev и docker
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    subjects = ["Математика", "Физика", "История", "Информатика", "Английский"]
    types = ["СОР", "СОЧ", "Текущая", "ФО"]
    now = datetime.now()
    
    # Генерируем случайные оценки за последние 7 дней
    grades = []
    for i in range(5):
        days_ago = random.randint(0, 7)
        grades.append({
            "id": i,
            "subject": random.choice(subjects),
            "score": random.randint(40, 100),
            "type": random.choice(types),
            "date": (now - timedelta(days=days_ago)).strftime("%Y-%m-%d")
        })
    
    # Сортируем по дате убывания
    grades.sort(key=lambda x: x["date"], reverse=True)
    return grades

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
