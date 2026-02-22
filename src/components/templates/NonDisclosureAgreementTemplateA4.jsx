import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function NonDisclosureAgreementTemplateA4({ data, today }) {
  return (
    <A4Document title="비밀유지서약서(NDA)" subtitle="업무상 비밀정보 보호 약정">
      <KeyValueTable
        rows={[
          { label: "정보제공자", value: valueOrDash(data.disclosingParty) },
          { label: "정보수령자", value: valueOrDash(data.receivingParty) },
          { label: "체결 목적", value: valueOrDash(data.purpose) },
          { label: "유효기간", value: valueOrDash(data.obligationPeriod) },
        ]}
      />

      <SectionBlock title="비밀정보 범위">
        <p className="whitespace-pre-line">{valueOrDash(data.confidentialScope)}</p>
      </SectionBlock>

      <SectionBlock title="의무 및 반환">
        <p>수령자는 제공자의 사전 서면 동의 없이 비밀정보를 제3자에게 제공하거나 목적 외 사용하지 않습니다.</p>
        <p>계약 종료 또는 요청 시 비밀정보 및 사본은 {valueOrDash(data.returnMethod)} 처리합니다.</p>
        <p>위반 책임: {valueOrDash(data.breachLiability)}</p>
      </SectionBlock>

      <SignatureArea
        statement={`체결일: ${formatDateKor(data.agreementDate)}`}
        today={today}
        signers={[
          { label: "정보제공자", name: data.disclosingParty },
          { label: "정보수령자", name: data.receivingParty },
        ]}
      />
    </A4Document>
  );
}

