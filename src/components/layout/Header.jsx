import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkle, Home, Settings, Rocket, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoLandscape from '../../assets/Logo_Landscape.png';
import LogoOnly from '../../assets/Logo_only.png';
import FreePalestine from '../../assets/FreePalestine.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.replace('#', ''));
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };


  // Navigation dengan Aksara Jawa dan English label
  const navigation = [
    {
      javanese: 'ꦲꦺꦴꦩ꧀ꦲꦺ', // Home
      label: 'Home',
      href: '#home',
      icon: <Home className="w-7 h-7" />
    },
    {
      javanese: 'ꦭꦔꦤꦤ꧀', // Services
      label: 'Services',
      href: '#services',
      icon: <Settings className="w-7 h-7" />
    },
    {
      javanese: 'ꦥꦿꦺꦴꦪꦼꦏ꧀', // Projects
      label: 'Projects',
      href: '#projects',
      icon: <Rocket className="w-7 h-7" />
    },
    {
      javanese: 'ꦏꦺꦴꦤ꧀ꦠꦏ꧀', // Contact
      label: 'Contact',
      href: '#contact',
      icon: <User className="w-7 h-7" />
    },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/40 shadow-2xl shadow-gold-900/10'
          : 'bg-gradient-to-b from-gray-900 via-gray-900/90 to-transparent'
        }`}
    >
      <div style={{ height: '15px' }} />
      <div className="h-0.1" />

      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo Section */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button
                onClick={() => scrollToSection('#home')}
                className="flex items-center group"
              >
                <div className="relative">
                  {/* Floating particles */}
                  <motion.div
                    className="absolute -inset-3 bg-gradient-to-t from-white/80 via-white/30 to-transparent rounded-full blur-sm"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Logo dengan pulse effect */}
                  <motion.div
                    className="absolute -inset-2 border-2 border-gold-500/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                    }}
                  />

                  {/* Logo utama */}
                  <img
                    src={LogoLandscape}
                    alt="Javatech"
                    className="h-10 w-auto hidden lg:block relative transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <img
                    src={LogoOnly}
                    alt="Javatech"
                    className="h-10 w-auto lg:hidden relative transform transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Animated dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        '0 0 0px rgba(245, 158, 11, 0)',
                        '0 0 10px rgba(245, 158, 11, 0.8)',
                        '0 0 0px rgba(245, 158, 11, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </button>
            </motion.div>

            {/* Desktop Navigation - New Layout: Icon + Text beside */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setActiveHover(item.label)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="relative px-6 py-3 flex items-center gap-3 group min-w-[140px]"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-500/0 to-yellow-500/0"
                      animate={{
                        background: activeHover === item.label
                          ? [
                            'linear-gradient(135deg, rgba(180, 135, 50, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                            'linear-gradient(135deg, rgba(180, 135, 50, 0.15) 0%, rgba(212, 175, 55, 0.15) 100%)',
                            'linear-gradient(135deg, rgba(180, 135, 50, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                          ]
                          : 'linear-gradient(135deg, rgba(180, 135, 50, 0) 0%, rgba(212, 175, 55, 0) 100%)',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon - Bigger */}
                    <motion.div
                      className="text-gray-400 group-hover:text-gold-400 transition-colors relative"
                      animate={{
                        scale: activeHover === item.label ? 1.15 : 1,
                        rotate: activeHover === item.label ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}

                      {/* Icon glow effect */}
                      {activeHover === item.label && (
                        <motion.div
                          className="absolute inset-0 bg-gold-400/20 blur-md -z-10 rounded-full"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 0.5 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>

                    {/* Text Container - Aligned beside icon */}
                    <div className="flex flex-col items-start">
                      {/* Aksara Jawa dengan warna emas tua */}
                      <span className="text-xl font-bold text-gold-600 group-hover:text-gold-400 transition-colors duration-300 font-noto-javanese leading-tight">
                        {item.javanese}
                      </span>

                      {/* English Label - Smaller, aligned left with Javanese text */}
                      <span className="text-xs text-gray-400 group-hover:text-gold-300 transition-colors mt-0.5 leading-tight">
                        {item.label}
                      </span>
                    </div>

                    {/* Animated chevron - positioned at right */}
                    <motion.div
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0"
                      animate={{
                        opacity: activeHover === item.label ? 1 : 0,
                        x: activeHover === item.label ? 0 : -5,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-gold-400" />
                    </motion.div>

                    {/* Bottom line animation */}
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-gold-400 to-yellow-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeHover === item.label ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Sparkle effect on hover */}
                    {activeHover === item.label && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: [0, 1, 1, 0], rotate: 360 }}
                        transition={{ duration: 1 }}
                      >
                        <Sparkle className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Right Section - Free Palestine Banner */}
            <div className="flex items-center space-x-4">
              {/* Free Palestine Banner */}
              <motion.div
                className="hidden md:flex items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-green-900/20 to-black/20 backdrop-blur-sm border border-green-700/30 cursor-pointer group overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -3, 0],
                    transition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-black/5"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <div className="flex items-center gap-3 relative z-10">
                    {/* Palestine Flag */}
                    <motion.img
                      src={FreePalestine}
                      alt="Free Palestine"
                      className="h-12 w-auto"
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Text */}
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-red-400">
                        FREE PALESTINE
                      </span>
                      <span className="text-xs text-green-500/70">
                        #StopGenocide
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interactive Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 relative overflow-hidden group"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-yellow-500/10"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Icon */}
                <div className="relative z-10">
                  {isMenuOpen ? (
                    <motion.div
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-6 h-6 text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-6 h-6 text-gray-300" />
                    </motion.div>
                  )}
                </div>

                {/* Circular animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-xl"
                  animate={{
                    borderColor: [
                      'rgba(212, 175, 55, 0)',
                      'rgba(212, 175, 55, 0.5)',
                      'rgba(212, 175, 55, 0)',
                    ],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Interactive Mobile Navigation - Updated Layout too */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="lg:hidden overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800/40"
            >
              <div className="pt-6 pb-8 px-6">
                {/* Navigation Items - Updated layout for mobile too */}
                <div className="space-y-3">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => {
                        scrollToSection(item.href);
                        setIsMenuOpen(false);
                      }}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between w-full px-5 py-4 rounded-xl bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 group hover:border-gold-500/30 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Hover background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gold-500/0 to-yellow-500/0"
                        whileHover={{
                          background: 'linear-gradient(90deg, rgba(180, 135, 50, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)'
                        }}
                      />

                      <div className="flex items-center gap-4 relative z-10 w-full">
                        {/* Icon - Bigger for mobile too */}
                        <motion.div
                          className="text-gray-400 group-hover:text-gold-400 transition-colors flex-shrink-0"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {item.icon}
                        </motion.div>

                        {/* Text Container - Aligned beside icon */}
                        <div className="flex flex-col items-start flex-grow">
                          {/* Aksara Jawa dengan warna emas */}
                          <div className="text-xl font-bold text-gold-600 group-hover:text-gold-400 transition-colors font-noto-javanese leading-tight">
                            {item.javanese}
                          </div>
                          <div className="text-xs text-gray-400 group-hover:text-gold-300 transition-colors mt-0.5 leading-tight text-left">
                            {item.label}
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10 flex-shrink-0"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-gold-400" />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>

                {/* Free Palestine untuk mobile */}
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-900/30 to-black/30 border border-green-700/30 backdrop-blur-sm relative overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-black/5"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <div className="flex items-center justify-center gap-4 relative z-10">
                    <motion.img
                      src={FreePalestine}
                      alt="Free Palestine"
                      className="h-12 w-auto"
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-300">
                        FREE PALESTINE
                      </div>
                      <div className="text-xs text-green-400/70 mt-1">
                        Stand with Humanity
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Footer Section */}
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-800/40"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full"
                    />
                    <span className="text-sm font-medium tracking-wider text-gray-400">
                      JAVATECH DIGITAL
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-gold-500 rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      

      {/* CSS untuk font Javanese dan warna emas */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Javanese:wght@400;700&display=swap');
        
        .font-noto-javanese {
          font-family: 'Noto Serif Javanese', serif;
          font-weight: 700;
        }
        
        /* Warna emas custom dengan Tailwind-like classes */
        .text-gold-300 { color: #f6e05e; }
        .text-gold-400 { color: #ecc94b; }
        .text-gold-500 { color: #d69e2e; }
        .text-gold-600 { color: #b7791f; }
        .text-gold-700 { color: #975a16; }
        
        .border-gold-500 { border-color: #d69e2e; }
        .border-gold-500\\/20 { border-color: rgba(214, 158, 46, 0.2); }
        .border-gold-500\\/30 { border-color: rgba(214, 158, 46, 0.3); }
        
        .from-gold-300 { --tw-gradient-from: #f6e05e; }
        .via-gold-500 { --tw-gradient-via: #d69e2e; }
        .to-gold-700 { --tw-gradient-to: #975a16; }
        
        .from-gold-500 { --tw-gradient-from: #d69e2e; }
        .to-yellow-500 { --tw-gradient-to: #ecc94b; }
        
        .bg-gold-500 { background-color: #d69e2e; }
        .bg-gold-500\\/10 { background-color: rgba(214, 158, 46, 0.1); }
        .bg-gold-500\\/20 { background-color: rgba(214, 158, 46, 0.2); }
        .bg-gold-400\\/20 { background-color: rgba(236, 201, 75, 0.2); }
        
        .shadow-gold-900\\/10 { box-shadow: 0 25px 50px -12px rgba(119, 87, 22, 0.1); }
        
        .hover\\:text-gold-300:hover { color: #f6e05e; }
        .hover\\:text-gold-400:hover { color: #ecc94b; }
        .hover\\:border-gold-500\\/30:hover { border-color: rgba(214, 158, 46, 0.3); }
        
        /* Leading untuk text alignment */
        .leading-tight { line-height: 1.25; }
      `}</style>
    </motion.header>
  );
};

export default Header;