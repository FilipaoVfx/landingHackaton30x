import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Cog, Database, UserRound } from 'lucide-react'
import { Reveal, easeOutExpo } from '@/components/shared/Reveal'
import { CountUp } from '@/components/shared/CountUp'

const tile = 'glass rounded-2xl p-5'
const label = 'font-mono text-[0.65rem] tracking-[0.14em] text-humo uppercase'

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
          Operación
        </p>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
          No creemos en promesas. Creemos en resultados.
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-pizarra">
          Conversaciones resueltas, confianza de cada decisión y costo real por
          caso. La inteligencia artificial solo vale cuando se puede medir.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div ref={ref} className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-cloud via-ai-tint/40 to-guardian-tint/40 blur-xl"
          />
          <div className="glass-panel overflow-hidden rounded-3xl">
            {/* window bar */}
            <div className="glass-nav flex items-center justify-between px-6 py-3.5">
              <span className="font-mono text-xs text-humo">secura, panel de operación</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-live/10 px-3 py-1 font-mono text-[0.7rem] text-live">
                <span className="size-1.5 rounded-full bg-live" />
                Completada
              </span>
            </div>

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-3">
              {/* conversation */}
              <div className={`${tile} lg:row-span-2`}>
                <p className={label}>Conversación</p>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="w-fit max-w-full rounded-xl rounded-bl-sm bg-cloud px-3.5 py-2 text-[0.82rem] text-ink">
                    ¿Y eso cubre a mi hija?
                  </div>
                  <div className="ml-auto w-fit max-w-full rounded-xl rounded-br-sm bg-azul px-3.5 py-2 text-[0.82rem] text-white">
                    Sí, totalmente. Te explico por qué…
                  </div>
                  <div className="mx-auto rounded-full bg-ai-tint px-3 py-1 font-mono text-[0.65rem] text-ai-deep">
                    rules_engine → VIDA · 97%
                  </div>
                </div>
                <div className="mt-5 border-t border-line pt-4">
                  <p className={label}>Timeline</p>
                  <div className="mt-3 flex items-center gap-0">
                    {['Inicio', 'Perfil', 'Reglas', 'Cierre'].map((t, i) => (
                      <div key={t} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={inView ? { scale: 1 } : {}}
                            transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 300, damping: 16 }}
                            className={`size-2.5 rounded-full ${i === 3 ? 'bg-guardian' : 'bg-ai'}`}
                          />
                          <span className="font-mono text-[0.6rem] text-humo">{t}</span>
                        </div>
                        {i < 3 && <span className="mx-1 mb-4 h-px flex-1 bg-line" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* lead score */}
              <div className={tile}>
                <p className={label}>Lead score</p>
                <p className="mt-2 text-5xl font-bold tracking-tight text-ink">
                  <CountUp to={87} run={inView} />
                </p>
                <p className="mt-1 text-xs text-live">Alto interés · listo para cierre</p>
              </div>

              {/* confidence */}
              <div className={tile}>
                <p className={label}>Confianza</p>
                <p className="mt-2 font-mono text-3xl font-medium text-ai-deep">
                  <CountUp to={97} run={inView} suffix="%" />
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cloud">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '97%' } : {}}
                    transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.4 }}
                    className="h-full rounded-full bg-ai"
                  />
                </div>
              </div>

              {/* audio */}
              <div className={tile}>
                <p className={label}>Audio · 0:42</p>
                <div className="mt-3 flex h-8 items-center gap-1">
                  {[0.4, 0.7, 1, 0.55, 0.85, 0.3, 0.65, 0.95, 0.5, 0.75, 0.35, 0.6].map(
                    (h, i) => (
                      <motion.span
                        key={i}
                        initial={{ scaleY: 0.2 }}
                        animate={inView ? { scaleY: [0.2, h, 0.35, h * 0.8, 0.2] } : {}}
                        transition={{
                          duration: 2.2,
                          delay: i * 0.08,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-1.5 origin-center rounded-full bg-ai/70"
                        style={{ height: `${h * 100}%` }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* tools */}
              <div className={`${tile} lg:col-span-2`}>
                <p className={label}>Herramientas invocadas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { icon: UserRound, name: 'user_profile' },
                    { icon: Cog, name: 'rules_engine' },
                    { icon: Database, name: 'product_catalog' },
                  ].map((t) => (
                    <span
                      key={t.name}
                      className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-pizarra"
                    >
                      <t.icon className="size-3.5 text-ai-deep" />
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
