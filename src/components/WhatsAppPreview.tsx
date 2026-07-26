import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Check, Phone, Send, Video } from 'lucide-react'
import { useStepLoop } from '@/lib/useStepLoop'
import { LogoMark } from '@/components/shared/LogoMark'

const EASE = [0.16, 1, 0.3, 1] as const

/* steps: 0 hola · 1 dudas · 2 typing · 3 pregunta · 4 respuesta · 5 analizando · 6 recomendación · 7 hold */
const DURATIONS = [1100, 1300, 1400, 900, 1500, 1600, 1100, 3000]

function Bubble({
  children,
  from,
  stepKey,
}: {
  children: React.ReactNode
  from: 'user' | 'ia'
  stepKey: string
}) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.55, ease: EASE }}
      className={
        from === 'user'
          ? 'ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-azul px-4 py-2.5 text-[0.88rem] text-white'
          : 'w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-2.5 text-[0.88rem] text-ink'
      }
    >
      {children}
    </motion.div>
  )
}

export function WhatsAppPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const { step, cycle } = useStepLoop(DURATIONS, inView)

  return (
    <div ref={ref} className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <LogoMark className="size-9" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">Secura</p>
          <p className="flex items-center gap-1.5 text-xs text-live">
            <span className="size-1.5 rounded-full bg-live animate-pulse-dot" />
            en línea · WhatsApp
          </p>
        </div>
        <div className="ml-auto flex gap-4 text-humo">
          <Video className="size-4.5" />
          <Phone className="size-4" />
        </div>
      </div>

      {/* messages */}
      <div className="flex min-h-[380px] flex-1 flex-col gap-2.5 bg-white/[0.02] px-4 py-5 sm:min-h-[420px]">
        <AnimatePresence mode="sync">
          <div key={cycle} className="flex flex-col gap-2.5">
            {step >= 0 && <Bubble from="user" stepKey="m0">Hola</Bubble>}
            {step >= 1 && (
              <Bubble from="user" stepKey="m1">
                Viajo mucho por trabajo y no sé si estoy cubierto
              </Bubble>
            )}
            {step >= 2 && step < 3 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-4 py-3"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full bg-humo animate-think"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </motion.div>
            )}
            {step >= 3 && (
              <Bubble from="ia" stepKey="m3">
                Buena pregunta. Fuera del país tu sistema de salud no te cubre.
                <span className="mt-1 block font-medium">¿Sales de Colombia en esos viajes?</span>
              </Bubble>
            )}
            {step >= 4 && (
              <Bubble from="user" stepKey="m4">Sí, casi cada mes.</Bubble>
            )}
            {step >= 5 && step < 6 && (
              <motion.div
                key="sys"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="mx-auto flex items-center gap-2 rounded-full bg-ai-tint px-3.5 py-1.5"
              >
                <span className="size-1.5 rounded-full bg-ai animate-think" />
                <span className="font-mono text-[0.7rem] text-ai-deep">Armando tu plan…</span>
              </motion.div>
            )}
            {step >= 6 && (
              <motion.div
                key="rec"
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="glass w-fit max-w-[90%] overflow-hidden rounded-2xl rounded-bl-md"
              >
                <div className="bg-guardian-tint px-4 py-2.5">
                  <p className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.1em] text-guardian-deep uppercase">
                    <Check className="size-3.5" strokeWidth={3} />
                    Quedas protegido
                  </p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-ink">
                    Asistencia médica en viajes
                  </p>
                  <p className="mt-0.5 text-xs text-pizarra">$26.000 al mes</p>
                  <p className="mt-1.5 font-mono text-xs text-humo">
                    Radicado COL-2026-419282
                  </p>
                </div>
              </motion.div>
            )}
            {step >= 7 && <div key="end" className="h-0" />}
          </div>
        </AnimatePresence>
      </div>

      {/* input bar (visual) */}
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <div className="h-9 flex-1 rounded-full bg-cloud px-4 text-sm leading-9 text-humo">
          Escribe un mensaje…
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-guardian text-carbon">
          <Send className="size-4" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  )
}
