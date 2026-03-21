import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function HamburgerIcon({ open }) {
  const common = 'block h-[2px] w-6 bg-[#c7d2ff]'
  return (
    <span aria-hidden="true" className="relative inline-block h-5 w-6">
      <span
        className={`${common} absolute top-0 left-0 transition-transform ${
          open ? 'rotate-45 translate-y-[6px]' : ''
        }`}
      />
      <span
        className={`${common} absolute top-[6px] left-0 transition-opacity ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`${common} absolute top-[12px] left-0 transition-transform ${
          open ? '-rotate-45 translate-y-[-6px]' : ''
        }`}
      />
    </span>
  )
}

export function HeaderNav({ activeId, sections, onNavigate }) {
  const [open, setOpen] = useState(false)

  const items = useMemo(() => sections, [sections])

  return (
    <>
      <header className="fixed top-[2px] left-0 right-0 z-[70] bg-[#06060e] border-b border-[#8ea0ff]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => onNavigate(items[0]?.id)}
            className="flex items-center gap-3"
            aria-label="Go to top"
          >
            <span
              className="flex h-9 w-9 items-center justify-center border border-[#8ea0ff] bg-[#c7d2ff] text-[#06060e] font-bold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {items[0]?.logoText || 'IU'}
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-2">
            {items.map((s) => {
              const isActive = s.id === activeId
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onNavigate(s.id)}
                  className={[
                    'px-3 py-2 border border-[#8ea0ff] font-semibold',
                    isActive ? 'bg-[#c7d2ff] text-[#06060e]' : 'bg-[#0c0c18] text-[#f0f0f8]',
                  ].join(' ')}
                >
                  {s.label}
                </button>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center"
            aria-label="Open menu"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </header>

      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] bg-[#06060e]"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#8ea0ff]">
            <span className="font-bebas text-[#c7d2ff] text-2xl">MENU</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3 py-2 border border-[#8ea0ff] bg-[#0c0c18]"
            >
              CLOSE
            </button>
          </div>

          <div className="px-5 py-6 flex flex-col gap-3">
            {items.map((s) => {
              const isActive = s.id === activeId
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onNavigate(s.id)
                  }}
                  className={[
                    'px-3 py-3 border border-[#8ea0ff] font-semibold text-left',
                    isActive ? 'bg-[#c7d2ff] text-[#06060e]' : 'bg-[#0c0c18] text-[#f0f0f8]',
                  ].join(' ')}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </motion.div>
      ) : null}
    </>
  )
}

