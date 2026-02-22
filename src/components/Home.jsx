import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronRight,
  Eye,
  EyeOff,
  FileText,
  PenLine,
  Search,
  Star,
  X,
} from "lucide-react";
import { DOCUMENT_LIST } from "../documents/registry";
import { formatPhoneNumber, formatResidentId } from "../documents/utils/formatters";

const ICON_MAP = {
  "file-text": FileText,
  "briefcase-business": BriefcaseBusiness,
  "pen-line": PenLine,
};

const ITEMS_PER_PAGE = 5;

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
const tokenize = (value) =>
  value
    .split(/\s+/)
    .map((token) => normalizeText(token))
    .filter(Boolean);

const levenshteinDistance = (source, target) => {
  const rows = source.length + 1;
  const cols = target.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) {
    dp[row][0] = row;
  }
  for (let col = 0; col < cols; col += 1) {
    dp[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = source[row - 1] === target[col - 1] ? 0 : 1;
      dp[row][col] = Math.min(dp[row - 1][col] + 1, dp[row][col - 1] + 1, dp[row - 1][col - 1] + cost);
    }
  }

  return dp[source.length][target.length];
};

const matchTokenWithWords = (token, words) => {
  if (!token) {
    return true;
  }

  if (words.some((word) => word.includes(token))) {
    return true;
  }

  const threshold = token.length <= 4 ? 1 : 2;
  return words.some((word) => {
    if (Math.abs(word.length - token.length) > threshold) {
      return false;
    }
    return levenshteinDistance(token, word) <= threshold;
  });
};

const matchesDocument = (document, tokens) => {
  if (tokens.length === 0) {
    return true;
  }

  const aliases = DOCUMENT_ALIAS_MAP[document.id] ?? [];
  const keywords = document.searchKeywords ?? [];
  const searchableRaw = [document.title, document.subtitle, document.id, ...keywords, ...aliases].join(" ");
  const searchableWords = searchableRaw
    .split(/[\s,/()]+/)
    .map((word) => normalizeText(word))
    .filter(Boolean);

  return tokens.every((token) => matchTokenWithWords(token, searchableWords));
};

const getMetricRate = (numerator, denominator) => {
  if (!denominator) {
    return "0%";
  }
  return `${Math.round((numerator / denominator) * 100)}%`;
};

export default function Home({
  onStartDocument,
  commonProfileState,
  onSelectCommonProfile,
  onUpdateCommonProfile,
  onResetCommonProfiles,
  onTogglePersistSensitive,
  onClearLocalData,
  documentPreferences,
  onToggleFavoriteDocument,
  usageMetrics,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [mode, setMode] = useState("all");
  const [page, setPage] = useState(1);
  const [showResidentId, setShowResidentId] = useState(false);

  const favoritesSet = useMemo(() => new Set(documentPreferences?.favorites ?? []), [documentPreferences]);
  const recents = documentPreferences?.recents ?? [];
  const recentIndexMap = useMemo(
    () => new Map(recents.map((documentId, index) => [documentId, index])),
    [recents],
  );

  const categories = useMemo(() => {
    const unique = Array.from(new Set(DOCUMENT_LIST.map((document) => document.subtitle)));
    return ["전체", ...unique];
  }, []);

  const activeProfile = useMemo(() => {
    const active = commonProfileState?.profiles?.find(
      (profile) => profile.id === commonProfileState.activeProfileId,
    );
    return active ?? commonProfileState?.profiles?.[0];
  }, [commonProfileState]);

  const filteredDocuments = useMemo(() => {
    const tokens = tokenize(query);

    return DOCUMENT_LIST.filter((document) => {
      if (category !== "전체" && document.subtitle !== category) {
        return false;
      }

      if (mode === "favorites" && !favoritesSet.has(document.id)) {
        return false;
      }

      if (mode === "recent" && !recentIndexMap.has(document.id)) {
        return false;
      }

      return matchesDocument(document, tokens);
    }).sort((a, b) => {
      if (mode === "recent") {
        return (recentIndexMap.get(a.id) ?? 999) - (recentIndexMap.get(b.id) ?? 999);
      }

      const favoriteDiff = Number(favoritesSet.has(b.id)) - Number(favoritesSet.has(a.id));
      if (favoriteDiff !== 0) {
        return favoriteDiff;
      }

      const recentDiff = (recentIndexMap.get(a.id) ?? 999) - (recentIndexMap.get(b.id) ?? 999);
      if (recentDiff !== 0) {
        return recentDiff;
      }

      return a.title.localeCompare(b.title);
    });
  }, [category, favoritesSet, mode, query, recentIndexMap]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pagedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredDocuments]);

  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  const topDocuments = useMemo(() => {
    const byDocument = usageMetrics?.byDocument ?? {};
    const titleMap = Object.fromEntries(DOCUMENT_LIST.map((document) => [document.id, document.title]));

    return Object.entries(byDocument)
      .sort(([, a], [, b]) => (b.starts ?? 0) - (a.starts ?? 0))
      .slice(0, 3)
      .map(([documentId, metric]) => ({
        documentId,
        title: titleMap[documentId] ?? documentId,
        starts: metric.starts ?? 0,
      }));
  }, [usageMetrics]);

  useEffect(() => {
    setPage(1);
  }, [category, mode, query]);

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
            <p className="text-sm font-semibold text-slate-900">공통 정보 프리셋</p>
            <p className="mt-1 text-xs text-slate-500">문서별 입력을 최소화하기 위한 기본 정보입니다.</p>
          </div>
          <button
            type="button"
            onClick={onResetCommonProfiles}
            className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500"
          >
            프리셋 초기화
          </button>
        </div>

        <div className="mb-3 flex gap-2">
          {(commonProfileState?.profiles ?? []).map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => onSelectCommonProfile(profile.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                profile.id === commonProfileState.activeProfileId
                  ? "bg-brand-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {profile.label}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          <input
            type="text"
            value={activeProfile?.data?.name ?? ""}
            onChange={(event) => onUpdateCommonProfile("name", event.target.value)}
            placeholder="이름"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <input
            type="tel"
            value={activeProfile?.data?.phone ?? ""}
            onChange={(event) => onUpdateCommonProfile("phone", formatPhoneNumber(event.target.value))}
            placeholder="핸드폰번호 (예: 010-1234-5678)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <div className="flex gap-2">
            <input
              type={showResidentId ? "text" : "password"}
              value={activeProfile?.data?.residentId ?? ""}
              onChange={(event) => onUpdateCommonProfile("residentId", formatResidentId(event.target.value))}
              placeholder="주민번호 (예: 900101-1234567)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowResidentId((prev) => !prev)}
              className="grid h-[42px] w-[42px] place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500"
              aria-label="주민번호 표시 전환"
            >
              {showResidentId ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <input
            type="text"
            value={activeProfile?.data?.address ?? ""}
            onChange={(event) => onUpdateCommonProfile("address", event.target.value)}
            placeholder="주소"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
          <input
            type="email"
            value={activeProfile?.data?.email ?? ""}
            onChange={(event) => onUpdateCommonProfile("email", event.target.value)}
            placeholder="이메일 (선택)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white"
          />
        </div>

        <div className="mt-3 space-y-2">
          <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
            <span>민감정보(주민번호) 로컬 저장</span>
            <input
              type="checkbox"
              checked={Boolean(commonProfileState?.persistSensitive)}
              onChange={(event) => onTogglePersistSensitive(event.target.checked)}
            />
          </label>
          <button
            type="button"
            onClick={onClearLocalData}
            className="w-full rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
          >
            로컬 데이터 전체 삭제
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-3xl border border-brand-100 bg-white p-4 shadow-soft">
        <p className="text-sm font-semibold text-slate-900">운영 지표 (로컬)</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-slate-50 p-2">
            <p className="text-[11px] text-slate-500">시작</p>
            <p className="text-sm font-bold text-slate-800">{usageMetrics?.totals?.starts ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-2">
            <p className="text-[11px] text-slate-500">완료</p>
            <p className="text-sm font-bold text-slate-800">{usageMetrics?.totals?.completes ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-2">
            <p className="text-[11px] text-slate-500">다운로드</p>
            <p className="text-sm font-bold text-slate-800">{usageMetrics?.totals?.downloads ?? 0}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <span>완료율 {getMetricRate(usageMetrics?.totals?.completes ?? 0, usageMetrics?.totals?.starts ?? 0)}</span>
          <span>·</span>
          <span>
            다운로드율 {getMetricRate(usageMetrics?.totals?.downloads ?? 0, usageMetrics?.totals?.completes ?? 0)}
          </span>
        </div>
        {topDocuments.length > 0 ? (
          <div className="mt-2 rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
            {topDocuments.map((item) => (
              <p key={item.documentId}>
                {item.title}: 시작 {item.starts}회
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mb-4 rounded-3xl border border-brand-100 bg-white px-4 py-3 shadow-soft">
        <div className="flex items-center gap-2">
          <Search size={17} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="문서 검색 (오타/유사어 포함)"
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

      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "favorites", "recent"].map((modeOption) => (
          <button
            key={modeOption}
            type="button"
            onClick={() => setMode(modeOption)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              mode === modeOption ? "bg-brand-500 text-white" : "bg-white text-slate-600"
            }`}
          >
            {modeOption === "all" ? "전체" : modeOption === "favorites" ? "즐겨찾기" : "최근 사용"}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              category === item ? "bg-slate-800 text-white" : "bg-white text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredDocuments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-6 text-center shadow-soft">
            <p className="text-sm font-semibold text-slate-700">검색 결과가 없습니다.</p>
            <p className="mt-1 text-xs text-slate-500">다른 키워드 또는 카테고리로 다시 시도해주세요.</p>
          </div>
        ) : (
          pagedDocuments.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? FileText;
            const isFavorite = favoritesSet.has(item.id);

            return (
              <div
                key={item.id}
                className="w-full rounded-3xl border border-brand-100 bg-white px-4 py-4 text-left shadow-soft transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onStartDocument(item.id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-500">
                      <Icon size={22} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[17px] font-semibold tracking-[-0.02em]">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavoriteDocument(item.id);
                    }}
                    className={`mr-1 rounded-full p-1 ${isFavorite ? "text-amber-400" : "text-slate-400"}`}
                    aria-label="즐겨찾기 토글"
                  >
                    <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
                  </button>

                  <button type="button" onClick={() => onStartDocument(item.id)} className="text-slate-500">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
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
