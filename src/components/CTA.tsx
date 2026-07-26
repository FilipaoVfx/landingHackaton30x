import { Reveal } from '@/components/shared/Reveal'

/**
 * Cierre de página: es un manifiesto, no un segundo botón. La única puerta al
 * producto vive en el hero, a propósito.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden bg-guardian">
      {/* giant watermark shield */}
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="pointer-events-none absolute -right-16 -bottom-24 size-[26rem] opacity-[0.12] sm:size-[32rem]"
      >
        <path
          d="M32 4l24 8.9v18.3C56 47.3 46.3 61.9 32 66 17.7 61.9 8 47.3 8 31.2V12.9L32 4z"
          fill="#121824"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="text-balance text-4xl font-bold tracking-[-0.025em] text-carbon sm:text-6xl">
              La protección no duerme.
              <br />
              Nosotros tampoco.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 max-w-[52ch] space-y-4 text-lg leading-relaxed text-carbon/85">
              <p>
                Los accidentes no esperan al lunes. Las dudas no aparecen solo
                en horario laboral. Las decisiones importantes no ocurren entre
                las 8 y las 5.
              </p>
              <p className="font-semibold text-carbon">
                Cada minuto que Secura ahorra es un minuto que un asesor dedica
                a lo que ninguna máquina hace: resolver lo difícil y construir
                confianza.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-12 border-t border-carbon/20 pt-6 text-sm font-medium tracking-tight text-carbon/70">
              Más que automatización. Protección inteligente.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
