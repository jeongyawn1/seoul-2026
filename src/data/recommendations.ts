import type { Place } from '../types'
import { PLACES_BY_ID } from './places'

// ---------------------------------------------------------------------------
// 「本地推荐」—— 首页的高亮推荐横条，刻意偏向小众/本地生活而非大众景点。
// ---------------------------------------------------------------------------

export interface LocalPick {
  id: string
  tag: string
  blurb: string
}

const PICKS: LocalPick[] = [
  { id: 'daelim-changgo', tag: '圣水', blurb: '圣水工业风咖啡鼻祖——旧仓库改造，出片又本地。' },
  { id: 'nogari-alley', tag: '乙支路', blurb: '烤鱼干 + 啤酒的老胡同，本地人下班后的真实首尔。' },
  { id: 'mangwon-market', tag: '望远', blurb: '没有广藏市场人潮的真实邻里市场，小吃多。' },
  { id: 'sewoon-plaza', tag: '乙支路', blurb: '复古电子卖场 + 天台，换个角度看整座城市。' },
  { id: 'le-labo-citron', tag: '汉南', blurb: 'CITRON 28——Le Labo 首尔城市限定，只在这里买得到。' },
  { id: 'seoul-forest', tag: '圣水', blurb: '给购物日更慢节奏的城市绿肺，河滨步道。' },
]

export const LOCAL_PICKS: (LocalPick & { place: Place })[] = PICKS.map((p) => ({
  ...p,
  place: PLACES_BY_ID[p.id],
})).filter((p) => p.place)

export const ALL_PICKS = PICKS

// ---------------------------------------------------------------------------
// 「附近推荐」—— 按区域聚类，展示某个区域里 500m/1km 半径内的咖啡/购物/香水/餐厅。
// 用 `distance` 表示「相对该区域的步行距离档位」，供推荐页使用。
// ---------------------------------------------------------------------------

export interface NearbyRec {
  placeId: string
  /** 'within' = 区域内步行可达 · 'near' = 1km 内 / 稍远 */
  distance: 'within' | 'near'
  stayMinutes: number
}

export const AREA_RECS: Record<string, NearbyRec[]> = {
  圣水: [
    { placeId: 'gentle-monster', distance: 'within', stayMinutes: 60 },
    { placeId: 'sw19', distance: 'within', stayMinutes: 40 },
    { placeId: 'milky-butter', distance: 'within', stayMinutes: 30 },
    { placeId: 'loewe-perfume-seongsu', distance: 'within', stayMinutes: 40 },
    { placeId: 'onion', distance: 'within', stayMinutes: 45 },
    { placeId: 'daelim-changgo', distance: 'within', stayMinutes: 60 },
    { placeId: 'nudake', distance: 'within', stayMinutes: 40 },
    { placeId: 'tamburins', distance: 'within', stayMinutes: 45 },
    { placeId: 'ader-error', distance: 'within', stayMinutes: 60 },
    { placeId: 'seongsu-shoes', distance: 'near', stayMinutes: 60 },
    { placeId: 'seoul-forest', distance: 'near', stayMinutes: 90 },
  ],
  汉南洞: [
    { placeId: 'le-labo-citron', distance: 'within', stayMinutes: 40 },
    { placeId: 'low-coffee', distance: 'within', stayMinutes: 45 },
    { placeId: 'western-food', distance: 'within', stayMinutes: 90 },
  ],
  乙支路: [
    { placeId: 'nogari-alley', distance: 'within', stayMinutes: 90 },
    { placeId: 'sewoon-plaza', distance: 'near', stayMinutes: 60 },
  ],
}
