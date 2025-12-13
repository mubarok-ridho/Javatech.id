import React from 'react';
import { motion } from 'framer-motion';
import { Code, Wifi, Smartphone, Globe, Zap, Eye, Volume2, Droplets, Calendar, ArrowRight, Sparkles, Palette, Video, Camera, Mic } from 'lucide-react';

// Import gambar langsung
import tpqImage from 'D:/Javatech/src/assets/TPQ.png';
import miImage from 'D:/Javatech/src/assets/MI.png';
import faImage from 'D:/Javatech/src/assets/FA.png';
import faiexpressImage from 'D:/Javatech/src/assets/FaiExpress.png';
import claireImage from 'D:/Javatech/src/assets/CLAIRE.png';
import amiflowImage from 'D:/Javatech/src/assets/Amiflow.png';

const ProjectCard = ({ project, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Deployed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Play Store': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Development': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTechColor = (tech) => {
    const techColors = {
      'React': 'bg-blue-500/20 text-blue-300',
      'Node.js': 'bg-green-500/20 text-green-300',
      'IoT': 'bg-orange-500/20 text-orange-300',
      'AI': 'bg-purple-500/20 text-purple-300',
      'Flutter': 'bg-cyan-500/20 text-cyan-300',
      'Firebase': 'bg-yellow-500/20 text-yellow-300',
      'Laravel': 'bg-red-500/20 text-red-300',
      'Python': 'bg-emerald-500/20 text-emerald-300',
      'ESP32': 'bg-violet-500/20 text-violet-300',
      'MongoDB': 'bg-green-600/20 text-green-300',
      'Express': 'bg-gray-500/20 text-gray-300',
      'PostgreSQL': 'bg-blue-600/20 text-blue-300',
      'TensorFlow': 'bg-orange-600/20 text-orange-300',
      'FastAPI': 'bg-teal-500/20 text-teal-300',
    };
    return techColors[tech] || 'bg-gray-500/20 text-gray-300';
  };

  const getIcon = (type) => {
    switch (type) {
      case 'website': return <Globe className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'iot': return <Wifi className="w-5 h-5" />;
      case 'ai': return <Zap className="w-5 h-5" />;
      case 'dashboard': return <Eye className="w-5 h-5" />;
      case 'audio': return <Volume2 className="w-5 h-5" />;
      case 'water': return <Droplets className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-xl opacity-10 group-hover:opacity-30 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${project.color}40, transparent 70%)` }}
      />

      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl h-full transition-all duration-300 group-hover:border-gray-700/50 group-hover:shadow-2xl group-hover:shadow-purple-900/20">

        {/* Image container dengan gambar asli */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient - DIUBAH: gradient lebih gelap di bawah */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

          {/* Status badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-xs font-semibold backdrop-blur-sm ${getStatusColor(project.status)}`}>
            {project.status}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-sm"
                style={{ backgroundColor: project.color + '30' }}>
                {getIcon(project.type)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.client}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start text-sm text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 mr-3 flex-shrink-0"
                    animate={{
                      scale: [1, 1.5, 1],
                      backgroundColor: [project.color + '80', project.color, project.color + '80']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Year */}
          <div className="mt-6 pt-4 border-t border-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                className="text-gray-500"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "TPQ Management System",
      client: "TPQ Al-Hidayah",
      type: "website",
      status: "Deployed",
      color: "#3b82f6",
      image: tpqImage,
      description: "Website management sistem untuk TPQ dengan fitur pembayaran, manajemen siswa, laporan keuangan, dan komunikasi orang tua wali.",
      tech: ["React", "Node.js", "Firebase", "Laravel"],
      features: [
        "Sistem pembayaran SPP digital",
        "Manajemen data siswa dan pengajar",
        "Laporan keuangan otomatis",
        "Notifikasi untuk orang tua",
        "Presensi online siswa"
      ],
      year: "2025"
    },
    {
      id: 2,
      title: "MI Student Portal",
      client: "MI Diponegoro 3 Karangklesem",
      type: "website",
      status: "Deployed",
      color: "#10b981",
      image: miImage,
      description: "Portal manajemen peserta didik dan pembayaran SPP terintegrasi untuk Madrasah Ibtidaiyah.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      features: [
        "Dashboard admin & orang tua",
        "Pembayaran SPP online",
        "Rapor digital siswa",
        "Manajemen kelas dan jadwal",
        "Komunikasi guru-wali murid"
      ],
      year: "2025"
    },
    {
      id: 3,
      title: "Assistant Attendance System",
      client: "Forum Asisten AMIKOM",
      type: "dashboard",
      status: "Deployed",
      color: "#8b5cf6",
      image: faImage,
      description: "Sistem presensi digital untuk asisten praktikum dengan tracking real-time dan reporting otomatis.",
      tech: ["React", "Python", "PostgreSQL", "FastAPI"],
      features: [
        "Presensi QR Code & geolocation",
        "Manajemen shift dan jadwal",
        "Laporan kehadiran otomatis",
        "Dashboard admin real-time",
        "Export data ke Excel"
      ],
      year: "2025"
    },
    {
      id: 4,
      title: "Fai Express Mobile App",
      client: "Fai Express Pulau Burung",
      type: "mobile",
      status: "Play Store",
      color: "#f59e0b",
      image: faiexpressImage,
      description: "Aplikasi mobile pengantaran ekspedisi untuk digitalisasi layanan logistik di Pulau Burung.",
      tech: ["Flutter", "Firebase", "Google Maps API"],
      features: [
        "Tracking pengiriman real-time",
        "Pemesanan & pembayaran online",
        "Driver management system",
        "Notifikasi push order",
        "Laporan pengiriman"
      ],
      year: "2025"
    },
    {
      id: 5,
      title: "CLAIRE Classroom AI",
      client: "AMIKOM Purwokerto",
      type: "ai",
      status: "Development",
      color: "#ec4899",
      image: claireImage,
      description: "Sistem pemantauan kelas dengan AI NLP dan voice recognition untuk evaluasi pembelajaran berbasis audio.",
      tech: ["Python", "TensorFlow", "IoT", "React"],
      features: [
        "Voice recognition untuk analisis pembelajaran",
        "NLP processing percakapan kelas",
        "Dashboard visualisasi data",
        "IoT sensor pendukung",
        "Laporan insights otomatis"
      ],
      year: "2025"
    },
    {
      id: 6,
      title: "Amiflow Water Management",
      client: "Pamsimas x AMIFLOW",
      type: "iot",
      status: "Development",
      color: "#06b6d4",
      image: amiflowImage,
      description: "Sistem IoT untuk manajemen pengaliran air oleh Pamsimas dengan monitoring real-time dan kontrol otomatis.",
      tech: ["IoT", "ESP32", "React", "Node.js"],
      features: [
        "Sensor flow rate & kualitas air",
        "Kontrol valve otomatis",
        "Dashboard monitoring real-time",
        "Prediksi kebutuhan air",
        "Alert system untuk gangguan"
      ],
      year: "2025"
    }
  ];

  // Template message untuk WhatsApp
  const whatsappTemplate = `
Haloo JavaTech!👋🏼

Saya tertarik dengan project portfolio Anda dan ingin berdiskusi tentang pengembangan sistem untuk kebutuhan saya.

  `.trim();

  const whatsappUrl = `https://wa.me/6282234571831?text=${encodeURIComponent(whatsappTemplate)}`;

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-gradient-to-tr from-blue-950 via-gray-950 to-cyan-950">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/10 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md border border-purple-700/30 shadow-lg mb-8">
            <Code className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-200">Our Portfolio</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-yellow-400" />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Our Real{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Bukti nyata karya kami dalam mengembangkan solusi teknologi untuk berbagai sektor
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA SECTION - DESIGN PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-800/50 shadow-2xl max-w-4xl mx-auto overflow-hidden group">

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            />

            <div className="absolute inset-0 opacity-10">
              {[Video, Camera, Mic, Code, Globe, Smartphone].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
                  style={{ left: `${10 + i * 20}%`, top: `${30 + (i % 2) * 20}%` }}
                >
                  <Icon className="w-8 h-8 text-purple-400" />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                Siap Mengembangkan Project Anda?
              </h3>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Mari buat solusi teknologi custom sesuai kebutuhan bisnis Anda
              </motion.p>

              {/* WhatsApp Button Premium */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-700 overflow-hidden shadow-2xl shadow-purple-900/30 inline-flex items-center justify-center mx-auto"
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                />

                <span className="relative z-10 text-white">Diskusi Project via WhatsApp</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10 ml-3 inline-block"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>

                <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                />

                <div className="absolute -inset-4 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      style={{ left: `${i * 30}%`, top: '-10%' }}
                    />
                  ))}
                </div>
              </motion.a>

              {/* Info Nomor WhatsApp */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-gray-500 mt-6 font-medium flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Klik untuk chat dengan admin javatech
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </motion.p>

              {/* Info Template Message */}
              <div className="mt-4 text-xs text-gray-600 max-w-md mx-auto">
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
          </svg>
          
          {/* Tooltip */}
          <span className="absolute right-20 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm border border-gray-700/50">
            Chat via WhatsApp
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default Projects;