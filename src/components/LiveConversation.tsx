import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Check, Home, Plane, Sparkles, Users } from 'lucide-react'
import { scenarios } from '@/data/advisor'
import { useStepLoop } from '@/lib/useStepLoop'
import { StatusDot } from '@/components/shared/StatusDot'
import { CountUp } from '@/components/shared/CountUp'

const EASE = [0.16, 1, 0.3, 1] as const

/* step indices */
const S_USER = 0
const S_THINK = 1
const S_EVENT = 2
const S_PROP = 3
const S_CONF = 4
const S_REC = 5
const S_HOLD = 6

const DURATIONS = [900, 1500, 1000, 1000, 1700, 1300, 2800]

const eventIcons = {
  family: Users,
  travel: Plane,
  home: Home,
}

function Row({
  children,
  stepKey,
}: {
  children: React.ReactNode
  stepKey: string
}) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.35 } }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function LiveConversation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const scenarioCount = scenarios.length
  const { step, cycle } = useStepLoop(DURATIONS, inView)
  const scenario = scenarios[cycle % scenarioCount]
  const EventIcon = eventIcons[scenario.eventIcon]

  return (
    <div ref={ref} className="relative">
      {/* floating glow card behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-b from-ai-tint/60 via-transparent to-guardian-tint/50 blur-2xl"
      />
      <div className="glass-panel glass-lit overflow-hidden rounded-3xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <StatusDot tone="live" />
            <span className="font-mono text-xs tracking-wide text-pizarra">
              IA conectada
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {scenarios.map((s, i) => (
              <span
                key={s.id}
                className={
                  i === cycle % scenarioCount
                    ? 'h-1 w-4 rounded-full bg-guardian transition-all duration-500'
                    : 'h-1 w-1.5 rounded-full bg-line transition-all duration-500'
                }
              />
            ))}
          </div>
        </div>

        {/* flow */}
        <div className="relative min-h-[300px] px-5 py-5 sm:min-h-[330px] sm:px-6">
          <AnimatePresence mode="sync">
            <div key={cycle} className="flex flex-col gap-3.5">
              {/* user message */}
              {step >= S_USER && (
                <Row stepKey="user">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-azul px-4 py-2.5 text-[0.9rem] text-white">
                      {scenario.userMessage}
                    </div>
                  </div>
                </Row>
              )}

              {/* thinking */}
              {step >= S_THINK && step < S_EVENT && (
                <Row stepKey="think">
                  <div className="flex items-center gap-2 text-ai">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 rounded-full bg-ai animate-think"
                          style={{ animationDelay: `${i * 0.18}s` }}
                        />
                      ))}
                    </span>
                    <span className="font-mono text-xs">Analizando contexto…</span>
                  </div>
                </Row>
              )}

              {/* event detected */}
              {step >= S_EVENT && (
                <Row stepKey="event">
                  <div className="flex items-center gap-3 rounded-2xl border border-ai-soft bg-ai-tint px-4 py-3">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-ai/15 text-ai">
                      <EventIcon className="size-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ai-deep">
                        Evento detectado
                      </p>
                      <p className="text-sm font-semibold text-ink">{scenario.event}</p>
                    </div>
                  </div>
                </Row>
              )}

              {/* propensity */}
              {step >= S_PROP && (
                <Row stepKey="prop">
                  <div className="flex items-center gap-3 pl-1">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-humo">
                      Propensión
                    </span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="glass rounded-full px-3 py-1 text-xs font-medium text-ink">
                      {scenario.propensity}
                    </span>
                  </div>
                </Row>
              )}

              {/* confidence */}
              {step >= S_CONF && (
                <Row stepKey="conf">
                  <div className="glass rounded-2xl px-4 py-3">
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-humo">
                        Confianza
                      </span>
                      <span className="font-mono text-sm font-medium text-ai-deep">
                        <CountUp to={scenario.confidence} run={step >= S_CONF} suffix="%" />
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-ai"
                        initial={{ width: '0%' }}
                        animate={{ width: `${scenario.confidence}%` }}
                        transition={{ duration: 1.4, ease: EASE }}
                      />
                    </div>
                  </div>
                </Row>
              )}

              {/* recommendation */}
              {step >= S_REC && (
                <Row stepKey="rec">
                  <motion.div
                    initial={{ scale: 0.96 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="flex items-center gap-3 rounded-2xl border border-guardian-soft bg-guardian-tint px-4 py-3"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-guardian text-carbon">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-guardian-deep">
                        Recomendación generada
                      </p>
                      <p className="truncate text-sm font-semibold text-ink">
                        {scenario.product}
                      </p>
                    </div>
                    <Sparkles className="ml-auto size-4 shrink-0 text-guardian" />
                  </motion.div>
                </Row>
              )}

              {/* hold spacer keeps layout stable at the end */}
              {step >= S_HOLD && <div key="hold" className="h-0" />}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
