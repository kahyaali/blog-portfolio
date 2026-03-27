import React, { useState } from 'react';
import { FiSave, FiTrash2, FiCheck, FiX, FiMessageSquare } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const AdminComments = () => {
  const [allComments, setAllComments] = useLocalStorage('allComments', []);
  const [saved, setSaved] = useState(false);

  const deleteComment = (id) => {
    if (window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      setAllComments(allComments.filter(c => c.id !== id));
    }
  };

  const toggleApprove = (id) => {
    setAllComments(allComments.map(c => 
      c.id === id ? { ...c, approved: !c.approved } : c
    ));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-[var(--bg)] rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[var(--text-h)] mb-4">Yorumlar Düzenle</h2>
      
      <div className="space-y-4">
        {allComments.length === 0 ? (
          <div className="text-center py-8">
            <FiMessageSquare className="text-4xl text-[var(--text)] mx-auto mb-2 opacity-50" />
            <p className="text-[var(--text)]">Henüz yorum yapılmamış.</p>
          </div>
        ) : (
          allComments.map(comment => (
            <div key={comment.id} className="border border-[var(--border)] rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold text-[var(--text-h)]">{comment.name}</span>
                  <span className="text-xs text-[var(--text)] ml-2">
                    {new Date(comment.date).toLocaleDateString('tr-TR')}
                  </span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded ${comment.approved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {comment.approved ? 'Onaylı' : 'Onay Bekliyor'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => toggleApprove(comment.id)} className="text-green-500 hover:text-green-600">
                    <FiCheck size={18} />
                  </button>
                  <button onClick={() => deleteComment(comment.id)} className="text-red-500 hover:text-red-600">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[var(--text)] text-sm">{comment.content}</p>
              <p className="text-xs text-[var(--text)]/60 mt-2">Post ID: {comment.postId}</p>
            </div>
          ))
        )}
      </div>
      
      <button onClick={handleSave} className="mt-6 bg-[var(--accent)] text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
        <FiSave className="inline mr-2" /> Tüm Değişiklikleri Kaydet
      </button>
      
      {saved && <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">✓ Kaydedildi!</div>}
    </div>
  );
};

export default AdminComments;