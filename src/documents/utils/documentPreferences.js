const DOCUMENT_PREFERENCES_STORAGE_KEY = "docai_document_preferences_v1";
const MAX_RECENT_DOCUMENTS = 8;

const createDefaultPreferences = () => ({
  favorites: [],
  recents: [],
});

const safeJsonParse = (rawValue) => {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const loadDocumentPreferences = () => {
  if (typeof window === "undefined") {
    return createDefaultPreferences();
  }

  const raw = window.localStorage.getItem(DOCUMENT_PREFERENCES_STORAGE_KEY);
  if (!raw) {
    return createDefaultPreferences();
  }

  const parsed = safeJsonParse(raw);
  return {
    favorites: Array.isArray(parsed?.favorites) ? parsed.favorites.filter(Boolean) : [],
    recents: Array.isArray(parsed?.recents) ? parsed.recents.filter(Boolean) : [],
  };
};

export const saveDocumentPreferences = (preferences) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    DOCUMENT_PREFERENCES_STORAGE_KEY,
    JSON.stringify({
      favorites: [...(preferences?.favorites ?? [])],
      recents: [...(preferences?.recents ?? [])],
    }),
  );
};

export const toggleFavoriteDocument = (preferences, documentType) => {
  const currentFavorites = new Set(preferences?.favorites ?? []);
  if (currentFavorites.has(documentType)) {
    currentFavorites.delete(documentType);
  } else {
    currentFavorites.add(documentType);
  }
  return {
    ...(preferences ?? createDefaultPreferences()),
    favorites: Array.from(currentFavorites),
  };
};

export const pushRecentDocument = (preferences, documentType) => {
  const recents = [documentType, ...(preferences?.recents ?? []).filter((item) => item !== documentType)].slice(
    0,
    MAX_RECENT_DOCUMENTS,
  );
  return {
    ...(preferences ?? createDefaultPreferences()),
    recents,
  };
};

export const clearDocumentPreferences = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(DOCUMENT_PREFERENCES_STORAGE_KEY);
};

