const USAGE_METRICS_STORAGE_KEY = "docai_usage_metrics_v1";
const METRIC_TYPES = ["starts", "completes", "downloads"];

const createDocumentMetric = () => ({
  starts: 0,
  completes: 0,
  downloads: 0,
  lastEventAt: 0,
});

export const createEmptyUsageMetrics = () => ({
  totals: createDocumentMetric(),
  byDocument: {},
});

const safeJsonParse = (rawValue) => {
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const loadUsageMetrics = () => {
  if (typeof window === "undefined") {
    return createEmptyUsageMetrics();
  }

  const raw = window.localStorage.getItem(USAGE_METRICS_STORAGE_KEY);
  if (!raw) {
    return createEmptyUsageMetrics();
  }

  const parsed = safeJsonParse(raw);
  if (!parsed || typeof parsed !== "object") {
    return createEmptyUsageMetrics();
  }

  return {
    totals: { ...createDocumentMetric(), ...(parsed.totals ?? {}) },
    byDocument: { ...(parsed.byDocument ?? {}) },
  };
};

export const saveUsageMetrics = (metrics) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(USAGE_METRICS_STORAGE_KEY, JSON.stringify(metrics));
};

export const recordUsageMetric = (metrics, metricType, documentType) => {
  if (!METRIC_TYPES.includes(metricType) || !documentType) {
    return metrics;
  }

  const next = {
    totals: { ...createDocumentMetric(), ...(metrics?.totals ?? {}) },
    byDocument: { ...(metrics?.byDocument ?? {}) },
  };

  const currentDocumentMetric = { ...createDocumentMetric(), ...(next.byDocument[documentType] ?? {}) };
  currentDocumentMetric[metricType] += 1;
  currentDocumentMetric.lastEventAt = Date.now();
  next.byDocument[documentType] = currentDocumentMetric;

  next.totals[metricType] += 1;
  next.totals.lastEventAt = Date.now();

  return next;
};

export const clearUsageMetrics = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(USAGE_METRICS_STORAGE_KEY);
};
