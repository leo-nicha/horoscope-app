import React, { useState, useCallback } from "react";
import { Loader2, ChevronLeftIcon, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL =
    "https://phone-number-api-blush.vercel.app/phone_number_1_81.json";

interface LuckyData {
    number: number;
    meaning: string;
    point: string;
    warning: string;
}

const LuckyNumber: React.FC = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<LuckyData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // รับเฉพาะตัวเลข และสูงสุด 10 ตัว
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
        setPhone(value);
    };

    const calculateSum = (digits: string) => {
        return digits
            .split("")
            .map((n) => parseInt(n, 10))
            .reduce((a, b) => a + b, 0);
    };

    const handleSubmit = useCallback(async () => {
        // ✅ ตรวจความถูกต้องก่อนคำนวณ
        if (phone.length !== 10) {
            setError("กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก");
            return;
        }

        if (!phone.startsWith("0")) {
            setError("เบอร์โทรศัพท์ต้องขึ้นต้นด้วยเลข 0 เท่านั้น");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const total = calculateSum(phone);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อ API ได้");
            const data: LuckyData[] = await response.json();

            const found = data.find((item) => item.number === total);

            if (!found) {
                setError(`ไม่พบคำทำนายสำหรับผลรวม ${total}`);
            } else {
                setResult(found);
            }
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
        } finally {
            setLoading(false);
        }
    }, [phone]);

    // ปุ่มจะ disable ถ้ายังไม่ครบ 10 หลัก หรือไม่ขึ้นต้นด้วย 0
    const isInvalidPhone =
        phone.length !== 10 || (phone.length === 10 && !phone.startsWith("0"));

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
                <h1 className="text-3xl font-extrabold text-blue-800 font-serif">ทำนายผลรวม</h1>
                <h1 className="text-3xl font-extrabold text-blue-800 font-serif mb-2">เบอร์โทรศัพท์มงคล</h1>
                <p className="text-sm text-gray-500">
                    คำนวนเลขมงคลจากหมายเลขโทรศัพท์
                </p>
            </header>

            <div className="w-full max-w-xs mb-6">
                <input
                    type="text"
                    value={phone}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}    // เมื่อกด (focus) ให้ placeholder หาย
                    onBlur={() => setIsFocused(false)}    // เมื่อออกจากช่อง ให้ placeholder กลับมา
                    placeholder={isFocused ? "" : "กรอกหมายเลขโทรศัพท์ (10 หลัก)"}
                    className={`w-full px-4 py-3 border rounded-full text-center text-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 transition-all ${phone.length === 10 && !phone.startsWith("0")
                            ? "border-red-300 focus:ring-red-300"
                            : "border-blue-400 focus:ring-blue-500"
                        }`}
                />
                <p
                    className={`text-sm mt-2 text-center ${phone.length === 10 && !phone.startsWith("0")
                        ? "text-red-600"
                        : "text-gray-500"
                        }`}
                >
                    ความยาวปัจจุบัน: {phone.length}/10
                </p>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading || isInvalidPhone}
                className={`flex items-center justify-center w-full max-w-xs px-6 py-3 mb-6 rounded-full text-base font-bold transition-all duration-300 shadow-md active:scale-95 ${loading || isInvalidPhone
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        กำลังคำนวณผลรวม...
                    </>
                ) : (
                    <>
                        <Calculator className="w-5 h-5 mr-2" />
                        ทำนายผลเบอร์มงคล
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
                        <h2 className="text-xl font-bold text-blue-800 mb-4">
                            ผลรวมเลข: {result.number}
                        </h2>

                        <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                            <p className="mb-2">
                                <b className="text-lg">ความหมาย</b>
                                <p>{result.meaning}</p>
                            </p>
                            <p className="mb-2">
                                <b className="text-green-700 text-lg">จุดเด่น</b>
                                <p>{result.point}</p>
                            </p>
                            <p>
                                <b className="text-red-600 text-lg">⚠️ ข้อควรระวัง ⚠️</b>
                                <p>{result.warning}</p>
                            </p>
                        </div>
                    </div>
                )}
            </main>

            {!result && !loading && !error && (
                <div className="text-center font-bold p-6 bg-red-50 rounded-xl border border-red-200 mt-6 max-w-xs">
                    <p className="text-base text-red-500">
                        กรอกหมายเลขโทรศัพท์ของคุณให้ครบ 10 หลัก และต้องขึ้นต้นด้วยเลข 0
                    </p>
                </div>
            )}
        </div>
    );
};

export default LuckyNumber;
