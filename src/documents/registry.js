import { documentQuestions } from "../../data/documentQuestions";
import { buildInitialDataFromDefinition } from "./utils/initialData";

const DOCUMENT_ORDER = [
  "resume",
  "jeonse-return",
  "standard-labor-contract",
  "resignation",
  "promissory-note",
  "freelance-service-contract",
  "employment-certificate",
  "career-certificate",
  "severance-request",
  "wage-arrears-notice",
  "lease-termination-notice",
  "rent-arrears-demand",
  "deposit-return-confirmation",
  "settlement-agreement",
  "debt-repayment-commitment",
  "payment-order-application",
  "power-of-attorney",
  "statement-of-fact",
  "personal-info-consent",
];

const TEMPLATE_LOADERS = {
  resume: () => import("../components/templates/OfficialFormTemplateA4"),
  "jeonse-return": () => import("../components/templates/OfficialFormTemplateA4"),
  "standard-labor-contract": () => import("../components/templates/OfficialFormTemplateA4"),
  resignation: () => import("../components/templates/OfficialFormTemplateA4"),
  "promissory-note": () => import("../components/templates/OfficialFormTemplateA4"),
  "freelance-service-contract": () => import("../components/templates/OfficialFormTemplateA4"),
  "employment-certificate": () => import("../components/templates/OfficialFormTemplateA4"),
  "career-certificate": () => import("../components/templates/OfficialFormTemplateA4"),
  "severance-request": () => import("../components/templates/OfficialFormTemplateA4"),
  "wage-arrears-notice": () => import("../components/templates/OfficialFormTemplateA4"),
  "lease-termination-notice": () => import("../components/templates/OfficialFormTemplateA4"),
  "rent-arrears-demand": () => import("../components/templates/OfficialFormTemplateA4"),
  "deposit-return-confirmation": () => import("../components/templates/OfficialFormTemplateA4"),
  "settlement-agreement": () => import("../components/templates/OfficialFormTemplateA4"),
  "debt-repayment-commitment": () => import("../components/templates/OfficialFormTemplateA4"),
  "payment-order-application": () => import("../components/templates/OfficialFormTemplateA4"),
  "power-of-attorney": () => import("../components/templates/OfficialFormTemplateA4"),
  "statement-of-fact": () => import("../components/templates/OfficialFormTemplateA4"),
  "personal-info-consent": () => import("../components/templates/OfficialFormTemplateA4"),
};

const DEFAULT_LEGAL_INFO = {
  version: "v2026.02",
  updatedAt: "2026-02-22",
};

const LEGAL_INFO_MAP = {
  "jeonse-return": { version: "v2026.02-LEASE", updatedAt: "2026-02-22" },
  "standard-labor-contract": { version: "v2026.02-LABOR", updatedAt: "2026-02-22" },
  resignation: { version: "v2026.02-LABOR", updatedAt: "2026-02-22" },
  "wage-arrears-notice": { version: "v2026.02-LABOR", updatedAt: "2026-02-22" },
  "payment-order-application": { version: "v2026.02-COURT", updatedAt: "2026-02-22" },
};

const DOCUMENTS = DOCUMENT_ORDER.map((id) => ({
  ...documentQuestions[id],
  loadTemplate: TEMPLATE_LOADERS[id],
  legalInfo: LEGAL_INFO_MAP[id] ?? DEFAULT_LEGAL_INFO,
}));

const DOCUMENT_MAP = Object.fromEntries(DOCUMENTS.map((document) => [document.id, document]));

export const DOCUMENT_LIST = DOCUMENTS;

export const getDocumentById = (documentType) => DOCUMENT_MAP[documentType] ?? null;

export const getInitialDataForDocument = (documentType) => {
  const definition = getDocumentById(documentType);
  return buildInitialDataFromDefinition(definition);
};
