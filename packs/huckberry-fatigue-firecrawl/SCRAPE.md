# Firecrawl scrape — Huckberry Fatigue Pant

## Method
- **API:** `POST https://api.firecrawl.dev/v2/scrape`
- **Auth:** `Authorization: Bearer $FIRECRAWL_API_KEY` (env; never logged)
- **Primary URL:** https://www.huckberry.com/store/flint-and-tinder/category/p/1001044-flannel-sateen-fatigue-pant
- **Compare URL:** https://www.huckberry.com/store/flint-and-tinder/category/p/1000950-waxed-harrington-jacket

## Formats requested
```json
[
  "markdown",
  { "type": "screenshot", "fullPage": true, "quality": 90, "viewport": { "width": 1440, "height": 900 } },
  { "type": "images" },
  { "type": "product" }
]
```
Also: `onlyMainContent: false`, `waitFor: 3000`, `timeout: 90000` on primary; Harrington used `onlyMainContent: true`.

## Results (fail-closed)
| Artifact | Status |
|----------|--------|
| Markdown | OK — `scrape/product.md` (Flint and Tinder Brushed Sateen Fatigue Pant - HB Athletic S…) |
| Product JSON | OK — title/brand/variants; price **$128.00** |
| Promo (from page) | Free U.S. Shipping $98+ \| Free U.S. Returns |
| Full-page screenshot | OK — `plate/pdp.png` (Firecrawl screenshot URL downloaded) |
| Fatigue PDP heroes | **7** product-id `1001044` images → `film-assets/` |
| Harrington heroes | **10** product-id `1000950` scraped; primary + 5 gallery → `film-assets/` |
| Total images in primary scrape | 39 (page-wide; filtered to PDP SKUs) |

## Key paths
- `scrape/firecrawl-response.json` — raw API response
- `scrape/scrape-summary.json` — title/price/promo/image URLs
- `scrape/product.md` — markdown
- `plate/pdp.png` — full-page PDP plate
- `film-assets/fatigue-pant-british-khaki.jpg` — primary ProductCard image
- `film-assets/waxed-harrington-tan.jpg` — compare ProductCard image
- `demo-spec.json` — Path A mount SoT (plate + film-assets point here)

No placeholders used. Empty/non-image downloads would have aborted the pack.
