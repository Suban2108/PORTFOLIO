'use client';

import { motion } from 'framer-motion';
import ProfileCard from '../blocks/Components/ProfileCard/ProfileCard';
import {
  Sparkles,
  Code,
  Rocket,
  Mail,
  NotepadTextDashed,
} from 'lucide-react';
import profileImage from '../../public/profilewithoutBackground.png';

interface HeroSectionProps {
  isAdmin?: boolean;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ isAdmin = false, scrollToSection }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/30" />
      <div className="absolute inset-0 opacity-60 dark:opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-cyan-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-20 dark:opacity-10" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-12">
          
          {/* Left Text Column */}
          <div className="space-y-8 text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Available for work
              </span>
              <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>

            {/* Name */}
            <div className="space-y-1 flex gap-1">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Abdul Suban
              </h1>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                Mohd Ismail Shaikh
              </h1>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-base font-semibold text-blue-700 dark:text-blue-300">
                  Full-Stack Developer
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <NotepadTextDashed className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-base font-semibold text-purple-700 dark:text-purple-300">
                  Programmer
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
              I craft <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">beautiful</span> and performant digital experiences. Clean code, strong UX, and continuous innovation define my process.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl text-base font-semibold shadow hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  View My Work
                </div>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl text-base font-semibold shadow hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </div>
              </button>
            </div>
          </div>

          {/* Right Profile Card Column */}
          <div className="hidden xl:flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <ProfileCard
                name="Abdul Suban"
                title="Software Engineer"
                handle="suban2108"
                status="Online"
                contactText="Contact Me"
                avatarUrl={profileImage.src}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => scrollToSection('contact')}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
