import { cn } from '@/lib/utils'

/**
 * Marca de Secura: escudo (protección) con una S trazada de un solo gesto,
 * como una línea de conversación. La conversación es la interfaz; el escudo es
 * lo que resulta de ella.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('size-8', className)} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#FFE600" />
      <path
        d="M32 12l14 5.2v10.6c0 9.2-5.6 17.4-14 20.7-8.4-3.3-14-11.5-14-20.7V17.2L32 12z"
        fill="#121824"
      />
      <path
        d="M38.4 24.6c-1.7-1.9-3.8-2.9-6.4-2.9-3.2 0-5.5 1.6-5.5 4 0 2.3 1.8 3.4 5.4 4.3 4 1 6.3 2.3 6.3 5.2 0 3-2.7 4.9-6.3 4.9-2.9 0-5.3-1.1-7-3.2"
        fill="none"
        stroke="#FFE600"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
