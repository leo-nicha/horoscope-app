import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm shrink-0">
      <nav className="p-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">HORO (Beta test)</h1>
        <div></div>
      </nav>

      <div
        className="h-32 bg-gray-700 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://placehold.co/400x130/333333/ffffff?text=HORO+Banner')" }}
      ></div>

      {/* --- ส่วนที่แก้ไข --- */}
      {/* 1. เพิ่ม overflow-hidden ที่ container ภายนอก */}
      <div className="p-2 text-sm text-gray-700 border-b border-gray-200 overflow-hidden">
        
        {/* 2. สร้าง div ภายในสำหรับใส่ animation */}
        {/* - whitespace-nowrap: ไม่ให้ข้อความตกบรรทัด */}
        {/* - animate-[marquee_15s_linear_infinite]: คือการเรียกใช้ animation */}
        {/* - marquee: คือชื่อ @keyframes ที่เราจะสร้างใน CSS (ดูขั้นตอนที่ 2) */}
        {/* - 15s: คือความเร็ว (15 วินาที) - คุณสามารถปรับเลขนี้ได้ */}
        {/* - linear: ให้ความเร็วคงที่ */}
        {/* - infinite: ให้วนซ้ำไปเรื่อยๆ */}
        <div className="whitespace-nowrap animate-[marquee_10s_linear_infinite]">
          ยินดีต้อนรับสู่ HORO ดูดวงออนไลน์ฟรี ทุกวันกับเรา
        </div>

      </div>
      {/* --- จบส่วนที่แก้ไข --- */}

    </header>
  );
};

export default Header;