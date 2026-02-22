export const resumeDocument = {
  id: "resume",
  title: "표준 이력서",
  subtitle: "취업",
  icon: "briefcase-business",
  pdfFilePrefix: "표준이력서",
  initialData: {
    fullName: "",
    phone: "",
    email: "",
    targetRole: "",
    careerYears: "",
    majorExperience: "",
    education: "",
    skills: "",
  },
  steps: [
    {
      id: "basic",
      question: "지원자의 기본 정보를 입력해주세요.",
      fields: [
        { key: "fullName", label: "이름", placeholder: "홍길동", type: "text" },
        {
          key: "phone",
          label: "연락처",
          placeholder: "010-0000-0000",
          type: "tel",
          validation: {
            pattern: "^[0-9\\-\\s]{8,20}$",
            message: "연락처 형식이 올바르지 않습니다.",
          },
        },
        {
          key: "email",
          label: "이메일",
          placeholder: "example@email.com",
          type: "email",
          validation: {
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            message: "이메일 형식이 올바르지 않습니다.",
          },
        },
      ],
    },
    {
      id: "career",
      question: "희망 직무와 경력 정보를 알려주세요.",
      fields: [
        {
          key: "targetRole",
          label: "희망 직무",
          placeholder: "프론트엔드 개발자",
          type: "text",
        },
        {
          key: "careerYears",
          label: "총 경력",
          placeholder: "3년",
          type: "text",
        },
      ],
    },
    {
      id: "projects",
      question: "핵심 경력/프로젝트를 작성해주세요.",
      helperText: "대표 경험 2~3개를 중심으로 작성하면 좋아요.",
      fields: [
        {
          key: "majorExperience",
          label: "주요 경력",
          placeholder:
            "예) React 기반 대시보드 구축, 사용자 전환율 20% 개선 / 전자결재 시스템 리뉴얼 등",
          type: "textarea",
          validation: {
            minLength: 10,
            message: "주요 경력은 10자 이상 작성해주세요.",
          },
        },
      ],
    },
    {
      id: "education",
      question: "최종 학력과 보유 기술을 입력해주세요.",
      fields: [
        {
          key: "education",
          label: "최종 학력",
          placeholder: "OO대학교 컴퓨터공학과 졸업",
          type: "text",
        },
        {
          key: "skills",
          label: "보유 기술",
          placeholder: "React, Next.js, TypeScript, Tailwind CSS",
          type: "textarea",
          validation: {
            minLength: 3,
          },
        },
      ],
    },
  ],
  loadTemplate: () => import("../templates/ResumeTemplate"),
};
