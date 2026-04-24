import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-[#004d00] text-xs tracking-widest uppercase mb-3">
            <span className="text-[#008f11]">//</span> who_i_am
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ff41] neon-text">
            About<span className="text-[#008f11]">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-10 lg:gap-12 items-start">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-56 lg:w-full">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#00ff41]/30 to-[#008f11]/10 blur-md" />
              <div className="relative rounded-2xl overflow-hidden border border-[#00ff41]/30"
                style={{ boxShadow: '0 0 30px rgba(0,255,65,0.15)' }}>
                <img
                  src="/photos/profile.png"
                  alt="Kum Jude Bama"
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '3/4' }}
                />
                {/* Scanline overlay on photo */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
                  }}
                />
              </div>
              {/* Terminal label */}
              <p className="text-center text-[#004d00] text-xs mt-2 font-mono">
                <span className="text-[#008f11]">&gt;</span> kum_jude_bama.jpg
              </p>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="min-w-0 space-y-5 text-[#008f11] leading-relaxed text-sm break-words"
          >
            <p>
              <span className="text-[#004d00]">&gt;</span> I&apos;m a{' '}
              <span className="text-[#00ff41]">Software Engineer</span> with 5+ years of
              experience specialising in backend systems and financial technology.
            </p>
            <p>
              <span className="text-[#004d00]">&gt;</span> Currently at{' '}
              <span className="text-[#00ff41]">Maviance GmbH</span> in Leipzig, Germany — architecting
              corporate payment services, optimising bulk transaction pipelines, and integrating
              multi-provider payment ecosystems (MTN, Orange, and others).
            </p>
            <p>
              <span className="text-[#004d00]">&gt;</span> My foundation in{' '}
              <span className="text-[#39ff14]">Physics &amp; Mathematics</span> sharpens how I approach
              systems design.
            </p>
            <p>
              <span className="text-[#004d00]">&gt;</span> Outside engineering: mentoring junior
              developers and drawing on a background as a Physics educator.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Go (Golang)', 'PHP / Laravel / Phalcon', 'Python', 'ReactJS', 'Node.js', 'PostgreSQL', 'MySql', 'Redis', 'Docker', 'AWS', 'NodeRed', 'Kibana'].map((t) => (
                <span key={t} className="px-3 py-1 rounded glass neon-border text-[#00ff41] text-xs">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="mailto:kumjude09@gmail.com"
                className="px-6 py-2.5 rounded bg-[#00ff41] text-black text-sm font-bold hover:bg-[#39ff14] hover:scale-105 transition-all"
              >
                &gt; contact()
              </a>
              <a
                href="https://www.linkedin.com/in/kum-jude-bama-b73645226/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded neon-border text-[#00ff41] text-sm font-bold hover:bg-[#00ff41]/8 transition-colors"
              >
                ./linkedin
              </a>
            </div>
          </motion.div>

          {/* Code block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="min-w-0"
          >
            <div className="glass neon-border rounded p-6">
              <p className="text-[#004d00] text-xs mb-3">
                <span className="text-[#008f11]">$</span> cat current_stack.go
              </p>
              <pre className="text-xs text-[#008f11] leading-6 overflow-x-auto">
                <code>{`var stack = Stack{
  Primary:   "Go (Gin)",
  Database:  "MySQL + Redis",
  DevOps:    "Docker + Jenkins",
  Messaging: "NodeRed",
  Observ:    "Kibana",
  Location:  "Leipzig, DE",
  Status:    `}<span className="text-[#00ff41]">&quot;Open to Opportunities&quot;</span>{`,
}`}</code>
              </pre>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
