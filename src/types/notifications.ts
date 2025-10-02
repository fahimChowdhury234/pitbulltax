export type NotificationKind =
  | "calendar-event"
  | "zoom-meeting"
  | "chat-message"
  | "payment-received"
  | "automatic-task"
  | "questionnaire-completed"
  | "file-upload"
  | "email-received"
  | "transcript-alert";

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  client: string;
  title: string;
  at: string;           // ISO string
  read?: boolean;
};
