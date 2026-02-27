import { motion } from "framer-motion";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono-brand text-[0.7em] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-4">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight mb-5">
    {children}
  </h2>
);

const SectionDesc = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[1.05em] text-text-dim max-w-[640px] leading-relaxed mb-12">
    {children}
  </p>
);

export { SectionLabel, SectionTitle, SectionDesc };

export const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);
