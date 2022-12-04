import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BaseLayout from './components/BaseLayout/BaseLayout';
import './assets/index.scss';
import MatchDetail from "./pages/MatchDetail/MatchDetail";
import Imprint from "./pages/Imprint/Imprint";
import AddGoal from "./pages/AddGoal/AddGoal";

function App() {
  return (
    <BaseLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/add-goal" element={<AddGoal />} />
          <Route path="/matches/:matchID" element={<MatchDetail />} />
        </Routes>
      </BrowserRouter>
    </BaseLayout>
  );
}

export default App;
