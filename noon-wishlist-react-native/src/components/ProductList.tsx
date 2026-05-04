import SkuCard, { type SkuCardProps } from "./SkuCard";
import airpodsImg from "../assets/sku/airpods.png";
import washingMachineImg from "../assets/sku/product.png";
import phoneCaseImg from "../assets/sku/phonecase.png";
import chargerImg from "../assets/wishlist/products/charger.png";
import sneakerImg from "../assets/wishlist/products/sneaker.png";
import bottleImg from "../assets/wishlist/products/bottle.png";

export const products: SkuCardProps[] = [
  {
    image: airpodsImg,
    imageSize: 122,
    name: "Apple Airpods Pro 2 Wireless Earbuds",
    rating: "4.5",
    price: "899",
    listedPrice: "1399",
    discount: "33%",
    badge: "Best Seller",
    expressVariant: "today",
  },
  {
    image: washingMachineImg,
    name: "Whirlpool 7 kg Magic Clean",
    rating: "4.3",
    price: "899",
    listedPrice: "1399",
    discount: "33%",
    expressVariant: "default",
  },
  {
    image: phoneCaseImg,
    name: "MAYNOS Suction Phone Case Mount",
    rating: "4.1",
    price: "129",
    listedPrice: "199",
    discount: "35%",
    expressVariant: "default",
  },
  {
    image: chargerImg,
    imageSize: 122,
    name: "Anker 65W USB-C Fast Wall Charger",
    rating: "4.7",
    price: "199",
    listedPrice: "299",
    discount: "33%",
    expressVariant: "today",
  },
  {
    image: sneakerImg,
    name: "Air Jordan 1 Mid 'Yellow Toe' Sneakers",
    rating: "4.4",
    price: "549",
    listedPrice: "799",
    discount: "31%",
    expressVariant: "default",
  },
  {
    image: bottleImg,
    name: "Stanley Quencher Insulated Water Bottle",
    rating: "4.6",
    price: "149",
    listedPrice: "229",
    discount: "35%",
    badge: "Best Seller",
    expressVariant: "default",
  },
];

type Props = {
  onWishlistToggle?: (product: SkuCardProps) => void;
};

export default function ProductList({ onWishlistToggle }: Props) {
  return (
    <div className="bg-surface-primary py-3">
      <div className="flex items-start gap-3 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((p, i) => (
          <SkuCard
            key={i}
            {...p}
            onWishlistToggle={() => onWishlistToggle?.(p)}
          />
        ))}
      </div>
    </div>
  );
}
