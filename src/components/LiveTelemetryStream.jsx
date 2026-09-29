import React, { useState, useEffect } from 'react';
import {
  Activity,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Gauge,
  Droplet,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { LIVE_TELEMETRY } from '../data/mockData';

export default function LiveTelemetryStream({
  liveTelemetry,
  simulatedDepthOffset,
  setSimulatedDepthOffset,
  isSimulating,
  setIsSimulating
}) {
  const [telemetry, setTelemetry] = useState(liveTelemetry);
  const [drillSpeed, setDrillSpeed] = useState(1); // 1x or 2x

  // Simulate continuous drilling depth increment when auto-simulating
  useEffect(() => {
    let interval = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulatedDepthOffset(prev => {
          const next = prev + 0.5 * drillSpeed;
          if (next >= 65) {
            setIsSimulating(false);
            return next;
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, drillSpeed, setSimulatedDepthOffset, setIsSimulating]);

  const currentDepth = (LIVE_TELEMETRY.depthMD + simulatedDepthOffset).toFixed(1);
  const isLossZone = currentDepth >= 3280 && currentDepth <= 3315;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-oil-50 text-oil-700 rounded-lg">
              <Activity className="w-5 h-5 text-oil-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                eRTMAC Digital Real-Time Telemetry Stream
                <span className="flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  CONNECTED
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Rig OIL-18 Telemetry stream synced with WITSML & OPC-UA drilling sensor protocol
              </p>
            </div>
          </div>
        </div>

        {/* Drilling Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              isSimulating
                ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                : 'bg-oil-600 hover:bg-oil-700 text-white'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Auto-Drill' : 'Start Auto-Drill'}</span>
          </button>

          <button
            onClick={() => setSimulatedDepthOffset(prev => Math.min(prev + 10, 65))}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-all"
          >
            +10m Ahead
          </button>

          <button
            onClick={() => setSimulatedDepthOffset(prev => Math.min(prev + 35, 65))}
            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 transition-all flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Jump to Hazard (3,285m)</span>
          </button>

          {simulatedDepthOffset > 0 && (
            <button
              onClick={() => {
                setSimulatedDepthOffset(0);
                setIsSimulating(false);
              }}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg border border-slate-300 transition-all"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Real-Time Hazard Banner when drilling into loss zone */}
      {isLossZone && (
        <div className="p-4 bg-rose-500 text-white rounded-xl shadow-lg animate-pulse flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-200" />
            <div>
              <div className="font-extrabold text-sm">
                CRITICAL WARNING: BIT HAS ENTERED BARAIL COAL SEAM AT {currentDepth}m MD!
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                Offset wells NHK-519 and JRJ-88 experienced severe mud losses here. Verify ECD &lt; 1.33 SG immediately!
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="bg-white text-rose-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              SOP OIL-DRL-408 In Effect
            </span>
          </div>
        </div>
      )}

      {/* Main Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Gauge 1: Bit Depth */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Measured Depth (MD)</div>
          <div className="text-2xl font-mono font-black text-oil-700">{currentDepth} <span className="text-xs font-normal text-slate-500">m</span></div>
          <div className="text-[11px] text-slate-500 font-mono">TVD: {(LIVE_TELEMETRY.depthTVD + simulatedDepthOffset * 0.95).toFixed(1)} m</div>
        </div>

        {/* Gauge 2: ROP */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Rate of Penetration (ROP)</div>
          <div className="text-2xl font-mono font-black text-emerald-700">{isLossZone ? '7.5' : '14.2'} <span className="text-xs font-normal text-slate-500">m/hr</span></div>
          <div className="text-[11px] text-emerald-600 font-medium">Optimal controlled rate</div>
        </div>

        {/* Gauge 3: Weight on Bit (WOB) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Weight on Bit (WOB)</div>
          <div className="text-2xl font-mono font-black text-slate-800">{liveTelemetry.wob} <span className="text-xs font-normal text-slate-500">klbs</span></div>
          <div className="text-[11px] text-slate-500 font-mono">Hookload: {liveTelemetry.hookload} klbs</div>
        </div>

        {/* Gauge 4: Standpipe Pressure (SPP) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Standpipe Pressure</div>
          <div className="text-2xl font-mono font-black text-slate-800">{isLossZone ? '2,540' : '2,850'} <span className="text-xs font-normal text-slate-500">psi</span></div>
          <div className="text-[11px] text-slate-500 font-mono">Pump Strokes: {liveTelemetry.pumpStrokesSPM1} SPM</div>
        </div>

        {/* Gauge 5: Rotary Speed & Torque */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Top Drive RPM & Torque</div>
          <div className="text-2xl font-mono font-black text-slate-800">{liveTelemetry.rpm} <span className="text-xs font-normal text-slate-500">RPM</span></div>
          <div className="text-[11px] text-amber-700 font-mono font-semibold">Torque: {liveTelemetry.torque} kft-lb</div>
        </div>

        {/* Gauge 6: Flow In vs Flow Out */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Mud Flow Balance</div>
          <div className="text-2xl font-mono font-black text-oil-700">{isLossZone ? '460 / 458' : '520 / 518'} <span className="text-xs font-normal text-slate-500">GPM</span></div>
          <div className="text-[11px] text-emerald-600 font-medium">Flow Delta: -2.0 gpm (Normal)</div>
        </div>

        {/* Gauge 7: Mud Density & ECD */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">ECD vs Mud Density</div>
          <div className="text-2xl font-mono font-black text-purple-700">{isLossZone ? '1.30' : '1.31'} <span className="text-xs font-normal text-slate-500">SG</span></div>
          <div className="text-[11px] text-slate-500 font-mono">In: 1.24 SG | Out: 1.24 SG</div>
        </div>

        {/* Gauge 8: Active Pit Volume */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">Active Pit Volume Total</div>
          <div className="text-2xl font-mono font-black text-slate-800">{liveTelemetry.activePitVolume} <span className="text-xs font-normal text-slate-500">m³</span></div>
          <div className="text-[11px] text-slate-500 font-mono">Gain/Loss: {liveTelemetry.pitGainLoss} m³/hr</div>
        </div>
      </div>

      {/* Gas Chromatography & Mud Properties Strip */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          Mud Gas Chromatography & Hydrocarbon Speciation (C1 - C3)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase block">Total Gas</span>
            <span className="text-lg font-bold font-mono text-slate-800">{liveTelemetry.totalGas}%</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase block">Methane (C1)</span>
            <span className="text-lg font-bold font-mono text-slate-800">{liveTelemetry.c1} ppm</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase block">Ethane (C2)</span>
            <span className="text-lg font-bold font-mono text-slate-800">{liveTelemetry.c2} ppm</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase block">Propane (C3)</span>
            <span className="text-lg font-bold font-mono text-slate-800">{liveTelemetry.c3} ppm</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px] uppercase block">Toxic Gas H2S</span>
            <span className="text-lg font-bold font-mono text-emerald-700">0.0 ppm (Safe)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
