import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokerGame, RouletteGame } from "./components/GameComponents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokerGame />} />
        <Route path="/roulette" element={<RouletteGame />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
