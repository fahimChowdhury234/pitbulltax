import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  to: string;
  title: string;
  right?: ReactNode; // arrow or "Send" button
  icon?: ReactNode;
};

export default function GradientTile({ to, title, right, icon }: Props) {
  return (
    <Link
      to={to}
      className="block rounded-2xl p-4 bg-gradient-to-r from-[#1C63CF] to-[#1EC9A6] text-white shadow-md active:scale-[.99]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-xl bg-white/15 grid place-items-center">{icon}</span>
          <div className="text-2xl font-extrabold">{title}</div>
        </div>
        <div>{right ?? <ArrowRight className="w-6 h-6" />}</div>
      </div>
    </Link>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M8 5l8 7-8 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
