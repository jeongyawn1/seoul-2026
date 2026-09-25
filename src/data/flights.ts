import type { Flight } from '../types'

// ---------------------------------------------------------------------------
// 航班信息 —— 依据机票截图记录。
//
// 重要：截图未显示首尔机场是 ICN（仁川）还是 GMP（金浦）。
// 根据航班号 MU2073 / MU2074 的公开信息，首尔侧机场为【仁川国际机场 ICN】，
// 航站楼待确认。出发前请务必通过航空公司/票务平台再次确认。
// ---------------------------------------------------------------------------

export const FLIGHTS: Flight[] = [
  {
    id: 'outbound',
    label: '去程',
    date: '2026-11-07',
    route: '成都 → 首尔',
    flights: [
      { flightNo: 'MU6646', route: '成都 → 中转（北京大兴 PKX）' },
      { flightNo: 'MU2073', route: '中转（北京大兴 PKX）→ 首尔' },
    ],
    transfers: 1,
    departTime: '07:20',
    arriveTime: '14:40',
    price: 1753,
    priceNote: '截图订单金额，口径待确认（单人/往返待确认）',
    airport: '仁川国际机场（ICN）',
    terminal: 'T1（待确认）',
    note: 'MU2073 为「北京大兴 PKX → 仁川 ICN」段。首尔到达机场为仁川国际机场，非金浦 GMP；航站楼待确认。',
    confirmed: false,
  },
  {
    id: 'return',
    label: '回程',
    date: '2026-11-11',
    route: '首尔 → 成都',
    flights: [
      { flightNo: 'MU2074', route: '首尔 → 中转（北京大兴 PKX）' },
      { flightNo: 'MU6649', route: '中转（北京大兴 PKX）→ 成都' },
    ],
    transfers: 1,
    departTime: '15:40',
    arriveTime: '00:25',
    arriveDayNote: '+1（11/12 抵达）',
    airport: '仁川国际机场（ICN）',
    terminal: 'T1（待确认）',
    note: '回程从仁川国际机场起飞。国际航班建议提前 3 小时到机场（约 12:40 前）。航站楼待确认。',
    confirmed: false,
  },
]

export const OUTBOUND = FLIGHTS.find((f) => f.id === 'outbound')!
export const RETURN = FLIGHTS.find((f) => f.id === 'return')!
