import { Link } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  client: string;
  paid: boolean;
};

export default function InvoiceRow({ id, title, client, paid }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between hover:shadow-xl transition-all duration-200 border border-gray-100 group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <BadgeIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-[#0E3561] leading-tight mb-1">
            {title}
          </div>
          <div className="text-sm text-gray-600 font-medium mb-1">
            Client: {client}
          </div>
          <div className="flex items-center gap-2">
            <StatusDot paid={paid} />
            <span className="text-sm text-gray-500">
              {paid ? "Paid" : "Pending"}
            </span>
          </div>
        </div>
      </div>
      <Link
        to={`/billing/invoice/${id}`}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1F66D1] to-[#0E3561] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group-hover:scale-105"
      >
        <EyeIcon className="w-4 h-4" />
        View
      </Link>
    </div>
  );
}

function BadgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5 3h14a1 1 0 0 1 1 1v13.5a1.5 1.5 0 0 1-2.25 1.3L12 16.5l-5.75 2.3A1.5 1.5 0 0 1 4 17.5V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function StatusDot({ paid }: { paid: boolean }) {
  return (
    <div
      className={`w-2 h-2 rounded-full ${
        paid ? "bg-green-500" : "bg-amber-500"
      }`}
    />
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
