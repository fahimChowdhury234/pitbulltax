import { useParams } from "react-router-dom";
import { NOTIFICATIONS } from "../../../data/notifications";
import CalendarEventDetail from "./CalendarEventDetail";
import ZoomMeetingDetail from "./ZoomMeetingDetail";
import ChatMessageDetail from "./ChatMessageDetail";
import PaymentReceivedDetail from "./PaymentReceivedDetail";
import TranscriptAlert from "./TranscriptAlert";
import EmailReceived from "./EmailReceived";
import FileUpload from "./FileUpload";
import ClientQuestionnaireCompleted from "./ClientQuestionnaireCompleted";

export default function NotificationDetailRouter() {
  const { id } = useParams();
  const n = NOTIFICATIONS.find(x => x.id === id);
  if (!n) return null;

  switch (n.kind) {
    case "calendar-event": return <CalendarEventDetail />;
    case "zoom-meeting": return <ZoomMeetingDetail />;
    case "chat-message": return <ChatMessageDetail />;
    case "payment-received": return <PaymentReceivedDetail />;
    case "email-received": return <EmailReceived />;
    case "file-upload": return <FileUpload />;
    case "questionnaire-completed": return <ClientQuestionnaireCompleted />;

   


    case "transcript-alert": return <TranscriptAlert />;
    // TODO: add your remaining pages here
    default: return <CalendarEventDetail />; // fallback
  }
}
