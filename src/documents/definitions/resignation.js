export const resignationDocument = {
  id: "resignation",
  title: "사직서",
  subtitle: "노동",
  icon: "pen-line",
  pdfFilePrefix: "사직서",
  initialData: {
    employeeName: "",
    department: "",
    position: "",
    companyName: "",
    recipientName: "",
    resignationDate: "",
    resignationReason: "",
  },
  steps: [
    {
      id: "worker",
      question: "근로자 정보를 입력해주세요.",
      fields: [
        { key: "employeeName", label: "성명", placeholder: "홍길동", type: "text" },
        { key: "department", label: "부서", placeholder: "개발팀", type: "text" },
        { key: "position", label: "직책", placeholder: "대리", type: "text" },
      ],
    },
    {
      id: "receiver",
      question: "회사 및 수신 정보를 입력해주세요.",
      fields: [
        { key: "companyName", label: "회사명", placeholder: "주식회사 도카이", type: "text" },
        {
          key: "recipientName",
          label: "수신(대표/인사담당자)",
          placeholder: "대표이사 귀하",
          type: "text",
        },
      ],
    },
    {
      id: "date",
      question: "사직 희망일을 선택해주세요.",
      fields: [{ key: "resignationDate", label: "사직 희망일", placeholder: "", type: "date" }],
    },
    {
      id: "reason",
      question: "사직 사유를 입력해주세요.",
      helperText: "간결하게 핵심 사유를 적어주세요.",
      fields: [
        {
          key: "resignationReason",
          label: "사직 사유",
          placeholder: "개인 사정으로 인해 부득이하게 사직하고자 합니다.",
          type: "textarea",
          validation: {
            minLength: 6,
            message: "사직 사유는 6자 이상 작성해주세요.",
          },
        },
      ],
    },
  ],
  loadTemplate: () => import("../templates/ResignationTemplate"),
};
