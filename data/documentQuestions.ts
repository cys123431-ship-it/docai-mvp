export type QuestionFieldType = "text" | "tel" | "email" | "date" | "textarea";

export interface QuestionField {
  key: string;
  label: string;
  placeholder: string;
  type: QuestionFieldType;
  required?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

export interface QuestionStep {
  id: string;
  question: string;
  helperText?: string;
  fields: QuestionField[];
}

export interface DocumentQuestionConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  pdfFilePrefix: string;
  searchKeywords?: string[];
  initialData: Record<string, string>;
  steps: QuestionStep[];
}

export const documentQuestions: Record<string, DocumentQuestionConfig> = {
  resume: {
    id: "resume",
    title: "표준 이력서",
    subtitle: "취업",
    icon: "briefcase-business",
    pdfFilePrefix: "표준이력서",
    initialData: {
      fullName: "",
      targetRole: "",
      phone: "",
      email: "",
      majorExperience: "",
      education: "",
      skills: "",
    },
    steps: [
      {
        id: "profile",
        question: "기본 인적사항을 입력해주세요.",
        helperText: "이름, 지원 직무, 연락처만 입력하면 상단 인적사항 표가 자동 완성됩니다.",
        fields: [
          { key: "fullName", label: "성명", placeholder: "홍길동", type: "text" },
          {
            key: "targetRole",
            label: "지원 직무",
            placeholder: "예: 프론트엔드 개발자",
            type: "text",
          },
          {
            key: "phone",
            label: "연락처",
            placeholder: "010-1234-5678",
            type: "tel",
            validation: {
              pattern: "^[0-9\\-\\s]{8,20}$",
              message: "연락처 형식이 올바르지 않습니다.",
            },
          },
          {
            key: "email",
            label: "이메일",
            placeholder: "me@example.com",
            type: "email",
            validation: {
              pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
              message: "이메일 형식이 올바르지 않습니다.",
            },
          },
        ],
      },
      {
        id: "career-summary",
        question: "핵심 경력을 2~3문장으로 적어주세요.",
        helperText: "작성한 내용을 기반으로 경력 요약/성과 문구를 문서 양식에 자동 배치합니다.",
        fields: [
          {
            key: "majorExperience",
            label: "핵심 경력",
            placeholder:
              "예: React 기반 B2B 대시보드를 구축했고, 사용자 이탈률을 20% 낮췄습니다.",
            type: "textarea",
            validation: {
              minLength: 12,
              message: "핵심 경력은 12자 이상 입력해주세요.",
            },
          },
        ],
      },
      {
        id: "education",
        question: "학력/자격 정보를 한 줄로 입력해주세요.",
        helperText: "최종 학력과 자격증이 있으면 함께 적어주세요.",
        fields: [
          {
            key: "education",
            label: "학력/자격",
            placeholder: "예: OO대학교 컴퓨터공학과 졸업 / 정보처리기사",
            type: "text",
            validation: {
              minLength: 6,
              message: "학력/자격 정보를 6자 이상 입력해주세요.",
            },
          },
        ],
      },
      {
        id: "strengths",
        question: "업무 강점을 키워드로 입력해주세요.",
        helperText: "쉼표로 3~6개 입력하면 핵심역량 표로 자동 정리됩니다.",
        fields: [
          {
            key: "skills",
            label: "핵심 역량",
            placeholder: "예: 문제해결, 커뮤니케이션, React, TypeScript",
            type: "textarea",
            validation: {
              minLength: 5,
              message: "핵심 역량을 5자 이상 입력해주세요.",
            },
          },
        ],
      },
    ],
  },
  "jeonse-return": {
    id: "jeonse-return",
    title: "전세금 반환 내용증명",
    subtitle: "부동산/법률",
    icon: "file-text",
    pdfFilePrefix: "내용증명_전세금반환",
    initialData: {
      senderName: "",
      senderContact: "",
      senderAddress: "",
      receiverName: "",
      receiverAddress: "",
      receiverContact: "",
      propertyAddress: "",
      contractEndDate: "",
      depositAmount: "",
      paymentDeadlineDays: "7",
    },
    steps: [
      {
        id: "sender",
        question: "발신인(임차인) 정보를 입력해주세요.",
        helperText: "내용증명 발송인의 실명/주소/연락처가 문서 본문과 서명란에 반영됩니다.",
        fields: [
          { key: "senderName", label: "성명", placeholder: "홍길동", type: "text" },
          {
            key: "senderContact",
            label: "연락처",
            placeholder: "010-1234-5678",
            type: "tel",
            validation: {
              pattern: "^[0-9\\-\\s]{8,20}$",
              message: "연락처 형식이 올바르지 않습니다.",
            },
          },
          {
            key: "senderAddress",
            label: "주소",
            placeholder: "서울시 강남구 테헤란로 00, 000동 000호",
            type: "text",
          },
        ],
      },
      {
        id: "receiver",
        question: "수신인(임대인) 정보를 입력해주세요.",
        fields: [
          { key: "receiverName", label: "성명", placeholder: "김임대", type: "text" },
          {
            key: "receiverAddress",
            label: "주소",
            placeholder: "서울시 서초구 서초대로 00",
            type: "text",
          },
          {
            key: "receiverContact",
            label: "연락처(선택)",
            placeholder: "010-9876-5432",
            type: "tel",
            required: false,
            validation: {
              pattern: "^[0-9\\-\\s]{8,20}$",
              message: "연락처 형식이 올바르지 않습니다.",
            },
          },
        ],
      },
      {
        id: "contract",
        question: "임대차 계약 핵심 정보만 알려주세요.",
        helperText: "보증금/계약 종료일/임차주택 주소를 입력하면 법률 문구가 자동 생성됩니다.",
        fields: [
          {
            key: "propertyAddress",
            label: "임차주택 주소",
            placeholder: "서울시 마포구 월드컵북로 00, 000동 000호",
            type: "text",
          },
          {
            key: "contractEndDate",
            label: "계약 종료일",
            placeholder: "",
            type: "date",
          },
          {
            key: "depositAmount",
            label: "반환 요구 보증금",
            placeholder: "예: 2억 5천만원",
            type: "text",
            validation: {
              minLength: 2,
              maxLength: 30,
            },
          },
        ],
      },
      {
        id: "deadline",
        question: "서면 수령 후 몇 일 내 반환을 요구할까요?",
        helperText: "기본값은 7일입니다. 숫자만 입력해주세요.",
        fields: [
          {
            key: "paymentDeadlineDays",
            label: "지급 기한(일)",
            placeholder: "7",
            type: "text",
            validation: {
              pattern: "^[1-9][0-9]?$",
              message: "1~99 사이 숫자를 입력해주세요.",
            },
          },
        ],
      },
    ],
  },
  "standard-labor-contract": {
    id: "standard-labor-contract",
    title: "표준 근로계약서",
    subtitle: "노무",
    icon: "briefcase-business",
    pdfFilePrefix: "표준근로계약서",
    initialData: {
      employerName: "",
      employerAddress: "",
      employeeName: "",
      employeeAddress: "",
      contractType: "기간의 정함 없음",
      startDate: "",
      endDate: "",
      workplace: "",
      jobDescription: "",
      workDays: "월~금",
      workHours: "09:00~18:00",
      wageAmount: "",
      payDay: "10",
      weeklyHoliday: "일요일",
      contractDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "회사와 근로자 기본 정보만 입력해주세요.",
        fields: [
          { key: "employerName", label: "사용자(회사명)", placeholder: "주식회사 도카이", type: "text" },
          {
            key: "employerAddress",
            label: "사용자 주소",
            placeholder: "서울시 강남구 테헤란로 00",
            type: "text",
          },
          { key: "employeeName", label: "근로자 성명", placeholder: "홍길동", type: "text" },
          {
            key: "employeeAddress",
            label: "근로자 주소",
            placeholder: "서울시 마포구 월드컵북로 00",
            type: "text",
          },
        ],
      },
      {
        id: "job",
        question: "근로형태와 업무 정보를 알려주세요.",
        fields: [
          {
            key: "contractType",
            label: "계약 형태",
            placeholder: "예: 기간의 정함 없음 / 기간제",
            type: "text",
          },
          { key: "startDate", label: "근로 시작일", placeholder: "", type: "date" },
          {
            key: "endDate",
            label: "근로 종료일(선택)",
            placeholder: "",
            type: "date",
            required: false,
          },
          {
            key: "workplace",
            label: "근로장소",
            placeholder: "서울시 강남구 테헤란로 00",
            type: "text",
          },
          {
            key: "jobDescription",
            label: "담당업무",
            placeholder: "예: 웹 서비스 프론트엔드 개발 및 유지보수",
            type: "textarea",
            validation: {
              minLength: 8,
              message: "담당업무를 8자 이상 입력해주세요.",
            },
          },
        ],
      },
      {
        id: "conditions",
        question: "근로시간과 임금 정보만 입력하면 됩니다.",
        fields: [
          { key: "workDays", label: "근무일", placeholder: "예: 월~금", type: "text" },
          {
            key: "workHours",
            label: "근무시간",
            placeholder: "예: 09:00~18:00 (휴게 1시간)",
            type: "text",
          },
          {
            key: "wageAmount",
            label: "임금",
            placeholder: "예: 월 3,000,000원",
            type: "text",
            validation: { minLength: 2 },
          },
          {
            key: "payDay",
            label: "임금 지급일",
            placeholder: "예: 10",
            type: "text",
            validation: {
              pattern: "^[1-9]$|^[12][0-9]$|^3[01]$",
              message: "1~31 사이 숫자를 입력해주세요.",
            },
          },
        ],
      },
      {
        id: "sign",
        question: "계약 작성일과 주휴일을 입력해주세요.",
        fields: [
          {
            key: "weeklyHoliday",
            label: "주휴일",
            placeholder: "예: 일요일",
            type: "text",
          },
          {
            key: "contractDate",
            label: "계약 작성일",
            placeholder: "",
            type: "date",
          },
        ],
      },
    ],
  },
  resignation: {
    id: "resignation",
    title: "사직서",
    subtitle: "노무",
    icon: "pen-line",
    pdfFilePrefix: "사직서",
    initialData: {
      employeeName: "",
      department: "",
      position: "",
      companyName: "",
      recipientName: "대표이사 귀하",
      resignationDate: "",
      resignationReason: "",
    },
    steps: [
      {
        id: "worker",
        question: "퇴직자 정보를 입력해주세요.",
        fields: [
          { key: "employeeName", label: "성명", placeholder: "홍길동", type: "text" },
          { key: "department", label: "부서", placeholder: "개발팀", type: "text" },
          { key: "position", label: "직위", placeholder: "사원", type: "text" },
        ],
      },
      {
        id: "receiver",
        question: "제출 대상과 퇴직일을 입력해주세요.",
        fields: [
          { key: "companyName", label: "회사명", placeholder: "주식회사 도카이", type: "text" },
          {
            key: "recipientName",
            label: "수신",
            placeholder: "대표이사 귀하",
            type: "text",
          },
          { key: "resignationDate", label: "희망 퇴직일", placeholder: "", type: "date" },
        ],
      },
      {
        id: "reason",
        question: "사직 사유를 간단히 작성해주세요.",
        fields: [
          {
            key: "resignationReason",
            label: "사직 사유",
            placeholder: "개인 사정으로 인해 부득이하게 퇴직하고자 합니다.",
            type: "textarea",
            validation: {
              minLength: 6,
              message: "사직 사유를 6자 이상 입력해주세요.",
            },
          },
        ],
      },
    ],
  },
  "promissory-note": {
    id: "promissory-note",
    title: "차용증",
    subtitle: "금전",
    icon: "file-text",
    pdfFilePrefix: "차용증",
    initialData: {
      lenderName: "",
      borrowerName: "",
      borrowerAddress: "",
      borrowerContact: "",
      principalAmount: "",
      loanDate: "",
      dueDate: "",
      interestRate: "",
      repaymentMethod: "",
      specialClause: "",
    },
    steps: [
      {
        id: "parties",
        question: "채권자/채무자 정보만 입력해주세요.",
        fields: [
          { key: "lenderName", label: "채권자 성명", placeholder: "김채권", type: "text" },
          { key: "borrowerName", label: "채무자 성명", placeholder: "박채무", type: "text" },
          {
            key: "borrowerAddress",
            label: "채무자 주소",
            placeholder: "서울시 송파구 올림픽로 00",
            type: "text",
          },
          {
            key: "borrowerContact",
            label: "채무자 연락처",
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
        id: "money",
        question: "차용 금액과 날짜를 입력해주세요.",
        fields: [
          {
            key: "principalAmount",
            label: "차용 원금",
            placeholder: "예: 2,000만원",
            type: "text",
          },
          { key: "loanDate", label: "차용일", placeholder: "", type: "date" },
          { key: "dueDate", label: "변제기일", placeholder: "", type: "date" },
          {
            key: "interestRate",
            label: "이자율(선택)",
            placeholder: "예: 연 5%",
            type: "text",
            required: false,
          },
        ],
      },
      {
        id: "repayment",
        question: "변제 방법과 특약이 있으면 입력해주세요.",
        fields: [
          {
            key: "repaymentMethod",
            label: "변제 방법",
            placeholder: "예: 매월 말일 200만원씩 분할 상환",
            type: "textarea",
            validation: { minLength: 8 },
          },
          {
            key: "specialClause",
            label: "특약(선택)",
            placeholder: "예: 기한이익 상실 조항",
            type: "textarea",
            required: false,
          },
        ],
      },
    ],
  },
  "freelance-service-contract": {
    id: "freelance-service-contract",
    title: "프리랜서 용역계약서",
    subtitle: "계약",
    icon: "file-text",
    pdfFilePrefix: "프리랜서용역계약서",
    initialData: {
      clientName: "",
      clientAddress: "",
      contractorName: "",
      contractorAddress: "",
      projectName: "",
      serviceScope: "",
      contractAmount: "",
      paymentTerms: "",
      deadlineDate: "",
      contractDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "발주자와 수행자 정보를 입력해주세요.",
        fields: [
          { key: "clientName", label: "발주자", placeholder: "주식회사 도카이", type: "text" },
          {
            key: "clientAddress",
            label: "발주자 주소",
            placeholder: "서울시 강남구 테헤란로 00",
            type: "text",
          },
          { key: "contractorName", label: "수행자", placeholder: "홍길동", type: "text" },
          {
            key: "contractorAddress",
            label: "수행자 주소",
            placeholder: "서울시 마포구 월드컵북로 00",
            type: "text",
          },
        ],
      },
      {
        id: "project",
        question: "프로젝트 핵심 정보만 입력해주세요.",
        fields: [
          {
            key: "projectName",
            label: "프로젝트명",
            placeholder: "DocAI 랜딩페이지 제작",
            type: "text",
          },
          {
            key: "serviceScope",
            label: "용역 범위",
            placeholder: "기획/디자인/개발/테스트 포함",
            type: "textarea",
            validation: { minLength: 10 },
          },
          { key: "deadlineDate", label: "납품 기한", placeholder: "", type: "date" },
        ],
      },
      {
        id: "payment",
        question: "대금 및 지급 조건을 알려주세요.",
        fields: [
          {
            key: "contractAmount",
            label: "총 계약금액",
            placeholder: "예: 500만원 (VAT 별도)",
            type: "text",
          },
          {
            key: "paymentTerms",
            label: "지급 조건",
            placeholder: "예: 착수 50%, 검수 완료 50%",
            type: "textarea",
            validation: { minLength: 6 },
          },
        ],
      },
      {
        id: "date",
        question: "계약 체결일을 선택해주세요.",
        fields: [{ key: "contractDate", label: "계약일", placeholder: "", type: "date" }],
      },
    ],
  },
  "employment-certificate": {
    id: "employment-certificate",
    title: "재직증명서",
    subtitle: "회사증명",
    icon: "briefcase-business",
    pdfFilePrefix: "재직증명서",
    initialData: {
      companyName: "",
      companyAddress: "",
      employeeName: "",
      department: "",
      position: "",
      employmentStartDate: "",
      purpose: "",
      issueDate: "",
      representativeName: "",
    },
    steps: [
      {
        id: "basic",
        question: "회사와 재직자 기본정보를 입력해주세요.",
        fields: [
          { key: "companyName", label: "회사명", placeholder: "주식회사 도카이", type: "text" },
          {
            key: "companyAddress",
            label: "회사 주소",
            placeholder: "서울시 강남구 테헤란로 00",
            type: "text",
          },
          { key: "employeeName", label: "재직자 성명", placeholder: "홍길동", type: "text" },
        ],
      },
      {
        id: "career",
        question: "재직 정보와 발급 용도를 입력해주세요.",
        fields: [
          { key: "department", label: "부서", placeholder: "개발팀", type: "text" },
          { key: "position", label: "직위", placeholder: "대리", type: "text" },
          { key: "employmentStartDate", label: "입사일", placeholder: "", type: "date" },
          {
            key: "purpose",
            label: "제출 용도",
            placeholder: "예: 금융기관 제출",
            type: "text",
          },
        ],
      },
      {
        id: "issue",
        question: "발급일과 대표자명만 입력하면 끝입니다.",
        fields: [
          { key: "issueDate", label: "발급일", placeholder: "", type: "date" },
          {
            key: "representativeName",
            label: "대표자명",
            placeholder: "김대표",
            type: "text",
          },
        ],
      },
    ],
  },
  "career-certificate": {
    id: "career-certificate",
    title: "경력증명서",
    subtitle: "회사증명",
    icon: "briefcase-business",
    pdfFilePrefix: "경력증명서",
    initialData: {
      companyName: "",
      employeeName: "",
      department: "",
      position: "",
      employmentStartDate: "",
      employmentEndDate: "",
      majorDuties: "",
      issueDate: "",
      representativeName: "",
    },
    steps: [
      {
        id: "basic",
        question: "대상자와 직무 정보를 입력해주세요.",
        fields: [
          { key: "companyName", label: "회사명", placeholder: "주식회사 도카이", type: "text" },
          { key: "employeeName", label: "성명", placeholder: "홍길동", type: "text" },
          { key: "department", label: "부서", placeholder: "개발팀", type: "text" },
          { key: "position", label: "직위", placeholder: "대리", type: "text" },
        ],
      },
      {
        id: "period",
        question: "근무 기간을 선택해주세요.",
        fields: [
          { key: "employmentStartDate", label: "입사일", placeholder: "", type: "date" },
          { key: "employmentEndDate", label: "퇴사일", placeholder: "", type: "date" },
        ],
      },
      {
        id: "duties",
        question: "주요 업무와 발급정보를 입력해주세요.",
        fields: [
          {
            key: "majorDuties",
            label: "주요 업무",
            placeholder: "예: 웹 서비스 프론트엔드 개발 및 운영",
            type: "textarea",
            validation: { minLength: 10 },
          },
          { key: "issueDate", label: "발급일", placeholder: "", type: "date" },
          {
            key: "representativeName",
            label: "대표자명",
            placeholder: "김대표",
            type: "text",
          },
        ],
      },
    ],
  },
  "severance-request": {
    id: "severance-request",
    title: "퇴직금 지급요청서",
    subtitle: "노무",
    icon: "pen-line",
    pdfFilePrefix: "퇴직금지급요청서",
    initialData: {
      employeeName: "",
      companyName: "",
      employmentStartDate: "",
      retirementDate: "",
      requestedAmount: "",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      requestDate: "",
    },
    steps: [
      {
        id: "basic",
        question: "근무기간과 회사 정보를 입력해주세요.",
        fields: [
          { key: "employeeName", label: "요청인", placeholder: "홍길동", type: "text" },
          { key: "companyName", label: "회사명", placeholder: "주식회사 도카이", type: "text" },
          { key: "employmentStartDate", label: "입사일", placeholder: "", type: "date" },
          { key: "retirementDate", label: "퇴사일", placeholder: "", type: "date" },
        ],
      },
      {
        id: "amount",
        question: "요청 금액을 입력해주세요.",
        fields: [
          {
            key: "requestedAmount",
            label: "요청 금액",
            placeholder: "예: 12,000,000원",
            type: "text",
          },
        ],
      },
      {
        id: "account",
        question: "지급 받을 계좌를 입력해주세요.",
        fields: [
          { key: "bankName", label: "은행명", placeholder: "국민은행", type: "text" },
          { key: "accountNumber", label: "계좌번호", placeholder: "123-45-678901", type: "text" },
          { key: "accountHolder", label: "예금주", placeholder: "홍길동", type: "text" },
        ],
      },
      {
        id: "date",
        question: "요청일을 선택해주세요.",
        fields: [{ key: "requestDate", label: "요청일", placeholder: "", type: "date" }],
      },
    ],
  },
  "wage-arrears-notice": {
    id: "wage-arrears-notice",
    title: "임금체불 내용증명",
    subtitle: "노무/법률",
    icon: "file-text",
    pdfFilePrefix: "내용증명_임금체불",
    initialData: {
      senderName: "",
      senderContact: "",
      senderAddress: "",
      receiverName: "",
      receiverCompany: "",
      receiverAddress: "",
      arrearsPeriod: "",
      arrearsAmount: "",
      demandDeadlineDays: "7",
      noticeDate: "",
    },
    steps: [
      {
        id: "sender",
        question: "발신인(근로자) 정보를 입력해주세요.",
        fields: [
          { key: "senderName", label: "성명", placeholder: "홍길동", type: "text" },
          {
            key: "senderContact",
            label: "연락처",
            placeholder: "010-1111-2222",
            type: "tel",
            validation: { pattern: "^[0-9\\-\\s]{8,20}$", message: "연락처 형식이 올바르지 않습니다." },
          },
          {
            key: "senderAddress",
            label: "주소",
            placeholder: "서울시 강남구 테헤란로 00",
            type: "text",
          },
        ],
      },
      {
        id: "receiver",
        question: "수신인(사용자) 정보를 입력해주세요.",
        fields: [
          { key: "receiverName", label: "수신인 성명", placeholder: "김대표", type: "text" },
          {
            key: "receiverCompany",
            label: "회사명",
            placeholder: "주식회사 도카이",
            type: "text",
          },
          {
            key: "receiverAddress",
            label: "회사 주소",
            placeholder: "서울시 서초구 서초대로 00",
            type: "text",
          },
        ],
      },
      {
        id: "arrears",
        question: "체불 정보와 지급 기한을 입력해주세요.",
        fields: [
          {
            key: "arrearsPeriod",
            label: "체불 기간",
            placeholder: "예: 2025년 11월~2026년 1월",
            type: "text",
          },
          {
            key: "arrearsAmount",
            label: "체불 금액",
            placeholder: "예: 7,500,000원",
            type: "text",
          },
          {
            key: "demandDeadlineDays",
            label: "지급 기한(일)",
            placeholder: "7",
            type: "text",
            validation: {
              pattern: "^[1-9][0-9]?$",
              message: "1~99 사이 숫자를 입력해주세요.",
            },
          },
        ],
      },
      {
        id: "date",
        question: "발송일을 선택해주세요.",
        fields: [{ key: "noticeDate", label: "발송일", placeholder: "", type: "date" }],
      },
    ],
  },
  "lease-termination-notice": {
    id: "lease-termination-notice",
    title: "임대차계약 해지 통보서",
    subtitle: "부동산",
    icon: "file-text",
    pdfFilePrefix: "임대차해지통보서",
    initialData: {
      senderName: "",
      senderContact: "",
      receiverName: "",
      receiverContact: "",
      propertyAddress: "",
      leaseEndDate: "",
      moveOutDate: "",
      terminationReason: "계약기간 만료",
      noticeDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "임차인/임대인 정보를 입력해주세요.",
        fields: [
          { key: "senderName", label: "임차인 성명", placeholder: "홍길동", type: "text" },
          {
            key: "senderContact",
            label: "임차인 연락처",
            placeholder: "010-1111-2222",
            type: "tel",
            validation: { pattern: "^[0-9\\-\\s]{8,20}$", message: "연락처 형식이 올바르지 않습니다." },
          },
          { key: "receiverName", label: "임대인 성명", placeholder: "김임대", type: "text" },
          {
            key: "receiverContact",
            label: "임대인 연락처(선택)",
            placeholder: "010-3333-4444",
            type: "tel",
            required: false,
            validation: { pattern: "^[0-9\\-\\s]{8,20}$", message: "연락처 형식이 올바르지 않습니다." },
          },
        ],
      },
      {
        id: "lease",
        question: "계약 정보와 목적물 주소를 입력해주세요.",
        fields: [
          {
            key: "propertyAddress",
            label: "임차주택 주소",
            placeholder: "서울시 강동구 올림픽로 00, 000호",
            type: "text",
          },
          { key: "leaseEndDate", label: "계약 만료일", placeholder: "", type: "date" },
          { key: "moveOutDate", label: "퇴거 예정일", placeholder: "", type: "date" },
        ],
      },
      {
        id: "reason",
        question: "해지 사유를 입력해주세요.",
        fields: [
          {
            key: "terminationReason",
            label: "해지 사유",
            placeholder: "예: 계약기간 만료",
            type: "text",
          },
        ],
      },
      {
        id: "date",
        question: "통보일을 선택해주세요.",
        fields: [{ key: "noticeDate", label: "통보일", placeholder: "", type: "date" }],
      },
    ],
  },
  "rent-arrears-demand": {
    id: "rent-arrears-demand",
    title: "월세 미납 독촉 내용증명",
    subtitle: "부동산",
    icon: "file-text",
    pdfFilePrefix: "내용증명_월세미납독촉",
    initialData: {
      senderName: "",
      senderContact: "",
      receiverName: "",
      propertyAddress: "",
      unpaidMonths: "",
      unpaidAmount: "",
      deadlineDays: "7",
      remittanceAccount: "",
      noticeDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "임대인/임차인 정보와 주소를 입력해주세요.",
        fields: [
          { key: "senderName", label: "임대인 성명", placeholder: "김임대", type: "text" },
          {
            key: "senderContact",
            label: "임대인 연락처",
            placeholder: "010-4444-5555",
            type: "tel",
            validation: { pattern: "^[0-9\\-\\s]{8,20}$", message: "연락처 형식이 올바르지 않습니다." },
          },
          { key: "receiverName", label: "임차인 성명", placeholder: "박임차", type: "text" },
          {
            key: "propertyAddress",
            label: "임차주택 주소",
            placeholder: "서울시 영등포구 여의대로 00",
            type: "text",
          },
        ],
      },
      {
        id: "arrears",
        question: "미납 개월수와 금액을 입력해주세요.",
        fields: [
          {
            key: "unpaidMonths",
            label: "미납 개월수",
            placeholder: "예: 3개월",
            type: "text",
          },
          {
            key: "unpaidAmount",
            label: "미납 총액",
            placeholder: "예: 3,000,000원",
            type: "text",
          },
        ],
      },
      {
        id: "payment",
        question: "납부 기한과 계좌를 입력해주세요.",
        fields: [
          {
            key: "deadlineDays",
            label: "납부 기한(일)",
            placeholder: "7",
            type: "text",
            validation: {
              pattern: "^[1-9][0-9]?$",
              message: "1~99 사이 숫자를 입력해주세요.",
            },
          },
          {
            key: "remittanceAccount",
            label: "입금 계좌",
            placeholder: "예: 국민은행 123-45-678901 (김임대)",
            type: "text",
          },
        ],
      },
      {
        id: "date",
        question: "발송일을 선택해주세요.",
        fields: [{ key: "noticeDate", label: "발송일", placeholder: "", type: "date" }],
      },
    ],
  },
  "deposit-return-confirmation": {
    id: "deposit-return-confirmation",
    title: "보증금 반환 확인서",
    subtitle: "부동산",
    icon: "file-text",
    pdfFilePrefix: "보증금반환확인서",
    initialData: {
      landlordName: "",
      tenantName: "",
      propertyAddress: "",
      depositAmount: "",
      returnDate: "",
      paymentMethod: "계좌이체",
      specialNotes: "",
      confirmationDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "임대인/임차인과 부동산 정보를 입력해주세요.",
        fields: [
          { key: "landlordName", label: "임대인 성명", placeholder: "김임대", type: "text" },
          { key: "tenantName", label: "임차인 성명", placeholder: "박임차", type: "text" },
          {
            key: "propertyAddress",
            label: "목적물 주소",
            placeholder: "서울시 관악구 남부순환로 00",
            type: "text",
          },
        ],
      },
      {
        id: "refund",
        question: "반환 금액과 반환 방식을 입력해주세요.",
        fields: [
          {
            key: "depositAmount",
            label: "반환 보증금",
            placeholder: "예: 100,000,000원",
            type: "text",
          },
          { key: "returnDate", label: "반환일", placeholder: "", type: "date" },
          {
            key: "paymentMethod",
            label: "지급 방식",
            placeholder: "예: 계좌이체",
            type: "text",
          },
        ],
      },
      {
        id: "confirm",
        question: "확인일과 비고를 입력해주세요.",
        fields: [
          {
            key: "specialNotes",
            label: "비고(선택)",
            placeholder: "예: 관리비 정산 완료",
            type: "textarea",
            required: false,
          },
          { key: "confirmationDate", label: "확인일", placeholder: "", type: "date" },
        ],
      },
    ],
  },
  "settlement-agreement": {
    id: "settlement-agreement",
    title: "합의서",
    subtitle: "분쟁해결",
    icon: "pen-line",
    pdfFilePrefix: "합의서",
    initialData: {
      partyAName: "",
      partyAAddress: "",
      partyBName: "",
      partyBAddress: "",
      disputeSummary: "",
      settlementAmount: "",
      paymentDate: "",
      noFurtherClaimClause: "본 합의 이행 완료 후 상호 민·형사상 이의를 제기하지 않는다.",
      agreementDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "합의 당사자 정보를 입력해주세요.",
        fields: [
          { key: "partyAName", label: "갑 성명", placeholder: "홍길동", type: "text" },
          {
            key: "partyAAddress",
            label: "갑 주소",
            placeholder: "서울시 동작구 상도로 00",
            type: "text",
          },
          { key: "partyBName", label: "을 성명", placeholder: "김민수", type: "text" },
          {
            key: "partyBAddress",
            label: "을 주소",
            placeholder: "서울시 서대문구 연세로 00",
            type: "text",
          },
        ],
      },
      {
        id: "dispute",
        question: "분쟁 내용을 한 단락으로 입력해주세요.",
        fields: [
          {
            key: "disputeSummary",
            label: "분쟁 내용",
            placeholder: "예: 거래대금 정산 관련 분쟁",
            type: "textarea",
            validation: { minLength: 8 },
          },
        ],
      },
      {
        id: "terms",
        question: "합의금과 지급기한을 입력해주세요.",
        fields: [
          {
            key: "settlementAmount",
            label: "합의금",
            placeholder: "예: 5,000,000원",
            type: "text",
          },
          { key: "paymentDate", label: "지급기한", placeholder: "", type: "date" },
          {
            key: "noFurtherClaimClause",
            label: "추가 청구 금지 문구",
            placeholder: "본 합의 이행 완료 후 상호 민·형사상 이의를 제기하지 않는다.",
            type: "textarea",
            validation: { minLength: 12 },
          },
        ],
      },
      {
        id: "date",
        question: "합의일을 선택해주세요.",
        fields: [{ key: "agreementDate", label: "합의일", placeholder: "", type: "date" }],
      },
    ],
  },
  "debt-repayment-commitment": {
    id: "debt-repayment-commitment",
    title: "채무변제 확약서",
    subtitle: "금전",
    icon: "file-text",
    pdfFilePrefix: "채무변제확약서",
    initialData: {
      creditorName: "",
      debtorName: "",
      debtorAddress: "",
      debtAmount: "",
      originReason: "",
      repaymentDate: "",
      installmentPlan: "",
      commitmentDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "채권자/채무자와 채무 발생 사유를 입력해주세요.",
        fields: [
          { key: "creditorName", label: "채권자", placeholder: "김채권", type: "text" },
          { key: "debtorName", label: "채무자", placeholder: "박채무", type: "text" },
          {
            key: "debtorAddress",
            label: "채무자 주소",
            placeholder: "서울시 종로구 율곡로 00",
            type: "text",
          },
          {
            key: "originReason",
            label: "채무 발생 사유",
            placeholder: "예: 차용금",
            type: "text",
          },
        ],
      },
      {
        id: "amount",
        question: "채무 금액과 변제기한을 입력해주세요.",
        fields: [
          {
            key: "debtAmount",
            label: "채무 금액",
            placeholder: "예: 30,000,000원",
            type: "text",
          },
          { key: "repaymentDate", label: "최종 변제일", placeholder: "", type: "date" },
        ],
      },
      {
        id: "plan",
        question: "분할상환 계획이 있으면 입력해주세요.",
        helperText: "없으면 빈칸으로 두면 일시 변제로 자동 처리됩니다.",
        fields: [
          {
            key: "installmentPlan",
            label: "변제 계획(선택)",
            placeholder: "예: 매월 25일 300만원씩 10회 분할 상환",
            type: "textarea",
            required: false,
          },
        ],
      },
      {
        id: "date",
        question: "확약일을 선택해주세요.",
        fields: [{ key: "commitmentDate", label: "확약일", placeholder: "", type: "date" }],
      },
    ],
  },
  "payment-order-application": {
    id: "payment-order-application",
    title: "지급명령 신청서(대여금)",
    subtitle: "법원",
    icon: "file-text",
    pdfFilePrefix: "지급명령신청서_대여금",
    initialData: {
      courtName: "",
      applicantName: "",
      respondentName: "",
      claimAmount: "",
      loanDate: "",
      dueDate: "",
      factSummary: "",
      evidenceList: "",
      applicationDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "법원명과 당사자 정보를 입력해주세요.",
        fields: [
          { key: "courtName", label: "관할 법원", placeholder: "서울중앙지방법원", type: "text" },
          { key: "applicantName", label: "신청인", placeholder: "홍길동", type: "text" },
          { key: "respondentName", label: "상대방", placeholder: "김민수", type: "text" },
        ],
      },
      {
        id: "claim",
        question: "청구 금액과 대여 기간을 입력해주세요.",
        fields: [
          {
            key: "claimAmount",
            label: "청구 금액",
            placeholder: "예: 20,000,000원",
            type: "text",
          },
          { key: "loanDate", label: "대여일", placeholder: "", type: "date" },
          { key: "dueDate", label: "변제기일", placeholder: "", type: "date" },
        ],
      },
      {
        id: "facts",
        question: "청구 원인과 증거를 간단히 입력해주세요.",
        fields: [
          {
            key: "factSummary",
            label: "청구 원인",
            placeholder: "예: 2025.03.01. 2천만원을 대여했고 변제기일이 지났으나 미변제",
            type: "textarea",
            validation: { minLength: 12 },
          },
          {
            key: "evidenceList",
            label: "증거 자료",
            placeholder: "예: 차용증, 계좌이체내역, 문자메시지",
            type: "textarea",
            validation: { minLength: 6 },
          },
        ],
      },
      {
        id: "date",
        question: "신청일을 선택해주세요.",
        fields: [{ key: "applicationDate", label: "신청일", placeholder: "", type: "date" }],
      },
    ],
  },
  "power-of-attorney": {
    id: "power-of-attorney",
    title: "위임장",
    subtitle: "민원",
    icon: "file-text",
    pdfFilePrefix: "위임장",
    initialData: {
      principalName: "",
      principalAddress: "",
      principalContact: "",
      agentName: "",
      agentAddress: "",
      delegatedTask: "",
      validUntilDate: "",
      issueDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "위임인과 수임인 정보를 입력해주세요.",
        fields: [
          { key: "principalName", label: "위임인 성명", placeholder: "홍길동", type: "text" },
          {
            key: "principalAddress",
            label: "위임인 주소",
            placeholder: "서울시 강북구 도봉로 00",
            type: "text",
          },
          {
            key: "principalContact",
            label: "위임인 연락처",
            placeholder: "010-2222-3333",
            type: "tel",
            validation: { pattern: "^[0-9\\-\\s]{8,20}$", message: "연락처 형식이 올바르지 않습니다." },
          },
          { key: "agentName", label: "수임인 성명", placeholder: "김대리", type: "text" },
          {
            key: "agentAddress",
            label: "수임인 주소",
            placeholder: "서울시 노원구 동일로 00",
            type: "text",
          },
        ],
      },
      {
        id: "scope",
        question: "위임할 업무를 입력해주세요.",
        fields: [
          {
            key: "delegatedTask",
            label: "위임 사항",
            placeholder: "예: 주민등록등본 발급 신청 및 수령 일체",
            type: "textarea",
            validation: { minLength: 8 },
          },
        ],
      },
      {
        id: "date",
        question: "유효기한과 작성일을 선택해주세요.",
        fields: [
          { key: "validUntilDate", label: "유효기한", placeholder: "", type: "date" },
          { key: "issueDate", label: "작성일", placeholder: "", type: "date" },
        ],
      },
    ],
  },
  "statement-of-fact": {
    id: "statement-of-fact",
    title: "사실확인서",
    subtitle: "증빙",
    icon: "file-text",
    pdfFilePrefix: "사실확인서",
    initialData: {
      authorName: "",
      relationToCase: "",
      incidentDate: "",
      incidentLocation: "",
      factDescription: "",
      submitPurpose: "",
      statementDate: "",
    },
    steps: [
      {
        id: "author",
        question: "작성자와 사건 관련 정보를 입력해주세요.",
        fields: [
          { key: "authorName", label: "작성자 성명", placeholder: "홍길동", type: "text" },
          {
            key: "relationToCase",
            label: "사건과의 관계",
            placeholder: "예: 당사자 / 목격자",
            type: "text",
          },
        ],
      },
      {
        id: "incident",
        question: "발생 일시와 장소를 입력해주세요.",
        fields: [
          { key: "incidentDate", label: "발생일", placeholder: "", type: "date" },
          {
            key: "incidentLocation",
            label: "발생 장소",
            placeholder: "서울시 마포구 월드컵북로 00",
            type: "text",
          },
        ],
      },
      {
        id: "facts",
        question: "확인 사실과 제출 목적을 작성해주세요.",
        fields: [
          {
            key: "factDescription",
            label: "확인 사실",
            placeholder: "사실관계를 구체적으로 작성해주세요.",
            type: "textarea",
            validation: { minLength: 15 },
          },
          {
            key: "submitPurpose",
            label: "제출 목적",
            placeholder: "예: 법원 제출용",
            type: "text",
          },
          { key: "statementDate", label: "작성일", placeholder: "", type: "date" },
        ],
      },
    ],
  },
  "personal-info-consent": {
    id: "personal-info-consent",
    title: "개인정보 수집·이용 동의서",
    subtitle: "동의",
    icon: "file-text",
    pdfFilePrefix: "개인정보수집이용동의서",
    initialData: {
      organizationName: "",
      dataSubjectName: "",
      purpose: "",
      personalInfoItems: "",
      retentionPeriod: "",
      consentDate: "",
      representativeName: "",
    },
    steps: [
      {
        id: "basic",
        question: "기관명과 정보주체를 입력해주세요.",
        fields: [
          {
            key: "organizationName",
            label: "수집·이용 기관",
            placeholder: "주식회사 도카이",
            type: "text",
          },
          { key: "dataSubjectName", label: "정보주체 성명", placeholder: "홍길동", type: "text" },
          {
            key: "purpose",
            label: "수집·이용 목적",
            placeholder: "예: 서비스 가입 및 본인 확인",
            type: "text",
          },
        ],
      },
      {
        id: "details",
        question: "수집 항목과 보유 기간을 입력해주세요.",
        fields: [
          {
            key: "personalInfoItems",
            label: "수집 항목",
            placeholder: "예: 성명, 연락처, 이메일",
            type: "textarea",
            validation: { minLength: 6 },
          },
          {
            key: "retentionPeriod",
            label: "보유·이용 기간",
            placeholder: "예: 회원 탈퇴 후 1년",
            type: "text",
          },
        ],
      },
      {
        id: "consent",
        question: "동의일과 담당자를 입력해주세요.",
        fields: [
          { key: "consentDate", label: "동의일", placeholder: "", type: "date" },
          {
            key: "representativeName",
            label: "담당자/대표자",
            placeholder: "김담당",
            type: "text",
          },
        ],
      },
    ],
  },
  nda: {
    id: "nda",
    title: "비밀유지서약서(NDA)",
    subtitle: "계약",
    icon: "file-text",
    pdfFilePrefix: "비밀유지서약서",
    initialData: {
      disclosingParty: "",
      receivingParty: "",
      purpose: "",
      confidentialScope: "",
      obligationPeriod: "계약기간 및 종료 후 2년",
      returnMethod: "파기 또는 반환",
      breachLiability: "손해배상 및 법적 책임",
      agreementDate: "",
    },
    steps: [
      {
        id: "parties",
        question: "당사자와 체결 목적을 입력해주세요.",
        fields: [
          { key: "disclosingParty", label: "정보제공자", placeholder: "주식회사 도카이", type: "text" },
          { key: "receivingParty", label: "정보수령자", placeholder: "홍길동", type: "text" },
          {
            key: "purpose",
            label: "체결 목적",
            placeholder: "예: 프로젝트 협업 및 검토",
            type: "text",
          },
        ],
      },
      {
        id: "scope",
        question: "비밀정보 범위를 입력해주세요.",
        fields: [
          {
            key: "confidentialScope",
            label: "비밀정보 범위",
            placeholder: "예: 소스코드, 사업계획, 고객정보 일체",
            type: "textarea",
            validation: { minLength: 10 },
          },
        ],
      },
      {
        id: "terms",
        question: "유지기간과 위반 책임을 확인해주세요.",
        fields: [
          {
            key: "obligationPeriod",
            label: "비밀유지 기간",
            placeholder: "예: 계약기간 및 종료 후 2년",
            type: "text",
          },
          {
            key: "returnMethod",
            label: "자료 처리 방식",
            placeholder: "예: 파기 또는 반환",
            type: "text",
          },
          {
            key: "breachLiability",
            label: "위반 시 책임",
            placeholder: "예: 손해배상 및 법적 책임",
            type: "text",
          },
        ],
      },
      {
        id: "date",
        question: "체결일을 선택해주세요.",
        fields: [{ key: "agreementDate", label: "체결일", placeholder: "", type: "date" }],
      },
    ],
  },
};
