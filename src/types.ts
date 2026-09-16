export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface ServiceCardItem {
  number: string;
  title: string;
  division: 'DIGITALS' | 'TECHNOLOGIES' | 'GROWTH';
  tags: string[];
  description: string;
  iconName: string;
  gradient: string;
  highlightMetric: string;
}

export interface ServiceFlowItem {
  id: string;
  title: string;
  subtitle: string;
  division: string;
  deliverables: string[];
  tools: string[];
  impactMetric: string;
  impactLabel: string;
}

export interface GrowthEngineStep {
  id: string;
  number: string;
  name: string;
  tagline: string;
  items: string[];
  metric: string;
  color: string;
}

export interface TechNodeItem {
  name: string;
  category: 'Analytics' | 'Advertising' | 'Search & AI' | 'Automation';
  description: string;
  x: number; // percentage in orbit
  y: number;
  delay: number;
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  keyMetric: string;
  featuredWork: string;
}

export interface CaseStudyItem {
  id: string;
  client: string;
  industry: string;
  division: 'CRIVORRA DIGITALS' | 'CRIVORRA TECHNOLOGIES';
  challenge: string;
  solution: string;
  services: string[];
  results: {
    metric: string;
    label: string;
  }[];
  accentColor: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
  points: string[];
}
