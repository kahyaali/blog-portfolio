import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiBriefcase, 
  FiTrendingUp, 
  FiHeart, 
  FiSettings, 
  FiImage,
  FiUsers,
  FiAward,
  FiFolder,
  FiBookOpen,
  FiHelpCircle,
  FiMessageSquare
} from 'react-icons/fi';
import AdminAbout from './AdminAbout';
import AdminContact from './AdminContact';
import AdminExperience from './AdminExperience';
import AdminSkills from './AdminSkills';
import AdminHobbies from './AdminHobbies';
import AdminProfile from './AdminProfile';
import AdminReferences from './AdminReferences';
import AdminCertificates from './AdminCertificates';
import AdminPortfolio from './AdminPortfolio';
import AdminBlog from './AdminBlog';
import AdminFAQ from './AdminFAQ';
import AdminGallery from './AdminGallery';
import AdminComments from './AdminComments';

const AdminPanel = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/profile', icon: FiImage, label: 'Profil' },
    { path: '/admin/about', icon: FiUser, label: 'Hakkımda' },
    { path: '/admin/portfolio', icon: FiFolder, label: 'Projeler' },
    { path: '/admin/blog', icon: FiBookOpen, label: 'Blog' },
    { path: '/admin/contact', icon: FiMail, label: 'İletişim' },
    { path: '/admin/experience', icon: FiBriefcase, label: 'İş Deneyimleri' },
    { path: '/admin/skills', icon: FiTrendingUp, label: 'Yetenekler' },
    { path: '/admin/certificates', icon: FiAward, label: 'Sertifikalar' },
    { path: '/admin/hobbies', icon: FiHeart, label: 'Hobiler' },
    { path: '/admin/references', icon: FiUsers, label: 'Referanslar' },
    { path: '/admin/faq', icon: FiHelpCircle, label: 'SSS' },
    { path: '/admin/gallery', icon: FiImage, label: 'Galeri' },
    { path: '/admin/comments', icon: FiMessageSquare, label: 'Yorumlar' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] animate-fade-in">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 md:mb-0 md:mr-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <FiSettings className="text-purple-600 dark:text-purple-400 text-xl" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Admin Panel</h3>
        </div>
        
        <nav className="space-y-2 max-h-[70vh] overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-purple-600 text-white'  // Aktif: mor arkaplan, beyaz text
                    : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Routes>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="hobbies" element={<AdminHobbies />} />
          <Route path="references" element={<AdminReferences />} />
          <Route path="faq" element={<AdminFAQ />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="/" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;