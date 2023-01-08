import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BaseLayout from './components/BaseLayout/BaseLayout';
import './assets/index.scss';
import MatchDetail from "./pages/MatchDetail/MatchDetail";
import Imprint from "./pages/Imprint/Imprint";
import AddGoal from "./components/AddGoal/AddGoal";
import Goals from "./pages/Goals/Goals";
import MatchList from "./components/MatchList/MatchList";

function App() {
  return (
    <BrowserRouter>
        <BaseLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/matches/:matchID" element={<MatchDetail />} />
            </Routes>
        </BaseLayout>
    </BrowserRouter>
  );
}

export default App;
