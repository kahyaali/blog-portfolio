import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Header = () => {
  const [profileImage] = useLocalStorage('profileImage', null);
  const [name] = useLocalStorage('profileName', 'Ahmet Yılmaz');
  const [title] = useLocalStorage('profileTitle', 'Yazılım Destek Danışmanı & Yazılım Geliştirme');

  const defaultImage = "https://via.placeholder.com/120x120?text=Profil";

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">
          <img
            src={profileImage || defaultImage}
            alt="Profil"
            className="w-28 h-28 rounded-full border-4 border-[var(--accent)] shadow-lg object-cover mx-auto mb-3"
          />
          <h1 className="text-3xl font-bold text-[var(--text-h)] mb-1">{name}</h1>
          <p className="text-[var(--text)]">{title}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;