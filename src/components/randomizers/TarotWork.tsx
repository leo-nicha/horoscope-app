import React, { useState, useCallback } from "react";
import { RefreshCcw, Loader2, ChevronLeftIcon, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardDisplay from "../cards/CardDisplay";

const BASE_URL = "https://tarot-api-lyart.vercel.app";
const ALL_CARDS_URL = `${BASE_URL}/tarot_deck_78.json`;

interface WorkCardData {
  name: string;
  image?: string;
  meaning_up: string;
  work_desc?: {
    point?: string;
    working?: string;
    warning?: string;
  };
}

const TarotWork: React.FC = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState<WorkCardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkCard = useCallback(async () => {
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
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white flex flex-col items-center p-4 font-sans">
      {/* ปุ่มกลับหน้าแรก */}
      <div className="w-full max-w-md px-4 absolute top-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 cursor-pointer hover:bg-amber-100 transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-amber-700" />
        </div>
      </div>

      {/* Header */}
      <header className="text-center mt-10 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-amber-700 font-serif flex justify-center items-center gap-2">
          <Briefcase className="text-amber-600 w-6 h-6" />
          ไพ่ทำนายการงาน
        </h1>
        <p className="text-sm text-amber-500">สุ่มไพ่ Major Arcana เพื่อทำนายด้านอาชีพและงาน</p>
      </header>

      {/* ปุ่มสุ่ม */}
      <button
        onClick={fetchWorkCard}
        disabled={loading}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${
          loading
            ? "bg-amber-300 cursor-not-allowed"
            : "bg-amber-600 text-white hover:bg-amber-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ไพ่กำลังเปิดเส้นทางอาชีพของคุณ...
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            สุ่มไพ่การงานของคุณ 💼
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
          <CardDisplay card={card} mode="work" />
        )}
      </main>

      {!card && !loading && !error && (
        <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200 mt-6 max-w-xs">
          <p className="text-base text-amber-700">กด “สุ่มไพ่การงาน” เพื่อเริ่มต้น</p>
        </div>
      )}
    </div>
  );
};

export default TarotWork;
