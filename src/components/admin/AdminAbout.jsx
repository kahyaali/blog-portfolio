import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminAbout = () => {
  const [aboutText, setAboutText] = useLocalStorage('aboutText', '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Hakkımda Düzenle</h2>
      <p className="text-gray-600 mb-6">
        Kendinizi tanıtan metni düzenleyin. Bu metin "Hakkımda" sayfasında görüntülenecektir.
      </p>
      
      <div className="space-y-4">
        <textarea
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          rows="12"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Hakkımda metnini buraya yazın..."
        />
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <FiSave />
            <span>Kaydet</span>
          </button>
          
          {saved && (
            <span className="text-green-600 text-sm">✓ Kaydedildi</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;