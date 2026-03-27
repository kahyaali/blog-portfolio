import React, { useState } from 'react';
import { FiSave, FiTrash2, FiPlus, FiEdit2, FiX } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminFAQ = () => {
  const [faqs, setFaqs] = useLocalStorage('faqs', []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '' });
  const [saved, setSaved] = useState(false);

  const categories = ['Genel', 'Teknik', 'Kariyer', 'İletişim'];

  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
      setFaqs([...faqs, { ...newFaq, id: newId }]);
      setNewFaq({ question: '', answer: '', category: '' });
    }
  };

  const startEdit = (faq) => {
    setEditingId(faq.id);
    setEditForm({ ...faq });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const updated = faqs.map(faq => faq.id === editingId ? editForm : faq);
    setFaqs(updated);
    setEditingId(null);
    setEditForm({});
  };

  const deleteFaq = (id) => {
    if (window.confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      const updated = faqs.filter(faq => faq.id !== id);
      setFaqs(updated);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">SSS Düzenle</h2>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Yeni Soru Ekle</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Soru" value={newFaq.question} onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })} className="p-2 border rounded" />
            <select value={newFaq.category} onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })} className="p-2 border rounded">
              <option value="">Kategori Seç</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <textarea placeholder="Cevap" value={newFaq.answer} onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })} className="w-full p-2 border rounded" rows="3" />
          <button onClick={addFaq} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 flex items-center justify-center space-x-2">
            <FiPlus /> <span>Soru Ekle</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border rounded-lg p-4">
            {editingId === faq.id ? (
              <div>
                <input type="text" value={editForm.question} onChange={(e) => setEditForm({ ...editForm, question: e.target.value })} className="w-full p-2 border rounded mb-2" />
                <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full p-2 border rounded mb-2">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <textarea value={editForm.answer} onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })} className="w-full p-2 border rounded mb-2" rows="3" />
                <div className="flex justify-end space-x-2">
                  <button onClick={cancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">İptal</button>
                  <button onClick={saveEdit} className="bg-blue-500 text-white px-3 py-1 rounded">Kaydet</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{faq.question}</h4>
                  <p className="text-sm text-gray-500 mt-1">{faq.answer}</p>
                  <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-0.5 rounded">{faq.category}</span>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button onClick={() => startEdit(faq)} className="text-blue-500"><FiEdit2 /></button>
                  <button onClick={() => deleteFaq(faq.id)} className="text-red-500"><FiTrash2 /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button onClick={handleSave} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        <FiSave className="inline mr-2" /> Tüm Değişiklikleri Kaydet
      </button>
      {saved && <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">✓ Kaydedildi!</div>}
    </div>
  );
};

export default AdminFAQ;