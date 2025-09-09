// src/components/summary/SectionCard.tsx
import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-xl bg-white/95 shadow-md overflow-hidden">
      <div className="bg-[#1F66D1] text-white px-4 py-2 text-[17px] font-semibold rounded-t-xl">
        {title}
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}
