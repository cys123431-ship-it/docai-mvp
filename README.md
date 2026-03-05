# DocAI MVP

질문형 입력만으로 문서를 작성하고 PDF로 내려받는 React 기반 MVP입니다.

## 주요 기능

- 20종 문서 템플릿(노무/계약/금전/부동산/법률/민원)
- 단계형 질문 입력 + 필드 단위 유효성 검증
- 문서별 초안 자동 저장/복원
- 공통 프로필(개인용/업무용) 자동 반영
- 즐겨찾기/최근 사용/검색(유사어 포함)
- PDF 생성 및 다운로드

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run build
npm run preview
```

## 기술 스택

- Vite
- React 18
- Tailwind CSS
- html2pdf.js
- lucide-react

## 프로젝트 구조

```text
.
|-- data
|   `-- documentQuestions.ts
|-- docs
|   `-- ADD_DOCUMENT.md
|-- src
|   |-- App.jsx
|   |-- components
|   |   |-- Home.jsx
|   |   |-- DocumentWizard.jsx
|   |   |-- DocumentPreview.jsx
|   |   `-- templates/*.jsx
|   `-- documents
|       |-- registry.js
|       |-- validation/validateField.js
|       `-- utils/*.js
|-- package.json
`-- vite.config.js
```

## 문서 확장 가이드

새 문서 추가 절차는 [docs/ADD_DOCUMENT.md](docs/ADD_DOCUMENT.md)에서 확인할 수 있습니다.

## GitHub Actions 자동 배포 (Vercel)

`main` 브랜치에 푸시하면 Vercel 프로덕션에 자동 배포되도록 워크플로가 포함되어 있습니다.

워크플로 파일:
- `.github/workflows/deploy-vercel-production.yml`

GitHub 저장소 시크릿 3개를 반드시 등록해야 동작합니다.
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

시크릿 등록 위치:
- GitHub Repository > `Settings` > `Secrets and variables` > `Actions` > `New repository secret`

Vercel 값 확인 방법:
- `VERCEL_TOKEN`: Vercel 계정 `Settings > Tokens`에서 생성
- `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`: Vercel 프로젝트 `Settings > General` 또는 `vercel pull` 실행 후 `.vercel/project.json`에서 확인
