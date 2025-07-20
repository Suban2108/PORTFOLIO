'use client';

import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={logout}
      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </motion.button>
  );
};

export default LogoutButton; 