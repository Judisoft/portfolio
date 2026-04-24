import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StarField from '../three/StarField'
import MacOSWindow from './MacOSWindow'

const CMD    = 'cat work.json | grep "Kum Jude Bama"'
const RESULT = '"Kum Jude Bama" : "Software Engineer"'

function TerminalCommand() {
  const [cmdText, setCmdText]       = useState('')
  const [typing, setTyping]         = useState(true)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    let timer

    const run = (initialDelay) => {
      let i = 0
      setCmdText('')
      setTyping(true)
      setShowResult(false)

      const typeChar = () => {
        if (i < CMD.length) {
          setCmdText(CMD.slice(0, i + 1))
          i++
          timer = setTimeout(typeChar, 65)
        } else {
          setTyping(false)
          // show result after 1s
          timer = setTimeout(() => {
            setShowResult(true)
            // pause on result then restart
            timer = setTimeout(() => run(0), 3000)
          }, 1000)
        }
      }

      timer = setTimeout(typeChar, initialDelay)
    }

    run(1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-left space-y-1 text-sm md:text-base">
      <div>
        <span className="text-[#004d00]">KJB@portfolio:~$&nbsp;</span>
        <span className="text-[#00cc33]">{cmdText}</span>
        {typing && <span className="animate-blink text-[#00ff41]">_</span>}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="text-[#00ff41] neon-text"
        >
          {RESULT}
        </motion.div>
      )}
    </div>
  )
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Star field */}
      <div className="absolute inset-0">
        <StarField />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="mb-8 flex justify-center">
          <MacOSWindow
            title="portfolio — terminal"
            className="w-full max-w-xl"
            style={{ boxShadow: '0 0 40px rgba(0,255,65,0.1), 0 20px 60px rgba(0,0,0,0.6)' }}
            bodyClassName="px-5 pt-4 pb-5"
          >
            <p className="text-[#008f11] text-xs mb-3">
              <span className="text-[#004d00]">KJB@portfolio:~$</span> ./init
            </p>
            <pre
              className="text-[#00ff41] leading-tight mb-4 overflow-x-auto"
              style={{ fontSize: '8px', textShadow: '0 0 6px rgba(0,255,65,0.55)' }}
            >{` _  __  _   _  __  __      _ _   _ ____  _____   ____    _    __  __    _
| |/ / | | | ||  \\/  |    | | | | |  _ \\| ____| | __ )  / \\  |  \\/  |  / \\
| ' /  | | | || |\\/| | _  | | | | | | | |  _|   |  _ \\ / _ \\ | |\\/| | / _ \\
| . \\  | |_| || |  | || |_| | |_| | |_| | |___  | |_) / ___ \\| |  | |/ ___ \\
|_|\\_\\  \\___/ |_|  |_| \\___/  \\___/|____/|_____|  |____/_/   \\_\\_|  |_/_/   \\_\\`}</pre>
            <div className="border-t border-[#003300] mb-3" />
            <TerminalCommand />
          </MacOSWindow>
        </motion.div>

        <motion.p variants={item} className="text-[#006600] max-w-xl mx-auto mb-10 text-sm leading-relaxed">
          <span className="text-[#004d00]">/*</span> 5+ years building scalable, maintainable, and secure backend systems,
          high-volume payment infrastructure in Fintech.<span className="text-[#004d00]">*/</span>
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded bg-[#00ff41] text-black font-bold hover:bg-[#39ff14] hover:scale-105 transition-all duration-200 shadow-lg shadow-[#00ff41]/25"
          >
            &gt; get_in_touch()
          </button>
          <button
            onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded neon-border text-[#00ff41] font-bold hover:bg-[#00ff41]/8 hover:scale-105 transition-all duration-200"
          >
            &gt; view_work()
          </button>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="flex justify-center gap-6 mt-10">
          <a
            href="https://linkedin.com/in/kum-jude-bama"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#004d00] hover:text-[#00ff41] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="mailto:kumjude09@gmail.com"
            className="text-[#004d00] hover:text-[#00ff41] transition-colors duration-200"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#004d00] tracking-widest uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00ff41]/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
