import { ReactNode } from "react";
import { NotificationItem } from "../../../types/notifications";
import NotificationIcon, { kindColor } from "../../../components/notifications/NotificationIcon";
import { useNavigate } from "react-router-dom";

type Props = { n: NotificationItem; children: ReactNode };

export default function DetailShell({ n, children }: Props) {
  const nav = useNavigate();
  return (
    <div className="px-4 pb-28 space-y-4">
      <header className="pt-2 flex items-center gap-3">
        <button
          onClick={() => nav(-1)}
          aria-label="Back"
          className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="text-4xl font-extrabold text-white">
          {n.title}
        </h1>
      </header>

      {/* Colored banner */}
      <div className={`rounded-2xl text-white ${kindColor[n.kind]} p-4 shadow`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center">
            <NotificationIcon kind={n.kind} />
          </div>
          <div className="min-w-0">
            <div className="text-xl font-bold">{n.title}</div>
            <div className="text-white/90"><span className="font-semibold">Client:</span> {n.client}</div>
            <div className="text-sm mt-1 opacity-90">{new Date(n.at).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white/95 rounded-2xl shadow p-4">{children}</div>
    </div>
  );
}
