// Shared types across the CRIVORRA web ecosystem
export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface EcosystemServiceNode {
  id: string;
  name: string;
  shortName: string;
  category: 'STRATEGY & AUDIENCE' | 'SEARCH DOMINANCE' | 'PAID MEDIA ACQUISITION' | 'AI & DATA INTELLIGENCE';
  color: string;
  secondaryColor: string;
  position: [number, number, number];
  summary: string;
  deliverables: string[];
  growthMetric: string;
  metricLabel: string;
}
