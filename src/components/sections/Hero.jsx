import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Sparkles, Shield, Zap, Globe } from 'lucide-react';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: '150+', label: 'Proyek Sukses' },
    { number: '50+', label: 'Klien Terpercaya' },
    { number: '25+', label: 'Developer Expert' },
    { number: '5+', label: 'Tahun Pengalaman' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-20 lg:pt-0 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Partner Teknologi Terpercaya
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Inovasi
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                  Digital
                </span>
                Masa Depan
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                Javatech menghadirkan solusi teknologi terdepan dalam pengembangan software, 
                hardware IoT, dan kecerdasan buatan untuk mengakselerasi transformasi digital bisnis Anda.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
                <span>Mulai Proyek Sekarang</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button className="group border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 backdrop-blur-sm">
                <div className="w-12 h-12 bg-blue-600 group-hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
                  <Play size={20} className="text-white ml-1" />
                </div>
                <span>Tonton Demo</span>
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">Terjamin</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Security First</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">Cepat</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">High Performance</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">Global</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">World Class</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
                    <div className="text-2xl font-bold">IoT</div>
                    <div className="text-blue-100 text-sm">Smart Solutions</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <div className="text-2xl font-bold">AI</div>
                    <div className="text-green-100 text-sm">Intelligent</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
                    <div className="text-2xl font-bold">Cloud</div>
                    <div className="text-purple-100 text-sm">Scalable</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
                    <div className="text-2xl font-bold">Web</div>
                    <div className="text-orange-100 text-sm">Modern</div>
                  </div>
                </div>
                
                {/* Animated Stats */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">
                      {stats[currentStat].number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {stats[currentStat].label}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {stats.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStat 
                            ? 'bg-blue-600 w-6' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 shadow-2xl flex items-center justify-center">
                <span className="text-yellow-900 font-bold text-sm">NEW</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-2xl -rotate-12 shadow-2xl flex items-center justify-center">
                <span className="text-green-900 font-bold text-xs">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;