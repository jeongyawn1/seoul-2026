import { useMemo, useState } from 'react'
import {
  BUDGET,
  CATEGORY_LABEL,
  STATUS_CLASS,
  STATUS_LABEL,
  formatKRW,
  getRate,
  setRate,
  toCNY,
  toKRW,
  totalCNY,
  totalKRW,
} from '../data/budget'
import type { BudgetLine, BudgetStatus } from '../data/budget'
import { SectionHeading } from '../components/ui'

function lineAmount(line: BudgetLine, rate: number): { primary: string; secondary: string } {
  if (line.amount === 0) {
    return { primary: '待确认', secondary: '待确认' }
  }
  if (line.currency === 'CNY') {
    return { primary: '¥' + line.amount.toLocaleString('zh-CN', { maximumFractionDigits: 0 }), secondary: '≈ ₩' + toKRW(line, rate).toLocaleString('zh-CN', { maximumFractionDigits: 0 }) }
  }
  return { primary: '₩' + line.amount.toLocaleString('zh-CN', { maximumFractionDigits: 0 }), secondary: '≈ ¥' + toCNY(line, rate).toLocaleString('zh-CN', { maximumFractionDigits: 0 }) }
}

export default function Budget() {
  const [rate, setRateState] = useState<number>(() => getRate())

  const sections: { status: BudgetStatus; lines: BudgetLine[] }[] = useMemo(() => {
    return (['fixed', 'estimated', 'optional'] as BudgetStatus[]).map((status) => ({
      status,
      lines: BUDGET.filter((l) => l.status === status),
    }))
  }, [])

  const onRateChange = (v: string) => {
    const n = Number(v)
    if (Number.isFinite(n) && n > 0) {
      setRate(n)
      setRateState(n)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="预算"
        title="我的首尔旅行预算"
        sub="人民币 + 韩元双币显示。金额仅为旅行预算估算，不含任何真实支付信息。"
      />

      <div className="mb-6 bg-white border border-line rounded-2xl p-5">
        <label className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-ink">汇率（可编辑）：</span>
          <span className="text-sm text-ink-soft">1 CNY =</span>
          <input
            type="number"
            value={rate}
            min={1}
            onChange={(e) => onRateChange(e.target.value)}
            className="w-28 px-3 py-1.5 rounded-lg border border-line text-sm tabular-nums focus:outline-none focus:border-seoul"
          />
          <span className="text-sm text-ink-soft">KRW</span>
        </label>
        <p className="text-[12px] text-graywarm mt-2">汇率仅用于旅行预算估算，实际支付金额以付款时为准。</p>
      </div>

      <div className="space-y-5">
        {sections.map(({ status, lines }) => {
          if (lines.length === 0) return null
          return (
            <section key={status} className="bg-white border border-line rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={cn2('text-[11px] font-semibold px-2 py-0.5 rounded-full border', STATUS_CLASS[status])}>
                  {STATUS_LABEL[status]}
                </span>
              </div>
              <ul className="divide-y divide-line">
                {lines.map((l) => {
                  const amt = lineAmount(l, rate)
                  return (
                    <li key={l.id} className="py-2.5 flex items-baseline gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink">
                          {l.label}
                          <span className="ml-2 text-[11px] font-normal text-graywarm">{CATEGORY_LABEL[l.category]}</span>
                        </p>
                        {l.note ? <p className="text-[12px] text-graywarm mt-0.5">{l.note}</p> : null}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-ink tabular-nums">{amt.primary}</p>
                        <p className="text-[11px] text-graywarm tabular-nums">{amt.secondary}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      <div className="mt-6 bg-ink text-paper rounded-2xl p-5 sm:p-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-paper/60">预计总预算</p>
          <p className="text-sm text-paper/70 mt-1">全部项目合计（含已确定 + 预计 + 可选）</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-3xl font-semibold tabular-nums">
            ¥{totalCNY(rate).toLocaleString('zh-CN', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-sm text-paper/70 tabular-nums">≈ {formatKRW(totalKRW(rate))}</p>
        </div>
      </div>

      <p className="text-[12px] text-graywarm mt-4">
        ⚠️ 价格可能变化，请出发前确认。没有准确价格的项目已使用区间或「待确认」标注，不虚构精确数字。
      </p>
    </div>
  )
}

function cn2(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
