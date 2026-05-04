import { useEffect, useMemo, useRef, useState } from "react";
import { Retune } from "retune";

import Header from "./components/Header";
import CollectionCard from "./components/CollectionCard";
import ProductCard, {
  type ProductCardVariant,
} from "./components/ProductCard";
import ToastCard, { type ToastVariant } from "./components/ToastCard";
import CollectionPage from "./components/CollectionPage";
import CollectionEmptyState from "./components/CollectionEmptyState";
import CollectionDrawer, {
  type Collection as DrawerCollection,
} from "./components/CollectionDrawer";
import InlineCreateCollectionSheet from "./components/InlineCreateCollectionSheet";
import MultiSelectWidget from "./components/MultiSelectWidget";
import BulkOptionsSheet from "./components/bottomsheets/BulkOptionsSheet";
import MoveOrCopyItemsSheet, {
  MOVE_COPY_COLLECTIONS,
} from "./components/bottomsheets/MoveOrCopyItemsSheet";
import RemoveItemsSheet from "./components/bottomsheets/RemoveItemsSheet";
import CopyToNewCollectionSheet from "./components/bottomsheets/CopyToNewCollectionSheet";
import ShareCollectionSheet from "./components/bottomsheets/ShareCollectionSheet";
import SkuCard from "./components/SkuCard";

import topImg from "./assets/Top.png";
import bottomImg from "./assets/Bottom.png";
import skuAirpodsImg from "./assets/sku/airpods.png";
import skuWashingMachineImg from "./assets/sku/product.png";
import skuPhoneCaseImg from "./assets/sku/phonecase.png";

import homeDecorBack from "./assets/wishlist/collections/home-decor-1.png";
import homeDecorMiddle from "./assets/wishlist/collections/home-decor-2.png";
import homeDecorFront from "./assets/wishlist/collections/home-decor-3.png";
import birthdayMiddle from "./assets/wishlist/collections/birthday-1.png";
import birthdayFront from "./assets/wishlist/collections/birthday-2.png";
import sneakersFront from "./assets/wishlist/collections/sneakers-1.png";

import airpods from "./assets/wishlist/products/airpods.png";
import charger from "./assets/wishlist/products/charger.png";
import sneaker from "./assets/wishlist/products/sneaker.png";
import bottle from "./assets/wishlist/products/bottle.png";
import lampImg from "./assets/lamp.png";

// =====================================================================
// Types & data
// =====================================================================

type ProductId = string;
type CollectionId = string;

type ProductData = {
  id: ProductId;
  image: string;
  name: string;
  rating: number;
  ratingCount: number;
  sellingPrice: string;
  listedPrice: string;
  discount: string;
  productType: string;
  priceDropLabel?: string;
};

type CollectionData = {
  id: CollectionId;
  name: string;
  productType?: string;
  thumbs: { back?: string; middle?: string; front: string };
};

type ToastItem = {
  id: number;
  variant: ToastVariant;
  image: string;
  destination?: string;
  meta?: string;
  link?: string;
  onAction?: () => void;
  onLink?: () => void;
};

type Scene =
  | "homepage"
  | "landing"
  | "landing-empty"
  | "landing-no-collections"
  | "collection"
  | "collection-empty";

const PRODUCTS: ProductData[] = [
  {
    id: "p-airpods",
    image: airpods,
    name: "Apple Airpods Pro 2 Wireless Earbuds",
    rating: 4.3,
    ratingCount: 128,
    sellingPrice: "899",
    listedPrice: "1399",
    discount: "33%",
    productType: "Earphones",
    priceDropLabel: "Price Drop • 99",
  },
  {
    id: "p-charger",
    image: charger,
    name: "Anker 65W GaN Fast Charging Adapter",
    rating: 4.5,
    ratingCount: 412,
    sellingPrice: "145",
    listedPrice: "199",
    discount: "27%",
    productType: "Chargers",
  },
  {
    id: "p-sneaker",
    image: sneaker,
    name: "Air Jordan 1 High OG Retro Sneakers",
    rating: 4.7,
    ratingCount: 89,
    sellingPrice: "750",
    listedPrice: "899",
    discount: "17%",
    productType: "Sneakers",
  },
  {
    id: "p-bottle",
    image: bottle,
    name: "Stainless Steel Insulated Water Bottle 750ml",
    rating: 4.2,
    ratingCount: 256,
    sellingPrice: "49",
    listedPrice: "79",
    discount: "38%",
    productType: "Bottles",
  },
  {
    id: "p-airpods-2",
    image: airpods,
    name: "Premium Wireless Earbuds Bluetooth 5.3",
    rating: 4.1,
    ratingCount: 67,
    sellingPrice: "599",
    listedPrice: "799",
    discount: "25%",
    productType: "Earphones",
  },
  {
    id: "p-charger-2",
    image: charger,
    name: "USB-C 100W Multi-Port Travel Charger",
    rating: 4.6,
    ratingCount: 203,
    sellingPrice: "220",
    listedPrice: "299",
    discount: "26%",
    productType: "Chargers",
  },
  {
    id: "p-sneaker-2",
    image: sneaker,
    name: "Vintage Canvas High-Top Sneakers Unisex",
    rating: 4.4,
    ratingCount: 167,
    sellingPrice: "320",
    listedPrice: "450",
    discount: "28%",
    productType: "Sneakers",
  },
  {
    id: "p-bottle-2",
    image: bottle,
    name: "Insulated Travel Tumbler 1L Vacuum Flask",
    rating: 4.5,
    ratingCount: 94,
    sellingPrice: "89",
    listedPrice: "129",
    discount: "31%",
    productType: "Bottles",
  },
  // Arushi's Birthday products — reuse the swatch images shown on the
  // "Arushi's Birthday" collection card preview.
  {
    id: "p-arushi-cake",
    image: birthdayMiddle,
    name: "Birthday Cake Topper Set Gold",
    rating: 4.7,
    ratingCount: 145,
    sellingPrice: "59",
    listedPrice: "89",
    discount: "33%",
    productType: "Gifts",
  },
  {
    id: "p-arushi-balloons",
    image: birthdayFront,
    name: "Helium Balloon Bouquet Pastel Mix",
    rating: 4.5,
    ratingCount: 268,
    sellingPrice: "45",
    listedPrice: "69",
    discount: "35%",
    productType: "Gifts",
  },
  // Home decor products. The first three reuse the swatch images shown on
  // the "Home decor" collection card preview (PRD §7.1 / §8.1).
  {
    id: "p-decor-cushion",
    image: homeDecorBack,
    name: "Velvet Cushion Cover Set of 4",
    rating: 4.5,
    ratingCount: 312,
    sellingPrice: "89",
    listedPrice: "129",
    discount: "31%",
    productType: "Decor",
  },
  {
    id: "p-decor-vase",
    image: homeDecorMiddle,
    name: "Ceramic Bud Vase Decor Piece",
    rating: 4.6,
    ratingCount: 198,
    sellingPrice: "129",
    listedPrice: "189",
    discount: "32%",
    productType: "Decor",
  },
  {
    id: "p-decor-frame",
    image: homeDecorFront,
    name: "Wooden Photo Frame Set of 6",
    rating: 4.7,
    ratingCount: 421,
    sellingPrice: "149",
    listedPrice: "229",
    discount: "35%",
    productType: "Decor",
  },
  {
    id: "p-decor-lamp",
    image: lampImg,
    name: "Modern Nordic Table Lamp",
    rating: 4.4,
    ratingCount: 87,
    sellingPrice: "199",
    listedPrice: "299",
    discount: "33%",
    productType: "Decor",
  },
  {
    id: "p-decor-candle",
    image: homeDecorBack,
    name: "Scented Soy Candle Gift Set",
    rating: 4.8,
    ratingCount: 543,
    sellingPrice: "79",
    listedPrice: "119",
    discount: "34%",
    productType: "Decor",
  },
  {
    id: "p-decor-macrame",
    image: homeDecorMiddle,
    name: "Boho Macrame Wall Hanging",
    rating: 4.3,
    ratingCount: 156,
    sellingPrice: "69",
    listedPrice: "99",
    discount: "30%",
    productType: "Decor",
  },
  {
    id: "p-decor-pillow",
    image: homeDecorFront,
    name: "Decorative Throw Pillow Boucle",
    rating: 4.5,
    ratingCount: 234,
    sellingPrice: "119",
    listedPrice: "169",
    discount: "30%",
    productType: "Decor",
  },
];

// Homepage entry-point products (PRD §3.5 — homepage product cards). These
// mirror the original 5173 demo (`src/App.tsx` / `ProductList`).
const HOMEPAGE_PRODUCTS: ProductData[] = [
  {
    id: "hp-airpods",
    image: skuAirpodsImg,
    name: "Apple Airpods Pro 2 Wireless Earbuds",
    rating: 4.5,
    ratingCount: 0,
    sellingPrice: "899",
    listedPrice: "1399",
    discount: "33%",
    productType: "Earphones",
  },
  {
    id: "hp-washer",
    image: skuWashingMachineImg,
    name: "Whirlpool 7 kg Magic Clean",
    rating: 4.3,
    ratingCount: 0,
    sellingPrice: "899",
    listedPrice: "1399",
    discount: "33%",
    productType: "Appliances",
  },
  {
    id: "hp-phonecase",
    image: skuPhoneCaseImg,
    name: "MAYNOS Suction Phone Case Mount",
    rating: 4.1,
    ratingCount: 0,
    sellingPrice: "129",
    listedPrice: "199",
    discount: "35%",
    productType: "Phone Cases",
  },
  {
    id: "hp-charger",
    image: charger,
    name: "Anker 65W USB-C Fast Wall Charger",
    rating: 4.7,
    ratingCount: 0,
    sellingPrice: "199",
    listedPrice: "299",
    discount: "33%",
    productType: "Chargers",
  },
  {
    id: "hp-sneaker",
    image: sneaker,
    name: "Air Jordan 1 Mid 'Yellow Toe' Sneakers",
    rating: 4.4,
    ratingCount: 0,
    sellingPrice: "549",
    listedPrice: "799",
    discount: "31%",
    productType: "Sneakers",
  },
  {
    id: "hp-bottle",
    image: bottle,
    name: "Stanley Quencher Insulated Water Bottle",
    rating: 4.6,
    ratingCount: 0,
    sellingPrice: "149",
    listedPrice: "229",
    discount: "35%",
    productType: "Bottles",
  },
];

const INITIAL_COLLECTIONS: CollectionData[] = [
  {
    id: "c-home-decor",
    name: "Home decor",
    productType: "Decor",
    thumbs: { back: homeDecorBack, middle: homeDecorMiddle, front: homeDecorFront },
  },
  {
    id: "c-arushi-birthday",
    name: "Arushi’s Birthday",
    productType: "Gifts",
    thumbs: { middle: birthdayMiddle, front: birthdayFront },
  },
  {
    id: "c-sneakers",
    name: "Sneakers",
    productType: "Sneakers",
    thumbs: { front: sneakersFront },
  },
];

// Seeded so the landing collection cards show realistic counts:
//   Home decor → 7 · Arushi’s Birthday → 2 · Sneakers → 1
const INITIAL_MEMBERSHIP: Record<ProductId, Set<CollectionId>> = {
  "p-sneaker": new Set(["c-sneakers"]),
  "p-arushi-cake": new Set(["c-arushi-birthday"]),
  "p-arushi-balloons": new Set(["c-arushi-birthday"]),
  "p-decor-cushion": new Set(["c-home-decor"]),
  "p-decor-vase": new Set(["c-home-decor"]),
  "p-decor-frame": new Set(["c-home-decor"]),
  "p-decor-lamp": new Set(["c-home-decor"]),
  "p-decor-candle": new Set(["c-home-decor"]),
  "p-decor-macrame": new Set(["c-home-decor"]),
  "p-decor-pillow": new Set(["c-home-decor"]),
};

const TOAST_DURATION_MS = 4000;

// =====================================================================
// Save drawer wrapper
// =====================================================================

type DrawerState = {
  product: ProductData;
  // initial selection (excluding 'all' which is always implied)
  initiallySelected: Set<CollectionId>;
  mode: "list" | "create";
};

type SaveDrawerProps = {
  state: DrawerState;
  collections: CollectionData[];
  onClose: () => void;
  onSaveToCollections: (
    productId: ProductId,
    selected: Set<CollectionId>,
    allItemsKept: boolean,
  ) => void;
  onSwitchToCreate: () => void;
  onCreateCollection: (productId: ProductId, name: string) => void;
};

function SaveDrawer({
  state,
  collections,
  onClose,
  onSaveToCollections,
  onSwitchToCreate,
  onCreateCollection,
}: SaveDrawerProps) {
  const { product, mode } = state;

  // Suggested collection: existing collection that previously held an item of
  // the same product_type. (Stored on collection.productType for the demo.)
  const suggestedExistingId = useMemo(() => {
    const sameType = collections.find(
      (c) => c.productType?.toLowerCase() === product.productType.toLowerCase(),
    );
    return sameType?.id ?? null;
  }, [collections, product.productType]);

  // If no existing collection matches → surface a suggested-new tag with a
  // pre-populated name from the product type bank.
  const suggestedNewName =
    suggestedExistingId === null ? product.productType : null;

  const orderedCollections = useMemo(() => {
    const withSuggested: { c: CollectionData }[] = [];
    if (suggestedExistingId) {
      const sug = collections.find((c) => c.id === suggestedExistingId);
      if (sug) withSuggested.push({ c: sug });
    }
    for (const c of collections) {
      if (c.id === suggestedExistingId) continue;
      withSuggested.push({ c });
    }
    return withSuggested;
  }, [collections, suggestedExistingId]);

  const drawerCollections: DrawerCollection[] = useMemo(() => {
    const initial = state.initiallySelected;
    const list: DrawerCollection[] = [
      {
        id: "all",
        name: "All Items",
        thumb: product.image,
        selected: true,
      },
    ];
    for (const { c } of orderedCollections) {
      list.push({
        id: c.id,
        name: c.name,
        thumb: c.thumbs.front,
        selected: initial.has(c.id),
        suggested: false,
      });
    }
    if (suggestedNewName) {
      list.push({
        id: `__suggested-new__`,
        name: suggestedNewName,
        thumb: product.image,
        selected: false,
        suggested: true,
      });
    }
    return list;
  }, [orderedCollections, product, state.initiallySelected, suggestedNewName]);

  // Local state mirrors what's checked. We need to surface what was checked
  // back to parent on close → use a ref for "current selection".
  const [selected, setSelected] = useState<Set<string>>(
    () =>
      new Set(
        drawerCollections.filter((c) => c.selected).map((c) => c.id),
      ),
  );
  // refresh selected when product changes
  useEffect(() => {
    setSelected(
      new Set(
        drawerCollections.filter((c) => c.selected).map((c) => c.id),
      ),
    );
    // We intentionally only re-init when the product changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  // When user picks a regular collection row (not "all", not suggested-new),
  // PRD 3.2 says: bottom sheet collapses on selection. We commit on toggle
  // when a non-default row gets checked.
  const commitAndClose = (next: Set<string>) => {
    const allItemsKept = next.has("all");
    const collectionsSelected = new Set<CollectionId>();
    for (const id of next) {
      if (id === "all") continue;
      if (id === "__suggested-new__") {
        // Suggested-new acts like create flow with pre-filled name
        onCreateCollection(product.id, product.productType);
        return;
      }
      collectionsSelected.add(id);
    }
    onSaveToCollections(product.id, collectionsSelected, allItemsKept);
  };

  if (mode === "create") {
    return (
      <InlineCreateCollectionSheet
        existingNames={collections.map((c) => c.name)}
        onCancel={onClose}
        onCreate={(name) => onCreateCollection(product.id, name)}
      />
    );
  }

  return (
    <CollectionDrawer
      collections={drawerCollections.map((c) => ({
        ...c,
        selected: selected.has(c.id),
      }))}
      onToggle={(id) => {
        // Toggle, then if a non-"all" row was just checked, commit.
        const wasOn = selected.has(id);
        const next = new Set(selected);
        if (wasOn) next.delete(id);
        else next.add(id);
        setSelected(next);

        if (!wasOn && id !== "all" && id !== "__suggested-new__") {
          // PRD 3.2: collapse on collection selection
          commitAndClose(next);
        } else if (!wasOn && id === "__suggested-new__") {
          // Treat suggested-new as create flow with pre-filled name
          onCreateCollection(product.id, product.productType);
        }
        // For unchecking, we don't auto-commit; user can dismiss.
      }}
      onCreate={onSwitchToCreate}
      product={{ image: product.image }}
    />
  );
}

// =====================================================================
// Floating "View Cart" CTA
// =====================================================================

function CartToastCard({
  count,
  image,
  onClick,
}: {
  count: number;
  image: string | null;
  onClick?: () => void;
}) {
  return (
    <div className="flex w-[343px] items-center gap-3 rounded-2xl bg-surface-primary p-2 shadow-[0_8px_24px_rgba(29,37,57,0.16)]">
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-tertiary">
        {image && (
          <img src={image} alt="" className="block size-full object-contain" />
        )}
      </div>
      <p className="flex-1 font-primary text-b14 font-semibold text-text-primary">
        {count} item{count === 1 ? "" : "s"} in cart
      </p>
      <button
        type="button"
        onClick={onClick}
        className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-surface-action-bold px-4"
      >
        <span className="font-primary text-l3 font-semibold text-text-on-surface-bold">
          View Cart
        </span>
      </button>
    </div>
  );
}

// =====================================================================
// Wishlist landing page (live)
// =====================================================================

type LandingProps = {
  variant: "default" | "empty" | "no-collections";
  collections: CollectionData[];
  products: ProductData[];
  membership: Record<ProductId, Set<CollectionId>>;
  cart: Record<ProductId, number>;
  selectMode: boolean;
  selected: Set<ProductId>;
  selectedAt: Record<ProductId, number>;
  onWishlistToggle: (id: ProductId) => void;
  onSelectToggle: (id: ProductId) => void;
  onLongPress: (id: ProductId) => void;
  onAddToCart: (id: ProductId) => void;
  onIncrement: (id: ProductId) => void;
  onDecrement: (id: ProductId) => void;
  onShareProduct: (id: ProductId) => void;
  onSelectButton: () => void;
  onCreate: () => void;
  onCollectionClick: (id: CollectionId) => void;
};

function WishlistLanding(props: LandingProps) {
  const isEmpty = props.variant === "empty";
  const noCollections = props.variant === "no-collections";

  return (
    <div className="relative mx-auto flex h-[812px] w-[375px] flex-col overflow-hidden bg-surface-primary font-primary">
      <Header onCreate={props.onCreate} />

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
          <CollectionEmptyState onStartAdding={() => {}} />
          <p className="text-center font-primary text-b14 text-text-tertiary">
            Tap the heart icon on any product to save it here
          </p>
        </div>
      ) : (
        <div className="flex flex-1 min-h-0 flex-col gap-8 overflow-y-auto">
          {noCollections ? (
            <div className="mx-4 flex flex-col items-start gap-2 rounded-2xl border border-border-primary bg-surface-secondary p-4">
              <p className="font-primary text-b14 font-semibold text-text-primary">
                Organise items into collections
              </p>
              <p className="font-primary text-b12 font-normal text-text-tertiary">
                Group your wishlisted items by purpose, occasion, or vibe.
              </p>
              <button
                type="button"
                onClick={props.onCreate}
                className="mt-2 flex h-9 items-center justify-center rounded-full bg-surface-action-bold px-4"
              >
                <span className="font-primary text-l3 font-semibold text-text-on-surface-bold">
                  + Create a New Collection
                </span>
              </button>
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-[19px] overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {props.collections.map((c) => {
                const itemCount = Object.values(props.membership).filter(
                  (s) => s.has(c.id),
                ).length;
                return (
                  <CollectionCard
                    key={c.id}
                    name={c.name}
                    itemCount={itemCount}
                    assets={c.thumbs}
                    onClick={() => props.onCollectionClick(c.id)}
                  />
                );
              })}
            </div>
          )}

          <div className="flex shrink-0 flex-col">
            <div className="flex items-center justify-between px-4">
              <h2 className="font-primary text-[16px] font-bold leading-5 text-text-primary tracking-[-0.16px]">
                All Saved Items
              </h2>
              <button
                type="button"
                onClick={props.onSelectButton}
                className="flex items-center justify-center rounded-full bg-surface-tertiary px-3 py-1.5"
              >
                <span className="font-primary text-l3 font-semibold text-text-primary opacity-80">
                  {props.selectMode ? "Cancel" : "Select"}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 px-4">
              {props.products.map((p) => {
                const qty = props.cart[p.id] ?? 0;
                let variant: ProductCardVariant = "default";
                if (props.selectMode) {
                  variant = props.selected.has(p.id) ? "selected" : "unselected";
                } else if (qty > 0) variant = "added-to-cart";

                return (
                  <ProductCard
                    key={p.id}
                    variant={variant}
                    image={p.image}
                    name={p.name}
                    rating={p.rating}
                    ratingCount={p.ratingCount}
                    sellingPrice={p.sellingPrice}
                    listedPrice={p.listedPrice}
                    discount={p.discount}
                    priceDropLabel={p.priceDropLabel}
                    quantity={qty || 1}
                    onWishlistToggle={() => props.onWishlistToggle(p.id)}
                    onSelectToggle={() => props.onSelectToggle(p.id)}
                    onLongPress={
                      props.selectMode
                        ? undefined
                        : () => props.onLongPress(p.id)
                    }
                    onAddToCart={() => props.onAddToCart(p.id)}
                    onIncrement={() => props.onIncrement(p.id)}
                    onDecrement={() => props.onDecrement(p.id)}
                    onShare={() => props.onShareProduct(p.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// Sidebar: scene picker + missing-component checklist
// =====================================================================

const SCENE_BUTTONS: { id: Scene; label: string; prd: string }[] = [
  { id: "homepage", label: "Homepage save (entry)", prd: "§3.5" },
  { id: "landing", label: "Wishlist landing", prd: "§7.1" },
  { id: "landing-no-collections", label: "Landing — 0 collections", prd: "§7.2" },
  { id: "landing-empty", label: "Landing — 0 items", prd: "§15.1" },
  { id: "collection", label: "Collection page", prd: "§8.1" },
  { id: "collection-empty", label: "Empty collection", prd: "§15.2" },
];

const MISSING_NOTES: { title: string; prd: string }[] = [
  { title: "FTUX onboarding pop-up", prd: "§3.4" },
  { title: "Story-mode fullscreen viewer", prd: "§12.5" },
  { title: "Single-product Share sheet (channels are reused from collection share for now)", prd: "§10.1" },
  { title: "Cart line-item with “Move to wishlist” CTA", prd: "§3.6" },
  { title: "Variant selector sheet (single + bulk)", prd: "§13.3 / §13.4" },
  { title: "Tag system: Back in Stock / Live Sale / Low in Stock / Out of Stock badges on product card", prd: "§9.1" },
  { title: "Read-only public collection view (shareable link target)", prd: "§11.3" },
];

function FlowSidebar({
  scene,
  setScene,
}: {
  scene: Scene;
  setScene: (s: Scene) => void;
}) {
  return (
    <aside className="flex w-[280px] shrink-0 flex-col gap-6 rounded-2xl bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      <div>
        <p className="font-primary text-b12 font-semibold uppercase tracking-wide text-text-tertiary">
          Wishlist Revamp
        </p>
        <h2 className="font-primary text-h16 font-bold text-text-primary">
          Scene picker
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        {SCENE_BUTTONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScene(s.id)}
            className={
              "flex items-center justify-between rounded-lg px-3 py-2 text-left " +
              (scene === s.id
                ? "bg-surface-action-subtle"
                : "bg-transparent hover:bg-surface-tertiary")
            }
          >
            <span
              className={
                "font-primary text-b14 " +
                (scene === s.id
                  ? "font-semibold text-text-action"
                  : "font-medium text-text-primary")
              }
            >
              {s.label}
            </span>
            <span className="font-primary text-l4 text-text-tertiary">
              {s.prd}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-border-primary pt-4">
        <p className="font-primary text-b12 font-semibold uppercase tracking-wide text-text-tertiary">
          Still missing
        </p>
        <ul className="flex flex-col gap-2">
          {MISSING_NOTES.map((m) => (
            <li key={m.title} className="flex items-start gap-2">
              <span className="mt-[6px] block size-1.5 shrink-0 rounded-full bg-yellow-600" />
              <span>
                <span className="block font-primary text-b14 font-medium text-text-primary">
                  {m.title}
                </span>
                <span className="block font-primary text-l4 text-text-tertiary">
                  {m.prd}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// =====================================================================
// Root app
// =====================================================================

export default function WishlistFlowApp() {
  const [scene, setScene] = useState<Scene>("landing");
  const [collections, setCollections] = useState<CollectionData[]>(INITIAL_COLLECTIONS);
  const [membership, setMembership] = useState<
    Record<ProductId, Set<CollectionId>>
  >(() => ({ ...INITIAL_MEMBERSHIP }));
  const [savedSet, setSavedSet] = useState<Set<ProductId>>(
    () => new Set(PRODUCTS.map((p) => p.id)),
  );
  const [cart, setCart] = useState<Record<ProductId, number>>({});
  const [activeCollectionId, setActiveCollectionId] = useState<CollectionId | null>(null);

  const [drawerState, setDrawerState] = useState<DrawerState | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareProductId, setShareProductId] = useState<ProductId | null>(null);
  const [creatingEmptyCollection, setCreatingEmptyCollection] = useState(false);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedSet, setSelectedSet] = useState<Set<ProductId>>(new Set());
  const [selectedAt, setSelectedAt] = useState<Record<ProductId, number>>({});
  const [bulkSheet, setBulkSheet] =
    useState<"bulk" | "move" | "copy" | "remove" | "new-collection" | null>(null);
  const [moveCopySelection, setMoveCopySelection] = useState<Set<string>>(new Set());

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = useRef(0);

  const [cartTotal, setCartTotal] = useState(0);
  const [cartLastImage, setCartLastImage] = useState<string | null>(null);

  const productById = useMemo(() => {
    const m = new Map<ProductId, ProductData>();
    [...PRODUCTS, ...HOMEPAGE_PRODUCTS].forEach((p) => m.set(p.id, p));
    return m;
  }, []);

  // ----- Drawer open/close transitions -----
  useEffect(() => {
    if (!drawerState) return;
    const id = requestAnimationFrame(() => setDrawerOpen(true));
    return () => cancelAnimationFrame(id);
  }, [drawerState]);

  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => setDrawerState(null), 280);
  }

  function pushToast(t: Omit<ToastItem, "id">) {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, TOAST_DURATION_MS);
  }

  // ----- Heart icon on a product card -----
  function handleWishlistToggle(productId: ProductId) {
    const product = productById.get(productId);
    if (!product) return;

    if (savedSet.has(productId)) {
      // §6.1: full deletion + Undo
      setSavedSet((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      setMembership((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });

      pushToast({
        variant: "removed",
        image: product.image,
        destination: "Wishlist",
        onAction: () => {
          // Undo: restore
          setSavedSet((prev) => new Set(prev).add(productId));
        },
      });
      return;
    }

    // not saved → open save drawer with current memberships
    openSaveDrawer(productId);
  }

  function openSaveDrawer(productId: ProductId) {
    const product = productById.get(productId);
    if (!product) return;
    const current = membership[productId] ?? new Set<CollectionId>();
    setDrawerState({
      product,
      initiallySelected: new Set(current),
      mode: "list",
    });
  }

  function handleSaveToCollections(
    productId: ProductId,
    selected: Set<CollectionId>,
    allItemsKept: boolean,
  ) {
    const product = productById.get(productId);
    if (!product) return;

    closeDrawer();

    if (!allItemsKept) {
      // PRD 6.2: unchecking All Items = full deletion
      setSavedSet((prev) => {
        const n = new Set(prev);
        n.delete(productId);
        return n;
      });
      setMembership((prev) => {
        const n = { ...prev };
        delete n[productId];
        return n;
      });
      pushToast({
        variant: "removed",
        image: product.image,
        destination: "Wishlist",
      });
      return;
    }

    setSavedSet((prev) => new Set(prev).add(productId));
    setMembership((prev) => ({ ...prev, [productId]: new Set(selected) }));

    if (selected.size === 0) {
      // §3.1
      pushToast({
        variant: "saved-wishlist",
        image: product.image,
        destination: "All items",
        link: "View Wishlist",
        onAction: () => openSaveDrawer(productId),
        onLink: () => setScene("landing"),
      });
    } else {
      // §3.2 — toast for last selected collection (demo)
      const lastId = Array.from(selected).pop()!;
      const coll = collections.find((c) => c.id === lastId);
      pushToast({
        variant: "saved-collection",
        image: product.image,
        destination: coll?.name ?? "Collection",
        link: "View Collection",
        onAction: () => openSaveDrawer(productId),
        onLink: () => {
          setActiveCollectionId(lastId);
          setScene("collection");
        },
      });
    }
  }

  function handleSwitchToCreate() {
    setDrawerState((prev) => (prev ? { ...prev, mode: "create" } : prev));
  }

  function handleCreateCollection(productId: ProductId, name: string) {
    const product = productById.get(productId);
    if (!product) return;

    const trimmed = name.trim();
    if (!trimmed) return;
    if (
      collections.some(
        (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      // duplicate — handled inline; no-op here
      return;
    }
    const id: CollectionId = `c-${Date.now()}`;
    const newColl: CollectionData = {
      id,
      name: trimmed,
      productType: product.productType,
      thumbs: { front: product.image },
    };
    setCollections((prev) => [...prev, newColl]);
    setSavedSet((prev) => new Set(prev).add(productId));
    setMembership((prev) => ({
      ...prev,
      [productId]: new Set([...(prev[productId] ?? []), id]),
    }));

    closeDrawer();

    pushToast({
      variant: "saved-collection",
      image: product.image,
      destination: trimmed,
      link: "View Collection",
      onAction: () => openSaveDrawer(productId),
      onLink: () => {
        setActiveCollectionId(id);
        setScene("collection");
      },
    });
  }

  // ----- Add to cart / persistent cart toast -----
  function bumpCart(id: ProductId, delta: 1 | -1) {
    const product = productById.get(id);
    setCartTotal((prev) => Math.max(0, prev + delta));
    if (delta > 0 && product) setCartLastImage(product.image);
  }

  function handleAddToCart(id: ProductId) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    bumpCart(id, 1);
  }
  function handleIncrement(id: ProductId) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    bumpCart(id, 1);
  }
  function handleDecrement(id: ProductId) {
    bumpCart(id, -1);
    setCart((c) => {
      const next = (c[id] ?? 0) - 1;
      const copy = { ...c };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  }

  // ----- Select-mode + bulk actions on landing -----
  function handleSelectButton() {
    if (selectMode) {
      setSelectMode(false);
      setSelectedSet(new Set());
      setSelectedAt({});
    } else {
      setSelectMode(true);
    }
  }

  function handleSelectToggle(id: ProductId) {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSelectedAt((prev) => ({ ...prev, [id]: Date.now() }));
  }

  function handleLongPress(id: ProductId) {
    setSelectMode(true);
    setSelectedSet(new Set([id]));
    setSelectedAt({ [id]: Date.now() });
  }

  function exitSelectMode() {
    setSelectMode(false);
    setSelectedSet(new Set());
    setSelectedAt({});
  }

  function openBulk(next: typeof bulkSheet) {
    if (next === "move" || next === "copy") setMoveCopySelection(new Set());
    setBulkSheet(next);
  }

  // Bulk action handlers (landing scope = remove from wishlist entirely, §6.3)
  function bulkRemove() {
    const ids = Array.from(selectedSet);
    if (ids.length === 0) return;
    setSavedSet((prev) => {
      const n = new Set(prev);
      ids.forEach((id) => n.delete(id));
      return n;
    });
    setMembership((prev) => {
      const n = { ...prev };
      ids.forEach((id) => delete n[id]);
      return n;
    });
    setBulkSheet(null);
    exitSelectMode();
    pushToast({
      variant: "removed",
      image: productById.get(ids[0])!.image,
      destination: "Wishlist",
      meta: `${ids.length} items`,
    });
  }

  function bulkMoveOrCopy(action: "move" | "copy") {
    const ids = Array.from(selectedSet);
    const colls = Array.from(moveCopySelection);
    if (ids.length === 0 || colls.length === 0) return;

    setMembership((prev) => {
      const next = { ...prev };
      ids.forEach((pid) => {
        const set = new Set(next[pid] ?? []);
        if (action === "move") set.clear();
        colls.forEach((cid) => set.add(cid));
        next[pid] = set;
      });
      return next;
    });
    setBulkSheet(null);
    exitSelectMode();

    const firstColl = MOVE_COPY_COLLECTIONS.find((c) => c.id === colls[0])
      ?.name ?? "Collection";
    pushToast({
      variant: action === "move" ? "moved" : "copied",
      image: productById.get(ids[0])!.image,
      destination: firstColl,
      meta: `${ids.length} items`,
    });
  }

  // ----- Active collection (for collection scene) -----
  const activeCollection = activeCollectionId
    ? collections.find((c) => c.id === activeCollectionId) ?? null
    : null;

  // ----- Toast renderer used by every scene -----
  const toastsLayer =
    toasts.length === 0 ? null : (
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
              link={t.link}
              onAction={t.onAction}
              onLink={t.onLink}
            />
          </div>
        ))}
      </div>
    );

  // ----- Persistent cart toast (slides up once, stays mounted) -----
  // The slide-up animation runs once when the element first mounts (i.e., on
  // the first ATC). Subsequent ATCs only update count + image — no re-fire,
  // no auto-dismiss.
  const viewCartLayer =
    cartTotal === 0 ? null : (
      <div className="absolute inset-x-0 bottom-3 z-50 flex justify-center px-4 animate-[toast-slide-up_300ms_ease-out_forwards]">
        <CartToastCard count={cartTotal} image={cartLastImage} />
      </div>
    );

  // ----- Bulk widget + sheet (landing) -----
  let bulkLayer: React.ReactNode = null;
  if (selectMode) {
    const ordered = Array.from(selectedSet)
      .map((id) => ({ id, at: selectedAt[id] ?? 0 }))
      .sort((a, b) => b.at - a.at);
    const items = ordered
      .map(({ id }) => productById.get(id))
      .filter((x): x is ProductData => Boolean(x))
      .map((p) => ({ src: p.image, alt: p.name }));
    const widgetAvatars = items.slice(0, 3);

    let sheet: React.ReactNode = null;
    if (bulkSheet === "bulk") {
      sheet = (
        <BulkOptionsSheet
          items={items}
          onMoveItems={() => openBulk("move")}
          onCopyItems={() => openBulk("copy")}
          onStartNewCollection={() => openBulk("new-collection")}
          onRemoveItems={() => openBulk("remove")}
        />
      );
    } else if (bulkSheet === "move" || bulkSheet === "copy") {
      sheet = (
        <MoveOrCopyItemsSheet
          action={bulkSheet === "move" ? "Move" : "Copy"}
          items={items}
          selectedCollections={moveCopySelection}
          onToggleCollection={(id) => {
            setMoveCopySelection((prev) => {
              const n = new Set(prev);
              if (n.has(id)) n.delete(id);
              else n.add(id);
              return n;
            });
          }}
          onBack={() => setBulkSheet("bulk")}
          onSave={() => bulkMoveOrCopy(bulkSheet === "move" ? "move" : "copy")}
        />
      );
    } else if (bulkSheet === "remove") {
      sheet = (
        <RemoveItemsSheet
          items={items}
          onBack={() => setBulkSheet("bulk")}
          onCancel={() => setBulkSheet(null)}
          onRemove={bulkRemove}
        />
      );
    } else if (bulkSheet === "new-collection") {
      sheet = (
        <CopyToNewCollectionSheet
          items={items}
          onBack={() => setBulkSheet("bulk")}
        />
      );
    }

    bulkLayer = (
      <>
        <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center px-2">
          <MultiSelectWidget
            count={selectedSet.size}
            avatars={widgetAvatars}
            onMore={() => openBulk("bulk")}
          />
        </div>

        {bulkSheet !== null && (
          <button
            type="button"
            aria-label="Close bottom sheet"
            onClick={() => setBulkSheet(null)}
            className="absolute inset-0 z-40 bg-black/80 animate-[backdrop-fade-in_220ms_ease-out_forwards]"
          />
        )}
        {sheet && (
          <div
            key={bulkSheet}
            className="absolute inset-x-0 bottom-0 z-50 flex justify-center animate-[sheet-slide-up_280ms_ease-out_forwards]"
          >
            {sheet}
          </div>
        )}
      </>
    );
  }

  // ----- Save drawer layer (landing) -----
  const drawerLayer = !drawerState ? null : (
    <div className="absolute inset-0 z-[70] flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={() => {
          const product = drawerState.product;
          const initial = drawerState.initiallySelected;
          if (drawerState.mode === "list") {
            setSavedSet((prev) => new Set(prev).add(product.id));
            setMembership((prev) => ({
              ...prev,
              [product.id]: new Set(initial),
            }));
            pushToast({
              variant: "saved-wishlist",
              image: product.image,
              destination: "All items",
              link: "View Wishlist",
              onAction: () => openSaveDrawer(product.id),
              onLink: () => setScene("landing"),
            });
          }
          closeDrawer();
        }}
        className={
          "absolute inset-0 bg-black/80 transition-opacity duration-300 " +
          (drawerOpen ? "opacity-100" : "opacity-0")
        }
      />
      <div
        className={
          "relative transition-transform duration-300 ease-out " +
          (drawerOpen ? "translate-y-0" : "translate-y-full")
        }
      >
        <SaveDrawer
          state={drawerState}
          collections={collections}
          onClose={closeDrawer}
          onSaveToCollections={handleSaveToCollections}
          onSwitchToCreate={handleSwitchToCreate}
          onCreateCollection={handleCreateCollection}
        />
      </div>
    </div>
  );

  // ----- Share product (single-product) layer -----
  const shareLayer = (() => {
    if (!shareProductId) return null;
    const p = productById.get(shareProductId);
    if (!p) return null;
    return (
      <div className="absolute inset-0 z-[70] flex flex-col justify-end">
        <button
          type="button"
          aria-label="Close share"
          onClick={() => setShareProductId(null)}
          className="absolute inset-0 bg-black/80 animate-[backdrop-fade-in_220ms_ease-out_forwards]"
        />
        <div className="relative animate-[sheet-slide-up_280ms_ease-out_forwards]">
          <ShareCollectionSheet title={p.name} itemCount={Number(p.sellingPrice)} />
        </div>
      </div>
    );
  })();

  // ----- Standalone "+ Create" sheet (header CTA) -----
  const emptyCreateLayer = !creatingEmptyCollection ? null : (
    <div className="absolute inset-0 z-[70] flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close create"
        onClick={() => setCreatingEmptyCollection(false)}
        className="absolute inset-0 bg-black/80 animate-[backdrop-fade-in_220ms_ease-out_forwards]"
      />
      <div className="relative animate-[sheet-slide-up_280ms_ease-out_forwards]">
        <InlineCreateCollectionSheet
          existingNames={collections.map((c) => c.name)}
          onCancel={() => setCreatingEmptyCollection(false)}
          onCreate={(name) => {
            const id: CollectionId = `c-${Date.now()}`;
            setCollections((prev) => [
              ...prev,
              { id, name, thumbs: { front: airpods } },
            ]);
            setCreatingEmptyCollection(false);
          }}
        />
      </div>
    </div>
  );

  // ----- Scene transition direction -----
  // Compute the slide direction synchronously each render. The ref is updated
  // in the post-commit effect below, so during the render *after* a scene
  // change `prevSceneRef.current` still holds the previous scene id and we
  // can derive whether the user is going forward (landing → collection) or
  // back (collection → landing).
  const prevSceneRef = useRef<Scene>(scene);
  const isCollectionScene = (s: Scene) =>
    s === "collection" || s === "collection-empty";
  const isLandingScene = (s: Scene) =>
    s === "landing" ||
    s === "landing-empty" ||
    s === "landing-no-collections";
  let navDirection: "forward" | "back" | "none" = "none";
  if (prevSceneRef.current !== scene) {
    if (isCollectionScene(scene) && isLandingScene(prevSceneRef.current)) {
      navDirection = "forward";
    } else if (
      isLandingScene(scene) &&
      isCollectionScene(prevSceneRef.current)
    ) {
      navDirection = "back";
    }
  }
  const sceneAnimClass =
    navDirection === "forward"
      ? "animate-[scene-slide-in-right_300ms_ease-out_forwards]"
      : navDirection === "back"
        ? "animate-[scene-slide-in-left_300ms_ease-out_forwards]"
        : "";
  useEffect(() => {
    prevSceneRef.current = scene;
  }, [scene]);

  // ----- Scene render -----
  let sceneEl: React.ReactNode = null;
  const visibleProducts = PRODUCTS.filter((p) => savedSet.has(p.id));

  switch (scene) {
    case "landing":
    case "landing-no-collections":
    case "landing-empty": {
      const variant: LandingProps["variant"] =
        scene === "landing-empty"
          ? "empty"
          : scene === "landing-no-collections"
            ? "no-collections"
            : "default";
      const products =
        scene === "landing-empty" ? [] : visibleProducts;

      sceneEl = (
        <div className="relative">
          <WishlistLanding
            variant={variant}
            collections={scene === "landing-no-collections" ? [] : collections}
            products={products}
            membership={membership}
            cart={cart}
            selectMode={selectMode}
            selected={selectedSet}
            selectedAt={selectedAt}
            onWishlistToggle={handleWishlistToggle}
            onSelectToggle={handleSelectToggle}
            onLongPress={handleLongPress}
            onAddToCart={handleAddToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onShareProduct={(id) => setShareProductId(id)}
            onSelectButton={handleSelectButton}
            onCreate={() => setCreatingEmptyCollection(true)}
            onCollectionClick={(id) => {
              setActiveCollectionId(id);
              setScene("collection");
            }}
          />
          {viewCartLayer}
          {bulkLayer}
          {drawerLayer}
          {shareLayer}
          {emptyCreateLayer}
          {toastsLayer}
        </div>
      );
      break;
    }
    case "collection": {
      // Source the collection's grid from the same products that appear in
      // the wishlist landing preview, filtered by membership.
      const collectionProducts = activeCollectionId
        ? PRODUCTS.filter(
            (p) =>
              savedSet.has(p.id) &&
              (membership[p.id]?.has(activeCollectionId) ?? false),
          ).map((p) => ({
            id: p.id,
            image: p.image,
            name: p.name,
            rating: p.rating,
            ratingCount: p.ratingCount,
            sellingPrice: p.sellingPrice,
            listedPrice: p.listedPrice,
            discount: p.discount,
            priceDropLabel: p.priceDropLabel,
          }))
        : [];
      sceneEl = (
        <div className="relative">
          <CollectionPage
            key={activeCollectionId ?? "default"}
            variant="default"
            title={activeCollection?.name ?? "Collection"}
            itemCount={collectionProducts.length}
            products={collectionProducts}
            onBack={() => setScene("landing")}
          />
        </div>
      );
      break;
    }
    case "collection-empty":
      sceneEl = (
        <div className="relative">
          <CollectionPage variant="empty" title="Earphones" />
        </div>
      );
      break;
    case "homepage":
      sceneEl = (
        <div className="relative">
          <div className="relative mx-auto flex h-[812px] w-[375px] flex-col overflow-hidden bg-surface-primary">
            <img src={topImg} alt="" className="block w-full shrink-0" />
            <div className="min-h-0 flex-1 overflow-y-auto bg-surface-primary py-3">
              <div className="flex items-start gap-3 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {HOMEPAGE_PRODUCTS.map((p) => (
                  <SkuCard
                    key={p.id}
                    image={p.image}
                    imageAlt={p.name}
                    name={p.name}
                    rating={p.rating}
                    price={p.sellingPrice}
                    listedPrice={p.listedPrice}
                    discount={p.discount}
                    expressVariant={
                      p.id === "hp-airpods" || p.id === "hp-charger"
                        ? "today"
                        : "default"
                    }
                    badge={
                      p.id === "hp-airpods" || p.id === "hp-bottle"
                        ? "Best Seller"
                        : undefined
                    }
                    onWishlistToggle={() => handleWishlistToggle(p.id)}
                  />
                ))}
              </div>
            </div>
            <img src={bottomImg} alt="" className="block w-full shrink-0" />
          </div>
          {drawerLayer}
          {toastsLayer}
        </div>
      );
      break;
  }

  return (
    <>
      <div className="flex min-h-full w-full justify-center bg-[#e9ebf0] py-8">
        <div className="flex items-start gap-6 px-6">
          <FlowSidebar scene={scene} setScene={setScene} />
          <div className="flex flex-col items-center gap-2">
            <p className="font-primary text-l4 text-text-tertiary">
              375 × 812 — iPhone preview
            </p>
            <div className="overflow-hidden rounded-[20px] shadow-[0_8px_32px_rgba(29,37,57,0.14)]">
              <div key={scene} className={sceneAnimClass}>
                {sceneEl}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Retune />
    </>
  );
}
