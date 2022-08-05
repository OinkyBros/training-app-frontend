import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BaseLayout from './components/BaseLayout/BaseLayout';
import './assets/index.scss';
import MatchDetail from "./pages/MatchDetail/MatchDetail";

function App() {
  return (
    <BaseLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matches/:matchID" element={<MatchDetail />} />
        </Routes>
      </BrowserRouter>
    </BaseLayout>
  );
}

export default App;
