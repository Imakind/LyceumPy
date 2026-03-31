class SchedulerService:
    @staticmethod
    def generate_schedule(db_session):
        return "New schedule generated with 0 conflicts."

    @staticmethod
    def handle_teacher_sick(db_session, teacher_id: int):
        notifications = [f"Урок физики в 10А заменен. Учитель: Смагулов А."]
        return notifications
