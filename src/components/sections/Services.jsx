// src/components/sections/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Cpu, Wifi, Smartphone, Database, Cloud, Shield } from 'lucide-react';

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <service.icon className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Hover Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications with exceptional user experience and performance optimization for iOS and Android platforms.",
      features: ["iOS & Android Native", "React Native & Flutter", "UI/UX Design", "App Store Optimization", "Performance Tuning"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Web Development", 
      description: "Modern web applications with cutting-edge technologies, scalability, and security built-in for enterprise-level performance.",
      features: ["React.js & Next.js", "Progressive Web Apps", "Real-time Features", "SEO Optimization", "Cloud Deployment"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Cpu,
      title: "AI Development",
      description: "Intelligent solutions powered by machine learning and artificial intelligence for business automation and data insights.",
      features: ["Machine Learning", "Computer Vision", "Natural Language Processing", "Predictive Analytics", "AI Integration"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Wifi,
      title: "IoT Development",
      description: "Connected device solutions with hardware integration and real-time data processing capabilities for smart environments.",
      features: ["Smart Sensors", "Real-time Monitoring", "Cloud Integration", "Mobile Control", "Data Analytics"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-blue-200 dark:border-blue-800 shadow-lg mb-8"
          >
            <Code className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Our Expertise</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Services</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Comprehensive technology solutions <span className="font-semibold text-blue-600 dark:text-blue-400">tailored</span> to drive your business forward 
            in the <span className="font-semibold text-cyan-600 dark:text-cyan-400">digital era</span>.
          </motion.p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto border-2 border-blue-200/50 dark:border-blue-800/50">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our technology solutions can drive your business growth and innovation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-blue-500/25"
            >
              Discuss Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;