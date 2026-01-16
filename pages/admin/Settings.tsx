import React from 'react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeColor } from '../../types';
import { THEME_COLORS } from '../../constants';
import { Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { siteData, updateSiteData } = useData();
  const { color, changeColor, darkMode, toggleDarkMode } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSiteData({ ...siteData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">إعدادات الموقع</h2>
        <p className="text-gray-500 dark:text-gray-400">تخصيص المظهر والمعلومات الأساسية</p>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">المظهر والألوان</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">لون الثيم الأساسي</label>
            <div className="flex flex-wrap gap-4">
              {Object.entries(THEME_COLORS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => changeColor(key as ThemeColor)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${key === color ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500' : ''}`}
                  style={{ backgroundColor: value.hex }}
                >
                  {key === color && <Check className="text-white" size={20} />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">الوضع الليلي</span>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-1' : 'translate-x-6'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* General Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">البيانات الأساسية</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">العنوان الرئيسي (Hero Title)</label>
            <input
              type="text"
              name="heroTitle"
              value={siteData.heroTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">العنوان الفرعي</label>
            <input
              type="text"
              name="heroSubtitle"
              value={siteData.heroSubtitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رابط صورة الملف الشخصي (قسم من أنا)</label>
            <input
              type="url"
              name="aboutImage"
              value={siteData.aboutImage}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-1">اتركه فارغاً لاستخدام الصورة الافتراضية</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نبذة عني</label>
            <textarea
              name="aboutText"
              rows={4}
              value={siteData.aboutText}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={siteData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الهاتف</label>
            <input
              type="text"
              name="phone"
              value={siteData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رابط GitHub</label>
            <input
              type="url"
              name="github"
              value={siteData.github}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رابط LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={siteData.linkedin}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};