import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  AlertTriangle,
  Flame,
  FileText,
  Compass,
  Eye,
  Sliders,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  Info
} from 'lucide-react';

export default function GeospatialMap({
  activeWell,
  offsetWells,
  onSelectWell,
  selectedWell
}) {
  const [radiusKm, setRadiusKm] = useState(10);
  const [minSimilarity, setMinSimilarity] = useState(75);
  const [selectedIncidentFilter, setSelectedIncidentFilter] = useState('ALL');
  const [showFaultLines, setShowFaultLines] = useState(true);
  const [showContours, setShowContours] = useState(true);
  const [showSeismicLines, setShowSeismicLines] = useState(false);
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(true);
  const [hoveredWell, setHoveredWell] = useState(null);

  // Filter offset wells
  const filteredWells = offsetWells.filter(well => {
    if (well.distanceKm > radiusKm) return false;
    if (well.similarityScore < minSimilarity) return false;
    if (selectedIncidentFilter !== 'ALL') {
      const hasIncident = well.criticalIncidents?.some(inc => 
        inc.type.toLowerCase().includes(selectedIncidentFilter.toLowerCase())
      );
      if (!hasIncident) return false;
    }
    return true;
  });

  // Calculate coordinates on the SVG radar map (Center is 300, 300)
  const mapCenter = 300;
  const mapScale = 240 / 12; // 240px represents 12km

  const getWellCoordinates = (distanceKm, bearingDeg) => {
    const rad = ((bearingDeg - 90) * Math.PI) / 180;
    const r = Math.min(distanceKm * mapScale, 260);
    const x = mapCenter + r * Math.cos(rad);
    const y = mapCenter + r * Math.sin(rad);
    return { x, y };
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Info */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-oil-50 text-oil-700 rounded-lg">
              <Compass className="w-5 h-5 text-oil-600" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Interactive Geospatial Offset-Well Proximity Engine
              </h2>
              <p className="text-xs text-slate-500">
                Visualizing offset wells in the Naharkatiya Main Block relative to active drilling Well {activeWell.id}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500">Wells within {radiusKm} km:</span>{' '}
            <span className="font-bold text-slate-800">{filteredWells.length} / {offsetWells.length}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>3 Wells with Barail Mud Losses</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Display Area */}
        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Map Controls Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <span className="font-semibold text-slate-900">Map Overlays:</span>
              <button
                onClick={() => setShowFaultLines(!showFaultLines)}
                className={`px-2.5 py-1 rounded-md border text-xs transition-all ${
                  showFaultLines
                    ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                Faults (Duliajan Fault)
              </button>
              <button
                onClick={() => setShowContours(!showContours)}
                className={`px-2.5 py-1 rounded-md border text-xs transition-all ${
                  showContours
                    ? 'bg-oil-50 text-oil-700 border-oil-200 font-semibold'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                Structure Contours
              </button>
              <button
                onClick={() => setShowRiskHeatmap(!showRiskHeatmap)}
                className={`px-2.5 py-1 rounded-md border text-xs transition-all ${
                  showRiskHeatmap
                    ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                Risk Heatmap
              </button>
              <button
                onClick={() => setShowSeismicLines(!showSeismicLines)}
                className={`px-2.5 py-1 rounded-md border text-xs transition-all ${
                  showSeismicLines
                    ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                2D Seismic
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-mono">Lat: {activeWell.coordinates.lat}° N, Lng: {activeWell.coordinates.lng}° E</span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto my-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-2 select-none">
            <svg viewBox="0 0 600 600" className="w-full h-full">
              {/* Background Grid Pattern */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                </pattern>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#026bc7" stopOpacity="0.08" />
                  <stop offset="60%" stopColor="#026bc7" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#026bc7" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="hazardGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="600" height="600" fill="url(#grid)" rx="16" />

              {/* Radar Distance Range Rings */}
              {[2, 4, 6, 8, 10, 12].map(rKm => {
                const radiusPx = rKm * mapScale;
                return (
                  <g key={rKm}>
                    <circle
                      cx={mapCenter}
                      cy={mapCenter}
                      r={radiusPx}
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={mapCenter + radiusPx - 2}
                      y={mapCenter - 6}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {rKm} km
                    </text>
                  </g>
                );
              })}

              {/* Crosshairs & Compass Axes */}
              <line x1={mapCenter} y1="20" x2={mapCenter} y2="580" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="20" y1={mapCenter} x2="580" y2={mapCenter} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />

              {/* North Arrow Indicator */}
              <g transform="translate(550, 45)">
                <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M 0 -10 L 4 6 L 0 3 L -4 6 Z" fill="#026bc7" />
                <text x="0" y="-13" fill="#026bc7" fontSize="10" fontWeight="bold" textAnchor="middle">N</text>
              </g>

              {/* Structure Contours Overlay */}
              {showContours && (
                <g opacity="0.65">
                  <path
                    d="M 50 180 Q 250 120 520 220"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text x="70" y="170" fill="#0284c7" fontSize="9" fontWeight="500">Contour -2950m (Barail Top)</text>
                  
                  <path
                    d="M 60 320 Q 300 280 540 380"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text x="80" y="310" fill="#0284c7" fontSize="9" fontWeight="500">Contour -3250m</text>

                  <path
                    d="M 80 460 Q 320 420 550 510"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text x="100" y="450" fill="#0284c7" fontSize="9" fontWeight="500">Contour -3500m (Kopili)</text>
                </g>
              )}

              {/* Geological Fault Line Overlay (Duliajan Main Thrust Fault) */}
              {showFaultLines && (
                <g>
                  <path
                    d="M 40 480 Q 220 340 560 120"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                  />
                  {/* Fault Teeth */}
                  <path
                    d="M 120 420 L 126 432 M 220 340 L 226 352 M 320 260 L 326 272 M 420 180 L 426 192 M 500 120 L 506 132"
                    stroke="#e11d48"
                    strokeWidth="2"
                  />
                  <text x="360" y="220" fill="#e11d48" fontSize="11" fontWeight="bold" transform="rotate(-32 360 220)">
                    Duliajan Thrust Fault Zone (Sealing)
                  </text>
                </g>
              )}

              {/* 2D Seismic Lines Overlay */}
              {showSeismicLines && (
                <g opacity="0.4">
                  <line x1="80" y1="80" x2="520" y2="520" stroke="#9333ea" strokeWidth="1" strokeDasharray="5 5" />
                  <text x="100" y="95" fill="#9333ea" fontSize="9">Seismic 2D Line OIL-ASSAM-2021-04</text>
                  <line x1="120" y1="50" x2="550" y2="480" stroke="#9333ea" strokeWidth="1" strokeDasharray="5 5" />
                </g>
              )}

              {/* Radar Glow Field */}
              <circle cx={mapCenter} cy={mapCenter} r={radiusKm * mapScale} fill="url(#radarGlow)" />

              {/* Risk Heatmap around high incident wells */}
              {showRiskHeatmap && filteredWells.map(well => {
                if (well.criticalIncidents?.length > 0) {
                  const pos = getWellCoordinates(well.distanceKm, well.bearingDeg);
                  return (
                    <circle
                      key={`hazard-${well.id}`}
                      cx={pos.x}
                      cy={pos.y}
                      r="45"
                      fill="url(#hazardGlow)"
                    />
                  );
                }
                return null;
              })}

              {/* Distance lines connecting to Active Well */}
              {filteredWells.map(well => {
                const pos = getWellCoordinates(well.distanceKm, well.bearingDeg);
                const isSelected = selectedWell?.id === well.id;
                const isHovered = hoveredWell?.id === well.id;

                return (
                  <line
                    key={`line-${well.id}`}
                    x1={mapCenter}
                    y1={mapCenter}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isSelected || isHovered ? "#026bc7" : "#e2e8f0"}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? "none" : "2 2"}
                  />
                );
              })}

              {/* Offset Wells Pins */}
              {filteredWells.map(well => {
                const pos = getWellCoordinates(well.distanceKm, well.bearingDeg);
                const isSelected = selectedWell?.id === well.id;
                const isHovered = hoveredWell?.id === well.id;
                const hasCritical = well.criticalIncidents?.some(i => i.severity === 'CRITICAL');

                return (
                  <g
                    key={well.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => onSelectWell(well)}
                    onMouseEnter={() => setHoveredWell(well)}
                    onMouseLeave={() => setHoveredWell(null)}
                  >
                    {/* Pulsing ring if selected or critical */}
                    {hasCritical && (
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 18 : 14}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        className="animate-ping opacity-75"
                      />
                    )}

                    {/* Well Base Circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 14 : 10}
                      fill={hasCritical ? "#fee2e2" : "#e0f2fe"}
                      stroke={hasCritical ? "#ef4444" : "#0284c7"}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="shadow-sm"
                    />

                    {/* Inner Center Icon/Dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 6 : 4}
                      fill={hasCritical ? "#dc2626" : "#026bc7"}
                    />

                    {/* Well Label Badge */}
                    <g transform="translate(14, -6)">
                      <rect
                        x="0"
                        y="-10"
                        width={well.id.length * 7 + 36}
                        height="20"
                        rx="4"
                        fill={isSelected ? "#0c3d6e" : "#ffffff"}
                        stroke={isSelected ? "#0c3d6e" : "#cbd5e1"}
                        strokeWidth="1"
                        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.08))"
                      />
                      <text
                        x="6"
                        y="4"
                        fill={isSelected ? "#ffffff" : "#1e293b"}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {well.id}
                      </text>
                      <text
                        x={well.id.length * 7 + 10}
                        y="4"
                        fill={isSelected ? "#93c5fd" : "#0284c7"}
                        fontSize="9"
                        fontWeight="600"
                      >
                        {well.similarityScore}%
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Active Well Center Marker (Rig NHK-542) */}
              <g transform={`translate(${mapCenter}, ${mapCenter})`}>
                {/* Active Radar Ripple */}
                <circle cx="0" cy="0" r="28" fill="none" stroke="#0284c7" strokeWidth="1" opacity="0.4" className="animate-ping" />
                <circle cx="0" cy="0" r="18" fill="#dbeafe" stroke="#026bc7" strokeWidth="2.5" />
                <polygon points="0,-8 7,6 -7,6" fill="#026bc7" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />

                {/* Active Well Label */}
                <g transform="translate(-50, 24)">
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="22"
                    rx="6"
                    fill="#026bc7"
                    filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
                  />
                  <text
                    x="50"
                    y="15"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ★ ACTIVE: {activeWell.id}
                  </text>
                </g>
              </g>
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredWell && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-slate-300 shadow-lg text-xs max-w-xs z-10 pointer-events-none">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                  <span>{hoveredWell.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-oil-50 text-oil-700 text-[10px] font-mono">
                    {hoveredWell.similarityScore}% Similarity
                  </span>
                </div>
                <div className="text-slate-600 space-y-0.5">
                  <div><strong>Distance:</strong> {hoveredWell.distanceKm} km (Bearing {hoveredWell.bearingDeg}°)</div>
                  <div><strong>Total Depth:</strong> {hoveredWell.totalDepth} m MD</div>
                  <div><strong>Trajectory:</strong> {hoveredWell.trajectory}</div>
                  <div><strong>Status:</strong> {hoveredWell.status}</div>
                </div>
                {hoveredWell.criticalIncidents?.length > 0 && (
                  <div className="mt-2 pt-1.5 border-t border-slate-200 text-rose-700 font-medium">
                    ⚠️ {hoveredWell.criticalIncidents.length} Critical Events (Mud loss/Stuck)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 border border-blue-200"></span>
              <span>Active Well (NHK-542)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-200"></span>
              <span>Offset w/ Major Loss / Stuck</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 border border-sky-200"></span>
              <span>Offset Normal Drilling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-rose-600 border-b border-rose-600"></span>
              <span>Thrust Fault Line</span>
            </div>
          </div>
        </div>

        {/* Right Filter & Offset Well Selection Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Proximity & Similarity Controls */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-oil-600" />
              Proximity & Offset Filter Controls
            </h3>

            {/* Radius Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Search Radius:</span>
                <span className="text-oil-700 font-mono">{radiusKm} km</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                step="1"
                value={radiusKm}
                onChange={e => setRadiusKm(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-oil-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>2 km</span>
                <span>5 km</span>
                <span>10 km</span>
                <span>15 km</span>
              </div>
            </div>

            {/* Similarity Threshold Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Min Stratigraphic Similarity:</span>
                <span className="text-oil-700 font-mono">{minSimilarity}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minSimilarity}
                onChange={e => setMinSimilarity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-oil-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>60%</span>
                <span>75% (Recommended)</span>
                <span>95%</span>
              </div>
            </div>

            {/* Incident Type Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Filter by Historical Problem Type:
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'ALL', label: 'All Incidents' },
                  { id: 'Loss', label: 'Mud Losses' },
                  { id: 'Stuck', label: 'Stuck Pipe' },
                  { id: 'Kick', label: 'Gas Kicks' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedIncidentFilter(tab.id)}
                    className={`px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all ${
                      selectedIncidentFilter === tab.id
                        ? 'bg-oil-600 text-white border-oil-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Offset Wells List Cards */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Matched Offset Wells ({filteredWells.length})
              </h3>
              <span className="text-xs text-slate-500">Sorted by proximity</span>
            </div>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredWells.map(well => {
                const isSelected = selectedWell?.id === well.id;
                const hasCritical = well.criticalIncidents?.some(i => i.severity === 'CRITICAL');

                return (
                  <div
                    key={well.id}
                    onClick={() => onSelectWell(well)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-oil-50/70 border-oil-500 shadow-sm ring-1 ring-oil-400'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm font-mono">{well.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-white text-oil-700 text-[10px] font-bold border border-slate-200">
                            {well.similarityScore}% Match
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {well.distanceKm} km away • Spud: {well.spudYear} • TD: {well.totalDepth}m
                        </div>
                      </div>

                      {hasCritical && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          Risk Zone
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 bg-white/70 p-2 rounded border border-slate-200/80">
                      {well.keyLearnings}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">
                        {well.criticalIncidents?.length || 0} documented events
                      </span>
                      <span className="text-oil-600 font-semibold flex items-center gap-1 hover:underline">
                        View Dossier <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredWells.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No offset wells match the selected filter criteria. Try broadening radius or similarity threshold.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
