import { Reveal } from '@/components/shared/Reveal'

export function CLIDemo() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
          CLI
        </p>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
          Control total desde tu terminal.
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-pizarra">
          Secura también se opera desde la línea de comandos. Monitorea
          conversaciones, ejecuta pipelines y consulta analytics en tiempo real
          sin salir de tu terminal.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-cloud via-ai-tint/40 to-guardian-tint/40 blur-xl"
          />
          <div className="glass-panel overflow-hidden rounded-3xl">
            <div className="glass-nav flex items-center justify-between px-6 py-3.5">
              <span className="font-mono text-xs text-humo">secura, terminal</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-live/10 px-3 py-1 font-mono text-[0.7rem] text-live">
                <span className="size-1.5 rounded-full bg-live" />
                Demo en vivo
              </span>
            </div>
            <img
              src="/secura-cli.gif"
              alt="Demo CLI de Secura"
              className="block w-full"
              loading="lazy"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
