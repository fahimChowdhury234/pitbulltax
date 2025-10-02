import { useParams } from "react-router-dom";
import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function ChatMessageDetail() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find(x => x.id === id)!;

  return (
    <DetailShell n={n}>
      {/* Simple transcript block to mirror mock */}
      <div className="rounded-xl bg-gray-50 border p-3 text-sm text-[#0E3561]">
        <div className="text-center text-gray-500 text-xs mb-2">Chat</div>
        <div className="space-y-1">
          <div className="bg-blue-50 px-3 py-2 rounded-md w-fit">Another test</div>
          <div className="bg-blue-50 px-3 py-2 rounded-md w-fit">Hello</div>
          <div className="bg-green-50 px-3 py-2 rounded-md w-fit ml-auto">Hello</div>
        </div>
      </div>
    </DetailShell>
  );
}
