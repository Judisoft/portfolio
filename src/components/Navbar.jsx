import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-[#00ff41]/15 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-bold text-[#00ff41] neon-text tracking-widest"
        >
          &gt; KJB<span className="animate-blink">_</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => handleLink(l.href)}
                className="text-sm text-[#008f11] hover:text-[#00ff41] hover:neon-text transition-colors duration-200"
              >
                <span className="text-[#004d00] mr-1">./</span>{l.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="mailto:kumjude09@gmail.com"
              className="text-sm px-4 py-2 rounded neon-border text-[#00ff41] hover:bg-[#00ff41]/10 transition-colors duration-200"
            >
              [hire_me]
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#00ff41] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#00ff41] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#00ff41] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#00ff41]/15 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleLink(l.href)}
                    className="text-[#008f11] hover:text-[#00ff41] transition-colors w-full text-left py-1"
                  >
                    <span className="text-[#004d00] mr-1">$</span> {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="mailto:kumjude09@gmail.com"
                  className="text-[#00ff41] font-bold"
                  onClick={() => setOpen(false)}
                >
                  [hire_me]
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
