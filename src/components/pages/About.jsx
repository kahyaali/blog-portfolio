import React from 'react';
import { FiUser, FiBriefcase, FiMail, FiMapPin, FiCalendar, FiAward, FiCode, FiTrendingUp, FiDatabase, FiServer } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const About = () => {
  const [aboutText] = useLocalStorage('aboutText', '');
  const [profileName] = useLocalStorage('profileName', 'Ali Kahya');
  const [profileTitle] = useLocalStorage('profileTitle', 'Yazılım Destek Danışmanı & Yazılım Geliştirme');
  const [profileEmail] = useLocalStorage('profileEmail', 'ali.kahya@outlook.com');
  const [profileLocation] = useLocalStorage('profileLocation', 'İstanbul, Türkiye');
  const [profileExperience] = useLocalStorage('profileExperience', '17+ Yıl');

  // Varsayılan metin - TEMİZ VERSİYON
  const defaultText = `17+ yıllık deneyime sahip Yazılım Uzmanı olarak, yazılım geliştirme, yazılım destek yaşam döngüsünün tüm aşamalarında aktif rol aldım.

Özellikle ASP.NET, DotNet Core, MSSQL, Windows Form uygulamalarında görev aldım.

Farklı sektörlerde edindiğim tecrübe ile sistem kurulumları, veri yönetimi ve müşteri odaklı çözümler geliştirdim.

Kariyer hedefim; teknik liderlik ve ekip yönetimi alanında ilerleyerek projelere yön veren bir rol üstlenmektir.`;

  const displayText = aboutText || defaultText;
  
  // Metni temizle ve paragraflara ayır
  const cleanText = displayText.replace(/\r\n/g, '\n').trim();
  const paragraphs = cleanText.split(/\n\s*\n/).filter(p => p.trim());

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <FiUser className="text-3xl" />
          <h1 className="text-3xl font-bold">Hakkımda</h1>
        </div>
        <p className="text-blue-100 max-w-2xl">
          {profileTitle}
        </p>
      </div>

      {/* Ana İçerik - Grid Yapısı */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Taraf - Kişisel Bilgiler */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profil Kartı */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <img
              src={useLocalStorage('profileImage')[0] || "https://via.placeholder.com/150x150?text=Profil"}
              alt="Profil"
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-blue-500 shadow-lg"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-4">{profileName}</h2>
            <p className="text-blue-600 text-sm mt-1">{profileTitle}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                <FiMapPin size={14} />
                <span>{profileLocation}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm mt-2">
                <FiMail size={14} />
                <a href={`mailto:${profileEmail}`} className="hover:text-blue-600">{profileEmail}</a>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <FiTrendingUp className="text-blue-500" />
              <span>Profesyonel Bilgiler</span>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Toplam Deneyim</span>
                <span className="font-semibold text-gray-800">{profileExperience}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Tamamlanan Proje</span>
                <span className="font-semibold text-gray-800">5+</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Mutlu Müşteri</span>
                <span className="font-semibold text-gray-800">15+</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Sertifika</span>
                <span className="font-semibold text-gray-800">2+</span>
              </div>
            </div>
          </div>

          {/* Teknolojiler */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <FiCode className="text-blue-500" />
              <span>Teknolojiler</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {['ASP.NET', 'DotNet Core','Asp.Net Web Api', 'MSSQL', 'Windows Form', 'C#', 'Entity Framework', 'React', 'JavaScript','Jquery','Css','Bootstrap','Devexpress','Dapper'].map((tech, index) => (
                <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Hakkımda Metni */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Kimim?</h2>
            </div>
            
            {/* Metin Bölümü - Düzgün Hizalama */}
            <div className="text-gray-700 space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-justify">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Kariyer Hedefi */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <FiAward className="text-2xl" />
              <h3 className="text-xl font-semibold">Kariyer Hedefim</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Teknik liderlik ve ekip yönetimi alanında ilerleyerek, projelere yön veren, 
              yenilikçi çözümler üreten ve ekibin potansiyelini en üst düzeye çıkaran bir rol üstlenmek.
            </p>
          </div>

          {/* Deneyim Özeti */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FiBriefcase className="text-blue-600 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-800">Deneyim Özeti</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCalendar className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">17+ Yıl Sektör Deneyimi</h4>
                  <p className="text-gray-600 text-sm mt-1">Yazılım geliştirme ve destek süreçlerinin tüm aşamalarında aktif rol aldım.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiDatabase className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Microsoft Teknolojileri Uzmanlığı</h4>
                  <p className="text-gray-600 text-sm mt-1">ASP.NET, DotNet Core, MSSQL, Windows Form uygulamalarında derinlemesine deneyim.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiTrendingUp className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Çoklu Sektör Tecrübesi</h4>
                  <p className="text-gray-600 text-sm mt-1">Finans, e-ticaret, sağlık, eğitim gibi farklı sektörlerde sistem kurulumları ve veri yönetimi projeleri.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;