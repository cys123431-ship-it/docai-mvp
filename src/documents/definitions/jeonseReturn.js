import { documentQuestions } from "../../../data/documentQuestions";

const jeonseReturnQuestions = documentQuestions["jeonse-return"];

export const jeonseReturnDocument = {
  id: jeonseReturnQuestions.id,
  title: jeonseReturnQuestions.title,
  subtitle: jeonseReturnQuestions.subtitle,
  icon: jeonseReturnQuestions.icon,
  pdfFilePrefix: jeonseReturnQuestions.pdfFilePrefix,
  initialData: jeonseReturnQuestions.initialData,
  steps: jeonseReturnQuestions.steps,
  loadTemplate: () => import("../../components/templates/JeonseReturnNoticeTemplateA4"),
};
