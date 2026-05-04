import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Retune } from "retune";
import ProductList from "./components/ProductList";
import CollectionDrawer from "./components/CollectionDrawer";
import type { SkuCardProps } from "./components/SkuCard";
import topImg from "./assets/Top.png";
import bottomImg from "./assets/Bottom.png";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<SkuCardProps | null>(
    null,
  );

  return (
    <>
      <div className="flex min-h-full w-full flex-col items-stretch justify-start bg-[#e9ebf0] py-8">
        <div className="relative mx-auto flex h-[812px] w-[375px] flex-col overflow-hidden bg-surface-primary">
          <img src={topImg} alt="" className="block w-full shrink-0" />
          <div className="min-h-0 flex-1 overflow-hidden">
            <ProductList onWishlistToggle={setSelectedProduct} />
          </div>
          <img src={bottomImg} alt="" className="block w-full shrink-0" />

          <AnimatePresence>
            {selectedProduct && (
              <div className="absolute inset-0 z-50 flex flex-col justify-end">
                <motion.button
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelectedProduct(null)}
                  className="absolute inset-0 bg-black/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="relative"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <CollectionDrawer
                    product={{ image: selectedProduct.image }}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Retune />
    </>
  );
}
