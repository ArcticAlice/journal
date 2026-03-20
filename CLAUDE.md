# Journal App — Claude Context

## Project Overview
Personal journal app (single user). React 19 + Vite, Motion for animations, localStorage for persistence. No external UI library — all inline styles.

## Design Context

### Users
Sole user: the developer themselves. Fast private capture of daily tasks/entries + occasional monthly review. Fully optimized for one person's taste — no audience considerations.

### Brand Personality
**Moody, bold, austere.** A private instrument, not a consumer product. No friendliness signals. Just the work.

### Aesthetic Direction
**Dark as the absolute foundation.** Pure black (`#000000` / `#0A0A0A`) is the canvas.

**Two-color tension as the emotional core.**
- Crimson `#750D37` / `#6D1942` — endings, closures, deletion, warning
- Cyan `#00B4D8` — creation, action, progress, selection
- Their gradient (`#750D37` → `#00B4D8`) is the app's signature — structural headers only

**Anti-references:** No pastel/soft tones. No rounded/bubbly UI. No Notion/Linear/SaaS aesthetic.

### Design Principles

1. **Black is the stage.** Pure black foundation. Nothing decorative competes with the dark.

2. **Crimson and cyan carry meaning.** Crimson = stop/close/end. Cyan = create/go/begin. Never swap them for visual variety.

3. **Letter-spacing is non-negotiable.** 2.5px global tracking is the typographic identity. Never override it.

4. **Edge over curve.** Prefer sharp or subtly-rounded corners (≤6px). Reserve 10–15px radius for primary card-level containers only.

5. **Bold contrast, no apology.** High contrast, saturated color hits. When in doubt, push harder rather than softer.

### Color Tokens
| Token | Value | Role |
|---|---|---|
| `--bg` | `#000000` | Page background |
| `--surface` | `#0A0A0A` | Card/panel surfaces |
| `--crimson` | `#750D37` | Close, delete, destructive |
| `--crimson-dim` | `#6D1942` | Borders, subtle crimson use |
| `--cyan` | `#00B4D8` | Create, save, interactive |
| `--text-primary` | `#FFFFFF` | Primary text |
| `--text-accent` | `#00B4D8` | Accented/interactive text |
| `--gradient` | `linear-gradient(90deg, #750D37 0%, #00B4D8 100%)` | Header stripe only |
