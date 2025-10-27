import React from 'react';
import ContentItem from './ContentItem';
import { useNavigate } from "react-router-dom";

const CalanderList: React.FC = () => {
  const items = [
    { title: 'จันทรคติ', subtitle: 'วันพระ ข้างขึ้น ข้างแรม', imageUrl: '/moonage.png' },
  ];

  const navigate = useNavigate();
  const handleItemClick = (title: string) => {
    if (title === 'จันทรคติ') {
      navigate('/moonage');
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-2">
      {items.map((item) => (
        <ContentItem
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          imageUrl={item.imageUrl}
          onClick={() => handleItemClick(item.title)}
        />
      ))}
    </div>
  );
};

export default CalanderList;
