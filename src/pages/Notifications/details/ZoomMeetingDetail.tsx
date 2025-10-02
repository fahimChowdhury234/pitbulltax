import { useParams } from "react-router-dom";
import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function ZoomMeetingDetail() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find(x => x.id === id)!;

  return (
    <DetailShell n={n}>
      <div className="grid sm:grid-cols-2 gap-3 text-[#0E3561]">
        <KV k="Date" v="06/30/2025" />
        <KV k="Client" v="smith, samy (smithsamy67@gmail.com)" />
        <KV k="Start Time" v="3:15 PM" />
        <KV k="End Time" v="4:15 PM" />
        <KV k="Duration" v="1 hour" />
        <KV k="Billable" v="$ No" />
        <KV k="Attendees" v="Eunice Araya" />
        <KV k="Record Meeting?" v="No" />
        <KV k="Subject" v="Zoom Meeting Invitation" className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <div className="font-semibold mb-1">Invitation:</div>
          <div className="rounded-xl bg-blue-50 p-3 text-sm text-[#0E3561]">
            Join Zoom Meeting … (place the invitation body here)
          </div>
        </div>
      </div>
    </DetailShell>
  );
}

function KV({ k, v, className }: { k: string; v: string; className?: string }) {
  return (
    <div className={className}>
      <div className="text-sm font-medium text-[#0E3561]/70">{k}</div>
      <div className="font-semibold">{v}</div>
    </div>
  );
}
