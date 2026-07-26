import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Mic } from 'lucide-react'
import { useStepLoop } from '@/lib/useStepLoop'

type VoiceState = 'listening' | 'thinking' | 'speaking'

const STATES: { id: VoiceState; label: string; duration: number }[] = [
  { id: 'listening', label: 'Escuchando…', duration: 7200 },
  { id: 'thinking', label: 'Pensando…', duration: 4000 },
  { id: 'speaking', label: 'Respondiendo…', duration: 7200 },
]

const transcripts: Record<VoiceState, string> = {
  listening: '«¿Y eso cubre a mi hija si me pasa algo?»',
  thinking: 'consultando reglas de Colsubsidio, perfil con dependientes',
  speaking: '«Sí. Ella queda como beneficiaria desde el primer pago.»',
}

const BARS = 44

export function VoiceDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inView = useInView(rootRef, { margin: '-15% 0px' })
  const { step } = useStepLoop(STATES.map((s) => s.duration), inView)
  const state: VoiceState = STATES[step % STATES.length].id
  const stateRef = useRef<VoiceState>(state)
  stateRef.current = state
  const [levels] = useState(() => new Array<number>(BARS).fill(0.1))
  const levelsRef = useRef(levels)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!inView || reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const targetFor = (i: number, time: number): number => {
      const s = stateRef.current
      const n = Math.sin(i * 0.7 + time * 2.1) * 0.5 + 0.5
      const n2 = Math.sin(i * 1.9 - time * 3.3) * 0.5 + 0.5
      if (s === 'listening') {
        const envelope = Math.sin((i / BARS) * Math.PI) // center-weighted
        return 0.12 + envelope * (0.25 + n * 0.55) * (0.6 + n2 * 0.4)
      }
      if (s === 'thinking') {
        return 0.1 + Math.sin(time * 2.4 + i * 0.35) * 0.045 + 0.05
      }
      // speaking — formant-like pulses
      const pulse = Math.abs(Math.sin(time * 1.6 + i * 0.24))
      return 0.16 + pulse * (0.3 + n2 * 0.45)
    }

    const draw = () => {
      t += 0.016
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      const gap = w / BARS
      const barW = Math.max(gap * 0.45, 2 * dpr)
      for (let i = 0; i < BARS; i++) {
        const lv = levelsRef.current
        lv[i] += (targetFor(i, t) - lv[i]) * 0.14
        const bh = Math.max(lv[i] * h, 3 * dpr)
        const x = i * gap + (gap - barW) / 2
        const y = (h - bh) / 2
        const alpha = 0.35 + lv[i] * 0.6
        ctx.fillStyle =
          stateRef.current === 'thinking'
            ? `rgba(120, 133, 158, ${alpha * 0.8})`
            : `rgba(255, 230, 0, ${alpha})`
        ctx.beginPath()
        ctx.roundRect(x, y, barW, bh, barW / 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [inView, reduced])

  return (
    <div ref={rootRef} className="glass-panel flex h-full flex-col rounded-3xl p-7 text-white sm:p-9">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.12em] text-white/60 uppercase">
          Voz
        </span>
        <span className="flex items-center gap-2 font-mono text-xs text-white/60">
          <span
            className={`size-1.5 rounded-full ${
              state === 'listening' ? 'bg-live animate-pulse-dot' : 'bg-ai'
            }`}
          />
          {STATES[step % STATES.length].label}
        </span>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-guardian">
          {state === 'listening' && (
            <span className="absolute inset-0 animate-ping rounded-full bg-guardian/50 [animation-duration:1.8s]" />
          )}
          <Mic className="size-6 text-carbon" />
        </span>
        <canvas
          ref={canvasRef}
          className="h-24 w-full"
          aria-label="Visualización de onda de voz"
          role="img"
        />
      </div>

      <div className="mt-auto pt-8">
        <p
          key={state}
          className="font-mono text-sm leading-relaxed text-white/75 [animation:fadein_.6s_ease]"
        >
          {transcripts[state]}
        </p>
        <style>{`@keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>
      </div>
    </div>
  )
}
