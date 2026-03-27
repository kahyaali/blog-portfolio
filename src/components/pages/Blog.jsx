import React, { useState } from 'react';
import { FiCalendar, FiTag, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ReactMarkdown from 'react-markdown';
import SearchBar from '../common/SearchBar';
import { useSearch } from '../../hooks/useSearch';

const Blog = () => {
  const [posts] = useLocalStorage('blogPosts', []);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(posts, ['title', 'content', 'category', 'tags']);

  const categories = ['all', ...new Set(posts.map(p => p.category).filter(Boolean))];

  const displayPosts = filteredItems.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  if (selectedPost) {
    return (
      <div className="space-y-8 animate-fade-in">
        <button
          onClick={() => setSelectedPost(null)}
          className="text-[var(--accent)] hover:text-[var(--accent)]/80 flex items-center space-x-1 transition"
        >
          <FiArrowRight className="rotate-180" />
          <span>Geri Dön</span>
        </button>
        
        <article className="bg-[var(--bg)] rounded-xl shadow-md border border-[var(--border)] p-8">
          <h1 className="text-3xl font-bold text-[var(--text-h)] mb-2">{selectedPost.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-[var(--text)] mb-4">
            <span className="flex items-center space-x-1">
              <FiCalendar /> 
              <span>{new Date(selectedPost.date).toLocaleDateString('tr-TR')}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FiTag /> 
              <span>{selectedPost.category}</span>
            </span>
          </div>
          <div className="prose max-w-none">
            <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text)]">
              Etiketler: {selectedPost.tags?.map(tag => `#${tag} `).join(' ')}
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <FiBookOpen className="text-3xl" />
          <h1 className="text-3xl font-bold">Blog</h1>
        </div>
        <p className="text-white/80">Yazılım, teknoloji ve kişisel gelişim hakkında yazılar</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-72 space-y-4">
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-4 border border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-h)] mb-3">Yazı Ara</h3>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              placeholder="Başlık, içerik veya kategori ara..."
            />
          </div>
          
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-4 border border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-h)] mb-3">Kategoriler</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === cat 
                      ? 'bg-[var(--accent-bg)] text-[var(--accent)] font-medium' 
                      : 'text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]'
                  }`}
                >
                  <span className="flex justify-between items-center">
                    <span>{cat === 'all' ? 'Tümü' : cat}</span>
                    <span className="text-xs opacity-70">
                      {posts.filter(p => cat === 'all' || p.category === cat).length}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {displayPosts.length === 0 ? (
            <div className="bg-[var(--bg)] rounded-xl shadow-md p-12 text-center border border-[var(--border)]">
              <FiBookOpen className="text-4xl text-[var(--text)] mx-auto mb-3 opacity-50" />
              <p className="text-[var(--text)]">Aradığınız kriterde yazı bulunamadı.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-[var(--accent)] hover:underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            displayPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-[var(--bg)] rounded-xl shadow-md border border-[var(--border)] p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <h2 className="text-xl font-bold text-[var(--text-h)] mb-2">{post.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-[var(--text)] mb-3">
                  <span className="flex items-center space-x-1">
                    <FiCalendar /> 
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FiTag /> 
                    <span>{post.category}</span>
                  </span>
                </div>
                <p className="text-[var(--text)] line-clamp-3">{post.content?.substring(0, 200)}...</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-1">
                    {post.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs text-[var(--text)]/60">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-[var(--accent)] text-sm hover:underline">Devamını Oku →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;