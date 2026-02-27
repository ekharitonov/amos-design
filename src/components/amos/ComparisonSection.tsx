import { FadeUp, SectionLabel, SectionTitle, SectionDesc } from "./SectionElements";

const rows = [
  ["Источник данных", "Опросы, анкеты, 360°", "Реальные коммуникации"],
  ["Что показывает", "Мнения людей о культуре", "Саму культуру"],
  ["Частота", "Раз в квартал / год", "Непрерывно"],
  ["Глубина", "Типология, средние баллы", "Маски, разрывы, мосты"],
  ["Результат", "Рекомендации", "Предъявление реальности"],
  ["Связь с другими", "Индивидуальный отчёт", "Каждый отчёт указывает на другого"],
];

const ComparisonSection = () => (
  <section className="section-padding bg-card border-t border-b border-border">
    <div className="container">
      <FadeUp>
        <SectionLabel>Позиционирование</SectionLabel>
        <SectionTitle>Не ещё один HR-бот</SectionTitle>
        <SectionDesc>
          Существующие инструменты измеряют удовлетворённость. АМОС измеряет реальность&nbsp;— видит живую культуру команды и&nbsp;корректирует её в&nbsp;моменте. Ни&nbsp;один HR&#8209;инструмент на рынке на это не&nbsp;способен.
        </SectionDesc>
      </FadeUp>
      <FadeUp delay={0.15}>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse text-[0.92em]">
            <thead>
              <tr>
                {["Параметр", "Типичные инструменты", "АМОС"].map((h, i) => (
                  <th key={h} className={`font-mono-brand text-[0.75em] tracking-widest uppercase text-muted-foreground text-left py-3.5 px-4 border-b border-border font-medium ${i === 0 ? "pl-0 w-[28%]" : i === 2 ? "w-[36%]" : "w-[36%]"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="py-4 px-4 pl-0 border-b border-border font-medium align-top leading-relaxed">{row[0]}</td>
                  <td className="py-4 px-4 border-b border-border text-text-dim align-top leading-relaxed">{row[1]}</td>
                  <td className="py-4 px-4 border-b border-border text-primary font-medium align-top leading-relaxed">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeUp>
    </div>
  </section>
);

export default ComparisonSection;
