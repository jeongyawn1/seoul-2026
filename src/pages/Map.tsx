import { useMemo } from 'react'
import { PLACES } from '../data/places'
import MapView from '../components/MapView'
import { SectionHeading } from '../components/ui'

export default function MapPage() {
  const mapped = useMemo(() => PLACES.filter((p) => p.lat != null && p.lng != null), [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="地图"
        title="所有地点一张图"
        sub={`${mapped.length} 个地点（坐标为大致位置）——点图钉看详情，精确路线请用卡片里的地图搜索链接。`}
      />

      <MapView
        places={mapped}
        className="h-[60vh] sm:h-[65vh] w-full rounded-2xl overflow-hidden border border-line"
      />

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {mapped.map((p) => (
          <div key={p.id} className="flex items-center gap-2 text-[13px]">
            <span className="inline-block w-2 h-2 rounded-full bg-seoul shrink-0" />
            <span className="font-medium text-ink">{p.name}</span>
            <span className="text-graywarm truncate">· {p.area}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
