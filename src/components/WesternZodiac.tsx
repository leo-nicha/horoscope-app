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
    { key: "Aries", label: "ราศีเมษ", emoji: "♈" },
    { key: "Taurus", label: "ราศีพฤษภ", emoji: "♉" },
    { key: "Gemini", label: "ราศีเมถุน", emoji: "♊" },
    { key: "Cancer", label: "ราศีกรกฎ", emoji: "♋" },
    { key: "Leo", label: "ราศีสิงห์", emoji: "♌" },
    { key: "Virgo", label: "ราศีกันย์", emoji: "♍" },
    { key: "Libra", label: "ราศีตุลย์", emoji: "♎" },
    { key: "Scorpio", label: "ราศีพิจิก", emoji: "♏" },
    { key: "Sagittarius", label: "ราศีธนู", emoji: "♐" },
    { key: "Capricorn", label: "ราศีมังกร", emoji: "♑" },
    { key: "Aquarius", label: "ราศีกุมภ์", emoji: "♒" },
    { key: "Pisces", label: "ราศีมีน", emoji: "♓" },
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
        <h1 className="text-3xl font-extrabold text-indigo-700 font-serif mb-2">
          ดูดวง 12 ราศี
        </h1>
        <p className="text-sm text-gray-500">เลือกราศีของคุณเพื่อดูคำทำนาย</p>
      </header>

      {/* ตัวเลือกราศี */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6 w-full max-w-md mx-auto">
        {zodiacs.map((z) => (
          <Card
            key={z.key}
            className={`h-30 cursor-pointer text-center py-3 rounded-2xl border-2 transition-all duration-300 
              ${
                zodiac === z.key
                  ? "border-indigo-500 bg-indigo-50 shadow-lg scale-105"
                  : "border-transparent hover:border-indigo-300"
              }
            `}
            onClick={() => setZodiac(z.key)}
          >
            <p className="text-2xl mb-1">{z.emoji}</p>
            <p className="font-bold text-gray-700">{z.label}</p>
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
            <Sparkles className="w-5 h-5 mr-2" />
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
          <div className="bg-white rounded-2xl shadow-md p-5 border border-indigo-200 max-w-md w-full text-left">
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
