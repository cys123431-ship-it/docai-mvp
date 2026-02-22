import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function LeaseTerminationNoticeTemplateA4({ data, today }) {
  return (
    <A4Document title="임대차계약 해지 통보서" subtitle="주택임대차계약 종료 의사 통지">
      <KeyValueTable
        rows={[
          {
            label: "발신인(임차인)",
            value: `${valueOrDash(data.senderName)} / ${valueOrDash(data.senderContact)}`,
          },
          {
            label: "수신인(임대인)",
            value: `${valueOrDash(data.receiverName)} / ${valueOrDash(data.receiverContact)}`,
          },
          { label: "임차주택", value: valueOrDash(data.propertyAddress) },
          { label: "계약 만료일", value: formatDateKor(data.leaseEndDate) },
        ]}
      />

      <SectionBlock title="통보 내용">
        <p>발신인은 임대차계약을 {valueOrDash(data.terminationReason)} 사유로 종료하고자 합니다.</p>
        <p>발신인은 {formatDateKor(data.moveOutDate)}에 목적물을 인도할 예정입니다.</p>
      </SectionBlock>

      <SectionBlock title="요청 사항">
        <p>임대인은 명도 완료일 기준으로 보증금 정산 및 반환 절차를 진행해주시기 바랍니다.</p>
        <p>상호 분쟁 방지를 위해 정산 내역을 서면으로 확인합니다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`통보일: ${formatDateKor(data.noticeDate)}`}
        today={today}
        signers={[{ label: "발신인", name: data.senderName }]}
      />
    </A4Document>
  );
}

