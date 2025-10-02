export type WorkshopLevel = "Beginners" | "Intermediate" | "Advanced";

export type Workshop = {
  id: string;
  level: WorkshopLevel;
  title: string;      // e.g. "3-day Hybrid Workshop"
  start: string;      // ISO date: "YYYY-MM-DD"
  end: string;        // ISO date
  bullets: string[];  // CE/CPE lines, etc.
  price: string;      // "$979 / person"
};
