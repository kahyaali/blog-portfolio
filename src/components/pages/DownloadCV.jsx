import React, { useRef } from 'react';
import { FiDownload, FiPrinter, FiFileText } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNotification } from '../../contexts/NotificationContext';

const DownloadCV = () => {
  const [profileName] = useLocalStorage('profileName', 'Ali Kahya');
  const [profileTitle] = useLocalStorage('profileTitle', 'Yazılım Destek Danışmanı & Yazılım Geliştirme');
  const [profileEmail] = useLocalStorage('profileEmail', 'ali.kahya@outlook.com');
  const [profileLocation] = useLocalStorage('profileLocation', 'İstanbul, Türkiye');
  const [aboutText] = useLocalStorage('aboutText', '');
  const [skills] = useLocalStorage('skills', []);
  const [experiences] = useLocalStorage('experiences', []);
  
  const { showSuccess } = useNotification();
  const cvRef = useRef();

  const downloadPDF = () => {
    const element = cvRef.current;
    const opt = {
      margin: 0.5,
      filename: `${profileName}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
    showSuccess('CV başarıyla indirildi!');
  };

  const printCV = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">CV İndir</h1>
        <p className="text-white/80">Özgeçmişinizi PDF olarak indirin veya yazdırın</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div ref={cvRef} className="bg-[var(--bg)] rounded-xl shadow-md p-8 border border-[var(--border)]">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-[var(--text-h)]">{profileName}</h1>
              <p className="text-[var(--accent)] text-lg mt-1">{profileTitle}</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-[var(--text)]">
                <span>📧 {profileEmail}</span>
                <span>📍 {profileLocation}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-[var(--text-h)] mb-3 border-b border-[var(--border)] pb-2">Hakkımda</h2>
              <p className="text-[var(--text)] leading-relaxed">{aboutText || 'Hakkımda sayfasından gerekli bilgilere ulaşabilirsiniz.'}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-[var(--text-h)] mb-3 border-b border-[var(--border)] pb-2">Yetenekler</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm">
                    {skill.name} ({skill.level}%)
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-h)] mb-3 border-b border-[var(--border)] pb-2">İş Deneyimleri</h2>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-[var(--text-h)]">{exp.title}</h3>
                    <p className="text-[var(--accent)] text-sm">{exp.company} | {exp.period}</p>
                    <p className="text-[var(--text)] text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
            <h3 className="text-lg font-semibold text-[var(--text-h)] mb-4">İşlemler</h3>
            <div className="space-y-3">
              <button
                onClick={downloadPDF}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
              >
                <FiDownload />
                <span>PDF İndir</span>
              </button>
              <button
                onClick={printCV}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--accent-bg)] transition"
              >
                <FiPrinter />
                <span>Yazdır</span>
              </button>
              <button
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--accent-bg)] transition"
              >
                <FiFileText />
                <span>Word Olarak Kaydet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadCV;