import type { Payment } from "../../data/billing";

export default function PaymentRow({ client, amount, method, date, status }: Payment) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between">
      <div>
        <div className="text-[18px] font-extrabold text-[#0E3561] leading-tight">
          {client} • {method}
        </div>
        <div className="text-sm text-black/70">{date}</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-[#0E3561]">${amount.toFixed(2)}</div>
        <div className={`text-sm ${status === "Completed" ? "text-green-600" : status === "Failed" ? "text-red-600" : "text-amber-600"}`}>
          {status}
        </div>
      </div>
    </div>
  );
}
