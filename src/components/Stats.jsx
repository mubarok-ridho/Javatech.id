import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback data
        setStats([
          { number: "150+", label: "Proyek Selesai" },
          { number: "50+", label: "Klien Puas" },
          { number: "25+", label: "Developer Ahli" },
          { number: "5+", label: "Tahun Pengalaman" }
        ]);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold">
                {stat.number}
              </div>
              <div className="text-blue-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;