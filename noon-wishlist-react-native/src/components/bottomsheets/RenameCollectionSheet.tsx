import BottomSheet from "./BottomSheet";
import IosKeyboardMock from "./IosKeyboardMock";
import CreateCollectionCard from "../CreateCollectionCard";

export default function RenameCollectionSheet() {
  return (
    <BottomSheet contentGap={12} contentToFooterGap={12} footer={<IosKeyboardMock />}>
      <CreateCollectionCard variant="filled" />
    </BottomSheet>
  );
}
