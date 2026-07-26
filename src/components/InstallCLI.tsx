import { useState } from 'react'
import { Reveal } from '@/components/shared/Reveal'

const WINDOWS_CMD = 'irm https://teamflashackaton30x.com/install.ps1 | iex'

/**
 * Sigue a CLIDemo: quien acaba de ver el GIF debe poder probarlo sin cambiar
 * de página. Jerarquía deliberada — el navegador es la ruta por defecto para
 * cualquier sistema, y la instalación local queda como nota al pie.
 */
export function InstallCLI() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(WINDOWS_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
          Pruébalo
        </p>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
          Ábrelo ahora, sin instalar nada.
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-pizarra">
          La CLI corre en tu navegador contra el sistema real: mismas
          conversaciones, mismos eventos, mismos costos medidos. La sesión es de
          solo lectura, así que puedes explorar sin romper nada.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/probar.html"
            className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-guardian px-8 text-[0.95rem] font-semibold text-carbon shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:bg-guardian-deep active:translate-y-0"
          >
            Probar en el navegador
          </a>
          <span className="font-mono text-xs text-humo">
            Funciona en Mac, Windows, Linux y celular
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="glass-panel mt-10 rounded-2xl px-6 py-5">
          <p className="text-sm text-pizarra">
            ¿Prefieres tenerla local? En Windows, una línea en PowerShell:
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <code className="min-w-0 flex-1 overflow-x-auto rounded-lg bg-carbon/60 px-4 py-3 font-mono text-sm whitespace-nowrap text-ink">
              {WINDOWS_CMD}
            </code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-10 shrink-0 items-center rounded-full border border-guardian/40 px-5 font-mono text-xs font-semibold text-guardian transition-colors hover:bg-guardian/10"
            >
              {copied ? 'copiado' : 'copiar'}
            </button>
          </div>
          <p className="mt-3 font-mono text-xs text-humo">
            El binario descubre el backend solo. Si SmartScreen avisa (no está
            firmado): Más información → Ejecutar de todas formas.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
