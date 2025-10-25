import React from 'react';
import ContentItem from './ContentItem';
import { useNavigate } from "react-router-dom";

const ContentList: React.FC = () => {
  const items = [
    { title: 'ดูดวงรายวัน', subtitle: 'ไพ่ยิปซี', imageUrl: 'https://placehold.co/140x110/e0f2fe/0c4a6e' },
    { title: 'ดูดวงความรัก', subtitle: 'ไพ่ยิปซี', imageUrl: 'https://placehold.co/140x110/ecfdf5/065f46' },
    { title: 'ดูดวงการงาน', subtitle: 'ไพ่ยิปซี', imageUrl: 'https://placehold.co/140x110/fefce8/713f12' },
    { title: 'ดูดวงการเรียน', subtitle: 'ไพ่ยิปซี', imageUrl: 'https://placehold.co/140x110/fef2f2/991b1b' },
    { title: 'ดูดวงการเงิน', subtitle: 'ไพ่ยิปซี', imageUrl: 'https://placehold.co/140x110/f5f3ff/4c1d95' },
    { title: 'ดูดวงสุขภาพ', subtitle: 'ไพ่ยิปซี', imageUrl: 'https://placehold.co/140x110/f5f3ff/4c1d95' },
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
