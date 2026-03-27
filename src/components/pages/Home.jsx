import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUser, FiBriefcase, FiTrendingUp, FiHeart, FiAward, FiUsers, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Home = () => {
  // Profil bilgilerini local storage'dan al
  const [profileName] = useLocalStorage('profileName', 'Ali Yılmaz');
  const [profileTitle] = useLocalStorage('profileTitle', 'Yazılım Destek Danışmanı & Yazılım Geliştirme');
  const [profileImage] = useLocalStorage('profileImage', null);
  const [aboutText] = useLocalStorage('aboutText', '17+ yıllık deneyime sahip Yazılım Uzmanı olarak, yazılım geliştirme, yazılım destek yaşam döngüsünün tüm aşamalarında aktif rol aldım.');

  const defaultImage = "https://via.placeholder.com/120x120?text=Profil";
  
  // İlk ismi al (Merhaba, ben Ali! için)
  const firstName = profileName.split(' ')[0];

  return (
    <div className="space-y-12">
      {/* Hero Section - Yenilendi */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl shadow-2xl">
        {/* Arka Plan Efekti */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profil Resmi */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-50"></div>
                <img
                  src={profileImage || defaultImage}
                  alt={profileName}
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>
            </div>
            
            {/* Metin Bölümü */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Merhaba, ben {firstName}! 👋
              </h1>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-4">
                <p className="text-white text-lg md:text-xl font-medium">
                  {profileTitle}
                </p>
              </div>
              <p className="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed">
                {aboutText.split('.')[0] + '.'}
              </p>
              
              {/* Butonlar */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-50 transition group font-medium"
                >
                  <span>Beni Tanıyın</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-transparent border-2 border-white text-white px-6 py-2.5 rounded-lg hover:bg-white/10 transition font-medium"
                >
                  <FiMail />
                  <span>İletişime Geç</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">17+</div>
              <div className="text-blue-100 text-sm">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">5+</div>
              <div className="text-blue-100 text-sm">Tamamlanan Proje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
              <div className="text-blue-100 text-sm">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">3+</div>
              <div className="text-blue-100 text-sm">Sertifika</div>
            </div>
          </div>
        </div>
      </div>

      {/* Önizleme Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/about" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <FiUser className="text-blue-600 text-2xl group-hover:text-white transition" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Hakkımda</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {aboutText.substring(0, 100)}...
          </p>
          <span className="text-blue-600 group-hover:translate-x-1 inline-block transition font-medium">Detaylar →</span>
        </Link>

        <Link to="/experience" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <FiBriefcase className="text-blue-600 text-2xl group-hover:text-white transition" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">İş Deneyimleri</h3>
          <p className="text-gray-600 mb-4">
            ASP.NET, DotNet Core, MSSQL, Windows Form teknolojilerinde 17+ yıl deneyim
          </p>
          <span className="text-blue-600 group-hover:translate-x-1 inline-block transition font-medium">Detaylar →</span>
        </Link>

        <Link to="/skills" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <FiTrendingUp className="text-blue-600 text-2xl group-hover:text-white transition" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Yetenekler</h3>
          <p className="text-gray-600 mb-4">
            ASP.NET, DotNet Core, MSSQL, Windows Form, React, JavaScript, C#
          </p>
          <span className="text-blue-600 group-hover:translate-x-1 inline-block transition font-medium">Detaylar →</span>
        </Link>

        <Link to="/certificates" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <FiAward className="text-blue-600 text-2xl group-hover:text-white transition" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Sertifikalar</h3>
          <p className="text-gray-600 mb-4">
            Aldığım eğitimler ve profesyonel sertifikalar
          </p>
          <span className="text-blue-600 group-hover:translate-x-1 inline-block transition font-medium">Detaylar →</span>
        </Link>

        <Link to="/hobbies" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <FiHeart className="text-blue-600 text-2xl group-hover:text-white transition" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Hobiler</h3>
          <p className="text-gray-600 mb-4">
            Teknoloji, kitap okumak, müzik ve kişisel gelişim
          </p>
          <span className="text-blue-600 group-hover:translate-x-1 inline-block transition font-medium">Detaylar →</span>
        </Link>

        <Link to="/references" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
            <FiUsers className="text-blue-600 text-2xl group-hover:text-white transition" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Referanslar</h3>
          <p className="text-gray-600 mb-4">
            Birlikte çalıştığım kişilerin görüşleri
          </p>
          <span className="text-blue-600 group-hover:translate-x-1 inline-block transition font-medium">Detaylar →</span>
        </Link>
      </div>

      {/* Teknoloji Stack Bölümü */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Uzmanlık Alanlarım</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {['ASP.NET', 'DotNet Core','Asp.Net Web Api', 'MSSQL', 'Windows Form', 'C#', 'Entity Framework', 'React', 'JavaScript','Jquery','Css','Bootstrap','Devexpress','Dapper'].map((tech, index) => (
            <span key={index} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;