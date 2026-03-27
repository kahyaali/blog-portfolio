import React, { useState, useRef } from 'react';
import { FiSave, FiTrash2, FiPlus, FiImage } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminGallery = () => {
  const [images, setImages] = useLocalStorage('galleryImages', []);
  const [newImage, setNewImage] = useState({ title: '', description: '', url: '' });
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const addImage = () => {
    if (newImage.title && newImage.url) {
      const newId = images.length > 0 ? Math.max(...images.map(i => i.id)) + 1 : 1;
      setImages([...images, { ...newImage, id: newId }]);
      setNewImage({ title: '', description: '', url: '' });
    }
  };

  const deleteImage = (id) => {
    if (window.confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage({ ...newImage, url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[var(--bg)] rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[var(--text-h)] mb-4">Galeri Düzenle</h2>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Yeni Fotoğraf Ekle</h3>
        <div className="space-y-3">
          <input type="text" placeholder="Başlık" value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Açıklama" value={newImage.description} onChange={(e) => setNewImage({ ...newImage, description: e.target.value })} className="w-full p-2 border rounded" />
          <div className="flex space-x-2">
            <input type="text" placeholder="Resim URL" value={newImage.url} onChange={(e) => setNewImage({ ...newImage, url: e.target.value })} className="flex-1 p-2 border rounded" />
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="bg-gray-500 text-white px-4 py-2 rounded"><FiImage /></button>
          </div>
          <button onClick={addImage} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Ekle</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map(img => (
          <div key={img.id} className="border rounded-lg p-4">
            <img src={img.url} alt={img.title} className="w-full h-40 object-cover rounded mb-2" />
            <input type="text" value={img.title} onChange={(e) => setImages(images.map(i => i.id === img.id ? { ...i, title: e.target.value } : i))} className="w-full p-1 border rounded mb-1" />
            <input type="text" value={img.description} onChange={(e) => setImages(images.map(i => i.id === img.id ? { ...i, description: e.target.value } : i))} className="w-full p-1 border rounded mb-2" />
            <button onClick={() => deleteImage(img.id)} className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600">Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;