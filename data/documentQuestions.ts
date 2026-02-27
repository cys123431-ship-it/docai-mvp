export type QuestionFieldType = "text" | "tel" | "email" | "date" | "textarea";

export interface QuestionField {
  key: string;
  label: string;
  placeholder: string;
  type: QuestionFieldType;
  required?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface QuestionStep {
  id: string;
  question: string;
  helperText?: string;
  fields: QuestionField[];
}

export interface DocumentQuestionConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  pdfFilePrefix: string;
  searchKeywords?: string[];
  initialData: Record<string, string>;
  steps: QuestionStep[];
}

export const documentQuestions: Record<string, DocumentQuestionConfig> = {
  "resume": {
    id: "resume",
    title: "Standard Resume",
    subtitle: "Hiring",
    icon: "briefcase-business",
    pdfFilePrefix: "standard_resume",
    searchKeywords: ["resume", "job", "cv"],
    steps: [
      {
        id: "basic",
        question: "Enter applicant basics.",
        fields: [
          { key: "fullName", label: "Full Name", placeholder: "Hong Gil Dong", type: "text" },
          { key: "targetRole", label: "Target Role", placeholder: "Frontend Developer", type: "text" },
          { key: "phone", label: "Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } },
          { key: "email", label: "Email", placeholder: "me@example.com", type: "email", required: false, validation: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" } }
        ]
      },
      {
        id: "career",
        question: "Enter education and career summary.",
        fields: [
          { key: "education", label: "Education", placeholder: "University / Certificate", type: "text" },
          { key: "careerSummary", label: "Career Summary", placeholder: "Main projects and impact", type: "textarea", validation: { minLength: 12 } },
          { key: "skills", label: "Core Skills", placeholder: "Docs, negotiation, analysis", type: "textarea", validation: { minLength: 6 } }
        ]
      }
    ],
    initialData: {}
  },
  "jeonse-return": {
    id: "jeonse-return",
    title: "Certified Notice",
    subtitle: "Legal Notice",
    icon: "file-text",
    pdfFilePrefix: "certified_notice",
    searchKeywords: ["notice", "demand", "certified"],
    steps: [
      {
        id: "parties",
        question: "Enter sender and receiver.",
        fields: [
          { key: "senderName", label: "Sender Name", placeholder: "Sender Name", type: "text" },
          { key: "senderAddress", label: "Sender Address", placeholder: "Address", type: "text" },
          { key: "senderContact", label: "Sender Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } },
          { key: "recipientName", label: "Recipient Name", placeholder: "Recipient Name", type: "text" },
          { key: "recipientAddress", label: "Recipient Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "body",
        question: "Enter notice details.",
        fields: [
          { key: "subject", label: "Subject", placeholder: "Contract breach notice", type: "text" },
          { key: "requestAmount", label: "Requested Amount/Item", placeholder: "10,000,000 KRW", type: "text" },
          { key: "deadlineDate", label: "Deadline", placeholder: "", type: "date" },
          { key: "bodyText", label: "Body", placeholder: "Facts and request details", type: "textarea", validation: { minLength: 20 } },
          { key: "noticeDate", label: "Written Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "standard-labor-contract": {
    id: "standard-labor-contract",
    title: "Standard Labor Contract",
    subtitle: "Labor",
    icon: "briefcase-business",
    pdfFilePrefix: "standard_labor_contract",
    searchKeywords: ["labor", "employment", "contract"],
    steps: [
      {
        id: "parties",
        question: "Enter employer and employee.",
        fields: [
          { key: "employerName", label: "Employer Name", placeholder: "DocAI Inc.", type: "text" },
          { key: "employerAddress", label: "Employer Address", placeholder: "Address", type: "text" },
          { key: "employeeName", label: "Employee Name", placeholder: "Employee Name", type: "text" },
          { key: "employeeAddress", label: "Employee Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "terms",
        question: "Enter work terms.",
        fields: [
          { key: "startDate", label: "Start Date", placeholder: "", type: "date" },
          { key: "workplace", label: "Workplace", placeholder: "HQ / Site", type: "text" },
          { key: "jobDescription", label: "Job Description", placeholder: "Main duties", type: "textarea", validation: { minLength: 8 } },
          { key: "workHours", label: "Work Hours", placeholder: "09:00~18:00", type: "text" },
          { key: "wageAmount", label: "Wage", placeholder: "3,000,000 KRW / month", type: "text" },
          { key: "payDay", label: "Pay Day", placeholder: "10th every month", type: "text" },
          { key: "contractDate", label: "Contract Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "resignation": {
    id: "resignation",
    title: "Resignation Letter",
    subtitle: "Labor",
    icon: "pen-line",
    pdfFilePrefix: "resignation_letter",
    searchKeywords: ["resignation", "quit", "leave"],
    steps: [
      {
        id: "employee",
        question: "Enter employee details.",
        fields: [
          { key: "employeeName", label: "Employee Name", placeholder: "Name", type: "text" },
          { key: "department", label: "Department", placeholder: "Dept", type: "text" },
          { key: "position", label: "Position", placeholder: "Staff", type: "text" },
          { key: "companyName", label: "Company Name", placeholder: "Company", type: "text" }
        ]
      },
      {
        id: "reason",
        question: "Enter resignation details.",
        fields: [
          { key: "recipientName", label: "Recipient", placeholder: "CEO / HR", type: "text" },
          { key: "resignationDate", label: "Resignation Date", placeholder: "", type: "date" },
          { key: "resignationReason", label: "Reason", placeholder: "Reason in detail", type: "textarea", validation: { minLength: 6 } },
          { key: "handoverPlan", label: "Handover Notes", placeholder: "Handover summary", type: "textarea", required: false }
        ]
      }
    ],
    initialData: {}
  },
  "promissory-note": {
    id: "promissory-note",
    title: "Promissory Note",
    subtitle: "Finance",
    icon: "file-text",
    pdfFilePrefix: "promissory_note",
    searchKeywords: ["loan", "promissory", "debt"],
    steps: [
      {
        id: "people",
        question: "Enter creditor/debtor details.",
        fields: [
          { key: "lenderName", label: "Lender Name", placeholder: "Lender", type: "text" },
          { key: "borrowerName", label: "Borrower Name", placeholder: "Borrower", type: "text" },
          { key: "borrowerAddress", label: "Borrower Address", placeholder: "Address", type: "text" },
          { key: "borrowerContact", label: "Borrower Phone", placeholder: "010-1111-2222", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } }
        ]
      },
      {
        id: "money",
        question: "Enter loan terms.",
        fields: [
          { key: "loanAmount", label: "Loan Amount", placeholder: "20,000,000 KRW", type: "text" },
          { key: "loanDate", label: "Loan Date", placeholder: "", type: "date" },
          { key: "dueDate", label: "Due Date", placeholder: "", type: "date" },
          { key: "interestRate", label: "Interest Rate", placeholder: "5% yearly", type: "text", required: false },
          { key: "repaymentMethod", label: "Repayment Method", placeholder: "Lump sum / Installments", type: "textarea", validation: { minLength: 6 } },
          { key: "specialClause", label: "Special Clause", placeholder: "Delay interest, penalties", type: "textarea", required: false }
        ]
      }
    ],
    initialData: {}
  },
  "freelance-service-contract": {
    id: "freelance-service-contract",
    title: "Partnership Contract",
    subtitle: "Contract",
    icon: "file-text",
    pdfFilePrefix: "partnership_contract",
    searchKeywords: ["partnership", "joint business", "equity"],
    steps: [
      {
        id: "partners",
        question: "Enter partner details.",
        fields: [
          { key: "partnerAName", label: "Partner A Name", placeholder: "Partner A", type: "text" },
          { key: "partnerAAddress", label: "Partner A Address", placeholder: "Address", type: "text" },
          { key: "partnerBName", label: "Partner B Name", placeholder: "Partner B", type: "text" },
          { key: "partnerBAddress", label: "Partner B Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "business",
        question: "Enter business terms.",
        fields: [
          { key: "businessName", label: "Business Name", placeholder: "Business Name", type: "text" },
          { key: "businessLocation", label: "Business Address", placeholder: "Address", type: "text" },
          { key: "capitalContribution", label: "Capital Contribution", placeholder: "A 50%, B 50%", type: "text" },
          { key: "profitSharingRatio", label: "Profit Sharing Ratio", placeholder: "5:5", type: "text" },
          { key: "roleAllocation", label: "Role Allocation", placeholder: "Operations / Finance / Sales", type: "textarea", validation: { minLength: 8 } },
          { key: "startDate", label: "Contract Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "employment-certificate": {
    id: "employment-certificate",
    title: "Petition",
    subtitle: "Labor Office",
    icon: "file-text",
    pdfFilePrefix: "petition_form",
    searchKeywords: ["petition", "labor office", "complaint"],
    steps: [
      {
        id: "claimant",
        question: "Enter petitioner/respondent details.",
        fields: [
          { key: "complainantName", label: "Petitioner Name", placeholder: "Name", type: "text" },
          { key: "complainantAddress", label: "Petitioner Address", placeholder: "Address", type: "text" },
          { key: "complainantPhone", label: "Petitioner Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } },
          { key: "respondentName", label: "Respondent Name", placeholder: "Company / Owner", type: "text" },
          { key: "respondentAddress", label: "Respondent Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "complaint",
        question: "Enter complaint details.",
        fields: [
          { key: "workplace", label: "Workplace", placeholder: "Workplace name", type: "text" },
          { key: "incidentDate", label: "Incident Date", placeholder: "", type: "date" },
          { key: "claimAmount", label: "Claim Amount", placeholder: "3,500,000 KRW", type: "text" },
          { key: "complaintSummary", label: "Complaint Summary", placeholder: "Detailed facts and damages", type: "textarea", validation: { minLength: 20 } },
          { key: "requestedRelief", label: "Requested Relief", placeholder: "Requested actions", type: "textarea", validation: { minLength: 8 } },
          { key: "submitDate", label: "Submit Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "career-certificate": {
    id: "career-certificate",
    title: "Tax Correction Claim",
    subtitle: "Tax",
    icon: "file-text",
    pdfFilePrefix: "tax_correction_claim",
    searchKeywords: ["tax correction", "refund", "amend"],
    steps: [
      {
        id: "taxpayer",
        question: "Enter taxpayer details.",
        fields: [
          { key: "taxpayerName", label: "Taxpayer Name", placeholder: "Name or Company", type: "text" },
          { key: "residentId", label: "Resident/Business ID", placeholder: "000000-0000000", type: "text" },
          { key: "address", label: "Address", placeholder: "Address", type: "text" },
          { key: "taxType", label: "Tax Type", placeholder: "Income Tax", type: "text" },
          { key: "targetPeriod", label: "Tax Period", placeholder: "2025 Tax Year", type: "text" }
        ]
      },
      {
        id: "amend",
        question: "Enter correction details.",
        fields: [
          { key: "claimedAmount", label: "Claimed Amount", placeholder: "1,200,000 KRW", type: "text" },
          { key: "reason", label: "Reason", placeholder: "Detailed reason for correction", type: "textarea", validation: { minLength: 12 } },
          { key: "evidenceList", label: "Evidence List", placeholder: "Supporting documents", type: "textarea", required: false },
          { key: "refundAccount", label: "Refund Account", placeholder: "Bank / Account Number", type: "text" },
          { key: "filingDate", label: "Filing Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "severance-request": {
    id: "severance-request",
    title: "Insurance Claim Form",
    subtitle: "Insurance",
    icon: "file-text",
    pdfFilePrefix: "insurance_claim",
    searchKeywords: ["insurance", "claim", "medical"],
    steps: [
      {
        id: "person",
        question: "Enter insured/claimant details.",
        fields: [
          { key: "insuredName", label: "Insured Name", placeholder: "Name", type: "text" },
          { key: "claimantName", label: "Claimant Name", placeholder: "Name", type: "text" },
          { key: "relationToInsured", label: "Relation", placeholder: "Self/Spouse/Parent", type: "text" },
          { key: "residentId", label: "Resident ID", placeholder: "000000-0000000", type: "text" },
          { key: "phone", label: "Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } },
          { key: "email", label: "Email", placeholder: "me@example.com", type: "email", required: false, validation: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" } }
        ]
      },
      {
        id: "claim",
        question: "Enter accident/claim details.",
        fields: [
          { key: "incidentDate", label: "Accident Date", placeholder: "", type: "date" },
          { key: "diagnosis", label: "Diagnosis", placeholder: "Fracture / Admission", type: "text" },
          { key: "hospitalName", label: "Hospital", placeholder: "Hospital name", type: "text" },
          { key: "claimItems", label: "Claim Items", placeholder: "Admission/Outpatient/Surgery", type: "textarea", validation: { minLength: 6 } },
          { key: "accidentDescription", label: "Accident Description", placeholder: "Detailed facts", type: "textarea", validation: { minLength: 20 } },
          { key: "paymentAccount", label: "Payout Account", placeholder: "Bank / Account / Holder", type: "text" }
        ]
      }
    ],
    initialData: {}
  },
  "wage-arrears-notice": {
    id: "wage-arrears-notice",
    title: "Name Change Petition",
    subtitle: "Family Court",
    icon: "file-text",
    pdfFilePrefix: "name_change_petition",
    searchKeywords: ["name change", "petition", "family court"],
    steps: [
      {
        id: "identity",
        question: "Enter current/new name details.",
        fields: [
          { key: "currentName", label: "Current Name", placeholder: "Current Name", type: "text" },
          { key: "currentNameHanja", label: "Current Name (Hanja)", placeholder: "HANJA", type: "text", required: false },
          { key: "residentId", label: "Resident ID", placeholder: "000000-0000000", type: "text" },
          { key: "newName", label: "New Name", placeholder: "New Name", type: "text" },
          { key: "newNameHanja", label: "New Name (Hanja)", placeholder: "HANJA", type: "text", required: false }
        ]
      },
      {
        id: "petition",
        question: "Enter petition reason.",
        fields: [
          { key: "address", label: "Address", placeholder: "Address", type: "text" },
          { key: "contact", label: "Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } },
          { key: "petitionReason", label: "Petition Reason", placeholder: "Detailed reason", type: "textarea", validation: { minLength: 20 } },
          { key: "supportingFacts", label: "Supporting Facts", placeholder: "Attached evidence summary", type: "textarea", required: false },
          { key: "petitionDate", label: "Petition Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "lease-termination-notice": {
    id: "lease-termination-notice",
    title: "Residential Lease Standard Contract",
    subtitle: "Real Estate",
    icon: "file-text",
    pdfFilePrefix: "residential_lease_standard",
    searchKeywords: ["residential lease", "lease contract", "housing"],
    steps: [
      {
        id: "parties",
        question: "Enter landlord/tenant details.",
        fields: [
          { key: "landlordName", label: "Landlord Name", placeholder: "Landlord", type: "text" },
          { key: "landlordAddress", label: "Landlord Address", placeholder: "Address", type: "text" },
          { key: "tenantName", label: "Tenant Name", placeholder: "Tenant", type: "text" },
          { key: "tenantAddress", label: "Tenant Address", placeholder: "Address", type: "text" },
          { key: "propertyAddress", label: "Property Address", placeholder: "Road address", type: "text" }
        ]
      },
      {
        id: "contract",
        question: "Enter lease terms.",
        fields: [
          { key: "depositAmount", label: "Deposit", placeholder: "100,000,000 KRW", type: "text" },
          { key: "monthlyRent", label: "Monthly Rent", placeholder: "500,000 KRW (0 if Jeonse)", type: "text" },
          { key: "contractStartDate", label: "Start Date", placeholder: "", type: "date" },
          { key: "contractEndDate", label: "End Date", placeholder: "", type: "date" },
          { key: "specialTerms", label: "Special Terms", placeholder: "Repairs / fees / clauses", type: "textarea", required: false },
          { key: "contractDate", label: "Contract Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "rent-arrears-demand": {
    id: "rent-arrears-demand",
    title: "Commercial Lease Standard Contract",
    subtitle: "Real Estate / Commercial",
    icon: "file-text",
    pdfFilePrefix: "commercial_lease_standard",
    searchKeywords: ["commercial lease", "shop lease", "lease"],
    steps: [
      {
        id: "parties",
        question: "Enter lessor/lessee details.",
        fields: [
          { key: "lessorName", label: "Lessor Name", placeholder: "Lessor", type: "text" },
          { key: "lesseeName", label: "Lessee Name", placeholder: "Lessee", type: "text" },
          { key: "storeAddress", label: "Store Address", placeholder: "Address", type: "text" },
          { key: "businessType", label: "Business Type", placeholder: "Cafe / Retail", type: "text" }
        ]
      },
      {
        id: "money",
        question: "Enter lease finance terms.",
        fields: [
          { key: "depositAmount", label: "Deposit", placeholder: "50,000,000 KRW", type: "text" },
          { key: "rentAmount", label: "Monthly Rent", placeholder: "2,000,000 KRW", type: "text" },
          { key: "managementFee", label: "Management Fee", placeholder: "200,000 KRW monthly", type: "text", required: false },
          { key: "contractStartDate", label: "Start Date", placeholder: "", type: "date" },
          { key: "contractEndDate", label: "End Date", placeholder: "", type: "date" },
          { key: "rentDueDate", label: "Rent Due Date", placeholder: "25th monthly", type: "text" },
          { key: "specialTerms", label: "Special Terms", placeholder: "Rights / restoration / repairs", type: "textarea", required: false },
          { key: "contractDate", label: "Contract Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "deposit-return-confirmation": {
    id: "deposit-return-confirmation",
    title: "Debt Certificate POA",
    subtitle: "Power of Attorney",
    icon: "file-text",
    pdfFilePrefix: "debt_certificate_poa",
    searchKeywords: ["debt certificate", "poa", "delegate"],
    steps: [
      {
        id: "principal",
        question: "Enter principal details.",
        fields: [
          { key: "principalName", label: "Principal Name", placeholder: "Name", type: "text" },
          { key: "principalBirth", label: "Principal Birth Date", placeholder: "1990-01-01", type: "date" },
          { key: "principalAddress", label: "Principal Address", placeholder: "Address", type: "text" },
          { key: "principalContact", label: "Principal Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } }
        ]
      },
      {
        id: "agent",
        question: "Enter agent and delegation.",
        fields: [
          { key: "agentName", label: "Agent Name", placeholder: "Name", type: "text" },
          { key: "agentBirth", label: "Agent Birth Date", placeholder: "1990-01-01", type: "date" },
          { key: "agentAddress", label: "Agent Address", placeholder: "Address", type: "text" },
          { key: "agentContact", label: "Agent Phone", placeholder: "010-1111-2222", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } },
          { key: "delegatedTask", label: "Delegated Task", placeholder: "Issue debt certificate", type: "text" },
          { key: "usePurpose", label: "Purpose", placeholder: "Court submission", type: "text" },
          { key: "issueDate", label: "Issue Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "settlement-agreement": {
    id: "settlement-agreement",
    title: "Settlement Agreement",
    subtitle: "Dispute Resolution",
    icon: "pen-line",
    pdfFilePrefix: "settlement_agreement",
    searchKeywords: ["settlement", "agreement", "dispute"],
    steps: [
      {
        id: "parties",
        question: "Enter party details.",
        fields: [
          { key: "partyAName", label: "Party A Name", placeholder: "Party A", type: "text" },
          { key: "partyAAddress", label: "Party A Address", placeholder: "Address", type: "text" },
          { key: "partyBName", label: "Party B Name", placeholder: "Party B", type: "text" },
          { key: "partyBAddress", label: "Party B Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "terms",
        question: "Enter settlement terms.",
        fields: [
          { key: "disputeSummary", label: "Dispute Summary", placeholder: "Describe dispute background", type: "textarea", validation: { minLength: 12 } },
          { key: "settlementAmount", label: "Settlement Amount", placeholder: "5,000,000 KRW", type: "text" },
          { key: "paymentDate", label: "Payment Date", placeholder: "", type: "date" },
          { key: "confidentialityClause", label: "Confidentiality Clause", placeholder: "Confidentiality terms", type: "textarea", required: false },
          { key: "noFurtherClaimClause", label: "No Further Claim Clause", placeholder: "No additional claims clause", type: "textarea", validation: { minLength: 12 } },
          { key: "agreementDate", label: "Agreement Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "debt-repayment-commitment": {
    id: "debt-repayment-commitment",
    title: "Guardian Consent Form",
    subtitle: "Consent",
    icon: "file-text",
    pdfFilePrefix: "guardian_consent",
    searchKeywords: ["guardian", "minor work", "consent"],
    steps: [
      {
        id: "guardian",
        question: "Enter guardian details.",
        fields: [
          { key: "guardianName", label: "Guardian Name", placeholder: "Guardian", type: "text" },
          { key: "guardianBirth", label: "Guardian Birth Date", placeholder: "1970-01-01", type: "date" },
          { key: "guardianAddress", label: "Guardian Address", placeholder: "Address", type: "text" },
          { key: "guardianContact", label: "Guardian Phone", placeholder: "010-1234-5678", type: "tel", validation: { pattern: "^[0-9\\-\\s]{8,20}$" } }
        ]
      },
      {
        id: "minor",
        question: "Enter minor and workplace details.",
        fields: [
          { key: "minorName", label: "Minor Name", placeholder: "Minor", type: "text" },
          { key: "minorBirth", label: "Minor Birth Date", placeholder: "2010-01-01", type: "date" },
          { key: "minorAddress", label: "Minor Address", placeholder: "Address", type: "text" },
          { key: "relation", label: "Relationship", placeholder: "Parent / Guardian", type: "text" },
          { key: "workplaceName", label: "Workplace Name", placeholder: "Cafe Name", type: "text" },
          { key: "workDescription", label: "Work Description", placeholder: "Part-time work details", type: "textarea", validation: { minLength: 8 } },
          { key: "consentDate", label: "Consent Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "payment-order-application": {
    id: "payment-order-application",
    title: "Payment Order Application",
    subtitle: "Court",
    icon: "file-text",
    pdfFilePrefix: "payment_order_application",
    searchKeywords: ["payment order", "court", "claim"],
    steps: [
      {
        id: "parties",
        question: "Enter court and party details.",
        fields: [
          { key: "courtName", label: "Court Name", placeholder: "Seoul Central District Court", type: "text" },
          { key: "applicantName", label: "Applicant Name", placeholder: "Applicant", type: "text" },
          { key: "applicantAddress", label: "Applicant Address", placeholder: "Address", type: "text" },
          { key: "respondentName", label: "Respondent Name", placeholder: "Respondent", type: "text" },
          { key: "respondentAddress", label: "Respondent Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "claim",
        question: "Enter claim details.",
        fields: [
          { key: "claimAmount", label: "Claim Amount", placeholder: "20,000,000 KRW", type: "text" },
          { key: "loanDate", label: "Cause Date", placeholder: "", type: "date" },
          { key: "dueDate", label: "Due Date", placeholder: "", type: "date" },
          { key: "factSummary", label: "Cause Summary", placeholder: "Detailed cause and non-payment facts", type: "textarea", validation: { minLength: 20 } },
          { key: "evidenceList", label: "Evidence List", placeholder: "Note, transfer history, messages", type: "textarea", validation: { minLength: 6 } },
          { key: "applicationDate", label: "Application Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "power-of-attorney": {
    id: "power-of-attorney",
    title: "Standard Power of Attorney",
    subtitle: "Registration / Delegate",
    icon: "file-text",
    pdfFilePrefix: "standard_poa",
    searchKeywords: ["poa", "registration", "delegate"],
    steps: [
      {
        id: "property",
        question: "Enter property/registration details.",
        fields: [
          { key: "propertyDescription", label: "Property Description", placeholder: "Address / lot / unit", type: "text" },
          { key: "registrationCause", label: "Registration Cause", placeholder: "Sale / Gift / Inheritance", type: "text" },
          { key: "registrationDate", label: "Cause Date", placeholder: "", type: "date" },
          { key: "registrationPurpose", label: "Registration Purpose", placeholder: "Ownership transfer", type: "text" }
        ]
      },
      {
        id: "people",
        question: "Enter principal/agent details.",
        fields: [
          { key: "principalName", label: "Principal Name", placeholder: "Principal", type: "text" },
          { key: "principalAddress", label: "Principal Address", placeholder: "Address", type: "text" },
          { key: "principalBirth", label: "Principal Birth Date", placeholder: "1990-01-01", type: "date" },
          { key: "agentName", label: "Agent Name", placeholder: "Agent", type: "text" },
          { key: "agentAddress", label: "Agent Address", placeholder: "Address", type: "text" },
          { key: "agentBirth", label: "Agent Birth Date", placeholder: "1990-01-01", type: "date" },
          { key: "issueDate", label: "Issue Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "statement-of-fact": {
    id: "statement-of-fact",
    title: "Marriage Registration Form",
    subtitle: "Family Register",
    icon: "file-text",
    pdfFilePrefix: "marriage_registration",
    searchKeywords: ["marriage", "registration", "family register"],
    steps: [
      {
        id: "couple",
        question: "Enter spouse details.",
        fields: [
          { key: "husbandName", label: "Husband Name", placeholder: "Name", type: "text" },
          { key: "husbandResidentId", label: "Husband Resident ID", placeholder: "000000-0000000", type: "text" },
          { key: "husbandAddress", label: "Husband Address", placeholder: "Address", type: "text" },
          { key: "wifeName", label: "Wife Name", placeholder: "Name", type: "text" },
          { key: "wifeResidentId", label: "Wife Resident ID", placeholder: "000000-0000000", type: "text" },
          { key: "wifeAddress", label: "Wife Address", placeholder: "Address", type: "text" }
        ]
      },
      {
        id: "marriage",
        question: "Enter marriage dates and witnesses.",
        fields: [
          { key: "marriageDate", label: "Marriage Filing Date", placeholder: "", type: "date" },
          { key: "startCohabitationDate", label: "Cohabitation Start Date", placeholder: "", type: "date" },
          { key: "witness1Name", label: "Witness 1 Name", placeholder: "Witness 1", type: "text" },
          { key: "witness2Name", label: "Witness 2 Name", placeholder: "Witness 2", type: "text" },
          { key: "filingDate", label: "Written Date", placeholder: "", type: "date" }
        ]
      }
    ],
    initialData: {}
  },
  "personal-info-consent": {
    id: "personal-info-consent",
    title: "Business Plan (Part 2)",
    subtitle: "Planning",
    icon: "file-text",
    pdfFilePrefix: "business_plan_part2",
    searchKeywords: ["business plan", "startup", "go-to-market"],
    steps: [
      {
        id: "overview",
        question: "Enter business overview.",
        fields: [
          { key: "companyName", label: "Company Name", placeholder: "DocAI Inc.", type: "text" },
          { key: "representativeName", label: "Representative Name", placeholder: "Name", type: "text" },
          { key: "projectName", label: "Project Name", placeholder: "AI Document Automation", type: "text" },
          { key: "businessItem", label: "Core Item", placeholder: "B2B document SaaS", type: "text" },
          { key: "targetMarket", label: "Target Market", placeholder: "SMB and professional market", type: "textarea", validation: { minLength: 8 } }
        ]
      },
      {
        id: "strategy",
        question: "Enter strategy and financial plan.",
        fields: [
          { key: "coreProblem", label: "Core Problem", placeholder: "Customer pain points", type: "textarea", validation: { minLength: 12 } },
          { key: "solutionSummary", label: "Solution Summary", placeholder: "Core solution details", type: "textarea", validation: { minLength: 12 } },
          { key: "revenueModel", label: "Revenue Model", placeholder: "Subscription / usage / license", type: "textarea", validation: { minLength: 8 } },
          { key: "fundingPlan", label: "Funding Plan", placeholder: "Own capital / loan / investment", type: "textarea", validation: { minLength: 8 } },
          { key: "executionSchedule", label: "Execution Schedule", placeholder: "Quarterly milestones", type: "textarea", validation: { minLength: 8 } }
        ]
      }
    ],
    initialData: {}
  },
};
