import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUser, 
  FiMail, 
  FiBriefcase, 
  FiTrendingUp, 
  FiHeart,
  FiSettings,
  FiLogIn,
  FiLogOut,
  FiUsers,
  FiAward,
  FiFolder,
  FiBookOpen,
  FiHelpCircle,
  FiBarChart2,
  FiMenu,
  FiX,
  FiGrid,
  FiDownload,
  FiImage,
  FiMessageCircle
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  // Tüm menü öğeleri
  const navItems = [
    { path: '/', icon: FiHome, label: t('welcome') },
    { path: '/about', icon: FiUser, label: t('about') },
    { path: '/portfolio', icon: FiFolder, label: t('portfolio') },
    { path: '/blog', icon: FiBookOpen, label: t('blog') },
    { path: '/experience', icon: FiBriefcase, label: t('experience') },
    { path: '/skills', icon: FiTrendingUp, label: t('skills') },
    { path: '/certificates', icon: FiAward, label: 'Sertifikalar' },
    { path: '/hobbies', icon: FiHeart, label: 'Hobiler' },
    { path: '/references', icon: FiUsers, label: 'Referanslar' },
    { path: '/faq', icon: FiHelpCircle, label: t('faq') },
    { path: '/gallery', icon: FiImage, label: 'Galeri' },
    { path: '/chat', icon: FiMessageCircle, label: 'Sohbet' },
      { path: '/qrcard', icon: FiGrid, label: 'QR Kart' },
    { path: '/download-cv', icon: FiDownload, label: 'CV İndir' },
    { path: '/contact', icon: FiMail, label: t('contact') },
  ];

  const NavLinkComponent = ({ item, onClick }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          isActive
            ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
            : 'text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]'
        }`
      }
    >
      <item.icon size={18} />
      <span>{item.label}</span>
    </NavLink>
  );

  return (
    <nav className="bg-[var(--bg)] border-b border-[var(--border)] sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold text-[var(--accent)] py-3 flex-shrink-0">
            Portfolio
          </NavLink>

          {/* Desktop Menü - Tüm menüler gösteriliyor, scroll ile taşanlar görünür */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto scrollbar-thin max-w-[60%]">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
                      : 'text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)]'
                  }`
                }
              >
                <item.icon size={16} />
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Sağ Menü */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <NavLink
                  to="/dashboard"
                  className="p-2 rounded-lg text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition"
                >
                  <FiBarChart2 size={18} />
                </NavLink>
                <NavLink
                  to="/admin"
                  className="p-2 rounded-lg text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition"
                >
                  <FiSettings size={18} />
                </NavLink>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg text-[var(--accent)] hover:bg-[var(--accent-bg)] transition"
              >
                <FiLogIn size={16} />
                <span className="text-sm">{t('login')}</span>
              </NavLink>
            )}

            {/* Hamburger Menü Butonu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition"
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobil Menü - Tüm menüler burada */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border)] animate-slide-up max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLinkComponent key={item.path} item={item} onClick={() => setIsMenuOpen(false)} />
              ))}
              
              {/* Mobilde Admin İşlemleri */}
              <div className="pt-2 mt-2 border-t border-[var(--border)]">
                {isAuthenticated ? (
                  <>
                    <NavLinkComponent item={{ path: '/dashboard', icon: FiBarChart2, label: 'Dashboard' }} onClick={() => setIsMenuOpen(false)} />
                    <NavLinkComponent item={{ path: '/admin', icon: FiSettings, label: 'Admin Panel' }} onClick={() => setIsMenuOpen(false)} />
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 py-3 px-4 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition w-full"
                    >
                      <FiLogOut size={18} />
                      <span>{t('logout')}</span>
                    </button>
                  </>
                ) : (
                  <NavLinkComponent item={{ path: '/login', icon: FiLogIn, label: t('login') }} onClick={() => setIsMenuOpen(false)} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;