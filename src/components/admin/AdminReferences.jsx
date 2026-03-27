import React, { useState } from 'react';
import { FiSave, FiTrash2, FiPlus, FiStar, FiAlertCircle, FiCheckCircle, FiEdit2, FiX } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminReferences = () => {
  const [references, setReferences] = useLocalStorage('references', []);
  const [newRef, setNewRef] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    message: '',
    rating: 5
  });
  const [editingId, setEditingId] = useState(null); // Hangi referansın düzenlendiğini takip et
  const [editForm, setEditForm] = useState({}); // Düzenlenen referansın verileri
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Yeni referans ekle
  const addReference = () => {
    if (!newRef.name.trim()) {
      setError('Ad Soyad alanı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!newRef.company.trim()) {
      setError('Şirket alanı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!newRef.email.trim()) {
      setError('E-posta alanı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!newRef.message.trim()) {
      setError('Referans mesajı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newId = references.length > 0 ? Math.max(...references.map(r => r.id)) + 1 : 1;
    
    const newReference = { 
      ...newRef, 
      id: newId,
      name: newRef.name.trim(),
      company: newRef.company.trim(),
      email: newRef.email.trim()
    };
    
    setReferences([...references, newReference]);
    
    setNewRef({
      name: '',
      company: '',
      position: '',
      phone: '',
      email: '',
      message: '',
      rating: 5
    });
    
    setSuccess('Referans başarıyla eklendi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Düzenleme modunu aç
  const startEdit = (ref) => {
    setEditingId(ref.id);
    setEditForm({ ...ref });
  };

  // Düzenleme modunu iptal et
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Düzenlenen referansı kaydet
  const saveEdit = () => {
    if (!editForm.name.trim()) {
      setError('Ad Soyad alanı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!editForm.company.trim()) {
      setError('Şirket alanı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!editForm.email.trim()) {
      setError('E-posta alanı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const updated = references.map(ref =>
      ref.id === editingId ? { ...editForm } : ref
    );
    setReferences(updated);
    setEditingId(null);
    setEditForm({});
    setSuccess('Referans başarıyla güncellendi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Referans sil
  const deleteReference = (id) => {
    if (window.confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
      const updated = references.filter(ref => ref.id !== id);
      setReferences(updated);
      setSuccess('Referans başarıyla silindi!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderStars = (rating, onChange) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`cursor-pointer transition ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-400'}`}
        size={20}
        onClick={() => onChange(i + 1)}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Referanslar Düzenle</h2>
      <p className="text-gray-600 mb-6">
        Referanslarınızı ekleyin, düzenleyin veya silin. Her referans için ayrı "Düzenle" butonu bulunmaktadır.
      </p>
      
      {/* Hata Mesajı */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      {/* Başarı Mesajı */}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
          <FiCheckCircle className="text-green-500 flex-shrink-0" />
          <p className="text-green-600 text-sm">{success}</p>
        </div>
      )}
      
      {/* Yeni Referans Ekleme Formu */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <FiPlus className="text-green-500" />
          <span>Yeni Referans Ekle</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Ad Soyad *"
            value={newRef.name}
            onChange={(e) => setNewRef({ ...newRef, name: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Şirket *"
            value={newRef.company}
            onChange={(e) => setNewRef({ ...newRef, company: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Pozisyon"
            value={newRef.position}
            onChange={(e) => setNewRef({ ...newRef, position: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={newRef.phone}
            onChange={(e) => setNewRef({ ...newRef, phone: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="E-posta *"
            value={newRef.email}
            onChange={(e) => setNewRef({ ...newRef, email: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Puan:</span>
            <div className="flex space-x-1">
              {renderStars(newRef.rating, (rating) => setNewRef({ ...newRef, rating }))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({newRef.rating}/5)</span>
          </div>
          <textarea
            placeholder="Referans mesajı *"
            value={newRef.message}
            onChange={(e) => setNewRef({ ...newRef, message: e.target.value })}
            className="col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
        </div>
        <button
          onClick={addReference}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
        >
          <FiPlus />
          <span>Referans Ekle</span>
        </button>
        <p className="text-xs text-gray-500 mt-2">* ile işaretli alanlar zorunludur</p>
      </div>
      
      {/* Mevcut Referanslar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <FiStar className="text-yellow-500" />
          <span>Mevcut Referanslar ({references.length})</span>
        </h3>
        
        {references.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Henüz referans eklenmemiş.</p>
            <p className="text-gray-400 text-sm mt-1">Yukarıdaki formdan ilk referansınızı ekleyin.</p>
          </div>
        ) : (
          references.map((ref) => (
            <div key={ref.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              {editingId === ref.id ? (
                // Düzenleme Modu
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="p-2 border border-blue-400 rounded focus:ring-2 focus:ring-blue-500"
                      placeholder="Ad Soyad"
                    />
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Şirket"
                    />
                    <input
                      type="text"
                      value={editForm.position || ''}
                      onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Pozisyon"
                    />
                    <input
                      type="text"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Telefon"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="E-posta"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Puan:</span>
                      <div className="flex space-x-1">
                        {renderStars(editForm.rating, (rating) => setEditForm({ ...editForm, rating }))}
                      </div>
                    </div>
                    <textarea
                      value={editForm.message}
                      onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                      className="col-span-2 p-2 border border-blue-400 rounded"
                      rows="2"
                      placeholder="Referans mesajı"
                    />
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
                    >
                      <FiX />
                      <span>İptal</span>
                    </button>
                    <button
                      onClick={saveEdit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
                    >
                      <FiSave />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Normal Görünüm Modu
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Ad Soyad</label>
                      <p className="font-medium text-gray-800">{ref.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Şirket</label>
                      <p className="text-gray-700">{ref.company}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Pozisyon</label>
                      <p className="text-gray-700">{ref.position || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Telefon</label>
                      <p className="text-gray-700">{ref.phone || '-'}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">E-posta</label>
                      <p className="text-gray-700">{ref.email}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Puan</label>
                      <div className="flex space-x-1">
                        {renderStars(ref.rating, () => {})}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-gray-500">Referans Mesajı</label>
                      <p className="text-gray-700 italic">"{ref.message}"</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={() => startEdit(ref)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
                    >
                      <FiEdit2 />
                      <span>Düzenle</span>
                    </button>
                    <button
                      onClick={() => deleteReference(ref.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
                    >
                      <FiTrash2 />
                      <span>Sil</span>
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
        <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center animate-fade-in">
          ✓ Referanslar başarıyla kaydedildi!
        </div>
      )}
    </div>
  );
};

export default AdminReferences;