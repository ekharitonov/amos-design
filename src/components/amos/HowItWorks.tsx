import { FadeUp, SectionLabel, SectionTitle, SectionDesc } from "./SectionElements";

const cells = [
  { icon: "◎", title: "Insight", desc: "Что происходит? AI-индексация каждого сообщения: темы, глубина, паттерны поведения, эволюция разговоров. Не ключевые слова — контекст и смысл.", color: "bg-primary/10 border-accent-dim" },
  { icon: "⟷", title: "Matching", desc: "Кто с кем? Автоматическое выявление реальных связей, мостов между подразделениями и разрывов, которые не видны в оргструктуре.", color: "bg-amos-blue/15 border-amos-blue/30" },
  { icon: "◆", title: "Dialogue", desc: "Как говорить? Скальпель-вопросы, которые вскрывают разрыв между декларируемым и реальным. Не терапия — предъявление факта.", color: "bg-amos-green/12 border-amos-green/30" },
  { icon: "⊙", title: "Ritual", desc: "Как встретиться? Подготовка к подлинным разговорам через AI-интервью. Участник приходит на встречу уже зная свои слепые зоны.", color: "bg-amos-purple/12 border-amos-purple/30" },
];

const HowItWorks = () => (
  <section className="section-padding">
    <div className="container">
      <FadeUp>
        <SectionLabel>Как работает</SectionLabel>
        <SectionTitle>Четыре движка одной системы</SectionTitle>
        <SectionDesc>
          АМОС — не чат-бот и не HR-платформа. Это аналитическая система, которая непрерывно читает коммуникации команды и превращает их в карту реальной культуры.
        </SectionDesc>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden mt-12">
        {cells.map((c, i) => (
          <FadeUp key={c.title} delay={i * 0.08}>
            <div className="bg-card p-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 border ${c.color}`}>
                {c.icon}
              </div>
              <h3 className="font-display text-[1.1em] font-bold mb-2.5">{c.title}</h3>
              <p className="text-[0.9em] text-text-dim leading-relaxed">{c.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
