import { Retune } from "retune";
import MultiSelectWidget from "./components/MultiSelectWidget";
import airpodsImg from "./assets/wishlist/products/airpods.png";
import chargerImg from "./assets/wishlist/products/charger.png";
import sneakerImg from "./assets/wishlist/products/sneaker.png";
import bottleImg from "./assets/wishlist/products/bottle.png";

export default function MultiSelectApp() {
  return (
    <>
      <div className="flex min-h-full w-full flex-col items-center justify-start bg-[#e9ebf0] py-8">
        <div
          className="relative flex w-[375px] flex-col items-center gap-10 px-3 py-12"
          style={{ background: "#3F3F3F" }}
        >
          <MultiSelectWidget
            count={1}
            avatars={[{ src: airpodsImg, alt: "Airpods" }]}
          />

          <MultiSelectWidget
            count={2}
            avatars={[
              { src: bottleImg, alt: "Bottle" },
              { src: airpodsImg, alt: "Airpods" },
            ]}
          />

          <MultiSelectWidget
            count={3}
            avatars={[
              { src: sneakerImg, alt: "Sneaker" },
              { src: chargerImg, alt: "Charger" },
              { src: airpodsImg, alt: "Airpods" },
            ]}
          />

          <MultiSelectWidget
            count={5}
            avatars={[
              { src: sneakerImg, alt: "Sneaker" },
              { src: chargerImg, alt: "Charger" },
              { src: airpodsImg, alt: "Airpods" },
              { src: bottleImg, alt: "Bottle" },
              { src: airpodsImg, alt: "Airpods" },
            ]}
          />

          <MultiSelectWidget
            count={12}
            avatars={[
              { src: bottleImg, alt: "Bottle" },
              { src: sneakerImg, alt: "Sneaker" },
              { src: airpodsImg, alt: "Airpods" },
              { src: chargerImg, alt: "Charger" },
            ]}
          />
        </div>
      </div>
      <Retune />
    </>
  );
}
