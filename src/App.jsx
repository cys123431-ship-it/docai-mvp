import { useEffect, useMemo, useState } from "react";
import Home from "./components/Home";
import DocumentWizard from "./components/DocumentWizard";
import DocumentPreview from "./components/DocumentPreview";
import { getDocumentById, getInitialDataForDocument } from "./documents/registry";
import {
  applyCommonProfileToDocumentData,
  createEmptyCommonProfile,
  hasCommonProfileData,
  hasCommonProfileMapping,
  loadCommonProfileFromStorage,
  saveCommonProfileToStorage,
} from "./documents/utils/commonProfile";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [pendingDoc, setPendingDoc] = useState(null);
  const [formData, setFormData] = useState({});
  const [commonProfile, setCommonProfile] = useState(() => loadCommonProfileFromStorage());

  useEffect(() => {
    saveCommonProfileToStorage(commonProfile);
  }, [commonProfile]);

  const pendingDocTitle = useMemo(() => {
    if (!pendingDoc) {
      return "";
    }
    return getDocumentById(pendingDoc)?.title ?? "선택 문서";
  }, [pendingDoc]);

  const startDocument = (documentType, useCommonProfile = false) => {
    if (!getDocumentById(documentType)) {
      return;
    }

    const initialData = getInitialDataForDocument(documentType);
    const nextData = useCommonProfile
      ? applyCommonProfileToDocumentData(documentType, initialData, commonProfile)
      : initialData;

    setSelectedDoc(documentType);
    setFormData(nextData);
    setPendingDoc(null);
    setScreen("wizard");
  };

  const handleStartDocument = (documentType) => {
    if (!getDocumentById(documentType)) {
      return;
    }

    if (hasCommonProfileData(commonProfile) && hasCommonProfileMapping(documentType)) {
      setPendingDoc(documentType);
      return;
    }

    startDocument(documentType, false);
  };

  const handleCompleteWizard = (data) => {
    setFormData(data);
    setScreen("preview");
  };

  const handleRestart = () => {
    setPendingDoc(null);
    setSelectedDoc(null);
    setFormData({});
    setScreen("home");
  };

  const updateCommonProfile = (key, value) => {
    setCommonProfile((prev) => ({ ...prev, [key]: value }));
  };

  const resetCommonProfile = () => {
    setCommonProfile(createEmptyCommonProfile());
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#d8e9ff_0%,#f5f8fc_45%,#eff3f9_100%)] text-slate-900">
      {screen === "home" && (
        <Home
          onStartDocument={handleStartDocument}
          commonProfile={commonProfile}
          onUpdateCommonProfile={updateCommonProfile}
          onResetCommonProfile={resetCommonProfile}
        />
      )}

      {screen === "wizard" && selectedDoc && (
        <DocumentWizard
          documentType={selectedDoc}
          initialData={formData}
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
        />
      )}

      {pendingDoc ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-brand-700">공통 정보 자동 반영</p>
            <p className="mt-2 text-base font-semibold text-slate-900">{pendingDocTitle}</p>
            <p className="mt-2 text-sm text-slate-600">
              저장된 공통 정보(이름/연락처/주소 등)를 이 문서에 반영하시겠습니까?
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => startDocument(pendingDoc, false)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
              >
                반영 안 함
              </button>
              <button
                type="button"
                onClick={() => startDocument(pendingDoc, true)}
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

