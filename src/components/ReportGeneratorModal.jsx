import React from 'react';
import {
  X,
  Printer,
  FileCheck,
  Flame,
  ShieldAlert,
  CheckCircle2,
  Share2,
  Download
} from 'lucide-react';

export default function ReportGeneratorModal({ activeWell, liveTelemetry, alerts, onClose }) {
  const criticalAlert = alerts.find(a => a.severity === 'CRITICAL') || alerts[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Actions Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-sm">OIL Operational Decision Support Memo</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-oil-600 hover:bg-oil-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Memo Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 bg-white font-sans text-xs">
          {/* OIL Official Memo Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
                OIL INDIA LIMITED
              </div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-0.5">
                Drilling & Workover Department • Duliajan, Assam
              </div>
              <div className="text-[11px] text-oil-700 font-semibold mt-1">
                Nearby Wells Intelligence System (NWIS) • Automated Pre-spud / Look-Ahead Risk Advisory
              </div>
            </div>

            <div className="text-right text-[11px] space-y-0.5 font-mono">
              <div><strong>MEMO REF:</strong> OIL/NWIS/2026/09/ADV-089</div>
              <div><strong>DATE:</strong> 30-SEP-2026 00:54 IST</div>
              <div><strong>STATUS:</strong> HIGH PRIORITY ADVISORY</div>
            </div>
          </div>

          {/* Active Well Operational Details Box */}
          <div className="grid grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Active Well</span>
              <strong className="text-slate-900">{activeWell.id} (Naharkatiya)</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Drilling Rig</span>
              <strong className="text-slate-900">{activeWell.rig}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Current Depth</span>
              <strong className="text-oil-700 font-mono">{activeWell.currentDepth} m MD</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Current Formation</span>
              <strong className="text-amber-800">Barail Coal-Shale</strong>
            </div>
          </div>

          {/* Critical Risk Section */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-wider bg-slate-100 p-1.5 rounded border border-slate-200">
              1. PREDICTIVE LOOK-AHEAD HAZARD SUMMARY (HORIZON: 3,280m - 3,310m MD)
            </h4>

            <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg space-y-1.5">
              <div className="font-bold text-rose-950 text-sm flex items-center justify-between">
                <span>{criticalAlert.title}</span>
                <span className="font-mono text-xs text-rose-700">94.2% AI Confidence</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-xs">
                The drill bit is currently 31.6 meters above a known depleted, micro-fractured coal seam within the Barail Formation.
                Geological offset correlation reveals that 3 out of 4 nearby wells experienced severe lost circulation or mechanical sticking at this exact stratigraphic horizon.
              </p>
            </div>
          </div>

          {/* Historical Offset Wells Evidence Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-wider bg-slate-100 p-1.5 rounded border border-slate-200">
              2. HISTORICAL OFFSET WELLS GROUND TRUTH (EVIDENCE AUDIT)
            </h4>

            <table className="w-full border-collapse border border-slate-300 text-left">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="border border-slate-300 p-2">Offset Well</th>
                  <th className="border border-slate-300 p-2">Distance</th>
                  <th className="border border-slate-300 p-2">Incident Depth</th>
                  <th className="border border-slate-300 p-2">Incident & Impact</th>
                  <th className="border border-slate-300 p-2">Successful Resolution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold font-mono">NHK-519</td>
                  <td className="border border-slate-300 p-2">1.42 km</td>
                  <td className="border border-slate-300 p-2 font-mono">3,292 m</td>
                  <td className="border border-slate-300 p-2">140 bbls mud loss into coal (28h NPT)</td>
                  <td className="border border-slate-300 p-2">180 bbl coarse LCM pill + reduced pump rate to 440 gpm</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold font-mono">JRJ-88</td>
                  <td className="border border-slate-300 p-2">5.60 km</td>
                  <td className="border border-slate-300 p-2 font-mono">3,285 m</td>
                  <td className="border border-slate-300 p-2">Total loss of returns 600 bbls (42h NPT)</td>
                  <td className="border border-slate-300 p-2">220 bbl thermosetting polymer squeeze pill</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold font-mono">MRN-104</td>
                  <td className="border border-slate-300 p-2">4.10 km</td>
                  <td className="border border-slate-300 p-2 font-mono">3,305 m</td>
                  <td className="border border-slate-300 p-2">Mechanical stuck pipe & 48h fishing</td>
                  <td className="border border-slate-300 p-2">Engaged fish with Bowen overshot</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Prescriptive Standard Mitigation Protocol */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs uppercase tracking-wider bg-slate-100 p-1.5 rounded border border-slate-200">
              3. MANDATORY PRESCRIPTIVE MITIGATION PROTOCOL (SOP OIL-DRL-408-REV3)
            </h4>

            <ol className="list-decimal list-inside space-y-1.5 text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <li><strong>Pre-treatment:</strong> Dose active suction pit with 25-30 ppb blended LCM (Mica + Walnut shell + CaCO3) before passing 3,275m.</li>
              <li><strong>Hydraulic Limiting:</strong> Cap Equivalent Circulating Density (ECD) to &le; 1.33 SG by restricting pump flow rate to 460 GPM.</li>
              <li><strong>ROP Limiting:</strong> Restrict ROP to maximum 8.0 m/hr to avoid cuttings accumulation and pack-off.</li>
              <li><strong>Standby Pill:</strong> Prepare 150 bbl heavy high-fluid-loss LCM pill (1.26 SG) in reserve tank #3 prior to penetration.</li>
              <li><strong>Monitoring:</strong> Perform flow check every 5 meters of penetration in the 3,280 - 3,315 m interval.</li>
            </ol>
          </div>

          {/* Signatures Strip */}
          <div className="pt-6 border-t-2 border-slate-300 grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="h-10 border-b border-slate-400"></div>
              <div className="text-[11px] font-bold mt-1">Wellsite Drilling Engineer</div>
              <div className="text-[9px] text-slate-500">OIL Rig-18</div>
            </div>
            <div>
              <div className="h-10 border-b border-slate-400"></div>
              <div className="text-[11px] font-bold mt-1">Senior Toolpusher</div>
              <div className="text-[9px] text-slate-500">OIL Drilling Division</div>
            </div>
            <div>
              <div className="h-10 border-b border-slate-400"></div>
              <div className="text-[11px] font-bold mt-1">Lead Mud Engineer</div>
              <div className="text-[9px] text-slate-500">Chemical Dept, OIL</div>
            </div>
            <div>
              <div className="h-10 border-b border-slate-400"></div>
              <div className="text-[11px] font-bold mt-1">Drilling Superintendent</div>
              <div className="text-[9px] text-slate-500">Duliajan HQ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
