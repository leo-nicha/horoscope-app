import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  RefreshCcw,
  Loader2,
  ChevronLeftIcon,
  Heart,
  TimerIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardDisplay from "../cards/CardDisplay";

const BASE_URL = "https://tarot-api-lyart.vercel.app";
const ALL_CARDS_URL = `${BASE_URL}/tarot_deck_78.json`;

const LAST_DRAW_KEY = "tarotLoveLastDraw";
const DAILY_CARD_KEY = "tarotLoveDailyCard";

interface LoveCardData {
  name: string;
  image?: string;
  meaning_up: string;
  love_desc?: {
    main: string;
    singles: string;
    couples: string;
  };
}

const getLastMidnight = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

const getNextMidnight = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
};

const formatTime = (num: number) => num.toString().padStart(2, "0");

const TarotLove: React.FC = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState<LoveCardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasDrawnToday, setHasDrawnToday] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>("");
  const timerIntervalRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    timerIntervalRef.current = window.setInterval(() => {
      const now = new Date().getTime();
      const nextMidnight = getNextMidnight();
      const distance = nextMidnight - now;

      if (distance < 0) {
        clearInterval(timerIntervalRef.current!);
        setHasDrawnToday(false);
        setCountdown("");
        localStorage.removeItem(LAST_DRAW_KEY);
        localStorage.removeItem(DAILY_CARD_KEY);
        setCard(null);
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(
          `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        );
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const lastDrawTimestamp = localStorage.getItem(LAST_DRAW_KEY);
    const savedCardData = localStorage.getItem(DAILY_CARD_KEY);
    const lastMidnight = getLastMidnight();

    if (lastDrawTimestamp && parseInt(lastDrawTimestamp, 10) > lastMidnight) {
      setHasDrawnToday(true);
      if (savedCardData) {
        setCard(JSON.parse(savedCardData));
      }
      startCountdown();
    } else {
      setHasDrawnToday(false);
      localStorage.removeItem(LAST_DRAW_KEY);
      localStorage.removeItem(DAILY_CARD_KEY);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [startCountdown]);

  const fetchLoveCard = useCallback(async () => {
    if (hasDrawnToday) return;

    setLoading(true);
    setError(null);
    setCard(null);

    try {
      const allCardsResponse = await fetch(ALL_CARDS_URL);
      if (!allCardsResponse.ok)
        throw new Error(`Error: ${allCardsResponse.status}`);

      const allCardsData = await allCardsResponse.json();
      const cardList = Array.isArray(allCardsData)
        ? allCardsData
        : allCardsData.cards || [];

      const majorCards = cardList.filter((c: any) => c.type === "major");
      if (majorCards.length === 0)
        throw new Error("ไม่พบข้อมูลไพ่ Major Arcana");

      const randomIndex = Math.floor(Math.random() * majorCards.length);
      const randomCard = majorCards[randomIndex];

      setCard(randomCard);
      setHasDrawnToday(true);
      const now = new Date().getTime().toString();
      localStorage.setItem(LAST_DRAW_KEY, now);
      localStorage.setItem(DAILY_CARD_KEY, JSON.stringify(randomCard));
      startCountdown();
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถดึงข้อมูลไพ่ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }, [hasDrawnToday, startCountdown]);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-md px-4 absolute top-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/60 cursor-pointer hover:bg-pink-100 transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-pink-700" />
        </div>
      </div>

      <header className="text-center mt-10 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-pink-700 font-serif flex justify-center items-center gap-2 mb-2">
          <Heart className="text-pink-600 w-6 h-6" />
          ไพ่ทำนายความรัก
        </h1>
        <p className="text-sm text-pink-500">เปิดไพ่ Major Arcana เพื่อทำนายด้านความรัก</p>
        <p className="text-sm text-pink-500">(เปิดได้วันละ 1 ครั้ง)</p>
      </header>

      <button
        onClick={fetchLoveCard}
        disabled={loading || hasDrawnToday}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${
          loading || hasDrawnToday
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-pink-600 text-white hover:bg-pink-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ไพ่กำลังเผยความรักของคุณ...
          </>
        ) : hasDrawnToday ? (
          <>
            <TimerIcon className="w-5 h-5 mr-2" />
            เปิดไพ่ได้อีกใน: {countdown}
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            เปิดไพ่ความรักของคุณ
          </>
        )}
      </button>

      <main className="w-full flex justify-center">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
            {error}
          </div>
        )}

        {!loading && !error && card && <CardDisplay card={card} mode="love" />}
      </main>

      {!card && !loading && !error && (
        <div className="text-center p-6 bg-pink-50 rounded-xl border border-pink-200 mt-6 max-w-xs">
          <p className="text-base text-pink-700">
            ไพ่ทาโรต์เชื่อมโยงกับดวงชะตาของคุณ
          </p>
          <p className="text-base text-pink-700">โปรดตั้งจิตก่อนกดเปิดไพ่</p>
        </div>
      )}
    </div>
  );
};

export default TarotLove;