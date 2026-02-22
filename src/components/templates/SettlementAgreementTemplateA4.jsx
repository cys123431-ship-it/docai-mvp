import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function SettlementAgreementTemplateA4({ data, today }) {
  return (
    <A4Document title="합의서" subtitle="당사자 간 분쟁 종결을 위한 합의 문서">
      <KeyValueTable
        rows={[
          { label: "갑", value: `${valueOrDash(data.partyAName)} / ${valueOrDash(data.partyAAddress)}` },
          { label: "을", value: `${valueOrDash(data.partyBName)} / ${valueOrDash(data.partyBAddress)}` },
          { label: "합의금", value: valueOrDash(data.settlementAmount) },
          { label: "지급기한", value: formatDateKor(data.paymentDate) },
        ]}
      />

      <SectionBlock title="1. 분쟁 내용">
        <p className="whitespace-pre-line">{valueOrDash(data.disputeSummary)}</p>
      </SectionBlock>

      <SectionBlock title="2. 합의 조건">
        <p>을은 갑에게 위 합의금을 지급하며, 지급 완료 시 당사자 간 분쟁은 종결된 것으로 본다.</p>
        <p className="whitespace-pre-line">{valueOrDash(data.noFurtherClaimClause)}</p>
      </SectionBlock>

      <SignatureArea
        statement={`본 합의서는 ${formatDateKor(data.agreementDate)} 작성되었습니다.`}
        today={today}
        signers={[
          { label: "갑", name: data.partyAName },
          { label: "을", name: data.partyBName },
        ]}
      />
    </A4Document>
  );
}

