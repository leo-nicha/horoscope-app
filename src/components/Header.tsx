import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm shrink-0">
      {/* ส่วนหัว */}
      <nav className="p-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">HORO (Beta test)</h1>
      </nav>

      {/* แบนเนอร์ */}
      <div
        className="h-32 bg-gray-700 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://placehold.co/400x130/333333/ffffff?text=HORO+Banner')",
        }}
      ></div>

      {/* ✅ ข้อความเลื่อนแบบวนลูป */}
      <div className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute whitespace-nowrap animate-marquee text-sm text-gray-700 p-2">
          <span className="text-blue-500 mr-1">●</span>
          ยินดีต้อนรับสู่ HORO ดูดวงออนไลน์ฟรี ทุกวันกับเรา!
        </div>
      </div>
    </header>
  );
};

export default Header;
