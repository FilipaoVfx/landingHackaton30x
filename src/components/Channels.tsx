import { Reveal } from '@/components/shared/Reveal'
import { VoiceDemo } from '@/components/VoiceDemo'
import { WhatsAppPreview } from '@/components/WhatsAppPreview'

export function Channels() {
  return (
    <section id="canales" className="border-y border-line bg-white/[0.035] backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-guardian uppercase">
            Canales
          </p>
          <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
            Habla como prefieras. Secura escucha igual.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-pizarra">
            Voz o chat, el mismo motor y la misma calma. La conversación empieza
            donde la persona ya está, no donde a nosotros nos queda cómodo.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.08}>
            <VoiceDemo />
          </Reveal>
          <Reveal delay={0.16}>
            <WhatsAppPreview />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
