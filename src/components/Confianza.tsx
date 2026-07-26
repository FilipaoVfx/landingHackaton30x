import { motion } from 'motion/react'
import {
  Check,
  ShieldCheck,
  UserRound,
  HeartHandshake,
  MessagesSquare,
  Scale,
  Lock,
  Database,
  Sparkles,
} from 'lucide-react'
import { Reveal, easeOutExpo } from '@/components/shared/Reveal'

const reasons = [
  'Dos personas dependen de tu ingreso',
  'Eres el ingreso principal del hogar',
  'Hoy nadie cubre ese riesgo en tu familia',
  'Por eso: seguro de vida, $25.000 al mes',
]

const basis = [
  { icon: UserRound, label: 'Tu perfil', desc: 'Lo que sabemos de tu situación real, no un promedio.' },
  { icon: HeartHandshake, label: 'Lo que está en riesgo', desc: 'Quién depende de ti y qué perderías.' },
  { icon: MessagesSquare, label: 'La conversación', desc: 'Lo que nos contaste, en tus palabras.' },
  { icon: Scale, label: 'Reglas de Colsubsidio', desc: 'Criterios de negocio auditables, no opinión.' },
]

const security = [
  { icon: Lock, label: 'Tus datos son tuyos' },
  { icon: ShieldCheck, label: 'Decisiones auditables' },
  { icon: Sparkles, label: 'IA que reconoce sus límites' },
  { icon: Database, label: 'Nada se inventa' },
]

export function Confianza() {
  return (
    <section id="confianza" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        {/* explainability card */}
        <Reveal>
          <div className="glass-panel rounded-3xl p-7 sm:p-9">
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-humo uppercase">
              Recomendación
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-guardian-tint text-guardian">
                <ShieldCheck className="size-5.5" />
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  Seguro de Vida Colsubsidio
                </h3>
                <p className="font-mono text-xs text-ai-deep">confianza 97%</p>
              </div>
            </div>

            <div className="mt-7 border-t border-line pt-6">
              <p className="text-sm font-semibold text-ink">¿Por qué este seguro?</p>
              <ul className="mt-4 flex flex-col gap-3.5">
                {reasons.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.35 + i * 0.28 }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-15% 0px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 18,
                        delay: 0.35 + i * 0.28,
                      }}
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                        i === reasons.length - 1
                          ? 'bg-guardian text-carbon'
                          : 'bg-live/15 text-live'
                      }`}
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </motion.span>
                    <span
                      className={`text-[0.95rem] ${
                        i === reasons.length - 1 ? 'font-semibold text-ink' : 'text-pizarra'
                      }`}
                    >
                      {r}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* transparency */}
        <Reveal delay={0.12}>
          <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
            Transparencia
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
            Claridad sobre complejidad.
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-pizarra">
            Explicamos, no confundimos. Cada recomendación nace de evidencia que
            puedes leer y discutir. Si no hay razones, no hay recomendación.
          </p>

          <ul className="mt-9 divide-y divide-line border-y border-line">
            {basis.map((b, i) => (
              <motion.li
                key={b.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 + i * 0.12 }}
                className="flex items-center gap-4 py-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cloud text-ink">
                  <b.icon className="size-4.5" strokeWidth={2.1} />
                </span>
                <div>
                  <p className="font-semibold tracking-tight text-ink">{b.label}</p>
                  <p className="text-sm text-pizarra">{b.desc}</p>
                </div>
                <Check className="ml-auto size-4 shrink-0 text-live" strokeWidth={2.5} />
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* security strip */}
      <Reveal delay={0.1}>
        <div className="glass-panel mt-20 grid grid-cols-2 gap-6 rounded-3xl px-8 py-8 md:grid-cols-4">
          {security.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="size-4.5 shrink-0 text-humo" strokeWidth={2.1} />
              <span className="text-sm font-medium text-pizarra">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
