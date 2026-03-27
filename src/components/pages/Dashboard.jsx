import React from 'react';
import { FiEye, FiUsers, FiTrendingUp, FiAward, FiMessageSquare, FiImage, FiHeart, FiStar } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Dashboard = () => {
  const [blogPosts] = useLocalStorage('blogPosts', []);
  const [projects] = useLocalStorage('projects', []);
  const [certificates] = useLocalStorage('certificates', []);
  const [comments] = useLocalStorage('comments', []);
  const [chatMessages] = useLocalStorage('chatMessages', []);
  const [galleryImages] = useLocalStorage('galleryImages', []);

  const stats = [
    { icon: FiEye, label: 'Toplam Blog Yazısı', value: blogPosts.length, color: 'blue' },
    { icon: FiTrendingUp, label: 'Projeler', value: projects.length, color: 'green' },
    { icon: FiAward, label: 'Sertifikalar', value: certificates.length, color: 'purple' },
    { icon: FiMessageSquare, label: 'Yorumlar', value: comments.length, color: 'orange' },
    { icon: FiUsers, label: 'Sohbet Mesajları', value: chatMessages.length, color: 'pink' },
    { icon: FiImage, label: 'Galeri Fotoğrafları', value: galleryImages.length, color: 'indigo' },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/80">Site istatistikleriniz ve aktiviteleriniz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[var(--bg)] rounded-xl shadow-md p-6 border border-[var(--border)]">
              <div className={`w-12 h-12 ${colorClasses[stat.color]} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={24} />
              </div>
              <p className="text-[var(--text)] text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-[var(--text-h)] mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;