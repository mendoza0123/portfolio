export type ProjectCategory = 
  | 'all'
  | 'ai_automation'
  | 'voice_ai'
  | 'enterprise_apps'
  | 'rapid_tooling'
  | 'ecommerce_3d'
  | 'data_knowledge';

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
  description: string;
}

export interface DefectResolution {
  problem: string;
  rootCause: string;
  solution: string;
  impact: string;
}

export interface ProjectBrief {
  id: string;
  briefNumber: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  clientContext: string;
  businessProblem: string;
  businessOutcome: string;
  architectureSummary: string;
  architectureNodes: string[];
  apiIntegrations: {
    service: string;
    endpoint?: string;
    purpose: string;
    details: string;
  }[];
  customCode: {
    title: string;
    description: string;
    snippets?: CodeSnippet[];
  };
  deploymentDetails: {
    stack: string;
    hosting: string;
    specialFixes: string[];
  };
  demonstrates: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  featured: boolean;
  defectLog?: DefectResolution[];
}

export interface TechStackItem {
  name: string;
  iconName: string;
  role: string;
  badge?: string;
}

export interface TechStackCategory {
  category: string;
  description: string;
  items: TechStackItem[];
}

export interface VoiceAgentSample {
  id: string;
  name: string;
  platform: string;
  persona: string;
  language: string;
  stt: string;
  tts: string;
  llm: string;
  latency: string;
  costPerMin: string;
  /** Served from /public. When present the studio plays this real recording instead of speech synthesis. */
  audioUrl?: string;
  /** Filename shown in the player chrome. */
  audioFileName?: string;
  /** Portion of the recording this transcript covers, in seconds. Omit to use the whole file. */
  clipStart?: number;
  clipEnd?: number;
  /** Treat transcript timestamps as exact audio offsets instead of stretching them over the clip. */
  absoluteTiming?: boolean;
  transcript: {
    speaker: 'agent' | 'user';
    text: string;
    timestamp: string;
    intent?: string;
    detectedAttributes?: Record<string, string>;
  }[];
  keyFeatures: string[];
}
