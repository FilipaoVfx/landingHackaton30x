import { cn } from '@/lib/utils'

/**
 * Logos de terceros (Colsubsidio, 30X). Llegan como JPG con su propio fondo,
 * así que se montan dentro de una placa redondeada: pegarlos sueltos sobre el
 * gris cyber deja un rectángulo recortado a la vista.
 */
const logos = {
  colsubsidio: {
    src: '/logos/colsubsidio.jpg',
    alt: 'Colsubsidio',
    plate: 'bg-[#001a45] rounded-xl',
  },
  '30x': {
    src: '/logos/30x.jpg',
    alt: '30X',
    plate: 'bg-black rounded-lg',
  },
} as const

export type BrandLogoName = keyof typeof logos

export function BrandLogo({
  name,
  className,
  imgClassName,
}: {
  name: BrandLogoName
  className?: string
  imgClassName?: string
}) {
  const logo = logos[name]
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center overflow-hidden ring-1 ring-white/10',
        logo.plate,
        className,
      )}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-contain', imgClassName)}
      />
    </span>
  )
}
