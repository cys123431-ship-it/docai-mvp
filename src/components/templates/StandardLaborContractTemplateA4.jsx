import { formatDateKor } from "../../documents/utils/date";
import { A4Document, KeyValueTable, SectionBlock, SignatureArea, valueOrDash } from "./TemplatePrimitives";

export default function StandardLaborContractTemplateA4({ data, today }) {
  const contractPeriod = data.endDate
    ? `${formatDateKor(data.startDate)} ~ ${formatDateKor(data.endDate)}`
    : `${formatDateKor(data.startDate)}부터 기간의 정함 없음`;

  return (
    <A4Document title="표준 근로계약서" subtitle="근로기준법 제17조에 따른 근로조건 명시">
      <KeyValueTable
        rows={[
          { label: "사용자", value: `${valueOrDash(data.employerName)} / ${valueOrDash(data.employerAddress)}` },
          { label: "근로자", value: `${valueOrDash(data.employeeName)} / ${valueOrDash(data.employeeAddress)}` },
          { label: "계약 형태", value: data.contractType },
          { label: "계약 기간", value: contractPeriod },
        ]}
      />

      <SectionBlock title="1. 근로장소 및 업무">
        <p>근로장소: {valueOrDash(data.workplace)}</p>
        <p>담당업무: {valueOrDash(data.jobDescription)}</p>
      </SectionBlock>

      <SectionBlock title="2. 근로시간 및 휴일">
        <p>근무일: {valueOrDash(data.workDays)}</p>
        <p>근무시간: {valueOrDash(data.workHours)}</p>
        <p>주휴일: {valueOrDash(data.weeklyHoliday)}</p>
      </SectionBlock>

      <SectionBlock title="3. 임금">
        <p>기본임금: {valueOrDash(data.wageAmount)}</p>
        <p>임금지급일: 매월 {valueOrDash(data.payDay)}일</p>
        <p>임금은 근로자 명의 계좌 이체 또는 당사자 합의 방식으로 지급한다.</p>
      </SectionBlock>

      <SignatureArea
        statement={`본 계약은 ${formatDateKor(data.contractDate)}에 작성되었으며, 당사자는 계약 내용을 확인 후 서명한다.`}
        today={today}
        signers={[
          { label: "사용자", name: data.employerName },
          { label: "근로자", name: data.employeeName },
        ]}
      />
    </A4Document>
  );
}

