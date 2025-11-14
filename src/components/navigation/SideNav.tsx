import React, { useState } from "react";
import { Moon, Clover, CalendarDays, Star, Fan, Eye } from "lucide-react";
import TarotList from "../lists/TarotList";
import SideNavItem from "./SideNavItem";
import CalanderList from "../lists/CalanderList";
import FortuneList from "../lists/FortuneList";
import LuckyList from "../lists/LuckyList";
import ProphecyList from "../lists/ProphecyList";
import HoroscopeList from "../lists/HoroscopeList";

const DesktopNavItems: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => (
  <>
    <SideNavItem
      icon={<Moon />}
      label="ไพ่ทาโรต์"
      active={activeTab === "tarot"}
      onClick={() => setActiveTab("tarot")}
    />
    <SideNavItem
      icon={<Eye />}
      label="ดูดวง"
      active={activeTab === "horoscope"}
      onClick={() => setActiveTab("horoscope")}
    />
    <SideNavItem
      icon={<Star />}
      label="เสี่ยงทาย"
      active={activeTab === "fortune"}
      onClick={() => setActiveTab("fortune")}
    />
    <SideNavItem
      icon={<Clover />}
      label="เลขมงคล"
      active={activeTab === "lucky"}
      onClick={() => setActiveTab("lucky")}
    />
    <SideNavItem
      icon={<Fan />}
      label="พยากรณ์"
      active={activeTab === "prophecy"}
      onClick={() => setActiveTab("prophecy")}
    />
    <SideNavItem
      icon={<CalendarDays />}
      label="ปฏิทิน"
      active={activeTab === "calendar"}
      onClick={() => setActiveTab("calendar")}
    />
  </>
);


const SideNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tarot");

  return (
    <div className="mt-2 bg-gray-50 overflow-hidden mb-11">

      {/* ✅ A. แถบแนวนอนด้านบน (Desktop Only) */}
      <header className="hidden lg:block w-full bg-white border-b border-gray-200 shadow-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between space-x-6 p-4">
          <DesktopNavItems activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>

      {/* ✅ B. Sidebar ด้านข้าง (Mobile Only) */}
      <nav
        className="fixed top-25 left-0 h-[calc(100vh-64px)] w-24 bg-gray-100 shrink-0 p-2 border-r border-gray-200 z-10 
                   lg:hidden"
      >
        <div className="flex flex-col items-center space-y-1">
          <DesktopNavItems activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </nav>

      {/* ✅ C. Main Content */}
      <main
        className="flex-1 overflow-y-auto pl-24 
          lg:max-w-6xl lg:mx-auto lg:p-8
          flex flex-col justify-center">
        <div>
          {activeTab === "tarot" && <TarotList />}
          {activeTab === "horoscope" && <HoroscopeList />}
          {activeTab === "fortune" && <FortuneList />}
          {activeTab === "lucky" && <LuckyList />}
          {activeTab === "prophecy" && <ProphecyList />}
          {activeTab === "calendar" && <CalanderList />}
        </div>
      </main>
    </div>
  );
};

export default SideNav;
