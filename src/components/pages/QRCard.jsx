import React from 'react';
import { FiGrid, FiCopy, FiShare2, FiDownload } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const QRCard = () => {
  const [profileName] = useLocalStorage('profileName', 'Ahmet Yılmaz');
  const [profileTitle] = useLocalStorage('profileTitle', 'Yazılım Destek Danışmanı & Yazılım Geliştirme');
  const [profileEmail] = useLocalStorage('profileEmail', 'ahmet.yilmaz@example.com');
  const [profileLocation] = useLocalStorage('profileLocation', 'İstanbul, Türkiye');
  const [contactInfo] = useLocalStorage('contactInfo', { phone: '+90 555 123 45 67' });

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profileName}
TITLE:${profileTitle}
TEL:${contactInfo.phone}
EMAIL:${profileEmail}
ADR:${profileLocation}
END:VCARD`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vCardData);
    alert('vCard kopyalandı!');
  };

  const shareCard = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileName} - Kartvizit`,
        text: `${profileName} - ${profileTitle}\nTel: ${contactInfo.phone}\nE-posta: ${profileEmail}`,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <FiGrid className="text-3xl" />
          <h1 className="text-3xl font-bold">Dijital Kartvizit</h1>
        </div>
        <p className="text-white/80">İletişim bilgilerinizi paylaşın</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bilgi Kartı */}
        <div className="bg-[var(--bg)] rounded-xl shadow-md p-8 border border-[var(--border)]">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-[var(--accent-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
              <FiGrid className="text-4xl text-[var(--accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-h)]">{profileName}</h2>
            <p className="text-[var(--accent)] mt-1">{profileTitle}</p>
          </div>
          
          <div className="space-y-3 border-t border-[var(--border)] pt-4">
            <p className="text-[var(--text)] flex items-center space-x-2">
              <span className="font-medium w-20">📞 Telefon:</span>
              <span>{contactInfo.phone}</span>
            </p>
            <p className="text-[var(--text)] flex items-center space-x-2">
              <span className="font-medium w-20">✉️ E-posta:</span>
              <span className="break-all">{profileEmail}</span>
            </p>
            <p className="text-[var(--text)] flex items-center space-x-2">
              <span className="font-medium w-20">📍 Adres:</span>
              <span>{profileLocation}</span>
            </p>
          </div>
        </div>

        {/* İşlem Butonları */}
        <div className="space-y-4">
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
            <h3 className="text-lg font-semibold text-[var(--text-h)] mb-4">Kartvizit İşlemleri</h3>
            <div className="space-y-3">
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
              >
                <FiCopy size={18} />
                <span>vCard Kopyala</span>
              </button>
              
              <button
                onClick={shareCard}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--accent-bg)] hover:border-[var(--accent)] transition"
              >
                <FiShare2 size={18} />
                <span>Paylaş</span>
              </button>
            </div>
          </div>

          <div className="bg-[var(--bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
            <h3 className="text-lg font-semibold text-[var(--text-h)] mb-2">Nasıl Kullanılır?</h3>
            <ul className="space-y-2 text-[var(--text)] text-sm">
              <li>📋 vCard kopyalayarak kişiyi doğrudan rehbere ekleyebilirsiniz</li>
              <li>🔗 Paylaş butonu ile sosyal medyada paylaşabilirsiniz</li>
              <li>📱 QR kod yakında eklenecektir</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCard;