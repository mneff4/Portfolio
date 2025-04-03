import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import RaceCard from './components/RaceCard';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [distanceEffect, setDistanceEffect] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      setDistanceEffect(v * 42.2); // Simulating marathon distance
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const projects = [
    {
      title: "Customer Churn Analysis",
      description: "Developed predictive models to identify at-risk customers and implemented retention strategies resulting in significant reduction in churn rate.",
      technologies: ["Python", "Scikit-learn", "Tableau", "SQL"],
      metrics: [
        "Reduced churn rate by 25%",
        "Increased customer retention by 15%",
        "$2M annual savings"
      ],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
      caseStudyUrl: "#"
    },
    {
      title: "Sales Forecasting Engine",
      description: "Built an advanced forecasting system using machine learning to predict future sales trends and optimize inventory management.",
      technologies: ["R", "TensorFlow", "Power BI", "Azure ML"],
      metrics: [
        "97% prediction accuracy",
        "30% reduction in stockouts",
        "$1.5M inventory cost savings"
      ],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
      caseStudyUrl: "#"
    }
  ];

  const races = [
    {
      date: "2024-03-15",
      location: "Boston, MA",
      distance: "Marathon (42.2km)",
      time: "3:45:22",
      elevation: "824ft",
      highlights: "Personal best time, negative split strategy paid off with strong finish in the last 10K.",
      imageUrl: "https://images.unsplash.com/photo-1530143584546-02191bc84eb5?q=80&w=2069"
    },
    {
      date: "2024-02-01",
      location: "San Francisco, CA",
      distance: "Half Marathon",
      time: "1:45:15",
      elevation: "1,200ft",
      highlights: "Challenging hill course, maintained steady pace throughout. Great coastal views!",
      imageUrl: "https://images.unsplash.com/photo-1470880587080-599f3e4f0913?q=80&w=2070"
    },
    {
      date: "2024-01-10",
      location: "Chicago, IL",
      distance: "10K Race",
      time: "42:30",
      elevation: "125ft",
      highlights: "Fast, flat course perfect for speed work. New 10K personal record!",
      imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070"
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transform origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Distance Effect */}
      <motion.div
        className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-sm font-mono">
          <div className="text-green-400">Distance: {distanceEffect.toFixed(1)}km</div>
          <div className="text-xs text-gray-400">Marathon Progress</div>
        </div>
      </motion.div>

      <Navigation />
      <Hero />
      
      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Data Analytics Portfolio
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Running Achievements Section */}
      <motion.section
        id="running"
        className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Running Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {races.map((race, index) => (
              <RaceCard key={index} {...race} index={index} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;