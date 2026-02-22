import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function ResignationLetterTemplateA4({ data, today }) {
  return (
    <A4Document title="사직서" subtitle="퇴직 의사 표시 및 승인 요청">
      <KeyValueTable
        rows={[
          { label: "제출인", value: `${valueOrDash(data.employeeName)} (${valueOrDash(data.department)} / ${valueOrDash(data.position)})` },
          { label: "수신", value: `${valueOrDash(data.companyName)} ${valueOrDash(data.recipientName)}` },
          { label: "희망 퇴직일", value: formatDateKor(data.resignationDate) },
        ]}
      />

      <SectionBlock title="사직 사유">
        <p className="whitespace-pre-line">{valueOrDash(data.resignationReason)}</p>
      </SectionBlock>

      <SectionBlock title="확인 문구">
        <p>상기와 같은 사유로 사직하고자 하오니 승인하여 주시기 바랍니다.</p>
        <p>인수인계 및 잔여 업무 정리는 회사 지침에 따라 성실히 수행하겠습니다.</p>
      </SectionBlock>

      <SignatureArea
        statement="본인은 본 사직서 내용을 사실대로 작성하였음을 확인합니다."
        today={today}
        signers={[{ label: "제출인", name: data.employeeName }]}
      />
    </A4Document>
  );
}

