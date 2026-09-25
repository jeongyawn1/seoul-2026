export type Category =
  | 'food'
  | 'cafe'
  | 'dessert'
  | 'bakery'
  | 'shopping'
  | 'fragrance'
  | 'beauty'
  | 'jewelry'
  | 'lifestyle'
  | 'vintage'
  | 'bar'
  | 'hidden-gem'
  | 'attraction'
  | 'fixed'

export type TouristLevel = 'Mostly Local' | 'Mixed' | 'Tourist Friendly'
export type RouteFit = 'Perfect' | 'Good' | 'Poor'
export type Priority = 'MUST' | 'HIGH' | 'NICE' | 'OPTIONAL' | 'SKIP'
export type WishlistStatus = 'WANT' | 'PLANNED' | 'VISITED' | 'SKIPPED'
export type DayIntensity = 'RELAXED' | 'MODERATE' | 'HEAVY'

export interface Place {
  id: string
  /** 中文名 */
  name: string
  /** 韩文名 */
  nameKr?: string
  /** 英文名 */
  nameEn?: string
  category: Category
  subcategory?: string
  area: string
  address?: string
  nearestStation?: string
  lat?: number
  lng?: number
  openingHours?: string
  recommendedDuration?: number
  priceLevel?: string
  priority?: Priority
  touristLevel?: TouristLevel
  routeFit?: RouteFit
  why?: string
  signature?: string
  source?: string
  sourceUrl?: string
  lastVerified?: string
  notes?: string
  /** 从酒店过去的交通方式/时长 */
  transport?: string
  /** 潜在冲突/注意事项 */
  conflict?: string
  fromWishlist?: boolean
  fromDiscover?: boolean
  day?: number
  timeSlot?: string
}

export interface FixedEvent {
  id: string
  day: number
  title: string
  titleKr?: string
  time?: string
  venue?: string
  area?: string
  address?: string
  nearestStation?: string
  notes?: string
  /** 潜在冲突提示（如周一休息） */
  conflict?: string
  confirmed: boolean
  kind: 'FIXED'
}

export interface Conflict {
  reason: string
  fix: string
}

export interface TimelineItem {
  time?: string
  type: 'fixed' | 'place' | 'food' | 'coffee' | 'free' | 'transit' | 'note' | 'return'
  title: string
  detail?: string
  placeId?: string
  /** 固定活动（红色标记） */
  fixed?: boolean
  /** 最高优先级（如 EXO） */
  highlight?: boolean
  /** 交通说明 */
  traffic?: string
}

export interface DayPlan {
  day: number
  date: string
  label: string
  weekday: string
  title: string
  fixed: FixedEvent[]
  focus: string[]
  suggested: string[]
  notes?: string
  /** 今日路线说明 —— 为什么这样安排 */
  routeNote?: string
  conflicts?: Conflict[]
  timeline?: TimelineItem[]
}

export interface FlightLeg {
  flightNo: string
  route: string
}

export interface Flight {
  id: 'outbound' | 'return'
  label: string
  date: string
  route: string
  flights: FlightLeg[]
  transfers: number
  departTime: string
  arriveTime: string
  arriveDayNote?: string
  price?: number
  priceNote?: string
  airport?: string
  terminal?: string
  note?: string
  confirmed: boolean
}

export interface Hotel {
  name: string
  nameKr?: string
  address: string
  area: string
  checkIn: string
  checkOut: string
  nights: number
  price?: number
  priceNote?: string
  roomType: string
  note?: string
}
