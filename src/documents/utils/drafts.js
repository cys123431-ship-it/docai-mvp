const DRAFT_STORAGE_PREFIX = "docai_draft_v1_";

const getDraftStorageKey = (documentType) => `${DRAFT_STORAGE_PREFIX}${documentType}`;

const safeJsonParse = (rawValue) => {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const saveDocumentDraft = (documentType, formData, stepIndex) => {
  if (typeof window === "undefined" || !documentType) {
    return;
  }

  const payload = {
    documentType,
    formData: { ...(formData ?? {}) },
    stepIndex: Number.isInteger(stepIndex) ? stepIndex : 0,
    updatedAt: Date.now(),
  };
  window.localStorage.setItem(getDraftStorageKey(documentType), JSON.stringify(payload));
};

export const loadDocumentDraft = (documentType) => {
  if (typeof window === "undefined" || !documentType) {
    return null;
  }

  const raw = window.localStorage.getItem(getDraftStorageKey(documentType));
  if (!raw) {
    return null;
  }

  const parsed = safeJsonParse(raw);
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  return {
    documentType,
    formData: { ...(parsed.formData ?? {}) },
    stepIndex: Number.isInteger(parsed.stepIndex) ? parsed.stepIndex : 0,
    updatedAt: Number.isFinite(parsed.updatedAt) ? parsed.updatedAt : Date.now(),
  };
};

export const clearDocumentDraft = (documentType) => {
  if (typeof window === "undefined" || !documentType) {
    return;
  }
  window.localStorage.removeItem(getDraftStorageKey(documentType));
};

export const clearAllDocumentDrafts = () => {
  if (typeof window === "undefined") {
    return;
  }

  const keysToDelete = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key?.startsWith(DRAFT_STORAGE_PREFIX)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((key) => window.localStorage.removeItem(key));
};

