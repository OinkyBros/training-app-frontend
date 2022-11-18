import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BaseLayout from './components/BaseLayout/BaseLayout';
import './assets/index.scss';
import MatchDetail from "./pages/MatchDetail/MatchDetail";
import ScoreOverview from "./components/Lan/ScoreOverview/ScoreOverview";
import Imprint from "./pages/Imprint/Imprint";

function App() {
  return (
    <BaseLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lan" element={<ScoreOverview />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/matches/:matchID" element={<MatchDetail />} />
        </Routes>
      </BrowserRouter>
    </BaseLayout>
  );
}

export default App;
