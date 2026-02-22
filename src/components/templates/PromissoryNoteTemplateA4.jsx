import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function PromissoryNoteTemplateA4({ data, today }) {
  return (
    <A4Document title="차용증" subtitle="금전소비대차에 대한 채무 확인서">
      <KeyValueTable
        rows={[
          { label: "채권자", value: valueOrDash(data.lenderName) },
          {
            label: "채무자",
            value: `${valueOrDash(data.borrowerName)} / ${valueOrDash(data.borrowerAddress)} / ${valueOrDash(data.borrowerContact)}`,
          },
          { label: "차용 원금", value: valueOrDash(data.principalAmount) },
          { label: "차용일", value: formatDateKor(data.loanDate) },
          { label: "변제기일", value: formatDateKor(data.dueDate) },
          { label: "이자율", value: data.interestRate || "무이자" },
        ]}
      />

      <SectionBlock title="변제 방법">
        <p className="whitespace-pre-line">{valueOrDash(data.repaymentMethod)}</p>
      </SectionBlock>

      <SectionBlock title="특약 사항">
        <p className="whitespace-pre-line">{data.specialClause?.trim() ? data.specialClause : "별도 특약 없음."}</p>
      </SectionBlock>

      <SignatureArea
        statement="채무자는 상기 채무를 기한 내 성실히 변제할 것을 확약합니다."
        today={today}
        signers={[
          { label: "채권자", name: data.lenderName },
          { label: "채무자", name: data.borrowerName },
        ]}
      />
    </A4Document>
  );
}

