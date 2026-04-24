import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const JOBS = [
  {
    role: 'Software Engineer — Backend',
    company: 'Maviance GmbH',
    period: 'Sep 2024 – Present',
    location: 'Leipzig, Germany (Hybrid)',
    type: 'Full-Time',
    accent: '#00ff41',
    projects: [
      {
        name: 'Corporate Payment Service (CPS) — Customer & Wallet Management',
        bullets: [
          'Architected secure REST APIs for corporate customer accounts, multi-wallet configurations, and PSP integrations (MTN, Orange).',
          'Designed validation and security layers enforcing data integrity across thousands of wallet transactions.',
          'Optimised relational database models for efficient large-scale customer data retrieval.',
          'Authored comprehensive Swagger API documentation enabling seamless third-party integrations.',
          'Supported Jenkins CI/CD pipelines for continuous delivery into QA and acceptance environments.',
        ],
      },
      {
        name: 'Bulk Payment Service Optimisation',
        bullets: [
          'Re-engineered withdrawal fee computation algorithm — reduced processing time for 5,000+ records to under 15 seconds.',
          'Refactored database queries and introduced bulk-update mechanisms for large-scale payment runs.',
          'Strengthened error-handling and validation logic to preserve data integrity during high-volume batch operations.',
        ],
      },
    ],
    stack: ['Go', 'MySQL', 'Redis', 'Docker', 'Jenkins', 'Git', 'Linux'],
  },
  {
    role: 'Software Engineer (Full-Stack)',
    company: 'LogaXP',
    period: 'Nov 2023 – Aug 2024',
    location: 'Nashville, Tennessee, USA (Remote)',
    type: 'Full-Time',
    accent: '#39ff14',
    projects: [
      {
        name: 'Secure E-Signature Platform for PDF Documents',
        bullets: [
          'Designed end-to-end REST APIs for secure PDF signing, encrypted storage, and retrieval with full audit trail logging.',
          'Developed responsive front-end components for an intuitive, mobile-friendly digital signing experience.',
          'Optimised database schema for scalability and high-throughput audit trail generation.',
        ],
      },
      {
        name: 'Service Booking & Scheduling System',
        bullets: [
          'Built backend APIs for real-time booking management, cancellations, and schedule updates.',
          'Integrated third-party payment aggregator for in-app payment collections.',
          'Delivered automated notification and reminder workflows, measurably reducing missed appointments.',
        ],
      },
    ],
    stack: ['Node.js', 'Express.js', 'React.js', 'Redux', 'PostgreSQL', 'TailwindCSS', 'Git'],
  },
  {
    role: 'Software Engineer',
    company: 'Quizzy',
    period: 'Jan 2022 – Sep 2023',
    location: 'Yaoundé, Cameroon (Hybrid)',
    type: 'Full-Time',
    accent: '#00cc33',
    projects: [
      {
        name: 'Data-Driven Quiz & Assessment Platform (EdTech)',
        bullets: [
          'Designed and implemented the full relational database schema and persistence layer using Eloquent ORM.',
          'Developed and deployed 50+ REST API endpoints — quiz creation, assessment delivery, results reporting.',
          'Integrated real-time analytics modules enabling teachers to track student performance and generate insights.',
        ],
      },
    ],
    stack: ['PHP', 'Laravel', 'MySQL', 'Git', 'Bash'],
  },
  {
    role: 'Junior Web Developer',
    company: 'Nouvic Corporation',
    period: 'Jan 2020 – Nov 2023',
    location: 'Douala, Cameroon (Hybrid)',
    type: 'Part-Time',
    accent: '#00ff88',
    projects: [
      {
        name: 'Mobile Wallet & Cryptocurrency Platform ("Tily")',
        bullets: [
          'Collaborated with senior engineers to implement wallet funding flows and cryptocurrency purchase workflows.',
          'Delivered responsive UI improvements and resolved UX bugs across devices.',
          'Conducted QA testing to ensure reliable end-to-end transaction flows.',
        ],
      },
    ],
    stack: ['PHP', 'Laravel', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Git'],
  },
]

function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <div
          className="w-4 h-4 rounded-full border-2 mt-1.5 shrink-0 shadow-lg"
          style={{ borderColor: job.accent, boxShadow: `0 0 12px ${job.accent}60` }}
        />
        {index < JOBS.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${job.accent}40, transparent)` }} />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 mb-10">
        <button
          className="w-full text-left glass rounded p-6 border border-[#003300] hover:border-[#00ff41]/30 transition-all duration-300 group"
          onClick={() => setExpanded(!expanded)}
          style={{ boxShadow: expanded ? `0 0 25px ${job.accent}15` : undefined }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#00ff41] text-base group-hover:neon-text transition-all duration-200">
                {job.role}
              </h3>
              <p className="font-semibold mt-0.5 text-sm" style={{ color: job.accent }}>
                {job.company}
              </p>
              <p className="text-xs text-[#006600] mt-1">{job.location}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-[#008f11] bg-[#001a00] border border-[#003300] px-3 py-1 rounded">
                {job.period}
              </span>
              <span className="text-xs text-[#006600]">{job.type}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {job.stack.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-xs"
                style={{ color: job.accent, background: `${job.accent}10`, border: `1px solid ${job.accent}30` }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-[#004d00]">
            <span className="text-[#006600]">{expanded ? '[-] hide' : '[+] expand'}</span>
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </button>

        {/* Expanded projects */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-4 pl-2">
                {job.projects.map((p) => (
                  <div key={p.name} className="glass rounded p-5 border border-[#003300]">
                    <p className="text-xs font-bold mb-3" style={{ color: job.accent }}>
                      &gt; {p.name}
                    </p>
                    <ul className="space-y-2">
                      {p.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-[#008f11] flex gap-2.5 leading-relaxed">
                          <span className="text-[#004d00] mt-0.5 shrink-0">--</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="section-pad relative">
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-[#004d00] text-xs tracking-widest uppercase mb-3">
            <span className="text-[#008f11]">//</span> my_journey
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ff41] neon-text">
            Experience<span className="text-[#008f11]">{}</span>
          </h2>
        </motion.div>

        <div>
          {JOBS.map((job, i) => (
            <JobCard key={job.company} job={job} index={i} />
          ))}
        </div>

        {/* Education strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 rounded-xl overflow-hidden border border-[#00ff41]/20"
          style={{ boxShadow: '0 0 30px rgba(0,255,65,0.08), 0 8px 32px rgba(0,0,0,0.5)' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-[#00ff41]/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto text-xs text-[#006600] tracking-widest">education.log</span>
          </div>
          {/* Body */}
          <div className="bg-[#0a0a0a] px-5 py-4 space-y-3">
            <p className="text-[#004d00] text-xs mb-1">
              <span className="text-[#008f11]">$</span> cat education.log
            </p>
            {[
              { title: 'Professional Certificate in Software Engineering', org: 'ALX Africa', period: '2022 – 2023' },
              { title: 'General Engineering Studies', org: 'ENSPT Yaoundé / University of Padova, Italy', period: '2017 – 2019' },
              { title: 'Bachelor of Science in Physics', org: 'University of Yaoundé I', period: 'Graduated 2016' },
            ].map((e) => (
              <div key={e.title} className="flex flex-wrap justify-between gap-2 text-xs">
                <div>
                  <span className="text-[#00cc33]">{e.title}</span>
                  <span className="text-[#004d00] ml-2">:: {e.org}</span>
                </div>
                <span className="text-[#006600]">{e.period}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
