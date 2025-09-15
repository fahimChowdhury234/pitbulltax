import { Plus } from "../../icons/Icons";

export default function UploadFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-[#1F66D1] text-white grid place-items-center shadow-xl active:scale-95"
      aria-label="Upload file"
    >
      <Plus className="w-7 h-7" />
    </button>
  );
}
