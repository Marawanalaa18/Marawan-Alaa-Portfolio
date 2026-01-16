import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = useData();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <SEO title="المقال غير موجود" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">المقال غير موجود</h2>
        <Link to="/blog" className="text-primary-600 hover:underline">العودة للمدونة</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        image={post.image}
        type="article"
      />
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowRight size={20} className="ml-2" />
          العودة للمقالات
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="aspect-[21/9] relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 w-full">
                 <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-600">
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8 border-r-4 border-primary-500 pr-4">
                {post.excerpt}
              </p>
              <div className="whitespace-pre-line text-gray-800 dark:text-gray-200 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};