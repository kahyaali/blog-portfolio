import React, { useState } from 'react';
import { FiHeart, FiBook, FiMusic, FiCamera, FiCoffee, FiActivity, FiPlus, FiX, FiImage } from 'react-icons/fi';
import { FaCampground } from 'react-icons/fa';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Hobbies = () => {
  const [hobbies] = useLocalStorage('hobbies', [
    { name: 'Kitap Okumak', icon: 'book', color: 'blue', description: 'Yılda 50+ kitap okuma hedefim var' },
    { name: 'Kamp Yapmak', icon: 'campground', color: 'green', description: 'Deniz ve Orman' },
    { name: 'Oyun Oynamak', icon: 'activity', color: 'purple', description: 'PC ve konsol oyunları' },
    { name: 'Fotoğrafçılık', icon: 'camera', color: 'orange', description: 'Sokak ve manzara fotoğrafçılığı' },
    { name: 'Kahve Kültürü', icon: 'coffee', color: 'red', description: 'Farklı kahve türlerini denemek' }
  ]);

  const [galleryImages, setGalleryImages] = useLocalStorage('hobbyGallery', [
    { id: 1, url: 'https://picsum.photos/id/1/400/300', title: 'Kitap Okuma Köşem', description: 'En sevdiğim okuma alanım' },
    { id: 2, url: 'https://picsum.photos/id/2/400/300', title: 'Gitar Dersi', description: 'Gitar çalarken' },
    { id: 3, url: 'https://picsum.photos/id/3/400/300', title: 'Oyun Günü', description: 'Arkadaşlarla oyun keyfi' },
    { id: 4, url: 'https://picsum.photos/id/4/400/300', title: 'Fotoğraf Gezisi', description: 'Şehir fotoğrafları çekerken' }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getIconComponent = (iconName) => {
    const icons = {
      book: FiBook,
      music: FiMusic,
      activity: FiActivity,
      camera: FiCamera,
      coffee: FiCoffee,
       campground: FaCampground
    };
    return icons[iconName] || FiHeart;
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hobiler Bölümü */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FiHeart className="text-blue-600 text-3xl" />
          <h2 className="text-3xl font-bold text-gray-800">Hobilerim</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => {
            const IconComponent = getIconComponent(hobby.icon);
            return (
              <div
                key={index}
                className={`border rounded-xl p-6 ${getColorClass(hobby.color)} transition-all hover:scale-105 cursor-pointer`}
              >
                <div className="flex flex-col items-center text-center">
                  <IconComponent size={48} className="mb-4" />
                  <h3 className="text-xl font-bold mb-2">{hobby.name}</h3>
                  <p className="text-sm opacity-75">{hobby.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hobi Galerisi */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FiImage className="text-blue-600 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-800">Hobi Galerisi</h2>
          </div>
          <span className="text-sm text-gray-500">{galleryImages.length} fotoğraf</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              onClick={() => {
                setSelectedImage(image);
                setShowModal(true);
              }}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resim Modalı */}
        {showModal && selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowModal(false)}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
              >
                <FiX size={30} />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-200">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hobbies;