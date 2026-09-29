import React, { useState } from 'react';
import {
  Layers,
  AlertTriangle,
  Flame,
  ArrowDown,
  Info,
  CheckCircle2,
  TrendingDown,
  Activity,
  Sliders,
  Sparkles,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { STRATIGRAPHY_MASTER, DEPTH_CORRELATION_TRACKS } from '../data/mockData';

export default function DepthCorrelationLog({
  activeWell,
  onNavigateToAlert,
  simulatedDepthOffset
}) {
  const [selectedFormationId, setSelectedFormationId] = useState('ALL');
  const [hoveredDepth, setHoveredDepth] = useState(null);
  const [logScale, setLogScale] = useState('NORMAL'); // NORMAL or EXPANDED

  const currentDepth = activeWell.currentDepth + simulatedDepthOffset;

  return (
    <div className="space-y-6">
      {/* Header Summary Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-50 text-purple-700 rounded-lg">
              <Layers className="w-5 h-5 text-purple-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Multi-Well Depth & Stratigraphic Correlation Engine
              </h2>
              <p className="text-xs text-slate-500">
                Correlating real-time wellbore trajectory with offset lithology logs, pore pressure regimes & historical hazard intervals
              </p>
            </div>
          </div>
        </div>

        {/* Legend / Status Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Current Horizon: Barail Coal-Shale (3,248m)</span>
          </div>
          <div className="bg-rose-50 border border-rose-300 text-rose-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Hazard Window: 3,280m - 3,310m</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Track Correlation Log Board */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Track Headers Strip */}
        <div className="bg-slate-100 border-b border-slate-200 p-3 grid grid-cols-12 gap-2 text-xs font-bold text-slate-700 text-center select-none">
          <div className="col-span-1 text-slate-900 flex items-center justify-center gap-1">
            <span>Depth (MD)</span>
          </div>
          <div className="col-span-2 text-slate-900 flex items-center justify-center gap-1">
            <span>Stratigraphy & Lithology</span>
          </div>
          <div className="col-span-3 bg-oil-50/80 text-oil-900 border border-oil-200 rounded py-1 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Active: NHK-542 (eRTMAC Live)</span>
          </div>
          <div className="col-span-2 bg-slate-200/70 rounded py-1 text-slate-800">
            <span>Offset NHK-519 (1.4km)</span>
          </div>
          <div className="col-span-2 bg-slate-200/70 rounded py-1 text-slate-800">
            <span>Offset MRN-104 (4.1km)</span>
          </div>
          <div className="col-span-2 bg-slate-200/70 rounded py-1 text-slate-800">
            <span>Historical Incidents & Risks</span>
          </div>
        </div>

        {/* Depth Correlation Rows */}
        <div className="divide-y divide-slate-100 max-h-[680px] overflow-y-auto">
          {DEPTH_CORRELATION_TRACKS.map((track, idx) => {
            const isDrilled = track.depth <= currentDepth;
            const isCurrent = Math.abs(track.depth - currentDepth) < 25;
            const isHazard = track.isImminentHazard;
            const isFutureHazard = track.isFutureHazard;

            return (
              <div
                key={track.depth}
                onMouseEnter={() => setHoveredDepth(track.depth)}
                onMouseLeave={() => setHoveredDepth(null)}
                className={`grid grid-cols-12 gap-2 p-2.5 items-center text-xs transition-colors ${
                  isCurrent
                    ? 'bg-oil-50/90 border-y-2 border-oil-500 shadow-inner'
                    : isHazard
                    ? 'bg-rose-50/60 hover:bg-rose-50'
                    : isFutureHazard
                    ? 'bg-amber-50/40 hover:bg-amber-50'
                    : idx % 2 === 0
                    ? 'bg-white hover:bg-slate-50'
                    : 'bg-slate-50/50 hover:bg-slate-100/50'
                }`}
              >
                {/* 1. Depth Marker Column */}
                <div className="col-span-1 text-center font-mono">
                  <div className={`font-bold ${isCurrent ? 'text-oil-700 text-sm' : 'text-slate-800'}`}>
                    {track.depth}m
                  </div>
                  {isCurrent && (
                    <span className="inline-block px-1.5 py-0.2 bg-oil-600 text-white rounded text-[9px] font-bold tracking-tight">
                      BIT DEPTH
                    </span>
                  )}
                  {isHazard && (
                    <span className="inline-block px-1.5 py-0.2 bg-rose-600 text-white rounded text-[9px] font-bold tracking-tight mt-0.5">
                      +37m AHEAD
                    </span>
                  )}
                </div>

                {/* 2. Lithology & Formation Column */}
                <div className="col-span-2">
                  <div className="font-semibold text-slate-900">{track.formation}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-sm ${
                      track.lithology.includes('Coal') ? 'bg-slate-800' :
                      track.lithology.includes('Sand') ? 'bg-amber-400' :
                      track.lithology.includes('Shale') ? 'bg-slate-400' : 'bg-blue-300'
                    }`}></span>
                    <span className="truncate">{track.lithology}</span>
                  </div>
                </div>

                {/* 3. Active Well NHK-542 Track (Gamma Ray + ROP) */}
                <div className="col-span-3 bg-white/80 p-2 rounded border border-slate-200">
                  {isDrilled ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-500">Gamma Ray:</span>
                        <span className="font-mono font-bold text-emerald-700">{track.nhk542_gr} API</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${Math.min((track.nhk542_gr / 160) * 100, 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] pt-1">
                        <span className="text-slate-500">ROP:</span>
                        <span className="font-mono font-bold text-oil-700">{track.nhk542_rop} m/hr</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-oil-500 h-full rounded-full"
                          style={{ width: `${Math.min((track.nhk542_rop / 35) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-slate-400 italic text-[11px]">
                      [Undrilled - AI Look-Ahead Prediction Projected]
                    </div>
                  )}
                </div>

                {/* 4. Offset Well NHK-519 Track */}
                <div className="col-span-2 bg-slate-50 p-2 rounded border border-slate-200 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">GR:</span>
                    <span className="font-mono font-semibold text-slate-800">{track.nhk519_gr} API</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden my-1">
                    <div
                      className="bg-purple-600 h-full"
                      style={{ width: `${Math.min((track.nhk519_gr / 160) * 100, 100)}%` }}
                    ></div>
                  </div>
                  {track.depth === 3285 && (
                    <div className="mt-1 text-[10px] text-rose-700 font-bold bg-rose-100 px-1.5 py-0.5 rounded">
                      ⚠️ 140 bbl Mud Loss @ 3,292m
                    </div>
                  )}
                </div>

                {/* 5. Offset Well MRN-104 Track */}
                <div className="col-span-2 bg-slate-50 p-2 rounded border border-slate-200 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">GR:</span>
                    <span className="font-mono font-semibold text-slate-800">{track.mrn104_gr} API</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden my-1">
                    <div
                      className="bg-indigo-600 h-full"
                      style={{ width: `${Math.min((track.mrn104_gr / 160) * 100, 100)}%` }}
                    ></div>
                  </div>
                  {track.depth === 3305 && (
                    <div className="mt-1 text-[10px] text-rose-700 font-bold bg-rose-100 px-1.5 py-0.5 rounded">
                      ⚠️ Stuck Pipe & Fish @ 3,305m
                    </div>
                  )}
                </div>

                {/* 6. Risk Score & Incident Annotations */}
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500 font-semibold">AI Risk Score:</span>
                    <span className={`font-mono font-bold text-xs ${
                      track.riskScore > 75 ? 'text-rose-600' :
                      track.riskScore > 45 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {track.riskScore}/100
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full ${
                        track.riskScore > 75 ? 'bg-rose-500' :
                        track.riskScore > 45 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${track.riskScore}%` }}
                    ></div>
                  </div>

                  {track.hazardNote && (
                    <div className={`p-1 rounded text-[10px] font-medium leading-tight ${
                      track.isImminentHazard ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {track.hazardNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Look-Ahead Action Callout */}
        <div className="p-4 bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-md">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Imminent Stratigraphic Hazard Corridor at 3,280m - 3,310m</span>
                <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                  94.2% AI Confidence
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Current bit is 31.6m above fractured coal seam. Offset wells NHK-519 and JRJ-88 suffered severe losses here.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToAlert('ALT-2026-089')}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Execute Prescriptive SOP</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stratigraphic Formations Reference Accordion */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600" />
          Assam-Arakan Basin Stratigraphic Master Profile (Naharkatiya Field)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STRATIGRAPHY_MASTER.map(f => (
            <div
              key={f.id}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition-all text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{f.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                  {f.code}
                </span>
              </div>
              <div className="text-slate-500 font-mono text-[11px]">
                {f.topMD}m – {f.bottomMD}m MD
              </div>
              <div className="text-slate-600 font-medium text-[11px]">
                {f.lithologyType}
              </div>
              <div className="pt-1 border-t border-slate-200 flex justify-between text-[10px]">
                <span>Pore Press: <strong className="text-slate-800">{f.porePressureAvg} SG</strong></span>
                <span>Frac Grad: <strong className="text-slate-800">{f.fracGradAvg} SG</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
