import { useNavigate } from "react-router-dom";

export default function EmailMenu() {
  const nav = useNavigate();
  return (
    <div className=" py-6 pb-28">
      <header className="mb-6">
      <button onClick={() => nav(-1)} className="text-white mb-2">&larr; Back</button>

        <h1 className="text-4xl font-extrabold text-white">Email</h1>
        <p className="text-gray-200 mt-2">Select what type of Email you need to send</p>
      </header>

      <div className="space-y-4">
        <EmailTile
          icon={<MailIcon />}
          title="Plain Email"
          cta="Send"
          onClick={() => nav("/email/plain")}
        />
        <EmailTile
          icon={<TemplateIcon />}
          title="Email"
          cta="Send"
          onClick={() => nav("/email/template")}
        />
        <EmailTile
          icon={<QuestionIcon />}
          title="Client Questionnaire"
          cta="View"
          onClick={() => nav("/email/questionnaire")}
        />
      </div>
    </div>
  );
}

function EmailTile({
  icon,
  title,
  cta,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-white shadow px-4 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 grid place-items-center rounded-xl bg-[#E9F2FF] text-[#1F66D1]">
          {icon}
        </span>
        <div className="text-[20px] font-extrabold text-[#0E3561]">{title}</div>
      </div>
      <span className="px-4 py-2 rounded-full bg-[#1F66D1] text-white font-semibold">
        {cta}
      </span>
    </button>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  );
}
function TemplateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M6 3h12a2 2 0 0 1 2 2v14l-4-3H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm1 15h-2v-2h2Zm2.07-7.75-.9.92A3.49 3.49 0 0 0 13 12h-2v-.5a4.5 4.5 0 0 1 1.33-3.18l1.24-1.26a1.75 1.75 0 1 0-2.96-1.23H8.5a3.75 3.75 0 1 1 6.57 2.02Z" />
    </svg>
  );
}
