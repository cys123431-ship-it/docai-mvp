export const jeonseReturnDocument = {
  id: "jeonse-return",
  title: "전세금 반환 내용증명",
  subtitle: "부동산/법률",
  icon: "file-text",
  pdfFilePrefix: "내용증명_전세보증금반환",
  initialData: {
    senderName: "",
    senderAddress: "",
    senderContact: "",
    receiverName: "",
    receiverAddress: "",
    receiverContact: "",
    depositAmount: "",
    contractEndDate: "",
  },
  steps: [
    {
      id: "sender",
      question: "발신인(본인)의 이름과 주소, 연락처를 입력해주세요.",
      fields: [
        { key: "senderName", label: "이름", placeholder: "홍길동", type: "text" },
        {
          key: "senderAddress",
          label: "주소",
          placeholder: "서울특별시 강남구 테헤란로 00",
          type: "text",
        },
        {
          key: "senderContact",
          label: "연락처",
          placeholder: "010-0000-0000",
          type: "tel",
          validation: {
            pattern: "^[0-9\\-\\s]{8,20}$",
            message: "연락처 형식이 올바르지 않습니다.",
          },
        },
      ],
    },
    {
      id: "receiver",
      question: "수신인(집주인)의 이름과 주소, 연락처를 입력해주세요.",
      fields: [
        { key: "receiverName", label: "이름", placeholder: "김집주", type: "text" },
        {
          key: "receiverAddress",
          label: "주소",
          placeholder: "서울특별시 서초구 서초대로 00",
          type: "text",
        },
        {
          key: "receiverContact",
          label: "연락처",
          placeholder: "010-1111-2222",
          type: "tel",
          validation: {
            pattern: "^[0-9\\-\\s]{8,20}$",
            message: "연락처 형식이 올바르지 않습니다.",
          },
        },
      ],
    },
    {
      id: "deposit",
      question: "돌려받아야 할 전세 보증금은 얼마인가요?",
      helperText: "예: 1억 5천만원",
      fields: [
        {
          key: "depositAmount",
          label: "보증금",
          placeholder: "1억 5천만원",
          type: "text",
          validation: {
            minLength: 2,
            maxLength: 30,
          },
        },
      ],
    },
    {
      id: "date",
      question: "원래 계약 만료일은 언제인가요?",
      helperText: "날짜를 선택해주세요.",
      fields: [{ key: "contractEndDate", label: "계약 만료일", placeholder: "", type: "date" }],
    },
  ],
  loadTemplate: () => import("../templates/JeonseReturnTemplate"),
};
