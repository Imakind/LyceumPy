'use client';

import React, { useEffect, useState } from 'react';

interface Grade {
  id: number;
  subject: string;
  score: number;
  type: string;
  date: string;
}

export default function StudentGrades({ studentId }: { studentId: number }) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // В Docker бэкенд пробрасывается на 8080 порт хоста
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    
    fetch(`${apiUrl}/api/mock/bilimclass/grades/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        return res.json();
      })
      .then((data) => {
        setGrades(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex justify-center items-center h-48">
        <div className="animate-pulse text-indigo-400 font-bold tracking-widest">ЗАГРУЗКА ОЦЕНОК...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="text-rose-500 font-medium">Не удалось загрузить оценки: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Оценки за последнюю неделю (Mock API)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
              <th className="pb-4 font-bold">Дата</th>
              <th className="pb-4 font-bold">Предмет</th>
              <th className="pb-4 font-bold">Тип работы</th>
              <th className="pb-4 font-bold text-right">Балл</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 text-slate-500 font-medium">{grade.date}</td>
                <td className="py-4 font-bold text-slate-700">{grade.subject}</td>
                <td className="py-4 text-slate-500">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">
                    {grade.type}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className={`inline-flex justify-center items-center w-10 h-10 rounded-xl text-sm font-black shadow-sm ${
                    grade.score >= 85 ? 'bg-emerald-100 text-emerald-700' :
                    grade.score >= 60 ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {grade.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
