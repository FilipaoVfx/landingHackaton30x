import { cn } from '@/lib/utils'

export function StatusDot({
  tone = 'live',
  className,
}: {
  tone?: 'live' | 'ai' | 'guardian'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-block size-2 shrink-0 rounded-full',
        tone === 'live' && 'bg-live animate-pulse-dot',
        tone === 'ai' && 'bg-ai',
        tone === 'guardian' && 'bg-guardian',
        className,
      )}
    />
  )
}
