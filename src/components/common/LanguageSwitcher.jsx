import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="flex items-center space-x-1 bg-[var(--accent-bg)] rounded-lg p-1">
      <button
        onClick={() => changeLanguage('tr')}
        className={`px-2 py-1 rounded text-xs transition ${
          i18n.language === 'tr' 
            ? 'bg-[var(--accent)] text-white' 
            : 'text-[var(--text)] hover:text-[var(--accent)]'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded text-xs transition ${
          i18n.language === 'en' 
            ? 'bg-[var(--accent)] text-white' 
            : 'text-[var(--text)] hover:text-[var(--accent)]'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;