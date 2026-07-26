import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Check, Cog, ShieldCheck, User } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { easeOutExpo } from '@/components/shared/Reveal'

type Entry =
  | { kind: 'user'; text: string }
  | { kind: 'ia'; text: string }
  | { kind: 'event'; label: string; value: string }
  | { kind: 'tool'; label: string }
  | { kind: 'profile'; label: string; value: string }
  | { kind: 'rec'; label: string; value: string; confidence: number }

const script: Entry[] = [
  { kind: 'user', text: 'Hola.' },
  { kind: 'ia', text: 'Hola, soy Secura. Cuéntame qué está pasando en tu vida y vemos qué vale la pena proteger.' },
  { kind: 'user', text: 'Nació mi hija hace dos meses.' },
  { kind: 'event', label: 'Evento de vida', value: 'Nacimiento' },
  { kind: 'tool', label: 'Consultando reglas de Colsubsidio' },
  { kind: 'ia', text: 'Felicitaciones. ¿Ella depende de tus ingresos?' },
  { kind: 'user', text: 'Sí, de los míos y los de mi esposa.' },
  { kind: 'profile', label: 'Perfil', value: 'dependientes: 1 · ingreso compartido' },
  { kind: 'rec', label: 'Recomendación', value: 'Seguro de vida Colsubsidio', confidence: 96 },
  {
    kind: 'ia',
    text: 'Con una hija que depende de ti, lo que más pesa hoy es que su vida siga igual si tú faltas. Te recomiendo el seguro de vida desde $25.000 al mes. Te muestro qué cubre y lo ajustamos si quieres.',
  },
]

function Card({ entry }: { entry: Entry }) {
  if (entry.kind === 'user') {
    return (
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-azul px-4 py-3 text-[0.92rem] text-white">
        {entry.text}
      </div>
    )
  }
  if (entry.kind === 'ia') {
    return (
      <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-3 text-[0.92rem] leading-relaxed text-ink">
        {entry.text}
      </div>
    )
  }
  if (entry.kind === 'tool') {
    return (
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-ai-soft bg-ai-tint px-4 py-2">
        <Cog className="size-3.5 animate-spin text-ai [animation-duration:3s]" />
        <span className="font-mono text-xs text-ai-deep">{entry.label}</span>
      </div>
    )
  }
  if (entry.kind === 'rec') {
    return (
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-guardian-soft bg-guardian-tint px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-guardian text-carbon">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <p className="font-mono text-[0.65rem] tracking-[0.12em] text-guardian-deep uppercase">
            {entry.label}
          </p>
          <span className="ml-auto font-mono text-sm font-medium text-guardian-deep">
            {entry.confidence}%
          </span>
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink">
          <ShieldCheck className="size-4 text-guardian" />
          {entry.value}
        </p>
      </div>
    )
  }
  // event + profile → system rows
  const isEvent = entry.kind === 'event'
  return (
    <div className="glass mx-auto flex w-fit items-center gap-2.5 rounded-xl px-4 py-2">
      <span className={`size-1.5 rounded-full ${isEvent ? 'bg-ai' : 'bg-live'}`} />
      <span className="font-mono text-[0.65rem] tracking-[0.12em] text-humo uppercase">
        {entry.label}
      </span>
      <span className="font-mono text-xs font-medium text-ink">{entry.value}</span>
    </div>
  )
}

export function ConversationTimeline() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 55%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.6 })

  return (
    <section className="border-y border-line bg-white/[0.035] backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
                Conversación real
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
                No creemos en asistentes que repiten guiones.
              </h2>
              <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-pizarra">
                Cada persona tiene una historia distinta, una familia distinta,
                un riesgo distinto. Por eso cada conversación deja un rastro
                propio que se puede leer y cuestionar.
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-humo">
                <User className="size-3.5" />
                Desliza y recorre la conversación
              </div>
            </Reveal>
          </div>

          {/* flowing conversation */}
          <div ref={listRef} className="relative">
            {/* progress spine */}
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-line" />
            <motion.div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-guardian"
              style={{ scaleY: progress }}
            />

            <div className="flex flex-col gap-7">
              {script.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
                  transition={{ duration: 0.8, ease: easeOutExpo }}
                  className="relative pl-8"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-4 left-0 size-[15px] rounded-full border-2 border-white ${
                      entry.kind === 'user'
                        ? 'bg-azul'
                        : entry.kind === 'ia'
                          ? 'bg-guardian'
                          : 'bg-ai'
                    }`}
                  />
                  <Card entry={entry} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
