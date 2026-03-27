import React, { useState } from 'react';
import { FiSave, FiTrash2, FiPlus, FiEdit2, FiX } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ReactMarkdown from 'react-markdown';

const AdminBlog = () => {
  const [posts, setPosts] = useLocalStorage('blogPosts', []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const categories = ['Teknoloji', 'Yazılım', 'Kişisel Gelişim', 'Kariyer', 'Hobiler'];

  const addPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      setPosts([...posts, { 
        ...newPost, 
        id: newId,
        tags: newPost.tags.split(',').map(t => t.trim()),
        date: new Date().toISOString()
      }]);
      setNewPost({
        title: '',
        content: '',
        category: '',
        tags: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditForm({ ...post, tags: post.tags.join(', ') });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const updated = posts.map(post =>
      post.id === editingId ? { 
        ...editForm, 
        tags: editForm.tags.split(',').map(t => t.trim()),
        updatedAt: new Date().toISOString()
      } : post
    );
    setPosts(updated);
    setEditingId(null);
    setEditForm({});
  };

  const deletePost = (id) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      const updated = posts.filter(post => post.id !== id);
      setPosts(updated);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Blog Yazıları Düzenle</h2>
      
      {/* Yeni Yazı Ekleme */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Yeni Yazı Ekle</h3>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Başlık *"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <select
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            >
              <option value="">Kategori Seç</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Etiketler (virgülle ayırın)"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setPreview(!preview)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {preview ? 'Editör Modu' : 'Önizleme'}
            </button>
          </div>
          
          {!preview ? (
            <textarea
              placeholder="İçerik (Markdown destekli) *"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              rows="8"
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none p-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
              <ReactMarkdown>{newPost.content}</ReactMarkdown>
            </div>
          )}
          
          <button
            onClick={addPost}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition flex items-center justify-center space-x-2"
          >
            <FiPlus />
            <span>Yazı Ekle</span>
          </button>
        </div>
      </div>
      
      {/* Mevcut Yazılar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Mevcut Yazılar ({posts.length})</h3>
        
        {posts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Henüz yazı eklenmemiş.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              {editingId === post.id ? (
                <div>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full p-2 border border-blue-400 rounded mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editForm.tags}
                      onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                      className="p-2 border border-blue-400 rounded"
                    />
                  </div>
                  <textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="w-full p-2 border border-blue-400 rounded mb-2"
                    rows="5"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={cancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">İptal</button>
                    <button onClick={saveEdit} className="bg-blue-500 text-white px-3 py-1 rounded">Kaydet</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{post.title}</h4>
                      <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('tr-TR')}</p>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs mt-1">
                        {post.category}
                      </span>
                      <div className="flex gap-1 mt-1">
                        {post.tags?.map((tag, i) => (
                          <span key={i} className="text-xs text-gray-500">#{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => startEdit(post)} className="text-blue-500 hover:text-blue-600">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-600">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <button onClick={handleSave} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        <FiSave className="inline mr-2" />
        Tüm Değişiklikleri Kaydet
      </button>
      
      {saved && <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">✓ Kaydedildi!</div>}
    </div>
  );
};

export default AdminBlog;