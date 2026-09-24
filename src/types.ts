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
  name: string
  nameKr?: string
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
  lastVerified?: string
  notes?: string
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
  notes?: string
  confirmed: boolean
  kind: 'FIXED'
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
}
