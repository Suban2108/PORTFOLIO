'use client';

import { motion } from 'framer-motion';
import { Edit, Plus } from 'lucide-react';

interface AboutSectionProps {
  isAdmin?: boolean;
}

const AboutSection = ({ isAdmin = false }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About
            </span>
            <span className="text-gray-900 dark:text-white"> Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get to know me better and understand my passion for creating amazing digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Passionate Full-Stack Developer
              </h3>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with over 3 years of experience creating modern web applications in college and personal projects. 
              I love turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date 
              with the latest industry trends.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Fresher</div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Skills Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Core Skills
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">Frontend Development</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">95%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '95%' }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">Backend Development</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">Programming Languages</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">80%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 