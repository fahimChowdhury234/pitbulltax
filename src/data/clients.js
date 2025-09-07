export const CLIENTS = [
  { id: 1, name: "Adrian Orozco", role: "Client", kind: "individual", color: "blue" },
  { id: 2, name: "Rebeca Trejos", role: "Client", kind: "individual", color: "blue" },
  { id: 3, name: "Jonice Araya", role: "Client", kind: "individual", color: "red" },
  { id: 4, name: "William Beisswenger", role: "Client", kind: "individual", color: "blue" },
  { id: 5, name: "Irina Bobrova", role: "Prospect", kind: "individual", color: "blue" },
  { id: 6, name: "Bob Sampson", role: "Prospect", kind: "individual", color: "red" },
  { id: 7, name: "Bob Sampson", role: "Prospect", kind: "individual", color: "red" },
  { id: 8, name: "Bob Sampson", role: "Prospect", kind: "individual", color: "red" },

  { id: 9, name: "Acme Holdings LLC", role: "Client", kind: "business", color: "blue" },
  { id: 10, name: "Acme Holdings LLC", role: "Client", kind: "business", color: "blue" },
  { id: 11, name: "Acme Holdings LLC", role: "Client", kind: "business", color: "blue" },

];

export const CLIENT_DETAILS = {
  1: {
    personal: {
      Taxpayer: "Adrian Ernesto Orozco",
      Address: "123 Street Address, City ST",
      SSN: "XXX-XX-1234",
      "Cell Phone": "(555) 123-4567",
      "Home Phone": "(555) 987-6543",
    },
    irsTaxLiability: [
      {
        year: 1999,
        form: "1040",
        currentTax: 18290.87,
        earliestCSED: "11/12/2023",
        latestCSED: "11/12/2025",
      },
    ],
    authorizations: [
      {
        form: "1040",
        periods: "2000 - 2027",
        cafPassed: "Yes",
        reps: [
          { name: "Adrian Ernesto Orozco", caf: "CAI ↑1242 1245IR" },
        ],
      },
      {
        form: "1040 Spovee",
        periods: "2000 - 2027",
        cafPassed: "New",
        reps: [
          { name: "Adrian Ernesto Orozco", caf: "CAI ↑1238. 12548R" },
        ],
      },
    ],
    billing: [
      {
        caseName: "Offer in Compromise",
        status: { label: "Filed with IRS", tone: "blue" },
        created: "11/12/2023",
        due: "11/12/2024",
      },
      {
        caseName: "Tax Resolution for Court",
        status: { label: "New", tone: "green" },
        created: "11/12/2023",
        due: "11/30/2024",
      },
    ],
  },
  // Fallback demo data for others:
};
