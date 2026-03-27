import React, { useState } from 'react';
import { FiSave, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminContact = () => {
  const [contactInfo, setContactInfo] = useLocalStorage('contactInfo', {
    phone: '+90 555 123 45 67',
    email: 'Mail adresinizi giriniz',
    address: 'İstanbul, Türkiye'
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">İletişim Bilgileri Düzenle</h2>
      <p className="text-gray-600 mb-6">
        İletişim sayfasında gösterilecek bilgileri düzenleyin.
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 flex items-center space-x-2">
            <FiPhone />
            <span>Telefon</span>
          </label>
          <input
            type="text"
            value={contactInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2 flex items-center space-x-2">
            <FiMail />
            <span>E-posta</span>
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2 flex items-center space-x-2">
            <FiMapPin />
            <span>Adres</span>
          </label>
          <input
            type="text"
            value={contactInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <FiSave />
          <span>Kaydet</span>
        </button>
        
        {saved && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
            İletişim bilgileri kaydedildi!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;