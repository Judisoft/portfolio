import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MacOSWindow from './MacOSWindow'

const CONTACT_ITEMS = [
  {
    label: 'email',
    value: 'kumjude09@gmail.com',
    href: 'mailto:kumjude09@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'phone',
    value: '+1 (905) 962-2392',
    href: 'tel:+19059622392',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/kum-jude-bama',
    href: 'https://www.linkedin.com/in/kum-jude-bama-b73645226/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'location',
    value: 'Ancaster, ON, Canada',
    href: null,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function FormField({ label, id, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs text-[#006600] tracking-widest">
        <span className="text-[#004d00]">--</span> {label}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = form
    const mailto = `mailto:kumjude09@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailto
    setStatus('sent')
    setTimeout(() => setStatus(null), 4000)
  }

  const inputClass =
    'w-full bg-[#001a00] border border-[#003300] rounded px-4 py-3 text-[#00cc33] text-sm placeholder-[#003b00] focus:outline-none focus:border-[#00ff41]/50 focus:bg-[#001a00] transition-all duration-200'

  return (
    <section id="contact" className="section-pad relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#00ff41]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-[#004d00] text-xs tracking-widest uppercase mb-3">
            <span className="text-[#008f11]">//</span> let&apos;s_talk
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#00ff41] neon-text">
            Contact<span className="text-[#008f11]">()</span>
          </h2>
          <p className="text-[#006600] mt-4 max-w-md mx-auto text-xs leading-relaxed">
            <span className="text-[#004d00]">&gt;</span> Whether you have a project, a role, or just want to connect — I&apos;m always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <MacOSWindow title="contact.json" bodyClassName="px-5 py-4 space-y-4">
              <p className="text-[#004d00] text-xs mb-1">
                <span className="text-[#008f11]">$</span> cat contact.json
              </p>
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded glass border border-[#003300] flex items-center justify-center text-[#008f11] shrink-0 group-hover:border-[#00ff41]/40 group-hover:text-[#00ff41] transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#004d00]">&quot;{item.label}&quot;:</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-[#00cc33] text-xs hover:text-[#00ff41] hover:neon-text transition-colors"
                      >
                        &quot;{item.value}&quot;
                      </a>
                    ) : (
                      <p className="text-[#00cc33] text-xs">&quot;{item.value}&quot;</p>
                    )}
                  </div>
                </div>
              ))}
            </MacOSWindow>

            <MacOSWindow title="status.sh">
              <p className="text-xs text-[#004d00] mb-3">
                <span className="text-[#008f11]">$</span> status --check
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse shadow-sm shadow-[#00ff41]" />
                <span className="text-[#00cc33] text-xs">ONLINE — open to opportunities</span>
              </div>
              <p className="text-[#006600] text-xs mt-2 leading-relaxed">
                Available for full-time roles, contract work, consulting in backend / fintech engineering, and Product Development.
              </p>
            </MacOSWindow>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MacOSWindow title="send_message.sh" bodyClassName="px-5 py-4">
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-[#004d00] text-xs mb-1">
                  <span className="text-[#008f11]">$</span> ./send_message.sh
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="name" id="name">
                    <input id="name" name="name" value={form.name} onChange={handleChange}
                      placeholder="your_name" required className={inputClass} />
                  </FormField>
                  <FormField label="email" id="email">
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="you@example.com" required className={inputClass} />
                  </FormField>
                </div>

                <FormField label="subject" id="subject">
                  <input id="subject" name="subject" value={form.subject} onChange={handleChange}
                    placeholder="topic_here" className={inputClass} />
                </FormField>

                <FormField label="message" id="message">
                  <textarea id="message" name="message" value={form.message} onChange={handleChange}
                    rows={5} placeholder="// your message here..." required
                    className={`${inputClass} resize-none`} />
                </FormField>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#00ff41] text-black font-bold text-sm hover:bg-[#39ff14] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#00ff41]/20"
                >
                  {status === 'sent' ? '[OK] opening mail client...' : '> send_message()'}
                </button>

                <p className="text-xs text-[#004d00] text-center">
                  // opens your default mail client with the message pre-filled
                </p>
              </form>
            </MacOSWindow>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
