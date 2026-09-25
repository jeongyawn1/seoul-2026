import type { Place } from '../types'
import { useStore } from '../lib/store'
import { cn } from '../lib/utils'

export default function Checklist({
  items,
  emoji,
  title,
  verb,
}: {
  items: Place[]
  emoji: string
  title: string
  verb: string
}) {
  const { isChecked, toggleChecked } = useStore()
  const done = items.filter((p) => isChecked(p.id)).length

  return (
    <section className="bg-white border border-line rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif text-lg font-semibold text-ink">
          {emoji} {title}
        </h3>
        <span className="text-[12px] text-graywarm tabular-nums">
          {done}/{items.length}
        </span>
      </div>
      <ul className="divide-y divide-line">
        {items.map((p) => {
          const checked = isChecked(p.id)
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => toggleChecked(p.id)}
                className="w-full flex items-center gap-3 py-2.5 text-left"
              >
                <span
                  className={cn(
                    'w-5 h-5 rounded-md border grid place-items-center shrink-0 text-[13px] leading-none transition-colors',
                    checked ? 'bg-seoul border-seoul text-paper' : 'border-line bg-white',
                  )}
                >
                  {checked ? '✓' : ''}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('text-sm font-medium', checked ? 'text-graywarm line-through' : 'text-ink')}>
                    {p.name}
                  </span>
                  {p.nameKr ? <span className="text-[12px] text-graywarm ml-1.5">{p.nameKr}</span> : null}
                </span>
                <span className="text-[11px] text-graywarm shrink-0">{checked ? `已${verb}` : '点击标记'}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
