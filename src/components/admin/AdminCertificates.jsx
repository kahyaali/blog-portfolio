import React, { useState, useRef } from 'react';
import { FiSave, FiTrash2, FiPlus, FiEdit2, FiX, FiImage, FiLink, FiCalendar, FiAward } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminCertificates = () => {
  const [certificates, setCertificates] = useLocalStorage('certificates', []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newCert, setNewCert] = useState({
    name: '',
    issuer: '',
    date: '',
    link: '',
    image: '',
    description: ''
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Yeni sertifika ekle
  const addCertificate = () => {
    if (!newCert.name.trim()) {
      setError('Sertifika adı zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!newCert.issuer.trim()) {
      setError('Veren kurum zorunludur!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newId = certificates.length > 0 ? Math.max(...certificates.map(c => c.id)) + 1 : 1;
    
    setCertificates([...certificates, { 
      ...newCert, 
      id: newId,
      name: newCert.name.trim(),
      issuer: newCert.issuer.trim()
    }]);
    
    setNewCert({
      name: '',
      issuer: '',
      date: '',
      link: '',
      image: '',
      description: ''
    });
    
    setSuccess('Sertifika başarıyla eklendi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Düzenleme modunu aç
  const startEdit = (cert) => {
    setEditingId(cert.id);
    setEditForm({ ...cert });
  };

  // Düzenleme modunu iptal et
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Düzenlenen sertifikayı kaydet
  const saveEdit = () => {
    if (!editForm.name.trim()) {
      setError('Sertifika adı boş olamaz!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!editForm.issuer.trim()) {
      setError('Veren kurum boş olamaz!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    const updated = certificates.map(cert =>
      cert.id === editingId ? { ...editForm, name: editForm.name.trim(), issuer: editForm.issuer.trim() } : cert
    );
    setCertificates(updated);
    setEditingId(null);
    setEditForm({});
    setSuccess('Sertifika başarıyla güncellendi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Sertifika sil
  const deleteCertificate = (id) => {
    if (window.confirm('Bu sertifikayı silmek istediğinizden emin misiniz?')) {
      const updated = certificates.filter(cert => cert.id !== id);
      setCertificates(updated);
      setSuccess('Sertifika başarıyla silindi!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Resim yükleme
  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditForm({ ...editForm, image: reader.result });
        } else {
          setNewCert({ ...newCert, image: reader.result });
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sertifikalar Düzenle</h2>
      <p className="text-gray-600 mb-6">
        Sertifikalarınızı ekleyin, düzenleyin veya silin. Her sertifika için ayrı "Düzenle" butonu bulunmaktadır.
      </p>
      
      {/* Hata Mesajı */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      {/* Başarı Mesajı */}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-green-600 text-sm">{success}</p>
        </div>
      )}
      
      {/* Yeni Sertifika Ekleme Formu */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <FiPlus className="text-green-500" />
          <span>Yeni Sertifika Ekle</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Sertifika Adı *"
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Veren Kurum *"
            value={newCert.issuer}
            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Tarih (örn: 2023)"
            value={newCert.date}
            onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="url"
            placeholder="Doğrulama Linki"
            value={newCert.link}
            onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <div className="col-span-2">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Resim URL (veya dosya yükleyin)"
                value={newCert.image}
                onChange={(e) => setNewCert({ ...newCert, image: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center space-x-2"
              >
                <FiImage />
                <span>Yükle</span>
              </button>
            </div>
          </div>
          <textarea
            placeholder="Açıklama"
            value={newCert.description}
            onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
            className="col-span-2 p-2 border border-gray-300 rounded"
            rows="2"
          />
        </div>
        <button
          onClick={addCertificate}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center space-x-2"
        >
          <FiPlus />
          <span>Sertifika Ekle</span>
        </button>
        <p className="text-xs text-gray-500 mt-2">* ile işaretli alanlar zorunludur</p>
      </div>
      
      {/* Mevcut Sertifikalar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Mevcut Sertifikalar ({certificates.length})
        </h3>
        
        {certificates.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FiAward className="text-4xl text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Henüz sertifika eklenmemiş.</p>
            <p className="text-gray-400 text-sm mt-1">Yukarıdaki formdan ilk sertifikanızı ekleyin.</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              {editingId === cert.id ? (
                // Düzenleme Modu
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Sertifika Adı"
                    />
                    <input
                      type="text"
                      value={editForm.issuer}
                      onChange={(e) => setEditForm({ ...editForm, issuer: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Veren Kurum"
                    />
                    <input
                      type="text"
                      value={editForm.date || ''}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Tarih"
                    />
                    <input
                      type="url"
                      value={editForm.link || ''}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                      placeholder="Doğrulama Linki"
                    />
                    <div className="col-span-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={editForm.image || ''}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          className="flex-1 p-2 border border-blue-400 rounded"
                          placeholder="Resim URL"
                        />
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, true)}
                          accept="image/*"
                          className="hidden"
                          id="edit-image-upload"
                        />
                        <button
                          onClick={() => document.getElementById('edit-image-upload').click()}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                          <FiImage />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="col-span-2 p-2 border border-blue-400 rounded"
                      rows="2"
                      placeholder="Açıklama"
                    />
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
                  <div className="flex items-center space-x-4 flex-1">
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <FiAward className="text-blue-500" size={16} />
                        <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                      </div>
                      <p className="text-sm text-blue-600">{cert.issuer}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                        {cert.date && (
                          <span className="flex items-center space-x-1">
                            <FiCalendar size={12} />
                            <span>{cert.date}</span>
                          </span>
                        )}
                        {cert.link && (
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
                            <FiLink size={12} />
                            <span>Link</span>
                          </a>
                        )}
                      </div>
                      {cert.description && (
                        <p className="text-xs text-gray-500 mt-1">{cert.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(cert)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition flex items-center space-x-1"
                    >
                      <FiEdit2 size={14} />
                      <span className="text-sm">Düzenle</span>
                    </button>
                    <button
                      onClick={() => deleteCertificate(cert.id)}
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
          ✓ Sertifikalar başarıyla kaydedildi!
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;