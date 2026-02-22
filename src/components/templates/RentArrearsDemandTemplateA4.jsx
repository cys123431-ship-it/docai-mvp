import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function RentArrearsDemandTemplateA4({ data, today }) {
  return (
    <A4Document title="월세 미납 독촉 내용증명" subtitle="연체 월세 납부 최고 통지">
      <KeyValueTable
        rows={[
          { label: "임대인", value: `${valueOrDash(data.senderName)} / ${valueOrDash(data.senderContact)}` },
          { label: "임차인", value: valueOrDash(data.receiverName) },
          { label: "임차주택", value: valueOrDash(data.propertyAddress) },
          { label: "미납 개월", value: valueOrDash(data.unpaidMonths) },
          { label: "미납 금액", value: valueOrDash(data.unpaidAmount) },
        ]}
      />

      <SectionBlock title="독촉 내용">
        <p>상기 월세가 현재까지 미납되어 계약상 의무를 이행하지 않은 상태입니다.</p>
        <p>본 내용증명 수령일로부터 {valueOrDash(data.deadlineDays)}일 이내 아래 계좌로 납부하시기 바랍니다.</p>
      </SectionBlock>

      <SectionBlock title="납부 계좌 및 후속 조치">
        <p>납부 계좌: {valueOrDash(data.remittanceAccount)}</p>
        <p>기한 내 미납 시 계약 해지 및 명도 청구 등 민·형사상 절차를 진행할 수 있습니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`발송일: ${formatDateKor(data.noticeDate)}`}
        today={today}
        signers={[{ label: "임대인", name: data.senderName }]}
      />
    </A4Document>
  );
}

