export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  readTime: string;
}

export interface SiteData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  aboutImage: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export type ThemeColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';

export interface ThemeConfig {
  darkMode: boolean;
  color: ThemeColor;
}