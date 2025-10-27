import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  RefreshCcw,
  Loader2,
  ChevronLeftIcon,
  TimerIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ALL_FORTUNE_URL =
  "https://fortune-sticks-api.vercel.app/fortune_sticks_28.json";

const LAST_DRAW_KEY = "fortuneSticksLastDraw";
const DAILY_DATA_KEY = "fortuneSticksDailyData";

interface FortuneData {
  type: string;
  name_short: string;
  name: string;
  value: string;
  value_int: number;
  meaning_th: string;
  lucky_number: string;
  image?: string;
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

const FortuneSticks: React.FC = () => {
  const navigate = useNavigate();
  const [fortune, setFortune] = useState<FortuneData | null>(null);
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
        localStorage.removeItem(DAILY_DATA_KEY);
        setFortune(null);
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
    const savedData = localStorage.getItem(DAILY_DATA_KEY);
    const lastMidnight = getLastMidnight();

    if (lastDrawTimestamp && parseInt(lastDrawTimestamp, 10) > lastMidnight) {
      setHasDrawnToday(true);
      if (savedData) {
        setFortune(JSON.parse(savedData));
      }
      startCountdown();
    } else {
      setHasDrawnToday(false);
      localStorage.removeItem(LAST_DRAW_KEY);
      localStorage.removeItem(DAILY_DATA_KEY);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [startCountdown]);

  const fetchRandomFortune = useCallback(async () => {
    if (hasDrawnToday) return;

    setLoading(true);
    setError(null);
    setFortune(null);

    try {
      const response = await fetch(ALL_FORTUNE_URL);
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();

      const list =
        Array.isArray(data)
          ? data
          : data.sticks || data.fortunes || data.items || [];

      if (list.length === 0) throw new Error("ไม่พบข้อมูลเซียมซี");

      const randomIndex = Math.floor(Math.random() * list.length);
      const randomFortune = list[randomIndex];

      setFortune(randomFortune);
      setHasDrawnToday(true);
      const now = new Date().getTime().toString();
      localStorage.setItem(LAST_DRAW_KEY, now);
      localStorage.setItem(DAILY_DATA_KEY, JSON.stringify(randomFortune));
      startCountdown();

    } catch (err) {
      console.error(err);
      setError("ไม่สามารถดึงข้อมูลเซียมซีได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }, [hasDrawnToday, startCountdown]);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white flex flex-col items-center p-4 font-sans relative">
      <div className="w-full max-w-md px-4 absolute top-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-amber-100 cursor-pointer transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
        </div>
      </div>

      <header className="text-center mt-12 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-amber-800 font-serif">
          เซียมซีทำนายโชคชะตา
        </h1>
        <p className="text-sm text-gray-500">เสี่ยงเซียมซี 1 แท่ง จากทั้งหมด 28 แท่ง</p>
        <p className="text-sm text-gray-500">(เสี่ยงได้วันละ 1 ครั้ง)</p>
      </header>

      <button
        onClick={fetchRandomFortune}
        disabled={loading || hasDrawnToday}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${
          loading || hasDrawnToday
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-amber-600 text-white hover:bg-amber-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            กำลังเขย่าเซียมซี...
          </>
        ) : hasDrawnToday ? (
          <>
            <TimerIcon className="w-5 h-5 mr-2" />
            เขย่าได้อีกใน: {countdown}
          </>
        ) : (
          <>
            <RefreshCcw className="w-5 h-5 mr-2" />
            เขย่าเซียมซีของคุณวันนี้
          </>
        )}
      </button>
      <main className="w-full flex justify-center">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
            {error}
          </div>
        )}

        {!loading && !error && fortune && (
          <div className="bg-white rounded-2xl shadow-md p-5 border border-amber-200 max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-amber-800 mb-2">
              เซียมซีใบที่ {fortune.value_int}
            </h2>

            {fortune && (
              <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center leading-relaxed">
                <div className="text-gray-700 whitespace-pre-line">
                  {fortune.meaning_th
                    .replace(/( )+/g, " ")
                    .replace(/([" "])/g, "$1\n")
                    .replace(/([ฯ])/g, "$1\n")
                    .replace(/([?])/g, "$1\n")
                    .trim()}
                </div>

                <p className="mt-4 text-gray-600 text-xl font-semibold">
                  <b>เลขนำโชค:</b> {fortune.lucky_number}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {!fortune && !loading && !error && (
        <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200 mt-6 max-w-xs">
          <p className="text-base text-amber-700">
            กดปุ่ม “เขย่าเซียมซี” เพื่อเริ่มต้น
          </p>
        </div>
      )}
    </div>
  );
};

export default FortuneSticks;
