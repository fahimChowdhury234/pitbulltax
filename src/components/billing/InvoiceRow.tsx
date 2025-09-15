import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  client: string;
  paid: boolean;
};

export default function InvoiceRow({ id, title, client, paid }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BadgeIcon />
        <div>
          <div className="text-[18px] font-extrabold text-[#0E3561] leading-tight">{title}</div>
          <div className="text-sm text-black/70">Client: {client}</div>
          <div className="text-sm text-black/70">Paid: {paid ? "Yes" : "No"}</div>
        </div>
      </div>
      <Link
        to={`/billing/invoice/${id}`}
        className="min-w-[84px] text-center px-4 py-2 rounded-full bg-[#1F66D1] text-white font-bold"
      >
        View
      </Link>
    </div>
  );
}

function BadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <span className="w-10 h-10 rounded-xl bg-[#E8F0FE] grid place-items-center text-[#1F66D1]">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
        <path d="M5 3h14a1 1 0 0 1 1 1v13.5a1.5 1.5 0 0 1-2.25 1.3L12 16.5l-5.75 2.3A1.5 1.5 0 0 1 4 17.5V4a1 1 0 0 1 1-1Z" />
      </svg>
    </span>
  );
}
