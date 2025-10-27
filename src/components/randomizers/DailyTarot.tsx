import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  RefreshCcw,
  Loader2,
  ChevronLeftIcon,
  TimerIcon,
} from "lucide-react";
import CardDisplay from "../cards/CardDisplay";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://tarot-api-lyart.vercel.app";
const ALL_CARDS_URL = `${BASE_URL}/tarot_deck_78.json`;

const LAST_DRAW_KEY = "dailyTarotLastDraw";
const DAILY_CARD_KEY = "dailyTarotDailyCard";

interface CardData {
  name: string;
  img: string;
  meaning_up: string;
  desc: string;
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

const DailyTarot: React.FC = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState<CardData | null>(null);
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

  const fetchRandomCard = useCallback(async () => {
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

      if (cardList.length === 0) {
        throw new Error("ไม่พบข้อมูลไพ่ในสำรับ");
      }

      const randomIndex = Math.floor(Math.random() * cardList.length);
      const randomCard = cardList[randomIndex];

      const cardName = randomCard?.name;
      if (!cardName) {
        throw new Error("ไม่พบชื่อไพ่ในข้อมูลที่ดึงมา");
      }

      const oneCardResponse = await fetch(
        `${BASE_URL}/api/cards/${encodeURIComponent(cardName)}`
      );
      if (!oneCardResponse.ok)
        throw new Error(`Error: ${oneCardResponse.status}`);

      const cardDetail: CardData = await oneCardResponse.json();

      setCard(cardDetail); 
      setHasDrawnToday(true); 
      const now = new Date().getTime().toString();
      localStorage.setItem(LAST_DRAW_KEY, now);
      localStorage.setItem(DAILY_CARD_KEY, JSON.stringify(cardDetail));
      startCountdown();

    } catch (err) {
      console.error(err);
      setError("ไม่สามารถดึงข้อมูลไพ่ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }, [hasDrawnToday, startCountdown]);

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-md px-4 absolute top-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50">
          <ChevronLeftIcon
            onClick={() => navigate("/")}
            className="h-5 w-5 text-gray-800"
          />
        </div>
      </div>
      <header className="text-center mt-10 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-indigo-900 font-serif mb-2">
          ดูดวงรายวัน
        </h1>
        <p className="text-sm text-gray-500">เปิดไพ่ทาโรต์ 1 ใบจากสำรับ 78 ใบ</p>
        <p className="text-sm text-gray-500">(เปิดได้วันละ 1 ครั้ง)</p>
      </header>

      <button
        onClick={fetchRandomCard}
        disabled={loading || hasDrawnToday}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${
          loading || hasDrawnToday
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ไพ่จะบอกความจริงกับคุณ...
          </>
        ) : hasDrawnToday ? (
          <>
            <TimerIcon className="w-5 h-5 mr-2" />
            เปิดไพ่ได้อีกใน: {countdown}
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            เปิดไพ่ของคุณในวันนี้
          </>
        )}
      </button>

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
          <p className="text-base text-indigo-700">
            ไพ่ทาโรต์เชื่อมโยงกับดวงชะตาของคุณ
          </p>
          <p className="text-base text-indigo-700">โปรดตั้งจิตก่อนกดเปิดไพ่</p>
        </div>
      )}
    </div>
  );
};

export default DailyTarot;
