import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { Moon, Sun, Menu, X, Lock } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { siteData } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navLinks = [
    { name: 'الرئيسية', href: '/#home', type: 'anchor' },
    { name: 'عني', href: '/#about', type: 'anchor' },
    { name: 'المهارات', href: '/#skills', type: 'anchor' },
    { name: 'أعمالي', href: '/#projects', type: 'anchor' },
    { name: 'المدونة', href: '/blog', type: 'route' },
    { name: 'تواصل معي', href: '/#contact', type: 'anchor' },
  ];

  const handleNavigation = (link: { href: string; type: string }) => {
    setIsMenuOpen(false);
    if (link.type === 'route') {
      navigate(link.href);
      window.scrollTo(0, 0);
    } else {
      const targetId = link.href.replace('/#', '');
      
      // If we are on home page, scroll directly
      if (location.pathname === '/' || location.pathname === '') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Update URL hash without reloading
        window.history.pushState(null, '', link.href);
      } else {
        // If not on home page, navigate to home with hash
        // The Home component will handle scrolling via useEffect
        navigate(link.href);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[Cairo]">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex-shrink-0 font-bold text-2xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              {siteData.heroTitle.split(' ').slice(-2).join(' ')}
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavigation(link)}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium w-full text-right"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-16">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} جميع الحقوق محفوظة.
          </p>
          <div className="mt-4 flex justify-center space-x-4 space-x-reverse">
            <a href={siteData.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">GitHub</a>
            <a href={siteData.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">LinkedIn</a>
          </div>
          <div className="mt-8 flex justify-center">
             <Link to="/login" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Lock size={16} />
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};