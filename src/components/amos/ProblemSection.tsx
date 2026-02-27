import { FadeUp, SectionLabel, SectionTitle, SectionDesc } from "./SectionElements";

const problems = [
  {
    num: "01",
    title: "Маски не снимаются по запросу",
    desc: "В анкете сотрудник напишет «всё хорошо». В чате с коллегой — пожалуется на абсурд процессов. АМОС видит второе.",
  },
  {
    num: "02",
    title: "Связи не равны оргструктуре",
    desc: "Формальная иерархия — одно. Кто реально влияет на решения, к кому идут за советом, кто мост между силосами — другое.",
  },
  {
    num: "03",
    title: "Разрыв между словами и делами невидим",
    desc: "Компания декларирует «инновации», но продвигает тех, кто не делает ошибок. Этот разрыв убивает культуру.",
  },
];

const ProblemSection = () => (
  <section className="section-padding bg-card border-t border-b border-border">
    <div className="container">
      <FadeUp>
        <SectionLabel>Проблема</SectionLabel>
        <SectionTitle>
          Опросы показывают мнения.<br />Культура живёт в поведении.
        </SectionTitle>
        <SectionDesc>
          Вы провели eNPS, 360°, пульс-опрос. Получили цифры. Но между цифрами и реальностью — пропасть. Люди отвечают то, что безопасно. Настоящая культура — в том, о чём молчат.
        </SectionDesc>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {problems.map((p, i) => (
          <FadeUp key={p.num} delay={i * 0.1}>
            <div className="bg-surface border border-border rounded-xl p-8 transition-colors hover:border-border-light h-full">
              <div className="font-display text-[2.4em] font-bold text-accent-dim/40 leading-none mb-4">{p.num}</div>
              <h3 className="font-display text-[1.15em] font-bold mb-2.5">{p.title}</h3>
              <p className="text-[0.92em] text-text-dim leading-relaxed">{p.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
