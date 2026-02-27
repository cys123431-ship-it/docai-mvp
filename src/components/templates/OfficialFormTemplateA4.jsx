import { documentQuestions } from "../../../data/documentQuestions";

const FORM_PAGE_COUNTS = {
  "standard-labor-contract": 7,
  resume: 7,
  "personal-info-consent": 18,
  "severance-request": 6,
  "statement-of-fact": 2,
  "wage-arrears-notice": 3,
  "career-certificate": 2,
  "jeonse-return": 3,
  "deposit-return-confirmation": 1,
  resignation: 1,
  "rent-arrears-demand": 4,
  "lease-termination-notice": 5,
  "payment-order-application": 6,
  "employment-certificate": 1,
  "promissory-note": 1,
  "debt-repayment-commitment": 1,
  "freelance-service-contract": 2,
  "power-of-attorney": 3,
  "settlement-agreement": 1,
};

const OVERLAY_LAYOUT = {
  "standard-labor-contract": { left: 14, top: 17, width: 34, lineHeight: 4.2, maxFields: 8 },
  resume: { left: 14, top: 16, width: 34, lineHeight: 4.2, maxFields: 8 },
  "personal-info-consent": { left: 14, top: 18, width: 36, lineHeight: 4.4, maxFields: 8 },
  "severance-request": { left: 14, top: 18, width: 36, lineHeight: 4.1, maxFields: 8 },
  "statement-of-fact": { left: 12, top: 32, width: 38, lineHeight: 4.1, maxFields: 8 },
  "wage-arrears-notice": { left: 14, top: 24, width: 36, lineHeight: 4.2, maxFields: 8 },
  "career-certificate": { left: 12, top: 18, width: 38, lineHeight: 4.2, maxFields: 8 },
  "jeonse-return": { left: 13, top: 16, width: 38, lineHeight: 4.2, maxFields: 8 },
  "deposit-return-confirmation": { left: 16, top: 26, width: 38, lineHeight: 5.1, maxFields: 8 },
  resignation: { left: 18, top: 24, width: 36, lineHeight: 5.1, maxFields: 8 },
  "rent-arrears-demand": { left: 13, top: 22, width: 37, lineHeight: 4.2, maxFields: 8 },
  "lease-termination-notice": { left: 13, top: 22, width: 37, lineHeight: 4.2, maxFields: 8 },
  "payment-order-application": { left: 11, top: 20, width: 38, lineHeight: 3.9, maxFields: 8 },
  "employment-certificate": { left: 13, top: 21, width: 36, lineHeight: 4.5, maxFields: 8 },
  "promissory-note": { left: 14, top: 23, width: 36, lineHeight: 4.6, maxFields: 8 },
  "debt-repayment-commitment": { left: 14, top: 21, width: 36, lineHeight: 4.8, maxFields: 8 },
  "freelance-service-contract": { left: 14, top: 18, width: 36, lineHeight: 4.2, maxFields: 8 },
  "power-of-attorney": { left: 14, top: 18, width: 36, lineHeight: 4.2, maxFields: 8 },
  "settlement-agreement": { left: 14, top: 24, width: 36, lineHeight: 4.8, maxFields: 8 },
};

const valueOrBlank = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "";
};

const getOverlayFields = (documentType) => {
  const definition = documentQuestions[documentType];
  if (!definition) {
    return [];
  }

  const fields = [];
  for (const step of definition.steps ?? []) {
    for (const field of step.fields ?? []) {
      fields.push(field);
    }
  }
  return fields;
};

export default function OfficialFormTemplateA4({ documentType, data }) {
  const pageCount = FORM_PAGE_COUNTS[documentType] ?? 1;
  const pageNumbers = Array.from({ length: pageCount }, (_, idx) => idx + 1);
  const layout = OVERLAY_LAYOUT[documentType] ?? { left: 12, top: 16, width: 36, lineHeight: 4.2, maxFields: 8 };
  const overlayFields = getOverlayFields(documentType).slice(0, layout.maxFields);

  return (
    <article id="pdf-document" className="space-y-3">
      {pageNumbers.map((page) => (
        <section
          key={page}
          className="relative w-full overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-soft"
        >
          <img
            src={`/official-forms/${documentType}/page-${page}.png`}
            alt={`${documentType} page ${page}`}
            className="block w-full"
            loading="lazy"
          />

          {page === 1 && overlayFields.length > 0 ? (
            <div
              className="absolute"
              style={{
                left: `${layout.left}%`,
                top: `${layout.top}%`,
                width: `${layout.width}%`,
              }}
            >
              {overlayFields.map((field, index) => (
                <p
                  key={field.key}
                  className="truncate text-[10px] leading-none text-slate-900"
                  style={{ marginTop: index === 0 ? "0" : `${layout.lineHeight}%` }}
                >
                  {valueOrBlank(data[field.key])}
                </p>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </article>
  );
}
