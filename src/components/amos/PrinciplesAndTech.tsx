import { FadeUp, SectionLabel, SectionTitle } from "./SectionElements";

const principles = [
  { icon: "◐", title: "Не лечить — показывать", desc: "АМОС не даёт рекомендаций и не ставит диагнозов. Он предъявляет факт. Это не допрос — это приглашение к честности." },
  { icon: "⊘", title: "Не ломать — выворачивать", desc: "Маска не срывается — это было бы насилие. Она переворачивается изнанкой наружу. Человек сам решает, что с этим делать." },
  { icon: "◇", title: "Связь, а не оптимизация", desc: "Технология поддерживает присутствие, а не заменяет его. Каждый отчёт указывает на другого человека." },
];

const tags = ["Telegram", "Slack", "Корп. мессенджеры", "Claude API", "Knowledge Graph", "Obsidian", "GitHub", "RAG Pipeline"];

const PrinciplesAndTech = () => (
  <>
    <section className="section-padding bg-card border-t border-b border-border">
      <div className="container">
        <FadeUp>
          <SectionLabel>Принципы</SectionLabel>
          <SectionTitle>Философия продукта</SectionTitle>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {principles.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1}>
              <div className="text-center p-8">
                <span className="text-[1.6em] block mb-4">{p.icon}</span>
                <h4 className="font-display text-base font-bold mb-2">{p.title}</h4>
                <p className="text-[0.85em] text-text-dim leading-relaxed">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <FadeUp>
          <SectionLabel>Архитектура</SectionLabel>
          <SectionTitle>Технологическая основа</SectionTitle>
          <p className="text-[1.05em] text-text-dim max-w-[640px] leading-relaxed mb-6">
            АМОС работает там, где живёт ваша команда. Не требует миграции на новую платформу.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap gap-2.5 mt-6">
            {tags.map(t => (
              <span key={t} className="font-mono-brand text-[0.72em] tracking-wider px-3.5 py-1.5 rounded-md bg-surface border border-border text-text-dim">
                {t}
              </span>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-8 p-7 bg-card border border-border rounded-xl">
            <p className="text-[0.92em] text-text-dim leading-relaxed">
              <strong className="text-foreground">Поток данных:</strong> Коммуникации команды → AI-индексатор → Граф знаний → Изнанка → Аналитика для лидера.
            </p>
            <p className="text-[0.88em] text-muted-foreground mt-3">
              Все данные остаются в вашем контуре. АМОС не хранит содержание сообщений — только структурные метаданные и аналитику.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  </>
);

export default PrinciplesAndTech;
