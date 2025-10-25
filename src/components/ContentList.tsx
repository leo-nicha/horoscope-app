import React from 'react';
import ContentItem from './ContentItem';
import { useNavigate } from "react-router-dom";

const ContentList: React.FC = () => {
  const items = [
    { title: 'ดูดวงรายวัน', subtitle: 'ไพ่ยิปซี', imageUrl: '/dailytarot.jpg' },
    { title: 'ดูดวงความรัก', subtitle: 'ไพ่ยิปซี', imageUrl: '/lovetarot.jpg' },
    { title: 'ดูดวงการงาน', subtitle: 'ไพ่ยิปซี', imageUrl: '/worktarot.jpg' },
    { title: 'ดูดวงการเรียน', subtitle: 'ไพ่ยิปซี', imageUrl: '/studytarot.jpg' },
    { title: 'ดูดวงการเงิน', subtitle: 'ไพ่ยิปซี', imageUrl: '/moneytarot.jpg' },
    { title: 'ดูดวงสุขภาพ', subtitle: 'ไพ่ยิปซี', imageUrl: '/healthtarot.jpg' },
  ];

  // ✅ Handler เมื่อกดแต่ละการ์ด
  const navigate = useNavigate();
  const handleItemClick = (title: string) => {
    if (title === 'ดูดวงรายวัน')
      navigate(`/dailytarot`)
    if (title === 'ดูดวงความรัก')
      navigate(`/lovetarot`)
    if (title === 'ดูดวงการงาน')
      navigate(`/worktarot`)
    if (title === 'ดูดวงการเรียน')
      navigate(`/studytarot`)
    if (title === 'ดูดวงการเงิน')
      navigate(`/moneytarot`)
    if (title === 'ดูดวงสุขภาพ')
      navigate(`/healthtarot`)
  };

  return (
    <div className="flex-1 mt-2 bg-gray-100 p-2 overflow-y-auto">
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
