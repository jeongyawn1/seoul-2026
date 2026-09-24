import { useEffect, useRef } from 'react'
import { divIcon, latLngBounds, map as createMap, marker, tileLayer } from 'leaflet'
import type { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Place } from '../types'

export default function MapView({ places, className }: { places: Place[]; className?: string }) {
  const elRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const m = createMap(el, { scrollWheelZoom: true }).setView([37.5665, 126.978], 12)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(m)

    const coords = places.filter((p) => p.lat != null && p.lng != null)
    for (const p of coords) {
      const icon = divIcon({
        className: 'seoul-pin',
        html: '<div class="pin-dot"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })
      const label = p.nameKr ? `${p.name} · ${p.nameKr}` : p.name
      marker([p.lat as number, p.lng as number], { icon })
        .addTo(m)
        .bindPopup(`<b>${label}</b><br/>${p.area}`)
    }

    if (coords.length > 0) {
      m.fitBounds(
        latLngBounds(coords.map((p) => [p.lat as number, p.lng as number] as [number, number])),
        { padding: [40, 40], maxZoom: 14 },
      )
    }

    mapRef.current = m
    return () => {
      m.remove()
      mapRef.current = null
    }
  }, [places])

  return <div ref={elRef} className={className ?? 'h-[60vh] w-full rounded-2xl overflow-hidden border border-line'} />
}
