import React from 'react';

import Header from './Header';
import MainContent from './MainContent';
import BottomNav from './BottomNav';

const HomeScreen: React.FC = () => {
    return (
        <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">

      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto mt-[220px] mb-[60px]">
        <MainContent />
      </main>
      <BottomNav />
    </div>
    )
}

export default HomeScreen;