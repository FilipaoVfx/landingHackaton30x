import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoMark } from '@/components/shared/LogoMark'
import { BrandLogo } from '@/components/shared/BrandLogo'

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#motor', label: 'El motor' },
  { href: '#canales', label: 'Canales' },
  { href: '#confianza', label: 'Confianza' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass-nav' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Secura, inicio">
          <LogoMark className="size-8" />
          <span className="text-[0.95rem] font-semibold tracking-tight">Secura</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-pizarra transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Quién está detrás, sin ruido: una placa por marca. */}
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="text-[0.7rem] text-humo">Para</span>
            <BrandLogo name="colsubsidio" className="h-7 w-16" />
            <span className="text-[0.7rem] text-humo">por</span>
            <BrandLogo name="30x" className="size-7" />
          </div>
          <button
            className="inline-flex size-9 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-nav overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[0.95rem] text-pizarra transition-colors hover:bg-cloud hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-2.5 px-3 pt-3 border-t border-line">
                <span className="text-[0.7rem] text-humo">Para</span>
                <BrandLogo name="colsubsidio" className="h-7 w-16" />
                <span className="text-[0.7rem] text-humo">por</span>
                <BrandLogo name="30x" className="size-7" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
