import React from "react";
import ReactDom from "react-dom/client";
import App from "./src/App";

console.log(`test: ${import.meta.env.VITE_TEST}`);

ReactDom.createRoot(document.getElementById("root")).render(
      <App />
);
