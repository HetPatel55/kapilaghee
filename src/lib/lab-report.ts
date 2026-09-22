/**
 * Results transcribed from Kapila's independent purity test report
 * (public/documents/lab-test-report-2025-03-27.jpg). Every figure here is copied from that
 * document — nothing is rounded, inferred or added. When a newer report is issued,
 * update this file and the Document in Admin together.
 */
export const LAB_REPORT = {
  lab: "Pollucon Laboratories Pvt. Ltd.",
  reportNumber: "PLPL/FD/25/03/20/0145",
  issued: "27 March 2025",
  standard: "FSSAI limits for ghee",
  documentUrl: "/documents/lab-test-report-2025-03-27.jpg",
};

export type LabParameter = {
  name: string;
  result: string;
  unit?: string;
  limit: string;
};

export const LAB_PARAMETERS: LabParameter[] = [
  { name: "Moisture", result: "0.41", unit: "%", limit: "Max. 0.5" },
  { name: "Milk fat", result: "99.59", unit: "%", limit: "Min. 99.5" },
  { name: "B.R. reading at 40°C", result: "41.6", limit: "40.0 – 44.0" },
  { name: "R.M. value", result: "28.1", limit: "Min. 24.0" },
  { name: "Polenske value", result: "0.57", limit: "0.5 – 2.0" },
  { name: "Free fatty acids (as oleic acid)", result: "0.79", unit: "%", limit: "Max. 2.0" },
  { name: "Baudouin test", result: "Negative", limit: "Negative" },
  { name: "Iodine value", result: "33.2", unit: "g/100 g fat", limit: "25 – 38" },
  { name: "Saponification value", result: "220", unit: "mg KOH/g fat", limit: "205 – 235" },
];

/** The four results a customer can actually interpret, each with a plain-language note. */
export const LAB_HIGHLIGHTS = [
  {
    label: "Milk fat",
    value: "99.59%",
    note: "Almost entirely pure milk fat. FSSAI requires at least 99.5%.",
    limitLabel: "FSSAI min. 99.5%",
  },
  {
    label: "Moisture",
    value: "0.41%",
    note: "Well-clarified, with very little water left. FSSAI allows up to 0.5%.",
    limitLabel: "FSSAI max. 0.5%",
  },
  {
    label: "Free fatty acids",
    value: "0.79%",
    note: "An indicator of freshness — lower is better. FSSAI allows up to 2.0%.",
    limitLabel: "FSSAI max. 2.0%",
  },
  {
    label: "Baudouin test",
    value: "Negative",
    note: "Screens ghee for adulteration with vegetable oil. None was detected.",
    limitLabel: "Required: Negative",
  },
] as const;

export const FSSAI_LICENSE_NUMBER = "10724022000260";
