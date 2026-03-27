import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiLock, FiUser, FiLogIn, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Kullanıcı adı veya şifre hatalı!');
      }
      setLoading(false);
    }, 500);
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('19581958Admin.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="bg-[var(--bg)] rounded-2xl shadow-xl p-8 max-w-md w-full border border-[var(--border)]">
        {/* Başlık */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiLock className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-h)]">Admin Girişi</h2>
          <p className="text-[var(--text)] text-sm mt-2">Yönetim paneline erişim için giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kullanıcı Adı */}
          <div>
            <label className="block text-[var(--text-h)] text-sm font-medium mb-2">
              Kullanıcı Adı
            </label>
            <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--bg)] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition">
              <div className="pl-3 pr-2">
                <FiUser className="text-[var(--text)]" size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2.5 pr-3 bg-transparent text-[var(--text-h)] placeholder:text-[var(--text)] focus:outline-none"
                placeholder="admin"
                required
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-[var(--text-h)] text-sm font-medium mb-2">
              Şifre
            </label>
            <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--bg)] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition">
              <div className="pl-3 pr-2">
                <FiLock className="text-[var(--text)]" size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2.5 pr-2 bg-transparent text-[var(--text-h)] placeholder:text-[var(--text)] focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3 pl-1 text-[var(--text)] hover:text-[var(--accent)] transition"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
              <FiAlertCircle className="text-red-500 flex-shrink-0" size={18} />
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Giriş Butonu */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white py-2.5 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiLogIn size={18} />
            <span>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</span>
          </button>

          {/* Demo Butonu */}
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full text-sm text-[var(--accent)] hover:underline py-2"
          >
            Demo bilgileri doldur
          </button>

          {/* Demo Bilgileri */}
          <div className="text-center text-sm pt-4 border-t border-[var(--border)]">
            <p className="text-[var(--text)] mb-2">Demo hesap bilgileri:</p>
            <div className="bg-[var(--code-bg)] p-3 rounded-lg text-left space-y-1">
              <p className="text-[var(--text)] text-xs">
                <span className="font-medium">👤 Kullanıcı adı:</span>{' '}
                <span className="text-[var(--accent)] font-mono">****************</span>
              </p>
              <p className="text-[var(--text)] text-xs">
                <span className="font-medium">🔑 Şifre:</span>{' '}
                <span className="text-[var(--accent)] font-mono">********************</span>
              </p>
            </div>
            <p className="text-xs text-[var(--text)]/60 mt-3">
              ⚠️ Büyük/küçük harf duyarlıdır, noktayı unutmayın
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;