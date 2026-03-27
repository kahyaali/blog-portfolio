import React, { useState } from 'react';
import { FiSave, FiTrash2, FiPlus, FiEdit2, FiX } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminSkills = () => {
  const [skills, setSkills] = useLocalStorage('skills', [
    { id: 1, name: 'React', level: 90, category: 'frontend' },
    { id: 2, name: 'JavaScript', level: 85, category: 'frontend' },
    { id: 3, name: 'CSS', level: 80, category: 'styling' }
  ]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'frontend' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [saved, setSaved] = useState(false);

  const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'styling', label: 'Stil & Tasarım' },
    { value: 'state', label: 'State Yönetimi' },
    { value: 'tools', label: 'Araçlar' }
  ];

  // Yeni yetenek ekle
  const addSkill = () => {
    if (newSkill.name.trim()) {
      const newId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
      console.log('Yeni ID:', newId);
      setSkills([...skills, { ...newSkill, id: newId, name: newSkill.name.trim() }]);
      setNewSkill({ name: '', level: 50, category: 'frontend' });
    }
  };

  // Düzenleme modalını aç
  const openEditModal = (skill) => {
    console.log('Düzenlenecek yetenek ID:', skill.id);
    console.log('Düzenlenecek yetenek adı:', skill.name);
    setEditingSkill({ ...skill });
    setModalOpen(true);
  };

  // Düzenlemeyi kaydet
  const saveEdit = () => {
    console.log('Kaydedilecek yetenek ID:', editingSkill?.id);
    console.log('Kaydedilecek yeni ad:', editingSkill?.name);
    
    if (!editingSkill.name.trim()) {
      alert('Yetenek adı boş olamaz!');
      return;
    }
    
    // Güncellenmiş listeyi oluştur
    const updatedSkills = skills.map(skill => {
      console.log('Kontrol edilen yetenek ID:', skill.id, 'Hedef ID:', editingSkill.id);
      if (skill.id === editingSkill.id) {
        console.log('GÜNCELLENEN YETENEK:', skill.name, '->', editingSkill.name);
        return editingSkill;
      }
      return skill;
    });
    
    console.log('Güncellenmiş liste:', updatedSkills);
    setSkills(updatedSkills);
    setModalOpen(false);
    setEditingSkill(null);
  };

  // Yetenek sil
  const deleteSkill = (id) => {
    console.log('Silinecek yetenek ID:', id);
    if (window.confirm('Bu yeteneği silmek istediğinizden emin misiniz?')) {
      const updated = skills.filter(skill => skill.id !== id);
      setSkills(updated);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getCategoryLabel = (value) => {
    const cat = categories.find(c => c.value === value);
    return cat ? cat.label : value;
  };

  return (
    <>
      <div className="bg-[var(--bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--text-h)] mb-4">Yetenekler Düzenle</h2>
        
        {/* Yeni Yetenek Ekleme */}
        <div className="bg-[var(--accent-bg)] rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-[var(--text-h)] mb-3">Yeni Yetenek Ekle</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Yetenek adı"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="flex-1 p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full md:w-36 p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-2 min-w-[150px]">
              <input
                type="range"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                min="0"
                max="100"
                className="flex-1"
              />
              <span className="text-sm w-12">{newSkill.level}%</span>
            </div>
            <button
              onClick={addSkill}
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:opacity-90"
            >
              <FiPlus className="inline mr-1" /> Ekle
            </button>
          </div>
        </div>
        
        {/* Yetenek Listesi */}
        <h3 className="font-semibold text-[var(--text-h)] mb-3">Mevcut Yetenekler ({skills.length})</h3>
        
        {skills.length === 0 ? (
          <div className="text-center py-8 bg-[var(--accent-bg)] rounded-lg">
            <p className="text-[var(--text)]">Henüz yetenek eklenmemiş.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className="border border-[var(--border)] rounded-lg p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-[var(--text-h)]">
                        ID: {skill.id} - {skill.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full">
                        {getCategoryLabel(skill.category)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[var(--border)] rounded-full h-2">
                        <div
                          className="bg-[var(--accent)] h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-sm text-[var(--text)] w-12">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="px-3 py-1.5 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 text-sm"
                    >
                      <FiEdit2 className="inline mr-1" size={14} /> Düzenle
                    </button>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                    >
                      <FiTrash2 className="inline mr-1" size={14} /> Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={handleSave}
          className="mt-6 bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:opacity-90"
        >
          <FiSave className="inline mr-2" /> Tüm Değişiklikleri Kaydet
        </button>
        
        {saved && (
          <div className="mt-3 text-green-600 text-center text-sm">✓ Kaydedildi!</div>
        )}
      </div>

      {/* Düzenleme Modalı */}
      {modalOpen && editingSkill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg)] rounded-xl p-6 w-full max-w-md border border-[var(--border)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[var(--text-h)]">
                Yetenek Düzenle (ID: {editingSkill.id})
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[var(--text)] hover:text-[var(--accent)]"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[var(--text-h)] text-sm mb-1">Yetenek Adı</label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-[var(--text-h)] text-sm mb-1">Kategori</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full p-2 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-[var(--text-h)] text-sm mb-1">Seviye: {editingSkill.level}%</label>
                <input
                  type="range"
                  value={editingSkill.level}
                  onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                  min="0"
                  max="100"
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSkills;