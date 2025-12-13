import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, 
  MessageSquare, Clock, ExternalLink,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  // Contact Information
  const contactInfo = {
    email: 'javatech.develop@gmail.com',
    whatsapp: '082234571831',
    location: 'Purwokerto, Jawa Tengah',
    coordinates: '-7.419167, 109.220556',
    mapUrl: 'https://www.google.com/maps?q=-7.419167,109.220556&z=15&output=embed',
    gmailUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=javatech.develop@gmail.com'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fungsi untuk membuka Gmail di browser dengan komposisi email
  const openGmailCompose = (subject = '', body = '') => {
    let gmailUrl = contactInfo.gmailUrl;
    
    // Tambahkan subject dan body jika ada
    if (subject || body) {
      gmailUrl += `&su=${encodeURIComponent(subject)}`;
      if (body) {
        gmailUrl += `&body=${encodeURIComponent(body)}`;
      }
    }
    
    // Buka Gmail di tab baru
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    return true;
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailStatus(null);
    
    const subject = `Kontak dari ${formData.name || 'Website Visitor'}`;
    const body = `Halo JavaTech,

Nama: ${formData.name}
Email: ${formData.email}

Pesan:
${formData.message}

---
Pesan ini dikirim melalui website Javatech`;

    try {
      // Buka Gmail di browser
      const success = openGmailCompose(subject, body);
      
      if (success) {
        setEmailStatus({
          type: 'success',
          message: 'Membuka Gmail di browser...',
          details: 'Jika tidak terbuka otomatis, pastikan Anda login ke Gmail'
        });
        
        // Reset form setelah delay
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      setEmailStatus({
        type: 'error',
        message: 'Gagal membuka Gmail',
        details: 'Silakan akses Gmail secara manual dan kirim ke: javatech.develop@gmail.com'
      });
      setIsSubmitting(false);
    }
  };

  const handleDirectGmail = () => {
    // Buka Gmail compose kosong
    window.open(contactInfo.gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email)
      .then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
      })
      .catch(() => {
        // Fallback untuk browser lama
        const textArea = document.createElement('textarea');
        textArea.value = contactInfo.email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
      });
  };

  const handleWhatsAppClick = () => {
    const message = `Halo JavaTech, saya tertarik untuk berkonsultasi mengenai proyek teknologi.`;
    const whatsappNumber = contactInfo.whatsapp.startsWith('0') 
      ? `62${contactInfo.whatsapp.substring(1)}` 
      : contactInfo.whatsapp;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleWhatsAppForm = () => {
    const message = `Halo Javatech,

Nama: ${formData.name || '-'}
Email: ${formData.email || '-'}

Pesan:
${formData.message || 'Saya tertarik berkonsultasi'}`;
    
    const whatsappNumber = contactInfo.whatsapp.startsWith('0') 
      ? `62${contactInfo.whatsapp.substring(1)}` 
      : contactInfo.whatsapp;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 bg-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-cyan-950" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-4">
              <div className="w-12 h-px bg-cyan-400/30" />
              <span>HUBUNGI KAMI</span>
              <div className="w-12 h-px bg-cyan-400/30" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Hubungi <span className="text-cyan-300 font-normal">JavaTech</span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Email: {contactInfo.email} | WhatsApp: {contactInfo.whatsapp}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Direct Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Gmail Button - DIRECT */}
            <button
              onClick={handleDirectGmail}
              className="w-full group relative overflow-hidden"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 hover:border-red-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">JavaTech Mail</div>
                      <div className="text-red-300 text-sm"></div>
                      <div className="text-gray-400 text-xs mt-1">javatech.develop@gmail.com</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-red-300 transition-colors" />
                </div>
              </div>
            </button>

            {/* WhatsApp Button - DIRECT */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full group relative overflow-hidden"
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">JavaTech WhatsApp</div>
                      <div className="text-emerald-300 text-sm"></div>
                      <div className="text-gray-400 text-xs mt-1">{contactInfo.whatsapp}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-300 transition-colors" />
                </div>
              </div>
            </button>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Lokasi</div>
                    <div className="text-gray-300 text-sm">{contactInfo.location}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Response Time</div>
                    <div className="text-gray-300 text-sm">24 Hours</div>
                    <div className="text-gray-500 text-xs">Fullweeks, anytime anywhere</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/30 h-full">

              
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Nama Anda *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/30 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Email Anda *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/30 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      placeholder="email@anda.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Pesan / Detail Proyek *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/30 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
                    placeholder="Deskripsikan proyek atau kebutuhan Anda..."
                  />
                </div>

                {/* Status Message */}
                {emailStatus && (
                  <div className={`p-4 rounded-lg border ${
                    emailStatus.type === 'success' 
                      ? 'bg-green-900/20 border-green-500/30 text-green-300' 
                      : 'bg-red-900/20 border-red-500/30 text-red-300'
                  }`}>
                    <div className="flex items-start gap-3">
                      {emailStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium">{emailStatus.message}</div>
                        <div className="text-sm mt-1 opacity-90">{emailStatus.details}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border border-red-500/30 text-red-300 py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Membuka Gmail</span>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-300"></div>
                      </>
                    ) : (
                      <>
                        <span>Send via Gmail</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppForm}
                    disabled={!formData.name && !formData.message}
                    className="flex-1 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 border border-emerald-500/30 text-emerald-300 py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send via WhatsApp
                    <Phone className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center text-gray-500 text-sm space-y-2 p-4 bg-gray-900/20 rounded-lg">
                  <p className="text-red-300 font-medium">
                    {contactInfo.email}
                  </p>
                  <p>
                  </p>
                  <p className="text-xs text-gray-400">
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-light text-white mb-2">Lokasi Kantor</h3>
              <p className="text-gray-400">
                Purwokerto, Jawa Tengah • 7°25'09.0"S 109°13'14.0"E
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${contactInfo.coordinates}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-cyan-200 text-sm flex items-center gap-2"
            >
              Buka di Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Map Container */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/30 overflow-hidden">
            <div className="h-64 relative">
              <iframe
                src={contactInfo.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JavaTech Office Location"
                className="absolute inset-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Manual Email Option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 border-t border-gray-800/30"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;