import React, { useState } from "react";
import { Moon, Clover, CalendarDays, Star, Fan, Eye } from "lucide-react";
import ContentList from "../lists/ContentList";
import SideNavItem from "./SideNavItem";
import CalanderList from "../lists/CalanderList";
import FortuneList from "../lists/FortuneList";
import LuckyList from "../lists/LuckyList";
import ProphecyList from "../lists/ProphecyList";
import HoroscopeList from "../lists/HoroscopeList";

const SideNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tarot");

  return (
    <div className="mt-2 bg-gray-50 overflow-hidden mb-11">
      <nav
        className="fixed top-20 left-0 h-[calc(100vh-64px)] w-24 bg-gray-100 shrink-0 p-2 border-r border-gray-200 z-10 mt-[150px]"
      >
        <div className="flex flex-col items-center space-y-1">
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
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto pl-24">

        {activeTab === "tarot" && <ContentList />}

        {activeTab === "horoscope" && <HoroscopeList />}

        {activeTab === "fortune" && <FortuneList />}

        {activeTab === "lucky" && <LuckyList />}

        {activeTab === "prophecy" && <ProphecyList />}

        {activeTab === "calendar" && <CalanderList />}

      </main>

    </div>
  );
};

export default SideNav;