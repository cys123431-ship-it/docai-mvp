# 새 문서 추가 가이드

현재 구조에서 새 문서를 추가할 때는 아래 4단계를 따라야 합니다.

## 1) 질문 정의 추가

파일: `data/documentQuestions.ts`

`documentQuestions` 객체에 새 문서 ID를 키로 추가합니다.

필수 필드:

- `id`
- `title`
- `subtitle`
- `icon`
- `pdfFilePrefix`
- `initialData`
- `steps`

필드 검증 옵션:

- `validation.pattern`
- `validation.minLength`
- `validation.maxLength`
- `validation.message`

## 2) 템플릿 컴포넌트 생성

파일 위치: `src/components/templates/<TemplateName>.jsx`

규칙:

- 루트 요소에 `id="pdf-document"` 포함
- props 시그니처는 `{ data, today }`
- A4 출력 레이아웃 기준으로 작성

## 3) 레지스트리에 연결

파일: `src/documents/registry.js`

아래 3곳을 업데이트합니다.

- `DOCUMENT_ORDER`에 새 문서 ID 추가
- `TEMPLATE_LOADERS`에 새 템플릿 import 함수 추가
- 필요 시 `LEGAL_INFO_MAP`에 문구 버전 추가

예시:

```js
const DOCUMENT_ORDER = [..., "sample-doc"];

const TEMPLATE_LOADERS = {
  ...,
  "sample-doc": () => import("../components/templates/SampleTemplateA4"),
};

const LEGAL_INFO_MAP = {
  ...,
  "sample-doc": { version: "v2026.02-SAMPLE", updatedAt: "2026-02-27" },
};
```

## 4) 선택적 연동(권장)

- 공통 프로필 자동 채움 연동: `src/documents/utils/commonProfile.js`의 `COMMON_PROFILE_FIELD_MAP`
- 검색 별칭 강화: `src/components/Home.jsx`의 `DOCUMENT_ALIAS_MAP`

## 최종 체크리스트

- `npm run build`가 통과하는가
- 홈 목록/검색에서 새 문서가 보이는가
- 질문 완료 후 미리보기/다운로드가 되는가
- 날짜/전화번호/금액 포맷팅이 의도대로 동작하는가
