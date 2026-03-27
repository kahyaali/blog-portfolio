import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch, FiHelpCircle } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const FAQ = () => {
  const [faqs] = useLocalStorage('faqs', []);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...new Set(faqs.map(f => f.category).filter(Boolean))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <FiHelpCircle className="text-3xl" />
          <h1 className="text-3xl font-bold">Sık Sorulan Sorular</h1>
        </div>
        <p className="text-white/80">Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-72 space-y-4">
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-4 border border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-h)] mb-3">Soru Ara</h3>
            <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--bg)] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition">
              <div className="pl-3 pr-2">
                <FiSearch className="text-[var(--text)]" size={18} />
              </div>
              <input
                type="text"
                placeholder="Soru veya cevap ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2.5 pr-3 bg-transparent text-[var(--text-h)] placeholder:text-[var(--text)] placeholder:text-sm focus:outline-none"
              />
            </div>
          </div>
          
          <div className="bg-[var(--bg)] rounded-xl shadow-md p-4 border border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text-h)] mb-3">Kategoriler</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === cat 
                      ? 'bg-[var(--accent-bg)] text-[var(--accent)] font-medium' 
                      : 'text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]'
                  }`}
                >
                  <span className="flex justify-between items-center">
                    <span>{cat === 'all' ? 'Tümü' : cat}</span>
                    <span className="text-xs opacity-70">
                      {faqs.filter(f => cat === 'all' || f.category === cat).length}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-[var(--bg)] rounded-xl shadow-md p-12 text-center border border-[var(--border)]">
              <FiHelpCircle className="text-4xl text-[var(--text)] mx-auto mb-3 opacity-50" />
              <p className="text-[var(--text)]">Aradığınız kriterde soru bulunamadı.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-[var(--accent)] hover:underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className="bg-[var(--bg)] rounded-xl shadow-md border border-[var(--border)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center hover:bg-[var(--accent-bg)] transition"
                >
                  <span className="font-semibold text-[var(--text-h)] pr-4">{faq.question}</span>
                  {openIndex === index ? 
                    <FiChevronUp className="text-[var(--accent)] flex-shrink-0" /> : 
                    <FiChevronDown className="text-[var(--text)] flex-shrink-0" />
                  }
                </button>
                {openIndex === index && (
                  <div className="p-5 pt-0 border-t border-[var(--border)]">
                    <p className="text-[var(--text)] leading-relaxed">{faq.answer}</p>
                    <span className="inline-block mt-3 text-xs text-[var(--text)]/60 bg-[var(--accent-bg)] px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;