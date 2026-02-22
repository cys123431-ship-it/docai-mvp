import { documentQuestions } from "../../../data/documentQuestions";

const resumeQuestions = documentQuestions.resume;

export const resumeDocument = {
  id: resumeQuestions.id,
  title: resumeQuestions.title,
  subtitle: resumeQuestions.subtitle,
  icon: resumeQuestions.icon,
  pdfFilePrefix: resumeQuestions.pdfFilePrefix,
  initialData: resumeQuestions.initialData,
  steps: resumeQuestions.steps,
  loadTemplate: () => import("../../components/templates/ResumeTemplateA4"),
};
