# 새 문서 추가 가이드

이 프로젝트는 문서 100개 이상 확장을 전제로 설계되어 있습니다.  
새 문서 1개를 추가할 때는 아래 3단계만 수행하면 됩니다.

## 1) 문서 정의 파일 생성

`src/documents/definitions/<documentId>.js`

필수 항목:

- `id`
- `title`
- `subtitle`
- `icon`
- `pdfFilePrefix`
- `initialData`
- `steps`
- `loadTemplate`

예시:

```js
export const sampleDocument = {
  id: "sample-doc",
  title: "샘플 문서",
  subtitle: "카테고리",
  icon: "file-text",
  pdfFilePrefix: "샘플문서",
  initialData: {
    fieldA: "",
    fieldB: "",
  },
  steps: [
    {
      id: "step-1",
      question: "첫 질문",
      fields: [{ key: "fieldA", label: "항목A", type: "text", placeholder: "값 입력" }],
    },
    {
      id: "step-2",
      question: "둘째 질문",
      fields: [{ key: "fieldB", label: "항목B", type: "textarea", placeholder: "내용 입력" }],
    },
  ],
  loadTemplate: () => import("../templates/SampleTemplate"),
};
```

## 2) 템플릿 컴포넌트 생성

`src/documents/templates/SampleTemplate.jsx`

규칙:

- 루트 요소에 `id="pdf-document"` 포함 (PDF export 대상)
- props: `{ data, today }`

## 3) 레지스트리에 등록

`src/documents/registry.js`에 import 후 `DOCUMENTS` 배열에 추가:

```js
import { sampleDocument } from "./definitions/sample";

const DOCUMENTS = [jeonseReturnDocument, resumeDocument, resignationDocument, sampleDocument];
```

## 유효성 검증 팁

- 필드별 `validation` 사용 가능:
  - `pattern`
  - `minLength`
  - `maxLength`
  - `message`

검증 엔진 위치: `src/documents/validation/validateField.js`
