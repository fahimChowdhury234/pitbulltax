import { useNavigate, useParams } from "react-router-dom";
import { NEWS } from "../../data/news";

export default function NewsDetail() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const item = NEWS.find((n) => String(n.id) === id);

  if (!item) {
    return (
      <div className="px-4 py-6 text-white">
        <button onClick={() => nav(-1)} className="underline">Back</button>
        <p className="mt-3">News item not found.</p>
      </div>
    );
    }

  return (
    <div className="px-4 pt-6 pb-28">
      <button
        onClick={() => nav(-1)}
        className="inline-flex items-center gap-2 text-white/90 mb-3"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
        {item.title}
      </h1>
      <div className="text-white/70 mt-1">{formatDate(item.createdAt)}</div>

      <article className="mt-5 bg-white rounded-2xl shadow p-4 text-[#0E3561] whitespace-pre-line">
        {item.body}
      </article>
    </div>
  );
}

function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" {...props}>
      <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const dStr = d.toLocaleDateString(undefined, {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const tStr = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dStr} ${tStr}`;
  } catch {
    return iso;
  }
}
