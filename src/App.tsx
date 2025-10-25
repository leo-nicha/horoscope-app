import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import DailyTarot from './components/randomizers/DailyTarot';
import TarotLove from "./components/randomizers/TarotLove";
import TarotWork from './components/randomizers/TarotWork';

const App: React.FC = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/dailytarot" element={<DailyTarot />} />
        <Route path="/lovetarot" element={<TarotLove />} />
        <Route path="/worktarot" element={<TarotWork />} />
      </Routes>
    </div>
  );
};

export default App;
