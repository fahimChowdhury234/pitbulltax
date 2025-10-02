import { NotificationKind } from "../../types/notifications";

type Props = { kind: NotificationKind; className?: string };
export const kindColor: Record<NotificationKind, string> = {
  "calendar-event": "bg-[#E89A2D]",
  "zoom-meeting": "bg-[#2E77C5]",
  "chat-message": "bg-[#7C3AED]",
  "payment-received": "bg-[#1C8C4B]",
  "automatic-task": "bg-[#C23C4B]",
  "questionnaire-completed": "bg-[#1E3A8A]",
  "file-upload": "bg-[#43B3A7]",
  "email-received": "bg-[#B62621]",
  "transcript-alert": "bg-[#4ADE80]",
};

export default function NotificationIcon({ kind, className }: Props) {
  const cls = "w-8 h-8 text-white";
  switch (kind) {
    case "calendar-event":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M7 2v2H5a2 2 0 0 0-2 2v3h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Z" />
          <path d="M21 10H3v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8Z" />
        </svg>
      );
    case "zoom-meeting":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M2 7.5A2.5 2.5 0 0 1 4.5 5h7A2.5 2.5 0 0 1 14 7.5v9A2.5 2.5 0 0 1 11.5 19h-7A2.5 2.5 0 0 1 2 16.5v-9Z" />
          <path d="M15 10.5 21 7v10l-6-3.5v-3Z" />
        </svg>
      );
    case "chat-message":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M4 4h16v12H7l-3 3V4Z" />
        </svg>
      );
    case "payment-received":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M12 2a8 8 0 1 0 8 8h2a10 10 0 1 1-10-10v2Z" />
          <path d="M11 6h2v12h-2z" />
        </svg>
      );
    case "automatic-task":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M3 4h18v4H3z" />
          <path d="M3 10h18v10H3z" />
        </svg>
      );
    case "questionnaire-completed":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clip-rule="evenodd"
          />
        </svg>
      );
    case "file-upload":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M12 3 7 8h3v6h4V8h3l-5-5Z" />
          <path d="M5 20h14v2H5z" />
        </svg>
      );
    case "email-received":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      );
    case "transcript-alert":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className={`${cls} ${className ?? ""}`}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      );
  }
}
