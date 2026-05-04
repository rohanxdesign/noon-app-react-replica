import BottomSheet from "./bottomsheets/BottomSheet";
import IosKeyboardMock from "./bottomsheets/IosKeyboardMock";
import CreateCollectionCard from "./CreateCollectionCard";

export type InlineCreateCollectionSheetProps = {
  existingNames: string[];
  productImage?: string;
  onCancel?: () => void;
  onCreate: (name: string) => void;
};

export default function InlineCreateCollectionSheet({
  existingNames,
  onCreate,
}: InlineCreateCollectionSheetProps) {
  return (
    <BottomSheet
      contentGap={12}
      contentToFooterGap={12}
      footer={<IosKeyboardMock />}
    >
      <CreateCollectionCard
        variant="empty-default"
        duplicateNames={existingNames}
        onSubmit={onCreate}
      />
    </BottomSheet>
  );
}
