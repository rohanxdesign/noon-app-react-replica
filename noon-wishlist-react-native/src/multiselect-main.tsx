import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MultiSelectApp from "./MultiSelectApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MultiSelectApp />
  </StrictMode>,
);
