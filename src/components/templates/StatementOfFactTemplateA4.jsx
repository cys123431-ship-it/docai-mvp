import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function StatementOfFactTemplateA4({ data, today }) {
  return (
    <A4Document title="사실확인서" subtitle="사실관계 진술 문서">
      <KeyValueTable
        rows={[
          { label: "작성자", value: valueOrDash(data.authorName) },
          { label: "사건과의 관계", value: valueOrDash(data.relationToCase) },
          { label: "발생 일시", value: formatDateKor(data.incidentDate) },
          { label: "발생 장소", value: valueOrDash(data.incidentLocation) },
          { label: "제출 목적", value: valueOrDash(data.submitPurpose) },
        ]}
      />

      <SectionBlock title="확인 사실">
        <p className="whitespace-pre-line">{valueOrDash(data.factDescription)}</p>
      </SectionBlock>

      <SectionBlock title="진술 확인">
        <p>본인은 위 기재 내용이 사실과 다름없음을 확인합니다.</p>
        <p>허위 사실 기재 시 관련 법령에 따른 책임을 질 수 있음을 인지합니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`작성일: ${formatDateKor(data.statementDate)}`}
        today={today}
        signers={[{ label: "작성자", name: data.authorName }]}
      />
    </A4Document>
  );
}

