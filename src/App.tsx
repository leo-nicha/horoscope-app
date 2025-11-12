import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import DailyTarot from './components/randomizers/DailyTarot';
import TarotLove from "./components/randomizers/TarotLove";
import TarotWork from './components/randomizers/TarotWork';
import TarotStudy from './components/randomizers/TarotStudy';
import TarotMoney from './components/randomizers/TarotMoney';
import TarotHealth from './components/randomizers/TarotHealth';
import MoonAge from './components/MoonAge';
import FortuneSticks from './components/FortuneSticks';
import LuckyNumber from './components/LuckyNumber';
import DreamAnimal from './components/randomizers/DreamAnimal';
import Lucky7Days from './components/Lucky7Days';
import ChineseZodiac from './components/ChineseZodiac';
import WesternZodiac from './components/WesternZodiac';
import DestinyChart from './components/DestinyChart';
import HouseFortune from './components/HouseFortune';
import RuneFortune from './components/RuneFortune';

const App: React.FC = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/dailytarot" element={<DailyTarot />} />
        <Route path="/lovetarot" element={<TarotLove />} />
        <Route path="/worktarot" element={<TarotWork />} />
        <Route path="/studytarot" element={<TarotStudy />} />
        <Route path="/moneytarot" element={<TarotMoney />} />
        <Route path="/healthtarot" element={<TarotHealth />} />
        <Route path="/moonage" element={<MoonAge />} />
        <Route path="/fortunesticks" element={<FortuneSticks />} />
        <Route path="/luckyphone" element={<LuckyNumber />} />
        <Route path="/dreamanimal" element={<DreamAnimal />} />
        <Route path="/luckyday" element={<Lucky7Days />} />
        <Route path="/luckycnzodiac" element={<ChineseZodiac />} />
        <Route path="/luckywestzodiac" element={<WesternZodiac />} />
        <Route path="/destinychart" element={<DestinyChart />} />
        <Route path="/luckyhouse" element={<HouseFortune />} />
        <Route path="/runefortune" element={<RuneFortune />} />
      </Routes>
    </div>
  );
};

export default App;
