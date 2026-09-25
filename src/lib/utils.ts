import type { Category, DayIntensity, Priority, WishlistStatus } from '../types'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const CATEGORY_LABEL: Record<Category, string> = {
  food: '美食',
  cafe: '咖啡',
  dessert: '甜品',
  bakery: '面包',
  shopping: '购物',
  fragrance: '香水',
  beauty: '美妆',
  jewelry: '首饰',
  lifestyle: '生活',
  vintage: '古着',
  bar: '酒吧',
  'hidden-gem': '隐藏地标',
  attraction: '景点',
  fixed: '固定',
}

export interface PriorityMeta {
  label: string
  emoji: string
  className: string
  dot: string
}

export const PRIORITY_META: Record<Priority, PriorityMeta> = {
  MUST: { label: '必去', emoji: '🔴', className: 'bg-wine text-paper', dot: 'bg-wine' },
  HIGH: { label: '想去', emoji: '🟡', className: 'bg-amber-100 text-amber-800 border border-amber-300', dot: 'bg-amber-400' },
  NICE: { label: '推荐', emoji: '🟢', className: 'bg-emerald-100 text-emerald-800 border border-emerald-300', dot: 'bg-emerald-500' },
  OPTIONAL: { label: '可选', emoji: '⚪', className: 'bg-paper2 text-graywarm border border-line', dot: 'bg-graywarm' },
  SKIP: { label: '跳过', emoji: '⚪', className: 'bg-paper2 text-graywarm border border-line', dot: 'bg-graywarm' },
}

export interface StatusMeta {
  label: string
  className: string
}

export const STATUS_META: Record<WishlistStatus, StatusMeta> = {
  WANT: { label: '想要', className: 'text-graywarm border border-line' },
  PLANNED: { label: '已安排', className: 'text-seoul-deep border border-seoul/40 bg-seoul/5' },
  VISITED: { label: '已打卡', className: 'text-ink border border-line bg-paper2' },
  SKIPPED: { label: '跳过', className: 'text-graywarm border border-line' },
}

export const STATUS_ORDER: WishlistStatus[] = ['WANT', 'PLANNED', 'VISITED', 'SKIPPED']

export interface IntensityMeta {
  label: DayIntensity
  className: string
  bar: string
}

export const INTENSITY_META: Record<DayIntensity, IntensityMeta> = {
  RELAXED: { label: 'RELAXED', className: 'text-seoul', bar: 'bg-seoul/30' },
  MODERATE: { label: 'MODERATE', className: 'text-ink-soft', bar: 'bg-seoul/60' },
  HEAVY: { label: 'HEAVY', className: 'text-wine', bar: 'bg-wine' },
}

export const INTENSITY_CN: Record<DayIntensity, string> = {
  RELAXED: '轻松',
  MODERATE: '适中',
  HEAVY: '紧凑',
}

// 永远可用的搜索链接 —— 不需要 API Key，也不会产生坏链接。
export function googleMapsUrl(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Seoul')}`
}

export function naverMapsUrl(name: string): string {
  return `https://map.naver.com/v5/search/${encodeURIComponent(name)}`
}

export function kakaoMapsUrl(name: string): string {
  return `https://map.kakao.com/?q=${encodeURIComponent(name)}`
}
