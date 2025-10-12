import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Clock, Users, Target } from 'lucide-react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setServices([
            {
              id: 1,
              icon: "📱",
              title: "Mobile App Development",
              description: "Pengembangan aplikasi mobile native dan cross-platform dengan performa optimal dan UX terbaik.",
              features: ["iOS & Android Native", "React Native/Flutter", "Offline Capability", "Push Notification", "App Store Deployment"],
              color: "from-purple-500 to-blue-500",
              stats: { projects: 45, satisfaction: 98, duration: "4-8 weeks" }
            },
            {
              id: 2,
              icon: "🌐",
              title: "Web Development",
              description: "Pembuatan website dan aplikasi web modern dengan teknologi terdepan dan arsitektur scalable.",
              features: ["React/Next.js/Vue", "Node.js/Golang", "Microservices", "Cloud Deployment", "PWA Support"],
              color: "from-green-500 to-teal-500",
              stats: { projects: 67, satisfaction: 96, duration: "2-6 weeks" }
            },
            {
              id: 3,
              icon: "🤖",
              title: "AI Development",
              description: "Solusi kecerdasan buatan dan machine learning untuk automasi dan optimasi proses bisnis.",
              features: ["Computer Vision", "Natural Language Processing", "Predictive Analytics", "Custom AI Models", "MLOps"],
              color: "from-orange-500 to-red-500",
              stats: { projects: 23, satisfaction: 95, duration: "8-16 weeks" }
            },
            {
              id: 4,
              icon: "🔌",
              title: "IoT Development",
              description: "Integrasi hardware dan software IoT untuk smart solutions dan real-time monitoring.",
              features: ["Sensor Networks", "Real-time Dashboard", "Edge Computing", "Predictive Maintenance", "Hardware Design"],
              color: "from-blue-500 to-cyan-500",
              stats: { projects: 34, satisfaction: 97, duration: "12-20 weeks" }
            },
            {
              id: 5,
              icon: "☁️",
              title: "Cloud Solutions",
              description: "Infrastructure cloud dan DevOps untuk skalabilitas dan keandalan sistem.",
              features: ["AWS/Azure/GCP", "Kubernetes & Docker", "CI/CD Pipeline", "Monitoring & Logging", "Disaster Recovery"],
              color: "from-indigo-500 to-purple-500",
              stats: { projects: 28, satisfaction: 99, duration: "2-4 weeks" }
            },
            {
              id: 6,
              icon: "🛡️",
              title: "Cybersecurity",
              description: "Proteksi sistem dan data dengan solusi keamanan berlapis dan monitoring 24/7.",
              features: ["Penetration Testing", "Security Audit", "Threat Detection", "Compliance", "Incident Response"],
              color: "from-red-500 to-pink-500",
              stats: { projects: 19, satisfaction: 100, duration: "1-3 weeks" }
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-lg text-gray-600 dark:text-gray-400">
              Memuat layanan...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Layanan <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">Unggulan</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Solusi teknologi end-to-end dari konsep hingga implementasi, didukung oleh tim expert 
            dan teknologi terdepan untuk kesuksesan digital bisnis Anda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Services List */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeService === index
                    ? 'bg-white dark:bg-gray-800 shadow-2xl border-2 border-blue-500/20 transform scale-105'
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target size={16} />
                        <span>{service.stats.projects} projects</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" />
                        <span>{service.stats.satisfaction}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{service.stats.duration}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-300 ${
                      activeService === index ? 'rotate-90 text-blue-600' : ''
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service Details */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24"
          >
            {services[activeService] && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className={`h-4 bg-gradient-to-r ${services[activeService].color}`}></div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${services[activeService].color} rounded-xl flex items-center justify-center text-xl`}>
                      {services[activeService].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {services[activeService].title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                    {services[activeService].description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Fitur Utama
                    </h4>
                    <div className="grid gap-3">
                      {services[activeService].features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 bg-gradient-to-r ${services[activeService].color} rounded-full`}></div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {services[activeService].stats.projects}+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {services[activeService].stats.satisfaction}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {services[activeService].stats.duration}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                    Konsultasi Gratis
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;