import React from 'react';
import ContentItem from './ContentItem';
import { useNavigate } from "react-router-dom";

const ContentList: React.FC = () => {
  const items = [
    { title: 'ดวงรายวัน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/dailytarot.jpg' },
    { title: 'ความรัก', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/lovetarot.jpg' },
    { title: 'การงาน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/worktarot.jpg' },
    { title: 'การเรียน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/studytarot.jpg' },
    { title: 'การเงิน', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/moneytarot.jpg' },
    { title: 'สุขภาพ', subtitle: 'ดูดวงไพ่ทาโรต์', imageUrl: '/healthtarot.jpg' },
  ];

  // ✅ Handler เมื่อกดแต่ละการ์ด
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
    <div className="flex-1 bg-gray-100 p-2">
      {items.map((item) => (
        <ContentItem
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          imageUrl={item.imageUrl}
          onClick={() => handleItemClick(item.title)} // ✅ ส่ง callback
        />
      ))}
    </div>
  );
};

export default ContentList;
