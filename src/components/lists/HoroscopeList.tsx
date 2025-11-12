import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const ContentList: React.FC = () => {
    const items = [
        { title: 'วันเกิด', subtitle: 'ดูดวง', imageUrl: '/luckydays.jpg' },
        { title: 'ราศี', subtitle: 'ดูดวง', imageUrl: '/luckywestzodiac.jpg' },
        { title: 'ปีนักษัตร', subtitle: 'ดูดวง', imageUrl: '/luckycnzodiac.jpg' },
        { title: 'ผูกลัคนา', subtitle: 'ดูดวง', imageUrl: '/destinychart.jpg' },
    ];

    const navigate = useNavigate();
    const handleItemClick = (title: string) => {
        if (title === 'วันเกิด') {
            navigate(`/luckyday`)
        }
        if (title === 'ราศี') {
            navigate(`/luckywestzodiac`)
        }
        if (title === 'ปีนักษัตร') {
            navigate(`/luckycnzodiac`)
        }
        if (title === 'ผูกลัคนา') {
            navigate(`/destinychart`)
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
