import { Routes, Route, NavLink, useLocation, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import ClientsIndex from "./pages/Clients";
import ClientSummary from "./pages/Clients/Summary";
import { SVGProps } from "react";
import Support from "./pages/Support";
import NewTicket from "./pages/Support/NewTicket";
import Tickets from "./pages/Support/Tickets";
import Settings from "./pages/Settings";
import TimeZones from "./pages/Settings/TimeZones";
import Notifications from "./pages/Settings/Notifications";
import TwoFactor from "./pages/Settings/TwoFactor";
import Reminders from "./pages/Settings/Reminders";
import Fingerprint from "./pages/Settings/Fingerprint";
import BillingHome from "./pages/Billing";
import BillingTransactions from "./pages/Billing/Transactions";
import BillingInvoice from "./pages/Billing/Invoice";
import SendPaymentLink from "./pages/Billing/SendPaymentLink";
import TranscriptsIndex from "./pages/Transcripts";
import Connect from "./pages/Transcripts/request/Connect";
import SelectClient from "./pages/Transcripts/request/SelectClient";
import RequestForm from "./pages/Transcripts/request/RequestForm";
import TranscriptsDashboard from "./pages/Transcripts/TranscriptsDashboard";
import TranscriptAlerts from "./pages/Transcripts/TranscriptAlerts";
import TranscriptReports from "./pages/Transcripts/TranscriptReports";
import ViewTranscripts from "./pages/Transcripts/ViewTranscripts";
import SMSMenu from "./pages/SMS/SMSMenu";
import SingleSMSList from "./pages/SMS/SingleSMSList";
import SingleSMSChat from "./pages/SMS/SingleSMSChat";
import BlastList from "./pages/SMS/BlastList";
import BlastChat from "./pages/SMS/BlastChat";
import SMSHistory from "./pages/SMS/SMSHistory";
import EmailMenu from "./pages/Email/EmailMenu";
import EmailClientPicker from "./pages/Email/EmailClientPicker";
import PlainEmailCompose from "./pages/Email/PlainEmailCompose";
import QuestionnaireClientPicker from "./pages/Email/uestionnaireClientPicker";
import QuestionnaireCompose from "./pages/Email/QuestionnaireCompose";
// import ClientPicker from "./pages/files/ClientPicker";
// import ClientFiles from "./pages/files/ClientFiles";
// import FolderView from "./pages/files/FolderView";

function routeLabel(pathname: string): string {
  if (pathname.startsWith("/clients")) return "Clients"; // covers nested routes
  const map: Record<string, string> = {
    "/": "Home",
    "/calendar": "Calendar",
    "/files": "Files",
    "/notifications": "Notifications",
    "/chat": "Chat",
    "/settings": "Settings",
    "/settings/time-zones": "Time zones",
    "/promotions": "Promotions",
    "/email": "Email",
    "/news": "News",
    "/support": "Support",
    "/support/tickets": "Tickets",
    "/support/new-ticket": "Tickets",
    "/settings/notifications": "notifications",
    "/settings/2fa": "2-F Authentication",
    "/settings/reminders": "Reminders",
    "/settings/fingerprint": "Fingerprint",
    "/billing": "Billing",
    "/transcripts": "Transcripts",
  };
  return map[pathname] ?? "Home";
}

function ClientsLayout() {
  return <Outlet />; // renders index or child routes below
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E77C5] to-[#2E6BB3] text-white">
      {/* Top bar */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight">Menu</h1>
        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/40">
          <img
            src="https://i.pravatar.cc/100?img=1"
            className="w-full h-full object-cover"
            alt="Profile"
          />
        </div>
      </header>

      {/* Page content */}
      <main className="pb-28 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />

          {/* /clients + nested */}
          <Route path="/clients" element={<ClientsLayout />}>
            <Route index element={<ClientsIndex />} />
            <Route path=":id/summary" element={<ClientSummary />} />
          </Route>
          <Route path="/support" element={<Support />} />
          <Route path="/support/new-ticket" element={<NewTicket />} />
          <Route path="/support/tickets" element={<Tickets />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/time-zones" element={<TimeZones />} />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route path="/settings/2fa" element={<TwoFactor />} />
          <Route path="/settings/reminders" element={<Reminders />} />
          <Route path="/settings/fingerprint" element={<Fingerprint />} />
          {/* <Route index element={<ClientPicker />} />
          <Route path=":clientfolderIdId" element={<ClientFiles />} />
          <Route path="/files/:clientId/:folderId" element={<FolderView />} /> */}
          <Route path="/billing" element={<BillingHome />} />
          <Route path="/transcripts" element={<TranscriptsIndex />} />
          <Route path="/transcripts/request/connect" element={<Connect />} />
          <Route
            path="/transcripts/request/select-client"
            element={<SelectClient />}
          />
          <Route
            path="/transcripts/request/:clientId"
            element={<RequestForm />}
          />
          <Route
            path="/billing/transactions"
            element={<BillingTransactions />}
          />
          <Route path="/billing/invoice/:id" element={<BillingInvoice />} />
          <Route path="/billing/send-link" element={<SendPaymentLink />} />
          <Route path="/transcripts/dashboard" element={<TranscriptsDashboard />} />
          <Route path="/transcripts/alerts" element={<TranscriptAlerts />} />
          <Route path="/transcripts/reports" element={<TranscriptReports />} />
          <Route path="/transcripts/view" element={<ViewTranscripts />} />
          <Route path="/sms" element={<SMSMenu />} />
          <Route path="/sms/single" element={<SingleSMSList />} />
          <Route path="/sms/single/:id" element={<SingleSMSChat />} />
          <Route path="/sms/blast" element={<BlastList />} />
          <Route path="/sms/blast/:groupId" element={<BlastChat />} />
          <Route path="/sms/history" element={<SMSHistory />} />
          <Route path="/email" element={<EmailMenu />} />
          <Route path="/email/plain" element={<EmailClientPicker kind="plain" />} />
          <Route path="/email/plain/:clientId" element={<PlainEmailCompose />} />
          <Route path="/email/template" element={<EmailClientPicker kind="template" />} />
          <Route path="/email/questionnaire" element={<QuestionnaireClientPicker />} />
          <Route path="/email/questionnaire/:clientId" element={<QuestionnaireCompose />} />
        </Routes>
      </main>

      {/* Bottom Nav displaying current route label */}
      <nav className="fixed bottom-0 left-0 right-0">
        <div className="mx-3 mb-3 rounded-3xl bg-[#0E3561] shadow-[0_-8px_32px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-5 px-5 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "flex flex-col items-center justify-center p-2 rounded-2xl " +
                (isActive ? "bg-white/10" : "hover:bg-white/5")
              }
            >
              <HomeIcon className="w-6 h-6" />
            </NavLink>

            <div className="flex-1 text-center">
              <span className="text-xl font-semibold tracking-wide">
                {routeLabel(pathname)}
              </span>
            </div>

            <NavLink
              to="/clients"
              className={({ isActive }) =>
                "flex flex-col items-center justify-center p-2 rounded-2xl " +
                (isActive ? "bg-white/10" : "hover:bg-white/5")
              }
            >
              <MenuIcon className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

/* ---------- Inline SVG Icons with typing ---------- */
function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9z"
        strokeWidth="1.8"
      />
      <path d="M9 22v-7h6v7" strokeWidth="1.8" />
    </svg>
  );
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
