import math

class AIService:
    @staticmethod
    async def get_teacher_report(teacher_id: int, student_data: list):
        return f"Отчет для учителя {teacher_id}: Успеваемость класса стабильна. Обратите внимание на 3 учеников с низким баллом по физике."

    @staticmethod
    def calculate_custom_rating(grades: list, attendance_pct: float) -> float:
        if not grades: return 0.0
        avg_grade = sum([g.score for g in grades]) / len(grades)
        rating = (avg_grade * 0.7) + (attendance_pct * 0.3)
        return round(rating, 2)

    @staticmethod
    def predict_soch_fail(grades: list) -> float:
        if len(grades) < 3: return 0.1
        recent_scores = [g.score for g in grades[-3:]]
        avg = sum(recent_scores) / 3
        prob = 1 / (1 + math.exp((avg - 40) / 10))
        return round(prob, 2)
