import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import SearchBar from '../common/SearchBar';
import { useSearch } from '../../hooks/useSearch';

const Portfolio = () => {
  const [projects] = useLocalStorage('projects', []);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(projects, ['title', 'description', 'technologies', 'category']);

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const displayProjects = filteredItems.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <FiFolder className="text-3xl" />
          <h1 className="text-3xl font-bold">Projelerim</h1>
        </div>
        <p className="text-white/80">Geliştirdiğim projeler ve çalışmalarım</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-72 space-y-4">
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-4 border border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-h)] mb-3">Proje Ara</h3>
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              placeholder="Proje adı, teknoloji veya kategori ara..."
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
                      {projects.filter(p => cat === 'all' || p.category === cat).length}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          {displayProjects.length === 0 ? (
            <div className="bg-[var(--bg)] rounded-xl shadow-md p-12 text-center border border-[var(--border)]">
              <FiFolder className="text-4xl text-[var(--text)] mx-auto mb-3 opacity-50" />
              <p className="text-[var(--text)]">Aradığınız kriterde proje bulunamadı.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayProjects.map(project => (
                <div key={project.id} className="bg-[var(--bg)] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-[var(--border)]">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[var(--text-h)] mb-2">{project.title}</h3>
                    <p className="text-sm text-[var(--accent)] mb-2">{project.category}</p>
                    <p className="text-[var(--text)] mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-xs bg-[var(--accent-bg)] text-[var(--accent)] px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3 pt-2 border-t border-[var(--border)]">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] transition flex items-center space-x-1">
                          <FiGithub size={18} />
                          <span className="text-sm">GitHub</span>
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] transition flex items-center space-x-1">
                          <FiExternalLink size={18} />
                          <span className="text-sm">Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;