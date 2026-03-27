import React, { useState, useRef } from 'react';
import { FiCamera, FiUpload, FiX } from 'react-icons/fi';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProfileImage = () => {
  const [profileImage, setProfileImage] = useLocalStorage('profileImage', null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const defaultImage = "https://via.placeholder.com/150x150?text=Profil";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsEditing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setIsEditing(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative group">
      <div className="relative">
        <img
          src={profileImage || defaultImage}
          alt="Profil"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
        />
        
        {/* Edit Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={triggerFileInput}
        >
          <FiCamera className="text-white text-2xl" />
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Edit Modal (isteğe bağlı) */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Profil Resmi Düzenle</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={profileImage || defaultImage}
                  alt="Profil önizleme"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              
              <button
                onClick={triggerFileInput}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <FiUpload />
                <span>Resim Yükle</span>
              </button>
              
              {profileImage && (
                <button
                  onClick={handleRemoveImage}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Resmi Kaldır
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;