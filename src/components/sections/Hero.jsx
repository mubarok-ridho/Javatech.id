// src/components/SuperHero.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Zap } from 'lucide-react';

const SuperHero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 2; // Size 2-4px
        this.speedX = (Math.random() * 0.4 - 0.2) * 0.6; // Lebih lambat
        this.speedY = (Math.random() * 0.4 - 0.2) * 0.6;
        this.opacity = Math.random() * 0.15 + 0.08; // Lebih transparan

        // Warna putih dengan variasi sangat subtle untuk soft glow
        const brightness = 255;
        const blueTint = Math.random() * 20; // Sedikit blue tint
        this.color = `rgba(${brightness}, ${brightness}, ${brightness + blueTint}, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce dari tepi dengan damping
        if (this.x > canvas.width) {
          this.x = canvas.width;
          this.speedX *= -0.8; // Damping effect
        } else if (this.x < 0) {
          this.x = 0;
          this.speedX *= -0.8;
        }

        if (this.y > canvas.height) {
          this.y = canvas.height;
          this.speedY *= -0.8;
        } else if (this.y < 0) {
          this.y = 0;
          this.speedY *= -0.8;
        }
      }

      draw() {
        // Buat radial gradient untuk efek blur di samping
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2 // Double size untuk blur area
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core yang lebih solid (optional, untuk efek lebih soft bisa dihapus)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Clear dengan opacity rendah untuk efek trail yang sangat soft
      ctx.fillStyle = 'rgba(15, 23, 42, 0.06)'; // Match dengan dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // DATA UNTUK DARK MODE
  const features = [
    {
      icon: '✨',
      title: 'Build with AI integration',
      description: 'Bebas merancang kebutuhan ai bisnis anda',
      gradient: 'from-purple-400 to-pink-400',
      bg: 'bg-gradient-to-br from-purple-900/30 to-pink-900/20',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      textColor: 'text-purple-200'
    },
    {
      icon: '🚀',
      title: 'Free 3 month maintenance',
      description: 'Demi mensupport perkembangan teknologi di indonesia',
      gradient: 'from-blue-400 to-cyan-400',
      bg: 'bg-gradient-to-br from-blue-900/30 to-cyan-900/20',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      textColor: 'text-blue-200'
    },
    {
      icon: '💸',
      title: 'Affordable for Startups',
      description: 'Kualitas proffesional dengan harga yang sangat ramah',
      gradient: 'from-cyan-400 to-green-400',
      bg: 'bg-gradient-to-br from-cyan-900/30 to-emerald-900/20',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      textColor: 'text-cyan-200'
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* BACKGROUND GRADIENT */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-950/85 to-purple-950/85" /> */}
      <div className="absolute inset-0 light:bg-gradient-to-br light:from-white light:via-sky-150 light:to-blue-150 dark:bg-gradient-to-br dark:from-gray-950/90 dark:via-blue-950/90 dark:to-cyan-950/75" />
      {/* GLOW EFFECTS */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gray-900/40 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text Content - SIDE KIRI */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >

            <div style={{ height: '1px' }} />
            <div className="h-0.1" />
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/30 shadow-md shadow-purple-900/20"
            >

              <Star className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-semibold text-purple-200">
                Leading Tech Solution Provider
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Transform Your</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Vision
              </span>
              <span className="text-white">Into Reality</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl leading-relaxed text-gray-300"
            >
              Javatech menghadirkan solusi software dan hardware(IoT)
              yang mendorong inovasi dan pertumbuhan bisnis.
              Kami mengubah tantangan kompleks menjadi pengalaman digital yang elegan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="group relative px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 overflow-hidden bg-gradient-to-r from-purple-600 to-blue-700 shadow-lg shadow-purple-500/30 cursor-pointer"
              >
                <span className="relative z-10 text-white">Start Your Project</span>
                <ArrowRight className="w-5 h-5 relative z-10 text-white group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-purple-700 to-blue-800" />
              </motion.button>

              {/* Secondary Button - Goes to Services */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="group px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 bg-gray-800/90 border border-gray-700 shadow-md shadow-gray-900 hover:bg-gray-800 cursor-pointer"
              >
                <Play className="w-5 h-5 text-blue-400" />
                <span className="text-gray-200 font-semibold">Our Services</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { number: '22+', label: 'Projects Delivered' },
                { number: '98%', label: 'Success Rate' },
                { number: '30+', label: 'Happy Clients' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm mt-1 font-medium text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Content - SIDE KANAN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Enhanced Main Card */}
            <motion.div
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative rounded-3xl p-8 bg-gradient-to-br from-gray-900/80 to-gray-900/60 
    backdrop-blur-xl border border-gray-800/50 overflow-hidden
    shadow-2xl shadow-purple-900/10 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% 200%' }}
              />

              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                }} />
              </div>

              <div className="relative space-y-6">
                {/* Enhanced Feature Cards */}
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.4
                    }}
                    className={`group relative p-5 rounded-2xl ${feature.bg} 
          border border-gray-800/50 backdrop-blur-sm
          transition-all duration-300 hover:border-purple-500/30
          hover:shadow-lg hover:shadow-purple-900/20`}
                  >
                    {/* Hover shine effect */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex items-center space-x-4">
                      {/* Animated Icon */}
                      <motion.div
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center 
              ${feature.iconBg} shadow-lg group-hover:shadow-xl`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        {/* Icon pulse */}
                        <motion.div
                          className="absolute -inset-1 rounded-xl border border-purple-400/30"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                        <span className="text-2xl text-white relative z-10">
                          {feature.icon}
                        </span>
                      </motion.div>

                      <div>
                        <motion.h3
                          className={`font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent
                group-hover:scale-105 origin-left transition-transform`}
                        >
                          {feature.title}
                        </motion.h3>
                        <p className={`text-sm mt-1 ${feature.textColor}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Floating Element 1 */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl 
    backdrop-blur-sm border-2 border-blue-500/30 
    shadow-2xl shadow-blue-500/20
    bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-blue-500/15
    overflow-hidden"
            >
              {/* Inner animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
                animate={{
                  x: ["0%", "200%"],
                  y: ["0%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Enhanced Floating Element 2 */}
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl 
    backdrop-blur-sm border-2 border-pink-500/30
    shadow-2xl shadow-pink-500/20
    bg-gradient-to-br from-pink-500/15 via-cyan-500/10 to-pink-500/15
    overflow-hidden"
            >
              {/* Inner animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
                animate={{
                  x: ["200%", "0%"],
                  y: ["200%", "0%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full flex justify-center backdrop-blur-sm border-2 border-purple-500/50"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 rounded-full mt-2 bg-gradient-to-b from-purple-400 to-blue-600"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuperHero;