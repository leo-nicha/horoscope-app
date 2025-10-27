import React from 'react';
import ContentItem from './ContentItem';
import { useNavigate } from "react-router-dom";

const ContentList: React.FC = () => {
    const items = [
        { title: 'เซียมซี', subtitle: 'เสี่ยงทาย', imageUrl: '/fortunesticks.jpg' },
    ];

    // ✅ Handler เมื่อกดแต่ละการ์ด
    const navigate = useNavigate();
    const handleItemClick = (title: string) => {
        if (title === 'เซียมซี') {
            navigate(`/fortunesticks`)
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
                    onClick={() => handleItemClick(item.title)} // ✅ ส่ง callback
                />
            ))}
        </div>
    );
};

export default ContentList;
