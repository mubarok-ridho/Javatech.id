import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/team');
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team:', error);
        // Fallback data
        setTeam([
          {
            id: 1,
            name: "Ahmad Rizki",
            position: "Lead Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            expertise: "Full Stack & IoT"
          },
          {
            id: 2,
            name: "Sari Dewi",
            position: "AI Specialist",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            expertise: "Machine Learning"
          },
          {
            id: 3,
            name: "Budi Santoso",
            position: "Mobile Developer",
            image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
            expertise: "React Native & Flutter"
          },
          {
            id: 4,
            name: "Maya Wijaya",
            position: "UI/UX Designer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            expertise: "Design System"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Memuat tim...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tim Profesional Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Didukung oleh tim developer dan ahli teknologi yang berpengalaman 
            dalam menghadirkan solusi terbaik untuk bisnis Anda.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                {member.position}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {member.expertise}
              </p>
              <div className="flex justify-center space-x-3">
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Linkedin size={20} />
                </button>
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;