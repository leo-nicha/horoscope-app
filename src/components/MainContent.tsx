import React from 'react';
import SideNav from './SideNav';
import ContentList from './ContentList';

/**
 * Component Layout สำหรับส่วนเนื้อหาหลัก
 * แบ่งหน้าจอเป็น 2 ส่วน (ซ้าย: SideNav, ขวา: ContentList)
 */
const MainContent: React.FC = () => {
  return (
    <div className="flex flex-1 w-full">
      <SideNav />
      <ContentList />
    </div>
  );
};

export default MainContent;
