import React, { useState } from "react";
import { Loader2, ChevronLeftIcon, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";

const API_URL = "https://lucky-day-api.vercel.app/lucky_day.json";

interface LuckyDayData {
    thai_name: string;
    element: string;
    lucky_color: string[];
    unlucky_color: string[];
    personality: string;
    career: string;
    finance: string;
    love: string;
    lucky_number: number[];
    tips: string;
}

const Lucky7Days: React.FC = () => {
    const navigate = useNavigate();
    const [day, setDay] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<LuckyDayData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 🎨 สีธีมตามวัน
    const themeColors: Record<string, string> = {
        Sunday: "from-red-100 to-white",
        Monday: "from-yellow-100 to-white",
        Tuesday: "from-pink-100 to-white",
        Wednesday: "from-green-100 to-white",
        Thursday: "from-orange-100 to-white",
        Friday: "from-blue-100 to-white",
        Saturday: "from-purple-100 to-white",
    };

    const days = [
        { value: "Sunday", label: "วันอาทิตย์", color: "text-red-600" },
        { value: "Monday", label: "วันจันทร์", color: "text-yellow-500" },
        { value: "Tuesday", label: "วันอังคาร", color: "text-pink-600" },
        { value: "Wednesday", label: "วันพุธ", color: "text-green-600" },
        { value: "Thursday", label: "วันพฤหัสบดี", color: "text-orange-500" },
        { value: "Friday", label: "วันศุกร์", color: "text-blue-500" },
        { value: "Saturday", label: "วันเสาร์", color: "text-purple-600" },
    ];

    const handleSubmit = async () => {
        if (!day) {
            setError("กรุณาเลือกวันเกิดของคุณ");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อ API ได้");
            const data = await response.json();
            const found = data[day];
            if (!found) {
                setError("ไม่พบข้อมูลวันเกิดนี้ในระบบ");
            } else {
                setResult(found);
            }
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-700 bg-linear-to-b ${themeColors[day] || "from-yellow-50 to-white"
                } flex flex-col items-center p-4 font-sans relative`}
        >
            {/* ปุ่มกลับ */}
            <div className="w-full max-w-md px-4 absolute top-4">
                <div
                    onClick={() => navigate("/")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-yellow-100 cursor-pointer transition"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                </div>
            </div>

            {/* หัวข้อ */}
            <header className="text-center mt-12 mb-6 w-full">
                <h1 className="text-3xl font-extrabold text-yellow-700 font-serif mb-2">
                    ดูดวงวันเกิดของคุณ
                </h1>
                <p className="text-sm text-gray-500">เลือกวันเกิดและกด "ดูคำทำนาย"</p>
            </header>

            {/* ตัวเลือกวันเกิด */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 w-full max-w-md mx-auto">
                {days.map((d, index) => {
                    if (index === days.length - 1) {
                        return (
                            <div
                                key={d.value}
                                className="col-span-2 sm:col-span-3 flex justify-center"
                            >
                                <Card
                                    className={`w-[50%] sm:w-1/3 cursor-pointer text-center p-3 rounded-2xl border-2 transition-all duration-300
              ${day === d.value
                                            ? "border-yellow-500 bg-yellow-50 shadow-lg scale-105"
                                            : "border-transparent hover:border-yellow-300"}
            `}
                                    onClick={() => setDay(d.value)}
                                >
                                    <p className={`font-bold ${d.color}`}>{d.label}</p>
                                </Card>
                            </div>
                        );
                    }

                    // กล่องปกติ
                    return (
                        <Card
                            key={d.value}
                            className={`cursor-pointer text-center p-3 rounded-2xl border-2 transition-all duration-300
          ${day === d.value
                                    ? "border-yellow-500 bg-yellow-50 shadow-lg scale-105"
                                    : "border-transparent hover:border-yellow-300"}
        `}
                            onClick={() => setDay(d.value)}
                        >
                            <p className={`font-bold ${d.color}`}>{d.label}</p>
                        </Card>
                    );
                })}
            </div>

            {/* ปุ่มทำนาย */}
            <Button
                onClick={handleSubmit}
                disabled={loading}
                color="warning"
                className="w-full max-w-xs mb-6 font-bold rounded-full text-md bg-gray-200 h-12"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        กำลังโหลดข้อมูล...
                    </>
                ) : (
                    <>
                        <Calendar className="w-5 h-5 mr-2" />
                        ดูคำทำนาย
                    </>
                )}
            </Button>

            {/* แสดงผล */}
            <main className="w-full flex justify-center">
                {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
                        {error}
                    </div>
                )}

                {!loading && !error && result && (
                    <div className="bg-white rounded-2xl shadow-md p-5 border border-yellow-200 max-w-md w-full text-left">
                        <h2 className="text-xl font-bold text-yellow-700 mb-2 text-center">
                            {result.thai_name}
                        </h2>
                        <p className="text-center text-gray-600 mb-4">
                            ธาตุประจำวัน: <b>{result.element}</b>
                        </p>

                        <div className="space-y-3 text-gray-700 leading-relaxed">
                            <p>
                                <b>🎨 สีมงคล:</b> {result.lucky_color.join(", ")}
                            </p>
                            <p>
                                <b>🚫 สีกาลกิณี:</b> {result.unlucky_color.join(", ")}
                            </p>
                            <p>
                                <b>👤 นิสัยพื้นฐาน:</b> {result.personality}
                            </p>
                            <p>
                                <b>💼 การงาน:</b> {result.career}
                            </p>
                            <p>
                                <b>💰 การเงิน:</b> {result.finance}
                            </p>
                            <p>
                                <b>💖 ความรัก:</b> {result.love}
                            </p>
                            <p>
                                <b>🍀 เลขมงคล:</b> {result.lucky_number.join(", ")}
                            </p>
                            <p className="text-center">
                                <b>✨ เคล็ดลับเสริมดวง ✨</b>
                                <p>{result.tips}</p>
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Lucky7Days;
