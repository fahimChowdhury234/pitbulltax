import { FolderClosed, ChevronRight, CloudBadge } from "../../icons/Icons";
import { Cloud } from "../../data/files";

export default function FolderRow({
  name,
  createdAt,
  synced,
  onClick,
}: {
  name: string;
  createdAt: string;
  synced?: Cloud[];
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <FolderClosed className="w-7 h-7" />
        <div>
          <div className="text-[18px] font-extrabold text-[#0E3561]">{name}</div>
          <div className="text-sm text-gray-400 font-extrabold">{createdAt}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {synced?.map((c) => <CloudBadge key={c} cloud={c} />)}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );
}
