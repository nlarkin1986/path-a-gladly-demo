# Path A Demo — plate + Gladly Chat SDK twin

Full working mount path: **scrape pack → `demo-spec.json` → cw- overlay on a site plate.**

First E2E uses **Huckberry Fatigue Pant** existing assets (Firecrawl not required).

## Quick start

```bash
cd /workspace/path-a-demo
python3 -m http.server 8765
```

Open: **http://127.0.0.1:8765/demo.html**

Optional:

| URL | What |
|-----|------|
| `/demo.html` | Default pack `huckberry-fatigue`, PDP plate |
| `/demo.html?plate=homepage` | Homepage clean plate instead of PDP |
| `/demo.html?pack=huckberry-fatigue` | Explicit pack (pre-Firecrawl assets) |
| `/demo.html?pack=huckberry-fatigue-firecrawl` | **Live Firecrawl** scrape + screenshot + product images |
| `/pane.html?pack=huckberry-fatigue` | Twin alone (no plate) |
| `/pane.html?pack=huckberry-fatigue&animate=0` | Show all turns immediately |


## Instant compile (`instant.html`)

Warm pack + capability chips → client-side `demo-spec` → live Gladly twin. **No Firecrawl, no network scrape.**

```bash
# after local server or hosted deploy
open /instant.html
```

1. Pick **Huckberry** or **Vuori** (warm packs already on disk).
2. Toggle chips (Product discovery, Compare, Fit/refine, Social, Policy, Soft-close).
3. Each flip runs `compileDemoSpec` in the browser, `postMessage`s the compiled spec into `pane.html?live=1`, and remounts progressive play — typically **&lt;50ms** compile (first pack JSON + images cached after load).

Logic lives in `compile-spec.js` (`arrive` always kept; Compare off clears `products`; Soft-close off sets `softClose: false`).

| URL | What |
|-----|------|
| `/instant.html` | Path A instant compile spike |
| `/pane.html?live=1` | Twin accepts `{type:"path-a-mount", spec}` / `path-a-replay` from same-origin parent |

## Success criteria

1. Full-bleed **site plate** visible (PDP or homepage screenshot).
2. Bottom-right **Gladly twin** (green header, cw- chrome).
3. Conversation turns from `demo-spec.json`.
4. **Product cards** with real images from `packs/huckberry-fatigue/film-assets/`.
5. Soft-close honesty — no “Added” / Pay UI.
6. Fail-closed: a product without `imageUrl` would not render a card.

## Layout

```
path-a-demo/
├── SCHEMA.md                 # day-one contract (human)
├── demo-spec.schema.json     # machine schema
├── PIPELINE.md               # agent roles (Firecrawl → Script → Screens)
├── README.md                 # this file
├── demo.html                 # plate + iframe twin
├── instant.html              # warm pack + chips → live mount
├── compile-spec.js           # client-side demo-spec filter
├── pane.html                 # data-driven cw- twin (+ live postMessage)
├── demo-spec.json → packs/huckberry-fatigue/demo-spec.json
└── packs/huckberry-fatigue/
    ├── demo-spec.json
    ├── film-assets/          # product JPGs
    ├── plate/                # pdp-fatigue-pant.png, homepage.png, …
    ├── chat-widget/          # Gladly design-system CSS
    └── README.md
```

## Contract reminders

- Production **ProductCard** SoT: `name` + `imageUrl` + `pageUrl` — **no price field**.
- `displayPrice` is **film-only** (optional under-name line in the twin).
- No `imageUrl` → **omit** ProductCard (fail-closed).
- Firecrawl pack: `packs/huckberry-fatigue-firecrawl/` (live scrape + fullPage plate + real PDP images). See pack `SCRAPE.md`.
