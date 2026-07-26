import { LogoMark } from '@/components/shared/LogoMark'
import { BrandLogo } from '@/components/shared/BrandLogo'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-7" />
              <span className="text-sm font-semibold tracking-tight text-ink">Secura</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-pizarra">
              Convierte cada conversación en una experiencia de protección
              inteligente.
            </p>
          </div>

          <div className="flex flex-col gap-7 sm:flex-row sm:gap-12">
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-humo uppercase">
                Construido para
              </p>
              <BrandLogo name="colsubsidio" className="mt-3 h-11 w-28" />
            </div>
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-humo uppercase">
                Por el equipo
              </p>
              <BrandLogo name="30x" className="mt-3 size-11" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-humo">
            Secura. Automatiza procesos, nunca la confianza.
          </p>
          <p className="text-xs text-humo">
            Reto 03: venta inteligente de seguros con IA.
          </p>
        </div>
      </div>
    </footer>
  )
}
