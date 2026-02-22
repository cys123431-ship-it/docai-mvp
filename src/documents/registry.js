import { jeonseReturnDocument } from "./definitions/jeonseReturn";
import { resignationDocument } from "./definitions/resignation";
import { resumeDocument } from "./definitions/resume";
import { buildInitialDataFromDefinition } from "./utils/initialData";

const DOCUMENTS = [jeonseReturnDocument, resumeDocument, resignationDocument];

const DOCUMENT_MAP = Object.fromEntries(DOCUMENTS.map((document) => [document.id, document]));

export const DOCUMENT_LIST = DOCUMENTS;

export const getDocumentById = (documentType) => DOCUMENT_MAP[documentType] ?? null;

export const getInitialDataForDocument = (documentType) => {
  const definition = getDocumentById(documentType);
  return buildInitialDataFromDefinition(definition);
};
