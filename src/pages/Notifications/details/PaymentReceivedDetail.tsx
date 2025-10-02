import { useParams } from "react-router-dom";
import { NOTIFICATIONS } from "../../../data/notifications";
import DetailShell from "./DetailShell";

export default function PaymentReceivedDetail() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find(x => x.id === id)!;

  return (
    <DetailShell n={n}>
      <div className="grid sm:grid-cols-2 gap-4 text-[#0E3561]">
        <KV k="Invoice Number" v="#18" />
        <KV k="Client" v="James, Lebron" />
        <KV k="Invoice Total" v="$453.75" />
        <KV k="Invoice Due Date" v="07/07/22" />
        <KV k="Balance Pending" v="$0.00" />
        <KV k="Representative" v="Rebeca Trejos" />

        <div className="sm:col-span-2">
          <div className="flex gap-6 border-b pb-2 mb-3">
            <span className="font-bold text-[#16a34a] border-b-2 border-[#16a34a]">Payment History</span>
            <span className="opacity-60">Services Provided</span>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left text-[#0E3561]/70">
              <tr><th className="py-1 pr-4">Date</th><th className="py-1 pr-4">Amount</th><th className="py-1 pr-4">Payment Method</th></tr>
            </thead>
            <tbody className="text-[#0E3561]">
              <tr className="border-t"><td className="py-2 pr-4">10/29/24</td><td className="py-2 pr-4">$200.00</td><td className="py-2 pr-4">Cash</td></tr>
              <tr className="border-t"><td className="py-2 pr-4">10/29/24</td><td className="py-2 pr-4">$200.00</td><td className="py-2 pr-4">Cash</td></tr>
              <tr className="border-t"><td className="py-2 pr-4">10/29/24</td><td className="py-2 pr-4">$53.75</td><td className="py-2 pr-4">Cash</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </DetailShell>
  );
}
function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-[#0E3561]/70">{k}</div>
      <div className="font-semibold">{v}</div>
    </div>
  );
}
