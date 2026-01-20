'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MapboxDistrictMap } from "@/components/MapboxDistrictMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle2 } from "lucide-react";
import { DATA_URLS } from "@/lib/constants";

// ЗАМЕНИТЕ НА ВАШ ТОКЕН
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function TerritoriesPage() {
  const [activeLocation, setActiveLocation] = useState('городское поселение Лянтор');
  const [electionData, setElectionData] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch(DATA_URLS.ELECTIONS_HISTORY)
      .then(res => res.json())
      .then(data => setElectionData(data));
  }, []);

  // Получаем последние данные по выбранной локации
  const locationStats = useMemo(() => {
    if (!electionData.length) return null;
    // Ищем самые свежие выборы для этой локации
    const stats = electionData
      .filter(e => e.location === activeLocation)
      .sort((a, b) => b.year - a.year)[0];
    return stats;
  }, [electionData, activeLocation]);

  if (!isMounted) return null;

  return (
    <div className="p-6 space-y-6 bg-surgut-gradient min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase">
            Карта территорий
          </h1>
          <p className="text-slate-500 text-sm font-medium">Интерактивный мониторинг поселений</p>
        </div>
        <div className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg text-xs font-black uppercase">
          {activeLocation}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Блок карты */}
        <div className="lg:col-span-2 h-[500px]">
          <MapboxDistrictMap 
            activeLocation={activeLocation}
            onSelect={setActiveLocation}
            mapboxToken={MAPBOX_TOKEN}
          />
        </div>

        {/* Сайдбар с деталями выбранной территории */}
        <div className="space-y-4">
          <Card className="glass-card border-none h-full">
            <CardHeader className="bg-blue-900/5 dark:bg-blue-900/20 border-b border-blue-100/10">
              <CardTitle className="text-sm font-black uppercase text-blue-900 dark:text-blue-300">
                Сводка: {locationStats?.year || 'Нет данных'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {!locationStats ? (
                <div className="text-center text-slate-400 py-10 text-xs uppercase font-bold">
                  Выберите территорию на карте
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <StatItem 
                      icon={Users} 
                      label="Избирателей" 
                      value={locationStats.totalVoters.toLocaleString()} 
                    />
                    <StatItem 
                      icon={CheckCircle2} 
                      label="Проголосовало" 
                      value={locationStats.votedCount.toLocaleString()} 
                      color="text-emerald-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-400">Явка</span>
                      <span className="text-2xl font-black text-blue-900 dark:text-white">
                        {locationStats.turnoutPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full transition-all duration-1000" 
                        style={{ width: `${locationStats.turnoutPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3">Лидер голосования</h4>
                    {locationStats.candidates
                      .sort((a: any, b: any) => b.votes - a.votes)
                      .slice(0, 1)
                      .map((winner: any, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                            #1
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase text-slate-800 dark:text-slate-200">
                              {winner.name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold">
                              {winner.party || 'Самовыдвижение'} — {winner.percentage}%
                            </p>
                          </div>
                        </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon: Icon, label, value, color = "text-slate-800" }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1 text-slate-400">
        <Icon size={14} />
        <span className="text-[10px] font-black uppercase">{label}</span>
      </div>
      <p className={`text-lg font-black ${color}`}>{value}</p>
    </div>
  )
}
