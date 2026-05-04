import { useState } from "react";
import Header from "./Header";
import CollectionCard from "./CollectionCard";
import ProductCard from "./ProductCard";

import homeDecorBack from "../assets/wishlist/collections/home-decor-1.png";
import homeDecorMiddle from "../assets/wishlist/collections/home-decor-2.png";
import homeDecorFront from "../assets/wishlist/collections/home-decor-3.png";
import birthdayMiddle from "../assets/wishlist/collections/birthday-1.png";
import birthdayFront from "../assets/wishlist/collections/birthday-2.png";
import sneakersFront from "../assets/wishlist/collections/sneakers-1.png";

import airpods from "../assets/wishlist/products/airpods.png";
import charger from "../assets/wishlist/products/charger.png";
import sneaker from "../assets/wishlist/products/sneaker.png";
import bottle from "../assets/wishlist/products/bottle.png";

const collections = [
  {
    name: "Home decor",
    itemCount: 9,
    assets: {
      back: homeDecorBack,
      middle: homeDecorMiddle,
      front: homeDecorFront,
    },
  },
  {
    name: "Adyuu’s Birthday",
    itemCount: 2,
    assets: {
      middle: birthdayMiddle,
      front: birthdayFront,
    },
  },
  {
    name: "Sneakers",
    itemCount: 1,
    assets: {
      front: sneakersFront,
    },
  },
];

type ProductData = {
  image: string;
  name: string;
  rating: number;
  ratingCount: number;
  sellingPrice: string;
  listedPrice: string;
  discount: string;
};

const products: ProductData[] = [
  {
    image: airpods,
    name: "Apple Airpods Pro 2 Wireless Earbuds",
    rating: 4.3,
    ratingCount: 128,
    sellingPrice: "899",
    listedPrice: "1399",
    discount: "33%",
  },
  {
    image: charger,
    name: "Anker 65W GaN Fast Charging Adapter",
    rating: 4.5,
    ratingCount: 412,
    sellingPrice: "145",
    listedPrice: "199",
    discount: "27%",
  },
  {
    image: sneaker,
    name: "Air Jordan 1 High OG Retro Sneakers",
    rating: 4.7,
    ratingCount: 89,
    sellingPrice: "750",
    listedPrice: "899",
    discount: "17%",
  },
  {
    image: bottle,
    name: "Stainless Steel Insulated Water Bottle 750ml",
    rating: 4.2,
    ratingCount: 256,
    sellingPrice: "49",
    listedPrice: "79",
    discount: "38%",
  },
  {
    image: airpods,
    name: "Premium Wireless Earbuds Bluetooth 5.3",
    rating: 4.1,
    ratingCount: 67,
    sellingPrice: "599",
    listedPrice: "799",
    discount: "25%",
  },
  {
    image: charger,
    name: "USB-C 100W Multi-Port Travel Charger",
    rating: 4.6,
    ratingCount: 203,
    sellingPrice: "220",
    listedPrice: "299",
    discount: "26%",
  },
  {
    image: sneaker,
    name: "Vintage Canvas High-Top Sneakers Unisex",
    rating: 4.4,
    ratingCount: 167,
    sellingPrice: "320",
    listedPrice: "450",
    discount: "28%",
  },
  {
    image: bottle,
    name: "Insulated Travel Tumbler 1L Vacuum Flask",
    rating: 4.5,
    ratingCount: 94,
    sellingPrice: "89",
    listedPrice: "129",
    discount: "31%",
  },
];

export default function WishlistPage({ onBack }: { onBack?: () => void } = {}) {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (i: number) =>
    setCart((c) => ({ ...c, [i]: (c[i] ?? 0) + 1 }));
  const increment = (i: number) =>
    setCart((c) => ({ ...c, [i]: (c[i] ?? 0) + 1 }));
  const decrement = (i: number) =>
    setCart((c) => {
      const next = (c[i] ?? 0) - 1;
      const copy = { ...c };
      if (next <= 0) delete copy[i];
      else copy[i] = next;
      return copy;
    });

  return (
    <div className="relative mx-auto flex h-[812px] w-[375px] flex-col overflow-hidden bg-surface-primary font-primary">
      <Header onBack={onBack} />

      <div className="flex flex-1 min-h-0 flex-col gap-8 overflow-y-auto pt-4">
        <div className="flex shrink-0 items-center gap-[19px] overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {collections.map((c) => (
            <CollectionCard
              key={c.name}
              name={c.name}
              itemCount={c.itemCount}
              assets={c.assets}
            />
          ))}
        </div>

        <div className="flex shrink-0 flex-col">
          <div className="flex items-center justify-between px-4 pb-3">
            <h2 className="font-primary text-[16px] font-bold leading-5 text-text-primary tracking-[-0.16px]">
              All Saved Items
            </h2>
            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-surface-tertiary px-3 py-1.5"
            >
              <span className="font-primary text-l3 font-semibold text-text-primary opacity-80">
                Select
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-[15px] px-4 pt-3">
            {products.map((p, i) => {
              const qty = cart[i] ?? 0;
              const variant = qty > 0 ? "added-to-cart" : "default";
              return (
                <ProductCard
                  key={i}
                  variant={variant}
                  image={p.image}
                  name={p.name}
                  rating={p.rating}
                  ratingCount={p.ratingCount}
                  sellingPrice={p.sellingPrice}
                  listedPrice={p.listedPrice}
                  discount={p.discount}
                  quantity={qty}
                  onAddToCart={() => addToCart(i)}
                  onIncrement={() => increment(i)}
                  onDecrement={() => decrement(i)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
