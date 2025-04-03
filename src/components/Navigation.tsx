import React, { useState, useEffect } from 'react';
import { Home, LineChart, Timer, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [pace, setPace] = useState(0);
  const totalDistance = 42.2; // Marathon distance in km

  useEffect(() => {
    let lastScrollTime = Date.now();
    let lastScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentPosition = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (currentPosition / totalScroll) * 100;
      
      // Calculate current distance based on scroll progress
      const distance = (currentProgress / 100) * totalDistance;
      
      // Calculate pace (time taken per km)
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(currentPosition - lastScrollPosition);
      if (scrollDiff > 0) {
        const newPace = (timeDiff / 1000) / (scrollDiff / 100);
        setPace(newPace);
      }

      setScrollProgress(currentProgress);
      setDistanceCovered(distance);
      
      lastScrollTime = currentTime;
      lastScrollPosition = currentPosition;

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'running'];
      const currentSection = sections.find((section, index) => 
        currentProgress >= (index * (100 / sections.length)) &&
        currentProgress < ((index + 1) * (100 / sections.length))
      );
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-lg">
      <div className="relative">
        {/* Race Progress Track */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollProgress}%` }}
        />
        
        {/* Distance Marker */}
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-lg p-2 text-sm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <div className="font-bold text-lg">{distanceCovered.toFixed(1)}km</div>
            <div className="text-xs text-gray-300">of {totalDistance}km</div>
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Pace: {pace.toFixed(2)} min/km
          </div>
        </motion.div>
        
        {/* Navigation Checkpoints */}
        <div className="flex items-center gap-4 relative z-10">
          {[
            { id: 'home', icon: Home, label: 'Start Line' },
            { id: 'projects', icon: LineChart, label: 'Checkpoint 1' },
            { id: 'running', icon: Timer, label: 'Finish Line' },
          ].map((item, index) => (
            <motion.button
              key={item.id}
              className={`relative p-3 rounded-full transition-colors ${
                activeSection === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-indigo-600/50'
              }`}
              onClick={() => {
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6" />
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black/50 px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {item.label}
              </motion.div>
              {/* Milestone Marker */}
              <motion.div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
                  scrollProgress >= (index * (100 / 3))
                    ? 'bg-green-400'
                    : 'bg-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: scrollProgress >= (index * (100 / 3)) ? 1 : 0 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;