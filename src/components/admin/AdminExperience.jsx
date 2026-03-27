import React, { useState } from 'react';
import { FiSave, FiTrash2, FiPlus } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminExperience = () => {
  const [experiences, setExperiences] = useLocalStorage('experiences', []);
  const [newExp, setNewExp] = useState({
    title: '',
    company: '',
    location: '',
    period: '',
    description: '',
    achievements: []
  });
  const [newAchievement, setNewAchievement] = useState('');
  const [saved, setSaved] = useState(false);

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setNewExp({
        ...newExp,
        achievements: [...newExp.achievements, newAchievement.trim()]
      });
      setNewAchievement('');
    }
  };

  const removeAchievement = (index) => {
    setNewExp({
      ...newExp,
      achievements: newExp.achievements.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    if (newExp.title && newExp.company) {
      const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
      setExperiences([...experiences, { ...newExp, id: newId }]);
      setNewExp({
        title: '',
        company: '',
        location: '',
        period: '',
        description: '',
        achievements: []
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const updateExperience = (id, field, value) => {
    const updated = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
  };

  const updateAchievement = (expId, achievementIndex, value) => {
    const updated = experiences.map(exp => {
      if (exp.id === expId) {
        const newAchievements = [...exp.achievements];
        newAchievements[achievementIndex] = value;
        return { ...exp, achievements: newAchievements };
      }
      return exp;
    });
    setExperiences(updated);
  };

  const addAchievementToExp = (expId) => {
    const achievement = prompt('Yeni başarı ekleyin:');
    if (achievement && achievement.trim()) {
      const updated = experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, achievements: [...exp.achievements, achievement.trim()] };
        }
        return exp;
      });
      setExperiences(updated);
    }
  };

  const deleteExperience = (id) => {
    if (window.confirm('Bu deneyimi silmek istediğinizden emin misiniz?')) {
      const updated = experiences.filter(exp => exp.id !== id);
      setExperiences(updated);
    }
  };

  const deleteAchievement = (expId, achievementIndex) => {
    const updated = experiences.map(exp => {
      if (exp.id === expId) {
        const newAchievements = exp.achievements.filter((_, i) => i !== achievementIndex);
        return { ...exp, achievements: newAchievements };
      }
      return exp;
    });
    setExperiences(updated);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">İş Deneyimleri Düzenle</h2>
      
      {/* Yeni Deneyim Ekleme Formu */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Yeni Deneyim Ekle</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Pozisyon"
            value={newExp.title}
            onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Şirket"
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Konum"
            value={newExp.location}
            onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Dönem (örn: 2022-2024)"
            value={newExp.period}
            onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Açıklama"
            value={newExp.description}
            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
          
          <div>
            <label className="block text-gray-700 mb-2">Başarılar</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Yeni başarı ekle"
                className="flex-1 p-2 border border-gray-300 rounded"
                onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
              />
              <button
                onClick={addAchievement}
                className="bg-green-500 text-white px-3 rounded hover:bg-green-600"
              >
                <FiPlus />
              </button>
            </div>
            <div className="space-y-1">
              {newExp.achievements.map((ach, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span className="text-sm">{ach}</span>
                  <button
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={addExperience}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Deneyim Ekle
          </button>
        </div>
      </div>
      
      {/* Mevcut Deneyimler */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Mevcut Deneyimler</h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                className="text-lg font-semibold p-1 border border-gray-300 rounded flex-1 mr-2"
              />
              <button
                onClick={() => deleteExperience(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
            
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              className="w-full p-1 border border-gray-300 rounded mb-2"
            />
            
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
              className="w-full p-1 border border-gray-300 rounded mb-2"
            />
            
            <input
              type="text"
              value={exp.period}
              onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
              className="w-full p-1 border border-gray-300 rounded mb-2"
            />
            
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              className="w-full p-1 border border-gray-300 rounded mb-2"
              rows="2"
            />
            
            <div className="mt-2">
              <label className="block text-gray-700 text-sm mb-1">Başarılar</label>
              {exp.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-1">
                  <input
                    type="text"
                    value={ach}
                    onChange={(e) => updateAchievement(exp.id, idx, e.target.value)}
                    className="flex-1 p-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={() => deleteAchievement(exp.id, idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addAchievementToExp(exp.id)}
                className="text-blue-600 text-sm hover:text-blue-700 mt-1 flex items-center space-x-1"
              >
                <FiPlus size={14} />
                <span>Başarı Ekle</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
      >
        <FiSave />
        <span>Tüm Değişiklikleri Kaydet</span>
      </button>
      
      {saved && (
        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">
          Değişiklikler kaydedildi!
        </div>
      )}
    </div>
  );
};

export default AdminExperience;