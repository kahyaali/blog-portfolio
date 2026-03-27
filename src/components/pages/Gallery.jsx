import React, { useState } from 'react';
import { FiImage, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Gallery = () => {
  const [images] = useLocalStorage('galleryImages', [
    { id: 1, url: 'https://picsum.photos/id/1/400/300', title: 'Doğa Manzarası', description: 'Yemyeşil doğa' },
    { id: 2, url: 'https://picsum.photos/id/2/400/300', title: 'Şehir Işıkları', description: 'Gece şehir manzarası' },
    { id: 3, url: 'https://picsum.photos/id/3/400/300', title: 'Ofis Ortamı', description: 'Çalışma alanım' },
    { id: 4, url: 'https://picsum.photos/id/4/400/300', title: 'Teknoloji', description: 'Yazılım geliştirme' }
  ]);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <FiImage className="text-3xl" />
          <h1 className="text-3xl font-bold">Fotoğraf Galerisi</h1>
        </div>
        <p className="text-white/80">Anılarım, etkinliklerim ve çalışma ortamım</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition"
            onClick={() => openLightbox(image, index)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg">{image.title}</h3>
                <p className="text-sm text-white/80">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <FiX size={30} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/50 p-2 rounded-full"
          >
            <FiChevronLeft size={30} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/50 p-2 rounded-full"
          >
            <FiChevronRight size={30} />
          </button>
          <div className="max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;