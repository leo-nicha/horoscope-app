import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const ProphecyList: React.FC = () => {
  const items = [
    { title: 'ฝันเห็นสัตว์', subtitle: 'ทำนายฝัน', imageUrl: '/dreamanimal.jpg' },
  ];

  const navigate = useNavigate();
  const handleItemClick = (title: string) => {
    if (title === 'ฝันเห็นสัตว์') {
      navigate('/dreamanimal');
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

export default ProphecyList;
