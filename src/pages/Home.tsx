import { Link } from 'react-router-dom'
import { TRIP } from '../data/trip'
import { DAY_PLANS, computeIntensity } from '../data/itinerary'
import { PLACES } from '../data/places'
import { OUTBOUND, RETURN } from '../data/flights'
import { HOTEL } from '../data/hotel'
import { DEFAULT_RATE, totalCNY } from '../data/budget'
import NextStop from '../components/NextStop'
import WhatShouldIDoNow from '../components/WhatShouldIDoNow'
import LocalPicks from '../components/LocalPicks'
import WanderMode from '../components/WanderMode'
import { SectionHeading } from '../components/ui'
import { INTENSITY_CN, INTENSITY_META, cn } from '../lib/utils'

export default function Home() {
  return (
    <div>
      <section className="border-b border-line bg-paper2/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-3">{TRIP.dateRange}</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-ink leading-none">
            🇰🇷 首尔旅行
          </h1>
          <p className="text-lg sm:text-2xl text-ink-soft mt-3 font-medium">EXO 首尔安可 · {TRIP.days} 天 {TRIP.nights} 晚</p>
          <p className="text-sm text-graywarm mt-2">{TRIP.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
            <span className="px-3 py-1 rounded-full bg-ink text-paper">{PLACES.length} 个目的地</span>
            <span className="px-3 py-1 rounded-full border border-line bg-white">{TRIP.fixedEvents} 个固定活动</span>
            <span className="px-3 py-1 rounded-full border border-line bg-white">预计 ¥{Math.round(totalCNY(DEFAULT_RATE)).toLocaleString('zh-CN')}</span>
          </div>
          <Link
            to="/itinerary"
            className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper text-[15px] font-medium hover:bg-ink-soft transition-colors"
          >
            开始旅行 →
          </Link>
        </div>
      </section>

      {/* 旅行信息卡 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-1 py-8">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-white border border-line rounded-2xl p-4">
            <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-2">✈️ 去程</p>
            <p className="font-semibold text-ink">{OUTBOUND.route}</p>
            <p className="text-[12px] text-graywarm mt-0.5">{OUTBOUND.date}</p>
            <p className="text-[12px] text-ink-soft mt-1">{OUTBOUND.departTime} → {OUTBOUND.arriveTime}</p>
            <p className="text-[11px] text-graywarm mt-0.5">{OUTBOUND.flights.map((f) => f.flightNo).join(' / ')}</p>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4">
            <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-2">🏨 酒店</p>
            <p className="font-semibold text-ink leading-tight">{HOTEL.name}</p>
            <p className="text-[12px] text-graywarm mt-0.5">{HOTEL.area}</p>
            <p className="text-[12px] text-ink-soft mt-1">{HOTEL.checkIn} 入住 → {HOTEL.checkOut} 退房</p>
          </div>
          <div className="bg-white border border-line rounded-2xl p-4">
            <p className="text-[11px] uppercase tracking-widest2 text-graywarm mb-2">✈️ 回程</p>
            <p className="font-semibold text-ink">{RETURN.route}</p>
            <p className="text-[12px] text-graywarm mt-0.5">{RETURN.date}</p>
            <p className="text-[12px] text-ink-soft mt-1">{RETURN.departTime} → {RETURN.arriveTime} +1</p>
            <p className="text-[11px] text-graywarm mt-0.5">{RETURN.flights.map((f) => f.flightNo).join(' / ')}</p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-10 space-y-12">
        <section>
          <SectionHeading eyebrow="现在" title="接下来做什么" />
          <div className="grid lg:grid-cols-2 gap-4">
            <NextStop />
            <WhatShouldIDoNow />
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="本地推荐"
            title="像本地人一样逛首尔"
            sub="我们额外补充的一些地方——不在常规清单里的市场、仓库、天台。"
          />
          <LocalPicks />
        </section>

        <section>
          <SectionHeading eyebrow="想随便走走？" title="漫游模式" />
          <WanderMode />
        </section>

        <section>
          <SectionHeading
            eyebrow="一览"
            title="五天概览"
            sub="强度由当天安排自动计算。"
          />
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {DAY_PLANS.map((d) => {
              const meta = INTENSITY_META[computeIntensity(d)]
              return (
                <Link
                  key={d.day}
                  to="/itinerary"
                  className="bg-white border border-line rounded-xl p-3 text-center hover:border-ink/30 transition-colors"
                >
                  <p className="text-[11px] text-graywarm">D{d.day}</p>
                  <p className="text-[12px] font-semibold text-ink">{d.label}</p>
                  <p className={cn('text-[10px] font-semibold mt-1', meta.className)}>{INTENSITY_CN[computeIntensity(d)]}</p>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
