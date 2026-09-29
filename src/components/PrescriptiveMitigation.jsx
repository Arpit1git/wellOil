import React, { useState } from 'react';
import {
  CheckCircle2,
  Sliders,
  AlertTriangle,
  Flame,
  ShieldCheck,
  FileCheck,
  ChevronRight,
  TrendingDown,
  Sparkles,
  Info,
  Clock,
  Printer
} from 'lucide-react';

export default function PrescriptiveMitigation({ activeWell, liveTelemetry }) {
  // Mud Window & Hydraulics Calculator State
  const [mudDensity, setMudDensity] = useState(1.24); // SG
  const [flowRate, setFlowRate] = useState(520); // gpm
  const [rpm, setRpm] = useState(115); // rpm
  const [lcmConcentration, setLcmConcentration] = useState(25); // ppb

  // Calculate dynamic ECD and bottom-hole pressures
  const annularPressureLoss = ((flowRate / 500) ** 1.8) * 0.07;
  const calculatedEcd = +(mudDensity + annularPressureLoss).toFixed(2);
  const porePressureLimit = 1.31; // SG
  const fractureGradientLimit = 1.34; // SG in weak Barail coal

  const isEcdExceedingFrac = calculatedEcd > fractureGradientLimit;
  const isMudUnderbalanced = mudDensity < porePressureLimit;

  // Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Pre-treat active suction pit with 25-30 ppb blended coarse/medium LCM (Mica + Walnut Shell + CaCO3)', completed: true, timestamp: '2026-09-30 00:20', signee: 'Mud Engineer (Rig-18)' },
    { id: 2, task: 'Adjust pump flow rate to 460 gpm to cap ECD below 1.33 SG before reaching 3,275m', completed: true, timestamp: '2026-09-30 00:35', signee: 'Driller' },
    { id: 3, task: 'Cap rotary ROP to maximum 8.0 m/hr while penetrating Barail coal interface', completed: false, timestamp: null, signee: null },
    { id: 4, task: 'Prepare 150 bbl high-solids thermosetting LCM squeeze pill on standby in Tank #3', completed: true, timestamp: '2026-09-30 00:45', signee: 'Toolpusher' },
    { id: 5, task: 'Perform 5m flow check and monitor active pit totalizer for +/- 0.5 bbl deviation', completed: false, timestamp: null, signee: null },
    { id: 6, task: 'Maintain 2% vegetable oil ester lubricant to keep torque below 14 kft-lb', completed: false, timestamp: null, signee: null }
  ]);

  const toggleChecklist = (id) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              timestamp: !item.completed ? new Date().toLocaleTimeString() : null,
              signee: !item.completed ? 'Shift Toolpusher' : null
            }
          : item
      )
    );
  };

  const completedCount = checklist.filter(c => c.completed).length;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Prescriptive Mitigation & Operational Decision Support
              </h2>
              <p className="text-xs text-slate-500">
                Case-based reasoning and calibrated hydraulics operating window derived from historical offset wells
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SOP Compliance: {completedCount}/{checklist.length} Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Mud Operating Window & Hydraulic Calculator */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-oil-600" />
                Real-Time Mud & ECD Hydraulic Safe Window Calculator
              </h3>
              <p className="text-xs text-slate-500">
                Target Formation: Barail Coal-Shale (Pore Pressure 1.31 SG | Frac Limit 1.34 SG)
              </p>
            </div>
          </div>

          {/* Dynamic Window Status Gauge */}
          <div className={`p-4 rounded-xl border ${
            isEcdExceedingFrac
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : isMudUnderbalanced
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <div className="flex items-center justify-between font-bold text-sm">
              <div className="flex items-center gap-2">
                {isEcdExceedingFrac ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
                <span>
                  {isEcdExceedingFrac
                    ? 'CRITICAL ECD VIOLATION: RISK OF MUD LOSS'
                    : isMudUnderbalanced
                    ? 'UNDERBALANCED: RISK OF GAS INFLUX'
                    : 'OPTIMAL HYDRAULIC DRILLING WINDOW'}
                </span>
              </div>
              <span className="font-mono text-base font-bold">
                ECD: {calculatedEcd} SG
              </span>
            </div>
            <p className="text-xs mt-1.5 opacity-90">
              {isEcdExceedingFrac
                ? `Calculated ECD (${calculatedEcd} SG) exceeds coal fracture limit (${fractureGradientLimit} SG). Reduce flow rate or mud density to prevent mud loss.`
                : isMudUnderbalanced
                ? `Mud density (${mudDensity} SG) is lower than formation pore pressure (${porePressureLimit} SG). Risk of gas influx.`
                : `Drilling parameters are within the safe mud window (${porePressureLimit} SG < ${calculatedEcd} SG < ${fractureGradientLimit} SG).`}
            </p>
          </div>

          {/* Sliders for Drilling Parameters */}
          <div className="space-y-4 text-xs">
            {/* 1. Mud Density */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Active Mud Density (MW):</span>
                <span className="text-oil-700 font-mono font-bold text-sm">{mudDensity} SG</span>
              </div>
              <input
                type="range"
                min="1.10"
                max="1.45"
                step="0.01"
                value={mudDensity}
                onChange={e => setMudDensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-oil-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1.10 SG (Underbalanced)</span>
                <span className="text-amber-600 font-medium">1.31 SG (Pore Press)</span>
                <span>1.45 SG</span>
              </div>
            </div>

            {/* 2. Pump Flow Rate */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Pump Flow Rate (Q):</span>
                <span className="text-oil-700 font-mono font-bold text-sm">{flowRate} GPM</span>
              </div>
              <input
                type="range"
                min="350"
                max="650"
                step="10"
                value={flowRate}
                onChange={e => setFlowRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-oil-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>350 GPM</span>
                <span className="text-emerald-600 font-medium">460 GPM (Recommended for Barail)</span>
                <span>650 GPM</span>
              </div>
            </div>

            {/* 3. LCM Pill Concentration */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>LCM Pre-treatment Concentration:</span>
                <span className="text-oil-700 font-mono font-bold text-sm">{lcmConcentration} PPB</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={lcmConcentration}
                onChange={e => setLcmConcentration(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-oil-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10 PPB (Minor)</span>
                <span className="text-emerald-600 font-medium">25-30 PPB (Target)</span>
                <span>50 PPB (Heavy Pill)</span>
              </div>
            </div>
          </div>

          {/* Graphical Mud Weight Window Visualizer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-slate-700">Pressure Window Gradient Bar (SG)</div>
            <div className="relative h-7 bg-slate-200 rounded-lg overflow-hidden flex text-[10px] font-bold text-white">
              <div className="bg-amber-400 flex items-center justify-center" style={{ width: '45%' }}>
                Pore Pressure (1.31)
              </div>
              <div className="bg-emerald-500 flex items-center justify-center" style={{ width: '15%' }}>
                Safe Margin
              </div>
              <div className="bg-rose-500 flex items-center justify-center" style={{ width: '40%' }}>
                Loss Zone (&gt;1.34)
              </div>

              {/* Dynamic Indicator Pin */}
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-black ring-2 ring-white transition-all"
                style={{
                  left: `${Math.max(5, Math.min(95, ((calculatedEcd - 1.15) / (1.50 - 1.15)) * 100))}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1.15 SG</span>
              <span>1.31 SG (Pore)</span>
              <span>1.34 SG (Frac)</span>
              <span>1.50 SG</span>
            </div>
          </div>
        </div>

        {/* Right: Verified OIL Prescriptive SOP Checklist */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Standard Mitigation Action Protocol (SOP OIL-DRL-408)
              </h3>
              <p className="text-xs text-slate-500">
                Verified mitigation actions to avoid lost circulation & stuck pipe in Barail formation
              </p>
            </div>
          </div>

          {/* Interactive Checklist Items */}
          <div className="space-y-2.5">
            {checklist.map(item => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer select-none ${
                  item.completed
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <div className="flex-1 text-xs">
                    <p className={`font-medium ${item.completed ? 'text-emerald-950 font-semibold line-through opacity-85' : 'text-slate-800'}`}>
                      {item.task}
                    </p>
                    {item.completed && item.timestamp && (
                      <div className="mt-1 text-[10px] text-emerald-700 flex items-center gap-2">
                        <span>✓ Executed at {item.timestamp}</span>
                        <span>• Signee: {item.signee}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Financial & Time Savings Estimation Card */}
          <div className="p-4 bg-gradient-to-br from-oil-50 to-emerald-50 rounded-xl border border-oil-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-oil-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-oil-600" />
                Projected NPT & Cost Benefit
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                ROI: 14.8x
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-slate-500 text-[10px] uppercase">Avoided NPT</div>
                <div className="text-base font-bold text-slate-900">32.0 Hours</div>
                <div className="text-[10px] text-emerald-600">vs NHK-519 actuals</div>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <div className="text-slate-500 text-[10px] uppercase">Cost Savings</div>
                <div className="text-base font-bold text-emerald-700">₹48.5 Lakhs</div>
                <div className="text-[10px] text-emerald-600">Rig time + LCM savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
