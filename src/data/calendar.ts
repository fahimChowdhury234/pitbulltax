// Demo data used by all calendar pages
export type CalKind = "task" | "zoom" | "event";

export type CalItem = {
  id: string;
  kind: CalKind;
  title: string;
  client: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm (24h)
  end: string; // HH:mm
  color?: string; // Tailwind bg-* token (for event chips)
  description?: string;
};

export const ZOOM_CONNECTED = true; // toggle to false to see the greyed button

export const CAL_ITEMS: CalItem[] = [
  // Monday 18th
  {
    id: "m1",
    kind: "task",
    title: "Review Documents",
    client: "John Smith",
    date: "2025-04-18",
    start: "08:00",
    end: "08:30",
    description: "Review tax documents for John Smith",
  },

  // Tuesday 19th
  {
    id: "t1",
    kind: "zoom",
    title: "Client Meeting",
    client: "Sarah Johnson",
    date: "2025-04-19",
    start: "09:00",
    end: "09:30",
  },

  // Wednesday 20th
  {
    id: "w1",
    kind: "event",
    title: "Court Hearing",
    client: "Mike Davis",
    date: "2025-04-20",
    start: "10:00",
    end: "10:30",
    color: "bg-red-500",
  },

  // Thursday 21st
  {
    id: "th1",
    kind: "task",
    title: "File Submission",
    client: "Lisa Wilson",
    date: "2025-04-21",
    start: "11:00",
    end: "11:30",
    description: "Submit tax forms to IRS",
  },

  // Friday 22nd - Main day with multiple events
  {
    id: "f1",
    kind: "task",
    title: "Call",
    client: "",
    date: "2025-04-22",
    start: "05:00",
    end: "05:15",
    description: "Call Becky to ask for SSN",
  },
  {
    id: "f2",
    kind: "task",
    title: "To Do",
    client: "",
    date: "2025-04-22",
    start: "06:00",
    end: "06:15",
    description: "Buy Toner for the office",
  },
  {
    id: "f3",
    kind: "zoom",
    title: "Zoom Meeting",
    client: "Steph Curry",
    date: "2025-04-22",
    start: "07:00",
    end: "07:30",
  },
  {
    id: "f4",
    kind: "event",
    title: "Tax Resolution Hearing",
    client: "Steph Curry",
    date: "2025-04-22",
    start: "09:00",
    end: "09:30",
    color: "bg-red-500",
  },

  // Saturday 23rd
  {
    id: "s1",
    kind: "task",
    title: "Follow Up",
    client: "Robert Brown",
    date: "2025-04-23",
    start: "14:00",
    end: "14:30",
    description: "Follow up on pending case",
  },

  // Sunday 24th
  {
    id: "su1",
    kind: "event",
    title: "Document Review",
    client: "Emily Taylor",
    date: "2025-04-24",
    start: "16:00",
    end: "16:30",
    color: "bg-blue-500",
  },

  // Week scatter
  {
    id: "w1",
    kind: "zoom",
    title: "Zoom Meeting",
    client: "Client A",
    date: "2025-04-20",
    start: "08:00",
    end: "08:30",
  },
  {
    id: "w2",
    kind: "event",
    title: "Court",
    client: "Client B",
    date: "2025-04-21",
    start: "09:00",
    end: "09:30",
    color: "bg-orange-500",
  },
  {
    id: "w3",
    kind: "task",
    title: "Prepare Docs",
    client: "Client C",
    date: "2025-04-21",
    start: "07:00",
    end: "07:30",
    color: "bg-green-600",
  },
  {
    id: "w4",
    kind: "task",
    title: "Follow-up",
    client: "Client D",
    date: "2025-04-21",
    start: "06:00",
    end: "06:20",
    color: "bg-green-600",
  },
  {
    id: "w5",
    kind: "event",
    title: "Hearing",
    client: "Client E",
    date: "2025-04-28",
    start: "15:00",
    end: "15:30",
    color: "bg-red-500",
  },
];
export const synced = true;

export const tasks = [
  { title: "Call", desc: "Call Becky to ask for SSN", time: "7:00AM" },
  { title: "To Do", desc: "Buy Toner for the office", time: "7:00AM" },
];

export const zoomMeetings = [
  { client: "Steph Curry", time: "7:00AM - 7:30AM" },
  { client: "LeBron James", time: "8:00AM - 8:30AM" },
];

export const events = [
  {
    title: "Tax Resolution Hearing",
    client: "Steph Curry",
    time: "7:00AM - 7:30AM",
    color: "bg-red-500",
  },
  {
    title: "Form Submission @ IRS",
    client: "Steph Curry",
    time: "2:00PM - 2:30PM",
    color: "bg-orange-400",
  },
  {
    title: "Tax Resolution with IRS",
    client: "Steph Curry",
    time: "4:00PM - 4:30PM",
    color: "bg-purple-500",
  },
];
