import type { Payment } from "../../data/billing";

export default function PaymentRow({
  client,
  amount,
  method,
  date,
  status,
}: Payment) {
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between hover:shadow-xl transition-all duration-200 border border-gray-100 group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <PaymentIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-[#0E3561] leading-tight mb-1">
            {client}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <MethodIcon method={method} />
            <span className="text-sm text-gray-600 font-medium">{method}</span>
          </div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-[#0E3561] mb-1">
          ${amount.toFixed(2)}
        </div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Completed"
              ? "bg-green-100 text-green-800 border border-green-200"
              : status === "Failed"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-amber-100 text-amber-800 border border-amber-200"
          }`}
        >
          <StatusDot status={status} />
          {status}
        </div>
      </div>
    </div>
  );
}

function PaymentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function MethodIcon({ method }: { method: string }) {
  if (
    method.toLowerCase().includes("card") ||
    method.toLowerCase().includes("credit")
  ) {
    return <CreditCardIcon className="w-4 h-4 text-gray-500" />;
  } else if (
    method.toLowerCase().includes("bank") ||
    method.toLowerCase().includes("transfer")
  ) {
    return <BankIcon className="w-4 h-4 text-gray-500" />;
  } else if (method.toLowerCase().includes("paypal")) {
    return <PayPalIcon className="w-4 h-4 text-gray-500" />;
  } else {
    return <DollarIcon className="w-4 h-4 text-gray-500" />;
  }
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === "Completed"
      ? "bg-green-500"
      : status === "Failed"
      ? "bg-red-500"
      : "bg-amber-500";

  return <div className={`w-2 h-2 rounded-full ${color}`} />;
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function BankIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="5" y1="21" x2="5" y2="7" />
      <line x1="9" y1="21" x2="9" y2="7" />
      <line x1="15" y1="21" x2="15" y2="7" />
      <line x1="19" y1="21" x2="19" y2="7" />
      <path d="M2 7h20v4H2z" />
    </svg>
  );
}

function PayPalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.543-.676c-.608-.685-1.46-1.03-2.53-1.03H9.342c-.524 0-.968.382-1.05.9L6.9 18.9h4.61c.524 0 .968-.382 1.05-.9l1.12-7.106h2.19c2.57 0 4.578-.543 5.69-1.81 1.01-1.15 1.304-2.42 1.012-4.287z" />
    </svg>
  );
}

function DollarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
