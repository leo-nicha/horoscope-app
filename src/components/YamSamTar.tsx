import React, { useState } from "react";
import { Loader2, ChevronLeftIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface YamResult {
    day: string;
    time: string;
    topic: string;
    currentYam: string;
    currentMeaning: string;
    thirdYam: string;
    thirdMeaning: string;
}

interface YamData {
    days: string[];
    yams: string[];
    yam_hours: Record<string, { start: string; end: string }>;
    table: Record<string, Record<string, string>>;
    meanings: Record<string, string>;
}

const YamSamTar: React.FC = () => {
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<YamResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // แปลงวันจาก date เป็นชื่อวันภาษาไทย
    const getThaiDay = (dateStr: string) => {
        const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
        const d = new Date(dateStr);
        return days[d.getDay()];
    };

    const dateNow = new Date();
    const todayStr = dateNow.toISOString().split("T")[0]; // YYYY-MM-DD
    const currentHour = dateNow.getHours();
    const currentMinute = dateNow.getMinutes();
    const timeNowStr = `${currentHour.toString().padStart(2, "0")}:${currentMinute
        .toString()
        .padStart(2, "0")}`;

    // แปลง topic เป็นเลขสำหรับตาที่สาม
    const topicToNumber = (topic: string) => {
        if (!topic) return 1;
        return (topic
            .split("")
            .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 7) + 1;
    };

    const handleSubmit = async () => {
        if (!date || !time || !topic) {
            setError("กรุณากรอกข้อมูลให้ครบ: วัน, เวลา และหัวข้อที่ต้องการเสี่ยงทาย");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch("https://yamsamtar-api.vercel.app/data/yamsamtar.json");
            const data: YamData = await res.json();

            const day = getThaiDay(date);

            const [hour, minute] = time.split(":").map(Number);
            const totalMinutes = hour * 60 + minute;

            const yamEntry = Object.entries(data.yam_hours).find(([_, range]) => {
                const [sh, sm] = range.start.split(":").map(Number);
                const [eh, em] = range.end.split(":").map(Number);
                const s = sh * 60 + sm;
                const e = eh * 60 + em;
                return totalMinutes >= s && totalMinutes <= e;
            });

            if (!yamEntry) throw new Error("ไม่พบยามที่ตรงกับเวลา");

            const currentYam = yamEntry[0];
            const currentMeaningKey = data.table[day]?.[currentYam];
            const currentMeaning = data.meanings[currentMeaningKey] || "ไม่มีคำทำนาย";

            // ตาที่สาม: ใช้ topic แปลงเป็นเลข
            const thirdIndex = topicToNumber(topic) - 1;
            const thirdYam = data.yams[thirdIndex % data.yams.length];
            const thirdMeaningKey = data.table[day]?.[thirdYam];
            const thirdMeaning = data.meanings[thirdMeaningKey] || "ไม่มีคำทำนาย";

            setResult({
                day,
                time,
                topic,
                currentYam: `${currentYam} (${currentMeaningKey})`,
                currentMeaning,
                thirdYam: `${thirdYam} (${thirdMeaningKey})`,
                thirdMeaning,
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "เกิดข้อผิดพลาด");
        }

        setLoading(false);
    };

    const resetForm = () => {
        setResult(null);
        setError(null);
        setDate("");
        setTime("");
        setTopic("");
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-yellow-50 to-white flex flex-col items-center p-4 font-sans relative">
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
                    ทำนายยามสามตา
                </h1>
                <p className="text-sm text-gray-500">กรอกข้อมูลเพื่อดูคำทำนายประจำวันและเวลา</p>
            </header>

            {/* Form */}
            {!result && (
                <div className="w-full max-w-md mx-auto mb-6 rounded-2xl shadow-lg border border-yellow-100 bg-white p-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">วันที่ต้องการทำนาย</label>
                            <input
                                disabled={loading}
                                type="date"
                                value={date}
                                min={todayStr}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">เวลา (เช่น 09:30)</label>
                            <input
                                disabled={loading}
                                type="time"
                                value={time}

                                min={date === todayStr ? timeNowStr : undefined}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                หัวข้อที่ต้องการเสี่ยงทาย
                            </label>
                            <input
                                disabled={loading}
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                placeholder="เช่น การเดินทาง, การงาน, ความรัก"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ปุ่มทำนาย */}
            {!result && (
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full max-w-xs mb-6 font-bold rounded-full text-md h-12 flex items-center justify-center bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-yellow-300 transition-colors"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            กำลังทำนาย...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            ทำนายยามสามตา
                        </>
                    )}
                </button>
            )}

            {/* ผลลัพธ์ */}
            {result && !error && (
                <div className="bg-white rounded-2xl shadow-lg p-5 border border-yellow-200 max-w-md w-full text-left">
                    <h2 className="text-xl font-bold text-yellow-700 mb-2 text-center">
                        ผลทำนายยามสามตา
                    </h2>
                    <p className="text-center text-gray-600 mb-4">
                        วัน {result.day} เวลา {result.time}<br />
                        หัวข้อ: {result.topic}
                    </p>

                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <div className="bg-yellow-50 rounded-lg p-4">
                            <h3 className="font-bold text-lg text-yellow-800">🕓 ยามปัจจุบัน</h3>
                            <p>
                                <b>{result.currentYam}</b> — {result.currentMeaning}
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                            <h3 className="font-bold text-lg text-orange-800">👁️ ตาที่สาม (ยามเสี่ยง)</h3>
                            <p>
                                <b>{result.thirdYam}</b> — {result.thirdMeaning}
                            </p>
                        </div>

                        <button
                            onClick={resetForm}
                            className="w-full mt-4 h-11 flex items-center justify-center rounded-lg bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 transition-colors"
                        >
                            ทำนายใหม่
                        </button>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md max-w-xs text-center text-sm">
                    {error}
                </div>
            )}
        </div>
    );
};

export default YamSamTar;
