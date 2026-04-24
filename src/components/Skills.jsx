import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MacOSWindow from './MacOSWindow'

const SKILL_GROUPS = [
  {
    category: 'Languages',
    prefix: 'lang',
    color: '#00ff41',
    glow: 'rgba(0,255,65,0.12)',
    skills: [
      { name: 'Go (Golang)',          level: 92 },
      { name: 'PHP',                  level: 88 },
      { name: 'JavaScript / Node.js', level: 85 },
      { name: 'Python',               level: 70 },
    ],
  },
  {
    category: 'Frameworks',
    prefix: 'fw',
    color: '#39ff14',
    glow: 'rgba(57,255,20,0.10)',
    skills: [
      { name: 'Laravel',     level: 90 },
      { name: 'Gin (Go)',    level: 88 },
      { name: 'Express.js',  level: 84 },
      { name: 'React.js',    level: 72 },
      { name: 'Flask',       level: 65 },
    ],
  },
  {
    category: 'Databases',
    prefix: 'db',
    color: '#00cc33',
    glow: 'rgba(0,204,51,0.10)',
    skills: [
      { name: 'MySQL',      level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis',      level: 82 },
      { name: 'MongoDB',    level: 72 },
      { name: 'SQLite',     level: 75 },
    ],
  },
  {
    category: 'DevOps & Tools',
    prefix: 'ops',
    color: '#00ff88',
    glow: 'rgba(0,255,136,0.10)',
    skills: [
      { name: 'Docker',          level: 88 },
      { name: 'Git',             level: 93 },
      { name: 'Jenkins / CI-CD', level: 80 },
      { name: 'Linux (Ubuntu)',  level: 85 },
      { name: 'Swagger/Postman', level: 88 },
    ],
  },
]

function SkillBar({ name, level, delay, color }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-xs text-[#006600]">
        <span>{name}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-[#001a00] rounded-full overflow-hidden border border-[#003300]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}

function GroupCard({ category, prefix, color, glow, skills, cardDelay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: cardDelay }}
    >
      <MacOSWindow
        title={`${category.toLowerCase()}.sh`}
        titleColor={color}
        style={{ boxShadow: `0 0 30px ${glow}, 0 8px 32px rgba(0,0,0,0.5)` }}
      >
        <p className="text-[#004d00] text-xs mb-4">
          <span className="text-[#008f11]">$</span> {prefix}@kum-jude-bama:~$ <span style={{ color }}>ls {category.toLowerCase()}/</span>
        </p>
        <div className="space-y-3.5">
          {skills.map((s, i) => (
            <SkillBar key={s.name} {...s} delay={cardDelay + i * 0.07} color={color} />
          ))}
        </div>
      </MacOSWindow>
    </motion.div>
  )
}


export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="section-pad relative">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-[#004d00] text-xs tracking-widest uppercase mb-3">
            <span className="text-[#008f11]">//</span> what_i_build_with
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ff41] neon-text">
            Skills<span className="text-[#008f11]">[]</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {SKILL_GROUPS.map((g, i) => (
            <GroupCard key={g.category} {...g} cardDelay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  )
}
