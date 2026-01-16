import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Service } from '../../types';
import { Plus, Edit2, Trash2, X, Code, Palette, Zap, Layout, Smartphone, Database, Server, Globe, PenTool } from 'lucide-react';

const ICONS_LIST = [
  { name: 'Code', icon: Code },
  { name: 'Palette', icon: Palette },
  { name: 'Zap', icon: Zap },
  { name: 'Layout', icon: Layout },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'Database', icon: Database },
  { name: 'Server', icon: Server },
  { name: 'Globe', icon: Globe },
  { name: 'PenTool', icon: PenTool },
];

export const ServicesManager: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const initialFormState = {
    title: '',
    description: '',
    icon: 'Code'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      deleteService(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService({ ...formData, id: editingService.id });
    } else {
      addService({ ...formData, id: Date.now().toString() });
    }
    setIsModalOpen(false);
    setEditingService(null);
    setFormData(initialFormState);
  };

  const openNewModal = () => {
    setEditingService(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  // Helper to render icon dynamically
  const renderIcon = (iconName: string, size = 24) => {
    const IconComponent = ICONS_LIST.find(i => i.name === iconName)?.icon || Zap;
    return <IconComponent size={size} />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الخدمات</h2>
          <p className="text-gray-500 dark:text-gray-400">تحكم في الخدمات التي تقدمها</p>
        </div>
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={20} />
          <span>خدمة جديدة</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(service)}
                className="p-2 bg-gray-100 dark:bg-gray-700 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 bg-gray-100 dark:bg-gray-700 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center mb-4">
              {renderIcon(service.icon)}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{service.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingService ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">عنوان الخدمة</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الأيقونة</label>
                <div className="grid grid-cols-5 gap-2">
                  {ICONS_LIST.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setFormData({...formData, icon: item.name})}
                      className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                        formData.icon === item.name 
                          ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 ring-2 ring-primary-500' 
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      title={item.name}
                    >
                      <item.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">وصف الخدمة</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};