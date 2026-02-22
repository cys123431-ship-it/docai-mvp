export default function ResumeTemplate({ data, today }) {
  return (
    <article
      id="pdf-document"
      className="aspect-[210/297] w-full rounded-3xl border border-slate-200 bg-white p-6 text-[12.5px] leading-relaxed text-slate-900 shadow-soft sm:p-8 sm:text-[13px]"
    >
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-[22px] font-bold tracking-[-0.03em]">표준 이력서</h2>
        <p className="mt-1 text-sm text-slate-500">
          {data.fullName} | {data.phone} | {data.email}
        </p>
      </header>

      <section className="mt-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">희망 직무</p>
          <p>{data.targetRole}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">총 경력</p>
          <p>{data.careerYears}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">주요 경력 및 프로젝트</p>
          <p className="whitespace-pre-line">{data.majorExperience}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">최종 학력</p>
          <p>{data.education}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">보유 기술</p>
          <p className="whitespace-pre-line">{data.skills}</p>
        </div>
      </section>

      <section className="mt-8 text-right text-sm">
        <p>작성일: {today}</p>
      </section>
    </article>
  );
}
