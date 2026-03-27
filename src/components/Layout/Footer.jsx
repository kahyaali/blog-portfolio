import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] mt-auto">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-h)] mb-4">Hakkımda</h3>
            <p className="text-[var(--text)]">
              Asp.Net Mvc, Asp.Net Dotnet Core, Asp.Net Web Api, Javascript, Jquery, Css, Bootstrap, React,
              Devexpress, Git, Github, Dapper eğitimleri aldım ve uygulamalar geliştirdim.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-[var(--text-h)] mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[var(--text)] hover:text-[var(--accent)] transition">
                  Hakkımda
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-[var(--text)] hover:text-[var(--accent)] transition">
                  İş Deneyimleri
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[var(--text)] hover:text-[var(--accent)] transition">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-[var(--text-h)] mb-4">Takip Et</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/kahyaali" target="_blank" rel="noopener noreferrer" 
                 className="p-2 rounded-lg bg-[var(--social-bg)] text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/kahyaali" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg bg-[var(--social-bg)] text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition">
                <FiLinkedin size={20} />
              </a>
              <a href="https://twitter.com/kahyaali" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg bg-[var(--social-bg)] text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition">
                <FiTwitter size={20} />
              </a>
              <a href="mailto:ali.kahya@example.com"
                 className="p-2 rounded-lg bg-[var(--social-bg)] text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-[var(--text)]">
          <p>&copy; {currentYear} Ali Kahya. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;