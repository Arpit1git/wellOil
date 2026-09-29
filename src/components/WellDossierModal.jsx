import React from 'react';
import {
  X,
  Compass,
  Layers,
  AlertTriangle,
  FileText,
  Clock,
  TrendingDown,
  Activity,
  CheckCircle2,
  Share2,
  Printer
} from 'lucide-react';

export default function WellDossierModal({ well, onClose, onCorrelate }) {
  if (!well) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-oil-700 rounded-xl text-white">
              <Compass className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{well.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-oil-800 text-oil-200 text-xs font-mono font-bold border border-oil-700">
                  {well.similarityScore}% Similarity
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {well.field} Field • {well.distanceKm} km from Active Well (Bearing {well.bearingDeg}°)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Key Parameters Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase block">Total Depth (TD)</span>
              <span className="text-sm font-bold font-mono text-slate-900">{well.totalDepth} m MD</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase block">Trajectory</span>
              <span className="text-sm font-bold text-slate-900">{well.trajectory}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase block">Spud Year</span>
              <span className="text-sm font-bold font-mono text-slate-900">{well.spudYear}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase block">Well Status</span>
              <span className="text-sm font-bold text-emerald-700">{well.status}</span>
            </div>
          </div>

          {/* Key Drilling Experience & Learnings */}
          <div className="p-4 bg-oil-50/70 rounded-xl border border-oil-200 space-y-1.5">
            <h4 className="font-bold text-oil-950 text-xs flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-oil-700" />
              Institutional Memory & Key Learnings:
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {well.keyLearnings}
            </p>
          </div>

          {/* Documented Critical Incidents */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Documented Operational Incidents & NPT Breakdown
            </h4>

            {well.criticalIncidents?.length > 0 ? (
              <div className="space-y-3">
                {well.criticalIncidents.map((inc, idx) => (
                  <div key={idx} className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
                    <div className="flex items-center justify-between font-bold text-rose-950">
                      <span>{inc.type} @ {inc.depth}m ({inc.formation})</span>
                      <span className="text-xs font-mono text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                        {inc.nptHours} hrs NPT (₹{inc.costLakhs}L)
                      </span>
                    </div>

                    <div className="text-xs text-slate-700">
                      <strong>Root Cause:</strong> {inc.rootCause}
                    </div>

                    <div className="text-xs text-emerald-900 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                      <strong>Mitigation Applied:</strong> {inc.mitigationUsed}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-lg text-emerald-800 text-xs">
                No major NPT drilling incidents recorded for this offset well.
              </div>
            )}
          </div>

          {/* Stratigraphic Tops */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              Stratigraphic Tops Encountered
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {well.formationTops?.map((top, idx) => (
                <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-800">{top.name}</span>
                  <span className="font-mono text-slate-500 font-bold">{top.top}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Source: Oil India Limited Well Completion Report Archive
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onCorrelate(well);
                onClose();
              }}
              className="px-4 py-2 bg-oil-600 hover:bg-oil-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Correlate with Active Well
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
