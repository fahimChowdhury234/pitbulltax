type Props = {
  label: string;
  to?: string;
  children: React.ReactNode; // icon
  badge?: number;
};

import { Link } from "react-router-dom";

export default function MenuTile({ label, to = "#", children, badge }: Props) {
  return (
    <Link
      to={to}
      className="relative rounded-2xl bg-[#0E3561]/90 hover:bg-[#0E3561] transition-colors shadow-md active:scale-[0.99]"
    >
      <div className="p-5 flex flex-col items-center justify-center h-28 w-full">
        <div className="w-8 h-8 text-white/95">{children}</div>
        <div className="mt-4 text-sm font-semibold">{label}</div>
      </div>

      {/* red badge */}
      {badge && badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full px-2 py-[2px] shadow">
          {badge}
        </span>
      )}
    </Link>
  );
}
