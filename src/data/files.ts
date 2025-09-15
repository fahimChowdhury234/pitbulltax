// Types
export type Cloud = "dropbox" | "gdrive" | "onedrive";
export type FileType = "pdf" | "jpg" | "xls" | "doc" | "txt";

export type FileItem = {
  id: string;
  name: string;
  type: FileType;
  createdAt: string;           // already formatted string for simplicity
  unread?: boolean;            // blue dot + bold if true
  synced?: Cloud[];            // right-side cloud badges
};

export type FolderItem = {
  id: string;
  name: string;
  createdAt: string;
  synced?: Cloud[];
  files: FileItem[];
};

export type ClientFiles = {
  clientId: number;
  rootFolders: FolderItem[];
  rootFiles: FileItem[];       // files at client root (like your screenshot)
};

// Dummy content for a couple of clients
export const FILETREE: Record<number, ClientFiles> = {
  1: {
    clientId: 1,
    rootFolders: [
      { id: "transcripts", name: "Transcripts", createdAt: "02/17/2025 07:45 a.m.", files: [] },
      { id: "esigned", name: "e-Signed Letters", createdAt: "01/26/2025 08:51 a.m.", files: [] },
      {
        id: "irs",
        name: "IRS Forms / Letters",
        createdAt: "04/05/2025",
        synced: ["dropbox", "gdrive"],
        files: [
          { id: "cp2000", name: "CP2000 Notice.pdf", type: "pdf", createdAt: "04/06/2025 10:21 a.m.", unread: true, synced: ["dropbox"] },
          { id: "2848", name: "Form 2848.jpg", type: "jpg", createdAt: "04/06/2025 10:40 a.m." }
        ],
      },
      { id: "chat", name: "Sent Files From Chat", createdAt: "05/14/2023 07:41 a.m.", files: [] },
      {
        id: "docusign",
        name: "DocuSign",
        createdAt: "04/21/2025 12:39 p.m.",
        synced: ["onedrive", "dropbox"],
        files: [
          { id: "offer", name: "Offer Letter.docx", type: "doc", createdAt: "04/21/2025 12:40 p.m.", synced: ["onedrive"] },
        ],
      },
      { id: "billing", name: "Billing Invoices", createdAt: "05/29/2025 15:52 a.m.", files: [] },
    ],
    rootFiles: [
      { id: "inv-24-13", name: "Invoice #24-13", type: "pdf", createdAt: "07/21/2025 09:39 a.m.", unread: true },
      { id: "bank-st", name: "Bank Statements", type: "jpg", createdAt: "05/17/2025 05:19 a.m." },
      { id: "deed", name: "Property Deed", type: "doc", createdAt: "08/28/2025 07:39 a.m." },
      { id: "activity", name: "Activity Log", type: "xls", createdAt: "07/29/2025 11:45 a.m." },
    ],
  },
  2: { clientId: 2, rootFolders: [], rootFiles: [] },
};
