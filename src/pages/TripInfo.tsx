import { CalendarDays, MapPin, ShieldCheck, Ticket } from 'lucide-react'
import { TRIP } from '../data/trip'
import { DAY_PLANS } from '../data/itinerary'
import { PLACES } from '../data/places'
import { FLIGHTS } from '../data/flights'
import { SectionHeading } from '../components/ui'

const CHECKLIST = [
  '检查护照有效期（返程日起至少 6 个月）',
  '确认签证 / K-ETA 要求（按国籍）',
  '演出票离线保存（EXO / Touch Five / WILD WILD）',
  '办理 T-money 交通卡或下载交通 App',
  '准备移动网络（eSIM 或口袋 WiFi）',
  '提前下载 Naver Map / Kakao Map',
  '关注天气，11 月准备叠穿衣物',
  '带 Type F 电源转换插头',
]

const UNCONFIRMED_NOTES = [
  '航班：首尔侧机场为仁川 ICN（据 MU2073 / MU2074），航站楼待确认。',
  'EXO 首尔安可票价待确认（以官方购票渠道为准）。',
  'WILD WILD：11/09 是周一，公开信息显示周一休息，务必确认票面日期 / 是否加场。',
  'HANNA543 戒指为定制，制作期约 7 天，行程内可能拿不到现货。',
  'LOE 香水品牌待确认（로에 LOE vs Loewe Perfumes），出发前确认图片中的品牌。',
  'SUHO 泡泡同款餐厅无法从图片识别，待补充店名或原帖。',
  'milky 圣水店营业时间 / 库存 / 是否仅现金，出发前确认。',
]

function isUnconfirmed(p: (typeof PLACES)[number]): boolean {
  const text = [p.lastVerified, p.source, p.signature].filter(Boolean).join(' ')
  return text.includes('待确认') || text.includes('出发前确认')
}

export default function TripInfo() {
  const unverified = PLACES.filter(isUnconfirmed)
  const fixedEvents = DAY_PLANS.flatMap((d) => d.fixed)
  const flightTerminal = FLIGHTS.map((f) => f.terminal).filter(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="旅行信息"
        title="关键信息"
        sub="日期、固定活动、出发前清单——所有重要信息集中一处。"
      />

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        <div className="bg-white border border-line rounded-2xl p-4">
          <CalendarDays size={18} className="text-seoul mb-2" />
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm">日期</p>
          <p className="font-semibold text-ink">2026.11.07 — 11.11</p>
          <p className="text-[12px] text-graywarm">
            {TRIP.days} 天 · {TRIP.nights} 晚
          </p>
        </div>
        <div className="bg-white border border-line rounded-2xl p-4">
          <MapPin size={18} className="text-seoul mb-2" />
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm">目的地</p>
          <p className="font-semibold text-ink">韩国 · 首尔</p>
          <p className="text-[12px] text-graywarm">圣水 · 汉南 · 乙支路 · 弘大</p>
        </div>
        <div className="bg-white border border-line rounded-2xl p-4">
          <Ticket size={18} className="text-seoul mb-2" />
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm">固定活动</p>
          <p className="font-semibold text-ink">{fixedEvents.length} 个已确定</p>
          <p className="text-[12px] text-graywarm">EXO 于 11/08 · KSPO DOME</p>
        </div>
      </div>

      <section className="mb-10">
        <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">固定活动</h3>
        <div className="space-y-2">
          {fixedEvents.map((ev) => (
            <div key={ev.id} className="flex items-start gap-3 bg-white border border-line rounded-xl px-4 py-3">
              <Ticket size={18} className="text-wine mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {ev.title}
                  <span className="text-[11px] font-normal text-graywarm ml-2">第 {ev.day} 天</span>
                </p>
                <p className="text-[12px] text-graywarm">
                  {[ev.time, ev.venue, ev.area].filter(Boolean).join(' · ')}
                </p>
                {ev.conflict ? (
                  <p className="text-[12px] text-amber-800 mt-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 leading-relaxed">
                    {ev.conflict}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">出发前准备</h3>
        <ul className="bg-white border border-line rounded-2xl divide-y divide-line">
          {CHECKLIST.map((c) => (
            <li key={c} className="px-4 py-2.5 text-sm text-ink-soft">
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">待确认事项</h3>
        <div className="bg-white border border-line rounded-2xl p-5 space-y-3">
          <ul className="space-y-2">
            {UNCONFIRMED_NOTES.map((n) => (
              <li key={n} className="text-[13px] text-ink-soft leading-relaxed flex gap-2">
                <span className="text-amber-700 shrink-0">⚠️</span>
                {n}
              </li>
            ))}
          </ul>

          {unverified.length > 0 ? (
            <div>
              <p className="text-[12px] text-graywarm mb-2 mt-4">以下地点的营业时间 / 位置仍待确认：</p>
              <div className="flex flex-wrap gap-2">
                {unverified.map((p) => (
                  <span
                    key={p.id}
                    className="px-2.5 py-1 rounded-full bg-paper2 text-[12px] text-ink-soft border border-line"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {flightTerminal.length > 0 ? (
            <p className="text-[12px] text-graywarm">航班航站楼：{flightTerminal.join(' / ')}</p>
          ) : null}
        </div>
      </section>

      <section className="bg-paper2 border border-line rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-seoul mt-0.5 shrink-0" />
          <div className="text-sm text-ink-soft leading-relaxed">
            <p className="font-semibold text-ink mb-1">隐私说明</p>
            <p>
              这是一个公开分享的网站，因此不含护照、身份证号、手机号、私人账号、密码、订票或支付信息、
              私人聊天记录、API Key 或令牌。任何个人敏感信息都刻意不放在本页。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
