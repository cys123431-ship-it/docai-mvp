import { useState } from "react";
import Home from "./components/Home";
import DocumentWizard from "./components/DocumentWizard";
import DocumentPreview from "./components/DocumentPreview";
import { getDocumentById, getInitialDataForDocument } from "./documents/registry";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({});

  const handleStartDocument = (documentType) => {
    if (!getDocumentById(documentType)) {
      return;
    }

    setSelectedDoc(documentType);
    setFormData(getInitialDataForDocument(documentType));
    setScreen("wizard");
  };

  const handleCompleteWizard = (data) => {
    setFormData(data);
    setScreen("preview");
  };

  const handleRestart = () => {
    setSelectedDoc(null);
    setFormData({});
    setScreen("home");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#d8e9ff_0%,#f5f8fc_45%,#eff3f9_100%)] text-slate-900">
      {screen === "home" && <Home onStartDocument={handleStartDocument} />}

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
    </main>
  );
}
