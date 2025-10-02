import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  to: string;
  title: string;
  subtitle?: string;
  right?: ReactNode; // arrow or "Send" button
  icon?: ReactNode;
};

export default function GradientTile({
  to,
  title,
  subtitle,
  right,
  icon,
}: Props) {
  return (
    <Link
      to={to}
      className="block rounded-2xl p-5 bg-gradient-to-r from-[#1C63CF] to-[#1EC9A6] text-white shadow-lg hover:shadow-xl active:scale-[.99] transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-white/20 grid place-items-center backdrop-blur-sm">
            {icon}
          </span>
          <div>
            <div className="text-2xl font-extrabold">{title}</div>
            {subtitle && (
              <div className="text-white/80 text-sm mt-1">{subtitle}</div>
            )}
          </div>
        </div>
        <div className="opacity-80 hover:opacity-100 transition-opacity">
          {right ?? <ArrowRight className="w-6 h-6" />}
        </div>
      </div>
    </Link>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M8 5l8 7-8 7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
