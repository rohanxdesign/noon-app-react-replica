import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WishlistFlowApp from "./WishlistFlowApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WishlistFlowApp />
  </StrictMode>,
);
