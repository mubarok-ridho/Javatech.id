import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Projector, Trophy, Clock } from 'lucide-react';

const Counter = ({ value, plus = false, duration = 2000 }) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}{plus && '+'}
    </span>
  );
};

const Stats = () => {
  const stats = [
    { icon: Projector, value: 187, label: 'Projects Completed', plus: true },
    { icon: Users, value: 63, label: 'Happy Clients', plus: true },
    { icon: Trophy, value: 98, label: 'Success Rate', plus: false, suffix: '%' },
    { icon: Clock, value: 5, label: 'Years Experience', plus: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold">
                <Counter value={stat.value} plus={stat.plus} />
                {stat.suffix}
              </div>
              <div className="text-primary-100 font-medium text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;