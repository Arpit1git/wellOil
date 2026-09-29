# 🛢️ OIL NWIS — Nearby Wells Intelligence System
### Decision-Support AI for Oil India Limited (OIL) Drilling Operations
**Smart India Hackathon (SIH) 2026 Prototype — Developed by Team KUROHANA**

---

## 🌟 Executive Overview & Purpose
Oil India Limited has a digital real-time monitoring system (**eRTMAC**) providing live telemetry, mud logging data, and wellsite analytics. However, drilling decisions in geologically complex formations (e.g., the Assam-Arakan Basin: Naharkatiya, Moran, Jorajan fields) require historical context and operational memory from nearby offset wells.

**OIL NWIS** acts as an AI/ML-enabled decision-support platform operating alongside eRTMAC to eliminate non-productive time (NPT), prevent catastrophic drilling hazards (mud losses, kicks, differential sticking, torque spikes), and provide institutional memory.

---

## 🚀 Key Functional Modules & USPs (Light Industrial UI)

### 1. 🧭 Geospatial Offset-Well Proximity Engine
- **Proximity Radar**: Visualizes offset wells within user-defined radii (2 km, 5 km, 10 km, 15 km) relative to active well `NHK-542`.
- **Geological Overlays**: Fault zones (Duliajan Thrust Fault), structure depth contours (-2950m Barail Top, -3500m Kopili), and 2D seismic lines.
- **Risk Heatmap**: Highlights historical incident clusters (severe mud losses, stuck pipe zones).
- **Stratigraphic Similarity Index**: Prioritizes offset wells by stratigraphy match (>90%).

### 2. 📊 Multi-Well Depth & Stratigraphy Correlation Track
- **Depth-Aware Risk**: Synchronizes active well bit depth (`3,248 m MD`) with offset logs (Gamma Ray, ROP, Lithology).
- **Look-Ahead Hazard Corridor**: Proactively highlights impending hazard zones (`3,280 m - 3,310 m` Barail coal loss zone) exactly **31.6m ahead of the drill bit**.
- **Offset Incident Pins**: Correlates historical losses (`NHK-519` lost 140 bbls at 3,292m; `MRN-104` stuck pipe at 3,305m; `JRJ-88` total loss at 3,285m).

### 3. 🚨 Explainable AI Early Warning Engine
- **Multi-Risk Detection**: Evaluates ECD limits, pore pressure ramps, torque/drag spikes, and gas influx potential.
- **Explainability**: Every warning is backed by contributing real-time signals + direct citations to historical Well Completion Reports (WCR).
- **One-Click Dispatch**: Broadcast alerts directly to Rig Floor, Toolpusher, and Duliajan Drilling HQ.

### 4. 🛡️ Prescriptive Mitigation & Hydraulics Calculator
- **Interactive Safe Operating Window**: Real-time ECD calculation vs Pore Pressure (1.31 SG) and Formation Fracture Limit (1.34 SG).
- **Verified SOP Checklist**: Step-by-step OIL Standard Operating Procedure (`OIL-SOP-DRL-408`) for pre-treating mud with 30 ppb LCM and capping pump rates.
- **ROI Metric**: Estimates avoided NPT (32 hrs) and cost savings (₹48.5 Lakhs).

### 5. 📄 OCR & NLP Historical Drilling Knowledge Hub
- **Semantic Natural Language Search**: Query across 420+ indexed historical reports (*"Find all stuck pipe incidents in Barail formation"*).
- **NLP Structured Entity Extraction**: Automatically extracts casing shoe depths, mud weights, NPT hours, fishing tools used, and formation tops from PDF reports.
- **OCR Snippet Inspector**: High-confidence text ground truth viewer.

### 6. ⚡ eRTMAC Live Telemetry Stream & Drill Simulator
- Real-time gauge cluster: Measured Depth, TVD, ROP, WOB, RPM, Standpipe Pressure, Flow In/Out balance, Mud Density In/Out, Pit Volume gain/loss, and Gas Chromatography (C1-C3).
- **"Auto-Drill Simulator" & "+10m / Jump to Hazard"**: Allows drillers to simulate penetrating deeper into the formation to test early warning triggering.

### 7. 📑 Automated Operational Decision Support Memo
- Generates official OIL engineering memos with memo reference numbers, risk summaries, offset audits, and sign-off blocks ready for print / PDF export.

---

## 💻 Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Tailored Light Industrial Theme with Crisp Slate & Petroleum Blue Palette)
- **Icons**: Lucide React
- **Data Visualizations**: Recharts + Custom High-Performance SVG Geospatial Radar & Well Log Tracks

---

## 🛠️ Running Locally

```bash
# Clone or navigate to directory
cd c:/Users/arpit/Documents/sih_2nd_idea

# Install dependencies
npm install

# Start Vite dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build
```
