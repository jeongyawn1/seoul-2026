import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { TRIP } from '../data/trip'

const NAV: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/itinerary', label: 'Itinerary' },
  { to: '/map', label: 'Map' },
  { to: '/discover', label: 'Discover' },
  { to: '/food', label: 'Food' },
  { to: '/shopping', label: 'Shopping' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/budget', label: 'Budget' },
  { to: '/info', label: 'Trip Info' },
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
            <span className="font-serif text-lg tracking-widest2 font-semibold text-ink">SEOUL</span>
            <span className="text-[10px] uppercase tracking-widest text-graywarm hidden sm:inline whitespace-nowrap">
              {TRIP.dateRange}
            </span>
          </NavLink>
          <span className="text-[10px] uppercase tracking-widest text-graywarm whitespace-nowrap">
            {TRIP.days} days · {TRIP.nights} nights
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap gap-x-4 gap-y-1 justify-between text-[11px] text-graywarm">
          <span>SEOUL · 07—11 NOV 2026 · EXO / FOOD / COFFEE / SEOUL LIFE</span>
          <span>Personal guide · unverified details are marked</span>
        </div>
      </footer>
    </div>
  )
}
