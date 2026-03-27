import React from 'react';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Experience = () => {
  const [experiences] = useLocalStorage('experiences', [
    {
      id: 1,
      title: 'Yazılım Geliştirme',
      company: 'BTI Bilişim ve Danışmanlık',
      location: 'İstanbul, Türkiye',
      period: '2025 / 2026',
      description: 'Logo Yazılım programı için uyarlama araçlarını kullanarak çeşitli özelleştirmeler gerçekleştirdim.Müşteri ihtiyaçlarına yönelik entegrasyon yazılımları geliştirdim. Üretim sektöründe faaliyet gösteren firmalar için Windows Forms uygulamaları geliştirerek, REST API üzerinden üretim planlama ve üretim yönetimi çözümleri sundum.',
      achievements: [
        
      ]
    },
    {
      id: 2,
      title: 'Yazılım Destek Danışmanı',
      company: 'Systemsoft',
      location: 'İstanbul, Türkiye',
      period: '2024 / 2025',
      description: 'B2B web uygulamaları ve Microsoft SQL Server (MSSQL) altyapılarının kurulum, konfigürasyon ve devreye alma süreçlerini yönettim. Müşterilere sistem kullanımı, veri yönetimi ve iş süreçleri hakkında teknik eğitimler verdim. İş ihtiyaçlarını analiz ederek MSSQL tabanlı veri yapıları, sorgular ve özel çözümler geliştirdim. Performans iyileştirme (query optimization), veri yedekleme (backup/restore) ve sistem sürekliliğini sağlamak adına gerekli bakım ve iyileştirme çalışmalarını gerçekleştirdim. Sistem stabilitesini artırmak için ihtiyaç duyulan ek modül ve opsiyonların entegrasyonunu sağladım.',
      achievements: [
       
      ]
    },
    {
      id: 3,
      title: 'Yazılım Destek Danışmanı & Yazılım Geliştirme',
      company: 'Meyer Grup',
      location: 'İstanbul, Türkiye',
      period: '2021 / 2023',
      description: 'Meyer Angel PDKS sistemi ve Microsoft SQL Server (MSSQL) altyapılarının kurulum, konfigürasyon ve devreye alma süreçlerini yönettim. Müşterilere sistem kullanımı, personel devam kontrol süreçleri ve raporlama konularında eğitimler verdim. Müşteri ihtiyaçlarını analiz ederek MSSQL üzerinde özel sorgular geliştirdim ve ihtiyaca yönelik raporlar hazırladım. Veri doğruluğu ve sistem verimliliğini artırmak amacıyla gerekli iyileştirme ve optimizasyon çalışmalarını gerçekleştirdim.',
      achievements: [
        
      ]
    },
     {
      id: 4,
      title: 'Otomasyon Programcısı',
      company: 'Emikon',
      location: 'İstanbul, Türkiye',
      period: '2016 / 2019',
      description: 'Elektrik otomasyon panolarının tasarımını ve projelendirmesini gerçekleştirdim. PLC, HMI ve inverter sistemleri için yazılım geliştirme ve devreye alma süreçlerinde aktif rol aldım. Endüstriyel otomasyon projelerinde süreç kontrolü, makine entegrasyonu ve sistem optimizasyonu çalışmaları yaptım. Sahada devreye alma, test ve arıza giderme süreçlerini yöneterek sistemlerin kesintisiz ve verimli çalışmasını sağladım.',
      achievements: [
        
      ]
    },
     {
      id: 5,
      title: 'Otomasyon Programcısı',
      company: 'Azra Otomasyon',
      location: 'İstanbul, Türkiye',
      period: '2014 / 2016',
      description: 'Elektrik otomasyon panolarının tasarımını ve projelendirmesini gerçekleştirdim. PLC, HMI ve inverter sistemleri için yazılım geliştirme ve devreye alma süreçlerinde aktif rol aldım. Endüstriyel otomasyon projelerinde süreç kontrolü, makine entegrasyonu ve sistem optimizasyonu çalışmaları yaptım. Sahada devreye alma, test ve arıza giderme süreçlerini yöneterek sistemlerin kesintisiz ve verimli çalışmasını sağladım.',
      achievements: [
        
      ]
    }
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center space-x-3 mb-6">
          <FiBriefcase className="text-blue-600 text-3xl" />
          <h2 className="text-3xl font-bold text-gray-800">İş Deneyimleri</h2>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 pb-8 last:pb-0">
              {/* Timeline çizgisi */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-blue-200"></div>
              )}
              {/* Timeline noktası */}
              <div className="absolute left-0 top-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <FiCalendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-3">
                  <FiMapPin size={14} />
                  <span>{exp.location}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{exp.description}</p>
                
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Başarılar:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;