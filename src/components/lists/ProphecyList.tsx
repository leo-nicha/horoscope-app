import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const ProphecyList: React.FC = () => {
  const items = [
    { title: 'อักษรรูน', subtitle: 'พยากรณ์', imageUrl: '/runestone.jpg' },
    // { title: 'จับยามสามตา', subtitle: 'พยากรณ์', imageUrl: '/yamsamtar.jpg' },
    { title: 'สัตว์ในฝัน', subtitle: 'พยากรณ์', imageUrl: '/dreamanimal.jpg' },

  ];

  const navigate = useNavigate();
  const handleItemClick = (title: string) => {
    if (title === 'อักษรรูน') {
      navigate('/runefortune');
    }
    //  if (title === 'จับยามสามตา') {
    //   navigate('/yamsamtar');
    // }
    if (title === 'สัตว์ในฝัน') {
      navigate('/dreamanimal');
    }

  };

  return (
    <div className=" w-full p-2 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 justify-items-center mx-auto max-w-6xl">
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
