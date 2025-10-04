import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './components/Dashboard';
import { DataSourcesPanel } from './components/DataSourcesPanel';
import { ThematicAnalysis } from './components/ThematicAnalysis';
import { AskTheData } from './components/AskTheData';
import { Architecture } from './components/Architecture';
import { GalaxyView } from './components/GalaxyView';
import { DetailInfoPanel } from './components/DetailInfoPanel';
import { BottomPanel } from './components/BottomPanel';
import { VirtualExperimentSimulation } from './components/VirtualExperimentSimulation';
import type { Publication } from './types';
import { MOCK_PUBLICATIONS } from './constants';

export type CenterViewType = 'dashboard' | 'galaxy' | 'architecture' | 'simulation';
export type DetailContentType = { type: 'publication'; data: Publication } | { type: 'node'; data: any } | null;

const App: React.FC = () => {
  const [centerView, setCenterView] = useState<CenterViewType>('galaxy');
  const [dashboardPublications, setDashboardPublications] = useState<Publication[]>(MOCK_PUBLICATIONS);
  const [detailContent, setDetailContent] = useState<DetailContentType>(null);

  const publications = useMemo(() => MOCK_PUBLICATIONS, []);

  const handleAnalyzeSelection = useCallback((selectedIds: Set<string>) => {
    const selectedPubs = publications.filter(pub => selectedIds.has(pub.id));
    setDashboardPublications(selectedPubs.length > 0 ? selectedPubs : publications);
    setCenterView('dashboard');
  }, [publications]);
  
  const handleShowDetails = useCallback((content: DetailContentType) => {
    setDetailContent(content);
  }, []);

  const renderCenterView = () => {
    switch (centerView) {
      case 'dashboard':
        return <Dashboard 
                  onSelectPublication={(pub) => handleShowDetails({ type: 'publication', data: pub })} 
                  publications={dashboardPublications} 
                  fullPublicationCount={publications.length} 
                />;
      case 'galaxy':
        return <GalaxyView 
                  publications={publications} 
                  onShowDetails={handleShowDetails} 
                />;
      case 'architecture':
        return <Architecture />;
      case 'simulation':
        return <VirtualExperimentSimulation />;
      default:
        return <Dashboard 
                  onSelectPublication={(pub) => handleShowDetails({ type: 'publication', data: pub })} 
                  publications={dashboardPublications} 
                  fullPublicationCount={publications.length}
                />;
    }
  };

  return (
    <div className="flex h-screen bg-space-dark font-sans flex-col relative">
      <Header />
      <MainLayout
        leftPanel={
          <DataSourcesPanel 
            publications={publications} 
            onAnalyzeSelection={handleAnalyzeSelection}
            onSelectItem={(pub) => handleShowDetails({ type: 'publication', data: pub })}
          />
        }
        centerPanel={
          <div className="w-full h-full flex flex-col bg-space-dark">
            {renderCenterView()}
          </div>
        }
        rightPanel={
          <DetailInfoPanel content={detailContent} onClear={() => setDetailContent(null)}/>
        }
        centerView={centerView}
        setCenterView={setCenterView}
      />
      <BottomPanel 
        askTheData={<AskTheData publications={publications} />}
        thematicAnalysis={<ThematicAnalysis publications={publications} />}
      />
    </div>
  );
};

export default App;
