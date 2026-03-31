'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertCircle, TrendingDown, Award, ShieldAlert, Cpu, Sparkles, BrainCircuit, Activity } from 'lucide-react';
import { calculateRating, getAIPrediction } from '@/lib/api';

export default function Home() {
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [rating, setRating] = useState('0');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRating(calculateRating(88, 92));
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-white/10 rounded-2xl backdrop-blur-md">
              <BrainCircuit className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 tracking-tight">
                AQBOBEK NEURAL
              </h1>
              <p className="text-slate-400 font-medium text-sm md:text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Единый AI-портал лицея
              </p>
            </div>
          </div>
          
          <div className="flex bg-white/5 p-1.5 rounded-2xl shadow-sm border border-white/10 backdrop-blur-md">
            {['student', 'teacher', 'admin'].map((r) => (
              <button 
                key={r}
                onClick={() => setRole(r as any)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                  role === r 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Dashboard Module */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-slate-100">
                  <Activity className="text-cyan-400 w-6 h-6" /> Нейро-аналитика успеваемости
                </h2>
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold tracking-wider">
                  LIVE PROJECTION
                </div>
              </div>
              
              <div className="h-72 md:h-80 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{n:'ПН',s:80},{n:'ВТ',s:75},{n:'СР',s:90},{n:'ЧТ',s:85},{n:'ПТ',s:95}]}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} dx={-10} />
                    <Tooltip 
                      contentStyle={{backgroundColor:'rgba(10,10,10,0.8)', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', color:'#fff'}}
                      itemStyle={{color: '#22d3ee'}}
                    />
                    <Area type="monotone" dataKey="s" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" activeDot={{r: 6, fill: '#050505', stroke: '#22d3ee', strokeWidth: 3}} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {role === 'teacher' && (
              <div className="bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-slate-100">
                  <AlertCircle className="text-rose-400" /> AI-мониторинг риска
                </h2>
                <div className="space-y-4">
                  {[
                    {name: 'Арман К.', score: 42, reason: 'Аномальное падение активности', risk: 'HIGH'},
                    {name: 'Мадина С.', score: 51, reason: 'Паттерн пропуска занятий', risk: 'MEDIUM'}
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gradient-to-r from-rose-500/10 to-transparent rounded-2xl border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                      <div className="mb-2 md:mb-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-slate-200 text-lg">{s.name}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${s.risk === 'HIGH' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-amber-500/20 border-amber-500/30 text-amber-400'}`}>
                            {s.risk} RISK
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">{s.reason}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-slate-500 font-bold uppercase">Predictive Score</p>
                          <span className="text-2xl font-black text-rose-400">{s.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Modules */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-b from-slate-900 to-[#050505] p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-cyan-500/5 to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Sparkles className="text-fuchsia-400 w-5 h-5"/> AI-Ассистент</h2>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl mb-6 border border-white/10 shadow-inner">
                  <p className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Вероятность завала СОЧ
                  </p>
                  <div className="flex items-end gap-3">
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 tracking-tight">15%</p>
                    <p className="text-sm text-cyan-400 font-medium mb-1.5">↓ -2.4% с прошлой недели</p>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-8 border-l-2 border-fuchsia-500/50 pl-4">
                  Нейросеть проанализировала твои ответы. Прогноз стабилен. Рекомендую пройти адаптивный тест по <span className="text-cyan-400 font-medium">"Квантовой механике"</span>.
                </p>
                
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-cyan-400 border border-cyan-500/30 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2 group-hover:border-cyan-400/50">
                  <BrainCircuit className="w-5 h-5" />
                  НАЧАТЬ AI-СЕССИЮ
                </button>
              </div>
            </div>

            <div className="bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-100"><Award className="text-amber-400 w-5 h-5"/> Нейро-Рейтинг</h2>
              <div className="space-y-4">
                {[
                  {name: 'Алихан Е.', p: 98.2, trend: 'up'},
                  {name: 'Мария С.', p: 97.5, trend: 'stable'},
                  {name: 'Иван И.', p: 95.0, trend: 'down'}
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                      {i+1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-200">{s.name}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-sm text-cyan-400 font-bold">{s.p}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {role === 'admin' && (
              <button 
                onClick={() => alert('Алгоритм перестроения расписания запущен!')}
                className="w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 p-6 md:p-8 rounded-[2rem] flex items-center justify-center gap-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] group"
              >
                <div className="p-3 bg-rose-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="font-black text-lg leading-tight uppercase tracking-wide">Emergency Protocol</p>
                  <p className="text-xs font-medium uppercase tracking-widest opacity-80 mt-1">Болезнь учителя - AI Schedule</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
