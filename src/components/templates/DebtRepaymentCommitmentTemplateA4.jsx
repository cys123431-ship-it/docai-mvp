import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function DebtRepaymentCommitmentTemplateA4({ data, today }) {
  return (
    <A4Document title="채무변제 확약서" subtitle="채무자의 변제 의무 이행 확약">
      <KeyValueTable
        rows={[
          { label: "채권자", value: valueOrDash(data.creditorName) },
          { label: "채무자", value: `${valueOrDash(data.debtorName)} / ${valueOrDash(data.debtorAddress)}` },
          { label: "채무 금액", value: valueOrDash(data.debtAmount) },
          { label: "발생 사유", value: valueOrDash(data.originReason) },
          { label: "최종 변제일", value: formatDateKor(data.repaymentDate) },
        ]}
      />

      <SectionBlock title="변제 계획">
        <p className="whitespace-pre-line">{data.installmentPlan?.trim() ? data.installmentPlan : "일시 변제 예정."}</p>
      </SectionBlock>

      <SectionBlock title="확약 내용">
        <p>채무자는 위 채무를 기한 내 성실히 변제할 것을 확약합니다.</p>
        <p>기한 내 미이행 시 채권자는 법적 절차를 진행할 수 있습니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`확약일: ${formatDateKor(data.commitmentDate)}`}
        today={today}
        signers={[
          { label: "채권자", name: data.creditorName },
          { label: "채무자", name: data.debtorName },
        ]}
      />
    </A4Document>
  );
}

