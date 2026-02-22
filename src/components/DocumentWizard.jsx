import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CircleAlert } from "lucide-react";
import { getDocumentById } from "../documents/registry";
import { formatFieldInput } from "../documents/utils/formatters";
import { saveDocumentDraft } from "../documents/utils/drafts";
import { validateStep } from "../documents/validation/validateField";

const getTodayIso = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatSavedTime = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return new Date(timestamp).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
};

export default function DocumentWizard({
  documentType,
  initialData,
  initialStep = 0,
  onBack,
  onComplete,
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState(initialData);
  const [errorDetail, setErrorDetail] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [lastDraftSavedAt, setLastDraftSavedAt] = useState(0);

  const definition = getDocumentById(documentType);
  const steps = definition?.steps ?? [];
  const step = steps[currentStep];

  useEffect(() => {
    setCurrentStep(initialStep);
    setErrorDetail(null);
    setFieldErrors({});
    setFormData(initialData);
  }, [initialData, initialStep]);

  useEffect(() => {
    if (!documentType) {
      return undefined;
    }

    const timer = setTimeout(() => {
      saveDocumentDraft(documentType, formData, currentStep);
      setLastDraftSavedAt(Date.now());
    }, 300);

    return () => clearTimeout(timer);
  }, [currentStep, documentType, formData]);

  const progress = useMemo(
    () => (steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0),
    [currentStep, steps.length],
  );

  const validateCurrentStep = () => {
    if (!step) {
      return false;
    }

    const result = validateStep(step, formData);
    if (!result.isValid) {
      setFieldErrors(result.fieldErrors);
      setErrorDetail(result.firstError);
      if (result.firstError?.fieldKey) {
        const target = document.getElementById(result.firstError.fieldKey);
        if (target) {
          target.focus();
        }
      }
      return false;
    }

    setFieldErrors({});
    setErrorDetail(null);
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep === steps.length - 1) {
      onComplete(formData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setErrorDetail(null);
    setFieldErrors({});
    if (currentStep === 0) {
      onBack();
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const updateField = (field, value) => {
    const nextValue = formatFieldInput(field, value);
    setFormData((prev) => ({ ...prev, [field.key]: nextValue }));
    setFieldErrors((prev) => {
      if (!prev[field.key]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field.key];
      return next;
    });
  };

  if (!step || !definition) {
    return (
      <section className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-5 pb-8 pt-6">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-base font-semibold text-slate-900">문서 구성을 불러올 수 없습니다.</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 rounded-2xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            홈으로 돌아가기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-5 pb-8 pt-6">
      <button
        type="button"
        onClick={handlePrev}
        className="mb-6 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-soft"
      >
        <ArrowLeft size={16} />
        이전
      </button>

      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold text-brand-700">{definition.title}</p>
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>작성 진행률</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/70">
          <div
            className="h-2 rounded-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {lastDraftSavedAt ? (
          <p className="mt-2 text-[11px] font-medium text-slate-500">초안 자동 저장: {formatSavedTime(lastDraftSavedAt)}</p>
        ) : null}
      </div>

      <div key={step.id} className="animate-step-in">
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <p className="text-[24px] font-bold leading-tight tracking-[-0.03em] text-slate-900">
            {step.question}
          </p>
          {step.helperText ? <p className="mt-2 text-sm text-slate-500">{step.helperText}</p> : null}

          <div className="mt-6 space-y-4">
            {step.fields.map((field) => {
              const fieldError = fieldErrors[field.key];
              return (
                <div key={field.key} className="block">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <label htmlFor={field.key} className="block text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    {field.type === "date" ? (
                      <button
                        type="button"
                        onClick={() => updateField(field, getTodayIso())}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        오늘 날짜
                      </button>
                    ) : null}
                  </div>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      value={formData[field.key] ?? ""}
                      placeholder={field.placeholder}
                      rows={4}
                      onChange={(event) => updateField(field, event.target.value)}
                      className={`w-full resize-none rounded-2xl border bg-slate-50 px-4 py-3 text-[15px] outline-none transition focus:bg-white ${
                        fieldError ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-brand-300"
                      }`}
                    />
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => updateField(field, event.target.value)}
                      className={`w-full rounded-2xl border bg-slate-50 px-4 py-3 text-[15px] outline-none transition focus:bg-white ${
                        fieldError ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-brand-300"
                      }`}
                    />
                  )}
                  {fieldError ? (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldError.message}
                      {fieldError.hint ? ` · ${fieldError.hint}` : ""}
                      {fieldError.example ? ` (${fieldError.example})` : ""}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {errorDetail ? (
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-500">
          <CircleAlert size={15} />
          {errorDetail.message}
          {errorDetail.hint ? ` - ${errorDetail.hint}` : ""}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleNext}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-4 text-base font-semibold text-white shadow-soft transition active:scale-[0.99]"
      >
        {currentStep === steps.length - 1 ? "미리보기 보기" : "다음"}
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

