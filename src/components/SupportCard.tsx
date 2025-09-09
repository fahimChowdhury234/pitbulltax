import { ReactNode, SVGProps } from "react";
import { Link } from "react-router-dom";

interface SupportCardProps {
  to?: string;                 // optional link
  title: string;
  subtitle: string;
  icon: ReactNode;             // pass an <svg />
  badge?: number;              // optional red badge
}

export default function SupportCard({
  to,
  title,
  subtitle,
  icon,
  badge,
}: SupportCardProps) {
  const Wrapper = to ? Link : "div";
  const wrapperProps = to ? { to } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="block bg-white rounded-2xl shadow-sm px-4 py-3 md:px-5 md:py-5"
    >
      <div className="flex items-center gap-4">
        <div className="relative shrink-0 w-14 h-14 grid place-items-center rounded-full bg-[#E8F0FE]">
          {icon}
          {typeof badge === "number" && badge > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold grid place-items-center">
              {badge}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="text-[20px] md:text-[22px] font-extrabold text-[#0E3561]">
            {title}
          </div>
          <div className="text-base text-[#0E3561]/80 leading-snug">
            {subtitle}
          </div>
        </div>

        <ChevronRight className="w-6 h-6 text-[#1F66D1]" />
      </div>
    </Wrapper>
  );
}

/* Small chevron icon */
function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 6l6 6-6 6" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
