import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const ProphecyList: React.FC = () => {
  const items = [
    { title: 'อักษรรูน', subtitle: 'พยากรณ์', imageUrl: '/runestone.jpg' },
    { title: 'สัตว์ในฝัน', subtitle: 'พยากรณ์', imageUrl: '/dreamanimal.jpg' },

  ];

  const navigate = useNavigate();
  const handleItemClick = (title: string) => {
    if (title === 'อักษรรูน') {
      navigate('/runefortune');
    }
    if (title === 'สัตว์ในฝัน') {
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
