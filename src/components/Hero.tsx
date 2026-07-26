import { motion } from 'motion/react'
import { ArrowUpRight, Phone } from 'lucide-react'
import { LiveConversation } from '@/components/LiveConversation'
import { easeOutExpo } from '@/components/shared/Reveal'
import { DEMO_URL } from '@/lib/links'

const indicators = [
  { value: '24/7', label: 'La protección no tiene horario' },
  { value: 'Cero', label: 'Formularios que llenar' },
  { value: '~30 s', label: 'De conversación a recomendación' },
  { value: 'Voz y chat', label: 'Donde la persona ya está' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* faint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_10%,transparent_70%)] opacity-40"
      />

      <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-5 pt-28 pb-10 sm:px-8 lg:pt-32">
        <div className="grid flex-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* left, sells */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.25 }}
              className="mb-6 font-mono text-[0.72rem] tracking-[0.16em] text-guardian uppercase"
            >
              Protección inteligente
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: easeOutExpo, delay: 0.35 }}
              className="max-w-[16ch] text-balance text-[2.5rem] leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-[3.25rem] lg:text-[3.6rem]"
            >
              Donde comienza una conversación, comienza la{' '}
              <span className="text-guardian">protección</span>.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.5 }}
              className="mt-7 max-w-[48ch] space-y-4 text-lg leading-relaxed text-pizarra"
            >
              <p className="font-medium text-ink">Secura no es otro chatbot.</p>
              <p>
                Es una forma distinta de proteger personas: escucha lo que pasa
                en tu vida, entiende qué está en riesgo y te acompaña hasta la
                decisión. Sin filas, sin esperas, sin formularios interminables.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.62 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-guardian px-8 text-[0.95rem] font-semibold text-carbon shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-guardian-deep active:translate-y-0"
              >
                Demo WhatsApp
                <ArrowUpRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://github.com/FilipaoVfx/landingHackaton30x"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full border border-guardian/40 bg-transparent px-8 text-[0.95rem] font-semibold text-guardian shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-guardian/10 active:translate-y-0"
              >
                <Phone className="size-[1.1rem]" />
                Demo Llamadas
                <ArrowUpRight className="size-[1.1rem] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-6 font-mono text-xs tracking-wide text-humo"
            >
              Sin registro. Conversación real. Recomendación explicada.
            </motion.p>
          </div>

          {/* right, proves */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.55 }}
          >
            <LiveConversation />
          </motion.div>
        </div>

        {/* indicators */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.95 }}
          className="mt-16 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4"
        >
          {indicators.map((item, i) => (
            <div
              key={item.label}
              className={
                'flex flex-col gap-1 md:px-8 ' +
                (i > 0 ? 'md:border-l md:border-line' : '') +
                (i === 0 ? 'md:pl-0' : '')
              }
            >
              <span className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {item.value}
              </span>
              <span className="text-sm text-humo">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
