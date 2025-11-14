import React from 'react';
// import BannerSlider from './navigation/BannerSlider';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm shrink-0">
      <nav className="p-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">HORO (Beta test)</h1>
        <div></div>
      </nav>

      {/* <div>
        {<BannerSlider />}
      </div> */}
      <div className="p-2 text-sm text-gray-700 border-b border-gray-200 overflow-hidden">
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
    </header>
  );
};

export default Header;