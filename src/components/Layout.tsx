import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { TRIP } from '../data/trip'

const NAV: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: '首页', end: true },
  { to: '/itinerary', label: '行程' },
  { to: '/map', label: '地图' },
  { to: '/food', label: '美食' },
  { to: '/shopping', label: '购物' },
  { to: '/budget', label: '预算' },
  { to: '/recommendations', label: '推荐' },
  { to: '/trip-info', label: '旅行信息' },
]

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-baseline gap-2 min-w-0">
            <span className="font-serif text-lg tracking-widest2 font-semibold text-ink">
              🇰🇷 {TRIP.title}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-graywarm hidden sm:inline whitespace-nowrap">
              {TRIP.dateRange}
            </span>
          </NavLink>
          <span className="text-[10px] text-graywarm whitespace-nowrap">
            {TRIP.days} 天 · {TRIP.nights} 晚
          </span>
        </div>
        <nav className="max-w-5xl mx-auto px-2 sm:px-4 pb-2 flex gap-1 overflow-x-auto no-scrollbar">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-paper2'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line py-6 mt-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-2 text-[11px] text-graywarm">
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-between">
            <span>🇰🇷 首尔 · 2026.11.07 — 11.11 · EXO / 美食 / 咖啡 / 首尔生活</span>
            <span>营业时间、价格、库存和活动信息可能变化，出发前请再次确认</span>
          </div>
          <span>数据最后检查时间：2026-09-25</span>
        </div>
      </footer>
    </div>
  )
}
