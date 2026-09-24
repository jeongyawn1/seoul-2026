import type { Category, DayIntensity, Priority, WishlistStatus } from '../types'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const CATEGORY_LABEL: Record<Category, string> = {
  food: 'Food',
  cafe: 'Cafe',
  dessert: 'Dessert',
  bakery: 'Bakery',
  shopping: 'Shopping',
  fragrance: 'Fragrance',
  beauty: 'Beauty',
  jewelry: 'Jewelry',
  lifestyle: 'Lifestyle',
  vintage: 'Vintage',
  bar: 'Bar',
  'hidden-gem': 'Hidden Gem',
  attraction: 'Attraction',
  fixed: 'Fixed',
}

export const CATEGORY_KR: Record<Category, string> = {
  food: '음식',
  cafe: '카페',
  dessert: '디저트',
  bakery: '베이커리',
  shopping: '쇼핑',
  fragrance: '향수',
  beauty: '뷰티',
  jewelry: '주얼리',
  lifestyle: '라이프스타일',
  vintage: '빈티지',
  bar: '바',
  'hidden-gem': '숨은 명소',
  attraction: '관광',
  fixed: '고정',
}

export interface PriorityMeta {
  label: string
  className: string
  dot: string
}

export const PRIORITY_META: Record<Priority, PriorityMeta> = {
  MUST: { label: 'MUST', className: 'bg-wine text-paper', dot: 'bg-wine' },
  HIGH: { label: 'HIGH', className: 'bg-seoul text-paper', dot: 'bg-seoul' },
  NICE: { label: 'NICE', className: 'bg-paper2 text-ink-soft border border-line', dot: 'bg-graywarm' },
  OPTIONAL: { label: 'OPTIONAL', className: 'bg-paper2 text-graywarm border border-line', dot: 'bg-graywarm' },
  SKIP: { label: 'SKIP', className: 'bg-paper2 text-graywarm border border-line', dot: 'bg-graywarm' },
}

export interface StatusMeta {
  label: string
  className: string
}

export const STATUS_META: Record<WishlistStatus, StatusMeta> = {
  WANT: { label: 'Want', className: 'text-graywarm border border-line' },
  PLANNED: { label: 'In trip', className: 'text-seoul-deep border border-seoul/40 bg-seoul/5' },
  VISITED: { label: 'Visited', className: 'text-ink border border-line bg-paper2' },
  SKIPPED: { label: 'Skipped', className: 'text-graywarm border border-line' },
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

// Always-valid search links — never a broken URL, no API key needed.
export function googleMapsUrl(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Seoul')}`
}

export function naverMapsUrl(name: string): string {
  return `https://map.naver.com/v5/search/${encodeURIComponent(name)}`
}
