import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function PersonalInfoConsentTemplateA4({ data, today }) {
  return (
    <A4Document title="개인정보 수집·이용 동의서" subtitle="개인정보보호법에 따른 동의 확인">
      <KeyValueTable
        rows={[
          { label: "수집·이용자", value: valueOrDash(data.organizationName) },
          { label: "정보주체", value: valueOrDash(data.dataSubjectName) },
          { label: "이용 목적", value: valueOrDash(data.purpose) },
          { label: "보유 기간", value: valueOrDash(data.retentionPeriod) },
        ]}
      />

      <SectionBlock title="수집 항목">
        <p className="whitespace-pre-line">{valueOrDash(data.personalInfoItems)}</p>
      </SectionBlock>

      <SectionBlock title="동의 안내">
        <p>정보주체는 개인정보 수집·이용 동의를 거부할 권리가 있습니다.</p>
        <p>다만, 동의 거부 시 서비스 제공 또는 계약 이행에 제한이 발생할 수 있습니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`동의일: ${formatDateKor(data.consentDate)}`}
        today={today}
        signers={[
          { label: "정보주체", name: data.dataSubjectName },
          { label: "담당자", name: data.representativeName },
        ]}
      />
    </A4Document>
  );
}

