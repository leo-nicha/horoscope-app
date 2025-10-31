import React, { useState } from "react";
import { Loader2, ChevronLeftIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";

const API_URL = "https://western-zodiac-api.vercel.app/western_zodiac_12.json";

interface ZodiacData {
    zodiac_en: string;
    zodiac_th: string;
    symbol: string;
    element: string;
    date_range: string;
    personality: string;
    career: string;
    love: string;
    finance: string;
    compatible: string[];
    enemy: string[];
    lucky_color: string[];
    lucky_number: number[];
    tips: string;
}

const WesternZodiac: React.FC = () => {
    const navigate = useNavigate();
    const [zodiac, setZodiac] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ZodiacData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const zodiacs = [
        { key: "Aries", label: "21&nbsp;มี.ค - 19&nbsp;เม.ย.", emoji: "♈", imageUrl: "/zodiac/Aries.png" },
        { key: "Taurus", label: "20&nbsp;เม.ย. - 20&nbsp;พ.ค.", emoji: "♉", imageUrl: "/zodiac/Taurus.png" },
        { key: "Gemini", label: "21&nbsp;พ.ค. - 20&nbsp;มิ.ย.", emoji: "♊", imageUrl: "/zodiac/Gemini.png" },
        { key: "Cancer", label: "21&nbsp;มิ.ย. - 22&nbsp;ก.ค.", emoji: "♋", imageUrl: "/zodiac/Cancer.png" },
        { key: "Leo", label: "23&nbsp;ก.ค. - 22&nbsp;ส.ค.", emoji: "♌", imageUrl: "/zodiac/Leo.png" },
        { key: "Virgo", label: "23&nbsp;ส.ค. - 22&nbsp;ก.ย.", emoji: "♍", imageUrl: "/zodiac/Virgo.png" },
        { key: "Libra", label: "23&nbsp;ก.ย. - 22&nbsp;ต.ค.", emoji: "♎", imageUrl: "/zodiac/Libra.png" },
        { key: "Scorpio", label: "23&nbsp;ต.ค. - 21&nbsp;พ.ย.", emoji: "♏", imageUrl: "/zodiac/Scorpio.png" },
        { key: "Sagittarius", label: "22&nbsp;พ.ย. - 21&nbsp;ธ.ค.", emoji: "♐", imageUrl: "/zodiac/Sagittarius.png" },
        { key: "Capricorn", label: "22&nbsp;ธ.ค. - 19&nbsp;ม.ค.", emoji: "♑", imageUrl: "/zodiac/Capricorn.png" },
        { key: "Aquarius", label: "20&nbsp;ม.ค. - 18&nbsp;ก.พ.", emoji: "♒", imageUrl: "/zodiac/Aquarius.png" },
        { key: "Pisces", label: "19&nbsp;ก.พ. - 20&nbsp;มี.ค.", emoji: "♓", imageUrl: "/zodiac/Pisces.png" },
    ];

    const handleSubmit = async () => {
        if (!zodiac) {
            setError("กรุณาเลือกราศีของคุณ");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อ API ได้");
            const data = await response.json();
            const found = data[zodiac];

            if (!found) {
                setError("ไม่พบข้อมูลราศีนี้ในระบบ");
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
            className="min-h-screen bg-linear-to-b from-indigo-50 to-white flex flex-col items-center p-4 font-sans relative transition-all duration-700"
            style={{
                backgroundImage: `url("/zodiac/zodiac_bg.gif")`,
                backgroundSize: "cover",   
                backgroundPosition: "center", 
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            {/* ปุ่มกลับ */}
            <div className="w-full max-w-md px-4 absolute top-4">
                <div
                    onClick={() => navigate("/")}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-indigo-100 cursor-pointer transition"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                </div>
            </div>

            {/* หัวข้อ */}
            <header className="text-center mt-12 mb-6 w-full">
                <h1 className="text-3xl font-extrabold text-amber-300 font-serif mb-2">
                    ดูดวง 12 ราศี
                </h1>
                <p className="text-sm text-amber-100">เลือกราศีของคุณเพื่อดูคำทำนาย</p>
            </header>

            {/* ตัวเลือกราศี */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6 w-full max-w-md mx-auto">
                {zodiacs.map((z) => (
                    <Card
                        key={z.key}
                        className={`h-30 relative cursor-pointer text-center py-3 rounded-2xl border-2 overflow-hidden transition-all duration-300 flex flex-col justify-center items-center bg-amber-200
        ${zodiac === z.key
                                ? "border-indigo-500 bg-indigo-100 shadow-lg scale-105"
                                : "border-transparent hover:border-indigo-300"
                            }
      `}
                        onClick={() => setZodiac(z.key)}
                        style={
                            z.imageUrl
                                ? {
                                    backgroundImage: `url(${z.imageUrl})`,
                                    backgroundSize: "100% 98%",
                                    backgroundPosition: "center",
                                }
                                : {}
                        }
                    >
                        {/* overlay โปร่งใส */}
                        {z.imageUrl && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
                        )}

                        {/* เนื้อหาการ์ด */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <p className="text-3xl text-white drop-shadow-md">{z.emoji}</p>
                            <p
                                className="font-bold text-sm whitespace-pre-line leading-tight text-center drop-shadow-md"
                                dangerouslySetInnerHTML={{
                                    __html: z.label.replace(/\s+/g, "<br />"),
                                }}
                            />
                        </div>
                    </Card>
                ))}
            </div>

            {/* ปุ่มดูคำทำนาย */}
            <Button
                onClick={handleSubmit}
                disabled={loading}
                color="info"
                className="w-full max-w-xs mb-6 font-bold rounded-full text-md bg-gray-200 h-12"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        กำลังโหลดข้อมูล...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5 mr-2 " />
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
                    <div className="bg-amber-50 rounded-2xl shadow-md p-5 border border-indigo-200 max-w-md w-full text-left">
                        <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">
                            {result.symbol} {result.zodiac_th}
                        </h2>
                        <p className="text-center text-gray-600 mb-4">
                            ธาตุประจำราศี: <b>{result.element}</b> <br />
                            ({result.date_range})
                        </p>

                        <div className="space-y-3 text-gray-700 leading-relaxed">
                            <p><b>👤 บุคลิกภาพ:</b> {result.personality}</p>
                            <p><b>💼 การงาน:</b> {result.career}</p>
                            <p><b>💖 ความรัก:</b> {result.love}</p>
                            <p><b>💰 การเงิน:</b> {result.finance}</p>
                            <p><b>✔️ มิตร:</b> {result.compatible.join(", ")}</p>
                            <p><b>✖️ ศัตรู:</b> {result.enemy.join(", ")}</p>
                            <p><b>🎨 สีมงคล:</b> {result.lucky_color.join(", ")}</p>
                            <p><b>🍀 เลขมงคล:</b> {result.lucky_number.join(", ")}</p>

                            <div className="text-center mt-4">
                                <b>✨ เคล็ดลับเสริมดวง ✨</b>
                                <p className="mt-1">{result.tips}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default WesternZodiac;
