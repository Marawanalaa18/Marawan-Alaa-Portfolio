import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Service, SiteData, Skill, BlogPost } from '../types';
import { INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_SITE_DATA, INITIAL_SKILLS, INITIAL_POSTS } from '../constants';

interface DataContextType {
  siteData: SiteData;
  updateSiteData: (data: SiteData) => void;
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  visitorStats: { total: number; today: number };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or use constants
  const [siteData, setSiteData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('site_data');
    return saved ? JSON.parse(saved) : INITIAL_SITE_DATA;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('site_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('site_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('site_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('site_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [visitorStats, setVisitorStats] = useState({ total: 1250, today: 45 });

  // Visitor Counter Logic (Simulated Analytics)
  useEffect(() => {
    const visited = sessionStorage.getItem('session_visited');
    let total = parseInt(localStorage.getItem('site_visits_total') || '1250');
    let today = parseInt(localStorage.getItem('site_visits_today') || '45');
    
    // Reset today stats if new day (simple check)
    const lastDate = localStorage.getItem('site_last_visit_date');
    const currentDate = new Date().toDateString();

    if (lastDate !== currentDate) {
      today = Math.floor(Math.random() * 20) + 10; // Random start for new day demo
      localStorage.setItem('site_last_visit_date', currentDate);
    }

    if (!visited) {
      total++;
      today++;
      localStorage.setItem('site_visits_total', total.toString());
      localStorage.setItem('site_visits_today', today.toString());
      sessionStorage.setItem('session_visited', 'true');
    }

    setVisitorStats({ total, today });
  }, []);


  // Effects to save to local storage
  useEffect(() => localStorage.setItem('site_data', JSON.stringify(siteData)), [siteData]);
  useEffect(() => localStorage.setItem('site_projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('site_skills', JSON.stringify(skills)), [skills]);
  useEffect(() => localStorage.setItem('site_services', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('site_posts', JSON.stringify(posts)), [posts]);

  // Actions
  const updateSiteData = (data: SiteData) => setSiteData(data);

  const addProject = (project: Project) => setProjects(prev => [project, ...prev]);
  const updateProject = (project: Project) => setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  const addSkill = (skill: Skill) => setSkills(prev => [...prev, skill]);
  const deleteSkill = (id: string) => setSkills(prev => prev.filter(s => s.id !== id));

  const addService = (service: Service) => setServices(prev => [...prev, service]);
  const updateService = (service: Service) => setServices(prev => prev.map(s => s.id === service.id ? service : s));
  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  const addPost = (post: BlogPost) => setPosts(prev => [post, ...prev]);
  const updatePost = (post: BlogPost) => setPosts(prev => prev.map(p => p.id === post.id ? post : p));
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  return (
    <DataContext.Provider value={{
      siteData,
      updateSiteData,
      projects,
      addProject,
      updateProject,
      deleteProject,
      skills,
      addSkill,
      deleteSkill,
      services,
      addService,
      updateService,
      deleteService,
      posts,
      addPost,
      updatePost,
      deletePost,
      visitorStats
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};