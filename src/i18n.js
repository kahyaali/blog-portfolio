import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      welcome: "Ana Sayfa",
      about: "Hakkımda",
      contact: "İletişim",
      experience: "Deneyim",
      skills: "Yetenekler",
      portfolio: "Projeler",
      blog: "Blog",
      faq: "SSS",
      dashboard: "Dashboard",
      login: "Giriş Yap",
      logout: "Çıkış Yap",
      search: "Ara...",
      noResults: "Sonuç bulunamadı",
      download: "İndir",
      share: "Paylaş",
      copy: "Kopyala",
      send: "Gönder",
      name: "Ad Soyad",
      email: "E-posta",
      message: "Mesaj",
      subject: "Konu",
      phone: "Telefon",
      address: "Adres"
    }
  },
  en: {
    translation: {
      welcome: "Home",
      about: "About",
      contact: "Contact",
      experience: "Experience",
      skills: "Skills",
      portfolio: "Portfolio",
      blog: "Blog",
      faq: "FAQ",
      dashboard: "Dashboard",
      login: "Login",
      logout: "Logout",
      search: "Search...",
      noResults: "No results found",
      download: "Download",
      share: "Share",
      copy: "Copy",
      send: "Send",
      name: "Full Name",
      email: "Email",
      message: "Message",
      subject: "Subject",
      phone: "Phone",
      address: "Address"
    }
  }
};

// Local storage'dan dil tercihini al
const savedLanguage = localStorage.getItem('language') || 'tr';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;