import { FileTypeIcon, CloudBadge, DotsVertical } from "../../icons/Icons";
import { Cloud, FileType } from "../../data/files";

export default function FileRow({
  name,
  type,
  createdAt,
  unread,
  synced,
  withMenu = false,
  onOpen,
  onMenu,
}: {
  name: string;
  type: FileType;
  createdAt: string;
  unread?: boolean;
  synced?: Cloud[];
  withMenu?: boolean;               // true inside a folder (to show 3 dots)
  onOpen?: () => void;
  onMenu?: () => void;
}) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between">
      <button onClick={onOpen} className="flex items-center gap-3 text-left">
        <div className="relative">
          {unread && <span className="absolute -left-1 -top-1 w-2 h-2 bg-blue-500 rounded-full" />}
          <FileTypeIcon type={type} />
        </div>
        <div>
          <div className={`text-[18px] ${unread ? "font-extrabold text-[#0E3561]" : "font-semibold text-[#0E3561]"}`}>
            {name}
          </div>
          <div className={`text-sm ${unread ? "font-extrabold text-gray-400" : "text-gray-400"}`}>
            {createdAt}
          </div>
        </div>
      </button>

      <div className="flex items-center gap-2">
        {synced?.map((c) => <CloudBadge key={c} cloud={c} />)}
        {withMenu ? (
          <button onClick={onMenu} className="p-2 text-gray-500 hover:text-[#1F66D1]">
            <DotsVertical className="w-5 h-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
