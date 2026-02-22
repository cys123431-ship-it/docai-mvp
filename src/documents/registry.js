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
  "nda",
];

const TEMPLATE_LOADERS = {
  resume: () => import("../components/templates/ResumeTemplateA4"),
  "jeonse-return": () => import("../components/templates/JeonseReturnNoticeTemplateA4"),
  "standard-labor-contract": () => import("../components/templates/StandardLaborContractTemplateA4"),
  resignation: () => import("../components/templates/ResignationLetterTemplateA4"),
  "promissory-note": () => import("../components/templates/PromissoryNoteTemplateA4"),
  "freelance-service-contract": () => import("../components/templates/FreelanceServiceContractTemplateA4"),
  "employment-certificate": () => import("../components/templates/EmploymentCertificateTemplateA4"),
  "career-certificate": () => import("../components/templates/CareerCertificateTemplateA4"),
  "severance-request": () => import("../components/templates/SeverancePayRequestTemplateA4"),
  "wage-arrears-notice": () => import("../components/templates/WageArrearsNoticeTemplateA4"),
  "lease-termination-notice": () => import("../components/templates/LeaseTerminationNoticeTemplateA4"),
  "rent-arrears-demand": () => import("../components/templates/RentArrearsDemandTemplateA4"),
  "deposit-return-confirmation": () => import("../components/templates/DepositReturnConfirmationTemplateA4"),
  "settlement-agreement": () => import("../components/templates/SettlementAgreementTemplateA4"),
  "debt-repayment-commitment": () => import("../components/templates/DebtRepaymentCommitmentTemplateA4"),
  "payment-order-application": () => import("../components/templates/PaymentOrderApplicationTemplateA4"),
  "power-of-attorney": () => import("../components/templates/PowerOfAttorneyTemplateA4"),
  "statement-of-fact": () => import("../components/templates/StatementOfFactTemplateA4"),
  "personal-info-consent": () => import("../components/templates/PersonalInfoConsentTemplateA4"),
  nda: () => import("../components/templates/NonDisclosureAgreementTemplateA4"),
};

const DOCUMENTS = DOCUMENT_ORDER.map((id) => ({
  ...documentQuestions[id],
  loadTemplate: TEMPLATE_LOADERS[id],
}));

const DOCUMENT_MAP = Object.fromEntries(DOCUMENTS.map((document) => [document.id, document]));

export const DOCUMENT_LIST = DOCUMENTS;

export const getDocumentById = (documentType) => DOCUMENT_MAP[documentType] ?? null;

export const getInitialDataForDocument = (documentType) => {
  const definition = getDocumentById(documentType);
  return buildInitialDataFromDefinition(definition);
};

