import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import DarkModeToggle from './components/common/DarkModeToggle';
import './i18n';

// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Experience from './components/pages/Experience';
import Skills from './components/pages/Skills';
import Hobbies from './components/pages/Hobbies';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import References from './components/pages/References';
import Certificates from './components/pages/Certificates';
import Portfolio from './components/pages/Portfolio';
import Blog from './components/pages/Blog';
import FAQ from './components/pages/FAQ';
import Dashboard from './components/pages/Dashboard';
import QRCard from './components/pages/QRCard';
import DownloadCV from './components/pages/DownloadCV';
import Gallery from './components/pages/Gallery';
import Chat from './components/pages/Chat';

// Admin
import AdminPanel from './components/admin/AdminPanel';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/experience" element={<Layout><Experience /></Layout>} />
              <Route path="/skills" element={<Layout><Skills /></Layout>} />
              <Route path="/hobbies" element={<Layout><Hobbies /></Layout>} />
              <Route path="/references" element={<Layout><References /></Layout>} />
              <Route path="/certificates" element={<Layout><Certificates /></Layout>} />
              <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/qrcard" element={<Layout><QRCard /></Layout>} />
              <Route path="/download-cv" element={<Layout><DownloadCV /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/chat" element={<Layout><Chat /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <Layout>
                    <AdminPanel />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
            <DarkModeToggle />
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;