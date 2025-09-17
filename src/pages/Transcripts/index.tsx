import { useNavigate } from "react-router-dom";

export default function TranscriptsIndex() {
  const nav = useNavigate();
  return (
    <div className="px-4 pb-28 space-y-5">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Transcripts</h1>
        <p className="text-white/85 mt-2 text-lg">Select what you need to view</p>
      </header>

      <Row
        icon={<BadgeIcon />}
        title="Request Transcripts"
        cta="Begin"
        onClick={() => nav("/transcripts/request/connect")}
      />
      <Row
        icon={<ChartIcon />}
        title="Transcripts Dashboard"
        cta="View"
        onClick={() => nav("/transcripts/dashboard")}
      />
      <Row
        icon={<AlertIcon />}
        title="Transcript Alerts"
        cta="View"
        onClick={() => nav("/transcripts/alerts")}
      />
      <Row
        icon={<DocIcon />}
        title="View Transcripts"
        cta="View"
        onClick={() => nav("/transcripts/view")}
      />
    </div>
  );
}

function Row({
  icon,
  title,
  cta,
  onClick,
}: { icon: React.ReactNode; title: string; cta: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-[#E8F1FF] grid place-items-center text-[#1F66D1]">
          {icon}
        </span>
        <div className="text-xl font-semibold text-[#0E3561]">{title}</div>
      </div>
      <span className="px-5 py-2 rounded-full bg-[#1F66D1] text-white font-semibold">{cta}</span>
    </button>
  );
}

/* tiny inline icons */
function BadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24}  {...props}><path d="M7 2h10a2 2 0 0 1 2 2v14l-7-3-7 3V4a2 2 0 0 1 2-2z"/></svg>
  );
}
function ChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={30}  {...props}><path d="M4 20h16v2H4z"/><rect x="6" y="10" width="3" height="6" rx="1"/><rect x="11" y="6" width="3" height="10" rx="1"/><rect x="16" y="12" width="3" height="4" rx="1"/></svg>
  );
}
function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24} {...props}><path d="M1 21h22L12 2 1 21zm11-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-1-2V9h2v7h-2z"/></svg>
  );
}
function DocIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={24}  {...props}><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M15 2v6h6"/></svg>
  );
}
