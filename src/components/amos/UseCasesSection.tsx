import { FadeUp, SectionLabel, SectionTitle } from "./SectionElements";

const cases = [
  { tag: "B2B · Culture Audit", tagClass: "bg-amos-blue/15 text-amos-blue border-amos-blue/25", title: "Диагностика корпоративной культуры", desc: "Финансовый департамент хочет перейти от «полиции бюджета» к бизнес-партнёрам. АМОС за 4–6 недель покажет, какая культура существует на самом деле." },
  { tag: "B2B · Leadership Offsite", tagClass: "bg-primary/10 text-primary border-accent-dim", title: "Подготовка к командному выезду", desc: "Участники получают Изнанку за неделю до ретрита. Они уже знают свои маски и мосты. Каждый вопрос на выезде — адресный." },
  { tag: "Executive Program", tagClass: "bg-amos-purple/12 text-amos-purple border-amos-purple/25", title: "Трансформация лидеров", desc: "6-месячная программа для C-level. АМОС фиксирует эволюцию участника: меняются ли паттерны после сессий? Снимаются ли маски?" },
  { tag: "Сообщество", tagClass: "bg-amos-green/12 text-amos-green border-amos-green/25", title: "Здоровье сообщества в реальном времени", desc: "Для закрытых профессиональных сообществ: мониторинг глубины разговоров, связанности, тишины. Лидер видит, чем живут люди." },
];

const UseCasesSection = () => (
  <section className="section-padding">
    <div className="container">
      <FadeUp>
        <SectionLabel>Применение</SectionLabel>
        <SectionTitle>Четыре контекста использования</SectionTitle>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
        {cases.map((c, i) => (
          <FadeUp key={c.title} delay={i * 0.08}>
            <div className="border border-border rounded-xl p-7 bg-card transition-all hover:border-accent-dim hover:bg-secondary h-full">
              <span className={`font-mono-brand text-[0.68em] tracking-widest uppercase px-2.5 py-1 rounded border inline-block mb-3.5 ${c.tagClass}`}>
                {c.tag}
              </span>
              <h3 className="font-display text-[1.05em] font-bold mb-2">{c.title}</h3>
              <p className="text-[0.88em] text-text-dim leading-relaxed">{c.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
