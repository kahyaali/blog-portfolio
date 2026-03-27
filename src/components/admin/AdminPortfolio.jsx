import React, { useState, useRef } from 'react';
import { FiSave, FiTrash2, FiPlus, FiEdit2, FiX, FiImage, FiGithub, FiExternalLink } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminPortfolio = () => {
  const [projects, setProjects] = useLocalStorage('projects', []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    demoLink: '',
    githubLink: '',
    category: ''
  });
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['Web Uygulama', 'Mobil Uygulama', 'Desktop Uygulama', 'API', 'Diğer'];

  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      setProjects([...projects, {
        ...newProject,
        id: newId,
        technologies: newProject.technologies.split(',').map(t => t.trim()),
        date: new Date().toISOString()
      }]);
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        image: '',
        demoLink: '',
        githubLink: '',
        category: ''
      });
    }
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditForm({ ...project, technologies: project.technologies.join(', ') });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const updated = projects.map(project =>
      project.id === editingId ? {
        ...editForm,
        technologies: editForm.technologies.split(',').map(t => t.trim())
      } : project
    );
    setProjects(updated);
    setEditingId(null);
    setEditForm({});
  };

  const deleteProject = (id) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      const updated = projects.filter(project => project.id !== id);
      setProjects(updated);
    }
  };

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditForm({ ...editForm, image: reader.result });
        } else {
          setNewProject({ ...newProject, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-[var(--bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
      <h2 className="text-2xl font-bold text-[var(--text-h)] mb-4">Projeler Düzenle</h2>
      
      {/* Yeni Proje Ekleme */}
      <div className="bg-[var(--accent-bg)] rounded-lg p-4 mb-6 border border-[var(--accent-border)]">
        <h3 className="text-lg font-semibold text-[var(--text-h)] mb-3 flex items-center space-x-2">
          <FiPlus className="text-[var(--accent)]" />
          <span>Yeni Proje Ekle</span>
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Proje Adı *" 
              value={newProject.title} 
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} 
              className="p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]"
            />
            <select 
              value={newProject.category} 
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} 
              className="p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]"
            >
              <option value="">Kategori Seç</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <textarea 
            placeholder="Açıklama *" 
            value={newProject.description} 
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} 
            className="w-full p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]" 
            rows="3" 
          />
          <input 
            type="text" 
            placeholder="Teknolojiler (virgülle ayırın)" 
            value={newProject.technologies} 
            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })} 
            className="w-full p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Demo Linki" 
              value={newProject.demoLink} 
              onChange={(e) => setNewProject({ ...newProject, demoLink: e.target.value })} 
              className="p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]"
            />
            <input 
              type="text" 
              placeholder="GitHub Linki" 
              value={newProject.githubLink} 
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })} 
              className="p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]"
            />
          </div>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Resim URL" 
              value={newProject.image} 
              onChange={(e) => setNewProject({ ...newProject, image: e.target.value })} 
              className="flex-1 p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)]"
            />
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              <FiImage />
            </button>
          </div>
          <button 
            onClick={addProject} 
            className="w-full bg-[var(--accent)] text-white py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-2"
          >
            <FiPlus /> <span>Proje Ekle</span>
          </button>
        </div>
      </div>
      
      {/* Mevcut Projeler */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-h)] mb-3">Mevcut Projeler ({projects.length})</h3>
        
        {projects.length === 0 ? (
          <div className="text-center py-8 bg-[var(--accent-bg)] rounded-lg">
            <p className="text-[var(--text)]">Henüz proje eklenmemiş.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border border-[var(--border)] rounded-lg p-4">
              {editingId === project.id ? (
                // Düzenleme Modu
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={editForm.title} 
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                      className="p-2 border border-[var(--accent)] rounded-lg bg-[var(--bg)]"
                    />
                    <select 
                      value={editForm.category} 
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} 
                      className="p-2 border border-[var(--accent)] rounded-lg bg-[var(--bg)]"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <textarea 
                    value={editForm.description} 
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
                    className="w-full p-2 border border-[var(--accent)] rounded-lg bg-[var(--bg)]" 
                    rows="2" 
                  />
                  <input 
                    type="text" 
                    value={editForm.technologies} 
                    onChange={(e) => setEditForm({ ...editForm, technologies: e.target.value })} 
                    className="w-full p-2 border border-[var(--accent)] rounded-lg bg-[var(--bg)]"
                    placeholder="Teknolojiler (virgülle ayırın)"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={editForm.demoLink} 
                      onChange={(e) => setEditForm({ ...editForm, demoLink: e.target.value })} 
                      className="p-2 border border-[var(--accent)] rounded-lg bg-[var(--bg)]"
                      placeholder="Demo Linki"
                    />
                    <input 
                      type="text" 
                      value={editForm.githubLink} 
                      onChange={(e) => setEditForm({ ...editForm, githubLink: e.target.value })} 
                      className="p-2 border border-[var(--accent)] rounded-lg bg-[var(--bg)]"
                      placeholder="GitHub Linki"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button onClick={cancelEdit} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                      <FiX className="inline mr-1" /> İptal
                    </button>
                    <button onClick={saveEdit} className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90">
                      <FiSave className="inline mr-1" /> Kaydet
                    </button>
                  </div>
                </div>
              ) : (
                // Normal Görünüm
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h4 className="font-semibold text-[var(--text-h)] text-lg">{project.title}</h4>
                      <span className="text-xs px-2 py-0.5 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text)] line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies?.map((tech, i) => (
                        <span key={i} className="text-xs bg-[var(--accent-bg)] text-[var(--accent)] px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1">
                          <FiExternalLink size={14} /> Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1">
                          <FiGithub size={14} /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      onClick={() => startEdit(project)} 
                      className="px-3 py-1.5 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 text-sm flex items-center gap-1"
                    >
                      <FiEdit2 size={14} /> Düzenle
                    </button>
                    <button 
                      onClick={() => deleteProject(project.id)} 
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm flex items-center gap-1"
                    >
                      <FiTrash2 size={14} /> Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <button 
        onClick={handleSave} 
        className="mt-6 w-full md:w-auto bg-[var(--accent)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-2"
      >
        <FiSave /> <span>Tüm Değişiklikleri Kaydet</span>
      </button>
      {saved && <div className="mt-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg text-center">✓ Kaydedildi!</div>}
    </div>
  );
};

export default AdminPortfolio;