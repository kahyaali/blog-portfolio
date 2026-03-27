import React from 'react';
import { FiUsers, FiMail, FiPhone, FiBriefcase, FiStar, FiMessageCircle, FiUser } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const References = () => {
  const [references] = useLocalStorage('references', []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`inline-block ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        size={16}
      />
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <FiUsers className="text-3xl" />
          <h1 className="text-3xl font-bold">Referanslar</h1>
        </div>
        <p className="text-blue-100 max-w-2xl">
          Daha önce birlikte çalıştığım iş arkadaşlarım ve müşterilerimin benim hakkımdaki düşünceleri.
        </p>
      </div>

      {/* Referans Kartları */}
      {references.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiUsers className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz Referans Yok</h3>
          <p className="text-gray-500">
            Referanslar yakında eklenecektir. Admin panelinden referans ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map((ref) => (
            <div key={ref.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
              <div className="p-6">
                {/* İsim ve Avatar */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {ref.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{ref.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FiBriefcase size={14} />
                      <span>{ref.position || 'Pozisyon belirtilmemiş'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Şirket */}
                <div className="mb-3 text-sm text-gray-600">
                  <FiUser className="inline mr-1" size={12} />
                  {ref.company}
                </div>
                
                {/* Rating */}
                <div className="mb-3">
                  {renderStars(ref.rating)}
                  <span className="text-xs text-gray-500 ml-2">({ref.rating}/5)</span>
                </div>
                
                {/* Mesaj */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4 relative min-h-[100px]">
                  <FiMessageCircle className="absolute top-2 right-2 text-gray-300" size={20} />
                  <p className="text-gray-700 text-sm italic leading-relaxed">"{ref.message}"</p>
                </div>
                
                {/* İletişim Bilgileri */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {ref.email && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiMail size={14} className="text-blue-500 flex-shrink-0" />
                      <a href={`mailto:${ref.email}`} className="hover:text-blue-600 truncate">
                        {ref.email}
                      </a>
                    </div>
                  )}
                  {ref.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiPhone size={14} className="text-blue-500 flex-shrink-0" />
                      <a href={`tel:${ref.phone}`} className="hover:text-blue-600">
                        {ref.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Bölümü */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Siz de Referans Olmak İster misiniz?</h3>
        <p className="text-gray-600 mb-4">
          Benimle çalıştıysanız ve referans vermek isterseniz lütfen iletişime geçin.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiMail />
          <span>İletişime Geç</span>
        </a>
      </div>
    </div>
  );
};

export default References;