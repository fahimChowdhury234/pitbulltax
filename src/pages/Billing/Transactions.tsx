import { useMemo, useState } from "react";
import InvoiceRow from "../../components/billing/InvoiceRow";
import PaymentRow from "../../components/billing/PaymentRow";
import Pagination from "../../components/Pagination";
import { INVOICES, PAYMENTS } from "../../data/billing";

const PAGE_SIZE = 6;

export default function BillingTransactions() {
  const [tab, setTab] = useState<"invoices" | "payments">("invoices");
  const [page, setPage] = useState(1);

  const items = useMemo(() => (tab === "invoices" ? INVOICES : PAYMENTS), [tab]);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = items.slice(start, start + PAGE_SIZE);

  return (
    <div className="px-4 pb-28 space-y-4">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Transactions</h1>
        <p className="text-white/90 mt-1">View transaction history or send payment link</p>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <TabBtn active={tab === "invoices"} onClick={() => { setTab("invoices"); setPage(1); }}>
          Invoices
        </TabBtn>
        <Toggle />
        <TabBtn active={tab === "payments"} onClick={() => { setTab("payments"); setPage(1); }}>
          Payments
        </TabBtn>
      </div>

      {/* List */}
      <div className="space-y-3">
        {tab === "invoices"
          ? paged.map((i) => (
              <InvoiceRow key={i.id} id={i.id} title={i.title} client={i.client} paid={i.paid} />
            ))
          : paged.map((p) =>
              "amount" in p && "method" in p && "date" in p && "status" in p ? (
                <PaymentRow key={p.id} {...p} />
              ) : null
            )}
      </div>

      {/* Pagination */}
      <div className="pb-20">
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base = "px-4 py-2 rounded-full text-sm font-semibold";
  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? "bg-white text-[#0E3561]" : "bg-white/20 text-white"}`}
    >
      {children}
    </button>
  );
}
function Toggle() {
  return (
    <span className="px-2 text-white/80" aria-hidden>◦</span>
  );
}
