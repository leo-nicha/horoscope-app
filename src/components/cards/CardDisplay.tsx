import React from "react";
import { Compass, Heart, Briefcase, BookOpen, GraduationCap, Coins, Stethoscope } from "lucide-react";

export type TarotMode = "general" | "love" | "work" | "study" | "money" | "health";

export interface CardData {
  name: string;
  image?: string;
  meaning_up: string;
  desc?: string;
  love_desc?: {
    main?: string;
    singles?: string;
    couples?: string;
  };
  work_desc?: {
    point?: string;
    working?: string;
    warning?: string;
  };
  study_desc?: {
    class?: string;
    lesson?: string;
    nature?: string;
    warning?: string;
  };
  money_desc?: {
    class?: string;
    finance?: string;
    status?: string;
    warning?: string;
  };
  health_desc?: {
    symptom?: string;
    health?: string;
    body?: string;
  };
}

interface CardDisplayProps {
  card: CardData;
  mode?: TarotMode;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, mode = "general" }) => {
  const fullImageUrl =
    card.image && card.image.trim() !== ""
      ? card.image
      : `https://placehold.co/300x500/0F172A/94A3B8?text=${encodeURIComponent(
        card.name || "Tarot"
      )}`;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center w-full max-w-md animate-fadeIn">
      {/* ภาพไพ่ */}
      <div className="w-56 aspect-3/5 rounded-xl overflow-hidden border-4 border-gray-100 shadow-md">
        <img
          src={fullImageUrl}
          alt={`ไพ่ ${card.name}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h2 className="text-center mt-4 text-2xl font-serif font-bold text-indigo-700">
        {card.name}
      </h2>

      {/* ความหมายหลัก */}
      <div className="mt-4 w-full">
        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
          <Compass className="w-5 h-5 text-indigo-600 mr-2" />
          ความหมายหลัก
        </h3>
        <p className="text-gray-700 leading-relaxed text-sm bg-indigo-50 p-3 rounded-lg border border-indigo-200 italic">
          {card.meaning_up}
        </p>
      </div>

      {/* 💖 ความรัก */}
      {mode === "love" && card.love_desc && (
        <div className="mt-4 w-full">
          <h3 className="flex items-center text-lg font-semibold text-pink-700 mb-2 border-b pb-1">
            <Heart className="w-5 h-5 text-pink-600 mr-2" />
            คำทำนายความรัก
          </h3>
          <p className="text-gray-700 text-sm mb-2">{card.love_desc.main}</p>
          <p className="text-gray-700 text-sm mb-2">
            💖 <b>คนโสด:</b> {card.love_desc.singles}
          </p>
          <p className="text-gray-700 text-sm">
            💕 <b>คนมีคู่:</b> {card.love_desc.couples}
          </p>
        </div>
      )}

      {/* 💼 การงาน */}
      {mode === "work" && card.work_desc && (
        <div className="mt-4 w-full">
          <h3 className="flex items-center text-lg font-semibold text-amber-700 mb-2 border-b pb-1">
            <Briefcase className="w-5 h-5 text-amber-600 mr-2" />
            คำทำนายด้านการงาน
          </h3>
          {card.work_desc.point && (
            <p className="text-gray-700 text-sm mb-2">
              💡 <b>จุดสำคัญ:</b> {card.work_desc.point}
            </p>
          )}
          {card.work_desc.working && (
            <p className="text-gray-700 text-sm mb-2">
              🏢 <b>การทำงาน:</b> {card.work_desc.working}
            </p>
          )}
          {card.work_desc.warning && (
            <p className="text-gray-700 text-sm">
              ⚠️ <b>คำเตือน:</b> {card.work_desc.warning}
            </p>
          )}
        </div>
      )}

      {/* 📚 การเรียน */}
      {mode === "study" && card.study_desc && (
        <div className="mt-4 w-full">
          <h3 className="flex items-center text-lg font-semibold text-blue-700 mb-2 border-b pb-1">
            <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
            คำทำนายด้านการเรียน
          </h3>
          {card.study_desc.class && (
            <p className="text-gray-700 text-sm mb-2">
              🎓 <b>ระดับการเรียน:</b> {card.study_desc.class}
            </p>
          )}
          {card.study_desc.lesson && (
            <p className="text-gray-700 text-sm mb-2">
              📖 <b>บทเรียน:</b> {card.study_desc.lesson}
            </p>
          )}
          {card.study_desc.nature && (
            <p className="text-gray-700 text-sm mb-2">
              🌱 <b>ลักษณะการเรียนรู้:</b> {card.study_desc.nature}
            </p>
          )}
          {card.study_desc.warning && (
            <p className="text-gray-700 text-sm">
              ⚠️ <b>คำเตือน:</b> {card.study_desc.warning}
            </p>
          )}
        </div>
      )}

      {/* 💰 การเงิน */}
      {mode === "money" && card.money_desc && (
        <div className="mt-4 w-full">
          <h3 className="flex items-center text-lg font-semibold text-yellow-700 mb-2 border-b pb-1">
            <Coins className="w-5 h-5 text-yellow-600 mr-2" />
            คำทำนายด้านการเงิน
          </h3>
          {card.money_desc.class && (
            <p className="text-gray-700 text-sm mb-2">
              💎 <b>ระดับ:</b> {card.money_desc.class}
            </p>
          )}
          {card.money_desc.finance && (
            <p className="text-gray-700 text-sm mb-2">
              💰 <b>การเงิน:</b> {card.money_desc.finance}
            </p>
          )}
          {card.money_desc.status && (
            <p className="text-gray-700 text-sm mb-2">
              📊 <b>สถานะ:</b> {card.money_desc.status}
            </p>
          )}
          {card.money_desc.warning && (
            <p className="text-gray-700 text-sm">
              ⚠️ <b>คำเตือน:</b> {card.money_desc.warning}
            </p>
          )}
        </div>
      )}

      {/* 💚 สุขภาพ */}
      {mode === "health" && card.health_desc && (
        <div className="mt-4 w-full">
          <h3 className="flex items-center text-lg font-semibold text-green-700 mb-2 border-b pb-1">
            <Stethoscope className="w-5 h-5 text-green-600 mr-2" />
            คำทำนายด้านสุขภาพ
          </h3>
          {card.health_desc.symptom && (
            <p className="text-gray-700 text-sm mb-2">
              💚 <b>อาการทั่วไป:</b> {card.health_desc.symptom}
            </p>
          )}
          {card.health_desc.health && (
            <p className="text-gray-700 text-sm mb-2">
              💚 <b>สุขภาพโดยรวม:</b> {card.health_desc.health}
            </p>
          )}
          {card.health_desc.body && (
            <p className="text-gray-700 text-sm">
              💚 <b>ร่างกาย:</b> {card.health_desc.body}
            </p>
          )}
        </div>
      )}

      {/* 🌟 ทั่วไป */}
      {mode === "general" && (
        <div className="mt-4 w-full">
          <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-2 border-b pb-1">
            <BookOpen className="w-5 h-5 text-gray-600 mr-2" />
            คำอธิบายเพิ่มเติม
          </h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      )}
    </div>
  );
};

export default CardDisplay;
