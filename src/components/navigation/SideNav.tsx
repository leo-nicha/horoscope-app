import React, { useState } from "react";
import {  Target, Moon, Clover, CalendarDays } from "lucide-react";
import ContentList from "../ContentList";
import SideNavItem from "./SideNavItem";
import CalanderList from "../CalanderList";
import FortuneList from "../FortuneList";

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
            icon={<Clover />}
            label="เสี่ยงทาย"
            active={activeTab === "fortune"}
            onClick={() => setActiveTab("fortune")}
          />
          <SideNavItem
            icon={<CalendarDays />}
            label="ปฏิทิน"
            active={activeTab === "calendar"}
            onClick={() => setActiveTab("calendar")}
          />

          <SideNavItem
            icon={<Target />}
            label="เร็วๆ นี้"
            active={activeTab === "โชคลาภ"}
            onClick={() => setActiveTab("โชคลาภ")}
          />
        </div>
      </nav>

      {/* ⭐️ 3. ด้านขวา (Content Area) - เว้นระยะห่างด้านซ้ายให้เท่ากับความกว้างของ SideNav */}
      {/* เพิ่ม padding-left: w-24 (หรือ pl-24) เพื่อหลีกเลี่ยงการทับซ้อนกับ SideNav */}
      <main className="flex-1 overflow-y-auto pl-24">
        {/* ... เนื้อหาด้านในเหมือนเดิม ... */}
        {activeTab === "tarot" && <ContentList />}

        {activeTab === "fortune" && <FortuneList />}

        {activeTab === "calendar" && <CalanderList />}


        {activeTab === "luck" && (
          <div className="p-4">
            <h2 className="text-xl font-bold">เนื้อหา Luck</h2>
            <p>เร็วๆ นี้...</p>
          </div>
        )}
      </main>

    </div>
  );
};

export default SideNav;