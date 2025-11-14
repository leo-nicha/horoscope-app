import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const FortuneList: React.FC = () => {
    const items = [
        { title: 'เซียมซี', subtitle: 'เสี่ยงทาย', imageUrl: '/fortunesticks.jpg' },
    ];

    const navigate = useNavigate();
    const handleItemClick = (title: string) => {
        if (title === 'เซียมซี') {
            navigate(`/fortunesticks`)
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

export default FortuneList;
