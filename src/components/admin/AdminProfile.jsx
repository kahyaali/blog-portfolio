import React, { useState, useRef } from 'react';
import { FiSave, FiUpload, FiTrash2, FiUser, FiBriefcase, FiMail, FiMapPin } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminProfile = () => {
  const [profileImage, setProfileImage] = useLocalStorage('profileImage', null);
  const [name, setName] = useLocalStorage('profileName', 'Ahmet Yılmaz');
  const [title, setTitle] = useLocalStorage('profileTitle', 'Frontend Developer & Creative Thinker');
  const [email, setEmail] = useLocalStorage('profileEmail', 'ahmet.yilmaz@example.com');
  const [location, setLocation] = useLocalStorage('profileLocation', 'İstanbul, Türkiye');
  const [experience, setExperience] = useLocalStorage('profileExperience', '5+ Yıl');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const defaultImage = "https://via.placeholder.com/150x150?text=Profil";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profil Düzenle</h2>
      <p className="text-gray-600 mb-6">
        Profil resminizi, adınızı, ünvanınızı ve diğer bilgilerinizi düzenleyin. 
        Bu bilgiler ana sayfada, header'da ve hakkımda sayfasında görüntülenecektir.
      </p>

      <div className="space-y-6">
        {/* Profil Resmi */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">Profil Resmi</label>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileImage || defaultImage}
                alt="Profil"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <button
                onClick={triggerFileInput}
                className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition"
              >
                <FiUpload size={14} />
              </button>
              {profileImage && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition"
                >
                  <FiTrash2 size={14} />
                </button>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                PNG, JPG veya GIF. Maksimum 2MB.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Ad Soyad */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center space-x-2">
            <FiUser className="text-blue-500" />
            <span>Adınız Soyadınız</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Adınız Soyadınız"
          />
          <p className="text-xs text-gray-400 mt-1">Bu bilgi header ve ana sayfada görünecek</p>
        </div>

        {/* Ünvan / Açıklama */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center space-x-2">
            <FiBriefcase className="text-blue-500" />
            <span>Ünvan / Meslek</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Frontend Developer & Creative Thinker"
          />
          <p className="text-xs text-gray-400 mt-1">Header'da ismin altında görünecek</p>
        </div>

        {/* E-posta */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center space-x-2">
            <FiMail className="text-blue-500" />
            <span>E-posta Adresi</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ornek@email.com"
          />
        </div>

        {/* Konum */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center space-x-2">
            <FiMapPin className="text-blue-500" />
            <span>Konum</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="İstanbul, Türkiye"
          />
        </div>

        {/* Deneyim */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Toplam Deneyim
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="5+ Yıl"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
        >
          <FiSave />
          <span>Profili Kaydet</span>
        </button>

        {saved && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
            ✓ Profil bilgileri başarıyla kaydedildi!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;