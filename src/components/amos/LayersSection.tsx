import { FadeUp, SectionLabel, SectionTitle, SectionDesc } from "./SectionElements";

const layers = [
  {
    num: "I",
    title: "Маски",
    tag: "Что ты говоришь vs что за этим стоит",
    desc: "AI анализирует всё, что участник писал, говорил, делал — и сопоставляет с заявленными целями. Результат: конкретные маски с доказательствами. Не «ты интроверт», а «ты говоришь про открытость, но за 3 месяца ни разу не задал вопрос коллеге».",
  },
  {
    num: "II",
    title: "ОСНОВА",
    tag: "Шесть параметров реального вклада",
    desc: "Ориентация на результат. Совесть. Надёжность. Организованность. Верность слову. Амбиции. Каждый балл — не абстрактная оценка, а наблюдение из реального поведения.",
  },
  {
    num: "III",
    title: "Мосты",
    tag: "Кто компенсирует твою слабость — и ты его",
    desc: "Алгоритм находит пары: где провал у одного и пик у другого — там мост. Три элемента: что ты даёшь этому человеку, что получаешь, и где между вами напряжение.",
  },
];

const LayersSection = () => (
  <section className="section-padding bg-card border-t border-b border-border">
    <div className="container">
      <FadeUp>
        <SectionLabel>Продукт диагностики</SectionLabel>
        <SectionTitle>Изнанка: три слоя правды</SectionTitle>
        <SectionDesc>
          Каждый участник получает персональный отчёт. Не психологический профиль, не типология — зеркало, собранное из реальных данных.
        </SectionDesc>
      </FadeUp>
      <div className="flex flex-col gap-8 mt-12">
        {layers.map((l, i) => (
          <FadeUp key={l.num} delay={i * 0.12}>
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-7 items-start bg-card border border-border rounded-2xl p-9 transition-colors hover:border-accent-dim">
              <div className="font-display text-5xl font-bold leading-none text-gradient-gold-vertical text-center md:text-center">
                {l.num}
              </div>
              <div>
                <h3 className="font-display text-[1.3em] font-bold mb-1.5">{l.title}</h3>
                <span className="font-mono-brand text-[0.72em] text-primary tracking-wider mb-3 block">{l.tag}</span>
                <p className="text-[0.95em] text-text-dim leading-relaxed">{l.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

export default LayersSection;
