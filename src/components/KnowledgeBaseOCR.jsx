import React, { useState } from 'react';
import {
  FileText,
  Search,
  Sparkles,
  UploadCloud,
  Layers,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Database,
  Cpu,
  FileCheck,
  Tag
} from 'lucide-react';
import { HISTORICAL_DOCUMENTS_OCR } from '../data/mockData';

export default function KnowledgeBaseOCR() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedDoc, setSelectedDoc] = useState(HISTORICAL_DOCUMENTS_OCR[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Filter documents
  const filteredDocs = HISTORICAL_DOCUMENTS_OCR.filter(doc => {
    if (selectedType !== 'ALL' && !doc.type.toLowerCase().includes(selectedType.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const inTitle = doc.title.toLowerCase().includes(q);
      const inSummary = doc.documentSummary.toLowerCase().includes(q);
      const inSnippet = doc.ocrSnippetText.toLowerCase().includes(q);
      const inTags = doc.tags.some(t => t.toLowerCase().includes(q));
      if (!inTitle && !inSummary && !inSnippet && !inTags) return false;
    }
    return true;
  });

  const handleQuickPrompt = (prompt) => {
    setSearchQuery(prompt);
  };

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Cpu className="w-5 h-5 text-indigo-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                OCR & NLP Historical Drilling Intelligence Repository
              </h2>
              <p className="text-xs text-slate-500">
                Automated document extraction from historical Well Completion Reports (WCR), Daily Drilling Reports (DDR) & Mud Logs
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-indigo-50 text-indigo-800 font-bold px-3 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span>420+ Indexed Reports across Assam Oilfields</span>
          </span>
        </div>
      </div>

      {/* Semantic Search & Quick Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Ask anything (e.g., 'Find all stuck pipe incidents in Barail coal sequence' or '140 bbl mud loss cure')..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oil-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick NLP Query Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick Queries:
          </span>
          {[
            'Barail coal severe mud losses',
            'Differential sticking in Kopili',
            'Gas kick well control with Driller Method',
            '9-5/8" casing cementing CBL-VDL'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-oil-50 hover:text-oil-700 hover:border-oil-300 border border-slate-200 text-slate-600 text-xs transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Document Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-1 text-xs">
              {['ALL', 'Completion', 'Daily', 'Mud Logging', 'Casing'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    selectedType === type
                      ? 'bg-oil-600 text-white font-bold shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400">{filteredDocs.length} documents</span>
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredDocs.map(doc => {
              const isSelected = selectedDoc?.id === doc.id;

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-500 shadow-md ring-1 ring-indigo-400'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold border border-slate-200">
                      {doc.type}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                      OCR: {doc.ocrConfidence}%
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-2 leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {doc.documentSummary}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {doc.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Deep-Dive Document Extraction Viewer */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          {selectedDoc ? (
            <>
              {/* Document Header */}
              <div className="pb-4 border-b border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-mono">{selectedDoc.id} • {selectedDoc.pages} Pages</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ NLP Structured & Indexed
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  {selectedDoc.title}
                </h2>
                <div className="text-xs text-slate-500 mt-1">
                  Field: <strong className="text-slate-700">{selectedDoc.field}</strong> | Spud Year: <strong className="text-slate-700">{selectedDoc.year}</strong>
                </div>
              </div>

              {/* Extracted Entities Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  NLP Extracted Operational Entities
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase block">Rig Used</span>
                    <span className="font-bold text-slate-800">{selectedDoc.extractedEntities.rig || 'OIL Rig'}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase block">Total NPT Hours</span>
                    <span className="font-bold text-rose-700 font-mono">{selectedDoc.extractedEntities.nptHours || 0} Hours</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase block">Mud System</span>
                    <span className="font-semibold text-slate-800 truncate block">{selectedDoc.extractedEntities.mudSystem || 'PHPA Polymer'}</span>
                  </div>
                </div>

                {/* Specific Incident Breakdown */}
                {selectedDoc.extractedEntities.lostCirculationZones && (
                  <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs">
                    <span className="font-bold text-amber-950 block mb-1">Lost Circulation Zones Documented:</span>
                    <ul className="list-disc list-inside text-amber-900 space-y-0.5">
                      {selectedDoc.extractedEntities.lostCirculationZones.map((z, idx) => (
                        <li key={idx}>{z}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedDoc.extractedEntities.stuckPipeEvents && (
                  <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200 text-xs">
                    <span className="font-bold text-rose-950 block mb-1">Stuck Pipe & Fishing Events:</span>
                    <ul className="list-disc list-inside text-rose-900 space-y-0.5">
                      {selectedDoc.extractedEntities.stuckPipeEvents.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* OCR Text Snippet Viewer with Highlighting */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-oil-600" />
                    OCR Scanned Text & Ground Truth Transcript
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Confidence: {selectedDoc.ocrConfidence}%</span>
                </div>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed border border-slate-800 max-h-56 overflow-y-auto whitespace-pre-wrap select-text">
                  {selectedDoc.ocrSnippetText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                <span className="text-slate-500">
                  Data Canonical Model compatible with OIL eRTMAC
                </span>
                <button
                  onClick={() => alert(`Opening original PDF document: ${selectedDoc.title}`)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Original Scanned PDF</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-slate-400 text-sm">
              Select a historical report to inspect extracted intelligence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
