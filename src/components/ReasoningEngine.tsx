import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import {
  User,
  Target,
  HeartPulse,
  SlidersHorizontal,
  Cog,
  ShieldCheck,
  MessageSquareText,
} from 'lucide-react'
import { Reveal, easeOutExpo } from '@/components/shared/Reveal'
import { useStepLoop } from '@/lib/useStepLoop'

const flow = [
  { icon: User, label: 'Usuario' },
  { icon: Target, label: 'Intención' },
  { icon: HeartPulse, label: 'Análisis emocional' },
  { icon: SlidersHorizontal, label: 'Perfilamiento' },
  { icon: Cog, label: 'Motor de reglas' },
  { icon: ShieldCheck, label: 'Recomendación' },
  { icon: MessageSquareText, label: 'Respuesta' },
]

const FLOW_DURATIONS = flow.map(() => 850)

const pipeline = [
  { phase: 'Inicio', ms: 120, width: 42, tone: 'ink' },
  { phase: 'Contexto', ms: 340, width: 68, tone: 'ai' },
  { phase: 'Perfil', ms: 210, width: 55, tone: 'ai' },
  { phase: 'Reglas', ms: 480, width: 100, tone: 'ai' },
  { phase: 'Productos', ms: 260, width: 74, tone: 'ai' },
  { phase: 'Respuesta', ms: 190, width: 48, tone: 'ink' },
] as const

export function ReasoningEngine() {
  const flowRef = useRef<HTMLDivElement>(null)
  const flowInView = useInView(flowRef, { margin: '-15% 0px' })
  const { step } = useStepLoop(FLOW_DURATIONS, flowInView)
  const active = step % flow.length

  return (
    <section id="motor" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
          El motor
        </p>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
          Una buena IA no responde más rápido. Responde mejor.
        </h2>
        <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-pizarra">
          Explica. Justifica. Pregunta cuando no sabe. Reconoce lo que no puede
          afirmar. Cada mensaje recorre el mismo camino, y ese camino se ve.
        </p>
      </Reveal>

      {/* live reasoning flow */}
      <Reveal delay={0.1}>
        <div
          ref={flowRef}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 lg:gap-0"
        >
          {flow.map((f, i) => {
            const isActive = i === active
            return (
              <div key={f.label} className="relative flex items-center lg:block">
                <motion.div
                  animate={{
                    borderColor: isActive ? 'var(--color-ai-soft)' : 'var(--color-line)',
                    backgroundColor: isActive ? 'var(--color-ai-tint)' : 'rgba(255,255,255,0.04)',
                    boxShadow: isActive
                      ? '0 0 0 4px rgb(79 139 255 / 0.16), 0 8px 24px -8px rgb(13 71 161 / 0.7)'
                      : '0 0 0 0 rgb(0 0 0 / 0)',
                  }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="flex w-full flex-col items-center gap-2.5 rounded-2xl border px-3 py-5 text-center"
                >
                  <motion.span
                    animate={{
                      color: isActive ? 'var(--color-ai-deep)' : 'var(--color-humo)',
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.45, ease: easeOutExpo }}
                  >
                    <f.icon className="size-5" strokeWidth={2.1} />
                  </motion.span>
                  <span
                    className={`text-[0.72rem] leading-tight font-medium tracking-tight sm:text-[0.8rem] ${
                      isActive ? 'text-ai-deep' : 'text-pizarra'
                    }`}
                  >
                    {f.label}
                  </span>
                </motion.div>
                {i < flow.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 hidden h-px w-3 -translate-y-1/2 lg:block"
                  >
                    <svg width="12" height="2" className="overflow-visible">
                      <line
                        x1="0"
                        y1="1"
                        x2="12"
                        y2="1"
                        stroke={isActive ? 'var(--color-ai)' : 'var(--color-line)'}
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        className={isActive ? 'animate-flow-dash' : ''}
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* pipeline */}
      <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Un pipeline que puedes cronometrar.
          </h3>
          <p className="mt-4 max-w-[44ch] leading-relaxed text-pizarra">
            Cada fase deja evidencia con su duración real. Así se ve una
            recomendación completa: observable de punta a punta, sin cajas
            negras.
          </p>
          <p className="glass mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-pizarra">
            <span className="size-1.5 rounded-full bg-ai" />
            total: 1.6 s, sin intervención humana
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <span className="font-mono text-xs tracking-wide text-humo">
                guardian · trace #0347
              </span>
              <span className="font-mono text-xs text-live">● completado</span>
            </div>
            <div className="flex flex-col gap-4">
              {pipeline.map((p, i) => (
                <div key={p.phase} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 font-mono text-xs text-pizarra sm:w-24">
                    {p.phase}
                  </span>
                  <div className="h-6 flex-1 overflow-hidden rounded-md bg-cloud">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.width}%` }}
                      viewport={{ once: true, margin: '-20% 0px' }}
                      transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.15 + i * 0.12 }}
                      className={`h-full rounded-md ${
                        p.tone === 'ai'
                          ? 'bg-gradient-to-r from-azul to-ai'
                          : 'bg-humo/70'
                      } ${p.phase === 'Reglas' ? 'relative overflow-hidden' : ''}`}
                    >
                      {p.phase === 'Reglas' && (
                        <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgb(255_255_255/0.45)_50%,transparent_70%)] bg-[length:200%_100%]" />
                      )}
                    </motion.div>
                  </div>
                  <span className="w-14 shrink-0 text-right font-mono text-xs text-humo">
                    {p.ms} ms
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
