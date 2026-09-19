# Firecrawl scrape — Vuori Performance Jogger

## Method
- **API:** `POST https://api.firecrawl.dev/v2/scrape`
- **Auth:** `Authorization: Bearer $FIRECRAWL_API_KEY`
- **Primary URL:** https://www.vuoriclothing.com/products/womens-performance-jogger-black-heather

## Formats
```json
[
  "markdown",
  { "type": "screenshot", "fullPage": true, "quality": 90, "viewport": { "width": 1440, "height": 900 } },
  { "type": "images" }
]
```

## Results
| Artifact | Status |
|----------|--------|
| Full-page screenshot | OK — `plate/pdp.png` |
| Markdown | OK — `scrape/product.md` |
| Product card images | CDN URLs from gladly-after-product-cards.json → `film-assets/` |

Turns / dialogue: extracted from gold clickthrough HTML (not invented).
