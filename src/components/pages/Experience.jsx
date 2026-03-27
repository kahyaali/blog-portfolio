import React from 'react';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Experience = () => {
  const [experiences] = useLocalStorage('experiences', [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Company Inc.',
      location: 'İstanbul, Türkiye',
      period: '2022 - Günümüz',
      description: 'React ve Next.js ile büyük ölçekli web uygulamaları geliştirdim. Takım liderliği yaparak 3 kişilik ekibi yönettim. Performans optimizasyonları ile uygulama hızını %40 artırdım.',
      achievements: [
        'Şirketin ana ürününü React ile yeniden yapılandırdım',
        'CI/CD pipeline kurulumu yaptım',
        'Code review ve mentorluk süreçlerini yönettim'
      ]
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'İstanbul, Türkiye',
      period: '2020 - 2022',
      description: 'Çeşitli müşteriler için responsive web siteleri ve uygulamalar geliştirdim. Vue.js ve React ile projelerde çalıştım.',
      achievements: [
        '10+ müşteri projesinde frontend geliştirme yaptım',
        'Tailwind CSS ile özel tasarım sistemleri oluşturdum',
        'SEO optimizasyonları ile organik trafiği %50 artırdım'
      ]
    },
    {
      id: 3,
      title: 'Junior Web Developer',
      company: 'Startup Company',
      location: 'Ankara, Türkiye',
      period: '2019 - 2020',
      description: 'HTML, CSS, JavaScript ile web siteleri geliştirdim. E-ticaret sitesi projelerinde görev aldım.',
      achievements: [
        'WordPress tabanlı projeler geliştirdim',
        'E-ticaret sitesinin frontend kısmını tamamladım',
        'Cross-browser uyumluluk sorunlarını çözdüm'
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