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
├── pane.html                 # data-driven cw- twin
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
