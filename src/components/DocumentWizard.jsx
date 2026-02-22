import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CircleAlert } from "lucide-react";
import { getDocumentById } from "../documents/registry";
import { validateStep } from "../documents/validation/validateField";

export default function DocumentWizard({ documentType, initialData, onBack, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState("");

  const definition = getDocumentById(documentType);
  const steps = definition?.steps ?? [];
  const step = steps[currentStep];

  useEffect(() => {
    setCurrentStep(0);
    setErrorMessage("");
    setFormData(initialData);
  }, [documentType, initialData]);

  const progress = useMemo(
    () => (steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0),
    [currentStep, steps.length],
  );

  const validateCurrentStep = () => {
    if (!step) {
      return false;
    }

    const validationMessage = validateStep(step, formData);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return false;
    }

    setErrorMessage("");
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
    setErrorMessage("");
    if (currentStep === 0) {
      onBack();
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
      </div>

      <div key={step.id} className="animate-step-in">
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <p className="text-[24px] font-bold leading-tight tracking-[-0.03em] text-slate-900">
            {step.question}
          </p>
          {step.helperText ? <p className="mt-2 text-sm text-slate-500">{step.helperText}</p> : null}

          <div className="mt-6 space-y-4">
            {step.fields.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    value={formData[field.key] ?? ""}
                    placeholder={field.placeholder}
                    rows={4}
                    onChange={(event) => updateField(field.key, event.target.value)}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none transition focus:border-brand-300 focus:bg-white"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key] ?? ""}
                    placeholder={field.placeholder}
                    onChange={(event) => updateField(field.key, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none transition focus:border-brand-300 focus:bg-white"
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-500">
          <CircleAlert size={15} />
          {errorMessage}
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
