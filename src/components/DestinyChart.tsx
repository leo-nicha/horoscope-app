import React, { useState } from "react";
import { Loader2, ChevronLeftIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DestinyChartData {
  name: string;
  input?: {
    birth: string;
    topic: string;
  };
  chart: {
    lagnamName: string;
    planets_position: {
      planet: string;
      houseIndex: number;
      houseName: string;
      status: any;
    }[];
  };
  interpretation: {
    personality?: Record<string, string>;
    career?: Record<string, string>;
    love?: Record<string, string>;
    finance?: Record<string, string>;
  };
  generated_at?: string;
}

const DestinyChart: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DestinyChartData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !birthDate || !birthTime) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน: ชื่อ, วันเกิด, และเวลาเกิด");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // รวมวันและเวลาเป็น ISO string
      const birthISO = `${birthDate}T${birthTime}`;
      const url = `https://destiny-chart-api.vercel.app/api?birth=${encodeURIComponent(
        birthISO
      )}&topic=all`;

      const response = await fetch(url);
      const text = await response.text();

      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("API ส่งข้อมูลที่ไม่ถูกต้อง");
      }
      if (!response.ok) throw new Error(json.error || "เกิดข้อผิดพลาดจาก API");

      setResult({ name, ...json });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "เกิดข้อผิดพลาด");
    }

    setLoading(false);
  };

  // ล้างข้อมูล
  const resetForm = () => {
    setResult(null);
    setError(null);
    setName("");
    setBirthDate("");
    setBirthTime("");
  };

  // รวมข้อความคำทำนายจาก interpretation ทั้งหมดเป็นสรุปสั้น ๆ
  const summarizeInterpretation = (data?: Record<string, string>) => {
    if (!data) return "—";
    const values = Object.values(data);
    if (values.length === 0) return "—";
    return values.slice(0, 3).join(" ");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white flex flex-col items-center p-4 font-sans relative">
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
        <h1 className="text-3xl font-extrabold text-indigo-700 font-serif mb-2">
          วิเคราะห์ดวงชะตา
        </h1>
        <p className="text-sm text-gray-500">
          กรอกข้อมูลเพื่อดูคำทำนายพื้นดวงผูกลัคนา
        </p>
      </header>

      {/* ======================= FORM ======================= */}
      {!result && (
        <div className="w-full max-w-md mx-auto mb-6 rounded-2xl shadow-lg border border-indigo-100 bg-white p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อของคุณ
              </label>
              <input
                disabled={loading}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="เช่น สมชาย"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วัน/เดือน/ปีเกิด (กรอกได้ทั้ง พ.ศ. หรือ ค.ศ.)
              </label>
              <input
                disabled={loading}
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เวลาเกิด (เช่น 09:30)
              </label>
              <input
                disabled={loading}
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <label className="text-center block text-sm font-medium text-red-500 mt-1">
                * หากไม่ทราบเวลาเกิด ใส่ฐานเวลาพยากรณ์ 06:00 *
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ปุ่มทำนาย */}
      {!result && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full max-w-xs mb-6 font-bold rounded-full text-md h-12 flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              กำลังคำนวณ...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              วิเคราะห์ดวงชะตา
            </>
          )}
        </button>
      )}

      {/* ======================= RESULT ======================= */}
      <main className="w-full flex justify-center">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
            {error}
          </div>
        )}

        {!loading && !error && result && (
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-indigo-200 max-w-md w-full text-left">
            <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">
              ดวงชะตาของคุณ {result.name}
            </h2>
            <p className="text-center text-gray-600 mb-4">
              ลัคนา: <b>{result.chart.lagnamName}</b>
            </p>

            {/* แยกคำทำนายเป็นหมวด */}
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-bold text-lg text-indigo-800">👤 บุคลิกภาพ</h3>
                <p>{summarizeInterpretation(result.interpretation.personality)}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-lg text-green-800">💼 การงาน</h3>
                <p>{summarizeInterpretation(result.interpretation.career)}</p>
              </div>

              <div className="bg-rose-50 rounded-lg p-4">
                <h3 className="font-bold text-lg text-rose-800">💖 ความรัก</h3>
                <p>{summarizeInterpretation(result.interpretation.love)}</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-bold text-lg text-amber-800">💰 การเงิน</h3>
                <p>{summarizeInterpretation(result.interpretation.finance)}</p>
              </div>
              <button
                onClick={resetForm}
                className="w-full mt-4 h-11 flex items-center justify-center rounded-lg bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                คำนวณใหม่
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DestinyChart;
