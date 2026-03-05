import { getStorageItem, getStorageKeys, removeStorageItem, setStorageItem } from "./storage";

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
  if (!documentType) {
    return;
  }

  const payload = {
    documentType,
    formData: { ...(formData ?? {}) },
    stepIndex: Number.isInteger(stepIndex) ? stepIndex : 0,
    updatedAt: Date.now(),
  };
  setStorageItem(getDraftStorageKey(documentType), JSON.stringify(payload));
};

export const loadDocumentDraft = (documentType) => {
  if (!documentType) {
    return null;
  }

  const raw = getStorageItem(getDraftStorageKey(documentType));
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
  if (!documentType) {
    return;
  }
  removeStorageItem(getDraftStorageKey(documentType));
};

export const clearAllDocumentDrafts = () => {
  const keysToDelete = getStorageKeys().filter((key) => key.startsWith(DRAFT_STORAGE_PREFIX));
  keysToDelete.forEach((key) => removeStorageItem(key));
};
