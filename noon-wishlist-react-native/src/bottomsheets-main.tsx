import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BottomSheetsApp from "./BottomSheetsApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BottomSheetsApp />
  </StrictMode>,
);
