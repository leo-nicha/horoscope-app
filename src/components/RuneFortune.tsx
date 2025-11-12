import React, { useState, useCallback, useEffect, useRef } from "react";
import { RefreshCcw, Loader2, ChevronLeftIcon, TimerIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RUNE_API_URL = "https://rune-api.vercel.app/api/runes/draw?count=3";

const LAST_DRAW_KEY = "runesLastDraw";
const DAILY_DATA_KEY = "runesDailyData";

const getLastMidnight = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
};

// const getNextMidnight = () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0);
//     return tomorrow.getTime();
// };

const formatTime = (num: number) => num.toString().padStart(2, "0");

interface RuneData {
    position: string;
    symbol: string;
    name: string;
    meaning: string;
    interpretation: string;
}

const RuneFortune: React.FC = () => {
    const navigate = useNavigate();
    const [runes, setRunes] = useState<RuneData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasDrawnToday, setHasDrawnToday] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<string>("");
    const timerIntervalRef = useRef<number | null>(null);

    const getNextMonth = () => {
  const now = new Date();
  // เดือนถัดไป
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  nextMonth.setHours(0, 0, 0, 0);
  return nextMonth.getTime();
};

const startCountdown = useCallback(() => {
  if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

  timerIntervalRef.current = window.setInterval(() => {
    const now = new Date().getTime();
    const nextMonth = getNextMonth();
    const distance = nextMonth - now;

    if (distance < 0) {
      clearInterval(timerIntervalRef.current!);
      setHasDrawnToday(false);
      setCountdown("");
      localStorage.removeItem(LAST_DRAW_KEY);
      localStorage.removeItem(DAILY_DATA_KEY);
      setRunes(null);
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${days} วัน ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
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
                setRunes(JSON.parse(savedData));
            }
            startCountdown();
        } else {
            setHasDrawnToday(false);
            localStorage.removeItem(LAST_DRAW_KEY);
            localStorage.removeItem(DAILY_DATA_KEY);
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [startCountdown]);

    const fetchRandomRunes = useCallback(async () => {
        if (hasDrawnToday) return;

        setLoading(true);
        setError(null);
        setRunes(null);

        try {
            const response = await fetch(RUNE_API_URL);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data: RuneData[] = await response.json();

            setRunes(data);
            setHasDrawnToday(true);
            const now = new Date().getTime().toString();
            localStorage.setItem(LAST_DRAW_KEY, now);
            localStorage.setItem(DAILY_DATA_KEY, JSON.stringify(data));
            startCountdown();
        } catch (err) {
            console.error(err);
            setError("ไม่สามารถดึงข้อมูลรูนได้ กรุณาลองใหม่อีกครั้ง");
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
                <h1 className="text-3xl font-extrabold text-amber-800 font-serif mb-2">
                    อักษรรูนพยากรณ์
                </h1>
                <p className="text-sm text-gray-500">พยากรณ์ได้ 1 ครั้งในรอบเดือน</p>
            </header>

            <button
                onClick={fetchRandomRunes}
                disabled={loading || hasDrawnToday}
                className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${loading || hasDrawnToday
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-amber-600 text-white hover:bg-amber-700"
                    }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        กำลังหยิบรูน...
                    </>
                ) : hasDrawnToday ? (
                    <>
                        <TimerIcon className="w-5 h-5 mr-2" />
                        ทำนายได้อีกครั้งใน: {countdown}
                    </>
                ) : (
                    <>
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        หยิบรูนของคุณ
                    </>
                )}
            </button>

            <main className="w-full flex justify-center">
                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
                        {error}
                    </div>
                )}

                {!loading && !error && runes && (
                    <div className="bg-black rounded-2xl shadow-md p-5 border border-amber-200 max-w-md w-full text-center">
                        {runes.map((rune) => (
                            <div key={rune.symbol} className="bg-white shadow-lg rounded-2xl p-6 w-full mb-4 text-center leading-relaxed">
                                <p className="mb-2 text-gray-600 text-xl font-semibold">
                                    <b>ตำแหน่ง:</b> {rune.position}
                                </p>
                                <div className="text-5xl mb-2">{rune.symbol}</div>
                                <h2 className="text-xl font-bold text-amber-800">{rune.name}</h2>
                                <p className="mt-2 text-gray-700">{rune.meaning}</p>
                                <p className="mt-2 text-gray-800 font-bold">{rune.interpretation}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {!runes && !loading && !error && (
                <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200 mt-6 max-w-xs">
                    <p className="text-base text-amber-700">
                        กดปุ่ม “สุ่มรูน” เพื่อเริ่มทำนาย
                    </p>
                </div>
            )}
        </div>
    );
};

export default RuneFortune;
