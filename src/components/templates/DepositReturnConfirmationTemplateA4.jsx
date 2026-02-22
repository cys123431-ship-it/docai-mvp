import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function DepositReturnConfirmationTemplateA4({ data, today }) {
  return (
    <A4Document title="보증금 반환 확인서" subtitle="임대차 종료에 따른 정산 확인">
      <KeyValueTable
        rows={[
          { label: "임대인", value: valueOrDash(data.landlordName) },
          { label: "임차인", value: valueOrDash(data.tenantName) },
          { label: "목적물 주소", value: valueOrDash(data.propertyAddress) },
          { label: "반환 보증금", value: valueOrDash(data.depositAmount) },
          { label: "반환일", value: formatDateKor(data.returnDate) },
          { label: "지급 방식", value: valueOrDash(data.paymentMethod) },
        ]}
      />

      <SectionBlock title="확인 내용">
        <p>임대인은 상기 보증금을 임차인에게 반환하였고, 임차인은 이를 확인합니다.</p>
        <p>당사자는 보증금 반환과 관련하여 별도 분쟁이 없음을 확인합니다.</p>
      </SectionBlock>

      <SectionBlock title="비고">
        <p className="whitespace-pre-line">{data.specialNotes?.trim() ? data.specialNotes : "해당사항 없음."}</p>
      </SectionBlock>

      <SignatureArea
        statement={`확인일: ${formatDateKor(data.confirmationDate)}`}
        today={today}
        signers={[
          { label: "임대인", name: data.landlordName },
          { label: "임차인", name: data.tenantName },
        ]}
      />
    </A4Document>
  );
}

