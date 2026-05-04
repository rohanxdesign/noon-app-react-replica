import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Retune } from "retune";
import "./index.css";
import WishlistPage from "./components/WishlistPage";

const params = new URLSearchParams(window.location.search);
const embedded = params.get("embedded") === "1";

function postClose() {
  window.parent?.postMessage({ type: "wishlist:close" }, "*");
}

function Root() {
  useEffect(() => {
    if (!embedded) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") postClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (embedded) {
    return <WishlistPage onBack={postClose} />;
  }

  return (
    <>
      <div className="flex min-h-full w-full items-start justify-center bg-[#e9ebf0] py-8">
        <WishlistPage />
      </div>
      <Retune />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
