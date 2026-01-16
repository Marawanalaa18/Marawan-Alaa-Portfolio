import React from 'react';
import { useData } from '../../context/DataContext';
import { FolderKanban, Wrench, Eye, Users, ArrowUp, BarChart2, BookOpen } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { projects, skills, posts, visitorStats } = useData();

  // Mock data generation for chart visualization
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    // Generate pseudorandom numbers based on total visits to look consistent
    const val = Math.floor((visitorStats.total / (i + 5)) + (Math.random() * 20));
    return { day: d.toLocaleDateString('ar-EG', { weekday: 'short' }), value: val };
  });

  const maxVal = Math.max(...last7Days.map(d => d.value));

  const stats = [
    { label: 'إجمالي الزيارات', value: visitorStats.total.toLocaleString(), icon: Eye, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', trend: '+12%' },
    { label: 'زوار اليوم', value: visitorStats.today, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: '+5%' },
    { label: 'عدد المشاريع', value: projects.length, icon: FolderKanban, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'المقالات المنشورة', value: posts.length, icon: BookOpen, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-900/30' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">تحليل البيانات</h2>
          <p className="text-gray-500 dark:text-gray-400">تابع أداء موقعك وإحصائيات الزوار</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           محدث الآن
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              {stat.trend && (
                <div className="flex items-center text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <ArrowUp size={12} className="mr-1" />
                  {stat.trend}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart2 size={20} className="text-primary-500" />
              إحصائيات الزوار (آخر 7 أيام)
            </h3>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
            {last7Days.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                <div className="relative w-full flex justify-center">
                   <div 
                    className="w-full max-w-[40px] bg-primary-100 dark:bg-primary-900/30 rounded-t-lg transition-all duration-500 group-hover:bg-primary-500 relative"
                    style={{ height: `${(item.value / maxVal) * 200}px` }}
                   >
                     {/* Tooltip */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                       {item.value} زيارة
                     </div>
                   </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">آخر النشاطات</h3>
          <div className="space-y-6">
            <div className="relative pl-4 border-r border-gray-200 dark:border-gray-700 space-y-6">
              {posts.slice(0, 3).map((post, idx) => (
                <div key={post.id} className="relative pr-6">
                  <div className="absolute -right-1.5 top-1.5 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-800"></div>
                  <p className="text-xs text-gray-400 mb-1">{post.date}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">تم نشر مقال جديد: <span className="text-primary-600">"{post.title}"</span></p>
                </div>
              ))}
              {projects.slice(0, 2).map((project, idx) => (
                <div key={project.id} className="relative pr-6">
                  <div className="absolute -right-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-800"></div>
                  <p className="text-xs text-gray-400 mb-1">تحديث</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">تم إضافة مشروع: <span className="text-blue-500">"{project.title}"</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};