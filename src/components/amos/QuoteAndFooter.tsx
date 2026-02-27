import { FadeUp } from "./SectionElements";

const QuoteAndFooter = () => (
  <>
    <div className="text-center py-20 border-t border-border">
      <FadeUp>
        <blockquote className="font-display text-[clamp(1.3rem,2.5vw,1.8rem)] italic max-w-[680px] mx-auto mb-5 leading-relaxed px-6">
          «Опросы измеряют то, что люди готовы сказать.<br />АМОС измеряет то, что люди делают.»
        </blockquote>
        <p className="text-[0.88em] text-muted-foreground">Homo Amans Space</p>
      </FadeUp>
    </div>

    <footer id="contact" className="text-center py-16 border-t border-border">
      <div className="font-display text-xl font-bold text-primary mb-2">АМОС</div>
      <p className="text-[0.85em] text-muted-foreground">AI-проводник для команд и сообществ</p>
      <p className="text-[0.85em] text-muted-foreground mt-1">Homo Amans Space · Tech Vertical · 2026</p>
      <div className="flex justify-center gap-7 mt-5">
        {[
          { label: "Написать нам", href: "mailto:hello@homoamans.space" },
          { label: "Запросить демо", href: "#" },
          { label: "Telegram", href: "#" },
        ].map(link => (
          <a key={link.label} href={link.href} className="text-[0.85em] text-text-dim border-b border-transparent transition-all hover:text-primary hover:border-primary">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  </>
);

export default QuoteAndFooter;
