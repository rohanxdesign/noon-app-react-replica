import { useState } from "react";
import { Retune } from "retune";
import BulkOptionsSheet from "./components/bottomsheets/BulkOptionsSheet";
import MoveOrCopyItemsSheet from "./components/bottomsheets/MoveOrCopyItemsSheet";
import RemoveItemsSheet from "./components/bottomsheets/RemoveItemsSheet";
import DeleteCollectionSheet from "./components/bottomsheets/DeleteCollectionSheet";
import ShareCollectionSheet from "./components/bottomsheets/ShareCollectionSheet";
import CopyToNewCollectionSheet from "./components/bottomsheets/CopyToNewCollectionSheet";
import avatarAirpods from "./assets/bottomsheets/products/avatar-airpods.png";
import avatarDark from "./assets/bottomsheets/products/avatar-dark.png";
import avatarThree from "./assets/bottomsheets/products/avatar-three.png";
import nikeAirmax from "./assets/bottomsheets/products/nike-airmax.png";
import shoeOrganiser from "./assets/bottomsheets/products/shoe-organiser.png";
import type { AvatarItem } from "./components/bottomsheets/ProductAvatarStack";

const SELECTED_ITEMS: AvatarItem[] = [
  { src: avatarAirpods, alt: "Airpods" },
  { src: avatarDark, alt: "Perfume" },
  { src: avatarThree, alt: "Cologne" },
  { src: nikeAirmax, alt: "Nike Air Max" },
  { src: shoeOrganiser, alt: "Shoe organiser" },
];

type BulkScreen = "bulk" | "move" | "copy" | "remove" | "newCollection";

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-primary text-b14 text-text-tertiary">{label}</p>
      <div className="overflow-hidden bg-transparent">{children}</div>
    </div>
  );
}

function BulkFlow({ items }: { items: AvatarItem[] }) {
  const [screen, setScreen] = useState<BulkScreen>("bulk");
  const [selectedCollections, setSelectedCollections] = useState<Set<string>>(
    new Set(),
  );

  const back = () => setScreen("bulk");
  const toggleCollection = (id: string) => {
    setSelectedCollections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  switch (screen) {
    case "bulk":
      return (
        <BulkOptionsSheet
          items={items}
          onMoveItems={() => setScreen("move")}
          onCopyItems={() => setScreen("copy")}
          onStartNewCollection={() => setScreen("newCollection")}
          onRemoveItems={() => setScreen("remove")}
        />
      );
    case "move":
      return (
        <MoveOrCopyItemsSheet
          action="Move"
          items={items}
          selectedCollections={selectedCollections}
          onToggleCollection={toggleCollection}
          onBack={back}
          onSave={back}
        />
      );
    case "copy":
      return (
        <MoveOrCopyItemsSheet
          action="Copy"
          items={items}
          selectedCollections={selectedCollections}
          onToggleCollection={toggleCollection}
          onBack={back}
          onSave={back}
        />
      );
    case "remove":
      return (
        <RemoveItemsSheet
          items={items}
          onBack={back}
          onCancel={back}
          onRemove={back}
        />
      );
    case "newCollection":
      return <CopyToNewCollectionSheet items={items} onBack={back} />;
  }
}

export default function BottomSheetsApp() {
  return (
    <>
      <div className="flex min-h-full w-full flex-col items-center justify-start bg-[#e9ebf0] py-10">
        <div className="flex w-full max-w-[1700px] flex-col items-center gap-12 px-6">
          {/* Interactive bulk flow */}
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="font-primary text-b16 font-semibold text-text-primary">
              Bulk Item Actions — interactive flow
            </h2>
            <p className="max-w-[480px] text-center font-primary text-b12 text-text-tertiary">
              Tap a row to drill in. Use the back chevron to return to Bulk
              Options. In Move / Copy, tap collection rows to toggle selection
              — the Save Changes button activates when at least one is picked.
            </p>
            <Frame label="">
              <BulkFlow items={SELECTED_ITEMS} />
            </Frame>
          </div>

          {/* Standalone collection-level sheets */}
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="font-primary text-b16 font-semibold text-text-primary">
              Collection-level sheets
            </h2>
            <div
              className="grid items-start gap-10"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(375px, max-content))",
              }}
            >
              <Frame label="Delete Collection">
                <DeleteCollectionSheet />
              </Frame>
              <Frame label="Share Collection">
                <ShareCollectionSheet />
              </Frame>
            </div>
          </div>
        </div>
      </div>
      <Retune />
    </>
  );
}
