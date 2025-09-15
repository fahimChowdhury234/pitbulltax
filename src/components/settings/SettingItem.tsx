import { Link } from "react-router-dom";
import { ReactNode, SVGProps } from "react";
import { ChevronRight } from "../../icons/Icons";

interface SettingItemProps {
  to?: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export default function SettingItem({ to, title, subtitle, icon }: SettingItemProps) {
  const Wrapper = to ? Link : "div";
  const wrapperProps = to ? { to } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="block bg-white rounded-2xl shadow-sm px-4 py-4 md:px-5 md:py-5"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-12 h-12 grid place-items-center rounded-full bg-[#E8F0FE]">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-lg  font-extrabold text-[#1F66D1]">
            {title}
          </div>
          <div className="text-sm text-[#0E3561]/80 leading-snug">
            {subtitle}
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-[#1F66D1]" />
      </div>
    </Wrapper>
  );
}


