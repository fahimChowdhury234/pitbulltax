// components/notifications/NotificationHeader.tsx
import React from "react";

interface HeaderProps {
  color: string;
  icon: React.ReactNode;
  title: string;
  client: string;
  date: string;
}

export default function NotificationHeader({ color, icon, title, client, date }: HeaderProps) {
  return (
    <div className="rounded-xl shadow p-4 mb-4 flex items-center gap-3" style={{ backgroundColor: color }}>
        
      <div className="w-8 h-8 grid place-items-center text-white">{icon}</div>
      <div className="flex flex-col text-white">
        <span className="font-bold">{title}</span>
        <span className="text-sm">Client: {client}</span>
        <span className="text-xs">{date}</span>
      </div>
    </div>
  );
}
