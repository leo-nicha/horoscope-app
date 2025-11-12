import React from 'react';
import ContentItem from '../ContentItem';
import { useNavigate } from "react-router-dom";

const LuckyList: React.FC = () => {
    const items = [
        { title: 'เบอร์โทรศัพท์', subtitle: 'เลขมงคง', imageUrl: '/phonenumber.jpg' },
        { title: 'เลขที่อยู่อาศัย', subtitle: 'เลขมงคง', imageUrl: '/housenumber.jpg' },
    ];

    const navigate = useNavigate();
    const handleItemClick = (title: string) => {
        if (title === 'เบอร์โทรศัพท์') {
            navigate(`/luckyphone`)
        }
        if (title === 'เลขที่อยู่อาศัย') {
            navigate(`/luckyhouse`)
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

export default LuckyList;
