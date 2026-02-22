import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function PowerOfAttorneyTemplateA4({ data, today }) {
  return (
    <A4Document title="위임장" subtitle="권한 위임에 관한 문서">
      <KeyValueTable
        rows={[
          {
            label: "위임인",
            value: `${valueOrDash(data.principalName)} / ${valueOrDash(data.principalAddress)} / ${valueOrDash(data.principalContact)}`,
          },
          { label: "수임인", value: `${valueOrDash(data.agentName)} / ${valueOrDash(data.agentAddress)}` },
          { label: "유효기한", value: formatDateKor(data.validUntilDate) },
        ]}
      />

      <SectionBlock title="위임 사항">
        <p className="whitespace-pre-line">{valueOrDash(data.delegatedTask)}</p>
      </SectionBlock>

      <SectionBlock title="확인 문구">
        <p>위임인은 상기 사항에 대한 권한을 수임인에게 위임합니다.</p>
        <p>수임인은 위임 목적 범위 내에서만 권한을 행사합니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`작성일: ${formatDateKor(data.issueDate)}`}
        today={today}
        signers={[
          { label: "위임인", name: data.principalName },
          { label: "수임인", name: data.agentName },
        ]}
      />
    </A4Document>
  );
}

