const onlyDigits = (value) => value.replace(/\D/g, "");

const formatWithThousands = (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const formatPhoneNumber = (value) => {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export const formatResidentId = (value) => {
  const digits = onlyDigits(value).slice(0, 13);
  if (digits.length <= 6) {
    return digits;
  }
  return `${digits.slice(0, 6)}-${digits.slice(6)}`;
};

const isAmountField = (field) => {
  const key = String(field?.key ?? "").toLowerCase();
  const label = String(field?.label ?? "");
  return (
    key.includes("amount") ||
    key.includes("wage") ||
    key.includes("deposit") ||
    key.includes("claim") ||
    key.includes("debt") ||
    key.includes("principal") ||
    label.includes("금액") ||
    label.includes("보증금") ||
    label.includes("임금") ||
    label.includes("원금")
  );
};

export const formatAmountInput = (value) => {
  if (/[a-zA-Z가-힣]/.test(value)) {
    return value;
  }
  const digits = onlyDigits(value);
  if (!digits) {
    return "";
  }
  return formatWithThousands(digits);
};

export const formatFieldInput = (field, value) => {
  if (typeof value !== "string") {
    return value;
  }

  if (field?.type === "tel") {
    return formatPhoneNumber(value);
  }

  if (String(field?.key ?? "").toLowerCase().includes("resident")) {
    return formatResidentId(value);
  }

  if (isAmountField(field)) {
    return formatAmountInput(value);
  }

  return value;
};

