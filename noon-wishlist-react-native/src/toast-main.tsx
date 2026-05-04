import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ToastApp from "./ToastApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastApp />
  </StrictMode>,
);
