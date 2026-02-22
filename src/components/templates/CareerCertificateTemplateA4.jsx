import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function CareerCertificateTemplateA4({ data, today }) {
  const careerPeriod = `${formatDateKor(data.employmentStartDate)} ~ ${formatDateKor(data.employmentEndDate)}`;

  return (
    <A4Document title="경력증명서" subtitle="근무 이력 및 담당 업무 증명">
      <KeyValueTable
        rows={[
          { label: "회사명", value: valueOrDash(data.companyName) },
          { label: "성명", value: valueOrDash(data.employeeName) },
          { label: "소속/직위", value: `${valueOrDash(data.department)} / ${valueOrDash(data.position)}` },
          { label: "재직기간", value: careerPeriod },
        ]}
      />

      <SectionBlock title="주요 담당 업무">
        <p className="whitespace-pre-line">{valueOrDash(data.majorDuties)}</p>
      </SectionBlock>

      <SectionBlock title="증명 문구">
        <p>상기 내용은 당사의 인사기록에 근거한 사실임을 증명합니다.</p>
        <p>본 증명서는 제출처 확인 목적 외 사용을 금합니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`${formatDateKor(data.issueDate)} 발급`}
        today={today}
        signers={[{ label: "대표자", name: data.representativeName }]}
      />
    </A4Document>
  );
}

