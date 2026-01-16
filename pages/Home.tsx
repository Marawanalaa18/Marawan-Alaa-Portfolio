import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { ArrowLeft, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Layout, Smartphone, Database, Server, Globe, PenTool } from 'lucide-react';

const IconMap: Record<string, React.FC<any>> = {
  Code, Palette, Zap, Layout, Smartphone, Database, Server, Globe, PenTool
};

export const Home: React.FC = () => {
  const { siteData, projects, skills, services } = useData();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title={siteData.heroTitle.split(' ').slice(0, 3).join(' ')} 
        description={siteData.aboutText}
        image={siteData.aboutImage}
      />
      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6">
              متاح للعمل الحر 🚀
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              {siteData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              {siteData.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30 flex items-center gap-2"
              >
                تصفح أعمالي <ArrowLeft size={20} />
              </a>
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold text-lg transition-all"
              >
                تواصل معي
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">من أنا؟</h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden relative">
              <img 
                src={siteData.aboutImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                alt="Profile" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">نبذة عني</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed whitespace-pre-line">
                {siteData.aboutText}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">البريد الإلكتروني</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{siteData.email}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">الهاتف</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{siteData.phone}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a href={siteData.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <Github size={24} />
                </a>
                <a href={siteData.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href={`mailto:${siteData.email}`} className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">المهارات</h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className="text-sm text-primary-600 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">خدماتي</h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = IconMap[service.icon] || Zap;
              return (
                <div key={service.id} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                  <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6 text-primary-600 dark:text-primary-400">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">أعمالي</h2>
            <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-2 block uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">تواصل معي</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              هل لديك مشروع في ذهنك؟ لنعمل معاً على تحويله إلى واقع.
            </p>
          </div>
          
          <a 
            href={`mailto:${siteData.email}`} 
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-primary-500/30"
          >
            <Mail size={24} />
            <span>ابدأ محادثة</span>
          </a>
        </div>
      </section>
    </>
  );
};