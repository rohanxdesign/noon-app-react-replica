import { Retune } from "retune";
import CollectionPage from "./components/CollectionPage";

export default function CollectionApp() {
  return (
    <>
      <div className="flex min-h-full w-full justify-center bg-[#3F3F3F] py-10">
        <div className="flex flex-row flex-wrap items-start justify-center gap-10 px-6">
          <CollectionPage variant="default" />
        </div>
      </div>
      <Retune />
    </>
  );
}
