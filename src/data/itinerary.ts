import type { DayIntensity, DayPlan, FixedEvent } from '../types'
import { DATE_LABELS } from './trip'

// ---------------------------------------------------------------------------
// 五天行程骨架。固定活动（FIXED）已锁定，绝不修改。
// `suggested` 是可灵活调整的地点（按地理顺序粗略排序，读起来像一条可步行的路线）。
// `timeline` 是当天按时间顺序的「今天去哪 → 几点去 → 怎么去 → 吃什么」。
// `routeNote` 解释「为什么这样安排」。
// ---------------------------------------------------------------------------

export const FIXED_EVENTS: FixedEvent[] = [
  {
    id: 'ev-touch-five',
    day: 1,
    title: 'Touch Five 演出',
    titleKr: '터치 파이브',
    time: '20:00（周六场，约 70 分钟，以票面为准）',
    venue: 'Touch Five 专用馆（弘大）',
    area: '弘大 / 麻浦',
    address: '서울 마포구 와우산로 76-1 (서교동) B1·B2',
    nearestStation: '弘大入口站 / 上水站',
    notes: '女性 19+ 专属演出。建议开场前 30 分钟到达。座位先到先得/随机分配。',
    confirmed: true,
    kind: 'FIXED',
  },
  {
    id: 'ev-exo-concert',
    day: 2,
    title: 'EXO 首尔安可演唱会',
    titleKr: 'EXO PLANET #6 — EXhOrizon [dot]',
    time: '17:00（周日场，以票面为准）',
    venue: 'KSPO DOME（奥林匹克公园体操竞技场）',
    area: '松坡 · 奥林匹克公园',
    address: '서울 송파구 올림픽로 424',
    nearestStation: '奥林匹克公园站（5/9 号线）3 号出口',
    notes: '本次旅行最高优先级。建议提前 1.5–2 小时到场（买周边/入场）。散场地铁拥挤。',
    confirmed: true,
    kind: 'FIXED',
  },
  {
    id: 'ev-wild-wild',
    day: 3,
    title: 'WILD WILD 演出',
    titleKr: '와일드 와일드',
    time: '待确认（公开信息：周一休息）',
    venue: '明宝艺术厅 B1（명보아트홀）',
    area: '乙支路 / 明洞',
    address: '서울 중구 마른내로 47, B1',
    nearestStation: '乙支路 3 街站 8 号出口',
    notes: '女性 19+ 专属。需实名换票，建议提前约 1 小时到达。',
    conflict: '⚠️ 11/09 是周一。据当前公开信息 WILD WILD 周一休息（周二–周四 20:00，周五/六 16:00&20:00，周日 15:00&19:00）。请务必确认票面日期/是否加场。',
    confirmed: true,
    kind: 'FIXED',
  },
]

export const DAY_PLANS: DayPlan[] = [
  {
    day: 1,
    date: DATE_LABELS[0].date,
    label: DATE_LABELS[0].label,
    weekday: DATE_LABELS[0].weekday,
    title: '抵达首尔 + Touch Five',
    fixed: [FIXED_EVENTS[0]],
    focus: ['落地入住', '晚上 Touch Five（弘大）'],
    suggested: ['sinchon-gamjatang'],
    notes: '抵达日，不当作完整旅游日。酒店 15:00 后可入住，Touch Five 20:00 开场，衔接充裕。',
    routeNote:
      '今天是抵达日，不安排景点。落地仁川 → AREX 机场快线到弘大 → 入住 Loft13（新村/弘大）→ 休息 → 晚上 Touch Five 就在弘大，步行可达。',
    conflicts: [],
    timeline: [
      { time: '07:20', type: 'note', title: '去程起飞', detail: '成都 → 中转（北京大兴 PKX）→ 首尔。MU6646 / MU2073' },
      { time: '14:40', type: 'note', title: '抵达仁川国际机场 ICN', detail: '入境 + 取行李约 1 小时。航站楼待确认。', traffic: '🛬 落地' },
      { time: '15:40', type: 'transit', title: '机场快线 AREX → 弘大入口站', detail: '约 53 分钟', traffic: '🚇 AREX 直达' },
      { time: '16:45', type: 'note', title: '入住 Loft13 Hongdae Sinchon', detail: '15:00 后入住，放行李、简单休息', placeId: 'sinchon-gamjatang' },
      { time: '19:30', type: 'transit', title: '前往 Touch Five', detail: '弘大，步行或一站地铁', traffic: '🚶 步行约 10 分钟' },
      { time: '20:00', type: 'fixed', title: 'Touch Five 演出（约 70 分钟）', detail: '女性 19+ 专属 · 弘大', fixed: true },
      { time: '21:15', type: 'food', title: '晚餐（新村/弘大）', detail: '新村土豆脊骨汤 24 小时，或弘大夜宵', placeId: 'sinchon-gamjatang' },
      { time: '22:30', type: 'note', title: '返回酒店休息', detail: '养精蓄锐，明天是 EXO' },
    ],
  },
  {
    day: 2,
    date: DATE_LABELS[1].date,
    label: DATE_LABELS[1].label,
    weekday: DATE_LABELS[1].weekday,
    title: 'EXO 首尔安可（最高优先级）',
    fixed: [FIXED_EVENTS[1]],
    focus: ['EXO 首尔安可（17:00）', '轻松白天 · 不跨区折腾'],
    suggested: ['sinchon-gamjatang', 'mcdonalds-korea'],
    notes: '演唱会日。白天几乎不安排，休息好、吃好、提前到场。',
    routeNote:
      '今天是最高优先级——EXO 首尔安可（周日场 17:00，KSPO Dome）。白天轻松，不跨城区；提前到奥林匹克公园买官方周边、入场。',
    conflicts: [],
    timeline: [
      { time: '10:00', type: 'food', title: '酒店附近早餐/早午餐', detail: '新村/弘大，轻松解决' },
      { time: '12:00', type: 'food', title: '午餐', detail: '新村土豆脊骨汤（24h，离酒店近）', placeId: 'sinchon-gamjatang' },
      { time: '14:00', type: 'transit', title: '前往 KSPO Dome', detail: '弘大 → 奥林匹克公园站（5/9 号线），约 50–60 分钟', traffic: '🚇 Line 2 → Line 5/9' },
      { time: '15:00', type: 'place', title: '抵达场馆 · 买官方周边/打卡', detail: '奥林匹克公园站 3 号出口步行约 10 分钟' },
      { time: '16:00', type: 'note', title: '入场就座', detail: '建议提前 1 小时入场' },
      { time: '17:00', type: 'fixed', title: '🎤 EXO 首尔安可（约 2.5 小时）', detail: 'KSPO DOME · 周日场', fixed: true, highlight: true },
      { time: '19:30', type: 'note', title: '演出结束 · 散场', detail: '散场地铁拥挤，慢慢来' },
      { time: '20:30', type: 'food', title: '晚餐/宵夜', detail: '场馆附近 或 返回新村/弘大（24 小时脊骨汤/快餐）', placeId: 'mcdonalds-korea' },
      { time: '22:30', type: 'note', title: '返回酒店', detail: '地铁末班车时间注意（约 24:00）' },
    ],
  },
  {
    day: 3,
    date: DATE_LABELS[2].date,
    label: DATE_LABELS[2].label,
    weekday: DATE_LABELS[2].weekday,
    title: '市中心 + 南山塔 + WILD WILD',
    fixed: [FIXED_EVENTS[2]],
    focus: ['清溪川 / Seoul My Soul', '明洞购物', 'N 首尔塔（下午/日落）', 'WILD WILD（晚，待确认）'],
    suggested: ['cheonggyecheon', 'n-seoul-tower', 'loe', 'juuneedu', 'alo', 'nogari-alley', 'ikseon-dong', 'sewoon-plaza'],
    notes: '集中市中心（明洞/清溪川/南山），减少跨区折返。',
    routeNote:
      '今天集中市中心：清溪川 Seoul My Soul → 明洞购物（LOE/Juuneedu/ALO）→ 南山塔下午去、看日落夜景 → 晚上 WILD WILD（就在乙支路/明洞一带）。',
    conflicts: [
      {
        reason: '11/09 是周一，据当前公开信息 WILD WILD 周一休息，可能存在冲突。',
        fix: '请务必确认票面日期/是否加场。若确认可入场再按此行程执行；若周一不演，请与主办方协调改期（固定活动优先，不可擅自取消）。',
      },
    ],
    timeline: [
      { time: '09:30', type: 'food', title: '早餐', detail: '酒店附近' },
      { time: '10:30', type: 'place', title: '清溪川 + Seoul My Soul 打卡', detail: '首尔广场（市厅站 5 号出口），溪流散步', placeId: 'cheonggyecheon', traffic: '🚇 弘大 → 市厅站约 15 分钟' },
      { time: '12:00', type: 'food', title: '明洞午餐', detail: '明洞商圈' },
      { time: '13:00', type: 'place', title: '明洞购物', detail: 'LOE 明洞旗舰 / Juuneedu 明洞 / ALO 乐天明洞', placeId: 'loe', traffic: '🚶 清溪川 → 明洞步行约 10 分钟' },
      { time: '14:30', type: 'transit', title: '前往南山', detail: '明洞 → 缆车/公交/打车', traffic: '🚡 南山缆车' },
      { time: '15:30', type: 'place', title: 'N 首尔塔 · 爱情锁 · 观景', detail: '日落约 17:10，日落前 30–45 分钟到', placeId: 'n-seoul-tower' },
      { time: '18:00', type: 'food', title: '下山 · 晚餐', detail: '明洞/乙支路', placeId: 'nogari-alley' },
      { time: '20:00', type: 'fixed', title: 'WILD WILD 演出', detail: '明宝艺术厅 B1 · 乙支路 3 街站 8 号口（周一待确认）', fixed: true },
      { time: '21:15', type: 'food', title: '乙支路 노가리 胡同宵夜', detail: '烤鱼干 + 啤酒（可选）', placeId: 'nogari-alley' },
      { time: '22:30', type: 'note', title: '返回酒店', detail: '乙支路 3 街 → 新村/弘大（地铁约 20–30 分钟）' },
    ],
  },
  {
    day: 4,
    date: DATE_LABELS[3].date,
    label: DATE_LABELS[3].label,
    weekday: DATE_LABELS[3].weekday,
    title: '圣水全日 · 购物美食咖啡',
    fixed: [],
    focus: ['圣水潮流/买手店', '香水（SW19/Loewe/Le Labo）', 'milky 黄油饼干', '汉江拉面（天气好）'],
    suggested: [
      'gentle-monster',
      'sw19',
      'milky-butter',
      'loewe-perfume-seongsu',
      'juuneedu',
      'onion',
      'daelim-changgo',
      'nudake',
      'tamburins',
      'ader-error',
      'seongsu-shoes',
      'seoul-forest',
      'han-river-ramen',
      'western-food',
      'le-labo-citron',
      'hanna543',
    ],
    notes: '完整自由日（周二，各店基本营业）。集中圣水，最大化减少跨区折返。',
    routeNote:
      '今天集中圣水（周二），GM / SW19 / milky / Loewe Perfumes / Juuneedu 首尔林都在圣水，步行串联。HANNA543 与 ALO 不在圣水（在新沙/汉南、岛山/明洞），Le Labo 在汉南/清潭——已在备注说明，可另安排半天或取舍。',
    conflicts: [
      {
        reason: 'HANNA543 戒指为定制，制作期约 7 天，5 天行程内可能拿不到现货。',
        fix: '出发前电话确认是否有现货/可否缩短工期；若否，改为网购或放弃（新沙/汉南店离圣水较远，勿硬塞）。',
      },
    ],
    timeline: [
      { time: '09:30', type: 'food', title: '早餐/咖啡', detail: '酒店附近' },
      { time: '10:30', type: 'transit', title: '前往圣水', detail: '弘大入口 Line 2 直达圣水站，约 30 分钟', traffic: '🚇 Line 2 直达' },
      { time: '11:00', type: 'place', title: 'Gentle Monster HAUS NOWHERE 圣水', detail: '뚝섬로 433 · 11:00 开门', placeId: 'gentle-monster' },
      { time: '12:30', type: 'coffee', title: '圣水咖啡/早午餐', detail: 'Onion / 大林仓库 等', placeId: 'onion' },
      { time: '14:00', type: 'place', title: 'SW19 香水', detail: '연무장길 48-1', placeId: 'sw19', traffic: '🚶 圣水站周边步行串联' },
      { time: '15:00', type: 'place', title: 'milky 黄油饼干（伴手礼）', detail: '연무장길 9-1 · 可能需现金', placeId: 'milky-butter' },
      { time: '15:45', type: 'place', title: '圣水买手店/独立品牌', detail: 'Ader Error / Tamburins / 手制鞋街', placeId: 'ader-error' },
      { time: '16:45', type: 'place', title: '汉江拉面（天气好才去）', detail: '纛岛（뚝섬）汉江公园 · 便利店煮面看夕阳；天气差改室内', placeId: 'han-river-ramen' },
      { time: '18:30', type: 'food', title: '晚餐（西餐/本地美食）', detail: '圣水 或 汉南洞，现场看评分选', placeId: 'western-food' },
      { time: '20:00', type: 'note', title: '返回酒店', detail: '圣水 Line 2 直达弘大' },
    ],
  },
  {
    day: 5,
    date: DATE_LABELS[4].date,
    label: DATE_LABELS[4].label,
    weekday: DATE_LABELS[4].weekday,
    title: '返程 + 最后购物',
    fixed: [],
    focus: ['最后购物（Olive Young/伴手礼）', '退房', '前往仁川机场'],
    suggested: ['olive-young', 'auntie-annes', 'mcdonalds-korea', 'fritz-coffee'],
    notes: '返程日（ICN 15:40 起飞），不当作完整旅游日。',
    routeNote:
      '返程日，仁川机场 15:40 起飞，国际航班建议提前 3 小时到（约 12:40）。上午酒店附近最后购物，11:00 退房，11:30 前往机场。',
    conflicts: [],
    timeline: [
      { time: '07:30', type: 'note', title: '起床', detail: '' },
      { time: '08:00', type: 'food', title: '早餐', detail: '韩国麦当劳 / Auntie Anne’s 或酒店附近', placeId: 'auntie-annes' },
      { time: '08:30', type: 'place', title: '最后购物', detail: 'Olive Young、伴手礼、零食、咖啡', placeId: 'olive-young', traffic: '🚶 酒店周边（新村/弘大）' },
      { time: '10:30', type: 'note', title: '返回酒店 · 整理行李', detail: '' },
      { time: '11:00', type: 'note', title: '退房 · 取行李', detail: '11:00 前退房' },
      { time: '11:30', type: 'transit', title: '弘大入口站 → AREX 机场快线', detail: '约 53 分钟直达仁川机场', traffic: '🚇 AREX 直达' },
      { time: '12:30', type: 'note', title: '抵达 ICN · 值机/托运', detail: '建议 12:40 前到机场' },
      { time: '15:40', type: 'return', title: '返程起飞', detail: '首尔 → 中转（北京大兴 PKX）→ 成都。MU2074 / MU6649' },
      { time: '次日 00:25', type: 'note', title: '抵达成都', detail: '11/12 00:25' },
    ],
  },
]

export const DAY_PLANS_BY_DAY: Record<number, DayPlan> = Object.fromEntries(
  DAY_PLANS.map((d) => [d.day, d]),
)

export function dayPlan(day: number): DayPlan | undefined {
  return DAY_PLANS_BY_DAY[day]
}

export function computeIntensity(plan: DayPlan): DayIntensity {
  const n = plan.fixed.length + plan.suggested.length
  if (n <= 2) return 'RELAXED'
  if (n <= 6) return 'MODERATE'
  return 'HEAVY'
}
