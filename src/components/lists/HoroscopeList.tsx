import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const HoroscopeList: React.FC = () => {
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

export default HoroscopeList;
