import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import TarotRandomizer from './components/TarotRandomizer';
import TarotLove from "./components/TarotLove";


const App: React.FC = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/dailytarot" element={<TarotRandomizer />} />
        <Route path="/lovetarot" element={<TarotLove />} />
      </Routes>
    </div>
  );
};

export default App;
