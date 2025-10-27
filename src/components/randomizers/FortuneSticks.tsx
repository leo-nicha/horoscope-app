import React, { useState, useCallback } from "react";
import { RefreshCcw, Loader2, ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ALL_FORTUNE_URL = "https://fortune-sticks-api.vercel.app/fortune_sticks_28.json";

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

const FortuneSticks: React.FC = () => {
    const navigate = useNavigate();
    const [fortune, setFortune] = useState<FortuneData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /** 🪄 ฟังก์ชันสุ่มเซียมซี */
    const fetchRandomFortune = useCallback(async () => {
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
        } catch (err) {
            console.error(err);
            setError("ไม่สามารถดึงข้อมูลเซียมซีได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-amber-50 to-white flex flex-col items-center p-4 font-sans relative">
            {/* 🔙 ปุ่มกลับ */}
            <div className="w-full max-w-md px-4 absolute top-4">
                <div
                    onClick={() => navigate("/")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-amber-100 cursor-pointer transition"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                </div>
            </div>

            {/* 🧧 Header */}
            <header className="text-center mt-12 mb-6 w-full">
                <h1 className="text-3xl font-extrabold text-amber-800 font-serif">
                    เซียมซีทำนายโชคชะตา
                </h1>
                <p className="text-sm text-gray-500">สุ่มเซียมซี 1 ใบ จากทั้งหมด 28 ใบ</p>
            </header>

            {/* 🔮 ปุ่มสุ่มเซียมซี */}
            <button
                onClick={fetchRandomFortune}
                disabled={loading}
                className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                    }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        กำลังเขย่าเซียมซี...
                    </>
                ) : (
                    <>
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        เขย่าเซียมซีของคุณวันนี้
                    </>
                )}
            </button>

            {/* 🪔 แสดงผลเซียมซี */}
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
                        {/* <p className="text-lg font-semibold text-amber-700 mb-2">{fortune.title}</p>
                        <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{fortune.content}</p> */}

                        {fortune && (
                            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center leading-relaxed">

                                {/* 🪶 คำทำนาย แยกบรรทัดโดยใช้ regex */}
                                <div className="text-gray-700 whitespace-pre-line">
                                    {fortune.meaning_th
                                        .replace(/( )+/g, " ")            // ลบช่องว่างซ้ำ
                                        .replace(/([" "])/g, "$1\n")        // ขึ้นบรรทัดใหม่เมื่อเจอจุด (.)
                                        .replace(/([ฯ])/g, "$1\n")        // หรือขึ้นบรรทัดเมื่อเจอ ฯ
                                        .replace(/([?])/g, "$1\n")        // หรือ ? (ถ้ามี)
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
                    <p className="text-base text-amber-700">กดปุ่ม “เขย่าเซียมซี” เพื่อเริ่มต้น</p>
                </div>
            )}
        </div>
    );
};

export default FortuneSticks;
