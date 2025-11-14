import React from "react";

export type SideNavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const SideNavItem: React.FC<SideNavItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => {
  const baseClasses =
    // สไตล์ Mobile SideNav (ค่าตั้งต้น): flex-col, w-16, h-16, mb-2
    `flex flex-col items-center justify-center w-16 h-16 rounded-lg mb-2 focus:outline-none transition-all
    
    /* 🚀 Desktop Overrides (lg:) */
    lg:flex-1              
    lg:flex-row            
    lg:justify-center      
    lg:h-auto lg:w-auto    
    lg:mb-0                
    lg:p-3
    lg:space-x-2           /* ✅ เพิ่ม: กำหนดระยะห่างแนวนอน 2 หน่วยบน Desktop */
    `;

  const activeClasses = active

    ? "bg-blue-600 text-white shadow-md scale-105 lg:scale-100"

    : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {/* ใน Mobile: Icon และ Label มีระยะห่างกันด้วย flex-col และ mb-1 (ถูกยกเลิกด้วย lg:mb-0)
        ใน Desktop: Icon และ Label มีระยะห่างกันด้วย lg:space-x-2 ที่กำหนดในปุ่มแม่
      */}
      <span className="text-2xl mb-1 lg:text-xl lg:mb-0">{icon}</span>

      {label && <span className="text-xs font-medium lg:text-sm">{label}</span>}
    </button>
  );
};

export default SideNavItem;