export const COMMON_PROFILE_STORAGE_KEY = "docai_common_profile_state_v2";

const DEFAULT_ACTIVE_PROFILE_ID = "personal";

export const createEmptyCommonProfile = () => ({
  name: "",
  phone: "",
  residentId: "",
  address: "",
  email: "",
});

const createCommonProfile = (id, label) => ({
  id,
  label,
  data: createEmptyCommonProfile(),
});

export const createDefaultCommonProfileState = () => ({
  activeProfileId: DEFAULT_ACTIVE_PROFILE_ID,
  persistSensitive: false,
  profiles: [createCommonProfile("personal", "개인용"), createCommonProfile("work", "업무용")],
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

const normalizeProfileData = (value) => ({
  ...createEmptyCommonProfile(),
  ...(value ?? {}),
});

const maskSensitiveData = (data) => ({
  ...data,
  residentId: "",
});

const normalizeProfile = (profile, fallbackProfile) => ({
  id: profile?.id ?? fallbackProfile.id,
  label: profile?.label ?? fallbackProfile.label,
  data: normalizeProfileData(profile?.data),
});

const normalizeState = (state) => {
  const fallback = createDefaultCommonProfileState();
  const fallbackMap = Object.fromEntries(fallback.profiles.map((profile) => [profile.id, profile]));
  const inputProfiles = Array.isArray(state?.profiles) ? state.profiles : fallback.profiles;
  const normalizedProfiles = inputProfiles.map((profile) =>
    normalizeProfile(profile, fallbackMap[profile?.id] ?? createCommonProfile(profile?.id ?? "custom", "사용자")),
  );

  const knownIds = new Set(normalizedProfiles.map((profile) => profile.id));
  for (const fallbackProfile of fallback.profiles) {
    if (!knownIds.has(fallbackProfile.id)) {
      normalizedProfiles.push(fallbackProfile);
    }
  }

  const activeProfileId = knownIds.has(state?.activeProfileId) ? state.activeProfileId : DEFAULT_ACTIVE_PROFILE_ID;

  return {
    activeProfileId,
    persistSensitive: Boolean(state?.persistSensitive),
    profiles: normalizedProfiles,
  };
};

export const getActiveCommonProfile = (state) => {
  const normalized = normalizeState(state);
  const active = normalized.profiles.find((profile) => profile.id === normalized.activeProfileId);
  return active ?? normalized.profiles[0];
};

export const hasCommonProfileData = (profileData) =>
  ["name", "phone", "residentId", "address", "email"].some((key) => trimValue(profileData?.[key]).length > 0);

export const hasCommonProfileMapping = (documentType) => Boolean(COMMON_PROFILE_FIELD_MAP[documentType]);

export const applyCommonProfileToDocumentData = (documentType, formData, profileData) => {
  const fieldMap = COMMON_PROFILE_FIELD_MAP[documentType];
  if (!fieldMap) {
    return formData;
  }

  const merged = { ...formData };

  for (const [fieldKey, profileKey] of Object.entries(fieldMap)) {
    const profileValue = trimValue(profileData?.[profileKey]);
    const existingValue = trimValue(merged[fieldKey]);
    if (profileValue && !existingValue) {
      merged[fieldKey] = profileValue;
    }
  }

  return merged;
};

export const updateCommonProfileData = (state, profileId, updater) => {
  const normalized = normalizeState(state);
  return {
    ...normalized,
    profiles: normalized.profiles.map((profile) => {
      if (profile.id !== profileId) {
        return profile;
      }
      return {
        ...profile,
        data: normalizeProfileData(typeof updater === "function" ? updater(profile.data) : updater),
      };
    }),
  };
};

export const resetCommonProfiles = () => createDefaultCommonProfileState();

export const loadCommonProfileStateFromStorage = () => {
  if (typeof window === "undefined") {
    return createDefaultCommonProfileState();
  }

  try {
    const raw = window.localStorage.getItem(COMMON_PROFILE_STORAGE_KEY);
    if (!raw) {
      return createDefaultCommonProfileState();
    }
    return normalizeState(JSON.parse(raw));
  } catch {
    return createDefaultCommonProfileState();
  }
};

export const saveCommonProfileStateToStorage = (state) => {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = normalizeState(state);
  const payload = {
    ...normalized,
    profiles: normalized.profiles.map((profile) => ({
      ...profile,
      data: normalized.persistSensitive ? profile.data : maskSensitiveData(profile.data),
    })),
  };

  window.localStorage.setItem(COMMON_PROFILE_STORAGE_KEY, JSON.stringify(payload));
};

export const clearCommonProfileStateStorage = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(COMMON_PROFILE_STORAGE_KEY);
};

