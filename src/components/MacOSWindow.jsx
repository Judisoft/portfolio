import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MacOSWindow({ title, children, className, style, bodyClassName, titleColor }) {
  const [state, setState] = useState('open')
  const isClosed = state === 'closed'
  const isMinimized = state === 'minimized'
  const isCollapsed = isClosed || isMinimized

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
        isClosed ? 'border-[#00ff41]/10 opacity-50' : 'border-[#00ff41]/20'
      } ${className || ''}`}
      style={{ boxShadow: '0 0 30px rgba(0,255,65,0.08), 0 8px 32px rgba(0,0,0,0.5)', ...style }}
    >
      {/* Title bar */}
      <div
        className={`flex items-center gap-2 px-4 py-2.5 border-b border-[#00ff41]/10 transition-colors duration-300 ${
          isClosed ? 'bg-[#111]' : 'bg-[#1a1a1a]'
        }`}
      >
        {/* Red — close */}
        <button
          onClick={() => setState(isClosed ? 'open' : 'closed')}
          className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 active:scale-75 transition-all cursor-pointer shrink-0 focus:outline-none"
          aria-label="Close"
        />
        {/* Yellow — minimize */}
        <button
          onClick={() => setState(isMinimized ? 'open' : 'minimized')}
          className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-125 active:scale-75 transition-all cursor-pointer shrink-0 focus:outline-none"
          aria-label="Minimize"
        />
        {/* Green — restore/maximize */}
        <button
          onClick={() => setState('open')}
          className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-125 active:scale-75 transition-all cursor-pointer shrink-0 focus:outline-none"
          aria-label="Restore"
        />
        <span
          className={`mx-auto text-xs tracking-widest transition-all duration-300 select-none ${
            isClosed ? 'opacity-30 line-through' : ''
          }`}
          style={{
            color: titleColor || '#006600',
            cursor: isCollapsed ? 'pointer' : 'default',
          }}
          onClick={() => isCollapsed && setState('open')}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={`bg-[#0a0a0a] ${bodyClassName || 'px-5 py-4'}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
