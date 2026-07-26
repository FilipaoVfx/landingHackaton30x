import { useEffect, useState } from 'react'

/**
 * Timed state machine for the "living" simulations.
 * Advances through `durations` (ms per step) while `active` is true.
 * Returns the current step index. `cycle` increments every loop so
 * consumers can key AnimatePresence containers for clean resets.
 */
export function useStepLoop(durations: number[], active: boolean, loop = true) {
  const [step, setStep] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!active) return
    if (step >= durations.length) {
      if (!loop) return
      const t = window.setTimeout(() => {
        setStep(0)
        setCycle((c) => c + 1)
      }, 900)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), durations[step])
    return () => window.clearTimeout(t)
  }, [step, active, loop, durations])

  return { step, cycle }
}
