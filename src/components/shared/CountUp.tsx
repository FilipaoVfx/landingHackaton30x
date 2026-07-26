import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

export function CountUp({
  to,
  run,
  duration = 1.4,
  suffix = '',
}: {
  to: number
  run: boolean
  duration?: number
  suffix?: string
}) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!run) {
      mv.set(0)
      return
    }
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [run, to, duration, mv])

  return <motion.span>{rounded}</motion.span>
}
