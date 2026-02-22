import { formatDateKor } from "../utils/date";

export default function ResignationTemplate({ data, today }) {
  return (
    <article
      id="pdf-document"
      className="aspect-[210/297] w-full rounded-3xl border border-slate-200 bg-white p-6 text-[12.5px] leading-relaxed text-slate-900 shadow-soft sm:p-8 sm:text-[13px]"
    >
      <header className="text-center">
        <h2 className="text-[22px] font-bold tracking-[-0.03em]">사직서</h2>
      </header>

      <section className="mt-6 space-y-2 text-sm">
        <p>
          <span className="inline-block w-[70px] font-semibold">수신</span>
          {data.companyName} {data.recipientName}
        </p>
        <p>
          <span className="inline-block w-[70px] font-semibold">제출인</span>
          {data.department} / {data.position} / {data.employeeName}
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <p>
          본인은 개인 사정으로 인하여 {formatDateKor(data.resignationDate)}부로 사직하고자 하오니, 이를
          허락하여 주시기 바랍니다.
        </p>
        <p>
          사직 사유: <span className="whitespace-pre-line">{data.resignationReason}</span>
        </p>
      </section>

      <section className="mt-12 text-right text-sm">
        <p>{today}</p>
        <p className="mt-3 font-semibold">{data.employeeName} (인)</p>
      </section>
    </article>
  );
}
