import React from 'react';

type ContentItemProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  onClick?: () => void; // ✅ เพิ่ม onClick
};

const ContentItem: React.FC<ContentItemProps> = ({ title, subtitle, imageUrl, onClick }) => {
  return (
    // ✅ เปลี่ยน div เป็น button เพื่อให้ทั้งการ์ดกดได้
    <button
      onClick={onClick}
      className="relative bg-white p-4 h-28 flex flex-col justify-center mb-2 rounded-lg shadow-sm overflow-hidden w-full text-left active:scale-[0.98] transition-transform"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
      </div>

      <img
        src={imageUrl}
        alt={title}
        className="absolute right-0 top-1/2 -translate-y-1/2 h-24 w-auto object-contain max-h-full"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/140x110/eeeeee/999999?text=Error')}
      />
    </button>
  );
};

export default ContentItem;
