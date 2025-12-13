import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkle, Home, Settings, Rocket, Mail } from 'lucide-react';
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

  const navigation = [
    { name: 'Home', href: '#home', icon: <Home className="w-7 h-7" /> },
    { name: 'Services', href: '#services', icon: <Settings className="w-7 h-7" /> },
    { name: 'Projects', href: '#projects', icon: <Rocket className="w-7 h-7" /> },
    { name: 'Contact', href: '#contact', icon: <Mail className="w-7 h-7" /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 pb-2 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/40 shadow-2xl shadow-purple-900/10'
          : 'bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-transparent pb-4'
      }`}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative">
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-2">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo dengan frame putih */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a href="#home" className="flex items-center group">
                <div className="relative">
                  {/* Frame putih di belakang logo */}
                  {/* <div className="absolute -inset-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20" /> */}
                  
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
                    className="absolute -inset-2 border-2 border-purple-500/20 rounded-full"
                    animate={{
                      scale: [1, 1, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                    }}
                  />
                  
                  {/* Logo utama - Diperbesar */}
                  <img
                    src={LogoLandscape}
                    alt="Javatech"
                    className="h-12 w-auto hidden lg:block relative transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <img
                    src={LogoOnly}
                    alt="Javatech"
                    className="h-12 w-auto lg:hidden relative transform transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Animated dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      boxShadow: [
                        '0 0 0px rgba(192, 132, 252, 0)',
                        '0 0 10px rgba(192, 132, 252, 0.8)',
                        '0 0 0px rgba(192, 132, 252, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </a>
            </motion.div>

            {/* Interactive Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setActiveHover(item.name)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  <a
                    href={item.href}
                    className="relative px-5 py-3 flex items-center gap-3 group"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-blue-500/0"
                      animate={{
                        background: activeHover === item.name
                          ? [
                              'linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                              'linear-gradient(90deg, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                              'linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                            ]
                          : 'linear-gradient(90deg, rgba(147, 51, 234, 0) 0%, rgba(59, 130, 246, 0) 100%)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Icon dengan SVG Lucide - warna disesuaikan */}
                    <motion.div
                      className="text-gray-400 group-hover:text-purple-400 transition-colors"
                      animate={{
                        scale: activeHover === item.name ? 1.2 : 1,
                        rotate: activeHover === item.name ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    {/* Text dengan gradient */}
                    <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300 relative">
                      {item.name}
                    </span>
                    
                    {/* Animated chevron */}
                    <motion.div
                      className="opacity-0 -translate-x-2"
                      animate={{
                        opacity: activeHover === item.name ? 1 : 0,
                        x: activeHover === item.name ? 0 : -8,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    
                    {/* Bottom line animation */}
                    <motion.div
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeHover === item.name ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Sparkle effect on hover */}
                    {activeHover === item.name && (
                      <motion.div
                        className="absolute -top-2 -right-2"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: [0, 1, 1, 0], rotate: 360 }}
                        transition={{ duration: 1 }}
                      >
                        <Sparkle className="w-3 h-3 text-yellow-400" />
                      </motion.div>
                    )}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Free Palestine Banner dengan Animasi */}
            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-900/20 to-black-900/20 backdrop-blur-sm border border-blue-700/30 cursor-pointer group"
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
                <div className="flex items-center gap-3">
                  {/* Palestine Flag Image */}
                  <motion.img
                    src={FreePalestine}
                    alt="Free Palestine"
                    className="h-8 w-auto"
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
                    <span className="text-sm font-bold text-blue-300">
                      FREE PALESTINE
                    </span>
                    <span className="text-xs text-purple-400/70">
                      #StopGenocide
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Interactive Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 relative overflow-hidden group"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              
              {/* Icon dengan animation */}
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
                    'rgba(147, 51, 234, 0)',
                    'rgba(147, 51, 234, 0.5)',
                    'rgba(147, 51, 234, 0)',
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
        </nav>

        {/* Interactive Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 px-6">
                <motion.div
                  className="mb-4 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <span className="font-medium">Navigation Menu</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkle className="w-3 h-3 text-purple-400" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/20 group hover:border-purple-500/30 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="text-gray-400 group-hover:text-purple-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <span className="text-gray-300 font-medium block">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Click to navigate
                          </span>
                        </div>
                      </div>
                      
                      <motion.div
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        whileHover={{ scale: 1.2 }}
                      >
                        <ChevronRight className="w-5 h-5 text-purple-400" />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
                
                {/* Free Palestine untuk mobile */}
                <motion.div
                  className="mt-4 p-4 rounded-lg bg-gradient-to-r from-green-900/20 to-black-900/20 border border-green-700/30"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <motion.img
                      src={FreePalestine}
                      alt="Free Palestine"
                      className="h-10 w-auto"
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
                
                {/* Animated divider */}
                <motion.div
                  className="mt-6 pt-4 border-t border-gray-800/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-3 text-gray-500">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                    <span className="text-sm font-medium tracking-wider">
                      JAVATECH DIGITAL
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacing area */}
        <div className={`absolute bottom-0 left-0 right-0 h-2 transition-all duration-500 ${
          isScrolled
            ? 'opacity-0'
            : 'opacity-100 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent'
        }`} />
      </div>
    </motion.header>
  );
};

export default Header;