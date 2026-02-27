import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-drift pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, hsla(43,56%,54%,0.04) 0%, transparent 50%),
                        radial-gradient(ellipse at 20% 80%, hsla(213,47%,57%,0.03) 0%, transparent 40%)`
        }}
      />

      <motion.div
        className="relative z-10 max-w-[800px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className="font-mono-brand text-[0.72em] font-medium tracking-[0.2em] uppercase text-primary bg-primary/10 border border-accent-dim px-5 py-1.5 rounded-full inline-block mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Homo Amans Space · Tech
        </motion.span>

        <motion.h1
          className="font-display text-[clamp(2.8rem,6vw,5rem)] font-bold tracking-tight leading-none mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className="text-gradient-gold">АМОС</span>
        </motion.h1>

        <motion.p
          className="font-display text-[clamp(1.1rem,2.5vw,1.5rem)] italic text-text-dim mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          AI-проводник, который видит культуру<br />через поведение, а не через опросы
        </motion.p>

        <motion.p
          className="text-[1.08em] text-text-dim max-w-[560px] mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          АМОС анализирует реальные коммуникации команды — не анкеты, не мнения, а&nbsp;то, что люди делают каждый день. И&nbsp;показывает то, что обычно невидимо: маски, разрывы, настоящие связи.
        </motion.p>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2.5 px-9 py-3.5 bg-primary text-primary-foreground font-semibold text-[0.95em] tracking-wide rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:glow-accent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Запросить демо →
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Hero;
