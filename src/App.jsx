import { useEffect, useMemo, useState } from "react";
import Home from "./components/Home";
import DocumentWizard from "./components/DocumentWizard";
import DocumentPreview from "./components/DocumentPreview";
import { getDocumentById, getInitialDataForDocument } from "./documents/registry";
import {
  applyCommonProfileToDocumentData,
  createDefaultCommonProfileState,
  getActiveCommonProfile,
  hasCommonProfileData,
  hasCommonProfileMapping,
  loadCommonProfileStateFromStorage,
  resetCommonProfiles,
  saveCommonProfileStateToStorage,
  updateCommonProfileData,
  clearCommonProfileStateStorage,
} from "./documents/utils/commonProfile";
import {
  clearAllDocumentDrafts,
  clearDocumentDraft,
  loadDocumentDraft,
} from "./documents/utils/drafts";
import {
  clearDocumentPreferences,
  loadDocumentPreferences,
  pushRecentDocument,
  saveDocumentPreferences,
  toggleFavoriteDocument,
} from "./documents/utils/documentPreferences";
import {
  clearUsageMetrics,
  createEmptyUsageMetrics,
  loadUsageMetrics,
  recordUsageMetric,
  saveUsageMetrics,
} from "./documents/utils/usageMetrics";

const hasAnyValue = (formData) =>
  Object.values(formData ?? {}).some((value) => typeof value === "string" && value.trim().length > 0);

const formatDateTime = (timestamp) =>
  new Date(timestamp).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({});
  const [initialWizardStep, setInitialWizardStep] = useState(0);
  const [pendingCommonApply, setPendingCommonApply] = useState(null);
  const [pendingDraft, setPendingDraft] = useState(null);
  const [commonProfileState, setCommonProfileState] = useState(() => loadCommonProfileStateFromStorage());
  const [documentPreferences, setDocumentPreferences] = useState(() => loadDocumentPreferences());
  const [usageMetrics, setUsageMetrics] = useState(() => loadUsageMetrics());

  const activeProfile = useMemo(() => getActiveCommonProfile(commonProfileState), [commonProfileState]);

  useEffect(() => {
    saveCommonProfileStateToStorage(commonProfileState);
  }, [commonProfileState]);

  useEffect(() => {
    saveDocumentPreferences(documentPreferences);
  }, [documentPreferences]);

  useEffect(() => {
    saveUsageMetrics(usageMetrics);
  }, [usageMetrics]);

  const trackMetric = (metricType, documentType) => {
    setUsageMetrics((prev) => recordUsageMetric(prev, metricType, documentType));
  };

  const rememberRecentDocument = (documentType) => {
    setDocumentPreferences((prev) => pushRecentDocument(prev, documentType));
  };

  const startDocument = (documentType, options = {}) => {
    const definition = getDocumentById(documentType);
    if (!definition) {
      return;
    }

    const baseData = options.baseData ?? getInitialDataForDocument(documentType);
    const withCommonProfile = options.useCommonProfile
      ? applyCommonProfileToDocumentData(documentType, baseData, activeProfile?.data ?? {})
      : baseData;

    setSelectedDoc(documentType);
    setFormData(withCommonProfile);
    const safeInitialStep = Math.min(
      Math.max(options.initialStep ?? 0, 0),
      Math.max((definition.steps?.length ?? 1) - 1, 0),
    );
    setInitialWizardStep(safeInitialStep);
    setPendingCommonApply(null);
    setPendingDraft(null);
    setScreen("wizard");

    rememberRecentDocument(documentType);
    trackMetric("starts", documentType);
  };

  const maybeOpenCommonApplyPrompt = (documentType, baseData, stepIndex = 0) => {
    if (hasCommonProfileData(activeProfile?.data ?? {}) && hasCommonProfileMapping(documentType)) {
      setPendingCommonApply({
        documentType,
        baseData,
        stepIndex,
      });
      return;
    }

    startDocument(documentType, {
      baseData,
      initialStep: stepIndex,
      useCommonProfile: false,
    });
  };

  const handleStartDocument = (documentType) => {
    if (!getDocumentById(documentType)) {
      return;
    }

    const draft = loadDocumentDraft(documentType);
    if (draft && hasAnyValue(draft.formData)) {
      setPendingDraft({ documentType, draft });
      return;
    }

    maybeOpenCommonApplyPrompt(documentType, null, 0);
  };

  const handleCompleteWizard = (data) => {
    setFormData(data);
    setScreen("preview");
    if (selectedDoc) {
      clearDocumentDraft(selectedDoc);
      trackMetric("completes", selectedDoc);
    }
  };

  const handleRestart = () => {
    setPendingDraft(null);
    setPendingCommonApply(null);
    setSelectedDoc(null);
    setInitialWizardStep(0);
    setFormData({});
    setScreen("home");
  };

  const handleSelectCommonProfile = (profileId) => {
    setCommonProfileState((prev) => ({ ...prev, activeProfileId: profileId }));
  };

  const handleUpdateCommonProfile = (key, value) => {
    const activeProfileId = activeProfile?.id;
    if (!activeProfileId) {
      return;
    }

    setCommonProfileState((prev) =>
      updateCommonProfileData(prev, activeProfileId, (profileData) => ({
        ...profileData,
        [key]: value,
      })),
    );
  };

  const handleResetCommonProfiles = () => {
    setCommonProfileState(resetCommonProfiles());
  };

  const handleTogglePersistSensitive = (checked) => {
    setCommonProfileState((prev) => ({ ...prev, persistSensitive: checked }));
  };

  const handleClearLocalData = () => {
    const confirmed = window.confirm("저장된 초안/프로필/즐겨찾기/지표를 모두 삭제할까요?");
    if (!confirmed) {
      return;
    }

    clearCommonProfileStateStorage();
    clearAllDocumentDrafts();
    clearDocumentPreferences();
    clearUsageMetrics();

    setCommonProfileState(createDefaultCommonProfileState());
    setDocumentPreferences(loadDocumentPreferences());
    setUsageMetrics(createEmptyUsageMetrics());
    setPendingDraft(null);
    setPendingCommonApply(null);
  };

  const handleToggleFavoriteDocument = (documentType) => {
    setDocumentPreferences((prev) => toggleFavoriteDocument(prev, documentType));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#d8e9ff_0%,#f5f8fc_45%,#eff3f9_100%)] text-slate-900">
      {screen === "home" && (
        <Home
          onStartDocument={handleStartDocument}
          commonProfileState={commonProfileState}
          onSelectCommonProfile={handleSelectCommonProfile}
          onUpdateCommonProfile={handleUpdateCommonProfile}
          onResetCommonProfiles={handleResetCommonProfiles}
          onTogglePersistSensitive={handleTogglePersistSensitive}
          onClearLocalData={handleClearLocalData}
          documentPreferences={documentPreferences}
          onToggleFavoriteDocument={handleToggleFavoriteDocument}
          usageMetrics={usageMetrics}
        />
      )}

      {screen === "wizard" && selectedDoc && (
        <DocumentWizard
          documentType={selectedDoc}
          initialData={formData}
          initialStep={initialWizardStep}
          onBack={handleRestart}
          onComplete={handleCompleteWizard}
        />
      )}

      {screen === "preview" && selectedDoc && (
        <DocumentPreview
          documentType={selectedDoc}
          data={formData}
          onEdit={() => setScreen("wizard")}
          onHome={handleRestart}
          onDownload={() => trackMetric("downloads", selectedDoc)}
        />
      )}

      {pendingDraft ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-brand-700">초안 복원</p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              이전 작성 내용이 있습니다. 이어서 작성할까요?
            </p>
            <p className="mt-2 text-xs text-slate-500">
              마지막 저장: {formatDateTime(pendingDraft.draft.updatedAt)}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  clearDocumentDraft(pendingDraft.documentType);
                  const documentType = pendingDraft.documentType;
                  setPendingDraft(null);
                  maybeOpenCommonApplyPrompt(documentType, null, 0);
                }}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
              >
                새로 작성
              </button>
              <button
                type="button"
                onClick={() => {
                  maybeOpenCommonApplyPrompt(
                    pendingDraft.documentType,
                    pendingDraft.draft.formData,
                    pendingDraft.draft.stepIndex,
                  );
                }}
                className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
              >
                초안 불러오기
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {pendingCommonApply ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-brand-700">공통 정보 자동 반영</p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              현재 프로필({activeProfile?.label ?? "기본"}) 정보를 문서에 반영할까요?
            </p>
            <p className="mt-2 text-sm text-slate-600">빈 입력칸에만 자동으로 채워집니다.</p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  startDocument(pendingCommonApply.documentType, {
                    baseData: pendingCommonApply.baseData,
                    initialStep: pendingCommonApply.stepIndex,
                    useCommonProfile: false,
                  })
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
              >
                반영 안 함
              </button>
              <button
                type="button"
                onClick={() =>
                  startDocument(pendingCommonApply.documentType, {
                    baseData: pendingCommonApply.baseData,
                    initialStep: pendingCommonApply.stepIndex,
                    useCommonProfile: true,
                  })
                }
                className="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
              >
                반영하고 시작
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
