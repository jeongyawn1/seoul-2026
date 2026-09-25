import type { DayIntensity, Priority, WishlistStatus } from '../types'
import { INTENSITY_CN, INTENSITY_META, PRIORITY_META, STATUS_META, cn } from '../lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: string
  sub?: string
}) {
  return (
    <div className="mb-5">
      <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-1">{eyebrow}</p>
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">{title}</h2>
      {sub ? <p className="text-sm text-graywarm mt-1 max-w-2xl">{sub}</p> : null}
    </div>
  )
}

export function PriorityBadge({ priority }: { priority?: Priority }) {
  if (!priority) return null
  const m = PRIORITY_META[priority]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold',
        m.className,
      )}
    >
      <span>{m.emoji}</span>
      {m.label}
    </span>
  )
}

export function StatusPill({ status }: { status?: WishlistStatus }) {
  if (!status) return null
  const m = STATUS_META[status]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium', m.className)}>
      {m.label}
    </span>
  )
}

export function IntensityBadge({ level }: { level: DayIntensity }) {
  const m = INTENSITY_META[level]
  const width = level === 'RELAXED' ? '33%' : level === 'MODERATE' ? '66%' : '100%'
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-1.5 w-9 rounded-full bg-paper2 overflow-hidden">
        <span className={cn('block h-full', m.bar)} style={{ width }} />
      </span>
      <span className={cn('text-[11px] font-semibold', m.className)}>{INTENSITY_CN[level]}</span>
    </span>
  )
}

export function Pill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium border transition-colors',
        active ? 'bg-ink text-paper border-ink' : 'text-ink-soft border-line hover:bg-paper2',
      )}
    >
      {children}
    </span>
  )
}
