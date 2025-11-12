import React, { useState, useCallback } from "react";
import { Loader2, ChevronLeftIcon, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://home-address-api.vercel.app/house_fortune_th.json";

interface HouseData {
  number: number;
  meaning: string;
  house_fortune: {
    positive: string;
    negative: string;
    suitable_for: string;
    fengshui_tip: string;
  };
}

const HouseFortune: React.FC = () => {
  const navigate = useNavigate();
  const [houseNumber, setHouseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HouseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractDigits = (input: string) => input.replace(/[^0-9]/g, "");

  const calculateHouseSum = (digits: string): number => {
    const total = digits
      .split("")
      .map((n) => parseInt(n, 10))
      .reduce((a, b) => a + b, 0);

    // ถ้าเป็นเลขมาสเตอร์ 11, 22, 33 ให้คงไว้
    if ([11, 22, 33].includes(total)) return total;

    // ถ้าเกิน 9 ให้บวกจนเหลือเลขเดียว
    return total > 9 ? calculateHouseSum(String(total)) : total;
  };

  const handleSubmit = useCallback(async () => {
    const digits = extractDigits(houseNumber);
    if (!digits) {
      setError("กรุณากรอกเลขที่บ้านก่อนคำนวณ");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const total = calculateHouseSum(digits);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อ API ได้");

      const data: HouseData[] = await response.json();
      const found = data.find((item) => item.number === total);

      if (!found) {
        setError(`ไม่พบคำทำนายสำหรับเลข ${total}`);
      } else {
        setResult(found);
      }
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  }, [houseNumber]);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col items-center p-4 font-sans relative">
      {/* ปุ่มกลับ */}
      <div className="w-full max-w-md px-4 absolute top-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-blue-100 cursor-pointer transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
        </div>
      </div>

      <header className="text-center mt-12 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-blue-800 font-serif">
          ทำนายเลขที่บ้าน
        </h1>
        <p className="text-sm text-gray-500">
          วิเคราะห์พลังตัวเลขจากเลขที่บ้านหรือคอนโดของคุณ
        </p>
      </header>

      <div className="w-full max-w-xs mb-6">
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          placeholder="เช่น 128/45 หรือ 99/9"
          className="w-full px-4 py-3 border rounded-full text-center text-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !houseNumber}
        className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${
          loading || !houseNumber
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            กำลังคำนวณ...
          </>
        ) : (
          <>
            <Home className="w-5 h-5 mr-2" />
            ทำนายเลขที่บ้าน
          </>
        )}
      </button>

      <main className="w-full flex justify-center">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
            {error}
          </div>
        )}

        {!loading && !error && result && (
          <div className="bg-white rounded-2xl shadow-md p-5 border border-blue-200 max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              ผลรวมเลขที่บ้าน: {result.number}
            </h2>
            <p className="text-gray-600 mb-3">{result.meaning}</p>

            <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base text-left">
              <p className="mb-3">
                <b className="text-green-700">พลังบวก:</b>{" "}
                {result.house_fortune.positive}
              </p>
              <p className="mb-3">
                <b className="text-red-600">ข้อควรระวัง:</b>{" "}
                {result.house_fortune.negative}
              </p>
              <p className="mb-3">
                <b>เหมาะกับ:</b> {result.house_fortune.suitable_for}
              </p>
              <p>
                <b>เคล็ดลับฮวงจุ้ย:</b> {result.house_fortune.fengshui_tip}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HouseFortune;
