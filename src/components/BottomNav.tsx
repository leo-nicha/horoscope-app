import React from 'react';
import { Home, Tag, DollarSign, Phone, User } from 'lucide-react';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  const classes = active ? "text-blue-600" : "text-gray-500";
  return (
    <button className={`flex flex-col items-center ${classes} hover:text-blue-600 focus:outline-none`}>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC = () => {
  return (
    // ✅ fixed bottom + safe area + shadow
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 shadow-md z-50">
      <NavItem icon={<Home />} label="Home" active />
      <NavItem icon={<Tag />} label="Promotion" />
      <NavItem icon={<DollarSign />} label="Deposit" />
      <NavItem icon={<Phone />} label="Contact" />
      <NavItem icon={<User />} label="Account" />
    </nav>
  );
};

export default BottomNav;
