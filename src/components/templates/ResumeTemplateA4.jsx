export default function ResumeTemplateA4({ data, today }) {
  const skills = (data.skills ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <article
      id="pdf-document"
      className="a4-document w-full rounded-3xl border border-slate-300 bg-white p-6 text-[12px] leading-relaxed text-slate-900 shadow-soft sm:p-8"
    >
      <header className="border-[1.5px] border-slate-900 px-5 py-4 text-center">
        <p className="text-[11px] tracking-[0.25em] text-slate-600">DOCAI STANDARD FORM</p>
        <h2 className="mt-1 text-[24px] font-bold tracking-[0.12em]">표 준 이 력 서</h2>
      </header>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <table className="w-full border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-slate-900">
              <th className="w-[90px] border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                성명
              </th>
              <td className="border-r border-slate-900 px-3 py-2 font-semibold">{data.fullName}</td>
              <th className="w-[90px] border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                지원 직무
              </th>
              <td className="px-3 py-2">{data.targetRole}</td>
            </tr>
            <tr>
              <th className="border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                연락처
              </th>
              <td className="border-r border-slate-900 px-3 py-2">{data.phone}</td>
              <th className="border-r border-slate-900 bg-slate-100 px-3 py-2 text-left font-semibold">
                이메일
              </th>
              <td className="px-3 py-2">{data.email}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <div className="border-b border-slate-900 bg-slate-100 px-3 py-2 text-[11.5px] font-semibold">
          1. 핵심 경력 요약
        </div>
        <div className="min-h-[90px] px-3 py-3">
          <p className="whitespace-pre-line">{data.majorExperience}</p>
        </div>
      </section>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <div className="border-b border-slate-900 bg-slate-100 px-3 py-2 text-[11.5px] font-semibold">
          2. 학력 및 자격
        </div>
        <div className="min-h-[48px] px-3 py-3">
          <p>{data.education}</p>
        </div>
      </section>

      <section className="mt-4 break-inside-avoid border-[1.5px] border-slate-900">
        <div className="border-b border-slate-900 bg-slate-100 px-3 py-2 text-[11.5px] font-semibold">
          3. 핵심 역량
        </div>
        <div className="min-h-[70px] px-3 py-3">
          {skills.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="rounded-full border border-slate-400 px-2.5 py-1 text-[11px]">
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
      </section>

      <section className="mt-5 break-inside-avoid border-[1.5px] border-slate-900 px-4 py-4 text-[11px]">
        <p>상기 기재한 사항은 사실과 다름없음을 확인합니다.</p>
        <div className="mt-4 text-right">
          <p>{today}</p>
          <p className="mt-2 font-semibold">작성자: {data.fullName} (서명)</p>
        </div>
      </section>
    </article>
  );
}
