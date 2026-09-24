import { CalendarDays, MapPin, ShieldCheck, Ticket } from 'lucide-react'
import { TRIP } from '../data/trip'
import { DAY_PLANS } from '../data/itinerary'
import { PLACES } from '../data/places'
import { SectionHeading } from '../components/ui'

const CHECKLIST = [
  'Check passport validity (6+ months from return)',
  'Confirm visa / K-ETA requirements for your nationality',
  'Save concert tickets offline (EXO, Touch Five, WILD WILD)',
  'Get a T-money card or transit app for the subway',
  'Arrange mobile data (eSIM or pocket WiFi)',
  'Download Naver Map / Kakao Map before arrival',
  'Check the weather and pack layers for November',
  'Bring a Type F power adapter',
]

export default function TripInfo() {
  const unverified = PLACES.filter((p) => p.lastVerified?.toLowerCase().includes('not yet verified'))
  const fixedEvents = DAY_PLANS.flatMap((d) => d.fixed)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SectionHeading
        eyebrow="Trip info"
        title="The essentials"
        sub="Dates, fixed events, and a pre-flight checklist — all in one place."
      />

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        <div className="bg-white border border-line rounded-2xl p-4">
          <CalendarDays size={18} className="text-seoul mb-2" />
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm">Dates</p>
          <p className="font-semibold text-ink">07 — 11 NOV 2026</p>
          <p className="text-[12px] text-graywarm">{TRIP.days} days · {TRIP.nights} nights</p>
        </div>
        <div className="bg-white border border-line rounded-2xl p-4">
          <MapPin size={18} className="text-seoul mb-2" />
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm">Destination</p>
          <p className="font-semibold text-ink">Seoul, South Korea</p>
          <p className="text-[12px] text-graywarm">Seongsu · Hannam · Euljiro</p>
        </div>
        <div className="bg-white border border-line rounded-2xl p-4">
          <Ticket size={18} className="text-seoul mb-2" />
          <p className="text-[11px] uppercase tracking-widest2 text-graywarm">Fixed events</p>
          <p className="font-semibold text-ink">{fixedEvents.length} booked</p>
          <p className="text-[12px] text-graywarm">EXO on 08 NOV</p>
        </div>
      </div>

      <section className="mb-10">
        <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">Fixed events</h3>
        <div className="space-y-2">
          {fixedEvents.map((ev) => (
            <div key={ev.id} className="flex items-start gap-3 bg-white border border-line rounded-xl px-4 py-3">
              <Ticket size={18} className="text-wine mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-ink">
                  {ev.title}
                  <span className="text-[11px] font-normal text-graywarm ml-2">Day {ev.day}</span>
                </p>
                <p className="text-[12px] text-graywarm">
                  {[ev.time, ev.venue, ev.area].filter(Boolean).join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">Before you go</h3>
        <ul className="bg-white border border-line rounded-2xl divide-y divide-line">
          {CHECKLIST.map((c) => (
            <li key={c} className="px-4 py-2.5 text-sm text-ink-soft">
              {c}
            </li>
          ))}
        </ul>
      </section>

      {unverified.length > 0 ? (
        <section className="mb-10">
          <h3 className="text-[12px] uppercase tracking-widest2 text-graywarm mb-3">Information to confirm</h3>
          <div className="bg-white border border-line rounded-2xl p-5">
            <p className="text-sm text-ink-soft mb-3">
              These places still need their hours or exact location confirmed before you go:
            </p>
            <div className="flex flex-wrap gap-2">
              {unverified.map((p) => (
                <span key={p.id} className="px-2.5 py-1 rounded-full bg-paper2 text-[12px] text-ink-soft border border-line">
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-paper2 border border-line rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-seoul mt-0.5 shrink-0" />
          <div className="text-sm text-ink-soft leading-relaxed">
            <p className="font-semibold text-ink mb-1">Privacy note</p>
            <p>
              This is a public site, so it contains no passports, ID numbers, phone numbers, private
              accounts, passwords, booking or payment details, private messages, API keys, or tokens.
              Any personal details are kept off this page on purpose.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
