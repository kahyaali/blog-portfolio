import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser, FiMessageCircle, FiSmile } from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNotification } from '../../contexts/NotificationContext';

const Chat = () => {
  const [messages, setMessages] = useLocalStorage('chatMessages', []);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useLocalStorage('chatUsername', '');
  const [isUsernameSet, setIsUsernameSet] = useState(!!username);
  const messagesEndRef = useRef(null);
  const { showSuccess } = useNotification();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      username: username,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
    showSuccess('Mesaj gönderildi!');
  };

  const setUser = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
      showSuccess('Hoş geldiniz!');
    }
  };

  if (!isUsernameSet) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-[var(--bg)] rounded-xl shadow-md p-8 max-w-md w-full border border-[var(--border)]">
          <div className="text-center mb-6">
            <FiMessageCircle className="text-4xl text-[var(--accent)] mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-[var(--text-h)]">Sohbete Katılın</h2>
            <p className="text-[var(--text)] text-sm">Bir kullanıcı adı belirleyin</p>
          </div>
          
          {/* Kullanıcı Adı Input - Basit çözüm */}
          <div className="mb-4">
            <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--bg)] focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition">
              <div className="px-3">
                <FiUser className="text-[var(--text)]" size={18} />
              </div>
              <input
                type="text"
                placeholder="Kullanıcı adınız"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setUser()}
                className="w-full py-2 pr-3 bg-transparent text-[var(--text-h)] placeholder:text-[var(--text)] focus:outline-none"
              />
            </div>
          </div>
          
          <button
            onClick={setUser}
            className="w-full bg-[var(--accent)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Sohbete Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <FiMessageCircle className="text-2xl" />
          <div>
            <h1 className="text-xl font-bold">Canlı Sohbet</h1>
            <p className="text-white/80 text-sm">Hoş geldin {username}!</p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg)] rounded-xl shadow-md border border-[var(--border)] flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-[var(--text)] py-8">
              <FiSmile className="text-4xl mx-auto mb-2 opacity-50" />
              <p>Henüz mesaj yok. İlk mesajı sen gönder!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${msg.isOwn ? 'bg-[var(--accent)] text-white' : 'bg-[var(--accent-bg)] text-[var(--text-h)]'}`}>
                  <p className="text-xs opacity-70 mb-1">{msg.username}</p>
                  <p className="text-sm break-words">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Mesaj Gönderme Alanı */}
        <div className="border-t border-[var(--border)] p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Mesajınızı yazın..."
              className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)] placeholder:text-[var(--text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition flex items-center justify-center"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;