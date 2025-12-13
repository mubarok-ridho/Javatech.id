import React, { useState, useEffect } from 'react';
import { 
  Code, Database, Smartphone, Cpu, Cloud, Palette,
  Layers, Terminal, Sparkles, Brain, MessageSquare,
  FileCode, ChevronRight, ExternalLink, Zap,
  Globe, Server, Cpu as Chip, Palette as Brush,
  Smartphone as Mobile, Database as Db, Cloud as CloudIcon,
  Brain as AiIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TechStackStats = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [selectedTech, setSelectedTech] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Lighting configurations for each category
  const categoryLights = {
    frontend: {
      gradient: "from-blue-500 via-cyan-500 to-purple-600",
      glow: "shadow-blue-500/30",
      lightColor: "bg-blue-500",
      particles: "bg-cyan-400",
      iconBg: "bg-blue-500/20"
    },
    backend: {
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      glow: "shadow-green-500/30",
      lightColor: "bg-green-500",
      particles: "bg-emerald-400",
      iconBg: "bg-green-500/20"
    },
    ai: {
      gradient: "from-purple-500 via-pink-500 to-violet-600",
      glow: "shadow-purple-500/30",
      lightColor: "bg-purple-500",
      particles: "bg-pink-400",
      iconBg: "bg-purple-500/20"
    },
    mobile: {
      gradient: "from-pink-500 via-rose-500 to-red-600",
      glow: "shadow-pink-500/30",
      lightColor: "bg-pink-500",
      particles: "bg-rose-400",
      iconBg: "bg-pink-500/20"
    },
    database: {
      gradient: "from-orange-500 via-amber-500 to-yellow-600",
      glow: "shadow-orange-500/30",
      lightColor: "bg-orange-500",
      particles: "bg-amber-400",
      iconBg: "bg-orange-500/20"
    },
    infrastructure: {
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      glow: "shadow-cyan-500/30",
      lightColor: "bg-cyan-500",
      particles: "bg-blue-400",
      iconBg: "bg-cyan-500/20"
    },
    design: {
      gradient: "from-yellow-500 via-amber-500 to-orange-600",
      glow: "shadow-yellow-500/30",
      lightColor: "bg-yellow-500",
      particles: "bg-amber-400",
      iconBg: "bg-yellow-500/20"
    }
  };

  const techStack = {
    frontend: {
      title: "Frontend",
      icon: <Code className="text-cyan-300" size={20} />,
      color: "from-blue-500 to-cyan-500",
      techs: [
        { 
          name: "React.js", 
          description: "Library JavaScript untuk membangun antarmuka pengguna yang interaktif dan dinamis",
          features: ["Component-based", "Virtual DOM", "Hooks API", "Server Components"],
          level: "Expert"
        },
        { 
          name: "Next.js", 
          description: "Framework React untuk aplikasi web dengan rendering sisi server dan statik",
          features: ["Server-side Rendering", "Static Generation", "API Routes", "Middleware"],
          level: "Advanced"
        },
        { 
          name: "TypeScript", 
          description: "Superset JavaScript dengan pengetikan statis untuk pengembangan yang lebih aman",
          features: ["Static Typing", "Interface", "Generic Types", "Type Inference"],
          level: "Expert"
        },
        { 
          name: "Tailwind CSS", 
          description: "Framework CSS utility-first untuk desain yang cepat dan responsif",
          features: ["Utility Classes", "Custom Configuration", "Dark Mode", "JIT Compiler"],
          level: "Advanced"
        }
      ]
    },
    backend: {
      title: "Backend",
      icon: <Database className="text-emerald-300" size={20} />,
      color: "from-green-500 to-emerald-500",
      techs: [
        { 
          name: "Golang", 
          description: "Bahasa pemrograman untuk sistem backend yang cepat dan konkuren",
          features: ["Concurrent Programming", "Goroutines", "gRPC Support", "Standard Library"],
          level: "Intermediate"
        },
        { 
          name: "Node.js + Express", 
          description: "Runtime JavaScript untuk membangun API dan aplikasi server-side",
          features: ["Event-driven Architecture", "Middleware System", "WebSocket Support"],
          level: "Expert"
        },
        { 
          name: "Laravel", 
          description: "Framework PHP untuk pengembangan aplikasi web yang elegan",
          features: ["Eloquent ORM", "Blade Templating", "Queue System", "Artisan CLI"],
          level: "Advanced"
        },
        { 
          name: "Python FastAPI", 
          description: "Framework modern Python untuk membangun API dengan performa tinggi",
          features: ["Async/Await", "Automatic Docs", "Dependency Injection", "WebSocket"],
          level: "Intermediate"
        }
      ]
    },
    ai: {
      title: "AI & NLP",
      icon: <Brain className="text-purple-300" size={20} />,
      color: "from-purple-500 to-pink-500",
      techs: [
        { 
          name: "TensorFlow", 
          description: "Platform machine learning end-to-end untuk penelitian dan produksi",
          features: ["Deep Learning", "Neural Networks", "Model Training", "TensorBoard"],
          level: "Advanced"
        },
        { 
          name: "PyTorch", 
          description: "Framework machine learning yang fleksibel untuk penelitian deep learning",
          features: ["Dynamic Computation", "GPU Acceleration", "Neural Networks", "Research"],
          level: "Intermediate"
        },
        { 
          name: "Transformers", 
          description: "Library NLP untuk model bahasa state-of-the-art seperti BERT dan GPT",
          features: ["Pre-trained Models", "Fine-tuning", "Text Generation", "Translation"],
          level: "Advanced"
        },
        { 
          name: "SpaCy", 
          description: "Library NLP industri untuk pemrosesan bahasa alami yang cepat",
          features: ["Named Entity Recognition", "Dependency Parsing", "Text Classification"],
          level: "Intermediate"
        }
      ]
    },
    mobile: {
      title: "Mobile",
      icon: <Smartphone className="text-pink-300" size={20} />,
      color: "from-pink-500 to-rose-500",
      techs: [
        { 
          name: "Flutter", 
          description: "SDK untuk membangun aplikasi mobile native dari satu basis kode",
          features: ["Single Codebase", "Hot Reload", "Widget Library", "Platform Channels"],
          level: "Advanced"
        },
        { 
          name: "Firebase", 
          description: "Platform backend untuk mengembangkan aplikasi mobile dan web",
          features: ["Real-time Database", "Authentication", "Cloud Functions", "Analytics"],
          level: "Expert"
        }
      ]
    },
    database: {
      title: "Database",
      icon: <Layers className="text-amber-300" size={20} />,
      color: "from-orange-500 to-amber-500",
      techs: [
        { 
          name: "PostgreSQL", 
          description: "Database relasional open source dengan fitur-fitur canggih",
          features: ["ACID Compliant", "JSON Support", "Full-text Search", "Extensions"],
          level: "Expert"
        },
        { 
          name: "MySQL", 
          description: "Relational database populer untuk penyimpanan data terstruktur",
          features: ["ACID Transactions", "SQL Querying", "Indexes & Optimization", "Stored Procedures"],
          level: "Advanced"
        },
        { 
          name: "Firebase Firestore", 
          description: "Database NoSQL untuk aplikasi real-time dengan sinkronisasi offline",
          features: ["Real-time Updates", "Offline Support", "Security Rules", "Scalable"],
          level: "Expert"
        }
      ]
    },
    infrastructure: {
      title: "Infrastructure",
      icon: <Cloud className="text-cyan-300" size={20} />,
      color: "from-cyan-500 to-blue-500",
      techs: [
        { 
          name: "Docker", 
          description: "Platform untuk mengembangkan, mengirim, dan menjalankan aplikasi dalam kontainer",
          features: ["Containerization", "Image Management", "Docker Compose", "Networking"],
          level: "Advanced"
        },
        { 
          name: "Cloudinary", 
          description: "Layanan cloud untuk mengelola dan mengoptimalkan media digital",
          features: ["Image Optimization", "Video Processing", "CDN", "AI Tags"],
          level: "Intermediate"
        },
      ]
    },
    design: {
      title: "Design Tools",
      icon: <Palette className="text-yellow-300" size={20} />,
      color: "from-yellow-500 to-amber-500",
      techs: [
        { 
          name: "Adobe Suite", 
          description: "Perangkat lunak kreatif profesional untuk desain dan multimedia",
          features: ["Vector Graphics", "Photo Editing", "Video Production", "Animation"],
          level: "Advanced"
        },
        { 
          name: "Figma", 
          description: "Alat desain antarmuka berbasis web untuk kolaborasi tim",
          features: ["UI/UX Design", "Prototyping", "Design Systems", "Plugins"],
          level: "Expert"
        },
        { 
          name: "Canva", 
          description: "Platform desain online untuk konten visual dan marketing",
          features: ["Templates", "Collaboration", "Brand Kits", "Animation Tools"],
          level: "Intermediate"
        }
      ]
    }
  };

  const aiNlpLibraries = [
    { name: "TensorFlow", category: "Deep Learning", icon: <Chip size={14} /> },
    { name: "PyTorch", category: "Research", icon: <Brain size={14} /> },
    { name: "Scikit-learn", category: "Traditional ML", icon: <Server size={14} /> },
    { name: "OpenCV", category: "Computer Vision", icon: <Eye size={14} /> },
    { name: "Transformers", category: "NLP Models", icon: <MessageSquare size={14} /> },
    { name: "SpaCy", category: "Industrial NLP", icon: <Database size={14} /> },
    { name: "NLTK", category: "Academic NLP", icon: <Book size={14} /> },
    { name: "Gensim", category: "Topic Modeling", icon: <Layers size={14} /> },
    { name: "FastText", category: "Word Embeddings", icon: <Zap size={14} /> },
    { name: "LangChain", category: "LLM Framework", icon: <Link size={14} /> },
    { name: "Hugging Face", category: "Model Hub", icon: <CloudIcon size={14} /> },
    { name: "Flair", category: "State-of-art NLP", icon: <Sparkles size={14} /> }
  ];

  const category = techStack[activeCategory];
  const currentLight = categoryLights[activeCategory];

  return (
    <div className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-cyan-950">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              `linear-gradient(45deg, ${currentLight.lightColor.replace('bg-', '#').replace('/20', '33')} 0%, transparent 50%)`,
              `linear-gradient(135deg, ${currentLight.lightColor.replace('bg-', '#').replace('/20', '33')} 0%, transparent 50%)`,
              `linear-gradient(225deg, ${currentLight.lightColor.replace('bg-', '#').replace('/20', '33')} 0%, transparent 50%)`,
              `linear-gradient(315deg, ${currentLight.lightColor.replace('bg-', '#').replace('/20', '33')} 0%, transparent 50%)`,
              `linear-gradient(45deg, ${currentLight.lightColor.replace('bg-', '#').replace('/20', '33')} 0%, transparent 50%)`,
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        {/* Floating particles with category color */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${currentLight.particles} rounded-full`}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0, 0.3, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Pulse rings */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0, 0.1],
            borderColor: [currentLight.lightColor.replace('bg-', 'border-').replace('/20', '/20')]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header with animated gradient */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-md border shadow-lg mb-8"
            animate={{
              background: [
                `linear-gradient(90deg, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)`,
                `linear-gradient(90deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)`,
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ borderColor: currentLight.lightColor.replace('bg-', 'rgba(').replace('/20', ', 0.3)') }}
          >
            <Terminal className="w-5 h-5 text-purple-300" />
            <span className="text-sm font-semibold text-white">Technology Expertise</span>
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className={`bg-gradient-to-r ${currentLight.gradient} bg-clip-text text-transparent animate-gradient`}>
              Tech Stack
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Teknologi yang kami kuasai untuk membangun solusi digital yang optimal
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Navigation with glow effect */}
          <div className="lg:w-1/4">
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 shadow-2xl relative overflow-hidden">
              {/* Category-specific glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${currentLight.gradient} opacity-20 blur-xl`} />
              
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <Layers className="w-5 h-5 text-cyan-300" />
                Module
              </h3>
              <div className="space-y-2 relative z-10">
                {Object.entries(techStack).map(([key, value]) => (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setSelectedTech(null);
                    }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 relative overflow-hidden group ${
                      activeCategory === key
                        ? `bg-gradient-to-r ${categoryLights[key].gradient} text-white shadow-lg ${categoryLights[key].glow}`
                        : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    {/* Animated background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    {value.icon}
                    <span className="font-medium relative z-10">{value.title}</span>
                    {activeCategory === key && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-white"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Tech Cards Grid with floating animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {category.techs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: `0 20px 40px ${currentLight.lightColor.replace('bg-', '').replace('/20', '')}20`
                  }}
                  onMouseEnter={() => setHoveredCard(tech.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedTech(tech)}
                  className="group cursor-pointer relative"
                >
                  {/* Card glow effect */}
                  {hoveredCard === tech.name && (
                    <motion.div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${currentLight.gradient} rounded-3xl blur opacity-30`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  
                  <div className="bg-gray-900/70 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative">
                    {/* Skill level indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tech.level === 'Expert' ? 'bg-green-500/20 text-green-300' :
                        tech.level === 'Advanced' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {tech.level}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${currentLight.iconBg} backdrop-blur-sm`}>
                        {techStack[activeCategory].icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {tech.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {tech.features.map((feature, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 bg-gray-800/40 text-gray-300 rounded-lg text-xs border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-200"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Hover arrow */}
                    <motion.div
                      className="absolute bottom-4 right-4 text-gray-500 group-hover:text-cyan-400"
                      animate={{ x: hoveredCard === tech.name ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI/NLP Libraries Section */}
            {activeCategory === 'ai' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <MessageSquare className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Library AI & NLP</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {aiNlpLibraries.map((lib, index) => (
                    <motion.div
                      key={lib.name}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        y: -5, 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)"
                      }}
                      className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-800/30 hover:border-purple-500/50 transition-all duration-300 relative group"
                    >
                      {/* Animated dot */}
                      <motion.div
                        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                      />
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          {lib.icon}
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                          {lib.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 pl-11">{lib.category}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tech Details Panel with elegant entrance */}
            <AnimatePresence mode="wait">
              {selectedTech && (
                <motion.div
                  key="details-panel"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl mb-8 relative overflow-hidden"
                >
                  {/* Animated background lines */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute h-px ${currentLight.lightColor.replace('bg-', 'bg-').replace('/20', '/10')}`}
                        animate={{
                          x: ['0%', '100%'],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          top: `${20 + i * 20}%`,
                          width: '100%',
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-2xl ${currentLight.iconBg} backdrop-blur-sm`}>
                          {techStack[activeCategory].icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {selectedTech.name}
                            <span className="ml-3 text-sm px-3 py-1 rounded-full bg-gray-800/50 text-gray-300">
                              {selectedTech.level}
                            </span>
                          </h3>
                          <p className="text-gray-300 text-lg max-w-3xl">
                            {selectedTech.description}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => setSelectedTech(null)}
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                      </motion.button>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-cyan-300" />
                        Fitur Utama
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedTech.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-200 group"
                          >
                            <motion.div
                              className={`w-2 h-2 rounded-full ${currentLight.lightColor}`}
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                            />
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Animated footer */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Semua teknologi telah teruji dalam produksi dan dikembangkan sesuai kebutuhan
            <Sparkles className="w-4 h-4" />
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

// Helper icons
const Eye = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Book = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const Link = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default TechStackStats;