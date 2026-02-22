import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function EmploymentCertificateTemplateA4({ data, today }) {
  return (
    <A4Document title="재직증명서" subtitle="근무 사실 증명을 위한 공식 문서">
      <KeyValueTable
        rows={[
          { label: "회사명", value: `${valueOrDash(data.companyName)} / ${valueOrDash(data.companyAddress)}` },
          { label: "성명", value: valueOrDash(data.employeeName) },
          { label: "소속/직위", value: `${valueOrDash(data.department)} / ${valueOrDash(data.position)}` },
          { label: "입사일", value: formatDateKor(data.employmentStartDate) },
          { label: "발급 용도", value: valueOrDash(data.purpose) },
        ]}
      />

      <SectionBlock title="증명 내용">
        <p>상기인은 현재 당사에 재직 중임을 증명합니다.</p>
        <p>본 증명서는 제출 목적 외 용도로 사용할 수 없습니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`${formatDateKor(data.issueDate)} 기준으로 발급함.`}
        today={today}
        signers={[{ label: "대표자", name: data.representativeName }]}
      />
    </A4Document>
  );
}

