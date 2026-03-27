import React, { useState, useRef } from 'react';
import { FiSave, FiTrash2, FiPlus, FiEdit2, FiX, FiImage } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminHobbies = () => {
  const [hobbies, setHobbies] = useLocalStorage('hobbies', []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newHobby, setNewHobby] = useState({ name: '', description: '', color: 'blue', icon: 'book' });
  const [saved, setSaved] = useState(false);

  const iconOptions = [
    { name: 'Kitap', value: 'book' },
    { name: 'Müzik', value: 'music' },
    { name: 'Oyun', value: 'activity' },
    { name: 'Fotoğraf', value: 'camera' },
    { name: 'Kahve', value: 'coffee' }
  ];

  const colorOptions = [
    { name: 'Mavi', value: 'blue' },
    { name: 'Yeşil', value: 'green' },
    { name: 'Mor', value: 'purple' },
    { name: 'Turuncu', value: 'orange' },
    { name: 'Kırmızı', value: 'red' }
  ];

  // Yeni hobi ekle
  const addHobby = () => {
    if (newHobby.name.trim()) {
      const newId = hobbies.length > 0 ? Math.max(...hobbies.map(h => h.id)) + 1 : 1;
      setHobbies([...hobbies, { ...newHobby, id: newId, name: newHobby.name.trim() }]);
      setNewHobby({ name: '', description: '', color: 'blue', icon: 'book' });
    }
  };

  // Düzenleme modunu aç
  const startEdit = (hobby) => {
    setEditingId(hobby.id);
    setEditForm({ ...hobby });
  };

  // Düzenleme modunu iptal et
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Düzenlenen hobiyi kaydet
  const saveEdit = () => {
    if (!editForm.name.trim()) {
      alert('Hobi adı boş olamaz!');
      return;
    }
    
    const updated = hobbies.map(hobby =>
      hobby.id === editingId ? { ...editForm, name: editForm.name.trim() } : hobby
    );
    setHobbies(updated);
    setEditingId(null);
    setEditForm({});
  };

  // Hobi sil
  const deleteHobby = (id) => {
    if (window.confirm('Bu hobiyi silmek istediğinizden emin misiniz?')) {
      const updated = hobbies.filter(hobby => hobby.id !== id);
      setHobbies(updated);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Hobiler Düzenle</h2>
      <p className="text-gray-600 mb-6">
        Hobilerinizi ekleyin, düzenleyin veya silin. Her hobi için ayrı "Düzenle" butonu bulunmaktadır.
      </p>
      
      {/* Yeni Hobi Ekleme Formu */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <FiPlus className="text-green-500" />
          <span>Yeni Hobi Ekle</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Hobi adı"
            value={newHobby.name}
            onChange={(e) => setNewHobby({ ...newHobby, name: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Açıklama"
            value={newHobby.description}
            onChange={(e) => setNewHobby({ ...newHobby, description: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={newHobby.color}
            onChange={(e) => setNewHobby({ ...newHobby, color: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          >
            {colorOptions.map(color => (
              <option key={color.value} value={color.value}>{color.name}</option>
            ))}
          </select>
          <select
            value={newHobby.icon}
            onChange={(e) => setNewHobby({ ...newHobby, icon: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          >
            {iconOptions.map(icon => (
              <option key={icon.value} value={icon.value}>{icon.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={addHobby}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center space-x-2"
        >
          <FiPlus />
          <span>Hobi Ekle</span>
        </button>
      </div>
      
      {/* Mevcut Hobiler */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Mevcut Hobiler ({hobbies.length})
        </h3>
        
        {hobbies.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Henüz hobi eklenmemiş.</p>
            <p className="text-gray-400 text-sm mt-1">Yukarıdaki formdan ilk hobinizi ekleyin.</p>
          </div>
        ) : (
          hobbies.map((hobby) => (
            <div key={hobby.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              {editingId === hobby.id ? (
                // Düzenleme Modu
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                    />
                    <input
                      type="text"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                    />
                    <select
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                    >
                      {colorOptions.map(color => (
                        <option key={color.value} value={color.value}>{color.name}</option>
                      ))}
                    </select>
                    <select
                      value={editForm.icon || 'book'}
                      onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center space-x-2"
                    >
                      <FiX />
                      <span>İptal</span>
                    </button>
                    <button
                      onClick={saveEdit}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-2"
                    >
                      <FiSave />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Normal Görünüm Modu
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${getColorClass(hobby.color)} flex items-center justify-center`}>
                      <span className="text-lg">{hobby.icon === 'book' ? '📚' : hobby.icon === 'music' ? '🎸' : hobby.icon === 'activity' ? '🎮' : hobby.icon === 'camera' ? '📷' : '☕'}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{hobby.name}</h3>
                      <p className="text-sm text-gray-500">{hobby.description || 'Açıklama yok'}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(hobby)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition flex items-center space-x-1"
                    >
                      <FiEdit2 size={14} />
                      <span className="text-sm">Düzenle</span>
                    </button>
                    <button
                      onClick={() => deleteHobby(hobby.id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition flex items-center space-x-1"
                    >
                      <FiTrash2 size={14} />
                      <span className="text-sm">Sil</span>
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
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
      >
        <FiSave />
        <span>Tüm Değişiklikleri Kaydet</span>
      </button>
      
      {saved && (
        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">
          ✓ Hobiler başarıyla kaydedildi!
        </div>
      )}
    </div>
  );
};

export default AdminHobbies;