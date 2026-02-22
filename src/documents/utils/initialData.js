export const buildInitialDataFromDefinition = (definition) => {
  if (!definition) {
    return {};
  }

  const base = { ...(definition.initialData ?? {}) };

  for (const step of definition.steps ?? []) {
    for (const field of step.fields ?? []) {
      if (typeof base[field.key] === "undefined") {
        base[field.key] = "";
      }
    }
  }

  return base;
};
