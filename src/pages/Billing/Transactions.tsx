import { useMemo, useState } from "react";
import InvoiceRow from "../../components/billing/InvoiceRow";
import PaymentRow from "../../components/billing/PaymentRow";
import Pagination from "../../components/Pagination";
import { INVOICES, PAYMENTS } from "../../data/billing";

const PAGE_SIZE = 6;

export default function BillingTransactions() {
  const [tab, setTab] = useState<"invoices" | "payments">("invoices");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const items = useMemo(() => {
    const baseItems = tab === "invoices" ? INVOICES : PAYMENTS;
    if (!searchTerm) return baseItems;

    return baseItems.filter((item) => {
      if (tab === "invoices") {
        return (
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.client.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return (
          item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item as any).method?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
  }, [tab, searchTerm]);

  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = items.slice(start, start + PAGE_SIZE);

  return (
    <div className="px-4 pb-28 space-y-6">
      <header className="pt-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center shadow-lg">
            <TransactionIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white">Transactions</h1>
            <p className="text-white/90 text-lg">
              View transaction history and manage payments
            </p>
          </div>
        </div>
      </header>

      {/* Search and Stats */}
      <div className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${tab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Total {tab}</div>
            <div className="text-white font-bold text-2xl">{items.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">This Page</div>
            <div className="text-white font-bold text-2xl">{paged.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-white/70 text-sm">Pages</div>
            <div className="text-white font-bold text-2xl">{pages}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <TabBtn
          active={tab === "invoices"}
          onClick={() => {
            setTab("invoices");
            setPage(1);
          }}
        >
          <InvoiceIcon className="w-5 h-5 mr-2" />
          Invoices
        </TabBtn>
        <Toggle />
        <TabBtn
          active={tab === "payments"}
          onClick={() => {
            setTab("payments");
            setPage(1);
          }}
        >
          <PaymentIcon className="w-5 h-5 mr-2" />
          Payments
        </TabBtn>
      </div>

      {/* List */}
      <div className="space-y-3">
        {paged.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
              <SearchIcon className="w-8 h-8 text-white/60" />
            </div>
            <p className="text-white/70 text-lg">No {tab} found</p>
            <p className="text-white/50 text-sm">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          paged.map((item) =>
            tab === "invoices" ? (
              <InvoiceRow
                key={item.id}
                id={item.id}
                title={item.title}
                client={item.client}
                paid={item.paid}
              />
            ) : "amount" in item &&
              "method" in item &&
              "date" in item &&
              "status" in item ? (
              <PaymentRow key={item.id} {...item} />
            ) : null
          )
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="pb-20">
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      )}
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
  const base =
    "px-6 py-3 rounded-2xl text-sm font-semibold flex items-center transition-all duration-200";
  return (
    <button
      onClick={onClick}
      className={`${base} ${
        active
          ? "bg-white text-[#0E3561] shadow-lg"
          : "bg-white/20 text-white hover:bg-white/30"
      }`}
    >
      {children}
    </button>
  );
}
function Toggle() {
  return (
    <span className="px-2 text-white/80" aria-hidden>
      ◦
    </span>
  );
}

function TransactionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M9 12l2 2 4-4" />
      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function InvoiceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <rect x="6" y="9" width="6" height="2" rx="1" className="fill-white" />
    </svg>
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
