import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MacOSWindow from './MacOSWindow'

const PROJECTS = [
  {
    name: 'Njangi Ballot App',
    file: 'njangi_ballot.js',
    accent: '#00ff41',
    glow: 'rgba(0,255,65,0.12)',
    link: 'https://ballot-app.onrender.com/',
    stack: ['React', 'Node.js', 'MySQL', 'Docker'],
    summary:
      "A web application that redefines the balloting process for 'Njangi' groups — a West African communal savings practice where members pool funds and take turns as beneficiaries.",
    what: "\"Njangi\" is a Cameroonian institution where individuals form a group that meets regularly to save and raise money for mutual benefit. Members go through a ballot to decide the order of beneficiaries. As mobile money (MTN MoMo, Orange Money) brought Njangi to younger generations, the need for a digital, trustworthy ballot system emerged.",
    features: [
      { label: 'Reliability', desc: 'Ensures a seamless, trustworthy balloting experience with no single point of failure.' },
      { label: 'Transparency', desc: 'Every member has full visibility into the entire balloting procedure — no black box.' },
      { label: 'Ease of Use', desc: 'User-friendly interface built for Njangi members of all technical backgrounds.' },
      { label: 'Security', desc: 'Robust measures safeguard data and make the system resistant to manipulation or bias.' },
      { label: 'Efficiency', desc: 'Automates the ballot process entirely — results generated instantly, no manual effort.' },
      { label: 'Accessibility', desc: 'Web-based — accessible from any device, anywhere, at any time.' },
    ],
  },
  {
    name: 'URL Parser',
    file: 'url_parser.py',
    accent: '#39ff14',
    glow: 'rgba(57,255,20,0.10)',
    link: null,
    stack: ['Python', 'HTML', 'CSS'],
    summary:
      'A tool that crawls a given URL, extracts all internal links, and reports the reachability status of each — useful for detecting broken links and site health checks.',
    features: [
      { label: 'Link Extraction', desc: 'Parses the target page and collects all internal href links.' },
      { label: 'Status Checking', desc: 'Sends HTTP requests to each discovered link and reports the status code.' },
      { label: 'Broken Link Detection', desc: 'Clearly flags unreachable or error-returning links for easy triage.' },
    ],
  },
  {
    name: 'French Tutor App',
    file: 'french_tutor.js',
    accent: '#00cc33',
    glow: 'rgba(0,204,51,0.10)',
    link: null,
    wip: true,
    stack: ['React', 'Node.js', 'MySQL'],
    summary:
      'A personal booking application for users seeking to learn French — enabling students to browse availability, schedule sessions, and manage their learning appointments.',
    features: [
      { label: 'Session Booking', desc: 'Students can browse tutor availability and book learning sessions in real time.' },
      { label: 'Appointment Management', desc: 'Full CRUD for bookings — reschedule or cancel sessions with ease.' },
      { label: 'User Accounts', desc: 'Authenticated profiles for both tutor and students to track session history.' },
    ],
  },
]

function FeatureList({ features, accent }) {
  return (
    <ul className="space-y-2 mt-3">
      {features.map((f) => (
        <li key={f.label} className="flex gap-2.5 text-xs leading-relaxed">
          <span className="text-[#004d00] mt-0.5 shrink-0">--</span>
          <span>
            <span className="font-semibold" style={{ color: accent }}>{f.label}:</span>{' '}
            <span className="text-[#008f11]">{f.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <MacOSWindow
        title={project.file}
        titleColor={project.accent}
        style={{ boxShadow: `0 0 30px ${project.glow}, 0 8px 32px rgba(0,0,0,0.5)` }}
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-sm" style={{ color: project.accent }}>
                {project.name}
              </h3>
              {project.wip && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#ffbd2e]/50 text-[#ffbd2e] bg-[#ffbd2e]/10 tracking-widest">
                  WIP
                </span>
              )}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#006600] hover:text-[#00ff41] transition-colors mt-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                live demo
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-xs"
                style={{ color: project.accent, background: `${project.accent}10`, border: `1px solid ${project.accent}30` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-[#008f11] leading-relaxed mb-3">
          <span className="text-[#004d00]">&gt;</span> {project.summary}
        </p>

        {/* What is Njangi blurb */}
        {project.what && expanded && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass border border-[#003300] rounded p-3 mb-3">
                <p className="text-xs text-[#004d00] mb-1">
                  <span className="text-[#008f11]">//</span> what_is_njangi
                </p>
                <p className="text-xs text-[#006600] leading-relaxed">{project.what}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Features toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs text-[#006600] hover:text-[#00ff41] transition-colors mt-1"
        >
          <span>{expanded ? '[-] hide details' : '[+] show details'}</span>
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <FeatureList features={project.features} accent={project.accent} />
            </motion.div>
          )}
        </AnimatePresence>
      </MacOSWindow>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" className="section-pad relative">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-[#004d00] text-xs tracking-widest uppercase mb-3">
            <span className="text-[#008f11]">//</span> what_i've_built
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ff41] neon-text">
            Projects<span className="text-[#008f11]">/</span>
          </h2>
          <p className="text-[#006600] text-xs mt-5 max-w-lg mx-auto leading-relaxed">
            <span className="text-[#004d00]">/*</span>{' '}
            Most of my work is professional contribution to proprietary systems and cannot be linked here.
            Below are side projects I&apos;m proud of.{' '}
            <span className="text-[#004d00]">*/</span>
          </p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
