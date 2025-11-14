import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const TarotList: React.FC = () => {
  const items = [
    { title: 'ดวงรายวัน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/dailytarot.jpg' },
    { title: 'ความรัก', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/lovetarot.jpg' },
    { title: 'การงาน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/worktarot.jpg' },
    { title: 'การเรียน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/studytarot.jpg' },
    { title: 'การเงิน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/moneytarot.jpg' },
    { title: 'สุขภาพ', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/healthtarot.jpg' },
  ];

  const navigate = useNavigate();
  const handleItemClick = (title: string) => {
    if (title === 'ดวงรายวัน')
      navigate(`/dailytarot`)
    if (title === 'ความรัก')
      navigate(`/lovetarot`)
    if (title === 'การงาน')
      navigate(`/worktarot`)
    if (title === 'การเรียน')
      navigate(`/studytarot`)
    if (title === 'การเงิน')
      navigate(`/moneytarot`)
    if (title === 'สุขภาพ')
      navigate(`/healthtarot`)
  };

  return (
      <div
        className=" w-full p-2 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 justify-items-center mx-auto max-w-6xl">
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

export default TarotList;
