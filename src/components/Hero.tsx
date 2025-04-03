import React from 'react';
import { ArrowRight, LineChart, Timer, Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';

// You can customize these values
const personalInfo = {
  name: "John Doe",
  title: "Senior Data Analyst",
  location: "San Francisco, CA",
  email: "john.doe@example.com",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  resumeUrl: "/path-to-your-resume.pdf", // Add your resume file or link
  bio: "Data analyst with 5+ years of experience specializing in predictive modeling and business intelligence. Passionate runner with 10+ marathons completed.",
  skills: [
    "Data Analysis",
    "Machine Learning",
    "Python",
    "SQL",
    "Tableau",
    "R",
    "Statistical Modeling",
    "Business Intelligence"
  ],
  highlights: [
    "Led 15+ successful data projects",
    "Reduced costs by $2M through predictive maintenance",
    "Boston Marathon Qualifier",
    "Published in data science journals"
  ]
};

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070')] bg-cover bg-center"
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <LineChart className="w-8 h-8 text-indigo-400" />
            </motion.div>
            <motion.div variants={iconVariants} whileHover="hover">
              <Timer className="w-8 h-8 text-purple-400" />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {personalInfo.name}
            </h1>
            <h2 className="text-2xl text-indigo-400 mb-2">{personalInfo.title}</h2>
            <p className="text-gray-300">{personalInfo.location}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              {personalInfo.bio}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {/* Skills */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-indigo-900/50 rounded-full text-sm text-indigo-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4">Highlights</h3>
              <ul className="space-y-2">
                {personalInfo.highlights.map((highlight, index) => (
                  <motion.li
                    key={highlight}
                    className="text-gray-300 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact & Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </motion.a>
            <motion.a
              href={personalInfo.resumeUrl}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.a>
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;