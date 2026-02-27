import { FadeUp, SectionLabel, SectionTitle } from "./SectionElements";

const principles = [
  { icon: "◐", title: "Не лечить — показывать", desc: "АМОС не даёт рекомендаций и не ставит диагнозов. Он предъявляет факт. Это не допрос — это приглашение к честности." },
  { icon: "⊘", title: "Не ломать — выворачивать", desc: "Маска не срывается — это было бы насилие. Она переворачивается изнанкой наружу. Человек сам решает, что с этим делать." },
  { icon: "◇", title: "Связь, а не оптимизация", desc: "Технология поддерживает присутствие, а не заменяет его. Каждый отчёт указывает на другого человека." },
];

const PrinciplesAndTech = () => (
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
);

export default PrinciplesAndTech;
