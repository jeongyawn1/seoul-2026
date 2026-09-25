import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { WishlistStatus } from '../types'
import { STATUS_ORDER } from './utils'

const STATUS_KEY = 'seoul-2026:statuses'
const CHECK_KEY = 'seoul-2026:checklist'

type StatusMap = Record<string, WishlistStatus>
type CheckMap = Record<string, boolean>

interface StoreValue {
  statuses: StatusMap
  statusFor: (id: string, fallback: WishlistStatus | undefined) => WishlistStatus | undefined
  setStatus: (id: string, s: WishlistStatus) => void
  cycleStatus: (id: string) => void
  isPlanned: (id: string) => boolean
  togglePlanned: (id: string) => void
  plannedIds: string[]
  // 清单（美食「已吃」/ 购物「已购买」）
  checked: CheckMap
  isChecked: (id: string) => boolean
  toggleChecked: (id: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

function load<T>(key: string): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return {} as T
    return JSON.parse(raw) as T
  } catch {
    return {} as T
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<StatusMap>(() => load(STATUS_KEY))
  const [checked, setChecked] = useState<CheckMap>(() => load(CHECK_KEY))

  useEffect(() => {
    try {
      localStorage.setItem(STATUS_KEY, JSON.stringify(statuses))
    } catch {
      // 隐私模式下可能不可用
    }
  }, [statuses])

  useEffect(() => {
    try {
      localStorage.setItem(CHECK_KEY, JSON.stringify(checked))
    } catch {
      // 隐私模式下可能不可用
    }
  }, [checked])

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

    const isChecked = (id: string) => checked[id] === true

    const toggleChecked = (id: string) =>
      setChecked((prev) => ({ ...prev, [id]: prev[id] === true ? false : true }))

    return {
      statuses,
      statusFor,
      setStatus,
      cycleStatus,
      isPlanned,
      togglePlanned,
      plannedIds,
      checked,
      isChecked,
      toggleChecked,
    }
  }, [statuses, checked])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
