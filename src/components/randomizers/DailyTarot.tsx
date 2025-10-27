import React, { useState, useCallback } from "react";
import { RefreshCcw, Loader2, ChevronLeftIcon } from "lucide-react";
import CardDisplay from "../cards/CardDisplay";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://tarot-api-lyart.vercel.app";
const ALL_CARDS_URL = `${BASE_URL}/tarot_deck_78.json`;

interface CardData {
  name: string;
  img: string;
  meaning_up: string;
  desc: string;
}

const DailyTarot: React.FC = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCard(null);

    try {
      const allCardsResponse = await fetch(ALL_CARDS_URL);
      if (!allCardsResponse.ok) throw new Error(`Error: ${allCardsResponse.status}`);

      const allCardsData = await allCardsResponse.json();

      // ✅ ตรวจสอบว่าข้อมูลอยู่ในรูปแบบใด
      const cardList = Array.isArray(allCardsData)
        ? allCardsData
        : allCardsData.cards || []; // ถ้าเป็น object ที่มี property cards

      if (cardList.length === 0) {
        throw new Error("ไม่พบข้อมูลไพ่ในสำรับ");
      }

      const randomIndex = Math.floor(Math.random() * cardList.length);
      const randomCard = cardList[randomIndex];

      // ✅ ตรวจสอบว่ามีชื่อไพ่จริงก่อนใช้
      const cardName = randomCard?.name;
      if (!cardName) {
        throw new Error("ไม่พบชื่อไพ่ในข้อมูลที่ดึงมา");
      }

      const oneCardResponse = await fetch(`${BASE_URL}/api/cards/${encodeURIComponent(cardName)}`);
      if (!oneCardResponse.ok) throw new Error(`Error: ${oneCardResponse.status}`);

      const cardDetail: CardData = await oneCardResponse.json();
      setCard(cardDetail);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถดึงข้อมูลไพ่ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-md px-4 absolute top-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50">
          <ChevronLeftIcon
            onClick={() => navigate("/")}
            className="h-5 w-5 text-gray-800" />
        </div>
      </div>
      {/* Header */}
      <header className="text-center mt-10 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-indigo-900 font-serif">
          ดูดวงรายวันด้วยไพ่ทาโรต์
        </h1>
        <p className="text-sm text-gray-500">สุ่มไพ่ทาโรต์ 1 ใบจากสำรับ 78 ใบ</p>
      </header>

      {/* ปุ่มสุ่มไพ่ */}
      <button
        onClick={fetchRandomCard}
        disabled={loading}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ไพ่จะบอกความจริงกับคุณ...
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            เปิดไพ่ของคุณในวันนี้
          </>
        )}
      </button>

      {/* แสดงผลไพ่ */}
      <main className="w-full flex justify-center">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
            {error}
          </div>
        )}
        {!loading && !error && card && <CardDisplay card={card} />}
      </main>

      {!card && !loading && !error && (
        <div className="text-center p-6 bg-indigo-50 rounded-xl border border-indigo-200 mt-6 max-w-xs">
          <p className="text-base text-indigo-700">ไพ่ทาโรต์เชื่อมโยงกับดวงชะตาของคุณ</p>
          <p className="text-base text-indigo-700">โปรดตั้งจิตก่อนกดเปิดไพ่</p>
        </div>
      )}
    </div>
  );
};

export default DailyTarot;
