// ---------------------------------------------------------------------------
// 预算 —— 支持人民币（CNY）+ 韩元（KRW）双币显示，汇率可编辑。
// 金额仅为「旅行预算估算」，不是账本，不含任何真实卡号/账户/支付信息。
// 没有准确价格的地方使用区间，并标注「价格可能变化，请出发前确认」。
// ---------------------------------------------------------------------------

export type BudgetCategory =
  | 'flight'
  | 'hotel'
  | 'transport'
  | 'food'
  | 'shopping'
  | 'entertainment'
  | 'beauty'
  | 'other'

export type BudgetStatus = 'fixed' | 'estimated' | 'optional'

export interface BudgetLine {
  id: string
  label: string
  category: BudgetCategory
  amount: number
  currency: 'CNY' | 'KRW'
  status: BudgetStatus
  note?: string
}

export const CATEGORY_LABEL: Record<BudgetCategory, string> = {
  flight: '机票',
  hotel: '酒店',
  transport: '交通',
  food: '餐饮',
  shopping: '购物',
  entertainment: '娱乐',
  beauty: '美容',
  other: '其他',
}

export const STATUS_LABEL: Record<BudgetStatus, string> = {
  fixed: '已确定',
  estimated: '预计',
  optional: '可选',
}

export const STATUS_CLASS: Record<BudgetStatus, string> = {
  fixed: 'bg-wine/10 text-wine border-wine/30',
  estimated: 'bg-seoul/10 text-seoul-deep border-seoul/30',
  optional: 'bg-paper2 text-graywarm border-line',
}

/** 默认汇率：1 CNY ≈ 190 KRW（可编辑，仅用于估算） */
export const DEFAULT_RATE = 190

const RATE_KEY = 'seoul-2026:rate'

export function getRate(): number {
  try {
    const raw = localStorage.getItem(RATE_KEY)
    if (!raw) return DEFAULT_RATE
    const n = Number(raw)
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_RATE
  } catch {
    return DEFAULT_RATE
  }
}

export function setRate(n: number): void {
  try {
    localStorage.setItem(RATE_KEY, String(n))
  } catch {
    // 隐私模式下可能不可用，忽略
  }
}

export const BUDGET: BudgetLine[] = [
  {
    id: 'flight',
    label: '机票（成都 ⇄ 首尔，中转 1 次）',
    category: 'flight',
    amount: 1753,
    currency: 'CNY',
    status: 'fixed',
    note: '截图订单金额，口径待确认（单人/往返待确认）',
  },
  {
    id: 'hotel',
    label: '酒店 Loft13 Hongdae Sinchon（4 晚）',
    category: 'hotel',
    amount: 2077.78,
    currency: 'CNY',
    status: 'fixed',
    note: '截图订单总金额，人均待确认',
  },
  {
    id: 'transit',
    label: '交通（地铁 / 公交 / 机场快线）',
    category: 'transport',
    amount: 80000,
    currency: 'KRW',
    status: 'estimated',
    note: '约 ₩16,000/天 × 5 天（含 AREX 机场快线）',
  },
  {
    id: 'food',
    label: '餐饮（正餐 + 咖啡 + 小吃）',
    category: 'food',
    amount: 250000,
    currency: 'KRW',
    status: 'estimated',
    note: '约 ₩50,000/天，可上下浮动',
  },
  {
    id: 'touch-five',
    label: 'Touch Five 演出票',
    category: 'entertainment',
    amount: 129000,
    currency: 'KRW',
    status: 'estimated',
    note: 'R 席 ₩99,000 / VIP ₩110,000 / VVIP ₩129,000（约，待确认）',
  },
  {
    id: 'exo',
    label: 'EXO 首尔安可演唱会票',
    category: 'entertainment',
    amount: 0,
    currency: 'KRW',
    status: 'estimated',
    note: '票价待确认（以官方购票渠道为准）',
  },
  {
    id: 'wildwild',
    label: 'WILD WILD 演出票',
    category: 'entertainment',
    amount: 90000,
    currency: 'KRW',
    status: 'estimated',
    note: '约 ₩50,000–90,000，待确认',
  },
  {
    id: 'tower',
    label: 'N 首尔塔（缆车 / 观景台，可选）',
    category: 'entertainment',
    amount: 30000,
    currency: 'KRW',
    status: 'optional',
    note: '爱情锁广场免费；观景台/缆车另计',
  },
  {
    id: 'hair',
    label: '韩国理发（可选）',
    category: 'beauty',
    amount: 55000,
    currency: 'KRW',
    status: 'optional',
    note: '剪发约 ₩30,000–55,000，需提前预约',
  },
  {
    id: 'clinic',
    label: '皮肤科 / 医美（可选）',
    category: 'beauty',
    amount: 200000,
    currency: 'KRW',
    status: 'optional',
    note: '仅基础皮肤管理；需预约+面诊，风险自行评估',
  },
  {
    id: 'shopping',
    label: '购物（香水 / 美妆 / 首饰 / 墨镜 / 睡衣）',
    category: 'shopping',
    amount: 600000,
    currency: 'KRW',
    status: 'estimated',
    note: 'Le Labo / Gentle Monster / HANNA543 / 美妆等，弹性较大',
  },
  {
    id: 'other',
    label: '伴手礼 + 其他',
    category: 'other',
    amount: 80000,
    currency: 'KRW',
    status: 'estimated',
    note: 'milky 黄油饼干、Olive Young 小物等',
  },
]

export function toCNY(line: BudgetLine, rate: number): number {
  if (line.currency === 'CNY') return line.amount
  return line.amount / rate
}

export function toKRW(line: BudgetLine, rate: number): number {
  if (line.currency === 'KRW') return line.amount
  return line.amount * rate
}

export function totalCNY(rate: number): number {
  return BUDGET.reduce((s, l) => s + toCNY(l, rate), 0)
}

export function totalKRW(rate: number): number {
  return BUDGET.reduce((s, l) => s + toKRW(l, rate), 0)
}

export function formatCNY(n: number): string {
  return '¥' + n.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
}

export function formatKRW(n: number): string {
  if (n === 0) return '待确认'
  return '₩' + n.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
}
