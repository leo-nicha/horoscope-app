import React from "react";
import { BookOpen, Compass } from "lucide-react";

export interface CardData {
  name: string;
  image?: string;
  meaning_up: string;
  desc: string;
}

interface CardDisplayProps {
  card: CardData;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  // ใช้ image จาก API ถ้ามี
  const fullImageUrl =
    card.image && card.image.trim() !== ""
      ? card.image
      : `https://placehold.co/300x500/0F172A/94A3B8?text=${encodeURIComponent(
          card.name || "TAROT"
        )}`;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center w-full max-w-md animate-fadeIn">
      {/* ส่วนรูปภาพไพ่ */}
      <div className="w-56 aspect-3/5 rounded-xl overflow-hidden border-4 border-gray-100 shadow-md">
        <img
          src={fullImageUrl}
          alt={`รูปไพ่ ${card.name}`}
          onError={(e) => {
            // ถ้ารูปโหลดไม่ได้ ให้ใช้ Placeholder
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/300x500/0F172A/94A3B8?text=${encodeURIComponent(
              card.name || "TAROT"
            )}`;
          }}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* ชื่อไพ่ */}
      <h2 className="text-center mt-4 text-2xl font-serif font-bold text-indigo-700">
        {card.name}
      </h2>

      {/* ความหมาย */}
      <div className="mt-4 w-full">
        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
          <Compass className="w-4 h-4 text-green-600 mr-2" />
          ความหมาย (ด้านตรง)
        </h3>
        <p className="text-gray-600 leading-relaxed italic bg-green-50 p-3 rounded-lg border border-green-200 text-sm">
          {card.meaning_up}
        </p>
      </div>

      {/* คำอธิบาย */}
      <div className="mt-4 w-full">
        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
          <BookOpen className="w-4 h-4 text-red-600 mr-2" />
          คำอธิบายโดยละเอียด
        </h3>
        <p className="text-gray-700 leading-relaxed text-sm">{card.desc}</p>
      </div>
    </div>
  );
};

export default CardDisplay;
