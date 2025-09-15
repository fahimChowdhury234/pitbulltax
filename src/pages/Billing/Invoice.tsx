import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { INVOICE_MAP } from "../../data/billing";

type Params = { id: string };

export default function BillingInvoice() {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const inv = INVOICE_MAP[Number(id)];

  const { subtotal, taxAmount, total, balance } = useMemo(() => {
    const subtotal = inv?.charges.reduce((s, c) => s + c.amount, 0) ?? 0;
    const taxAmount = inv ? +(subtotal * (inv.taxRate / 100)).toFixed(2) : 0;
    const total = +(subtotal + taxAmount).toFixed(2);
    const balance = +(total - (inv?.payments ?? 0)).toFixed(2);
    return { subtotal, taxAmount, total, balance };
  }, [inv]);

  if (!inv) {
    return (
      <div className="px-4 py-6 text-white">
        <button onClick={() => navigate(-1)} className="underline">Back</button>
        <p className="mt-3">Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 space-y-4">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">{inv.title}</h1>
      </header>

      {/* Invoice Details */}
      <Section title={<><UserIcon className="w-5 h-5 mr-2" />Invoice Details</>}>
        <KV label="Client" value={inv.client} />
        <KV label="Date" value={inv.date} />
        <KV label="Invoice #" value={String(inv.invoiceNo)} />
        <KV label="Terms" value={inv.terms} />
        <KV label="Due Date" value={inv.dueDate} />
      </Section>

      {/* Charges */}
      <Section title={<><GridIcon className="w-5 h-5 mr-2" />Invoice Charges</>}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#0E3561] text-sm font-semibold">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Work Code</th>
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-0">Amount</th>
              </tr>
            </thead>
            <tbody className="text-black/80">
              {inv.charges.map((c, i) => (
                <tr key={i} className="border-t border-black/5">
                  <td className="py-2 pr-4">{c.date}</td>
                  <td className="py-2 pr-4">{c.code}</td>
                  <td className="py-2 pr-4">{c.description}</td>
                  <td className="py-2 pr-0">${c.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Summary */}
      <Section title={<><PieIcon className="w-5 h-5 mr-2" />Invoice Summary</>}>
        <KV label="Subtotal" value={`$${subtotal.toLocaleString()}`} large />
        <div className="grid grid-cols-2 gap-3">
          <KV label="Tax Rate" value={`${inv.taxRate.toFixed(2)} %`} />
          <KV label="Tax Amount" value={`$${taxAmount.toLocaleString()}`} />
        </div>
        <KV label="Total" value={`$${total.toLocaleString()}`} large />
        <KV label="Balance Due" value={`$${balance.toLocaleString()}`} large />
      </Section>
    </div>
  );
}

/* --- small helpers/components --- */
function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow-md overflow-hidden">
      <div className="bg-[#1F66D1] text-white px-4 py-2 text-[17px] font-extrabold flex items-center">
        {title}
      </div>
      <div className="px-4 py-3 space-y-2">{children}</div>
    </div>
  );
}
function KV({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`py-1 ${large ? "text-lg" : ""}`}>
      <span className="font-semibold text-black/90">{label}: </span>
      <span className="text-black/80">{value}</span>
    </div>
  );
}
function UserIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.6-4 13.4-4 16 0" />
    </svg>
  );
}
function GridIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
    </svg>
  );
}
function PieIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M11 2a1 1 0 0 0-1 1v9H1a1 1 0 0 0-1 1 11 11 0 1 0 11-11Z" />
      <path d="M13 0a11 11 0 0 1 11 11h-9a2 2 0 0 1-2-2V0Z" />
    </svg>
  );
}
