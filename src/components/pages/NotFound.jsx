import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle, FiArrowLeft, FiSearch, FiGithub, FiTwitter } from 'react-icons/fi';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Taraf - Görsel */}
          <div className="relative">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
              }}
            />
            <div className="relative text-center">
              <div className="text-8xl md:text-9xl font-black text-gray-200 select-none">
                4
                <span className="inline-block animate-bounce">0</span>
                4
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiAlertCircle className="text-6xl md:text-7xl text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sağ Taraf - İçerik */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Sayfa Bulunamadı
            </h1>
            <p className="text-gray-600 mb-6">
              Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Lütfen aşağıdaki seçeneklerden birini deneyin.
            </p>

            {/* Arama Kutusu */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Sitede ara..."
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Ara
                </button>
              </div>
            </form>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition group"
              >
                <FiHome className="group-hover:scale-110 transition" />
                <span>Ana Sayfa</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition"
              >
                <FiArrowLeft />
                <span>Geri Dön</span>
              </button>
            </div>
          </div>
        </div>

        {/* Önerilen Sayfalar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Hızlı Bağlantılar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { path: '/', label: 'Ana Sayfa', icon: '🏠', color: 'blue' },
              { path: '/about', label: 'Hakkımda', icon: '👤', color: 'green' },
              { path: '/experience', label: 'Deneyimler', icon: '💼', color: 'purple' },
              { path: '/skills', label: 'Yetenekler', icon: '⚡', color: 'orange' },
              { path: '/hobbies', label: 'Hobiler', icon: '🎯', color: 'pink' },
              { path: '/contact', label: 'İletişim', icon: '📧', color: 'red' },
            ].map((page, index) => (
              <Link
                key={index}
                to={page.path}
                className={`px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-${page.color}-50 hover:text-${page.color}-600 transition text-center group`}
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition">{page.icon}</div>
                <span className="text-sm">{page.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2024 Kişisel Blog. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;