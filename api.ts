// src/lib/api.ts

/**
 * Интерфейс для данных студента
 */
export interface GradeData {
  subject: string;
  grade: number;
  weight: number;
}

/**
 * Расчет среднего рейтинга (GPA) на основе оценок и их весов
 * @param grades Массив объектов с оценками
 */
export const calculateRating = (grades: GradeData[]): number => {
  if (!grades.length) return 0;
  
  const totalWeight = grades.reduce((acc, item) => acc + item.weight, 0);
  const weightedSum = grades.reduce((acc, item) => acc + (item.grade * item.weight), 0);
  
  const rating = weightedSum / totalWeight;
  return Number(rating.toFixed(2));
};

/**
 * Получение предсказания от ИИ (Alaman AI) на основе текущей успеваемости
 * В продакшене здесь должен быть вызов к вашему FastAPI бэкенду
 */
export const getAIPrediction = async (studentId: string): Promise<string> => {
  try {
    // Пример вызова к вашему бэкенду LyceumPy
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict/${studentId}`);
    // const data = await response.json();
    
    // Имитация задержки сети и логики ИИ-ментора
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Ожидается рост успеваемости на 15% при сохранении текущей динамики в точных науках.");
      }, 1000);
    });
  } catch (error) {
    console.error("Ошибка при получении AI прогноза:", error);
    return "Не удалось сформировать прогноз. Проверьте соединение с бэкендом.";
  }
};