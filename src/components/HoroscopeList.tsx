import React from 'react';
import ContentItem from './ContentItem';
import { useNavigate } from "react-router-dom";

const ContentList: React.FC = () => {
    const items = [
        { title: 'วันเกิด', subtitle: 'ดูดวง', imageUrl: '/luckydays.jpg' },
        { title: 'ปีเกิด', subtitle: 'ดูดวง', imageUrl: '/luckycnzodiac.jpg' },
    ];

    const navigate = useNavigate();
    const handleItemClick = (title: string) => {
        if (title === 'วันเกิด') {
            navigate(`/luckyday`)
        }
                if (title === 'ปีเกิด') {
            navigate(`/luckycnzodiac`)
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

export default ContentList;
