import productImg from "../assets/sku/product.png";
import expressImg from "../assets/sku/express.png";
import expressTodayImg from "../assets/sku/express-today.png";
import heartIcon from "../assets/sku/heart.svg";
import plusIcon from "../assets/sku/plus.svg";
import starIcon from "../assets/sku/star.svg";
import truckIcon from "../assets/sku/truck.svg";

export type SkuExpressVariant = "default" | "today";

export type SkuCardProps = {
  image?: string;
  imageAlt?: string;
  imageSize?: number;
  name?: string;
  rating?: string | number;
  price?: string;
  listedPrice?: string;
  discount?: string;
  badge?: string;
  expressVariant?: SkuExpressVariant;
  onWishlistToggle?: () => void;
  onAddToCart?: () => void;
};

export default function SkuCard({
  image = productImg,
  imageAlt,
  imageSize = 122,
  name = "Whirlpool 7 kg Magic Clean ",
  rating = "4.3",
  price = "899",
  listedPrice = "1399",
  discount = "33%",
  badge,
  expressVariant = "default",
  onWishlistToggle,
  onAddToCart,
}: SkuCardProps) {
  return (
    <div className="flex w-[134px] shrink-0 flex-col items-start gap-1 rounded-lg bg-surface-primary font-primary">
      <div
        className="relative flex h-[174px] w-[134px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-[10px]"
        style={{ background: "rgba(7, 47, 143, 0.04)" }}
      >
        <img
          src={image}
          alt={imageAlt ?? name}
          className="max-w-none object-cover"
          style={{ width: imageSize, height: imageSize }}
        />

        {badge && (
          <div className="absolute left-0 top-0 flex h-5 items-center rounded-br-[10px] bg-emerald-800 px-1.5 py-0.5">
            <span className="whitespace-nowrap text-b12 font-semibold text-text-on-surface-bold">
              {badge}
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={onWishlistToggle}
          className="absolute left-[106px] top-[4px] flex items-center justify-center rounded-full bg-alpha-light-16 p-1"
        >
          <img src={heartIcon} alt="" aria-hidden className="block size-4" />
        </button>

        <button
          type="button"
          aria-label="Add to cart"
          onClick={onAddToCart}
          className="absolute left-[96px] top-[136px] flex size-8 items-center justify-center rounded-lg border-[1.2px] border-border-subtle bg-surface-primary"
        >
          <img src={plusIcon} alt="" aria-hidden className="block size-4" />
        </button>
      </div>

      <div className="flex w-full flex-col items-start gap-2 p-1">
        <div className="flex w-full flex-col items-start gap-1">
          <p
            className="h-9 w-full overflow-hidden text-b14 font-medium text-text-primary"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {name}
          </p>
          <div className="flex items-center gap-0.5 rounded bg-alpha-dark-4 px-1 py-0.5">
            <img
              src={starIcon}
              alt=""
              aria-hidden
              className="block h-[11.5px] w-3 shrink-0"
            />
            <span className="whitespace-nowrap text-b12 font-semibold text-text-primary">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center gap-0.5">
            <span className="whitespace-nowrap text-b14 font-bold text-text-primary">
              {price}
            </span>
            <span className="whitespace-nowrap text-b12 font-normal text-text-tertiary line-through">
              {listedPrice}
            </span>
            <span className="whitespace-nowrap text-b12 font-semibold text-text-success">
              {discount}
            </span>
          </div>
          <div className="flex w-full items-start gap-1">
            <span className="relative block size-[14px] shrink-0 overflow-hidden">
              <img
                src={truckIcon}
                alt=""
                aria-hidden
                className="absolute bottom-[15.63%] left-[9.38%] right-[9.51%] top-[21.88%] block"
              />
            </span>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-b12 font-medium text-text-tertiary">
              Free Delivery
            </p>
          </div>
        </div>

        {expressVariant === "default" && (
          <div className="relative h-4 w-[53px] overflow-hidden">
            <img
              src={expressImg}
              alt="express"
              className="absolute left-0 top-0 block h-full w-[177.36%] max-w-none"
            />
          </div>
        )}
        {expressVariant === "today" && (
          <div className="relative h-4 w-[97px] overflow-hidden">
            <img
              src={expressTodayImg}
              alt="express today"
              className="absolute left-0 top-0 block size-full max-w-none object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
