import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BaseLayout from './components/BaseLayout/BaseLayout';
import './assets/index.scss';
import MatchDetail from "./pages/MatchDetail/MatchDetail";
import ScoreOverview from "./components/Lan/ScoreOverview/ScoreOverview";

function App() {
  return (
    <BaseLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScoreOverview />} />
          <Route path="/matches/:matchID" element={<MatchDetail />} />
        </Routes>
      </BrowserRouter>
    </BaseLayout>
  );
}

export default App;
