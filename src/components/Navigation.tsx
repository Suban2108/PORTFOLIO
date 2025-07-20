'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from './LogoutButton';
import Main_logo from '../../public/Main_logo(1).png';
import Image from 'next/image';
import GooeyNav from '../blocks/Components/GooeyNav/GooeyNav';

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
  onLoginClick?: () => void;
}

const Navigation = ({ scrollToSection, onLoginClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const items = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleItemClick = (href: string) => {
    scrollToSection(href.replace('#', ''));
    setMobileMenuOpen(false); // close on mobile click
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-purple-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center"
          >
            <Image src={Main_logo} alt="Logo" className="w-12 h-12" />
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div style={{ height: '50px', position: 'relative' }}>
              <GooeyNav
                items={items.map((item) => ({
                  ...item,
                  onClick: () => handleItemClick(item.href),
                }))}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>

            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center focus:outline-none"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-label="Profile menu"
                >
                  <span className="text-white text-sm font-bold">
                    {(user.name?.charAt(0) || user.email?.charAt(0) || '').toUpperCase()}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                      {user.name || user.email}
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                    <div className="px-2 py-1">
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && <LogoutButton />}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <div className="w-6 h-6">☰</div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-purple-500 px-4 pt-4 pb-6 space-y-4"
          >
            <GooeyNav
              items={items.map((item) => ({
                ...item,
                onClick: () => handleItemClick(item.href),
              }))}
              particleCount={10}
              particleDistances={[70, 10]}
              particleR={80}
              initialActiveIndex={0}
              animationTime={500}
              timeVariance={200}
              colors={[1, 2, 3, 4]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
