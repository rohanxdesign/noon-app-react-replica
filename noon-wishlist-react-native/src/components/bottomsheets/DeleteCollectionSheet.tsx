import BottomSheet from "./BottomSheet";
import GridRadialBg from "./GridRadialBg";
import MasterSwatch from "./MasterSwatch";
import CollectionTitle from "./CollectionTitle";
import { CancelButton, DangerButton } from "./Buttons";

export type DeleteCollectionSheetProps = {
  title?: string;
  itemCount?: number;
};

export default function DeleteCollectionSheet({
  title = "Home Decor",
  itemCount = 14,
}: DeleteCollectionSheetProps) {
  return (
    <BottomSheet>
      <div className="relative flex w-[351px] flex-col items-start gap-4 overflow-hidden rounded-[16px] border border-border-subtle bg-surface-primary px-4 pb-3 pt-6">
        <GridRadialBg height={484} />

        <div className="relative flex w-full flex-col items-start gap-[56px] pb-3 pt-6">
          <div className="flex w-full flex-col items-center gap-10">
            <MasterSwatch />
            <CollectionTitle title={title} itemCount={itemCount} />
          </div>
        </div>

        <div className="relative h-px w-full bg-border-primary" />

        <div className="relative flex w-full flex-col items-start gap-6">
          <div className="flex w-full items-center justify-center px-0.5">
            <p className="flex-1 text-center font-primary text-b16 font-medium text-text-primary">
              Are you sure you want to delete this collection?
            </p>
          </div>
          <div className="flex w-full items-start gap-3">
            <CancelButton size="sm">Cancel</CancelButton>
            <DangerButton size="sm" shade="deep">
              Yes, delete
            </DangerButton>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
