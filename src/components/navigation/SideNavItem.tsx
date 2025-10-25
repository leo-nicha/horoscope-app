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
    "flex flex-col items-center justify-center w-16 h-16 rounded-lg mb-2 focus:outline-none transition-all";
  const activeClasses = active
    ? "bg-blue-600 text-white shadow-md scale-105"
    : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <span className="text-2xl mb-1">{icon}</span>
      {label && <span className="text-xs font-medium">{label}</span>}
    </button>
  );
};

export default SideNavItem;
