import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MacOSWindow from './MacOSWindow'

const AWARDS = [
  {
    file: 'star_award_01.log',
    label: 'Star Award #1',
    date: 'Mar 2026',
    image: '/photos/cert2.png',
    recognition:
      'For your exceptional dedication by working diligently on the integration and documentation of the CPS ERP connector, while effectively resolving multiple bugs in the Partner API. In addition to your core deliverables, you have been highly proactive and supportive, consistently making yourself available to assist the rest of the team whenever needed.',
  },
  {
    file: 'star_award_02.log',
    label: 'Star Award #2',
    date: '2025',
    image: '/photos/cert1.jpeg',
    recognition:
      'For your fast onboarding on the Bulkpayment service and the Implementation of an approach to optimize withdrawal fees calculation with the Maviance Utility Service.',
    technical: {
      title: 'Optimising Bulk Operations in a Microservices Architecture',
      problem: 'The microservice processed thousands of records for bulk payment operations but suffered from three primary bottlenecks: scalability constraints, network latency overhead, and database performance issues from sequential per-record operations.',
      solutions: [
        {
          heading: 'Bulk External Service Lookup — One-to-Many Paradigm',
          bullets: [
            'Original design issued N HTTP requests for N records, causing O(N) network round-trips and poor throughput.',
            'Designed a new bulk lookup endpoint accepting a batch of record identifiers and returning all auxiliary data (fee structures, validation metadata) in a single response.',
            'Reduced network round-trips from O(N) to O(1) for the entire lookup phase.',
          ],
        },
        {
          heading: 'Atomic Bulk Database Updates with Conditional Logic',
          bullets: [
            'Replaced N individual UPDATE queries with a single SQL UPDATE using CASE expressions inside a transaction.',
            'Atomicity guarantees all-or-nothing consistency — critical for financial data integrity; any failure triggers a full rollback.',
            'RDBMS query planners (MySQL) leverage index lookups on the IN clause, making the approach inherently scalable.',
            'Eliminated excessive I/O and lock contention caused by per-record database writes.',
          ],
        },
      ],
    },
  },
]

function CertModal({ src, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center px-4 cursor-zoom-out"
      onClick={onClose}
    >
      <motion.img
        src={src}
        alt="Certificate of Recognition"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-2xl w-full rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-[#00ff41] text-xs border border-[#00ff41]/40 px-3 py-1 rounded hover:bg-[#00ff41]/10 transition-colors"
      >
        [×] close
      </button>
    </motion.div>
  )
}

function AwardCard({ award, index }) {
  const [lightbox, setLightbox] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
      >
        <MacOSWindow
          title={award.file}
          titleColor="#00ff41"
          style={{ boxShadow: '0 0 30px rgba(0,255,65,0.1), 0 8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Certificate thumbnail */}
            <button
              onClick={() => setLightbox(true)}
              className="shrink-0 w-full sm:w-36 rounded-lg overflow-hidden border border-[#00ff41]/20 hover:border-[#00ff41]/50 transition-colors group relative"
              aria-label="View certificate"
            >
              <img
                src={award.image}
                alt="Certificate of Recognition"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[#00ff41] text-xs border border-[#00ff41]/60 px-2 py-0.5 rounded">
                  [view]
                </span>
              </div>
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00ff41] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-[#00ff41] font-bold text-sm">{award.label}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded border border-[#00ff41]/30 text-[#008f11] bg-[#00ff41]/5">
                  Maviance GmbH
                </span>
                <span className="text-xs text-[#004d00] ml-auto">{award.date}</span>
              </div>

              <p className="text-[#004d00] text-xs mb-1">
                <span className="text-[#008f11]">$</span> cat recognition.txt
              </p>
              <p className="text-xs text-[#008f11] leading-relaxed">
                <span className="text-[#004d00]">&gt;</span> {award.recognition}
              </p>

              {award.technical && (
                <div className="mt-4">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-xs text-[#006600] hover:text-[#00ff41] transition-colors"
                  >
                    <span>{expanded ? '[-] hide technical breakdown' : '[+] technical breakdown'}</span>
                    <motion.svg
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-3 h-3"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
                        <div className="mt-3 space-y-3">
                          <div className="glass border border-[#003300] rounded p-3">
                            <p className="text-xs text-[#004d00] mb-1.5">
                              <span className="text-[#008f11]">//</span> {award.technical.title}
                            </p>
                            <p className="text-xs text-[#006600] leading-relaxed">{award.technical.problem}</p>
                          </div>
                          {award.technical.solutions.map((s) => (
                            <div key={s.heading} className="glass border border-[#003300] rounded p-3">
                              <p className="text-xs font-bold text-[#00ff41] mb-2">
                                &gt; {s.heading}
                              </p>
                              <ul className="space-y-1.5">
                                {s.bullets.map((b, i) => (
                                  <li key={i} className="flex gap-2 text-xs text-[#008f11] leading-relaxed">
                                    <span className="text-[#004d00] shrink-0 mt-0.5">--</span>
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
              )}
            </div>
          </div>
        </MacOSWindow>
      </motion.div>

      <AnimatePresence>
        {lightbox && <CertModal src={award.image} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="achievements" className="section-pad relative">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-[#004d00] text-xs tracking-widest uppercase mb-3">
            <span className="text-[#008f11]">//</span> recognition
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ff41] neon-text">
            Awards<span className="text-[#008f11]">★</span>
          </h2>
          <p className="text-[#006600] text-xs mt-5 max-w-md mx-auto leading-relaxed">
            <span className="text-[#004d00]">&gt;</span> Recognised twice by Maviance GmbH with the{' '}
            <span className="text-[#00ff41]">Star Award</span> for outstanding performance and contribution.
          </p>
        </motion.div>

        <div className="space-y-6">
          {AWARDS.map((a, i) => (
            <AwardCard key={a.file} award={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
