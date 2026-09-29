// Comprehensive Mock Data for Oil India Limited - Nearby Wells Intelligence System (NWIS)

export const ACTIVE_WELL = {
  id: 'NHK-542',
  name: 'Well NHK-542 (Naharkatiya)',
  basin: 'Assam-Arakan Basin',
  field: 'Naharkatiya Main Block',
  rig: 'OIL Rig-18 (Cyber Chair 2000 HP)',
  drillingContractor: 'OIL In-house Drilling Division',
  targetFormation: 'Barail Main Sandstone & Kopili Gas Strata',
  targetDepth: 3850, // meters MD
  currentDepth: 3248, // meters MD
  currentTVD: 3112, // meters TVD
  spudDate: '12-Aug-2026',
  estimatedCompletion: '15-Oct-2026',
  casingProgram: [
    { section: '20" Conductor', setDepth: 120, status: 'Cemented' },
    { section: '13-3/8" Surface Casing', setDepth: 950, status: 'Cemented' },
    { section: '9-5/8" Intermediate Casing', setDepth: 2950, status: 'Cemented' },
    { section: '8-1/2" Open Hole (Current)', setDepth: 3248, status: 'Drilling Active' },
    { section: '7" Production Liner (Planned)', setDepth: 3850, status: 'Planned' }
  ],
  coordinates: {
    lat: 27.2842,
    lng: 95.3418,
    easting: 533820,
    northing: 3017840
  },
  currentLithology: {
    name: 'Barail Coal-Shale Interbed',
    color: '#854d0e',
    bgColor: '#fef3c7',
    topDepth: 2950,
    bottomDepth: 3450,
    porePressureSG: 1.31,
    fractureGradientSG: 1.62,
    rockStrengthMpa: 48,
    permeabilityMd: '0.5 - 12.0',
    riskLevel: 'HIGH'
  }
};

export const LIVE_TELEMETRY = {
  timestamp: '2026-09-30 00:54:12',
  ertmacStatus: 'ONLINE_SYNCED',
  telemetryDelaySec: 0.8,
  depthMD: 3248.4,
  depthTVD: 3112.1,
  rop: 14.2, // m/hr
  wob: 18.5, // klbs
  rpm: 115, // rpm
  torque: 12.8, // kft-lb
  spp: 2850, // psi (Standpipe Pressure)
  flowIn: 520, // gpm
  flowOut: 518, // gpm
  flowDelta: -2, // gpm delta
  mudDensityIn: 1.24, // SG
  mudDensityOut: 1.24, // SG
  ecd: 1.31, // SG (Equivalent Circulating Density)
  mudType: 'Polymer-Inhibited Water Based Mud (PHPA)',
  activePitVolume: 42.5, // m3
  pitGainLoss: -0.2, // m3/hr
  totalGas: 1.8, // %
  c1: 14500, // ppm
  c2: 1200, // ppm
  c3: 450, // ppm
  h2s: 0.0, // ppm
  pumpStrokesSPM1: 94,
  pumpStrokesSPM2: 92,
  hookload: 142.5, // klbs
  bitHours: 38.5,
  bitType: '8-1/2" PDC MSi616'
};

export const OFFSET_WELLS = [
  {
    id: 'NHK-519',
    name: 'Well NHK-519',
    field: 'Naharkatiya',
    distanceKm: 1.42,
    bearingDeg: 38,
    coordinates: { lat: 27.2941, lng: 95.3508 },
    similarityScore: 96,
    spudYear: 2023,
    status: 'Completed / Oil Producer',
    totalDepth: 3890,
    trajectory: 'Deviated (Max Inc 24.5°)',
    keyLearnings: 'Severe mud loss in Barail coal sequence at 3,292m. Required 180 bbl LCM pill with medium fibers. Differential sticking at 3,510m resolved by spotting oil-based soak pill in 6 hrs.',
    criticalIncidents: [
      {
        depth: 3292,
        formation: 'Barail Coal-Shale',
        type: 'Severe Lost Circulation',
        severity: 'CRITICAL',
        nptHours: 28,
        costLakhs: 42.5,
        rootCause: 'High ECD (1.37 SG) while penetrating micro-fractured brittle coal stringer with lower fracture resistance.',
        mitigationUsed: 'Pumped 180 bbl coarse/medium fiber LCM pill, reduced mud weight from 1.28 to 1.24 SG, reduced pump rate to 440 gpm.'
      },
      {
        depth: 3510,
        formation: 'Kopili Shale Transition',
        type: 'Differential Sticking',
        severity: 'HIGH',
        nptHours: 36,
        costLakhs: 58.0,
        rootCause: 'High overbalance (0.16 SG) during 45 min static survey station.',
        mitigationUsed: 'Spotted 60 bbl glycol/oil spotting fluid, energized drillstring with 80 klbs overpull.'
      }
    ],
    formationTops: [
      { name: 'Alluvium / Dihing', top: 0, bottom: 920 },
      { name: 'Tipam Sandstone', top: 920, bottom: 2150 },
      { name: 'Surma Group', top: 2150, bottom: 2980 },
      { name: 'Barail Group', top: 2980, bottom: 3480 },
      { name: 'Kopili Formation', top: 3480, bottom: 3760 },
      { name: 'Sylhet Limestone', top: 3760, bottom: 3890 }
    ],
    mudWeights: [
      { depth: 1000, mw: 1.08, ecd: 1.12 },
      { depth: 2000, mw: 1.14, ecd: 1.18 },
      { depth: 2980, mw: 1.22, ecd: 1.27 },
      { depth: 3292, mw: 1.28, ecd: 1.37 }, // Loss occurred
      { depth: 3500, mw: 1.25, ecd: 1.31 },
      { depth: 3890, mw: 1.32, ecd: 1.38 }
    ],
    logs: {
      grAvailable: true,
      resAvailable: true,
      sonicAvailable: true,
      caliperAvailable: true
    }
  },
  {
    id: 'NHK-488',
    name: 'Well NHK-488',
    field: 'Naharkatiya',
    distanceKm: 2.85,
    bearingDeg: 215,
    coordinates: { lat: 27.2625, lng: 95.3245 },
    similarityScore: 91,
    spudYear: 2021,
    status: 'Producing (Gas Lift)',
    totalDepth: 3780,
    trajectory: 'Vertical',
    keyLearnings: 'Encountered 15 bbl gas kick at 3,420m (Kopili top) due to localized overpressure lens. SICP rose to 380 psi. Driller\'s Method applied successfully.',
    criticalIncidents: [
      {
        depth: 3420,
        formation: 'Kopili Shale',
        type: 'Well Control / Gas Kick',
        severity: 'HIGH',
        nptHours: 19,
        costLakhs: 31.0,
        rootCause: 'Underbalanced penetration into lenticular high-pressure sandstone pocket. SIDPP 240 psi, SICP 380 psi.',
        mitigationUsed: 'Shut-in on annular BOP, circulated out influx using 1st circulation of Driller\'s method, weighted up mud from 1.22 to 1.30 SG.'
      }
    ],
    formationTops: [
      { name: 'Alluvium / Dihing', top: 0, bottom: 940 },
      { name: 'Tipam Sandstone', top: 940, bottom: 2120 },
      { name: 'Surma Group', top: 2120, bottom: 2940 },
      { name: 'Barail Group', top: 2940, bottom: 3410 },
      { name: 'Kopili Formation', top: 3410, bottom: 3720 },
      { name: 'Sylhet Limestone', top: 3720, bottom: 3780 }
    ],
    mudWeights: [
      { depth: 1000, mw: 1.07, ecd: 1.11 },
      { depth: 2000, mw: 1.15, ecd: 1.20 },
      { depth: 2940, mw: 1.21, ecd: 1.26 },
      { depth: 3410, mw: 1.22, ecd: 1.27 },
      { depth: 3420, mw: 1.30, ecd: 1.35 },
      { depth: 3780, mw: 1.31, ecd: 1.36 }
    ]
  },
  {
    id: 'MRN-104',
    name: 'Well MRN-104',
    field: 'Moran',
    distanceKm: 4.10,
    bearingDeg: 285,
    coordinates: { lat: 27.2950, lng: 95.3015 },
    similarityScore: 88,
    spudYear: 2020,
    status: 'Suspended (Workover candidate)',
    totalDepth: 4020,
    trajectory: 'Deviated (S-Type)',
    keyLearnings: 'Severe mechanical stuck pipe at 3,305m caused by reactive shale swelling & bit balling. BHA parted; required 48 hrs fishing operation.',
    criticalIncidents: [
      {
        depth: 3305,
        formation: 'Barail Coal-Shale',
        type: 'Mechanical Stuck Pipe & Fishing',
        severity: 'CRITICAL',
        nptHours: 54,
        costLakhs: 89.0,
        rootCause: 'Insufficient shale inhibition (low KCl polymer content), led to swelling, hole pack-off, and torque spike > 28 kft-lb.',
        mitigationUsed: 'Jarred down with 120 klbs, jarred up. String parted at crossover sub. Successfully engaged with overshot and recovered fish in 48 hrs.'
      }
    ],
    formationTops: [
      { name: 'Alluvium / Dihing', top: 0, bottom: 960 },
      { name: 'Tipam Sandstone', top: 960, bottom: 2180 },
      { name: 'Surma Group', top: 2180, bottom: 2990 },
      { name: 'Barail Group', top: 2990, bottom: 3510 },
      { name: 'Kopili Formation', top: 3510, bottom: 3820 },
      { name: 'Sylhet Limestone', top: 3820, bottom: 4020 }
    ],
    mudWeights: [
      { depth: 1000, mw: 1.09, ecd: 1.13 },
      { depth: 2000, mw: 1.16, ecd: 1.21 },
      { depth: 2990, mw: 1.24, ecd: 1.29 },
      { depth: 3305, mw: 1.25, ecd: 1.34 },
      { depth: 3800, mw: 1.33, ecd: 1.39 }
    ]
  },
  {
    id: 'JRJ-88',
    name: 'Well JRJ-88',
    field: 'Jorajan',
    distanceKm: 5.60,
    bearingDeg: 122,
    coordinates: { lat: 27.2580, lng: 95.3900 },
    similarityScore: 84,
    spudYear: 2022,
    status: 'Producing',
    totalDepth: 3950,
    trajectory: 'Horizontal Drain Hole (650m in Barail)',
    keyLearnings: 'Complete lost circulation at 3,285m (600 bbl lost). Cured with engineered cross-linked polymer pill + gunk squeeze before casing shoe set.',
    criticalIncidents: [
      {
        depth: 3285,
        formation: 'Barail Sand-Coal Interface',
        type: 'Total Lost Circulation',
        severity: 'CRITICAL',
        nptHours: 42,
        costLakhs: 74.0,
        rootCause: 'Sub-seismic natural fracture corridor combined with surge pressure during tripping in.',
        mitigationUsed: 'Spotted high-solids thermosetting cross-linked LCM pill (220 bbl) followed by hesitation squeeze at 400 psi.'
      }
    ],
    formationTops: [
      { name: 'Alluvium / Dihing', top: 0, bottom: 900 },
      { name: 'Tipam Sandstone', top: 900, bottom: 2100 },
      { name: 'Surma Group', top: 2100, bottom: 2920 },
      { name: 'Barail Group', top: 2920, bottom: 3430 },
      { name: 'Kopili Formation', top: 3430, bottom: 3730 },
      { name: 'Sylhet Limestone', top: 3730, bottom: 3950 }
    ],
    mudWeights: [
      { depth: 1000, mw: 1.08, ecd: 1.12 },
      { depth: 2000, mw: 1.15, ecd: 1.19 },
      { depth: 2920, mw: 1.23, ecd: 1.28 },
      { depth: 3285, mw: 1.26, ecd: 1.36 },
      { depth: 3730, mw: 1.32, ecd: 1.37 }
    ]
  },
  {
    id: 'NHK-505',
    name: 'Well NHK-505',
    field: 'Naharkatiya',
    distanceKm: 3.20,
    bearingDeg: 98,
    coordinates: { lat: 27.2810, lng: 95.3740 },
    similarityScore: 93,
    spudYear: 2022,
    status: 'Completed / Oil Producer',
    totalDepth: 3820,
    trajectory: 'Deviated (18°)',
    keyLearnings: 'Successfully mitigated mud losses at 3,290m by pre-treating active system with 25 ppb fine & medium walnut shell + mica prior to drilling into coal seam.',
    criticalIncidents: [
      {
        depth: 3310,
        formation: 'Barail Coal-Shale',
        type: 'Tight Hole & Overpull on Trip',
        severity: 'MEDIUM',
        nptHours: 8,
        costLakhs: 12.0,
        rootCause: 'Ledge formation at sandstone-shale boundary with 45 klbs overpull.',
        mitigationUsed: 'Back-reamed with 80 RPM and 380 gpm flow rate; conditioned hole for 2 circulations.'
      }
    ],
    formationTops: [
      { name: 'Alluvium / Dihing', top: 0, bottom: 930 },
      { name: 'Tipam Sandstone', top: 930, bottom: 2140 },
      { name: 'Surma Group', top: 2140, bottom: 2960 },
      { name: 'Barail Group', top: 2960, bottom: 3460 },
      { name: 'Kopili Formation', top: 3460, bottom: 3740 },
      { name: 'Sylhet Limestone', top: 3740, bottom: 3820 }
    ],
    mudWeights: [
      { depth: 1000, mw: 1.07, ecd: 1.11 },
      { depth: 2000, mw: 1.14, ecd: 1.18 },
      { depth: 2960, mw: 1.22, ecd: 1.27 },
      { depth: 3300, mw: 1.24, ecd: 1.29 },
      { depth: 3740, mw: 1.30, ecd: 1.35 }
    ]
  },
  {
    id: 'DGB-21',
    name: 'Well DGB-21',
    field: 'Digboi (Historical)',
    distanceKm: 8.90,
    bearingDeg: 65,
    coordinates: { lat: 27.3200, lng: 95.4200 },
    similarityScore: 76,
    spudYear: 2018,
    status: 'Shut-in / Observation',
    totalDepth: 3600,
    trajectory: 'Vertical',
    keyLearnings: 'Structural dip changes rapidly in northeastern corridor. High dogleg severity led to casing wear.',
    criticalIncidents: [
      {
        depth: 3260,
        formation: 'Barail Group',
        type: 'Seepage Mud Loss',
        severity: 'LOW',
        nptHours: 6,
        costLakhs: 8.5,
        rootCause: 'Micro-fractures induced by fault zone proximity.',
        mitigationUsed: 'Continuous background LCM maintenance (15 ppb).'
      }
    ],
    formationTops: [
      { name: 'Alluvium / Dihing', top: 0, bottom: 880 },
      { name: 'Tipam Sandstone', top: 880, bottom: 2050 },
      { name: 'Surma Group', top: 2050, bottom: 2880 },
      { name: 'Barail Group', top: 2880, bottom: 3400 },
      { name: 'Kopili Formation', top: 3400, bottom: 3600 }
    ],
    mudWeights: [
      { depth: 1000, mw: 1.06, ecd: 1.10 },
      { depth: 2000, mw: 1.13, ecd: 1.17 },
      { depth: 2880, mw: 1.20, ecd: 1.25 },
      { depth: 3260, mw: 1.24, ecd: 1.30 }
    ]
  }
];

export const STRATIGRAPHY_MASTER = [
  {
    id: 'alluvium',
    name: 'Alluvium & Dihing Group',
    code: 'DHG',
    topMD: 0,
    bottomMD: 950,
    color: '#e2e8f0',
    borderColor: '#94a3b8',
    textColor: '#334155',
    lithologyType: 'Unconsolidated Sands, Clays, Pebbly Gravel',
    porePressureAvg: 1.05,
    fracGradAvg: 1.45,
    drillingDifficulty: 'LOW',
    hazardSummary: 'Surface hole washout, gravel pack erosion, shallow gas pockets.'
  },
  {
    id: 'tipam',
    name: 'Tipam Sandstone Formation',
    code: 'TPM',
    topMD: 950,
    bottomMD: 2150,
    color: '#fef08a',
    borderColor: '#eab308',
    textColor: '#854d0e',
    lithologyType: 'Thick Porous Sandstone with Siltstone Ribs',
    porePressureAvg: 1.12,
    fracGradAvg: 1.52,
    drillingDifficulty: 'LOW-MEDIUM',
    hazardSummary: 'Permeable high seepage loss zone, filter cake buildup, minor differential sticking risk.'
  },
  {
    id: 'surma',
    name: 'Surma Group (Bokabil / Bhuban)',
    code: 'SRM',
    topMD: 2150,
    bottomMD: 2950,
    color: '#fed7aa',
    borderColor: '#f97316',
    textColor: '#9a3412',
    lithologyType: 'Alternating Fine Sandstone, Siltstone & Marine Shale',
    porePressureAvg: 1.20,
    fracGradAvg: 1.58,
    drillingDifficulty: 'MEDIUM',
    hazardSummary: 'Shale dispersion, moderate pore pressure transition, bit wear on hard siltstones.'
  },
  {
    id: 'barail',
    name: 'Barail Group (Coal-Shale & Main Sands)',
    code: 'BRL',
    topMD: 2950,
    bottomMD: 3450,
    color: '#cbd5e1',
    borderColor: '#475569',
    textColor: '#0f172a',
    lithologyType: 'Interbedded Coal Seams, Carbonaceous Shale, Tight Sandstone',
    porePressureAvg: 1.32,
    fracGradAvg: 1.62,
    drillingDifficulty: 'VERY HIGH (CRITICAL RISK)',
    hazardSummary: 'Severe mud loss into fractured coal seams, borehole collapse/sloughing in brittle shales, differential sticking, sudden ECD spikes.'
  },
  {
    id: 'kopili',
    name: 'Kopili Formation',
    code: 'KPL',
    topMD: 3450,
    bottomMD: 3750,
    color: '#e9d5ff',
    borderColor: '#a855f7',
    textColor: '#581c87',
    lithologyType: 'Splintery Calcareous Shale with Gas-Bearing Sand Streaks',
    porePressureAvg: 1.36,
    fracGradAvg: 1.68,
    drillingDifficulty: 'HIGH',
    hazardSummary: 'Overpressured gas kicks, sloughing splintery shale, tight hole during trips.'
  },
  {
    id: 'sylhet',
    name: 'Sylhet Limestone / Jaintia Group',
    code: 'SYL',
    topMD: 3750,
    bottomMD: 3850,
    color: '#bfdbfe',
    borderColor: '#3b82f6',
    textColor: '#1e3a8a',
    lithologyType: 'Hard Dense Crystalline Limestone with Vuggy Porosity',
    porePressureAvg: 1.28,
    fracGradAvg: 1.75,
    drillingDifficulty: 'MEDIUM-HIGH',
    hazardSummary: 'Low ROP, severe drill bit abrasive wear, potential total losses in cavernous/vuggy intervals.'
  }
];

export const PROACTIVE_ALERTS = [
  {
    id: 'ALT-2026-089',
    timestamp: '2026-09-30 00:52:10',
    severity: 'CRITICAL',
    title: 'High Risk: Severe Lost Circulation & Pack-off Imminent (Barail Coal Interface)',
    targetDepthRange: '3,280 m – 3,310 m MD',
    distanceAheadMeters: 31.6,
    confidenceScore: 94.2,
    predictedRiskType: 'MUD_LOSS_STICKING',
    status: 'ACTIVE_UNRESOLVED',
    contributingSignals: [
      { parameter: 'ECD Margin', current: '1.31 SG', threshold: '1.34 SG', status: 'Approaching Upper Fracture Limit' },
      { parameter: 'Offset Historical Losses', current: '3 Wells with >140 bbls lost', threshold: 'Depth 3,285-3,295m', status: 'Exact Stratigraphic Match' },
      { parameter: 'Formation Lithology', current: 'Micro-fractured Brittle Coal', threshold: 'Known Depleted Pressure Zone', status: 'High Vulnerability' },
      { parameter: 'Pore Pressure Ramp', current: '1.31 SG Eq.', threshold: 'Delta > 0.08 SG', status: 'Ramping' }
    ],
    offsetEvidence: [
      {
        wellId: 'NHK-519',
        distance: '1.42 km away',
        depth: '3,292 m MD',
        event: 'Lost 140 bbls PHPA mud in 35 mins; Standpipe pressure dropped 320 psi. Required 180 bbl coarse LCM pill.'
      },
      {
        wellId: 'JRJ-88',
        distance: '5.60 km away',
        depth: '3,285 m MD',
        event: 'Total loss of returns (600 bbls); induced by surge pressure while tripping in at 32 m/hr.'
      },
      {
        wellId: 'MRN-104',
        distance: '4.10 km away',
        depth: '3,305 m MD',
        event: 'BHA mechanically stuck after shale collapse; 48 hrs NPT fishing operation.'
      }
    ],
    prescriptiveSOP: {
      actionId: 'OIL-SOP-DRL-408-REV3',
      title: 'OIL Standard Mitigation Protocol for Barail Depleted Fractured Sands',
      steps: [
        'Pre-treat active suction pit with 25-30 ppb blended LCM (Nut Plug + Medium Mica + Calcium Carbonate) before reaching 3,275 m.',
        'Cap Equivalent Circulating Density (ECD) to <= 1.33 SG by reducing flow rate from 520 gpm to 460 gpm.',
        'Restrict maximum Rate of Penetration (ROP) to <= 8.0 m/hr to prevent cuttings loading and annular pack-off.',
        'Have 150 bbl heavy high-fluid-loss LCM squeeze pill ready in reserve tank #3 with pill density 1.26 SG.',
        'Perform flow check every 5 meters penetration in the 3,280 - 3,315 m interval.'
      ],
      estimatedNptSavedHours: 32,
      estimatedCostSavedLakhs: 48.5,
      approvalsNeeded: ['Senior Toolpusher', 'Drilling Superintendent (Duliajan HQ)']
    }
  },
  {
    id: 'ALT-2026-088',
    timestamp: '2026-09-30 00:41:05',
    severity: 'HIGH',
    title: 'Warning: Abnormal Pore Pressure & Potential Gas Influx at Kopili Top',
    targetDepthRange: '3,415 m – 3,450 m MD',
    distanceAheadMeters: 167.0,
    confidenceScore: 88.5,
    predictedRiskType: 'GAS_KICK',
    status: 'LOOKAHEAD_MONITORING',
    contributingSignals: [
      { parameter: 'Gas Show Predictor', current: '1.8% Total Gas', threshold: '4.5% Alarm', status: 'Gradual Trend Upward' },
      { parameter: 'Offset Kick Record', current: 'NHK-488 took 15 bbl kick at 3,420m', threshold: 'Pore Press 1.30 SG', status: 'Historical Precedent' }
    ],
    offsetEvidence: [
      {
        wellId: 'NHK-488',
        distance: '2.85 km away',
        depth: '3,420 m MD',
        event: 'Encountered pressurized gas streak in Kopili top shale. SIDPP 240 psi, SICP 380 psi. Driller\'s method kill executed.'
      }
    ],
    prescriptiveSOP: {
      actionId: 'OIL-SOP-WC-202-REV4',
      title: 'Kopili Formation Well Control & Transition Monitoring',
      steps: [
        'Test trip tank audio-visual alarm and zero trip sheet prior to entering Kopili top at 3,415 m.',
        'Increase mud density in active system from 1.24 SG to 1.28 SG in two staggered circulations before 3,400 m.',
        'Perform slow circulating rate (SCR) recording at 30, 40, and 50 SPM on both mud pumps every tour.'
      ],
      estimatedNptSavedHours: 18,
      estimatedCostSavedLakhs: 29.0,
      approvalsNeeded: ['Wellsite Drilling Engineer']
    }
  },
  {
    id: 'ALT-2026-087',
    timestamp: '2026-09-30 00:15:33',
    severity: 'MEDIUM',
    title: 'Advisory: Mechanical Torque & Drag Surge Trend',
    targetDepthRange: '3,310 m – 3,340 m MD',
    distanceAheadMeters: 62.0,
    confidenceScore: 81.0,
    predictedRiskType: 'TORQUE_DRAG',
    status: 'ACTIVE_MONITORING',
    contributingSignals: [
      { parameter: 'Surface Torque', current: '12.8 kft-lb', threshold: '16.5 kft-lb', status: 'Trending Up 8%/50m' },
      { parameter: 'Dogleg Severity', current: '1.8°/30m', threshold: '2.5°/30m', status: 'Within Limits' }
    ],
    offsetEvidence: [
      {
        wellId: 'NHK-505',
        distance: '3.20 km away',
        depth: '3,310 m MD',
        event: 'Overpull of 45 klbs during trip out due to tight hole in reactive shale ledge.'
      }
    ],
    prescriptiveSOP: {
      actionId: 'OIL-SOP-DRL-105',
      title: 'Wellbore Lubricity & Ledge Prevention Protocol',
      steps: [
        'Add 2% environmentally safe vegetable oil ester lubricant to active mud system.',
        'Wiper trip recommended every 150m or when back-reaming drag exceeds 25 klbs.'
      ],
      estimatedNptSavedHours: 10,
      estimatedCostSavedLakhs: 14.2,
      approvalsNeeded: ['Mud Engineer']
    }
  }
];

export const HISTORICAL_DOCUMENTS_OCR = [
  {
    id: 'DOC-WCR-NHK-519',
    title: 'Well Completion Report (WCR) – Well NHK-519',
    type: 'Well Completion Report',
    wellId: 'NHK-519',
    field: 'Naharkatiya Field, Assam',
    year: 2023,
    pages: 84,
    ocrConfidence: 98.4,
    nlpStatus: 'EXTRACTED & INDEXED',
    documentSummary: 'Comprehensive end-of-well completion report for NHK-519 drilled to 3,890m TD. Highlights major lost circulation incident in Barail coal sequence at 3,292m (140 bbls lost, cured with coarse LCM pill) and differential sticking in Kopili at 3,510m.',
    extractedEntities: {
      rig: 'OIL Rig-14',
      spudDate: '04-Feb-2023',
      completionDate: '18-Apr-2023',
      totalDays: 73,
      nptHours: 64,
      mudSystem: 'Polymer PHPA / KCL Glycol',
      casingShoes: ['20" @ 118m', '13-3/8" @ 920m', '9-5/8" @ 2980m', '7" @ 3890m'],
      lostCirculationZones: ['3,292 m (Barail Coal-Shale, 140 bbls lost)', '3,680 m (Seepage, 25 bbls)'],
      stuckPipeEvents: ['3,510 m (Differential sticking, 36 hrs NPT)'],
      formationTopsFound: ['Dihing: 0m', 'Tipam: 920m', 'Surma: 2150m', 'Barail: 2980m', 'Kopili: 3480m', 'Sylhet: 3760m']
    },
    ocrSnippetText: `...DRILLING OPERATIONS SUMMARY: While drilling 8-1/2" hole section at depth 3,292 m MD with mud weight 1.28 SG, sudden drop in standpipe pressure of 320 psi was observed along with loss of returns (total 140 bbls into formation). Bit had penetrated upper Barail coal seam interbedded with carbonaceous shale. ECD at time of loss was estimated at 1.37 SG which exceeded the local fracture resistance.
Pumping was suspended, annular closed. Pumped 180 bbl coarse fiber LCM pill (40 ppb Mica + Nut Plug + CaCO3) and displaced to bit depth. Allowed 4 hours soaking under 150 psi hesitation pressure. Full returns regained. Mud weight reduced to 1.24 SG to continue drilling without further losses...`,
    tags: ['Lost Circulation', 'Barail Coal', 'LCM Pill', 'Differential Sticking', 'PHPA Mud']
  },
  {
    id: 'DOC-DDR-MRN-104',
    title: 'Daily Drilling Report (DDR) Dossier – Well MRN-104 (Incident Depth 3,305m)',
    type: 'Daily Drilling Report (DDR)',
    wellId: 'MRN-104',
    field: 'Moran Field',
    year: 2020,
    pages: 142,
    ocrConfidence: 96.8,
    nlpStatus: 'EXTRACTED & INDEXED',
    documentSummary: 'Daily drilling reports spanning 3,250m to 3,400m MD. Captures torque spikes up to 29 kft-lb, bit balling, reactive shale sloughing, and subsequent mechanical pipe sticking leading to string parting and a 48-hr fishing job.',
    extractedEntities: {
      rig: 'OIL Rig-09',
      incidentDate: '14-Oct-2020',
      totalDays: 88,
      nptHours: 54,
      mudSystem: 'Low-Inhibition Water Based Gel Mud',
      casingShoes: ['13-3/8" @ 960m', '9-5/8" @ 2990m'],
      lostCirculationZones: ['None reported in this section'],
      stuckPipeEvents: ['3,305 m (Mechanical pack-off & drillstring parted)'],
      fishingOperations: ['Engaged fish with 8-1/8" Bowen Series 150 overshot, recovered BHA in 48 hrs']
    },
    ocrSnippetText: `...DDR #44: Depth 3,305 m. At 04:30 hrs, rotary torque erratic between 18 to 29 kft-lb. Pump pressure spiked to 3,400 psi indicating severe hole pack-off by sloughing Barail shales. Attempted to rotate and pull string with 80 klbs overpull without success. Jarred down with 120 klbs. At 07:15 hrs, string parted at 6-1/2" drill collar connection. Began fishing operations with overshot...`,
    tags: ['Stuck Pipe', 'Fishing', 'Torque Spike', 'Borehole Instability', 'Barail Shale']
  },
  {
    id: 'DOC-WCR-NHK-488',
    title: 'Well Completion Report – Well NHK-488 (Gas Kick & Well Control Event)',
    type: 'Well Completion Report',
    wellId: 'NHK-488',
    field: 'Naharkatiya Field',
    year: 2021,
    pages: 68,
    ocrConfidence: 97.9,
    nlpStatus: 'EXTRACTED & INDEXED',
    documentSummary: 'Detailed report on well control event in Kopili formation at 3,420m. Pit gain of 15 bbls detected by pit volume totalizer (PVT). Successfully killed using Driller\'s Method.',
    extractedEntities: {
      rig: 'OIL Rig-21',
      spudDate: '19-Jan-2021',
      completionDate: '26-Mar-2021',
      totalDays: 66,
      nptHours: 19,
      mudSystem: 'PHPA Polymer',
      casingShoes: ['13-3/8" @ 940m', '9-5/8" @ 2940m', '7" @ 3780m'],
      lostCirculationZones: ['Minor seepage at 1,840m'],
      stuckPipeEvents: ['None'],
      wellControlEvents: ['3,420 m (Gas kick 15 bbls, SIDPP 240 psi, SICP 380 psi)']
    },
    ocrSnippetText: `...WELL CONTROL EVENT AT 3,420 M: While drilling through the Kopili transition zone with 1.22 SG mud, a rapid pit volume gain of 15 bbls was observed in 8 mins. Active gas show increased to 12.4%. Well shut in on Annular BOP. Stabilized Shut-in Drill Pipe Pressure (SIDPP) = 240 psi, Shut-in Casing Pressure (SICP) = 380 psi. Driller's method employed. Kill mud weight calculated and adjusted to 1.30 SG. Circulation resumed without further influx...`,
    tags: ['Gas Kick', 'Well Control', 'Drillers Method', 'Kopili Overpressure', 'SIDPP']
  },
  {
    id: 'DOC-MUD-JRJ-88',
    title: 'Mud Logging & End of Well Drilling Log – Well JRJ-88',
    type: 'Mud Logging Report',
    wellId: 'JRJ-88',
    field: 'Jorajan Field',
    year: 2022,
    pages: 110,
    ocrConfidence: 99.1,
    nlpStatus: 'EXTRACTED & INDEXED',
    documentSummary: 'Comprehensive Mud Logging and Gas Chromatography record for JRJ-88 horizontal well. Provides high-resolution ROP, lithology cuttings analysis, calcimetry, total gas, C1-C5 chromatograms, and fracture loss logs in Barail reservoir.',
    extractedEntities: {
      rig: 'OIL Rig-16',
      totalDays: 92,
      nptHours: 42,
      mudSystem: 'Low Solids Non-Dispersed Polymer Mud',
      lostCirculationZones: ['3,285 m (600 bbls total loss in fractured coal)'],
      stuckPipeEvents: ['None - preventative reaming practiced']
    },
    ocrSnippetText: `...MUD LOGGING EVENT AT 3,285 M: Massive loss of returns. Total 600 bbls lost before dynamic seal created. Gas chromatography recorded total gas dip from 3.2% to 0.1% due to loss of fluid column head. Cross-linked polymer pill + 30 ppb calcium carbonate successfully bridged fracture aperture estimated at 1.8mm...`,
    tags: ['Mud Logging', 'Gas Chromatography', 'Total Loss', 'Fracture Aperture', 'Polymer Pill']
  },
  {
    id: 'DOC-CASING-NHK-505',
    title: 'Casing & Cementing Post-Job Report – Well NHK-505',
    type: 'Casing & Cementing Report',
    wellId: 'NHK-505',
    field: 'Naharkatiya Field',
    year: 2022,
    pages: 45,
    ocrConfidence: 98.0,
    nlpStatus: 'EXTRACTED & INDEXED',
    documentSummary: 'Engineering report on 9-5/8" and 7" casing landing and cement slurry placement across Barail and Kopili. Details slurry density, spacer volumes, cement bond log (CBL-VDL) evaluation, and successful isolation of coal loss intervals.',
    extractedEntities: {
      rig: 'OIL Rig-12',
      casingSize: '9-5/8" 47# N-80 Buttress @ 2,960m & 7" 29# P-110 @ 3,820m',
      slurryDensity: '1.58 SG Lead / 1.90 SG Tail',
      cblQuality: 'Excellent bond index (>0.85) across Barail section'
    },
    ocrSnippetText: `...CEMENTING EVALUATION: CBL-VDL run across 9-5/8" casing indicated excellent zonal isolation across the depleted Barail coal layers (2,960 - 3,460 m). Pre-flush consisted of 40 bbls chemical wash and 50 bbls weighted spacer at 1.45 SG to prevent channeling...`,
    tags: ['Casing Program', 'Cement Bond Log', 'CBL-VDL', 'Zonal Isolation']
  }
];

export const DEPTH_CORRELATION_TRACKS = [
  { depth: 2900, formation: 'Surma Group', nhk542_gr: 45, nhk542_rop: 22.5, nhk519_gr: 42, mrn104_gr: 48, jrj88_gr: 44, lithology: 'Shale/Sand', riskScore: 12 },
  { depth: 2950, formation: 'Barail Top', nhk542_gr: 88, nhk542_rop: 18.0, nhk519_gr: 85, mrn104_gr: 92, jrj88_gr: 84, lithology: 'Carbonaceous Shale', riskScore: 35 },
  { depth: 3000, formation: 'Barail Upper', nhk542_gr: 120, nhk542_rop: 14.5, nhk519_gr: 115, mrn104_gr: 125, jrj88_gr: 118, lithology: 'Coal Seam', riskScore: 48 },
  { depth: 3050, formation: 'Barail Sand 1', nhk542_gr: 38, nhk542_rop: 26.0, nhk519_gr: 40, mrn104_gr: 36, jrj88_gr: 42, lithology: 'Porous Sandstone', riskScore: 28 },
  { depth: 3100, formation: 'Barail Mid', nhk542_gr: 95, nhk542_rop: 16.2, nhk519_gr: 92, mrn104_gr: 98, jrj88_gr: 90, lithology: 'Shale', riskScore: 42 },
  { depth: 3150, formation: 'Barail Mid', nhk542_gr: 110, nhk542_rop: 15.0, nhk519_gr: 108, mrn104_gr: 112, jrj88_gr: 105, lithology: 'Coal / Shale', riskScore: 56 },
  { depth: 3200, formation: 'Barail Mid', nhk542_gr: 130, nhk542_rop: 12.8, nhk519_gr: 128, mrn104_gr: 135, jrj88_gr: 126, lithology: 'Coal Seam', riskScore: 68 },
  { depth: 3248, formation: 'Barail Current Bit Depth', nhk542_gr: 105, nhk542_rop: 14.2, nhk519_gr: 102, mrn104_gr: 110, jrj88_gr: 104, lithology: 'Fractured Sand-Coal Interbed', riskScore: 78, isCurrentDepth: true },
  { depth: 3285, formation: 'Barail High-Risk Loss Zone (Look-Ahead)', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 145, mrn104_gr: 140, jrj88_gr: 150, lithology: 'Micro-fractured Brittle Coal', riskScore: 94, isImminentHazard: true, hazardNote: 'Historical 140-600 bbl mud losses occurred here in NHK-519 & JRJ-88' },
  { depth: 3305, formation: 'Barail Tight Hole Zone', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 125, mrn104_gr: 132, jrj88_gr: 120, lithology: 'Reactive Sloughing Shale', riskScore: 86, isImminentHazard: true, hazardNote: 'MRN-104 stuck pipe & fishing event at 3,305m' },
  { depth: 3350, formation: 'Barail Lower', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 55, mrn104_gr: 52, jrj88_gr: 58, lithology: 'Sandstone', riskScore: 40 },
  { depth: 3400, formation: 'Barail Base', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 70, mrn104_gr: 68, jrj88_gr: 74, lithology: 'Siltstone', riskScore: 50 },
  { depth: 3450, formation: 'Kopili Top (Gas Kick Zone)', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 115, mrn104_gr: 120, jrj88_gr: 112, lithology: 'Overpressured Gas Shale', riskScore: 88, isFutureHazard: true, hazardNote: 'NHK-488 15 bbl gas kick at 3,420m' },
  { depth: 3550, formation: 'Kopili Mid', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 95, mrn104_gr: 98, jrj88_gr: 92, lithology: 'Calcareous Shale', riskScore: 55 },
  { depth: 3650, formation: 'Kopili Base', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 85, mrn104_gr: 88, jrj88_gr: 82, lithology: 'Shale', riskScore: 45 },
  { depth: 3750, formation: 'Sylhet Limestone Top', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 22, mrn104_gr: 25, jrj88_gr: 20, lithology: 'Hard Dense Limestone', riskScore: 60, hazardNote: 'Low ROP, high bit vibration' },
  { depth: 3850, formation: 'Target Planned TD', nhk542_gr: null, nhk542_rop: null, nhk519_gr: 18, mrn104_gr: 20, jrj88_gr: 16, lithology: 'Limestone / Basement', riskScore: 20 }
];

export const DRILLING_ANALYTICS_KPIS = {
  currentWell: {
    daysSinceSpud: 49,
    plannedDays: 64,
    currentNptHours: 4.5,
    plannedNptHours: 24,
    drillingEfficiencyPct: 96.8,
    costSavingsVsOffsetLakhs: 62.4,
    aiAlertsResolved: 8,
    preventedIncidents: 3
  },
  offsetComparison: [
    { name: 'Well NHK-519 (2023)', totalDays: 73, nptHours: 64, costTotalCr: 18.2, mudLossBbls: 165, stuckPipeHours: 36 },
    { name: 'Well MRN-104 (2020)', totalDays: 88, nptHours: 54, costTotalCr: 21.5, mudLossBbls: 20, stuckPipeHours: 54 },
    { name: 'Well JRJ-88 (2022)', totalDays: 92, nptHours: 42, costTotalCr: 24.8, mudLossBbls: 600, stuckPipeHours: 0 },
    { name: 'Well NHK-488 (2021)', totalDays: 66, nptHours: 19, costTotalCr: 16.4, mudLossBbls: 15, stuckPipeHours: 0 },
    { name: 'Active NHK-542 (NWIS AI Assisted)', totalDays: 49, nptHours: 4.5, costTotalCr: 12.1, mudLossBbls: 0, stuckPipeHours: 0 }
  ]
};
