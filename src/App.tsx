import React from 'react';
import Header from './components/Header';
// import QuickActions from './components/QuickActions';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  return (
    // ✅ ใช้ min-h-dvh (รองรับมือถือ) + overflow-x-hidden ป้องกันล้นขวา
    <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">
      
      {/* ===== Fixed Header (Top Area) ===== */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
        {/* <QuickActions /> */}
      </div>

      {/* ===== Scrollable Content ===== */}
      <main className="flex-1 overflow-y-auto mt-[220px] mb-[60px]"> 
        {/* ↑ margin-top = ความสูงรวมของ Header + QuickActions
            ↑ margin-bottom = ความสูงของ BottomNav */}
        <MainContent />
      </main>

      {/* ===== Fixed Bottom Navigation ===== */}
      <BottomNav />
    </div>
  );
};

export default App;
