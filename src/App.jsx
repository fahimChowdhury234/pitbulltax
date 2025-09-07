import { Routes, Route, NavLink, useLocation, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import ClientsIndex from "./pages/Clients";     // list page (/clients)
import ClientSummary from "./pages/Clients/Summary";  // details page (/clients/:id/summary)

function routeLabel(pathname) {
  if (pathname.startsWith("/clients")) return "Clients"; // covers nested routes
  const map = {
    "/": "Home",
    "/calendar": "Calendar",
    "/files": "Files",
    "/notifications": "Notifications",
    "/chat": "Chat",
    "/settings": "Settings",
    "/promotions": "Promotions",
    "/email": "Email",
    "/news": "News",
    "/billing": "Billing",
    "/support": "Support",
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
          <img src="https://i.pravatar.cc/100?img=1" className="w-full h-full object-cover" alt="Profile" />
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

/* Icons */
function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9z" strokeWidth="1.8" />
      <path d="M9 22v-7h6v7" strokeWidth="1.8" />
    </svg>
  );
}
function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
