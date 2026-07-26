import { motion } from 'motion/react'
import { MessageSquareText, ScanSearch, ListChecks, ShieldCheck } from 'lucide-react'
import { Reveal, easeOutExpo } from '@/components/shared/Reveal'

const steps = [
  {
    key: 'conversas',
    icon: MessageSquareText,
    title: 'Conversas',
    desc: 'Escribes o llamas como le hablarías a una persona. No hay menús ni formularios que aprender.',
    tile: 'glass text-ink',
  },
  {
    key: 'entiende',
    icon: ScanSearch,
    title: 'Entiende tu vida',
    desc: 'Un hijo que nace, un carro nuevo, una deuda que empieza. Secura lee lo que de verdad cambia tu riesgo.',
    tile: 'bg-ai-tint text-ai-deep',
  },
  {
    key: 'analiza',
    icon: ListChecks,
    title: 'Analiza y compara',
    desc: 'Cruza tu perfil con las reglas de Colsubsidio. Ajusta coberturas y precios contigo, en la misma conversación.',
    tile: 'bg-ai-tint text-ai-deep',
  },
  {
    key: 'protege',
    icon: ShieldCheck,
    title: 'Te deja protegido',
    desc: 'Resumen, valor mensual y solicitud emitida. Terminas asegurado, no en una lista de espera.',
    tile: 'bg-guardian-tint text-guardian-deep',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
          Cómo funciona
        </p>
        <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
          Diseñamos para conversar, no para llenar formularios.
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-pizarra">
          La conversación es la interfaz más natural que existe. El sistema se
          adapta a la persona, nunca al revés.
        </p>
      </Reveal>

      <div className="relative mt-16 sm:mt-20">
        {/* connector line — desktop */}
        <motion.div
          aria-hidden="true"
          className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-line lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
        {/* connector line — mobile */}
        <motion.div
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-6 w-px bg-line lg:hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.2 }}
          style={{ transformOrigin: 'top' }}
        />

        <ol className="grid gap-12 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.key} delay={0.15 + i * 0.14} className="relative">
              <li className="flex gap-5 lg:flex-col lg:gap-0">
                <div className="relative z-10 flex flex-col items-center">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line/60 ${s.tile}`}
                  >
                    <s.icon className="size-5" strokeWidth={2.2} />
                  </span>
                </div>
                <div className="lg:mt-6 lg:pr-2">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-pizarra">
                    {s.desc}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
