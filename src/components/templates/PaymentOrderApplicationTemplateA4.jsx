import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function PaymentOrderApplicationTemplateA4({ data, today }) {
  return (
    <A4Document title="지급명령 신청서" subtitle="대여금 청구 사건">
      <KeyValueTable
        rows={[
          { label: "관할 법원", value: valueOrDash(data.courtName) },
          { label: "신청인", value: valueOrDash(data.applicantName) },
          { label: "상대방", value: valueOrDash(data.respondentName) },
          { label: "청구 금액", value: valueOrDash(data.claimAmount) },
          {
            label: "대여 기간",
            value: `${formatDateKor(data.loanDate)} ~ ${formatDateKor(data.dueDate)}`,
          },
        ]}
      />

      <SectionBlock title="청구 취지">
        <p>상대방은 신청인에게 위 청구 금액 및 지연손해금을 지급하라는 명령을 구합니다.</p>
      </SectionBlock>

      <SectionBlock title="청구 원인">
        <p className="whitespace-pre-line">{valueOrDash(data.factSummary)}</p>
      </SectionBlock>

      <SectionBlock title="입증 방법">
        <p className="whitespace-pre-line">{valueOrDash(data.evidenceList)}</p>
      </SectionBlock>

      <SignatureArea
        statement={`신청일: ${formatDateKor(data.applicationDate)}`}
        today={today}
        signers={[{ label: "신청인", name: data.applicantName }]}
      />
    </A4Document>
  );
}

