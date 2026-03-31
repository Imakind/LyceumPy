'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingDown, Award, ShieldAlert } from 'lucide-react';
import { calculateRating, getAIPrediction } from '@/lib/api';
import StudentGrades from '@/components/StudentGrades';

export default function Home() {
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [rating, setRating] = useState('0');

  useEffect(() => {
    setRating(calculateRating(88, 92));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">AQBOBEK LYCEUM</h1>
            <p className="text-slate-500 font-medium">Единый портал лицея</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {['student', 'teacher', 'admin'].map((r) => (
              <button 
                key={r}
                onClick={() => setRole(r as any)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${role === r ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Module */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <TrendingDown className="text-indigo-600" /> Успеваемость (Mock API)
              </h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{n:'ПН',s:80},{n:'ВТ',s:75},{n:'СР',s:90},{n:'ЧТ',s:85},{n:'ПТ',s:95}]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} />
                    <Tooltip contentStyle={{borderRadius:'16px', border:'none', boxShadow:'0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="s" stroke="#4f46e5" strokeWidth={4} dot={{ r: 6, fill:'#4f46e5', strokeWidth:2, stroke:'#fff' }} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {role === 'student' && (
              <StudentGrades studentId={1} />
            )}

            {role === 'teacher' && (
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold mb-6">Список группы риска</h2>
                <div className="space-y-4">
                  {[
                    {name: 'Арман К.', score: 42, reason: 'Падение тренда на 15%'},
                    {name: 'Мадина С.', score: 51, reason: 'Низкая посещаемость'}
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-rose-50 rounded-2xl border border-rose-100">
                      <div>
                        <p className="font-bold text-rose-900">{s.name}</p>
                        <p className="text-sm text-rose-600 font-medium">{s.reason}</p>
                      </div>
                      <span className="text-xl font-black text-rose-700">{s.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Modules */}
          <div className="space-y-8">
            <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><AlertCircle /> AI-Тьютор</h2>
                <div className="bg-white/10 p-6 rounded-2xl mb-6 backdrop-blur-md border border-white/10">
                  <p className="text-sm opacity-70 font-bold mb-1 uppercase tracking-wider">Вероятность завала СОЧ</p>
                  <p className="text-6xl font-black tracking-tight">15%</p>
                </div>
                <p className="text-indigo-100 leading-relaxed font-medium">
                  Твой прогноз стабилен. Пройди тест по "Квантовой механике" для закрепления материала.
                </p>
                <button className="mt-8 w-full py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-opacity-90 transition transform active:scale-95 shadow-lg">ЧАТ С АЛАМАНОМ</button>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Award className="text-amber-500"/> Лидерборд</h2>
              <div className="space-y-4">
                {[
                  {name: 'Алихан Е.', p: 98.2},
                  {name: 'Мария С.', p: 97.5},
                  {name: 'Иван И.', p: 95.0}
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-2xl font-black text-slate-200">{i+1}</span>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 leading-tight">{s.name}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase">{s.p} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {role === 'admin' && (
              <button 
                onClick={() => alert('Уведомление отправлено!')}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white p-8 rounded-[2rem] flex items-center justify-center gap-4 transition-all shadow-lg shadow-rose-100"
              >
                <ShieldAlert size={32} />
                <div className="text-left">
                  <p className="font-black text-xl leading-tight text-white uppercase">БОЛЕЗНЬ УЧИТЕЛЯ</p>
                  <p className="text-xs text-rose-100 font-bold uppercase tracking-widest opacity-80">Перестроить расписание</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
