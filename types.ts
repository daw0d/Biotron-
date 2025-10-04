export type ViewType = 'dashboard' | 'explorer' | 'analysis' | 'ask' | 'architecture' | 'galaxy' | 'simulation';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  journal: string;
  doi?: string;
}

export interface StructuredSummary {
  objective: string;
  methods: string;
  keyFindings: string[];
  knowledgeGaps: string[];
}

export interface KnowledgeGraphData {
    concepts: string[];
    organisms: string[];
}

export interface ThematicAnalysisResult {
    progress: string;
    consensus: string;
    disagreements: string;
    gaps: string;
}

export interface SimulationParams {
  environment: string;
  organism: string;
  duration: number;
  experiment: string;
}

export interface SimulationResult {
  summary: string;
  data: { name: string; value: number }[];
}
