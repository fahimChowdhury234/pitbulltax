import GradientTile from "../../components/billing/GradientTile";

export default function BillingHome() {
  return (
    <div className="px-4 pb-28">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Billing</h1>
        <p className="text-white/90 mt-1">View transaction history or send payment links</p>
      </header>

      <div className="mt-5 space-y-4">
        <GradientTile
          to="/billing/transactions"
          title="Transactions"
          icon={<MiniCardIcon className="w-7 h-7" />}
        />

        <GradientTile
          to="/billing/send-link"
          title="Send Payment Link"
          icon={<MinusSquareIcon className="w-7 h-7" />}
          right={
            <span className="px-5 py-2 rounded-full bg-[#0E3561] text-white font-bold shadow">Send</span>
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
