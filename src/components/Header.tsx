import React from 'react';
import { User, LogIn, MessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm shrink-0">
      {/* 1. Top Navigation */}
      <nav className="p-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">HORO</h1>
        <div className="flex items-center space-x-3 text-sm">
          <button className="flex items-center space-x-1 text-blue-600">
            <User className="bg-blue-600 text-white rounded-full p-1 text-lg" />
            <span>Register</span>
          </button>
          <button className="flex items-center space-x-1 text-blue-600">
            <LogIn className="bg-blue-600 text-white rounded-full p-1 text-lg" />
            <span>Login</span>
          </button>
          {/* <span className="text-2xl">🇺🇸</span>
          <MessageSquare className="text-2xl text-gray-500" /> */}
        </div>
      </nav>

      {/* 2. Banner */}
      <div
        className="h-32 bg-gray-700 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://placehold.co/400x130/333333/ffffff?text=HORO+Banner')" }}
      >
        {/* Placeholder for complex player images */}
      </div>

      {/* 3. Welcome Message */}
      <div className="p-2 text-sm text-gray-700 border-b border-gray-200">
        <span className="text-blue-500 mr-1">●</span>
        ยินดีต้อนรับสู่ HORO ดูดวงออนไลน์ฟรี ทุกวันกับเรา!
      </div>
    </header>
  );
};

export default Header;