import React, { useState, useCallback } from "react";
import { RefreshCcw, Loader2, ChevronLeftIcon, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://tarot-api-lyart.vercel.app";
const ALL_CARDS_URL = `${BASE_URL}/tarot_deck_78.json`;

interface LoveCardData {
  name: string;
  image?: string;
  meaning_up: string;
  lovedesc?: {
    main: string;
    singles: string;
    couples: string;
  };
}

const TarotLove: React.FC = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState<LoveCardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoveCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCard(null);

    try {
      const allCardsResponse = await fetch(ALL_CARDS_URL);
      if (!allCardsResponse.ok) throw new Error(`Error: ${allCardsResponse.status}`);

      const allCardsData = await allCardsResponse.json();
      const cardList = Array.isArray(allCardsData)
        ? allCardsData
        : allCardsData.cards || [];

      // ✅ ดึงเฉพาะไพ่ Major Arcana
      const majorCards = cardList.filter((c: any) => c.type === "major");
      if (majorCards.length === 0) throw new Error("ไม่พบข้อมูลไพ่ Major Arcana");

      const randomIndex = Math.floor(Math.random() * majorCards.length);
      const randomCard = majorCards[randomIndex];
      setCard(randomCard);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถดึงข้อมูลไพ่ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col items-center p-4 font-sans">
      {/* กลับหน้าแรก */}
      <div className="w-full max-w-md px-4 absolute top-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 cursor-pointer hover:bg-pink-100 transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-pink-700" />
        </div>
      </div>

      {/* Header */}
      <header className="text-center mt-10 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-pink-700 font-serif flex justify-center items-center gap-2">
          <Heart className="text-pink-600 w-6 h-6" />
          ไพ่ทำนายความรัก
        </h1>
        <p className="text-sm text-pink-500">สุ่มไพ่ Major Arcana เพื่อทำนายด้านความรัก</p>
      </header>

      {/* ปุ่มสุ่ม */}
      <button
        onClick={fetchLoveCard}
        disabled={loading}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${
          loading
            ? "bg-pink-300 cursor-not-allowed"
            : "bg-pink-600 text-white hover:bg-pink-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ไพ่กำลังเผยความรักของคุณ...
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            สุ่มไพ่ความรักของคุณ 💞
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

        {!loading && !error && card && (
          <div className="bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center w-full max-w-md animate-fadeIn">
            {/* รูปไพ่ */}
            <div className="w-56 aspect-3/5 rounded-xl overflow-hidden border-4 border-pink-100 shadow-md">
              <img
                src={
                  card.image && card.image.trim() !== ""
                    ? card.image
                    : `https://placehold.co/300x500/9D174D/FFF?text=${encodeURIComponent(
                        card.name || "Tarot"
                      )}`
                }
                alt={`ไพ่ ${card.name}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* ชื่อไพ่ */}
            <h2 className="text-center mt-4 text-2xl font-serif font-bold text-pink-700">
              {card.name}
            </h2>

            {/* ความหมายหลัก */}
            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">
                💫 ความหมายหลัก
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm bg-pink-50 p-3 rounded-lg border border-pink-200 italic">
                {card.meaning_up}
              </p>
            </div>

            {/* คำทำนายรวม */}
            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold text-pink-700 mb-2 border-b pb-1">
                ❤️ คำทำนายด้านความรัก
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{card.lovedesc?.main || "ไม่มีข้อมูล"}</p>
            </div>

            {/* สำหรับคนโสด */}
            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold text-pink-700 mb-2 border-b pb-1">
                💕 สำหรับคนโสด
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{card.lovedesc?.singles || "ไม่มีข้อมูล"}</p>
            </div>

            {/* สำหรับคนมีคู่ */}
            <div className="mt-4 w-full mb-6">
              <h3 className="text-lg font-semibold text-pink-700 mb-2 border-b pb-1">
                💞 สำหรับคนมีคู่
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{card.lovedesc?.couples || "ไม่มีข้อมูล"}</p>
            </div>
          </div>
        )}
      </main>

      {!card && !loading && !error && (
        <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-200 mt-6 max-w-xs">
          <p className="text-base text-pink-700">กด “สุ่มไพ่ความรัก” เพื่อเริ่มต้น</p>
        </div>
      )}
    </div>
  );
};

export default TarotLove;
