import copyLinkIcon from "../../assets/bottomsheets/socials/copy-link.svg";
import messageIcon from "../../assets/bottomsheets/socials/message.svg";
import whatsappIcon from "../../assets/bottomsheets/socials/whatsapp.svg";
import instagramBg from "../../assets/bottomsheets/socials/instagram-bg.png";
import instagramIcon from "../../assets/bottomsheets/socials/instagram-icon.svg";
import messengerImg from "../../assets/bottomsheets/socials/messenger.png";
import tiktokImg from "../../assets/bottomsheets/socials/tiktok.png";
import xIcon from "../../assets/bottomsheets/socials/x.svg";
import moreIcon from "../../assets/bottomsheets/socials/more.svg";
import BottomSheet from "./BottomSheet";
import GridRadialBg from "./GridRadialBg";
import MasterSwatch from "./MasterSwatch";
import CollectionTitle from "./CollectionTitle";

type ChipKind =
  | "icon-tertiary"
  | "icon-on-color"
  | "image-on-bg"
  | "image-fill"
  | "image-fill-on-black";

type Chip = {
  label: string;
  kind: ChipKind;
  icon?: string;
  image?: string;
  bgColor?: string;
  bgImage?: string;
};

const CHIPS: Chip[][] = [
  [
    { label: "Copy Link", kind: "icon-tertiary", icon: copyLinkIcon },
    { label: "Message", kind: "icon-tertiary", icon: messageIcon },
    { label: "Whatsapp", kind: "icon-on-color", icon: whatsappIcon, bgColor: "#25d366" },
    { label: "Instagram", kind: "image-on-bg", icon: instagramIcon, bgImage: instagramBg },
  ],
  [
    { label: "Messenger", kind: "image-fill", image: messengerImg },
    { label: "Tiktok", kind: "image-fill-on-black", image: tiktokImg },
    { label: "X", kind: "icon-on-color", icon: xIcon, bgColor: "#000000" },
    { label: "More", kind: "icon-tertiary", icon: moreIcon },
  ],
];

function SocialChip({ chip }: { chip: Chip }) {
  const baseRing =
    "relative flex w-14 items-center justify-center rounded-full p-4 overflow-hidden";

  let body: React.ReactNode = null;
  let bgClass = "";
  let bgStyle: React.CSSProperties = {};

  switch (chip.kind) {
    case "icon-tertiary":
      bgClass = "bg-surface-tertiary";
      body = (
        <span className="relative flex size-6 items-center justify-center overflow-hidden">
          <img src={chip.icon!} alt="" aria-hidden className="block" />
        </span>
      );
      break;
    case "icon-on-color":
      bgStyle = { background: chip.bgColor };
      body = (
        <span className="relative flex size-6 items-center justify-center overflow-hidden">
          <img src={chip.icon!} alt="" aria-hidden className="block" />
        </span>
      );
      break;
    case "image-on-bg":
      bgStyle = { backgroundImage: `url(${chip.bgImage})`, backgroundSize: "cover" };
      body = (
        <span className="relative flex size-6 items-center justify-center overflow-hidden">
          <img src={chip.icon!} alt="" aria-hidden className="block" />
        </span>
      );
      break;
    case "image-fill":
      bgClass = "bg-surface-tertiary";
      body = (
        <span className="relative flex size-6 items-center justify-center overflow-hidden">
          <img
            src={chip.image!}
            alt=""
            aria-hidden
            className="block size-full object-cover"
          />
        </span>
      );
      break;
    case "image-fill-on-black":
      bgClass = "bg-black";
      body = (
        <span className="relative size-6 overflow-hidden">
          <img
            src={chip.image!}
            alt=""
            aria-hidden
            className="absolute left-[-58.33%] top-[-58.33%] size-[216.67%] max-w-none"
          />
        </span>
      );
      break;
  }

  return (
    <div className="flex w-16 flex-col items-center gap-2">
      <div className={`${baseRing} ${bgClass}`} style={bgStyle}>
        {body}
      </div>
      <p className="w-[77.5px] max-w-[77.5px] text-center font-primary text-b12 font-normal text-text-primary">
        {chip.label}
      </p>
    </div>
  );
}

export type ShareCollectionSheetProps = {
  title?: string;
  itemCount?: number;
};

export default function ShareCollectionSheet({
  title = "Home Decor",
  itemCount = 14,
}: ShareCollectionSheetProps) {
  return (
    <BottomSheet>
      <div className="relative flex w-[351px] flex-col items-start gap-4 overflow-hidden rounded-[16px] border border-border-subtle bg-surface-primary px-4 pb-3 pt-6">
        <GridRadialBg height={496} />

        <div className="relative flex w-full flex-col items-start gap-[56px] pb-3 pt-6">
          <div className="flex w-full flex-col items-center gap-10">
            <MasterSwatch />
            <CollectionTitle title={title} itemCount={itemCount} />
          </div>
        </div>

        <div className="relative h-px w-full bg-border-primary" />

        <div className="relative flex w-full flex-col items-start gap-5 overflow-hidden p-4">
          {CHIPS.map((row, i) => (
            <div key={i} className="flex w-full items-center justify-center gap-5">
              {row.map((c) => (
                <SocialChip key={c.label} chip={c} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
