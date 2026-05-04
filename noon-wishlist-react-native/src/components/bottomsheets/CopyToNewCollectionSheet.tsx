import { useState } from "react";
import BottomSheet from "./BottomSheet";
import HeaderBar from "./HeaderBar";
import IosKeyboardMock from "./IosKeyboardMock";
import CreateCollectionCard from "../CreateCollectionCard";
import type { AvatarItem } from "./ProductAvatarStack";

export type CopyToNewCollectionSheetProps = {
  items: AvatarItem[];
  onBack?: () => void;
};

export default function CopyToNewCollectionSheet({
  items,
  onBack,
}: CopyToNewCollectionSheetProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  return (
    <BottomSheet
      contentGap={16}
      contentToFooterGap={16}
      footer={keyboardOpen ? <IosKeyboardMock /> : undefined}
    >
      <div className="flex w-[343px] flex-col items-start rounded-[16px] bg-surface-primary p-2">
        <HeaderBar
          showBack
          onBack={onBack}
          title="Create new collection"
          items={items}
        />
        <CreateCollectionCard
          variant="default"
          fullWidth
          onTextFocus={() => setKeyboardOpen(true)}
          onTextBlur={() => setKeyboardOpen(false)}
        />
      </div>
    </BottomSheet>
  );
}
