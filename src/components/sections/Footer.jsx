import React from 'react';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import LogoLandscape from '../../assets/WhiteJavatech.png';

const Footer = () => {
  const contactInfo = {
    email: 'javatech.develop@gmail.com',
    whatsapp: '082234571831',
    location: 'Purwokerto, Jawa Tengah'
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content - Logo & Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12 pb-12 border-b border-gray-800">
          
          {/* Logo & Description */}
          <div className="lg:w-2/5">
            <div className="flex flex-col items-start space-y-6">
              {/* Logo - Diperbesar */}
              <img 
                src={LogoLandscape} 
                alt="Javatech" 
                className="h-16 w-auto mb-2"  // Diperbesar dari h-10 menjadi h-16
              />
              
              <p className="text-gray-400 text-base leading-relaxed max-w-md">
                Perusahaan teknologi terdepan dalam penyedia solusi software dan hardware IoT 
                untuk transformasi digital bisnis di Indonesia.
              </p>
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-white mb-5 text-base uppercase tracking-wider">Navigasi</h3>
                <div className="space-y-3">
                  {['Tentang Kami', 'Layanan', 'Proyek', 'Kontak'].map((item, index) => {
                    const sectionIds = ['about', 'services', 'projects', 'contact'];
                    return (
                      <button
                        key={index}
                        onClick={() => scrollToSection(sectionIds[index])}
                        className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors text-sm group w-full text-left"
                      >
                        <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-white mb-5 text-base uppercase tracking-wider">Layanan</h3>
                <div className="space-y-3">
                  {['Web Development', 'Mobile Apps', 'AI/ML Solutions', 'IoT Development'].map((service) => (
                    <button
                      key={service}
                      onClick={() => scrollToSection('services')}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm block w-full text-left hover:translate-x-1 transition-transform"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-white mb-5 text-base uppercase tracking-wider">Kontak</h3>
                <div className="space-y-4">
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm group"
                  >
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    <span className="flex-1 break-words">{contactInfo.email}</span>
                  </a>
                  
                  <a 
                    href={`https://wa.me/62${contactInfo.whatsapp.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm group"
                  >
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                    <span className="flex-1">{contactInfo.whatsapp}</span>
                  </a>
                  
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500" />
                    <span className="flex-1">{contactInfo.location}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-8">
          
          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Javatech. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Transforming ideas into digital reality
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-700">|</span>
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
            >
              Get Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;