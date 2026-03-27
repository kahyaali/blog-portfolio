import React, { useState } from 'react';
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiMessageSquare,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram
} from 'react-icons/fi';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Contact = () => {
  const [contactInfo] = useLocalStorage('contactInfo', {
    phone: '+90 546 687 39 90',
    email: 'ali.kahya@outlook.com',
    address: 'İstanbul, Türkiye'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.'
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  const contactMethods = [
    {
      icon: FiPhone,
      title: 'Telefon',
      info: contactInfo.phone,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      action: `tel:${contactInfo.phone}`,
      actionText: 'Hemen Ara'
    },
    {
      icon: FiMail,
      title: 'E-posta',
      info: contactInfo.email,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      action: `mailto:${contactInfo.email}`,
      actionText: 'E-posta Gönder'
    },
    {
      icon: FiMapPin,
      title: 'Adres',
      info: contactInfo.address,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      action: 'https://maps.google.com',
      actionText: 'Haritada Gör'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: FiGithub, url: 'https://github.com/kahyaali', color: 'hover:bg-gray-800', bgColor: 'bg-gray-100' },
    { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/ali-k-843743114', color: 'hover:bg-blue-700', bgColor: 'bg-blue-100' },
    { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com', color: 'hover:bg-blue-400', bgColor: 'bg-blue-100' },
    { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com', color: 'hover:bg-pink-600', bgColor: 'bg-pink-100' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">İletişime Geçin</h1>
        <p className="text-lg text-blue-100 max-w-2xl">
          Projeleriniz, iş birlikleri veya herhangi bir konuda benimle iletişime geçmekten çekinmeyin. 
          Size en kısa sürede dönüş yapacağım.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* İletişim Kartları */}
        <div className="lg:col-span-1 space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${method.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.info}</p>
                    <a
                      href={method.action}
                      target={method.title === 'Adres' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1 text-sm font-medium bg-gradient-to-r ${method.gradient} bg-clip-text text-transparent hover:opacity-80`}
                    >
                      <span>{method.actionText}</span>
                      <FiSend size={12} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* İletişim Formu */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Mesaj Gönder</h2>
              <p className="text-blue-100 text-sm">Size nasıl yardımcı olabilirim?</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    <FiUser className="inline mr-1" /> Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Adınızı giriniz"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    <FiMail className="inline mr-1" /> E-posta Adresiniz *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Mail adresinizi giriniz"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <FiMessageSquare className="inline mr-1" /> Konu *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Proje teklifi, iş birliği, soru..."
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Mesajınız *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center space-x-2 group"
              >
                <FiSend className="group-hover:translate-x-1 transition-transform" />
                <span>Mesaj Gönder</span>
              </button>
              
              {formStatus.submitted && (
                <div className={`p-4 rounded-lg flex items-start space-x-3 animate-slide-up ${
                  formStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  {formStatus.success ? (
                    <FiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  ) : (
                    <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${formStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                      {formStatus.success ? 'Başarılı!' : 'Hata!'}
                    </p>
                    <p className={`text-sm ${formStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                      {formStatus.message}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Harita Bölümü */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
          <h3 className="text-white font-semibold">Konum</h3>
          <p className="text-gray-300 text-sm">Beni haritada bulun</p>
        </div>
        <div className="h-96 bg-gray-200 relative">
          <iframe
            title="Konum"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.38540126955!2d28.8723272216797!3d41.00550000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1cfe4a94d1f3c75!2zxLBzdGFuYnVsLCBUw7xya2l5ZQ!5e0!3m2!1str!2s!4v1700000000000!5m2!1str!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-lg shadow-lg p-3 pointer-events-auto">
              <FiMapPin className="text-red-500 text-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Sosyal Medya Bağlantıları */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Sosyal Medyada Takip Edin</h3>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${social.bgColor} rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all hover:scale-110 hover:text-white`}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;