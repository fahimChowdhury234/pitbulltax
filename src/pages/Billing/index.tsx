import GradientTile from "../../components/billing/GradientTile";

export default function BillingHome() {
  return (
    <div className="px-4 pb-28">
      <header className="pt-2 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F66D1] to-[#0E3561] flex items-center justify-center shadow-lg">
            <DollarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white">Billing</h1>
            <p className="text-white/90 text-lg">
              Manage your invoices and payments
            </p>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Paid Invoices</p>
              <p className="text-white font-bold text-xl">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Pending</p>
              <p className="text-white font-bold text-xl">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="space-y-4">
        <GradientTile
          to="/billing/transactions"
          title="View Transactions"
          subtitle="See all invoices and payments"
          icon={<MiniCardIcon className="w-7 h-7" />}
        />

        <GradientTile
          to="/billing/send-link"
          title="Send Payment Link"
          subtitle="Request payment from clients"
          icon={<MinusSquareIcon className="w-7 h-7" />}
          right={
            <span className="px-5 py-2 rounded-full bg-[#0E3561] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200">
              Send
            </span>
          }
        />
      </div>
    </div>
  );
}

function MiniCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <rect x="6" y="9" width="6" height="2" rx="1" className="fill-white" />
    </svg>
  );
}
function MinusSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <rect x="7" y="11" width="10" height="2" rx="1" className="fill-white" />
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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
