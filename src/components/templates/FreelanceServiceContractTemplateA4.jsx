import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function FreelanceServiceContractTemplateA4({ data, today }) {
  return (
    <A4Document title="프리랜서 용역계약서" subtitle="업무 범위·대금·기한에 관한 합의서">
      <KeyValueTable
        rows={[
          { label: "발주자", value: `${valueOrDash(data.clientName)} / ${valueOrDash(data.clientAddress)}` },
          { label: "수행자", value: `${valueOrDash(data.contractorName)} / ${valueOrDash(data.contractorAddress)}` },
          { label: "프로젝트명", value: valueOrDash(data.projectName) },
          { label: "계약일", value: formatDateKor(data.contractDate) },
        ]}
      />

      <SectionBlock title="1. 용역 범위">
        <p className="whitespace-pre-line">{valueOrDash(data.serviceScope)}</p>
      </SectionBlock>

      <SectionBlock title="2. 대금 및 지급 조건">
        <p>총 계약금액: {valueOrDash(data.contractAmount)}</p>
        <p className="whitespace-pre-line">지급 조건: {valueOrDash(data.paymentTerms)}</p>
      </SectionBlock>

      <SectionBlock title="3. 수행 기한 및 권리">
        <p>최종 납품기한: {formatDateKor(data.deadlineDate)}</p>
        <p>용역 결과물의 사용권 및 저작권 귀속은 당사자 합의 및 관련 법령에 따른다.</p>
      </SectionBlock>

      <SignatureArea
        statement="양 당사자는 계약 조건을 확인하고 성실히 이행할 것을 약정합니다."
        today={today}
        signers={[
          { label: "발주자", name: data.clientName },
          { label: "수행자", name: data.contractorName },
        ]}
      />
    </A4Document>
  );
}

