import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CollectionDrawer from "./components/CollectionDrawer";

const TRANSITION_MS = 300;

function postClose() {
  window.parent?.postMessage({ type: "wishlist:close" }, "*");
}

function EmbeddedDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") triggerClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function triggerClose() {
    setIsOpen(false);
    setTimeout(postClose, TRANSITION_MS);
  }

  const params = new URLSearchParams(window.location.search);
  const productImage = params.get("image") || undefined;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close wishlist"
        onClick={triggerClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto">
          <CollectionDrawer product={{ image: productImage }} />
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EmbeddedDrawer />
  </StrictMode>,
);
