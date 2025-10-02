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
        <button onClick={() => navigate(-1)} className="underline">
          Back
        </button>
        <p className="mt-3">Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 space-y-6">
      {/* Header with Status */}
      <header className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                {inv.title}
              </h1>
              <p className="text-white/80 text-lg">Invoice #{inv.invoiceNo}</p>
            </div>
          </div>
          <StatusBadge paid={balance <= 0} />
        </div>
      </header>

      {/* Invoice Details */}
      <Section
        title={
          <>
            <UserIcon className="w-5 h-5 mr-2" />
            Invoice Details
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KV label="Client" value={inv.client} />
          <KV label="Date" value={inv.date} />
          <KV label="Invoice #" value={String(inv.invoiceNo)} />
          <KV label="Terms" value={inv.terms} />
          <KV label="Due Date" value={inv.dueDate} />
        </div>
      </Section>

      {/* Charges */}
      <Section
        title={
          <>
            <GridIcon className="w-5 h-5 mr-2" />
            Invoice Charges
          </>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#0E3561] text-sm font-semibold border-b border-gray-200">
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Work Code</th>
                <th className="py-3 pr-4">Description</th>
                <th className="py-3 pr-0 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-black/80">
              {inv.charges.map((c, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 pr-4">{c.date}</td>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{c.description}</td>
                  <td className="py-3 pr-0 text-right font-semibold">
                    ${c.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Summary */}
      <Section
        title={
          <>
            <PieIcon className="w-5 h-5 mr-2" />
            Invoice Summary
          </>
        }
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-semibold text-black/90">Subtotal</span>
            <span className="font-bold text-lg text-[#0E3561]">
              ${subtotal.toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-black/70">Tax Rate</span>
              <span className="font-semibold">{inv.taxRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">Tax Amount</span>
              <span className="font-semibold">
                ${taxAmount.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-t-2 border-gray-300">
            <span className="font-bold text-lg text-black/90">Total</span>
            <span className="font-bold text-xl text-[#0E3561]">
              ${total.toLocaleString()}
            </span>
          </div>
          <div
            className={`flex justify-between items-center py-3 px-4 rounded-xl ${
              balance > 0
                ? "bg-red-50 border border-red-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            <span className="font-bold text-lg text-black/90">Balance Due</span>
            <span
              className={`font-bold text-xl ${
                balance > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              ${balance.toLocaleString()}
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* --- small helpers/components --- */
function Section({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-[#1F66D1] to-[#0E3561] text-white px-6 py-4 text-lg font-bold flex items-center">
        {title}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
function KV({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
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

function StatusBadge({ paid }: { paid: boolean }) {
  return (
    <div
      className={`px-4 py-2 rounded-full text-sm font-bold ${
        paid
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}
    >
      {paid ? "Paid" : "Pending"}
    </div>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
