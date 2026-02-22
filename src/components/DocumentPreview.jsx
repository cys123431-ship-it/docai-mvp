import { useEffect, useMemo, useState } from "react";
import { Download, FileCheck2, PencilLine } from "lucide-react";
import { getDocumentById } from "../documents/registry";
import { getTodayKor } from "../documents/utils/date";

function LoadingPreviewCard() {
  return (
    <article className="aspect-[210/297] w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="h-6 w-2/5 animate-pulse rounded-md bg-slate-100" />
      <div className="mt-5 h-4 w-4/5 animate-pulse rounded-md bg-slate-100" />
      <div className="mt-2 h-4 w-3/5 animate-pulse rounded-md bg-slate-100" />
      <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-slate-100" />
      <div className="mt-2 h-4 w-11/12 animate-pulse rounded-md bg-slate-100" />
      <div className="mt-2 h-4 w-4/5 animate-pulse rounded-md bg-slate-100" />
    </article>
  );
}

function FailedPreviewCard({ message }) {
  return (
    <article className="aspect-[210/297] w-full rounded-3xl border border-red-200 bg-white p-6 shadow-soft sm:p-8">
      <p className="text-sm font-semibold text-red-600">미리보기를 불러올 수 없습니다.</p>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
    </article>
  );
}

export default function DocumentPreview({ documentType, data, onEdit, onHome }) {
  const [isSaving, setIsSaving] = useState(false);
  const [TemplateComponent, setTemplateComponent] = useState(null);
  const [templateError, setTemplateError] = useState("");
  const definition = getDocumentById(documentType);
  const today = useMemo(() => getTodayKor(), []);

  useEffect(() => {
    let isActive = true;
    setTemplateError("");
    setTemplateComponent(null);

    if (!definition?.loadTemplate) {
      setTemplateError("문서 템플릿 정의가 없습니다.");
      return () => {
        isActive = false;
      };
    }

    definition
      .loadTemplate()
      .then((module) => {
        if (!isActive) {
          return;
        }
        setTemplateComponent(() => module.default);
      })
      .catch(() => {
        if (!isActive) {
          return;
        }
        setTemplateError("템플릿 로딩 중 오류가 발생했습니다.");
      });

    return () => {
      isActive = false;
    };
  }, [definition]);

  const downloadPdf = async () => {
    const target = document.getElementById("pdf-document");
    if (!target || !TemplateComponent) {
      return;
    }

    setIsSaving(true);
    try {
      const { default: html2pdf } = await import("html2pdf.js");
      await html2pdf()
        .from(target)
        .set({
          margin: [8, 8, 8, 8],
          filename: `${definition?.pdfFilePrefix ?? "DocAI_문서"}_${Date.now()}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-5 pb-8 pt-6">
      <div className="mb-5 rounded-3xl bg-brand-50 p-4">
        <p className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          <FileCheck2 size={16} />
          서류가 완성되었습니다!
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">{definition?.title ?? "문서"}</p>
        <p className="mt-1 text-sm text-slate-600">아래 미리보기를 확인한 뒤 PDF로 저장하세요.</p>
      </div>

      {!templateError && TemplateComponent ? (
        <TemplateComponent data={data} today={today} />
      ) : templateError ? (
        <FailedPreviewCard message={templateError} />
      ) : (
        <LoadingPreviewCard />
      )}

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={downloadPdf}
          disabled={isSaving || !TemplateComponent}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-4 text-base font-semibold text-white shadow-soft transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-brand-300"
        >
          <Download size={18} />
          {isSaving ? "PDF 생성 중..." : "PDF로 다운로드"}
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-slate-700"
        >
          <PencilLine size={17} />
          입력값 수정하기
        </button>

        <button
          type="button"
          onClick={onHome}
          className="w-full text-center text-sm font-medium text-slate-500 underline underline-offset-4"
        >
          홈으로 돌아가기
        </button>
      </div>
    </section>
  );
}
