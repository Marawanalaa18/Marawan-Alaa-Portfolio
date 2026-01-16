import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Skill } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const SkillsManager: React.FC = () => {
  const { skills, addSkill, deleteSkill } = useData();
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Frontend' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill({
      id: Date.now().toString(),
      name: newSkill.name,
      level: newSkill.level,
      category: newSkill.category as any
    });
    setNewSkill({ name: '', level: 50, category: 'Frontend' });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة المهارات</h2>
        <p className="text-gray-500 dark:text-gray-400">أضف واحذف المهارات التقنية</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add New Skill */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm sticky top-8">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">إضافة مهارة جديدة</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اسم المهارة</label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="مثال: React.js"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المستوى ({newSkill.level}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">التصنيف</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design">Design</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded-xl transition-colors"
              >
                <Plus size={20} />
                <span>إضافة</span>
              </button>
            </form>
          </div>
        </div>

        {/* Skills List */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 dark:text-white">{skill.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{skill.category}</span>
                </div>
                <div className="w-32 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {skills.length === 0 && <p className="text-gray-500 col-span-2 text-center py-8">لا توجد مهارات مضافة</p>}
        </div>
      </div>
    </div>
  );
};