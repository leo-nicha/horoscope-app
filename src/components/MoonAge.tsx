import { ChevronLeftIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchMoonQuarter,
  NextMoonQuarter,
  AstroTime,
  Body,
  Illumination,
} from "astronomy-engine";

function getThaiLunarDay(date: Date) {
  // ใช้เวลา UTC ทั้งหมด
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const time = new AstroTime(utc);

  // หาจุดจันทร์ดับ (new moon) ก่อนหน้าหรือเท่ากับวันนี้
  let mq = SearchMoonQuarter(new AstroTime(new Date(utc.getTime() - 30 * 86400000)));
  let lastNewMoon = mq;
  while (true) {
    const next = NextMoonQuarter(mq);
    if (next.time.date > utc) break;
    mq = next;
    if (mq.quarter === 0) lastNewMoon = mq;
  }

  const newMoonDate = lastNewMoon.time.date;
  const age = (utc.getTime() - newMoonDate.getTime()) / 86400000;

  // แปลงเป็นวันขึ้นแรม
  const day = Math.floor(age) + 1;
  const phase = day <= 15 ? "ขึ้น" : "แรม";
  const dayInPhase = day <= 15 ? day : day - 15;

  // วันพระในระบบไทย
  const isWanPhra = [8, 15, 23, 29, 30].includes(dayInPhase);

  // ความสว่างของดวงจันทร์
  const illum = Illumination(Body.Moon, time).phase_fraction;

  return {
    phase,
    dayInPhase,
    isWanPhra,
    age,
    illumination: illum,
  };
}

const MoonAge: React.FC = () => {
  const navigate = useNavigate();
  const [today, setToday] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [days, setDays] = useState<
    { date: Date; lunar: string; wanPhra: boolean }[]
  >([]);

  const [moonData, setMoonData] = useState(getThaiLunarDay(today));

  // อัปเดตข้อมูลรายวันเมื่อเปลี่ยนวันที่
  useEffect(() => {
    setMoonData(getThaiLunarDay(today));
  }, [today]);

  // คำนวณข้อมูลจันทรคติทั้งเดือน
  useEffect(() => {
    if (currentYear < 2000 || currentYear > 2200) return;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const result: { date: Date; lunar: string; wanPhra: boolean }[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(currentYear, currentMonth, i);
      const lunar = getThaiLunarDay(d);
      result.push({
        date: d,
        lunar: `${lunar.phase} ${lunar.dayInPhase} ค่ำ`,
        wanPhra: lunar.isWanPhra,
      });
    }
    setDays(result);
  }, [currentMonth, currentYear]);

  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white flex flex-col items-center text-center p-4 font-sans">
      <div className="w-full max-w-md px-4 absolute top-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50">
          <ChevronLeftIcon
            onClick={() => navigate("/")}
            className="h-5 w-5 text-gray-800"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-2">🌕 ปฏิทินจันทรคติไทย</h2>
      <p className="text-gray-600 mb-4">
        {today.toLocaleDateString("th-TH", { dateStyle: "full" })}
      </p>

      {/* ===== ปฏิทินรายเดือน ===== */}
      <div className="flex items-center justify-center mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-200 rounded-lg mx-1">
          ◀
        </button>
        <h3 className="text-lg font-semibold mr-4 ml-4">
          <div>{monthNames[currentMonth]} {currentYear + 543}</div>
          <div>
            {new Date(currentYear, currentMonth).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </h3>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-200 rounded-lg mx-1">
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm mb-6 w-full">
        {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((d) => (
          <div key={d} className="font-bold bg-gray-100 py-2 rounded-md text-center">
            {d}
          </div>
        ))}

        {/* ช่องว่างก่อนวันแรกของเดือน */}
        {Array(new Date(currentYear, currentMonth, 1).getDay())
          .fill(null)
          .map((_, idx) => <div key={`empty-${idx}`} />)}

        {days.map((d, idx) => {
          const today = new Date();
          const isToday =
            d.date.getDate() === today.getDate() &&
            d.date.getMonth() === today.getMonth() &&
            d.date.getFullYear() === today.getFullYear();

          return (
            <div
              key={idx}
              className={`border rounded-md min-h-[50px] flex flex-col items-center justify-center text-center transition-all duration-200
              ${isToday
                ? "bg-green-100 border-green-600"
                : d.wanPhra
                  ? "bg-yellow-100 border-yellow-700"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="font-semibold text-base">{d.date.getDate()}</div>

              {isToday && (
                <div className="text-green-600 text-[12px] mt-1 leading-tight">
                  วันนี้
                </div>
              )}
              {d.wanPhra && (
                <div className="text-red-500 text-[12px] mt-1 leading-tight">
                  วันพระ
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== ข้อมูลรายวัน ===== */}
      <div className="bg-white shadow-md rounded-2xl p-4 inline-block">
        <p className="text-lg">
          วันนี้{" "}
          <span className="font-semibold">
            {moonData.phase} {moonData.dayInPhase} ค่ำ
          </span>
        </p>
        <p>อายุของดวงจันทร์: {moonData.age.toFixed(1)} วัน</p>
        <p>ความสว่างของดวงจันทร์: {(moonData.illumination * 100).toFixed(1)}%</p>
        {moonData.isWanPhra && (
          <p className="text-red-500 font-semibold mt-2">🌼 วันนี้วันพระ 🌼</p>
        )}
      </div>
    </div>
  );
};

export default MoonAge;
