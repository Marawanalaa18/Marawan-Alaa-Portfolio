import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { Login } from './pages/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ProjectsManager } from './pages/admin/ProjectsManager';
import { SkillsManager } from './pages/admin/SkillsManager';
import { ServicesManager } from './pages/admin/ServicesManager';
import { BlogManager } from './pages/admin/BlogManager';
import { Settings } from './pages/admin/Settings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DataProvider>
          <AuthProvider>
            <HashRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <Layout>
                    <Home />
                  </Layout>
                } />

                <Route path="/blog" element={
                  <Layout>
                    <Blog />
                  </Layout>
                } />

                <Route path="/blog/:id" element={
                  <Layout>
                    <BlogPostPage />
                  </Layout>
                } />
                
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="projects" element={<ProjectsManager />} />
                  <Route path="skills" element={<SkillsManager />} />
                  <Route path="services" element={<ServicesManager />} />
                  <Route path="blog" element={<BlogManager />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </HashRouter>
          </AuthProvider>
        </DataProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);