import { BriefcaseBusiness, ChevronRight, FileText, PenLine } from "lucide-react";
import { DOCUMENT_LIST } from "../documents/registry";

const ICON_MAP = {
  "file-text": FileText,
  "briefcase-business": BriefcaseBusiness,
  "pen-line": PenLine,
};

export default function Home({ onStartDocument }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-5 pb-10 pt-8">
      <div className="mb-10">
        <p className="text-sm font-medium text-brand-700">DocAI</p>
        <h1 className="mt-2 text-[31px] font-bold leading-tight tracking-[-0.03em] text-slate-900">
          어떤 서류가
          <br />
          필요하신가요?
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          대화형 질문에 답하면 바로 PDF까지 완성해드려요.
        </p>
      </div>

      <div className="space-y-3">
        {DOCUMENT_LIST.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? FileText;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onStartDocument(item.id)}
              className="w-full rounded-3xl border border-brand-100 bg-white px-4 py-4 text-left shadow-soft transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-500">
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <p className="text-[17px] font-semibold tracking-[-0.02em]">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>

                <div className="text-slate-500">
                  <ChevronRight size={18} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
