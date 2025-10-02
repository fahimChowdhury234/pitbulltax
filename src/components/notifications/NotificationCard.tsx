import { Link } from "react-router-dom";
import { NotificationItem } from "../../types/notifications";
import NotificationIcon, { kindColor } from "./NotificationIcon";

function fmtDate(s: string) {
  const d = new Date(s);
  const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const day = d.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "numeric" });
  return `${t} ${day}`;
}

type Props = { n: NotificationItem };

export default function NotificationCard({ n }: Props) {
  return (
    <div className={`rounded-2xl text-white shadow-md ${kindColor[n.kind]} px-3 py-3`}>
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-white/15 grid place-items-center">
            <NotificationIcon kind={n.kind} />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xl font-bold leading-tight">{n.title}</div>
          <div className="mt-1 text-white/90">
            <span className="font-semibold">Client: </span>
            {n.client}
          </div>
          <div className="mt-1">
            <Link
              to={`/notifications/${n.id}`}
              className="underline font-semibold hover:opacity-90"
            >
              View
            </Link>
          </div>
          <div className="mt-2 text-sm font-semibold">{fmtDate(n.at)}</div>
        </div>
      </div>
    </div>
  );
}
