import React, { useState } from 'react';
import Header from './components/Header';
import OverviewDashboard from './components/OverviewDashboard';
import GeospatialMap from './components/GeospatialMap';
import DepthCorrelationLog from './components/DepthCorrelationLog';
import ProactiveAlerts from './components/ProactiveAlerts';
import PrescriptiveMitigation from './components/PrescriptiveMitigation';
import KnowledgeBaseOCR from './components/KnowledgeBaseOCR';
import LiveTelemetryStream from './components/LiveTelemetryStream';
import WellDossierModal from './components/WellDossierModal';
import ReportGeneratorModal from './components/ReportGeneratorModal';

import {
  ACTIVE_WELL,
  LIVE_TELEMETRY,
  OFFSET_WELLS,
  PROACTIVE_ALERTS
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWell, setSelectedWell] = useState(null);
  const [showWellModal, setShowWellModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [simulatedDepthOffset, setSimulatedDepthOffset] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Handle selecting an offset well
  const handleSelectWell = (well) => {
    setSelectedWell(well);
    setShowWellModal(true);
  };

  // Handle navigating directly to an alert
  const handleNavigateToAlert = (alertId) => {
    setActiveTab('alerts');
  };

  // Handle correlate action from modal
  const handleCorrelateWell = (well) => {
    setSelectedWell(well);
    setActiveTab('correlation');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeWell={ACTIVE_WELL}
        liveTelemetry={LIVE_TELEMETRY}
        alerts={PROACTIVE_ALERTS}
        onOpenSimulator={() => setActiveTab('telemetry')}
        onOpenReportModal={() => setShowReportModal(true)}
        simulatedDepthOffset={simulatedDepthOffset}
        isSimulating={isSimulating}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewDashboard
            activeWell={ACTIVE_WELL}
            liveTelemetry={LIVE_TELEMETRY}
            alerts={PROACTIVE_ALERTS}
            offsetWells={OFFSET_WELLS}
            setActiveTab={setActiveTab}
            onSelectWell={handleSelectWell}
            simulatedDepthOffset={simulatedDepthOffset}
            onOpenReportModal={() => setShowReportModal(true)}
          />
        )}

        {activeTab === 'map' && (
          <GeospatialMap
            activeWell={ACTIVE_WELL}
            offsetWells={OFFSET_WELLS}
            onSelectWell={handleSelectWell}
            selectedWell={selectedWell}
          />
        )}

        {activeTab === 'correlation' && (
          <DepthCorrelationLog
            activeWell={ACTIVE_WELL}
            onNavigateToAlert={handleNavigateToAlert}
            simulatedDepthOffset={simulatedDepthOffset}
          />
        )}

        {activeTab === 'alerts' && (
          <ProactiveAlerts
            alerts={PROACTIVE_ALERTS}
            onApplySop={() => setActiveTab('mitigation')}
            activeWell={ACTIVE_WELL}
          />
        )}

        {activeTab === 'mitigation' && (
          <PrescriptiveMitigation
            activeWell={ACTIVE_WELL}
            liveTelemetry={LIVE_TELEMETRY}
          />
        )}

        {activeTab === 'ocr' && (
          <KnowledgeBaseOCR />
        )}

        {activeTab === 'telemetry' && (
          <LiveTelemetryStream
            liveTelemetry={LIVE_TELEMETRY}
            simulatedDepthOffset={simulatedDepthOffset}
            setSimulatedDepthOffset={setSimulatedDepthOffset}
            isSimulating={isSimulating}
            setIsSimulating={setIsSimulating}
          />
        )}
      </main>

      {/* Offset Well Dossier Modal */}
      {showWellModal && selectedWell && (
        <WellDossierModal
          well={selectedWell}
          onClose={() => setShowWellModal(false)}
          onCorrelate={handleCorrelateWell}
        />
      )}

      {/* Official Decision Memo / Report Modal */}
      {showReportModal && (
        <ReportGeneratorModal
          activeWell={ACTIVE_WELL}
          liveTelemetry={LIVE_TELEMETRY}
          alerts={PROACTIVE_ALERTS}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {/* Footer Strip */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">Oil India Limited (OIL)</span>
            <span>•</span>
            <span>Nearby Wells Intelligence System (NWIS)</span>
          </div>

          <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
            <span>Assam-Arakan Basin Core Engine</span>
            <span>•</span>
            <span>SIH 2026 Prototype by Team KUROHANA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
