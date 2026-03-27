import React, { useState } from 'react';
import { FiMessageSquare, FiUser, FiMail, FiSend, FiTrash2, FiCheck } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNotification } from '../../contexts/NotificationContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useLocalStorage(`comments_${postId}`, []);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const { showSuccess } = useNotification();

  const addComment = () => {
    if (!newComment.name.trim() || !newComment.content.trim()) {
      alert('İsim ve yorum alanı zorunludur!');
      return;
    }

    const comment = {
      id: Date.now(),
      ...newComment,
      date: new Date().toISOString(),
      approved: true
    };

    setComments([comment, ...comments]);
    setNewComment({ name: '', email: '', content: '' });
    showSuccess('Yorumunuz eklendi!');
  };

  const deleteComment = (id) => {
    if (window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      const updated = comments.filter(c => c.id !== id);
      setComments(updated);
      showSuccess('Yorum silindi!');
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-[var(--border)]">
      <h3 className="text-xl font-bold text-[var(--text-h)] mb-4 flex items-center space-x-2">
        <FiMessageSquare />
        <span>Yorumlar ({comments.length})</span>
      </h3>

      {/* Yorum Ekleme Formu */}
      <div className="bg-[var(--bg)] rounded-xl p-6 border border-[var(--border)] mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]" size={16} />
            <input
              type="text"
              placeholder="Adınız *"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]" size={16} />
            <input
              type="email"
              placeholder="E-posta (isteğe bağlı)"
              value={newComment.email}
              onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)]"
            />
          </div>
        </div>
        <textarea
          placeholder="Yorumunuz *"
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          rows="3"
          className="w-full p-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] mb-3"
        />
        <button
          onClick={addComment}
          className="flex items-center space-x-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
        >
          <FiSend />
          <span>Yorum Gönder</span>
        </button>
      </div>

      {/* Yorum Listesi */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-[var(--text)] py-8">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-[var(--bg)] rounded-xl p-4 border border-[var(--border)]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold text-[var(--text-h)]">{comment.name}</span>
                  <span className="text-xs text-[var(--text)] ml-2">
                    {new Date(comment.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <button onClick={() => deleteComment(comment.id)} className="text-red-500 hover:text-red-600">
                  <FiTrash2 size={16} />
                </button>
              </div>
              <p className="text-[var(--text)]">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;