export const COMMON_PROFILE_STORAGE_KEY = "docai_common_profile";

export const createEmptyCommonProfile = () => ({
  name: "",
  phone: "",
  residentId: "",
  address: "",
  email: "",
});

const COMMON_PROFILE_FIELD_MAP = {
  resume: {
    fullName: "name",
    phone: "phone",
    email: "email",
  },
  "jeonse-return": {
    senderName: "name",
    senderContact: "phone",
    senderAddress: "address",
  },
  "standard-labor-contract": {
    employeeName: "name",
    employeeAddress: "address",
  },
  resignation: {
    employeeName: "name",
  },
  "promissory-note": {
    borrowerName: "name",
    borrowerContact: "phone",
    borrowerAddress: "address",
  },
  "freelance-service-contract": {
    contractorName: "name",
    contractorAddress: "address",
  },
  "employment-certificate": {
    employeeName: "name",
  },
  "career-certificate": {
    employeeName: "name",
  },
  "severance-request": {
    employeeName: "name",
  },
  "wage-arrears-notice": {
    senderName: "name",
    senderContact: "phone",
    senderAddress: "address",
  },
  "lease-termination-notice": {
    senderName: "name",
    senderContact: "phone",
  },
  "rent-arrears-demand": {
    senderName: "name",
    senderContact: "phone",
  },
  "deposit-return-confirmation": {
    tenantName: "name",
  },
  "settlement-agreement": {
    partyAName: "name",
    partyAAddress: "address",
  },
  "debt-repayment-commitment": {
    debtorName: "name",
    debtorAddress: "address",
  },
  "payment-order-application": {
    applicantName: "name",
  },
  "power-of-attorney": {
    principalName: "name",
    principalAddress: "address",
    principalContact: "phone",
  },
  "statement-of-fact": {
    authorName: "name",
  },
  "personal-info-consent": {
    dataSubjectName: "name",
  },
  nda: {
    receivingParty: "name",
  },
};

const trimValue = (value) => (typeof value === "string" ? value.trim() : "");

export const hasCommonProfileData = (profile) =>
  ["name", "phone", "residentId", "address", "email"].some((key) => trimValue(profile?.[key]).length > 0);

export const hasCommonProfileMapping = (documentType) => Boolean(COMMON_PROFILE_FIELD_MAP[documentType]);

export const applyCommonProfileToDocumentData = (documentType, formData, profile) => {
  const fieldMap = COMMON_PROFILE_FIELD_MAP[documentType];
  if (!fieldMap) {
    return formData;
  }

  const merged = { ...formData };

  for (const [fieldKey, profileKey] of Object.entries(fieldMap)) {
    const profileValue = trimValue(profile?.[profileKey]);
    const existingValue = trimValue(merged[fieldKey]);
    if (profileValue && !existingValue) {
      merged[fieldKey] = profileValue;
    }
  }

  return merged;
};

export const loadCommonProfileFromStorage = () => {
  if (typeof window === "undefined") {
    return createEmptyCommonProfile();
  }

  try {
    const raw = window.localStorage.getItem(COMMON_PROFILE_STORAGE_KEY);
    if (!raw) {
      return createEmptyCommonProfile();
    }
    const parsed = JSON.parse(raw);
    return { ...createEmptyCommonProfile(), ...(parsed ?? {}) };
  } catch {
    return createEmptyCommonProfile();
  }
};

export const saveCommonProfileToStorage = (profile) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    COMMON_PROFILE_STORAGE_KEY,
    JSON.stringify({ ...createEmptyCommonProfile(), ...(profile ?? {}) }),
  );
};

