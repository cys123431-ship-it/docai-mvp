import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, ChevronRight, FileText, PenLine, Search, X } from "lucide-react";
import { DOCUMENT_LIST } from "../documents/registry";

const ICON_MAP = {
  "file-text": FileText,
  "briefcase-business": BriefcaseBusiness,
  "pen-line": PenLine,
};

const DOCUMENT_ALIAS_MAP = {
  resume: ["이력", "cv", "자소서", "취업"],
  "jeonse-return": ["전세", "보증금", "반환", "집주인", "임대인", "내용증명"],
  "standard-labor-contract": ["근로계약", "고용계약", "노무", "알바계약", "근무계약"],
  resignation: ["퇴직", "퇴사", "그만두기", "퇴직서"],
  "promissory-note": ["차용", "대여금", "차용금", "빌린돈", "돈빌림"],
  "freelance-service-contract": ["프리랜서", "용역", "외주", "도급", "프로젝트계약"],
  "employment-certificate": ["재직", "재직증명", "근무증명", "회사증명"],
  "career-certificate": ["경력", "경력증명", "근무이력", "이직"],
  "severance-request": ["퇴직금", "퇴직급여", "지급요청"],
  "wage-arrears-notice": ["임금체불", "월급체불", "체불임금", "노동청", "내용증명"],
  "lease-termination-notice": ["임대차해지", "계약해지", "퇴거통보", "전월세계약해지"],
  "rent-arrears-demand": ["월세미납", "월세독촉", "연체", "임대료미납", "내용증명"],
  "deposit-return-confirmation": ["보증금반환", "정산확인", "반환확인"],
  "settlement-agreement": ["합의", "합의문", "분쟁합의", "화해"],
  "debt-repayment-commitment": ["채무변제", "변제확약", "빚갚기", "채무확약"],
  "payment-order-application": ["지급명령", "법원신청", "독촉절차", "대여금청구"],
  "power-of-attorney": ["위임", "대리", "권한위임", "위임문서"],
  "statement-of-fact": ["사실확인", "사실진술", "진술서", "확인서"],
  "personal-info-consent": ["개인정보동의", "수집이용동의", "개인정보수집", "동의서"],
  nda: ["비밀유지", "기밀", "NDA", "비밀유지계약", "보안서약"],
};

const normalizeText = (value) => value.toLowerCase().replace(/\s+/g, "");
const ITEMS_PER_PAGE = 5;

const tokenize = (value) =>
  value
    .split(/\s+/)
    .map((token) => normalizeText(token))
    .filter(Boolean);

const matchesDocument = (document, tokens) => {
  if (tokens.length === 0) {
    return true;
  }

  const aliases = DOCUMENT_ALIAS_MAP[document.id] ?? [];
  const keywords = document.searchKeywords ?? [];
  const searchable = normalizeText(
    [document.title, document.subtitle, document.id, ...keywords, ...aliases].join(" "),
  );

  return tokens.every((token) => searchable.includes(token));
};

export default function Home({
  onStartDocument,
  commonProfile,
  onUpdateCommonProfile,
  onResetCommonProfile,
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredDocuments = useMemo(() => {
    const tokens = tokenize(query);
    return DOCUMENT_LIST.filter((item) => matchesDocument(item, tokens));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pagedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredDocuments]);

  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-5 pb-10 pt-8">
      <div className="mb-6">
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

      <div className="mb-5 rounded-3xl border border-brand-100 bg-white p-4 shadow-soft">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">공통 정보 빠른 입력</p>
            <p className="mt-1 text-xs text-slate-500">
              문서 시작 시 반영 여부를 선택할 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetCommonProfile}
            className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500"
          >
            초기화
          </button>
        </div>

        <div className="space-y-2.5">
          <input
            type="text"
            value={commonProfile.name}
            onChange={(event) => onUpdateCommonProfile("name", event.target.value)}
            placeholder="이름"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <input
            type="tel"
            value={commonProfile.phone}
            onChange={(event) => onUpdateCommonProfile("phone", event.target.value)}
            placeholder="핸드폰번호 (예: 010-1234-5678)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <input
            type="text"
            value={commonProfile.residentId}
            onChange={(event) => onUpdateCommonProfile("residentId", event.target.value)}
            placeholder="주민번호 (예: 900101-1234567)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <input
            type="text"
            value={commonProfile.address}
            onChange={(event) => onUpdateCommonProfile("address", event.target.value)}
            placeholder="주소"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <input
            type="email"
            value={commonProfile.email}
            onChange={(event) => onUpdateCommonProfile("email", event.target.value)}
            placeholder="이메일 (선택)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
        </div>
      </div>

      <div className="mb-5 rounded-3xl border border-brand-100 bg-white px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2">
          <Search size={17} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="문서 검색 (예: 퇴직, 전세, 위임장)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          {query.trim().length > 0 ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-slate-500"
              aria-label="검색어 지우기"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        {filteredDocuments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-6 text-center shadow-soft">
            <p className="text-sm font-semibold text-slate-700">검색 결과가 없습니다.</p>
            <p className="mt-1 text-xs text-slate-500">다른 단어로 검색하거나 전체 목록을 확인해주세요.</p>
          </div>
        ) : (
          pagedDocuments.map((item) => {
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
          })
        )}
      </div>

      {filteredDocuments.length > 0 && totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`h-9 min-w-9 rounded-xl border px-3 text-sm font-semibold transition ${
                pageNumber === currentPage
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
