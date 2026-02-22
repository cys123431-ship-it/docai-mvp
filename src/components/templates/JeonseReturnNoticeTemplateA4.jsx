import { formatDateKor } from "../../documents/utils/date";

export default function JeonseReturnNoticeTemplateA4({ data, today }) {
  const contractEndDate = formatDateKor(data.contractEndDate);
  const paymentDeadlineDays = data.paymentDeadlineDays || "7";
  const receiverContact = data.receiverContact?.trim() ? data.receiverContact : "-";

  return (
    <article
      id="pdf-document"
      className="a4-document w-full rounded-3xl border border-slate-300 bg-white p-6 text-[12px] leading-relaxed text-slate-900 shadow-soft sm:p-8"
    >
      <header className="border-[1.5px] border-slate-900 px-5 py-4 text-center">
        <p className="text-[11px] tracking-[0.2em] text-slate-600">DOCAI CERTIFIED FORMAT</p>
        <h2 className="mt-1 text-[24px] font-bold tracking-[0.08em]">내 용 증 명</h2>
        <p className="mt-1 text-[12px] font-medium text-slate-700">(전세보증금 반환 청구)</p>
      </header>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <table className="w-full border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-slate-900">
              <th className="w-[95px] border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                수신인
              </th>
              <td className="px-3 py-2">
                {data.receiverName} / {data.receiverAddress} / {receiverContact}
              </td>
            </tr>
            <tr>
              <th className="border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                발신인
              </th>
              <td className="px-3 py-2">
                {data.senderName} / {data.senderAddress} / {data.senderContact}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <div className="border-b border-slate-900 bg-slate-100 px-3 py-2 text-[11.5px] font-semibold">
          청구 취지
        </div>
        <div className="space-y-2 px-3 py-3 text-[11.5px]">
          <p>
            귀하와 체결한 임대차계약(임차주택: {data.propertyAddress})은 {contractEndDate}에 종료되었습니다.
          </p>
          <p>
            계약 종료로 인해 반환되어야 할 전세보증금은 <span className="font-semibold">{data.depositAmount}</span>
            입니다.
          </p>
          <p>
            본 내용증명 수령일로부터 <span className="font-semibold">{paymentDeadlineDays}일 이내</span>에 위
            보증금 전액을 발신인에게 지급해주시기 바랍니다.
          </p>
        </div>
      </section>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <div className="border-b border-slate-900 bg-slate-100 px-3 py-2 text-[11.5px] font-semibold">
          안내 사항
        </div>
        <div className="space-y-2 px-3 py-3 text-[11.5px]">
          <p>1. 본 서면은 전세보증금 반환을 정식으로 최고하기 위한 내용증명입니다.</p>
          <p>2. 기한 내 반환이 이루어지지 않을 경우, 임차권등기명령 및 민사소송 등 법적 절차를 진행할 수 있습니다.</p>
          <p>3. 추가 분쟁 방지를 위해 서면 또는 계좌이체 내역으로 지급 사실을 남겨주시기 바랍니다.</p>
        </div>
      </section>

      <section className="mt-6 break-inside-avoid border-[1.5px] border-slate-900 px-4 py-4 text-[11px] text-right">
        <p>{today}</p>
        <p className="mt-3 font-semibold">발신인: {data.senderName} (인)</p>
      </section>
    </article>
  );
}
