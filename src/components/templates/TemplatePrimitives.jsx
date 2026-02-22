export const valueOrDash = (value) => {
  if (typeof value !== "string") {
    return "-";
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "-";
};

export function A4Document({ title, subtitle, children }) {
  return (
    <article
      id="pdf-document"
      className="aspect-[210/297] w-full rounded-3xl border border-slate-300 bg-white p-6 text-[12px] leading-relaxed text-slate-900 shadow-soft sm:p-8"
    >
      <header className="border-[1.5px] border-slate-900 px-5 py-4 text-center">
        <p className="text-[11px] tracking-[0.22em] text-slate-600">DOCAI OFFICIAL FORM</p>
        <h2 className="mt-1 text-[22px] font-bold tracking-[0.08em]">{title}</h2>
        {subtitle ? <p className="mt-1 text-[11.5px] text-slate-700">{subtitle}</p> : null}
      </header>
      {children}
    </article>
  );
}

export function KeyValueTable({ rows }) {
  return (
    <section className="mt-4 border-[1.5px] border-slate-900">
      <table className="w-full border-collapse text-[11.5px]">
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.label}-${index}`} className={index < rows.length - 1 ? "border-b border-slate-900" : ""}>
              <th className="w-[102px] border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                {row.label}
              </th>
              <td className="px-3 py-2 whitespace-pre-line">{valueOrDash(row.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function SectionBlock({ title, children }) {
  return (
    <section className="mt-4 border-[1.5px] border-slate-900">
      <div className="border-b border-slate-900 bg-slate-100 px-3 py-2 text-[11.5px] font-semibold">{title}</div>
      <div className="space-y-2 px-3 py-3 text-[11.5px]">{children}</div>
    </section>
  );
}

export function SignatureArea({ statement, today, signers }) {
  return (
    <section className="mt-5 border-[1.5px] border-slate-900 px-4 py-4 text-[11px]">
      {statement ? <p>{statement}</p> : null}
      <div className="mt-4 text-right">
        <p>{today}</p>
        <div className="mt-2 space-y-1">
          {signers.map((signer) => (
            <p key={signer.label}>
              {signer.label}: {valueOrDash(signer.name)} (인)
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

