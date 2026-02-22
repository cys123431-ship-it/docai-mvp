const isEmpty = (value) => typeof value !== "string" || value.trim().length === 0;

export const validateField = (field, value) => {
  const required = field.required !== false;

  if (required && isEmpty(value)) {
    return `${field.label}을(를) 입력해주세요.`;
  }

  if (!required && isEmpty(value)) {
    return "";
  }

  if (field.validation?.minLength && value.trim().length < field.validation.minLength) {
    return field.validation.message ?? `${field.label}은(는) ${field.validation.minLength}자 이상이어야 합니다.`;
  }

  if (field.validation?.maxLength && value.trim().length > field.validation.maxLength) {
    return field.validation.message ?? `${field.label}은(는) ${field.validation.maxLength}자 이하로 입력해주세요.`;
  }

  if (field.validation?.pattern) {
    const pattern = new RegExp(field.validation.pattern);
    if (!pattern.test(value.trim())) {
      return field.validation.message ?? `${field.label} 형식이 올바르지 않습니다.`;
    }
  }

  return "";
};

export const validateStep = (step, formData) => {
  if (!step) {
    return "단계 정보가 올바르지 않습니다.";
  }

  for (const field of step.fields ?? []) {
    const message = validateField(field, formData[field.key]);
    if (message) {
      return message;
    }
  }

  return "";
};
