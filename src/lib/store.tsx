import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { WishlistStatus } from '../types'
import { STATUS_ORDER } from './utils'

const KEY = 'seoul-2026:statuses'

type StatusMap = Record<string, WishlistStatus>

interface StoreValue {
  statuses: StatusMap
  statusFor: (id: string, fallback: WishlistStatus | undefined) => WishlistStatus | undefined
  setStatus: (id: string, s: WishlistStatus) => void
  cycleStatus: (id: string) => void
  isPlanned: (id: string) => boolean
  togglePlanned: (id: string) => void
  plannedIds: string[]
}

const StoreContext = createContext<StoreValue | null>(null)

function load(): StatusMap {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    return JSON.parse(raw) as StatusMap
  } catch {
    return {}
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<StatusMap>(() => load())

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(statuses))
    } catch {
      // storage may be unavailable (private browsing) — nothing to do
    }
  }, [statuses])

  const value = useMemo<StoreValue>(() => {
    const setStatus = (id: string, s: WishlistStatus) =>
      setStatuses((prev) => ({ ...prev, [id]: s }))

    const cycleStatus = (id: string) =>
      setStatuses((prev) => {
        const cur = prev[id]
        const idx = cur ? STATUS_ORDER.indexOf(cur) : -1
        const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
        return { ...prev, [id]: next }
      })

    const statusFor = (id: string, fallback: WishlistStatus | undefined) =>
      statuses[id] ?? fallback

    const isPlanned = (id: string) => statuses[id] === 'PLANNED'

    const togglePlanned = (id: string) =>
      setStatuses((prev) => ({ ...prev, [id]: prev[id] === 'PLANNED' ? 'WANT' : 'PLANNED' }))

    const plannedIds = Object.keys(statuses).filter((id) => statuses[id] === 'PLANNED')

    return { statuses, statusFor, setStatus, cycleStatus, isPlanned, togglePlanned, plannedIds }
  }, [statuses])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
