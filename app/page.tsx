'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users,
  Activity,
  ChevronRight,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie 
} from 'recharts';
import { DATA_URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Цветовая палитра для кандидатов (согласована с Surgut Blue)
const COLORS = ['#1e3a8a', '#3b82f6', '#93c5fd', '#60a5fa', '#2563eb'];

export default function DashboardPage() {
  const [electionData, setElectionData] = useState<any[]>([]);
  const [activeLocation, setActiveLocation] = useState('городское поселение Барсово');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch(DATA_URLS.ELECTIONS_HISTORY)
      .then(res => res.json())
      .then(data => setElectionData(data))
      .catch(err => console.error("Ошибка загрузки:", err));
  }, []);

  // Выборка последних данных для активной локации
  const currentElection = useMemo(() => {
    return electionData
      .filter(e => e.location === activeLocation)
      .sort((a, b) => b.year - a.year)[0];
  }, [electionData, activeLocation]);

  if (!isMounted || !currentElection) return null;

  return (
    <div className="p-6 space-y-8 bg-surgut-gradient min-h-screen">
      {/* Шапка с выбором территории */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Сводный дашборд
          </h1>
          <p className="text-slate-500 font-medium">Анализ избирательных циклов Сургутского района</p>
        </div>
        <div className="flex bg-white/50 dark:bg-slate-900/50 p-1 rounded-xl backdrop-blur-md border border-slate-200/50">
          <select 
            value={activeLocation}
            onChange={(e) => setActiveLocation(e.target.value)}
            className="bg-transparent text-xs font-black uppercase p-2 outline-none cursor-pointer"
          >
            {Array.from(new Set(electionData.map(l => l.location))).map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Верхний ряд: Прогноз и Ключевые метрики */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Виджет прогноза (Glassmorphism) */}
        <Card className="glass-card lg:col-span-2 overflow-hidden relative border-none">
          <div className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-10">
            <Activity size={240} />
          </div>
          <CardContent className="p-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                AI Прогноз 2026
              </div>
              <div className="space-y-1">
                <h2 className="text-5xl font-black text-blue-900 dark:text-blue-400">
                  ~{currentElection.turnoutPercentage}%
                </h2>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-tighter">Ожидаемая электоральная активность</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">Статус тренда</p>
                <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase">Стабильный рост</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <TrendingUp size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Явка в реальном времени (Donut Chart) */}
        <Card className="glass-card border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Явка (текущий цикл)</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Проголосовали', value: currentElection.votedCount },
                    { name: 'Осталось', value: currentElection.totalVoters - currentElection.votedCount }
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#1e3a8a" />
                  <Cell fill="#f1f5f9" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-28">
               <span className="text-2xl font-black text-slate-800 dark:text-white">{currentElection.turnoutPercentage}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной блок: Результаты кандидатов */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Лидеры голосования
              </CardTitle>
              <span className="text-[10px] font-bold text-slate-400">{currentElection.electionTitle}</span>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentElection.candidates} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={20}>
                  {currentElection.candidates.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Дополнительная статистика */}
        <div className="space-y-6">
           {currentElection.candidates.slice(0, 3).map((c: any, i: number) => (
             <div key={i} className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:bg-white/90 dark:hover:bg-slate-800 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-900 dark:text-blue-400">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-100">{c.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{c.party || 'Самовыдвижение'}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-lg font-black text-blue-900 dark:text-blue-400">{c.percentage}%</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase">{c.votes.toLocaleString()} голосов</p>
                </div>
             </div>
           ))}
           
           <button className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-blue-500/10">
             Подробный отчет по участкам (УИК) <ChevronRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
}
