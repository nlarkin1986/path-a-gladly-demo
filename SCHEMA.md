# Path A — Demo Spec Contract (day one)

**SoT for Path A mount:** scrape pack → `demo-spec.json` → Screens twin overlay on a site plate.

This schema is the day-one contract between Firecrawl (or pack hand-fill), Script JSON, and Chat SDK Screens. Validate packs against `demo-spec.schema.json`.

## Top-level shape

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `prospect` | object | yes | `{ name, domain, accent? }` |
| `header` | object | yes | `{ title, subtitle }` — widget chrome |
| `turns` | array | yes | Ordered conversation beats |
| `products` | array | yes | Cards for ProductList (may be empty) |
| `softClose` | boolean | yes | When true: point-only ATC honesty; never "Added" / Pay UI |
| `plate` | object | yes | Site screenshot behind the twin |

### `prospect`

```json
{ "name": "Huckberry", "domain": "huckberry.com", "accent": "green" }
```

- `accent` optional. Omit → stock green header (`data-accent="green"` / `#009B00`).
- Allowed values when present: `"green"` | `"purple"` | CSS color string (Screens maps known tokens).

### `header`

```json
{ "title": "Huckberry", "subtitle": "AI shopping associate" }
```

### `turns[]`

```json
{ "i": 1, "role": "shopper", "text": "…", "beat": "arrive" }
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `i` | integer | yes | 1-based order |
| `role` | `"shopper"` \| `"agent"` | yes | Maps to `.cw-msg-user` / `.cw-msg-agent` |
| `text` | string | yes | Bubble copy (verbatim from associate script when locked) |
| `beat` | string | no | Film beat label: `arrive`, `product_q`, `compare`, `fit`, `social`, `soft_close`, … |

### `products[]` — ProductCard contract

```json
{
  "name": "Flint and Tinder Brushed Sateen Fatigue Pant (British Khaki)",
  "imageUrl": "packs/huckberry-fatigue/film-assets/fatigue-pant-british-khaki.jpg",
  "pageUrl": "https://www.huckberry.com/store/…",
  "displayPrice": "$128.00"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Card title |
| `imageUrl` | string | **yes for render** | Absolute URL or pack-relative path |
| `pageUrl` | string | yes | PDP / catalog href |
| `displayPrice` | string | **no** | **Film-only.** Production ProductCard SoT is name + image — **no price field in production schema.** If present, mark film-only in pack notes; pane may render `.cw-product-card-price` for leavebehind film. |

#### Fail-closed (ProductCard)

> **No `imageUrl` (missing, empty, or unresolvable) → omit that ProductCard entirely.**  
> Do not render a name-only stub, broken `<img>`, or placeholder. Drop the card from the ProductList. If every product fails the gate, omit the ProductList.

Price is never required to show a card. Absence of `displayPrice` is correct for production SoT.

### `softClose`

- `true` — agent soft-close: point/highlight size + Add to bag on plate; **no** cart write, **no** "Added", **no** Pay-here UI in the twin.
- `false` — reserved; do not invent ATC success without written override.

### `plate`

```json
{ "path": "packs/huckberry-fatigue/plate/pdp-fatigue-pant.png" }
```

Provide **either** `screenshotUrl` (remote) **or** `path` (local under the pack / demo root). Prefer local path for offline demos.

## Mount rules (Screens)

1. Load `demo-spec.json` (fetch).
2. Paint plate full-bleed from `plate.path` / `plate.screenshotUrl`.
3. Mount `.cw-host` twin (prefer iframe → `pane.html`) bottom-right.
4. Render turns as cw- messages; after compare (or first product beat), inject ProductList from `products[]` with fail-closed image gate.
5. Header: stock green unless `prospect.accent` set.
6. Honor `softClose`.

## Versioning

- Schema file: `demo-spec.schema.json` (`$id` Path A day-one).
- First pack: `packs/huckberry-fatigue/` (associate-script.json v2.1 slimmed).
