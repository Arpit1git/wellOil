import React from 'react';
import {
  Activity,
  Compass,
  AlertTriangle,
  ShieldCheck,
  FileText,
  TrendingDown,
  TrendingUp,
  Layers,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sliders,
  DollarSign
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { DRILLING_ANALYTICS_KPIS, OFFSET_WELLS } from '../data/mockData';

export default function OverviewDashboard({
  activeWell,
  liveTelemetry,
  alerts,
  offsetWells,
  setActiveTab,
  onSelectWell,
  simulatedDepthOffset,
  onOpenReportModal
}) {
  const currentDepth = (activeWell.currentDepth + simulatedDepthOffset).toFixed(1);
  const criticalAlert = alerts.find(a => a.severity === 'CRITICAL') || alerts[0];

  // Days vs Depth Progress Curve Benchmark Data
  const progressCurveData = [
    { day: 0, depthNHK542: 0, depthNHK519: 0, depthMRN104: 0, depthPlanned: 0 },
    { day: 10, depthNHK542: 950, depthNHK519: 920, depthMRN104: 860, depthPlanned: 900 },
    { day: 20, depthNHK542: 1750, depthNHK519: 1650, depthMRN104: 1520, depthPlanned: 1700 },
    { day: 30, depthNHK542: 2450, depthNHK519: 2300, depthMRN104: 2150, depthPlanned: 2400 },
    { day: 40, depthNHK542: 2950, depthNHK519: 2850, depthMRN104: 2700, depthPlanned: 2950 },
    { day: 49, depthNHK542: 3248, depthNHK519: 3100, depthMRN104: 2950, depthPlanned: 3200 },
    // Historical offset well curves showing flatline during NPT events
    { day: 60, depthNHK542: null, depthNHK519: 3292, depthMRN104: 3305, depthPlanned: 3600 },
    { day: 70, depthNHK542: null, depthNHK519: 3680, depthMRN104: 3305, depthPlanned: 3850 },
    { day: 80, depthNHK542: null, depthNHK519: 3890, depthMRN104: 3750, depthPlanned: 3850 },
    { day: 88, depthNHK542: null, depthNHK519: 3890, depthMRN104: 4020, depthPlanned: 3850 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Key KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Well MD */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Current Bit Depth</span>
            <div className="text-2xl font-black font-mono text-oil-700 mt-0.5">
              {currentDepth} <span className="text-xs font-normal text-slate-500">m MD</span>
            </div>
            <div className="text-xs text-amber-700 font-semibold mt-1">
              Barail Coal-Shale Horizon
            </div>
          </div>
          <div className="p-3 bg-oil-50 text-oil-600 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2: Impending Hazard Horizon */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Look-Ahead Risk Horizon</span>
            <div className="text-2xl font-black font-mono text-rose-600 mt-0.5">
              +31.6 <span className="text-xs font-normal text-slate-500">m Ahead</span>
            </div>
            <div className="text-xs text-rose-700 font-semibold mt-1">
              Loss Zone (3,280-3,310m)
            </div>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* KPI 3: Offset Intelligence Scope */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Correlated Offsets</span>
            <div className="text-2xl font-black font-mono text-slate-800 mt-0.5">
              {offsetWells.length} <span className="text-xs font-normal text-slate-500">Wells</span>
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              96% Max Stratigraphy Match
            </div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4: Prevented NPT Savings */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Avoided NPT / Savings</span>
            <div className="text-2xl font-black font-mono text-emerald-700 mt-0.5">
              32.0 <span className="text-xs font-normal text-slate-500">Hrs</span>
            </div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">
              ₹48.5 Lakhs Est. Savings
            </div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Look-Ahead Depth Corridor & Days vs Depth Benchmarking */}
        <div className="lg:col-span-7 space-y-6">
          {/* Depth Look-Ahead Horizon Strip */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-oil-600" />
                  Look-Ahead Stratigraphic Hazard Corridor
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time wellbore projection showing impending formation hazards
                </p>
              </div>

              <button
                onClick={() => setActiveTab('correlation')}
                className="text-xs text-oil-600 font-semibold hover:underline flex items-center gap-1"
              >
                Full Cross-Section <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Depth Progression Bar */}
            <div className="relative pt-6 pb-2">
              <div className="h-6 bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex">
                <div style={{ width: '40%' }} className="bg-slate-300 text-[10px] font-bold text-slate-700 flex items-center justify-center">
                  Drilled (0-2950m)
                </div>
                <div style={{ width: '25%' }} className="bg-oil-200 text-[10px] font-bold text-oil-900 flex items-center justify-center">
                  Barail Drilled
                </div>
                <div style={{ width: '15%' }} className="bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  ⚠️ Hazard (3280-3310m)
                </div>
                <div style={{ width: '20%' }} className="bg-slate-200 text-[10px] font-bold text-slate-500 flex items-center justify-center">
                  Kopili / TD (3850m)
                </div>
              </div>

              {/* Bit Depth Marker Pin */}
              <div
                className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                style={{ left: '65%' }}
              >
                <span className="px-2 py-0.5 bg-oil-700 text-white rounded text-[10px] font-mono font-bold shadow-md">
                  Bit: {currentDepth}m
                </span>
                <div className="w-0.5 h-4 bg-oil-700"></div>
              </div>
            </div>

            {/* Quick Corridor Alert Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-lg">
                <div className="flex items-center gap-1.5 font-bold text-rose-950">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Loss Zone: 3,280m – 3,310m</span>
                </div>
                <p className="text-slate-600 text-[11px] mt-1">
                  140-600 bbl mud losses in NHK-519 & JRJ-88. Pre-treat 30 ppb LCM.
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Kick Zone: 3,420m – 3,450m</span>
                </div>
                <p className="text-slate-600 text-[11px] mt-1">
                  Pore pressure ramp at Kopili top. NHK-488 took 15 bbl gas kick.
                </p>
              </div>
            </div>
          </div>

          {/* Days vs Depth Progress Curve Benchmark (Recharts) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Drilling Progress (Days vs Depth Curve Benchmark)
                </h3>
                <p className="text-xs text-slate-500">
                  Active NHK-542 vs historical offset wells (showing avoided flatline NPT periods)
                </p>
              </div>

              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                18.4% Ahead of Schedule
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressCurveData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" label={{ value: 'Days Since Spud', position: 'insideBottomRight', offset: -5, fontSize: 10 }} tick={{ fontSize: 11 }} />
                  <YAxis label={{ value: 'Depth (m MD)', angle: -90, position: 'insideLeft', fontSize: 10 }} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Line type="monotone" dataKey="depthNHK542" name="Active NHK-542 (AI Assisted)" stroke="#026bc7" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="depthPlanned" name="Planned Trajectory" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Line type="monotone" dataKey="depthNHK519" name="Offset NHK-519 (2023 - Mud Loss)" stroke="#ef4444" strokeWidth={1.5} />
                  <Line type="monotone" dataKey="depthMRN104" name="Offset MRN-104 (2020 - Stuck Pipe)" stroke="#f59e0b" strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Top Alert & Prescriptive SOP + Quick Offset List */}
        <div className="lg:col-span-5 space-y-6">
          {/* Critical Early Warning Card */}
          <div className="bg-white p-5 rounded-xl border-2 border-rose-400 shadow-md space-y-3 bg-gradient-to-b from-rose-50/40 to-white">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wide">
                Critical Early Warning (31.6m Ahead)
              </span>
              <span className="font-mono text-xs text-rose-700 font-bold">
                94.2% AI Confidence
              </span>
            </div>

            <h4 className="font-bold text-slate-900 text-sm leading-snug">
              {criticalAlert.title}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              Offset well <strong>NHK-519</strong> lost 140 bbls at 3,292m in Barail coal sequence. ECD must not exceed 1.33 SG.
            </p>

            {/* Prescriptive SOP Action Steps */}
            <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-300 space-y-2 text-xs">
              <div className="font-bold text-emerald-950 flex items-center justify-between">
                <span>Recommended Prescriptive SOP:</span>
                <span className="text-[10px] font-mono text-emerald-700">OIL-SOP-DRL-408</span>
              </div>
              <ul className="list-disc list-inside text-emerald-900 space-y-1 text-[11px] font-medium">
                <li>Pre-treat suction pit with 30 ppb blended LCM before 3,275m.</li>
                <li>Cap pump flow to 460 GPM to keep ECD &le; 1.33 SG.</li>
                <li>Keep 150 bbl heavy pill on standby in Tank #3.</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveTab('mitigation')}
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>Execute Prescriptive Mitigation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Offset Radar Preview */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-oil-600" />
                Nearby Offset Wells (Naharkatiya)
              </h3>
              <button
                onClick={() => setActiveTab('map')}
                className="text-xs text-oil-600 font-semibold hover:underline flex items-center gap-1"
              >
                Full Radar Map <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {offsetWells.slice(0, 3).map(well => (
                <div
                  key={well.id}
                  onClick={() => onSelectWell(well)}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 font-mono flex items-center gap-2">
                      <span>{well.name}</span>
                      <span className="text-[10px] font-bold text-oil-700 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                        {well.similarityScore}% Match
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {well.distanceKm} km away • TD: {well.totalDepth}m
                    </div>
                  </div>

                  <span className="text-oil-600 font-semibold text-[11px] flex items-center gap-0.5 hover:underline">
                    Dossier <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
