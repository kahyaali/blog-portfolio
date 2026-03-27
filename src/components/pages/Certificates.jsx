import React, { useState } from 'react';
import { FiAward, FiCalendar, FiLink, FiExternalLink, FiImage, FiDownload } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Certificates = () => {
  const [certificates] = useLocalStorage('certificates', [
    {
      id: 1,
      name: 'React Developer Certification',
      issuer: 'Meta (Coursera)',
      date: '2023',
      link: 'https://www.coursera.org/verify/react',
      image: 'https://via.placeholder.com/400x300?text=React+Certificate',
      description: 'React ile modern web uygulamaları geliştirme sertifikası'
    },
    {
      id: 2,
      name: 'Frontend Development',
      issuer: 'Google',
      date: '2022',
      link: 'https://www.google.com/certificate',
      image: 'https://via.placeholder.com/400x300?text=Frontend+Certificate',
      description: 'HTML, CSS, JavaScript ve modern frontend teknolojileri'
    },
    {
      id: 3,
      name: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      date: '2022',
      link: 'https://www.freecodecamp.org/certificate',
      image: 'https://via.placeholder.com/400x300?text=JS+Certificate',
      description: 'JavaScript algoritmaları ve veri yapıları'
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <FiAward className="text-3xl" />
          <h1 className="text-3xl font-bold">Sertifikalar</h1>
        </div>
        <p className="text-blue-100 max-w-2xl">
          Aldığım eğitimler ve kazandığım sertifikalar. Sürekli öğrenmeye ve kendimi geliştirmeye inanıyorum.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiAward className="text-3xl text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{certificates.length}</div>
          <div className="text-gray-500">Toplam Sertifika</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiCalendar className="text-3xl text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">2022-2024</div>
          <div className="text-gray-500">Aktif Yıllar</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiLink className="text-3xl text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">
            {certificates.filter(c => c.link).length}
          </div>
          <div className="text-gray-500">Doğrulanabilir Sertifika</div>
        </div>
      </div>

      {/* Sertifika Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
            {/* Sertifika Resmi */}
            <div 
              className="relative h-48 cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedImage(cert);
                setShowModal(true);
              }}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <FiImage className="text-white text-2xl opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
            
            <div className="p-5">
              {/* Sertifika Adı */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{cert.name}</h3>
              
              {/* Veren Kurum */}
              <p className="text-blue-600 font-medium text-sm mb-2">{cert.issuer}</p>
              
              {/* Tarih */}
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-3">
                <FiCalendar size={14} />
                <span>{cert.date}</span>
              </div>
              
              {/* Açıklama */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cert.description}</p>
              
              {/* Butonlar */}
              <div className="flex space-x-3">
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-1 text-sm"
                  >
                    <FiExternalLink size={14} />
                    <span>Görüntüle</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSelectedImage(cert);
                    setShowModal(true);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center space-x-1 text-sm"
                >
                  <FiImage size={14} />
                  <span>Büyüt</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Sertifika Büyük Görünüm */}
      {showModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-bold">{selectedImage.name}</h3>
              <p className="text-gray-200">{selectedImage.issuer} - {selectedImage.date}</p>
              <p className="text-gray-300 text-sm mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;