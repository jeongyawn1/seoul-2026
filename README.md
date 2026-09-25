# 首尔旅行 2026 · EXO 首尔安可 — 旅行控制中心

一个可公开部署的静态旅行规划网站，用于 **2026 年 11 月 7 日 — 11 日（5 天 4 晚）** 的首尔之行。
无需登录、无需安装，把链接发到微信群 / LINE / WhatsApp / Telegram，同伴点开即看。

**线上地址：** https://jeongyawn1.github.io/seoul-2026/

## 功能亮点

- **首页** — 旅行 Hero、航班 / 酒店信息卡、**下一站**、**现在做什么**、**本地推荐**、**漫游模式**、五天强度概览。
- **行程** — 五天逐日时间线，锁定 **固定活动**（Touch Five · **EXO 首尔安可** · WILD WILD），其余为可灵活调整的建议地点；自动计算每天强度（轻松 / 适中 / 紧凑），并标注路线说明与冲突提示。
- **地图** — Leaflet 地图（OpenStreetMap 瓦片，无需 API Key），坐标为大致位置，精确路线用每张卡片里的 Google Maps / Naver / Kakao 搜索链接。
- **美食** — 🍜 美食清单（勾选「已吃」）+ 按品类分组的餐厅咖啡。
- **购物** — 🛍 购物清单（勾选「已购买」）+ 按品类分组的时尚 / 香水 / 美妆 / 首饰。
- **预算** — 人民币 ¥ + 韩元 ₩ 双币显示，汇率可编辑，状态标注 已确定 / 预计 / 可选。
- **推荐** — 首尔生活打卡点，按区域聚类（约 500m 步行串联 / 1km 内），减少跨城折返。
- **旅行信息** — 固定活动、出发前清单、待确认事项、隐私说明。

清单勾选、心愿状态、汇率都保存在浏览器本地（`localStorage`），换设备会各自独立保存。

## 技术栈

React 19 · TypeScript · Vite · Tailwind CSS v3 · Leaflet · lucide-react ·
react-router（HashRouter，GitHub Pages 深链接可用）。

## 本地运行

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 类型检查 + 生产构建 → dist/
npm run preview   # 预览生产构建
```

> 国内网络可用镜像安装：`npm install --registry=https://registry.npmmirror.com`

## 部署到 GitHub Pages

项目已配置 `base: '/seoul-2026/'`，并使用 `HashRouter`，因此可直接作为项目页面部署到
`https://<用户名>.github.io/seoul-2026/`。

### 方式 A — 自动（推荐）

1. 在 GitHub 上创建名为 **`seoul-2026`** 的仓库。
2. 将本目录推送到 `main` 分支：

   ```bash
   cd seoul-2026
   git init
   git add .
   git commit -m "Seoul 2026 travel guide"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/seoul-2026.git
   git push -u origin main
   ```

3. 打开仓库 → **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。
4. 项目自带的 `.github/workflows/deploy.yml` 会在每次推送到 `main` 时自动构建发布，
   站点上线于 `https://<你的用户名>.github.io/seoul-2026/`。

> 若 CI 构建时拉包失败（lockfile 生成自国内镜像），执行
> `npm config set registry https://registry.npmjs.org`，
> 再 `rm package-lock.json && npm install` 并重新推送。

### 方式 B — 手动

```bash
npm install
npm run build

# 把 dist/ 推送到 gh-pages 分支
npx gh-pages -d dist
```

然后把 Pages source 设为 `gh-pages` 分支。

## 如何修改数据

所有地点数据都在 `src/data/` 下，UI 与数据完全分离：

- `trip.ts` — 行程标题 / 日期 / 天数。
- `flights.ts` — 航班信息（去程 / 回程）。
- `hotel.ts` — 酒店信息。
- `itinerary.ts` — 五天行程、固定活动、时间线、路线说明、冲突提示。
- `places.ts` / `restaurants.ts` / `shopping.ts` — 地点、餐厅、购物。
- `recommendations.ts` — 本地推荐 + 附近推荐（区域聚类）。
- `budget.ts` — 预算项目（CNY + KRW）。

改完数据后运行 `npm run build` 即可。

## 数据与隐私

- **这是一个公开站点，因此刻意不含** 护照、身份证号、手机号、私人账号、密码、订票或支付信息、
  私人聊天记录、API Key 或令牌。
- 无法确认的营业时间 / 价格 / 地址一律标注 **「待确认」**，绝不编造。
- 没有虚构的点评、图片、地址或营业时间——不确定的地方会明确说明。
- 金额仅为旅行预算估算，不代表真实支付信息。
