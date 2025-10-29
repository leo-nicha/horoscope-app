import React, { useState, useCallback } from "react";
import { Loader2, ChevronLeftIcon, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://dream-animal-api.vercel.app/dream_animal_135.json";

interface DreamAnimalData {
  id: number;
  dream: string;
  meaning: string;
  luck: string; // ดี, เตือน, หรืออื่น ๆ
  numbers: string[]; // ตัวเลขเสี่ยงโชค
}

const DreamAnimal: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DreamAnimalData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError("กรุณาพิมพ์ชื่อสัตว์ที่คุณฝันเห็น");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อ API ได้");

      const data: DreamAnimalData[] = await response.json();

      const found = data.filter((item) =>
        item.dream.toLowerCase().includes(query.toLowerCase())
      );

      if (found.length === 0) {
        setError(`ไม่พบผลลัพธ์สำหรับ "${query}"`);
      } else {
        setResults(found);
      }
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white flex flex-col items-center p-4 font-sans relative">
      {/* ปุ่มกลับ */}
      <div className="w-full max-w-md px-4 absolute top-4">
        <div
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-amber-100 cursor-pointer transition"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
        </div>
      </div>

      <header className="text-center mt-12 mb-6 w-full">
        <h1 className="text-3xl font-extrabold text-amber-700 font-serif">
          ทำนายฝันเห็นสัตว์
        </h1>
        <p className="text-sm text-gray-500">
          ค้นหาคำทำนายฝันเกี่ยวกับสัตว์ และเลขเสี่ยงโชค
        </p>
      </header>

      {/* ช่องค้นหา */}
      <div className="w-full max-w-xs flex items-center justify-center gap-2 mb-6 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : "พิมพ์สัตว์ในฝันของคุณ"}
          className="grow px-4 py-3 border border-amber-300 rounded-full text-center text-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className={`flex items-center justify-center px-4 py-3 rounded-full font-bold transition-all duration-300 shadow-md active:scale-95 ${loading || !query.trim()
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-1" />
              ค้นหา
            </>
          )}
        </button>
      </div>

      {/* แสดงผล */}
      <main className="w-full flex justify-center">
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-center text-sm">
            {error}
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="flex flex-col gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-5 border border-amber-200 text-center"
              >
                <h2 className="text-xl font-bold text-amber-800 mb-2">
                  ฝันเห็น: {item.dream}
                </h2>

                <p className="text-gray-700 leading-relaxed mb-3">
                  {item.meaning}
                </p>

                <p
                  className={`font-semibold mb-2 ${item.luck.includes("ดี")
                      ? "text-green-700"
                      : "text-red-600"
                    }`}
                >
                  ประเภทของฝัน: {item.luck}
                </p>

                <p className="text-amber-700 font-bold text-lg">
                  เลขเสี่ยงโชค: {item.numbers[0]},{item.numbers[1]},{item.numbers[2]}
                </p>
              </div>
            ))}
          </div>
        )}

        {!results.length && !loading && !error && (
          <div className="text-center font-bold p-6 bg-amber-50 rounded-xl border border-amber-200 mt-6 max-w-xs">
            <p className="text-base text-amber-700">
              พิมพ์ชื่อสัตว์ที่คุณฝันเห็น จากนั้นกดปุ่ม "ค้นหา"
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DreamAnimal;
