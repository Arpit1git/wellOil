import React from 'react';
import {
  Flame,
  Radio,
  Bell,
  AlertTriangle,
  Compass,
  Layers,
  FileText,
  Activity,
  Sliders,
  CheckCircle2,
  Share2,
  Printer,
  ChevronRight,
  Search,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  activeWell,
  liveTelemetry,
  alerts,
  onOpenSimulator,
  onOpenReportModal,
  simulatedDepthOffset,
  isSimulating
}) {
  const criticalAlertsCount = alerts.filter(a => a.severity === 'CRITICAL').length;
  const totalAlertsCount = alerts.length;

  const currentDisplayDepth = (activeWell.currentDepth + simulatedDepthOffset).toFixed(1);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner / Metadata Strip */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide text-slate-100">eRTMAC SYSTEM:</span>
            <span className="text-emerald-400 font-mono">LIVE CONNECTED (0.8s latency)</span>
          </div>
          <span className="text-slate-500">|</span>
          <div>
            <span className="text-slate-400">Basin:</span> <span className="text-white font-medium">{activeWell.basin}</span>
          </div>
          <span className="text-slate-500">|</span>
          <div>
            <span className="text-slate-400">Field:</span> <span className="text-white font-medium">{activeWell.field}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          <div className="flex items-center space-x-1 text-slate-300">
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono">
              RIG: OIL Rig-18 (2000 HP)
            </span>
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center space-x-1 text-slate-300">
            <span className="text-amber-400 font-medium">Smart India Hackathon 2026</span>
            <span className="text-slate-400 text-[11px]">• Team KUROHANA</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Active Well Title */}
        <div className="flex items-center space-x-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-oil-700 to-oil-900 flex items-center justify-center text-white shadow-md shadow-oil-500/20 ring-2 ring-oil-100">
            <Flame className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                OIL NWIS <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-oil-50 text-oil-700 border border-oil-200">v2.4 Pro</span>
              </h1>
              <span className="text-xs text-slate-400">/</span>
              <span className="text-sm font-semibold text-slate-700">Nearby Wells Intelligence System</span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Decision-Support AI for Oil India Limited Drilling Operations</span>
            </p>
          </div>
        </div>

        {/* Active Well Telemetry Quick Pill */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Well Depth Badge */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-3 shadow-sm">
            <div className="text-left">
              <div className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Active Well</div>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
                {activeWell.id}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
            </div>
            <div className="h-7 w-px bg-slate-300"></div>
            <div className="text-left">
              <div className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Bit Depth (MD)</div>
              <div className="text-sm font-mono font-bold text-oil-700">
                {currentDisplayDepth} <span className="text-xs font-normal text-slate-500">m</span>
              </div>
            </div>
            <div className="h-7 w-px bg-slate-300"></div>
            <div className="text-left">
              <div className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">Formation</div>
              <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Barail Coal-Shale
              </div>
            </div>
          </div>

          {/* Look-Ahead Risk Status Button */}
          <button
            onClick={() => setActiveTab('alerts')}
            className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all shadow-sm ${
              criticalAlertsCount > 0
                ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100 ring-2 ring-rose-400/30'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 ${criticalAlertsCount > 0 ? 'text-rose-600 animate-bounce' : 'text-emerald-600'}`} />
            <span>
              {criticalAlertsCount > 0 ? `${criticalAlertsCount} Look-Ahead Hazard (32m ahead)` : 'No Immediate Risk'}
            </span>
            <span className="ml-1 px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold">
              {totalAlertsCount}
            </span>
          </button>

          {/* Simulate Drilling Ahead Button */}
          <button
            onClick={onOpenSimulator}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border shadow-sm ${
              isSimulating
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-oil-50 text-oil-700 border-oil-200 hover:bg-oil-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-oil-600" />
            <span>{isSimulating ? 'Simulation Active' : 'Drill Simulator'}</span>
          </button>

          {/* Export Report Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Decision Memo</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Geospatial Offset Map</span>
          </button>

          <button
            onClick={() => setActiveTab('correlation')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'correlation'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Depth & Stratigraphy Correlation</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap relative ${
              activeTab === 'alerts'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Proactive AI Alerts</span>
            {criticalAlertsCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                {criticalAlertsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('mitigation')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'mitigation'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Prescriptive SOP & Mitigations</span>
          </button>

          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'ocr'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>OCR & Knowledge Repository</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'telemetry'
                ? 'bg-oil-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>eRTMAC Live Telemetry</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
