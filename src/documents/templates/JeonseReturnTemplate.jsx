import { formatDateKor } from "../utils/date";

export default function JeonseReturnTemplate({ data, today }) {
  const contractEndDate = formatDateKor(data.contractEndDate);

  return (
    <article
      id="pdf-document"
      className="aspect-[210/297] w-full rounded-3xl border border-slate-200 bg-white p-6 text-[12.5px] leading-relaxed text-slate-900 shadow-soft sm:p-8 sm:text-[13px]"
    >
      <header className="text-center">
        <h2 className="text-[22px] font-bold tracking-[-0.03em]">내용증명</h2>
        <p className="mt-1 text-sm text-slate-500">(전세보증금 반환 촉구)</p>
      </header>

      <section className="mt-6 space-y-2 text-sm">
        <p>
          <span className="inline-block w-[64px] font-semibold">수신인</span>
          {data.receiverName} / {data.receiverAddress} / {data.receiverContact}
        </p>
        <p>
          <span className="inline-block w-[64px] font-semibold">발신인</span>
          {data.senderName} / {data.senderAddress} / {data.senderContact}
        </p>
      </section>

      <section className="mt-6 space-y-4">
        <h3 className="text-sm font-semibold">내용</h3>
        <p>
          본인은 수신인과 {contractEndDate}에 만료되는 전세계약을 체결하였으나, 현재까지 보증금{" "}
          <strong>{data.depositAmount}</strong>을 반환받지 못하고 있습니다.
        </p>
        <p>
          이에 본 내용증명을 발송하오니, 수신인은 본 서면 수령 후 지체 없이 위 보증금을 발신인에게
          반환하여 주시기 바랍니다.
        </p>
        <p>
          만일 상당한 기간 내 반환이 이루어지지 않을 경우, 발신인은 민·형사상 조치를 포함한 법적
          절차를 진행할 예정임을 알려드립니다.
        </p>
      </section>

      <section className="mt-10 text-right text-sm">
        <p>{today}</p>
        <p className="mt-3 font-semibold">{data.senderName} (인)</p>
      </section>
    </article>
  );
}
