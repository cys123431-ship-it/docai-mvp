import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function WageArrearsNoticeTemplateA4({ data, today }) {
  return (
    <A4Document title="임금체불 내용증명" subtitle="체불임금 지급 최고 통지">
      <KeyValueTable
        rows={[
          {
            label: "발신인",
            value: `${valueOrDash(data.senderName)} / ${valueOrDash(data.senderAddress)} / ${valueOrDash(data.senderContact)}`,
          },
          {
            label: "수신인",
            value: `${valueOrDash(data.receiverName)} / ${valueOrDash(data.receiverCompany)} / ${valueOrDash(data.receiverAddress)}`,
          },
          { label: "체불 기간", value: valueOrDash(data.arrearsPeriod) },
          { label: "체불 금액", value: valueOrDash(data.arrearsAmount) },
        ]}
      />

      <SectionBlock title="청구 내용">
        <p>귀하가 지급하여야 할 임금이 현재까지 지급되지 않아 본 내용증명을 발송합니다.</p>
        <p>본 서면 수령일로부터 {valueOrDash(data.demandDeadlineDays)}일 이내 체불임금 전액을 지급해주시기 바랍니다.</p>
      </SectionBlock>

      <SectionBlock title="안내 사항">
        <p>기한 내 미지급 시 고용노동부 진정 및 민사상 청구 등 법적 절차를 진행할 수 있습니다.</p>
        <p>지급 완료 시 임금명세서 및 지급내역을 함께 교부해주시기 바랍니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`발송일: ${formatDateKor(data.noticeDate)}`}
        today={today}
        signers={[{ label: "발신인", name: data.senderName }]}
      />
    </A4Document>
  );
}

