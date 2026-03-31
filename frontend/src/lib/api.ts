import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

export const getGrades = (studentId: number) => api.get(`/api/mock/bilimclass/grades/${studentId}`);
export const getKioskData = () => api.get('/api/kiosk/wall-newspaper');
export const getAIPrediction = (studentId: number) => api.get(`/api/analytics/predict/${studentId}`);
export const triggerTeacherSick = (teacher_id: number) => api.post(`/api/admin/teacher-sick/${teacher_id}`);

export const calculateRating = (avgGrade: number, attendancePct: number) => {
  return (avgGrade * 0.7 + attendancePct * 0.3).toFixed(2);
};

export default api;
