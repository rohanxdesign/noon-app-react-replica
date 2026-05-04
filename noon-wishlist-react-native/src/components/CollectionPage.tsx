import { useState, type UIEvent } from "react";

import airpodsImg from "../assets/wishlist/products/airpods.png";
import chargerImg from "../assets/wishlist/products/charger.png";
import sneakerYellowImg from "../assets/wishlist/products/sneaker.png";
import bottleImg from "../assets/wishlist/products/bottle.png";
import sneakerBlackImg from "../assets/collection/products/sneaker-black.png";
import shoeBrownImg from "../assets/collection/products/shoe-brown.png";

import CollectionHeader from "./CollectionHeader";
import CollectionWallpaper from "./CollectionWallpaper";
import CollectionEmptyState from "./CollectionEmptyState";
import ProductCard, { type ProductCardVariant } from "./ProductCard";
import ToastCard from "./ToastCard";
import WishlistSkeleton from "./WishlistSkeleton";
import MultiSelectWidget from "./MultiSelectWidget";
import BulkOptionsSheet from "./bottomsheets/BulkOptionsSheet";
import MoveOrCopyItemsSheet, {
  MOVE_COPY_COLLECTIONS,
} from "./bottomsheets/MoveOrCopyItemsSheet";
import RemoveItemsSheet from "./bottomsheets/RemoveItemsSheet";
import CopyToNewCollectionSheet from "./bottomsheets/CopyToNewCollectionSheet";
import RenameCollectionSheet from "./bottomsheets/RenameCollectionSheet";
import DeleteCollectionSheet from "./bottomsheets/DeleteCollectionSheet";

type ActiveSheet =
  | "bulk"
  | "move"
  | "copy"
  | "remove"
  | "new-collection"
  | "rename"
  | "delete"
  | null;

type ToastItem = {
  id: number;
  variant: "removed" | "moved" | "copied";
  image: string;
  destination: string;
  meta?: string;
};

const TOAST_DURATION_MS = 3000;
const TOAST_STAGGER_MS = 500;

export type CollectionPageVariant = "default" | "scroll" | "empty";

export type CollectionPageProps = {
  variant?: CollectionPageVariant;
  title?: string;
  itemCount?: number;
  /** Explicit product list to render. If omitted, falls back to the
   *  built-in demo slice (productCount/productOffset). */
  products?: CollectionProduct[];
  /** How many demo products to render when products is not provided. */
  productCount?: number;
  /** Where to start slicing the demo product list. Default: 0. */
  productOffset?: number;
  /** Override the back-button behaviour (default: navigate to /wishlist.html). */
  onBack?: () => void;
};

export type CollectionProduct = {
  id: string;
  image: string;
  name: string;
  rating: number;
  ratingCount: number;
  sellingPrice: string;
  listedPrice: string;
  discount: string;
  priceDropLabel?: string;
};

type CardData = CollectionProduct;

type CardState = {
  data: CardData;
  cartVariant: "default" | "added-to-cart";
  quantity: number;
  selected: boolean;
  selectedAt: number;
};

const PRODUCTS: CardData[] = [
  { id: "p1", image: airpodsImg, name: "Apple Airpods Pro 2 Wireless Earbuds", rating: 4.3, ratingCount: 128, sellingPrice: "899", listedPrice: "1399", discount: "33%", priceDropLabel: "Price Drop • 99" },
  { id: "p2", image: chargerImg, name: "Anker 65W GaN II 3-Port Fast Charger", rating: 4.6, ratingCount: 1289, sellingPrice: "199", listedPrice: "299", discount: "33%" },
  { id: "p3", image: sneakerYellowImg, name: "Air Jordan 1 Retro High OG Yellow Toe", rating: 4.8, ratingCount: 542, sellingPrice: "1299", listedPrice: "1799", discount: "27%" },
  { id: "p4", image: bottleImg, name: "Chilly's Insulated Stainless Steel Bottle 500ml", rating: 4.5, ratingCount: 2103, sellingPrice: "129", listedPrice: "169", discount: "23%" },
  { id: "p5", image: sneakerBlackImg, name: "Puma Suede Classic XXI Sneakers", rating: 4.4, ratingCount: 318, sellingPrice: "349", listedPrice: "549", discount: "36%" },
  { id: "p6", image: shoeBrownImg, name: "Clarks Tilden Walk Leather Lace-up Shoes", rating: 4.2, ratingCount: 87, sellingPrice: "459", listedPrice: "699", discount: "34%" },
  { id: "p7", image: airpodsImg, name: "Sony WH-1000XM5 Wireless Headphones", rating: 4.7, ratingCount: 4621, sellingPrice: "1499", listedPrice: "1899", discount: "21%" },
  { id: "p8", image: chargerImg, name: "Samsung 25W Super Fast Charging Adapter", rating: 4.4, ratingCount: 932, sellingPrice: "79", listedPrice: "129", discount: "39%" },
  { id: "p9", image: bottleImg, name: "Hydro Flask Wide Mouth 32oz Stainless", rating: 4.6, ratingCount: 765, sellingPrice: "189", listedPrice: "249", discount: "24%" },
  { id: "p10", image: sneakerYellowImg, name: "Nike Air Force 1 '07 Low White", rating: 4.9, ratingCount: 8210, sellingPrice: "499", listedPrice: "599", discount: "16%" },
  { id: "p11", image: sneakerBlackImg, name: "Adidas Ultraboost 22 Running Shoes", rating: 4.5, ratingCount: 1145, sellingPrice: "799", listedPrice: "999", discount: "20%" },
  { id: "p12", image: shoeBrownImg, name: "Timberland 6-Inch Premium Waterproof Boots", rating: 4.6, ratingCount: 612, sellingPrice: "1099", listedPrice: "1399", discount: "21%" },
  { id: "p13", image: airpodsImg, name: "JBL Tune 230NC TWS Noise Cancelling", rating: 4.3, ratingCount: 2890, sellingPrice: "299", listedPrice: "449", discount: "33%" },
  { id: "p14", image: chargerImg, name: "Belkin BoostCharge Pro 3-in-1 Wireless", rating: 4.5, ratingCount: 421, sellingPrice: "549", listedPrice: "699", discount: "21%" },
  { id: "p15", image: bottleImg, name: "Stanley Quencher H2.0 FlowState 40oz", rating: 4.7, ratingCount: 5340, sellingPrice: "169", listedPrice: "229", discount: "26%" },
  { id: "p16", image: sneakerBlackImg, name: "New Balance 990v6 Made in USA Sneakers", rating: 4.8, ratingCount: 392, sellingPrice: "1199", listedPrice: "1499", discount: "20%" },
];

function makeInitial(products: CardData[]): CardState[] {
  return products.map((data) => ({
    data,
    cartVariant: "default",
    quantity: 1,
    selected: false,
    selectedAt: 0,
  }));
}

function sliceProducts(offset: number | undefined, count: number | undefined) {
  const start = offset ?? 0;
  const end = count === undefined ? PRODUCTS.length : start + count;
  return PRODUCTS.slice(start, end);
}

export default function CollectionPage({
  variant = "default",
  title,
  itemCount,
  products,
  productCount,
  productOffset,
  onBack,
}: CollectionPageProps) {
  const isEmpty = variant === "empty";
  const resolvedTitle = title ?? (isEmpty ? "Earphones" : "Arushi’s birthday");

  const [cards, setCards] = useState<CardState[]>(() =>
    makeInitial(products ?? sliceProducts(productOffset, productCount)),
  );
  const [selectMode, setSelectMode] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
  const [moveCopySelection, setMoveCopySelection] = useState<Set<string>>(
    new Set(),
  );

  const resolvedCount = itemCount ?? (isEmpty ? 0 : cards.length);
  const listTopOffset = variant === "scroll" ? -36 : 0;

  function addToast(t: Omit<ToastItem, "id">) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, TOAST_DURATION_MS);
  }

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    setIsScrolled(e.currentTarget.scrollTop > 8);
  }

  function handleBack() {
    if (leaving) return;
    if (onBack) {
      onBack();
      return;
    }
    setLeaving(true);
    setTimeout(() => {
      window.location.href = "/wishlist.html";
    }, 900);
  }

  function handleSelectToggle() {
    if (selectMode) {
      setSelectMode(false);
      setCards((prev) =>
        prev.map((c) => ({ ...c, selected: false, selectedAt: 0 })),
      );
    } else {
      setSelectMode(true);
    }
  }

  function handleLongPress(id: string) {
    const now = Date.now();
    setCards((prev) =>
      prev.map((c) =>
        c.data.id === id
          ? { ...c, selected: true, selectedAt: now }
          : { ...c, selected: false, selectedAt: 0 },
      ),
    );
    setSelectMode(true);
  }

  function updateCard(id: string, updater: (c: CardState) => CardState) {
    setCards((prev) => prev.map((c) => (c.data.id === id ? updater(c) : c)));
  }

  function handleCardCheck(id: string) {
    updateCard(id, (c) => ({
      ...c,
      selected: !c.selected,
      selectedAt: !c.selected ? Date.now() : 0,
    }));
  }

  function handleAddToCart(id: string) {
    updateCard(id, (c) => ({ ...c, cartVariant: "added-to-cart", quantity: 1 }));
  }

  function handleIncrement(id: string) {
    updateCard(id, (c) => ({ ...c, quantity: c.quantity + 1 }));
  }

  function handleDecrement(id: string) {
    updateCard(id, (c) =>
      c.quantity > 1
        ? { ...c, quantity: c.quantity - 1 }
        : { ...c, cartVariant: "default", quantity: 1 },
    );
  }

  function handleWishlistRemove(id: string) {
    const card = cards.find((c) => c.data.id === id);
    if (!card) return;
    setCards((prev) => prev.filter((c) => c.data.id !== id));
    addToast({
      variant: "removed",
      image: card.data.image,
      destination: resolvedTitle,
    });
  }

  return (
    <div
      className="relative h-[812px] w-[375px] shrink-0 overflow-hidden rounded-[20px] bg-surface-primary font-primary"
      data-page-variant={variant}
    >
      {variant !== "scroll" && <CollectionWallpaper />}

      {isEmpty ? (
        <div className="absolute left-0 right-0 top-[272px] z-10 flex w-full justify-center px-2">
          <CollectionEmptyState />
        </div>
      ) : (
        <div
          className="absolute inset-x-0 bottom-0 z-10 overflow-y-auto"
          style={{ top: 103 + listTopOffset }}
          onScroll={handleScroll}
        >
          <div className="flex flex-wrap content-center items-start justify-start gap-[15px] px-4 py-3">
            {cards.map((c) => {
              const cardVariant: ProductCardVariant = selectMode
                ? c.selected
                  ? "selected"
                  : "unselected"
                : c.cartVariant;
              return (
                <ProductCard
                  key={c.data.id}
                  variant={cardVariant}
                  image={c.data.image}
                  name={c.data.name}
                  rating={c.data.rating}
                  ratingCount={c.data.ratingCount}
                  sellingPrice={c.data.sellingPrice}
                  listedPrice={c.data.listedPrice}
                  discount={c.data.discount}
                  priceDropLabel={c.data.priceDropLabel}
                  quantity={c.quantity}
                  onWishlistToggle={() => handleWishlistRemove(c.data.id)}
                  onSelectToggle={() => handleCardCheck(c.data.id)}
                  onLongPress={
                    selectMode ? undefined : () => handleLongPress(c.data.id)
                  }
                  onAddToCart={() => handleAddToCart(c.data.id)}
                  onIncrement={() => handleIncrement(c.data.id)}
                  onDecrement={() => handleDecrement(c.data.id)}
                />
              );
            })}
          </div>
        </div>
      )}

      <CollectionHeader
        title={resolvedTitle}
        itemCount={resolvedCount}
        solid={isScrolled || variant === "scroll"}
        selectMode={selectMode}
        onBack={handleBack}
        onSelect={handleSelectToggle}
        onRename={() => setActiveSheet("rename")}
        onDeleteCollection={() => setActiveSheet("delete")}
      />

      {selectMode &&
        (() => {
          const selectedCards = cards.filter((c) => c.selected);
          const orderedSelected = [...selectedCards].sort(
            (a, b) => b.selectedAt - a.selectedAt,
          );
          const widgetAvatars = orderedSelected
            .slice(0, 3)
            .map((c) => ({ src: c.data.image, alt: c.data.name }));
          const sheetItems = orderedSelected.map((c) => ({
            src: c.data.image,
            alt: c.data.name,
          }));

          function openSheet(next: Exclude<ActiveSheet, null>) {
            if (next === "move" || next === "copy") {
              setMoveCopySelection(new Set());
            }
            setActiveSheet(next);
          }

          function closeAllSheets() {
            setActiveSheet(null);
          }

          function toggleMoveCopyCollection(id: string) {
            setMoveCopySelection((prev) => {
              const next = new Set(prev);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            });
          }

          function exitSelectModeAndClear() {
            setSelectMode(false);
            setCards((prev) =>
              prev.map((c) => ({ ...c, selected: false, selectedAt: 0 })),
            );
          }

          function handleMoveSave() {
            const firstImg = orderedSelected[0]?.data.image;
            if (!firstImg) return;
            const names = Array.from(moveCopySelection)
              .map(
                (id) => MOVE_COPY_COLLECTIONS.find((c) => c.id === id)?.name,
              )
              .filter((n): n is string => Boolean(n));
            const meta = `${selectedCards.length} items`;
            closeAllSheets();
            // Move semantics: items leave the current collection.
            setCards((prev) => prev.filter((c) => !c.selected));
            setSelectMode(false);
            names.forEach((name, i) => {
              setTimeout(() => {
                addToast({
                  variant: "moved",
                  image: firstImg,
                  destination: name,
                  meta,
                });
              }, i * TOAST_STAGGER_MS);
            });
          }

          function handleCopySave() {
            const firstImg = orderedSelected[0]?.data.image;
            if (!firstImg) return;
            const names = Array.from(moveCopySelection)
              .map(
                (id) => MOVE_COPY_COLLECTIONS.find((c) => c.id === id)?.name,
              )
              .filter((n): n is string => Boolean(n));
            const meta = `${selectedCards.length} items`;
            closeAllSheets();
            // Copy semantics: items remain in the current collection.
            exitSelectModeAndClear();
            names.forEach((name, i) => {
              setTimeout(() => {
                addToast({
                  variant: "copied",
                  image: firstImg,
                  destination: name,
                  meta,
                });
              }, i * TOAST_STAGGER_MS);
            });
          }

          function handleRemoveConfirm() {
            const firstImg = orderedSelected[0]?.data.image;
            if (!firstImg) return;
            closeAllSheets();
            setCards((prev) => prev.filter((c) => !c.selected));
            setSelectMode(false);
            addToast({
              variant: "removed",
              image: firstImg,
              destination: resolvedTitle,
            });
          }

          let sheet = null;
          if (activeSheet === "bulk") {
            sheet = (
              <BulkOptionsSheet
                items={sheetItems}
                onMoveItems={() => openSheet("move")}
                onCopyItems={() => openSheet("copy")}
                onStartNewCollection={() => openSheet("new-collection")}
                onRemoveItems={() => openSheet("remove")}
              />
            );
          } else if (activeSheet === "move" || activeSheet === "copy") {
            sheet = (
              <MoveOrCopyItemsSheet
                action={activeSheet === "move" ? "Move" : "Copy"}
                items={sheetItems}
                selectedCollections={moveCopySelection}
                onToggleCollection={toggleMoveCopyCollection}
                onBack={() => setActiveSheet("bulk")}
                onSave={
                  activeSheet === "move" ? handleMoveSave : handleCopySave
                }
              />
            );
          } else if (activeSheet === "remove") {
            sheet = (
              <RemoveItemsSheet
                items={sheetItems}
                onBack={() => setActiveSheet("bulk")}
                onCancel={closeAllSheets}
                onRemove={handleRemoveConfirm}
              />
            );
          } else if (activeSheet === "new-collection") {
            sheet = (
              <CopyToNewCollectionSheet
                items={sheetItems}
                onBack={() => setActiveSheet("bulk")}
              />
            );
          }

          return (
            <>
              <div
                key="multi-select-widget"
                className="absolute inset-x-0 bottom-6 z-30 flex justify-center px-2 animate-[widget-slide-up_320ms_ease-out_forwards]"
              >
                <MultiSelectWidget
                  count={selectedCards.length}
                  avatars={widgetAvatars}
                  onMore={() => openSheet("bulk")}
                />
              </div>

              {sheet && (
                <>
                  <button
                    type="button"
                    aria-label="Close bottom sheet"
                    onClick={closeAllSheets}
                    className="absolute inset-0 z-40 bg-black/80 animate-[backdrop-fade-in_220ms_ease-out_forwards]"
                  />
                  <div
                    key={activeSheet}
                    className="absolute inset-x-0 bottom-0 z-50 flex justify-center animate-[sheet-slide-up_280ms_ease-out_forwards]"
                  >
                    {sheet}
                  </div>
                </>
              )}
            </>
          );
        })()}

      {(activeSheet === "rename" || activeSheet === "delete") && (
        <>
          <button
            type="button"
            aria-label="Close bottom sheet"
            onClick={() => setActiveSheet(null)}
            className="absolute inset-0 z-40 bg-black/80 animate-[backdrop-fade-in_220ms_ease-out_forwards]"
          />
          <div
            key={activeSheet}
            className="absolute inset-x-0 bottom-0 z-50 flex justify-center animate-[sheet-slide-up_280ms_ease-out_forwards]"
          >
            {activeSheet === "rename" ? (
              <RenameCollectionSheet />
            ) : (
              <DeleteCollectionSheet
                title={resolvedTitle}
                itemCount={resolvedCount}
              />
            )}
          </div>
        </>
      )}

      {toasts.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="pointer-events-auto animate-[toast-slide-up_300ms_ease-out_forwards]"
            >
              <ToastCard
                variant={t.variant}
                image={t.image}
                destination={t.destination}
                meta={t.meta}
              />
            </div>
          ))}
        </div>
      )}

      {leaving && <WishlistSkeleton />}
    </div>
  );
}
