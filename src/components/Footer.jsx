export default function Footer() {
  return (
    <footer className="border-t border-[#003300] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] neon-text font-bold">&gt; KJB_</span>
          <span className="text-[#003300]">|</span>
          <span className="text-[#006600] text-xs">Software Engineer</span>
        </div>

        <p className="text-[#004d00] text-xs text-center">
          © {new Date().getFullYear()} Kum Jude Bama &nbsp;·&nbsp; React + Three.js + TailwindCSS
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/kum-jude-bama-b73645226/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#006600] hover:text-[#00ff41] transition-colors text-xs"
          >
            ./linkedin
          </a>
          <a href="mailto:kumjude09@gmail.com" className="text-[#006600] hover:text-[#00ff41] transition-colors text-xs">
            ./email
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#006600] hover:text-[#00ff41] transition-colors"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
