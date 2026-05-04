import { Retune } from "retune";
import ToastCard from "./components/ToastCard";

export default function ToastApp() {
  return (
    <>
      <div className="flex min-h-full w-full flex-col items-center justify-start bg-[#e9ebf0] py-8">
        <div
          className="flex w-[375px] flex-col items-center gap-10 px-3 py-12"
          style={{ background: "#3F3F3F" }}
        >
          <ToastCard variant="removed" />
          <ToastCard variant="moved" />
          <ToastCard variant="copied" />
          <ToastCard variant="saved-wishlist" />
          <ToastCard variant="saved-collection" />
        </div>
      </div>
      <Retune />
    </>
  );
}
