import { Project, Service, SiteData, Skill, BlogPost } from './types';

export const INITIAL_SITE_DATA: SiteData = {
  heroTitle: "أهلاً، أنا مروان علاء",
  heroSubtitle: "مطور واجهات أمامية ومصمم تجربة مستخدم",
  aboutText: "مطور برمجيات شغوف لدي خبرة تزيد عن 5 سنوات في بناء تطبيقات ويب عصرية وسريعة الاستجابة. أركز على تقديم تجربة مستخدم ممتازة وكود نظيف قابل للصيانة.",
  aboutImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  email: "contact@example.com",
  phone: "+966 50 000 0000",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
};

export const INITIAL_SKILLS: Skill[] = [
  { id: '1', name: 'React.js', level: 95, category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 90, category: 'Frontend' },
  { id: '3', name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { id: '4', name: 'Node.js', level: 80, category: 'Backend' },
  { id: '5', name: 'Figma', level: 75, category: 'Design' },
  { id: '6', name: 'Git & GitHub', level: 85, category: 'Tools' },
];

export const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'تطوير المواقع', description: 'بناء مواقع كاملة من الصفر باستخدام أحدث التقنيات.', icon: 'Code' },
  { id: '2', title: 'تصميم UI/UX', description: 'تصميم واجهات جذابة وسهلة الاستخدام تركز على المستخدم.', icon: 'Palette' },
  { id: '3', title: 'تحسين الأداء', description: 'تحليل وتحسين سرعة وأداء المواقع لمحركات البحث.', icon: 'Zap' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'منصة التجارة الإلكترونية',
    description: 'متجر إلكتروني متكامل يدعم الدفع والبحث المتقدم ولوحة تحكم.',
    category: 'Web App',
    image: 'https://picsum.photos/id/1/800/600',
    link: '#'
  },
  {
    id: '2',
    title: 'تطبيق إدارة المهام',
    description: 'تطبيق لإدارة المهام اليومية مع دعم الوضع الليلي والتقويم.',
    category: 'Productivity',
    image: 'https://picsum.photos/id/20/800/600',
    link: '#'
  },
  {
    id: '3',
    title: 'موقع شركة عقارية',
    description: 'موقع تعريفي لشركة عقارات مع عرض الوحدات المتاحة.',
    category: 'Website',
    image: 'https://picsum.photos/id/48/800/600',
    link: '#'
  },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'أهمية تحسين أداء المواقع في 2024',
    excerpt: 'تعرف على أحدث التقنيات والممارسات لتحسين سرعة تحميل موقعك وتجربة المستخدم.',
    content: 'تحسين أداء المواقع لم يعد رفاهية، بل ضرورة قصوى. في هذا المقال نناقش أهمية Core Web Vitals وكيفية استخدام أدوات مثل Lighthouse لتحسين النتائج...',
    date: '2024-03-15',
    image: 'https://picsum.photos/id/60/800/600',
    readTime: '5 دقائق'
  },
  {
    id: '2',
    title: 'مستقبل React.js والاتجاهات الحديثة',
    excerpt: 'نظرة شاملة على React Server Components وكيف ستغير طريقة بنائنا لتطبيقات الويب.',
    content: 'مع إطلاق التحديثات الجديدة، تتجه React نحو تقديم حلول أفضل للتقديم من جانب الخادم (SSR). سنستعرض في هذا المقال كيفية الاستفادة من هذه الميزات...',
    date: '2024-03-10',
    image: 'https://picsum.photos/id/180/800/600',
    readTime: '7 دقائق'
  },
  {
    id: '3',
    title: 'تصميم واجهات المستخدم للمبتدئين',
    excerpt: 'دليلك الشامل لتعلم أساسيات تصميم واجهات المستخدم UI وقواعد تجربة المستخدم UX.',
    content: 'التصميم الجيد يبدأ بفهم المستخدم. في هذه التدوينة، سنناقش مبادئ التصميم الأساسية، نظرية الألوان، وكيفية استخدام التباين بشكل فعال...',
    date: '2024-02-28',
    image: 'https://picsum.photos/id/119/800/600',
    readTime: '4 دقائق'
  }
];

export const THEME_COLORS: Record<string, { primary: string, secondary: string, hex: string }> = {
  blue: { primary: 'blue', secondary: 'sky', hex: '#3b82f6' },
  purple: { primary: 'violet', secondary: 'fuchsia', hex: '#8b5cf6' },
  emerald: { primary: 'emerald', secondary: 'teal', hex: '#10b981' },
  rose: { primary: 'rose', secondary: 'pink', hex: '#f43f5e' },
  amber: { primary: 'amber', secondary: 'yellow', hex: '#f59e0b' },
};