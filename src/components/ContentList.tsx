import React from 'react';

// Props สำหรับ Content List Item
type ContentItemProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

// Component ย่อยสำหรับ Card รายการเกม
const ContentItem: React.FC<ContentItemProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative bg-white p-4 h-28 flex flex-col justify-center mb-2 rounded-lg shadow-sm overflow-hidden">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="absolute right-2 top-1/2 -translate-y-1/2 max-h-full w-auto object-contain"
        // เพิ่ม Fallback image เผื่อรูปโหลดไม่ขึ้น
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/140x110/eeeeee/999999?text=Error')}
      />
    </div>
  );
};

/**
 * Component รายการเกม (ด้านขวา) ที่สามารถ scroll ได้
 */
const ContentList: React.FC = () => {
  // ข้อมูลจำลองสำหรับรายการเกม
  const items = [
    { title: 'CQ9', subtitle: 'MPG', imageUrl: 'https://placehold.co/140x110/e0f2fe/0c4a6e?text=CQ9+Game' },
    { title: 'JDB', subtitle: 'MPG', imageUrl: 'https://placehold.co/140x110/ecfdf5/065f46?text=JDB+Game' },
    { title: 'JILI', subtitle: 'MPG', imageUrl: 'https://placehold.co/140x110/fefce8/713f12?text=JILI+Game' },
    { title: 'PNG', subtitle: 'MPG', imageUrl: 'https://placehold.co/140x110/fef2f2/991b1b?text=PNG+Game' },
    { title: 'SPG', subtitle: 'MPG', imageUrl: 'https://placehold.co/140x110/f5f3ff/4c1d95?text=SPG+Game' },
  ];

  return (
    // ส่วนนี้จะ scroll ได้ (overflow-y-auto)
    <div className="flex-1 mt-2 bg-gray-100 p-2 overflow-y-auto">
      {items.map(item => (
        <ContentItem
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default ContentList;
