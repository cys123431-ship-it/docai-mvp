# DocAI MVP (Vite + React + Tailwind)

## 1) 설치

```bash
npm install
```

## 2) 개발 서버 실행

```bash
npm run dev
```

## 3) 빌드

```bash
npm run build
npm run preview
```

## 지원 문서

- 전세금 반환 내용증명
- 표준 이력서
- 사직서

## 확장 구조 (100개 문서 대비)

- 문서 정의: `src/documents/definitions/*.js`
- 문서 템플릿: `src/documents/templates/*.jsx`
- 문서 레지스트리: `src/documents/registry.js`
- 문서 추가 가이드: `docs/ADD_DOCUMENT.md`

## 폴더 구조

```text
.
|-- docs
|   `-- ADD_DOCUMENT.md
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- vite.config.js
`-- src
    |-- App.jsx
    |-- index.css
    |-- main.jsx
    `-- components
        |-- Home.jsx
        |-- DocumentWizard.jsx
        `-- DocumentPreview.jsx
    `-- documents
        |-- registry.js
        |-- definitions
        |   |-- jeonseReturn.js
        |   |-- resume.js
        |   `-- resignation.js
        |-- templates
        |   |-- JeonseReturnTemplate.jsx
        |   |-- ResumeTemplate.jsx
        |   `-- ResignationTemplate.jsx
        |-- validation
        |   `-- validateField.js
        `-- utils
            |-- date.js
            `-- initialData.js
```
