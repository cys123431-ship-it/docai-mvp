const isEmpty = (value) => typeof value !== "string" || value.trim().length === 0;

const buildFieldError = (field, code, message, hint, example) => ({
  code,
  fieldKey: field.key,
  label: field.label,
  message,
  hint,
  example,
});

const getTypeHint = (field, code) => {
  if (code === "required") {
    return "필수 항목입니다. 입력 후 다시 시도해주세요.";
  }

  if (code === "pattern") {
    if (field.type === "tel") {
      return "숫자만 입력하면 자동으로 하이픈이 적용됩니다.";
    }
    if (field.type === "email") {
      return "아이디@도메인 형식으로 입력해주세요.";
    }
    return "입력 형식을 확인한 뒤 다시 입력해주세요.";
  }

  if (code === "minLength") {
    return "핵심 내용 위주로 조금 더 자세히 입력해주세요.";
  }

  if (code === "maxLength") {
    return "핵심 단어만 남겨 간결하게 줄여주세요.";
  }

  return "입력값을 확인 후 다시 시도해주세요.";
};

export const validateField = (field, value) => {
  const required = field.required !== false;
  const trimmed = typeof value === "string" ? value.trim() : "";
  const example = field.placeholder ? `예: ${field.placeholder}` : "";

  if (required && isEmpty(value)) {
    return buildFieldError(field, "required", `${field.label}을(를) 입력해주세요.`, getTypeHint(field, "required"), example);
  }

  if (!required && isEmpty(value)) {
    return null;
  }

  if (field.validation?.minLength && trimmed.length < field.validation.minLength) {
    return buildFieldError(
      field,
      "minLength",
      field.validation.message ?? `${field.label}은(는) ${field.validation.minLength}자 이상 입력해주세요.`,
      getTypeHint(field, "minLength"),
      example,
    );
  }

  if (field.validation?.maxLength && trimmed.length > field.validation.maxLength) {
    return buildFieldError(
      field,
      "maxLength",
      field.validation.message ?? `${field.label}은(는) ${field.validation.maxLength}자 이하로 입력해주세요.`,
      getTypeHint(field, "maxLength"),
      example,
    );
  }

  if (field.validation?.pattern) {
    const pattern = new RegExp(field.validation.pattern);
    if (!pattern.test(trimmed)) {
      return buildFieldError(
        field,
        "pattern",
        field.validation.message ?? `${field.label} 형식이 올바르지 않습니다.`,
        getTypeHint(field, "pattern"),
        example,
      );
    }
  }

  return null;
};

const createDateOrderError = (field, message) =>
  buildFieldError(field, "dateOrder", message, "시작일과 종료일의 순서를 확인해주세요.", "");

const parseDate = (rawDate) => {
  if (!rawDate || typeof rawDate !== "string") {
    return null;
  }
  const timestamp = Date.parse(rawDate);
  if (Number.isNaN(timestamp)) {
    return null;
  }
  return timestamp;
};

const validateDateOrder = (fields, formData, fieldErrors) => {
  const pairs = [
    ["startDate", "endDate", "종료일은 시작일 이후여야 합니다."],
    ["employmentStartDate", "employmentEndDate", "퇴사일은 입사일 이후여야 합니다."],
    ["loanDate", "dueDate", "변제기일은 대여일 이후여야 합니다."],
  ];

  for (const [startKey, endKey, message] of pairs) {
    const startField = fields.find((field) => field.key === startKey);
    const endField = fields.find((field) => field.key === endKey);
    if (!startField || !endField) {
      continue;
    }

    if (fieldErrors[startKey] || fieldErrors[endKey]) {
      continue;
    }

    const startDate = parseDate(formData[startKey]);
    const endDate = parseDate(formData[endKey]);
    if (startDate && endDate && startDate > endDate) {
      return createDateOrderError(endField, message);
    }
  }

  return null;
};

export const validateStep = (step, formData) => {
  if (!step) {
    const stepError = {
      code: "invalidStep",
      fieldKey: "",
      label: "",
      message: "단계 정보가 올바르지 않습니다.",
      hint: "홈으로 돌아가 문서를 다시 선택해주세요.",
      example: "",
    };
    return { isValid: false, firstError: stepError, fieldErrors: {} };
  }

  const fieldErrors = {};
  let firstError = null;

  for (const field of step.fields ?? []) {
    const error = validateField(field, formData[field.key]);
    if (error) {
      fieldErrors[field.key] = error;
      if (!firstError) {
        firstError = error;
      }
    }
  }

  if (!firstError) {
    const dateOrderError = validateDateOrder(step.fields ?? [], formData, fieldErrors);
    if (dateOrderError) {
      fieldErrors[dateOrderError.fieldKey] = dateOrderError;
      firstError = dateOrderError;
    }
  }

  return {
    isValid: !firstError,
    firstError,
    fieldErrors,
  };
};

