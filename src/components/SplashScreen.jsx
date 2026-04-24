import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const ASCII_NAME = ` _  __  _   _  __  __      _ _   _ ____  _____   ____    _    __  __    _
| |/ / | | | ||  \\/  |    | | | | |  _ \\| ____| | __ )  / \\  |  \\/  |  / \\
| ' /  | | | || |\\/| | _  | | | | | | | |  _|   |  _ \\ / _ \\ | |\\/| | / _ \\
| . \\  | |_| || |  | || |_| | |_| | |_| | |___  | |_) / ___ \\| |  | |/ ___ \\
|_|\\_\\  \\___/ |_|  |_| \\___/  \\___/|____/|_____|  |____/_/   \\_\\_|  |_/_/   \\_\\`

const BOOT_LINES = [
  { text: '> Initializing KJB.Portfolio v1.0 ...', color: '#004d00', delay: 900 },
  { text: '> Loading modules .................. [OK]', color: '#006600', delay: 1400 },
  { text: '> Mounting filesystem .............. [OK]', color: '#006600', delay: 1900 },
  { text: '> Authenticating profile ........... [OK]', color: '#008f11', delay: 2400 },
  { text: '> Starting services ................ [OK]', color: '#008f11', delay: 2900 },
  { text: '', delay: 3300 },
  { text: '  [ SYSTEM READY ]', color: '#00ff41', delay: 3700, glow: true },
]

const PROMPT_DELAY = 4300

export default function SplashScreen({ onEnter }) {
  const [visibleLines, setVisibleLines] = useState(new Set())
  const [showPrompt, setShowPrompt] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(prev => new Set([...prev, i])), line.delay)
    )
    timers.push(setTimeout(() => setShowPrompt(true), PROMPT_DELAY))
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleContinue = useCallback(() => {
    if (!showPrompt || exiting) return
    setExiting(true)
    setTimeout(onEnter, 550)
  }, [showPrompt, exiting, onEnter])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Enter') handleContinue() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleContinue])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center px-6 cursor-pointer"
      onClick={handleContinue}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
        }}
      />

      <div className="relative max-w-2xl w-full font-mono">
        {/* ASCII name */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[#00ff41] leading-tight mb-8 overflow-x-auto"
          style={{ fontSize: '7px', textShadow: '0 0 8px rgba(0,255,65,0.65)' }}
        >
          {ASCII_NAME}
        </motion.pre>

        {/* Boot lines */}
        <div className="space-y-1.5 mb-8">
          {BOOT_LINES.map((line, i) =>
            visibleLines.has(i) ? (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs"
                style={{
                  color: line.color || '#004d00',
                  textShadow: line.glow ? '0 0 14px rgba(0,255,65,0.9)' : undefined,
                  fontWeight: line.glow ? 'bold' : undefined,
                  letterSpacing: line.glow ? '0.15em' : undefined,
                }}
              >
                {line.text}
              </motion.p>
            ) : null
          )}
        </div>

        {/* Enter prompt */}
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 flex-wrap text-sm text-[#00cc33]"
          >
            <span>Press</span>
            <kbd className="border border-[#00ff41]/60 text-[#00ff41] px-2 py-0.5 text-xs rounded tracking-widest">
              ENTER
            </kbd>
            <span>to continue</span>
            <span className="text-[#004d00] text-xs ml-1">// tap anywhere on mobile</span>
            <span className="animate-blink text-[#00ff41] ml-1 text-base">_</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
