import type { Workshop } from "../types/type";

export const ALL_WORKSHOPS: Workshop[] = [
  {
    id: "beg-2025-12",
    level: "Beginners",
    title: "3-day Hybrid Workshop",
    start: "2025-12-03",
    end: "2025-12-05",
    bullets: ["18 CE Credits for EAs", "12 CPE Credits for CPAs"],
    price: "$979 / person",
  },
  {
    id: "int-2025-08",
    level: "Intermediate",
    title: "2-day Hybrid Workshop",
    start: "2025-08-28",
    end: "2025-08-29",
    bullets: ["12 CE Credits for EAs", "12 CPE Credits for CPAs"],
    price: "$659 / person",
  },
  {
    id: "adv-2025-11",
    level: "Advanced",
    title: "2-day Deep-Dive Workshop",
    start: "2025-11-06",
    end: "2025-11-07",
    bullets: ["Advanced Case Strategies", "Hands-on Lab Sessions"],
    price: "$799 / person",
  },
];
