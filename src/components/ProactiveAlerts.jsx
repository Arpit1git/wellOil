import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Sliders,
  TrendingUp,
  Zap,
  Clock,
  DollarSign,
  UserCheck,
  ExternalLink,
  Info
} from 'lucide-react';
import { PROACTIVE_ALERTS } from '../data/mockData';

export default function ProactiveAlerts({
  alerts = PROACTIVE_ALERTS,
  onApplySop,
  activeWell
}) {
  const [selectedAlertId, setSelectedAlertId] = useState(alerts[0]?.id || null);
  const [dispatchedAlerts, setDispatchedAlerts] = useState({});
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  const activeAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  const handleDispatchNotification = (alertId) => {
    setDispatchedAlerts(prev => ({
      ...prev,
      [alertId]: {
        timestamp: new Date().toLocaleTimeString(),
        dispatchedTo: ['Rig Superintendent (OIL-Rig 18)', 'Toolpusher', 'Wellsite Geologist', 'Duliajan Drilling HQ']
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Proactive Multi-Risk Early Warning & Explainable AI Engine
                <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                  Look-Ahead Active
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Predictive risk alerts mapped to upcoming stratigraphic depths with evidence-backed citations to nearby offset wells
              </p>
            </div>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(s => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                filterSeverity === s
                  ? s === 'CRITICAL'
                    ? 'bg-rose-600 text-white font-bold shadow-sm'
                    : s === 'HIGH'
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : 'bg-oil-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {s} {s === 'CRITICAL' && '🔴'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Alert Engine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Alerts */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between px-1">
            <span>Pending Look-Ahead Advisories ({filteredAlerts.length})</span>
            <span className="text-slate-400 font-normal">Ranked by Risk Horizon</span>
          </div>

          <div className="space-y-3">
            {filteredAlerts.map(alert => {
              const isSelected = alert.id === activeAlert?.id;
              const isCritical = alert.severity === 'CRITICAL';
              const isHigh = alert.severity === 'HIGH';

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? isCritical
                        ? 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-400/40'
                        : 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        isCritical
                          ? 'bg-rose-600 text-white'
                          : isHigh
                          ? 'bg-amber-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {alert.severity} RISK
                      </span>
                      <span className="font-mono text-xs text-slate-500">{alert.id}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-oil-700 font-mono">
                        {alert.distanceAheadMeters}m Ahead
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2 leading-snug">
                    {alert.title}
                  </h3>

                  <div className="mt-2 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Target Depth: <strong>{alert.targetDepthRange}</strong></span>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {alert.confidenceScore}% AI Confidence
                      </span>
                    </div>
                  </div>

                  {/* Offset Evidence Preview Badges */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-oil-600" />
                      {alert.offsetEvidence?.length || 0} Offset Incidents Cited
                    </span>
                    <span className="text-oil-600 font-bold hover:underline">
                      Explore Details →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Deep-Dive Explainable AI & SOP Action Center */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
          {activeAlert ? (
            <>
              {/* Alert Title Strip */}
              <div className="pb-4 border-b border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      activeAlert.severity === 'CRITICAL'
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}>
                      {activeAlert.severity} RISK ALERT
                    </span>
                    <span className="font-mono text-xs text-slate-500">{activeAlert.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-oil-50 text-oil-800 px-2.5 py-1 rounded-lg border border-oil-200 text-xs font-mono font-bold">
                      Impact Depth: {activeAlert.targetDepthRange}
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {activeAlert.title}
                </h2>
              </div>

              {/* Contributing Signal Matrix (Explainability) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-oil-600" />
                  Explainable AI Contributing Telemetry Signals
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeAlert.contributingSignals?.map((sig, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="font-semibold text-slate-800">{sig.parameter}</div>
                      <div className="flex justify-between text-slate-500 font-mono">
                        <span>Current: <strong className="text-slate-800">{sig.current}</strong></span>
                        <span>Threshold: <strong className="text-slate-800">{sig.threshold}</strong></span>
                      </div>
                      <div className="text-[11px] font-medium text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                        Status: {sig.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Historical Offset Evidence (Direct WCR / DDR Citations) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Historical Offset Wells Evidence & Ground Truth
                </h3>

                <div className="space-y-2">
                  {activeAlert.offsetEvidence?.map((ev, idx) => (
                    <div key={idx} className="p-3 bg-purple-50/50 rounded-lg border border-purple-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-purple-950">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                          Well {ev.wellId} ({ev.distance})
                        </span>
                        <span className="font-mono text-purple-800">Incident at {ev.depth}</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        "{ev.event}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescriptive SOP & Action Protocol */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-300 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Prescriptive Mitigation SOP: {activeAlert.prescriptiveSOP?.title}
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-800">
                        Protocol Code: {activeAlert.prescriptiveSOP?.actionId}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200 shadow-sm">
                      ⚡ Saves ~{activeAlert.prescriptiveSOP?.estimatedNptSavedHours}h NPT (₹{activeAlert.prescriptiveSOP?.estimatedCostSavedLakhs}L)
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  {activeAlert.prescriptiveSOP?.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-emerald-200 text-slate-800 font-medium">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* Dispatch / Sign-off Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500">
                    Required Approvals: <strong className="text-slate-700">{activeAlert.prescriptiveSOP?.approvalsNeeded.join(', ')}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDispatchNotification(activeAlert.id)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Alert to Rig Floor</span>
                    </button>
                  </div>
                </div>

                {/* Dispatch Confirmation Strip */}
                {dispatchedAlerts[activeAlert.id] && (
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-400 text-xs text-emerald-900 flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      Alert successfully dispatched at {dispatchedAlerts[activeAlert.id].timestamp} to {dispatchedAlerts[activeAlert.id].dispatchedTo.join(', ')}.
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              Select an alert from the left panel to inspect explainable signals and prescriptive SOPs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
