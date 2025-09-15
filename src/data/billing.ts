export type ChargeLine = {
  date: string;         // e.g. "08/13/2025"
  code: string;         // e.g. "ZOOM"
  description: string;  // e.g. "Zoom Meeting"
  amount: number;       // e.g. 225.00
};

export type InvoiceDetails = {
  id: number;
  title: string;        // "Invoice 1"
  client: string;       // "James, Lebron"
  date: string;         // "05/24/2025"
  invoiceNo: number;    // 1
  terms: string;        // "Due on Receipt"
  dueDate: string;      // "05/24/2025"
  charges: ChargeLine[];
  taxRate: number;      // percent, e.g. 5
  payments: number;     // amount already paid
};

export type InvoiceListItem = {
  id: number;
  title: string;
  client: string;
  paid: boolean;
};

export type Payment = {
  id: number;
  client: string;
  amount: number;
  method: "Card" | "ACH" | "Cash";
  date: string;         // "07/10/2025 09:31 a.m."
  status: "Completed" | "Failed" | "Pending";
};

export const INVOICES: InvoiceListItem[] = [
  { id: 1, title: "Invoice 1", client: "James, Lebron", paid: true },
  { id: 2, title: "Invoice 2", client: "James, Lebron", paid: false },
  // add more if you want to test pagination
];

export const INVOICE_MAP: Record<number, InvoiceDetails> = {
  1: {
    id: 1,
    title: "Invoice 1",
    client: "James, Lebron",
    date: "05/24/2025",
    invoiceNo: 1,
    terms: "Due on Receipt",
    dueDate: "05/24/2025",
    charges: [
      { date: "08/13/2025", code: "ZOOM", description: "Zoom Meeting", amount: 225.0 },
      { date: "08/13/2025", code: "FORM", description: "Form Preparation", amount: 2093.75 },
    ],
    taxRate: 5,
    payments: 0,
  },
  2: {
    id: 2,
    title: "Invoice 2",
    client: "James, Lebron",
    date: "06/10/2025",
    invoiceNo: 2,
    terms: "Net 15",
    dueDate: "06/25/2025",
    charges: [{ date: "06/12/2025", code: "CONS", description: "Consultation", amount: 300 }],
    taxRate: 0,
    payments: 0,
  },
};

export const PAYMENTS: Payment[] = [
  { id: 101, client: "James, Lebron", amount: 120.0, method: "Card", date: "07/10/2025 09:31 a.m.", status: "Completed" },
  { id: 102, client: "Sam, Chris", amount: 75.0, method: "ACH", date: "07/11/2025 01:14 p.m.", status: "Pending" },
];
