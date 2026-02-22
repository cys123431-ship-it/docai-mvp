import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function SeverancePayRequestTemplateA4({ data, today }) {
  return (
    <A4Document title="퇴직금 지급요청서" subtitle="근로자 퇴직급여 보장법에 따른 지급 요청">
      <KeyValueTable
        rows={[
          { label: "요청인", value: valueOrDash(data.employeeName) },
          { label: "회사명", value: valueOrDash(data.companyName) },
          {
            label: "근무기간",
            value: `${formatDateKor(data.employmentStartDate)} ~ ${formatDateKor(data.retirementDate)}`,
          },
          { label: "요청 금액", value: valueOrDash(data.requestedAmount) },
        ]}
      />

      <SectionBlock title="지급 계좌">
        <p>은행명: {valueOrDash(data.bankName)}</p>
        <p>계좌번호: {valueOrDash(data.accountNumber)}</p>
        <p>예금주: {valueOrDash(data.accountHolder)}</p>
      </SectionBlock>

      <SectionBlock title="요청 사항">
        <p>퇴직금 산정 내역에 따른 지급금을 법정 기한 내 지급해주시기 바랍니다.</p>
        <p>지급 완료 시 관련 명세서를 함께 제공하여 주시기 바랍니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`${formatDateKor(data.requestDate)}자로 퇴직금 지급을 요청합니다.`}
        today={today}
        signers={[{ label: "요청인", name: data.employeeName }]}
      />
    </A4Document>
  );
}

