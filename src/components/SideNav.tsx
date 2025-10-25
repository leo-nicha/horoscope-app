import React from 'react';
import { Gift, Smartphone, LayoutGrid, Target, PlayCircle, Home } from 'lucide-react';

// Props สำหรับ Side Nav Item
type SideNavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

// Component ย่อยสำหรับปุ่มเมนูด้านข้าง
const SideNavItem: React.FC<SideNavItemProps> = ({ icon, label, active }) => {
  const baseClasses = "flex flex-col items-center justify-center w-16 h-16 rounded-lg mb-2 focus:outline-none";
  const activeClasses = active
    ? "bg-blue-600 text-white shadow-md"
    : "bg-gray-200 text-gray-700";

  return (
    <button className={`${baseClasses} ${activeClasses}`}>
      <span className="text-2xl mb-1">{icon}</span>
      {label && <span className="text-xs font-medium">{label}</span>}
    </button>
  );
};

/**
 * Component เมนูแนวตั้งด้านซ้าย
 */
const SideNav: React.FC = () => {
  return (
    <nav className="w-24 mt-2 bg-gray-100 shrink-0 p-2 border-r border-gray-200">
      <div className="flex flex-col items-center space-y-1">
        <SideNavItem icon={<Gift />} label="ไพ่ยิปซี" active={true}/>
        <SideNavItem icon={<Smartphone />} label="Mobile" />
        <SideNavItem icon={<LayoutGrid />} label="Game" />
        <SideNavItem icon={<Target />} label="Luck" />
        <SideNavItem icon={<PlayCircle />} label=""  />
        <SideNavItem icon={<Home />} label="" />
      </div>
    </nav>
  );
};

export default SideNav;
