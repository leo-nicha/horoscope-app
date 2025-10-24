import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import TarotRandomizer from './components/TarotRandomizer';


const App: React.FC = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/tarot" element={<TarotRandomizer />} />
      </Routes>
    </div>
  );
};

export default App;
