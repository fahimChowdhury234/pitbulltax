import MenuTile from "../components/MenuTile";
import {
  CalendarIcon,
  FolderIcon,
  BellIcon,
  ChatIcon,
  GearIcon,
  TagIcon,
  TranscriptsIcon,
  MailIcon,
  CardIcon,
  UserCardIcon,
  EnvelopeBillIcon,
  SupportIcon,
  SMSIcon,
  ProfileIcon,
} from "../icons/Icons";
import { ComponentType, SVGProps } from "react";

interface Tile {
  label: string;
  to: string;
  badge?: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const tiles: Tile[] = [
  { label: "Calendar", to: "/calendar", badge: 1, icon: CalendarIcon },
  { label: "Files", to: "/files", icon: FolderIcon },
  { label: "Notifications", to: "/notifications", badge: 10, icon: BellIcon },
  { label: "Chat", to: "/chat", badge: 1, icon: ChatIcon },
  { label: "Settings", to: "/settings", icon: GearIcon },
  { label: "Promotions", to: "/promotions", badge: 1, icon: TagIcon },
  { label: "Transcripts", to: "/transcripts", badge: 1, icon: TranscriptsIcon },
  { label: "Email", to: "/email", badge: 1, icon: MailIcon },
  { label: "News", to: "/news", badge: 1, icon: CardIcon },
  { label: "Clients", to: "/clients", icon: UserCardIcon },
  { label: "Billing", to: "/billing", badge: 1, icon: EnvelopeBillIcon },
  { label: "Support", to: "/support", badge: 1, icon: SupportIcon },
  { label: "SMS", to: "/sms", badge: 1, icon: SMSIcon },
  { label: "Profile", to: "/profile", badge: 1, icon: ProfileIcon },
];

export default function Home() {
  return (
    <section className="pt-5 pb-10">
      <div className="grid grid-cols-3 gap-4">
        {tiles.map((t, i) => (
          <MenuTile key={i} label={t.label} to={t.to} badge={t.badge}>
            <t.icon className="w-8 h-8" />
          </MenuTile>
        ))}
      </div>
    </section>
  );
}
