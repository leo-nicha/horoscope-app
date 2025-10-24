import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import DairyTarot from './components/DairyTarot';


const App: React.FC = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-dvh w-full overflow-x-hidden flex flex-col relative">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/dairytarot" element={<DairyTarot />} />
      </Routes>
    </div>
  );
};

export default App;
