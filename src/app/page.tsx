'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import LeetCodeStatsSection from '@/components/LeetCodeSection';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import SplashCursor from '../blocks/Animations/SplashCursor/SplashCursor'

const PortfolioContent = () => {
  const { user, isLoading, login, error } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [leetcodeStats, setLeetcodeStats] = useState<{
    totalSolved: number;
    totalQuestions: number;
    easy: [number, number];
    medium: [number, number];
    hard: [number, number];
  }>({
    totalSolved: 0,
    totalQuestions: 3621,
    easy: [0, 885],
    medium: [0, 1883],
    hard: [0, 853],
  });
  const [isLoadingLeetCode, setIsLoadingLeetCode] = useState(true);

  const searchParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

  useEffect(() => {
    if (searchParams && searchParams.has('edit')) {
      setShowLogin(true);
    }
  }, []);

  // ✅ Fetch LeetCode data
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingLeetCode(true);
      try {
        const username = 'suban2108'; // <-- Replace with your LeetCode username
        const res = await axios.get(`/api/leetcode?username=${username}`);
        const data = res.data;
        if (data) {
          setLeetcodeStats({
            totalSolved: data.totalSolved,
            totalQuestions: 3621,
            easy: [data.easy, 885],
            medium: [data.medium, 1883],
            hard: [data.hard, 853],
          });
        }
      } catch (err) {
        console.error('Error fetching LeetCode stats:', err);
      } finally {
        setIsLoadingLeetCode(false);
      }
    };

    fetchStats();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (!success) {
      setLoginError(error || 'Login failed');
    } else {
      setLoginError(null);
      setShowLogin(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return (<>
    <SplashCursor />
    <LoginForm onClose={() => setShowLogin(false)} />
      </>);
  }

  return (
    <div className="min-h-screen">
      <SplashCursor />
      <Navigation scrollToSection={scrollToSection} onLoginClick={() => setShowLogin(true)} />
      <HeroSection scrollToSection={scrollToSection} isAdmin={!!user} />
      <LeetCodeStatsSection
        totalSolved={leetcodeStats.totalSolved}
        totalQuestions={leetcodeStats.totalQuestions}
        easy={leetcodeStats.easy}
        medium={leetcodeStats.medium}
        hard={leetcodeStats.hard}
        isLoading={isLoadingLeetCode}
      />
      <AboutSection isAdmin={!!user} />
      <SkillsSection isAdmin={!!user} />
      <ProjectsSection isAdmin={!!user} />
      <ExperienceSection isAdmin={!!user} />
      <ContactSection isAdmin={!!user} />
      <Footer />
    </div>
  );
};

export default function Home() {
  return (
    <AuthProvider>
      <PortfolioContent />
    </AuthProvider>
  );
}
