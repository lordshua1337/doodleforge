# DoodleForge -- Build Specification

Complete instruction set for building the entire product. Every design decision optimizes for one thing: the fastest possible path from "my kid drew this" to "I need to order this right now."

## 1. Product Identity

- **Tagline**: Fridge art. Gallery upgrade.
- **Secondary**: "Turn scribbles into heirlooms." / "Make grandparents cry. In a good way."
- **Platform**: Mobile-first PWA (Next.js). Native iOS + Android via React Native in v2.
- **Stack**: Next.js 14+ / TypeScript / Tailwind CSS / Prisma / PostgreSQL / Stripe / Vercel
- **AI Stack**: ControlNet-conditioned diffusion (SDXL base) for sketch-preserving style transfer. On-device preprocessing via browser Canvas API.
- **Primary Buyer**: Parents (25-45). Pays, curates, orders.
- **Secondary Buyers**: Grandparents (gift reorders). Teachers/room parents (batch classroom keepsakes).
- **Core Emotional Job**: My child's art deserves to be treated like real art.
- **Core Functional Job**: I need a meaningful, premium gift and I need it fast.
- **Core Storage Job**: Every drawing my kid ever makes, safely stored and organized forever.

### The Non-Negotiable Rule

Every AI transformation must preserve the child's original composition, linework, and character placement. The output must look like a professional artist rendered the child's exact drawing -- not like the AI reimagined it. If a parent says "that's not what my kid drew," the product has failed. Enforced via sketch conditioning (ControlNet spatial maps), not text prompting.

---

## 2. Screen Architecture

Build every screen to production quality. No placeholders. No "coming soon."

### Authentication and Onboarding

- **Welcome/Splash**: Dark background, logo centered. CTAs: "Create an Account" (filled) + "Sign In" (ghost). 3-panel before/after carousel auto-cycling.
- **Sign Up**: Email + password. "Continue with Apple" / "Continue with Google." Note: "This is a parent account. Children never sign in directly." Privacy policy link.
- **Sign In**: Email + password. Forgot password. SSO buttons.
- **Onboarding Step 1**: Add first child. Name (required), Age (optional), Avatar color picker (no photos of children). "Add Child" + "Skip for now."
- **Onboarding Step 2**: Style preview. 4 sample before/afters. "Pick a style. We handle the rest." CTA: "Let's Forge Something."

### Core Forge Flow (The "Wow Lane")

This is the product. Every millisecond of friction removed here directly increases conversion.

- **Home**: Dark, minimal. Top bar: child switcher (avatar + name) + account icon. Hero: large "Scan a Drawing" button with camera icon. Below: recent creations grid (last 4). Bottom nav: Library / Forge / Gifts / Orders.
- **Scan/Capture**: Full-screen camera. Auto-detect rectangle (drawing boundary). Guidance overlay: animated corners snap to paper edge. Capture bottom center. "Upload from camera roll" top right. Flash toggle. Must work in low light.
- **Cleanup Editor**: Detected drawing on white background. Controls: Crop adjust (handles on corners), Paper whitening slider, Rotate. Auto-runs on capture. CTA: "Looks Good"
- **Style Select**: Grid of 8-12 style tiles (148x180px). Each: style name, tiny before/after thumbnail, 1-line promise. Styles: Gallery Watercolor, Storybook Illustrated, 3D Clay, Pop Art Poster, Oil Portrait, Minimalist Ink, Stained Glass, Anime-Lite, Neon Glow, Botanical Print, Golden Hour, Blueprint, **EPIC MODE** (see below). Tap = checkmark. CTA: "Generate" (active after selection).

#### EPIC MODE

EPIC is DoodleForge's wildcard style -- the most insane, over-the-top transformations possible. When a parent picks EPIC, the AI cranks everything to 11. This is the viral moment generator.

- **What it does**: Takes the child's drawing and transforms it into the most dramatic, cinematic, jaw-dropping version imaginable. Think: a stick figure becomes a massive oil painting of a warrior in a lightning storm. A crayon sun becomes a photorealistic supernova. A house becomes a hyper-detailed fantasy castle. The original composition is still there, but the style transfer is maxed out -- highest detail, most dramatic lighting, most insane background expansion.
- **Technical**: Higher CFG scale (12-15 vs normal 7-9), more inference steps (40-50 vs normal 25-30), expanded canvas (outpaint beyond original edges to add dramatic environment), multiple LoRA stacks combined (cinematic lighting + hyper-detail + fantasy environment). Uses more compute credits (counts as 2 Finals).
- **UI treatment**: EPIC tile in the style grid is visually distinct -- animated gradient border, pulsing glow, "EPIC" badge in bold. When selected, camera shake micro-animation on the tile. Generation screen shows more dramatic particle effects and copy: "Unleashing full power..." / "Going maximum..." / "This is going to be insane..."
- **Results**: EPIC results get a special reveal animation -- slow dramatic zoom with cinematic letterboxing and a bass-drop sound effect (optional, respects mute). The "wow" factor must be 10x a normal forge.
- **Sharing**: EPIC forges get a special share template with a "FORGED IN EPIC MODE" badge overlay. This is the viral driver -- parents share EPIC results because they look impossible.
- **Generating**: Full-screen animation. Ink/paint-stroke effect over original. Progress bar. Copy cycling: "Mixing colors..." / "Adding details..." / "Almost ready..." Draft in ~5s.
- **Results/Reveal**: Full-screen final image. Bottom panel: Before/After slider, Style variants carousel (2 alternatives), "Forge Final" button (higher res ~15s), "Order a Print" (primary, orange), "Save to Library", "Share Reveal".
- **Artist Plaque**: Overlay before sharing. Museum placard: child's name, optional title, date, age. Editable inline. Exports as part of share image.
- **Share/Export**: Options: Animated reveal video (before->after loop), Static final, Gallery plaque card, Triptych mockup. Destinations: Messages, Instagram Stories, Facebook, Copy Link (private). All shares default private.

### Library

- **Library Home**: Grid view, all creations. Filter: All / By Child / By Year / Favorites. Sort: Newest / Oldest. Each tile: final image, child name, date, style. Long press: quick options.
- **Artwork Detail**: Full-screen image. Swipe variants. Metadata: child, date, style, title. Actions: Order Print, Share, Add to Book, Delete. Before/after toggle.
- **Child Portfolio**: All art for one child. Header: name + avatar + total pieces + "Years Active." Grid. CTA: "Build This Year's Book."

### Digital Storage Vault

DoodleForge doubles as a permanent digital archive for every drawing a child ever makes -- not just the ones that get AI-transformed. Parents can scan and store ANY drawing, building a complete timeline of their kid's artistic growth. This is the retention engine -- even if they never order a print, the storage keeps them coming back.

- **The Vault** (tab in bottom nav or inside Library): Timeline view of all stored drawings per child, organized by date. Shows: original scan thumbnail, child name, date captured, optional title/note. Untransformed drawings show with a "Forge This" overlay button.
- **Quick Scan (Storage Only)**: From Vault, tap "Scan and Store" -- goes straight to camera, captures drawing, runs cleanup, stores it. Skips style selection entirely. No credits consumed. This is free and unlimited to drive daily habit.
- **Auto-Organization**: AI automatically groups drawings by child (based on which child profile is selected during scan). Sorts by date. Tags by detected content type when possible (animal, person, house, vehicle, abstract).
- **Growth Timeline**: Visual timeline view per child showing artistic progression over months/years. Side-by-side comparisons of similar drawings over time. "See how far they've come" sharing template.
- **Storage Tiers**: Free: 50 drawings stored. Pro: unlimited storage. Additional storage packs purchasable (100 drawings for $X). This is a secondary monetization lever -- parents who store 50 drawings WILL pay to keep storing.
- **Backup and Export**: One-tap download all drawings as a ZIP. CSV metadata export. Account deletion removes everything (COPPA/GDPR).
- **Family Members**: Share vault access with grandparents or co-parents via invite link. Read-only by default. Can be granted "scan and store" permission.

### Keepsake/Gifting Store

- **Gifts Home**: Sections: Best Sellers, For Grandparents, Holiday Cards, Teacher Gifts, Wall Art. Product cards: image, name, price range, delivery estimate. "Build a Gift" quick-start.
- **Product Picker**: Choose artwork (library or forge new). Types: Framed Print, Poster, Greeting Cards (set of 10), Photo Book, Gift Bundle. Realistic mockup per option.
- **Product Configurator**: Size selector, Finish (matte/glossy), Personalization (caption, artist name, date), Quantity, Frame color. Live mockup updates.
- **Mockup Preview**: Realistic room/wall mockup. Toggle: "In a living room" / "On a desk" / "Gift wrapped." CTA: "Add to Cart."
- **Cart**: Items with thumbnails, specs, quantity, remove. Promo code. Order summary. CTAs: "Checkout" + "Continue Shopping."
- **Checkout**: Shipping address (autofill). Delivery speed. Gift message. Gift packaging toggle. Payment: Stripe Elements (card, Apple Pay, Google Pay). Review step.
- **Order Confirmation**: Checkmark. Order number. Estimated delivery. CTAs: "Track Your Order," "Forge Another," "Share as Gift Announcement." Email auto-sent.
- **Order Tracking**: Timeline: Placed -> Printing -> Shipped -> Out for Delivery -> Delivered. Tracking number + carrier link. Reorder. Support.

### Grandparent/Family Share Link

- **Shared Gallery** (no login): Private link landing. Child's name, artwork gallery, order print directly. No account required. Branded header. CTAs: "Order a Print," "Download," "Create Your Own Account."
- Link per-child or per-artwork. Parent controls. Revocable. No public indexing.

### Classroom/Teacher Mode

- **Teacher Dashboard**: Create class (name, grade). Add students by name (no accounts, no email from minors). View artwork by student. Consent tracker.
- **Consent Management**: Per-student status: Pending / Approved / Declined. Send consent form (email or PDF). Only approved students processed.
- **Batch Scan**: Multi-drawing capture. Camera stays open. Each labeled by student. Batch queue with status.
- **Class Order**: Select artwork per student. Product choice (cards, prints, mini-books). Bulk pricing. Single checkout. Ship to families or bulk.

### Account and Settings

- **Account Home**: Profile, children profiles, payment methods, order history, settings.
- **Subscription**: Free / Pro. Feature list. Upgrade/downgrade. Billing. Cancel (retention offer first).
- **Privacy Controls**: Data download. Account + data deletion (full wipe). Per-child data management. Analytics opt-out.
- **Support**: FAQ accordion. Contact form. Order issue flow. Refund policy.

---

## 3. AI Generation Pipeline

### Step 1 -- On-Device Preprocessing

Run before upload:

1. **Document detection**: Auto-detect paper rectangle (ML Kit / VisionKit). Web fallback: server-side detection. Perspective correction.
2. **Deskew + crop**: Correct rotation, crop to paper boundary. Remove table/floor/hand.
3. **Background cleanup**: Remove paper texture, yellowing, shadows, scan lines. Clean white background + drawing lines.
4. **Contrast + denoise**: Enhance line visibility. Remove pencil noise. Preserve crayon texture.
5. **Sketch extraction**: Generate edge map / lineart map. This is the spatial conditioning input. Store alongside original.
6. **Upload package**: Original photo, cleaned version, edge map, aspect ratio, metadata. Never include child's face.

### Step 2 -- Backend Generation

- **Job queue**: Priority tiers: Draft (fast, low-res, immediate), Final (high-res, queued). Redis + BullMQ. Draft via WebSocket push. Final via polling + push notification.
- **Inference**: ControlNet-conditioned SDXL. Edge map as spatial input. Style = preset recipe (fixed prompt + LoRA + strength) -- not user text. Temperature/CFG per style.
- **Draft**: 10-15 steps, 768px, 2 variants. Target <5s perceived (streaming progress).
- **Final**: 25-30 steps, 1024px+, 1 polished output. Target <20s. Triggered by "Forge Final" or order.
- **Upscale**: Super-resolution for print. Min 3000px longest edge (8x10). 4800px+ for posters. Only on order.
- **Style recipes**: Named, versioned configs: base prompt, negative prompt, ControlNet weight, CFG scale, steps, sampler, LoRA weights. Stored in style registry. Version-controlled with rollback.
- **Safety filter**: NSFW/harmful classifier on output. If flagged: log, discard, show error + retry. Never show flagged output.
- **IP detection**: Character/logo classifier on input and output. Known IP detected = block print, show explanation, allow personal digital save only.

### Step 3 -- Output and Print Pipeline

- **Storage**: Original upload, cleaned, edge map, all variants, final high-res, print-ready. User-controlled deletion. Auto-delete intermediate files after 30 days.
- **Print-ready**: sRGB with gamut check. 300 DPI min. White or transparent background. Bleed per POD spec. PNG digital, TIFF/PDF print.
- **Mockup generation**: Server-side compositing into product templates. JPG mockup for configurator. Templates: wall frames (white/black/wood), desk frame, greeting card, poster, book cover.

### Cost Control

- **Credits**: Free: 5 drafts/month, 1 final/month. Pro: unlimited drafts, 20 finals/month, unlimited storage. Additional purchasable. Metered at inference layer.
- **Caching**: Cache by input hash + style. Same drawing + same style = cached result.
- **Token logging**: Log tokens, inference time, cost per job. Aggregate by user/style/day.
- **Draft vs final gating**: Draft always free. Final gated behind Pro or one-time credit. Show draft, make Final clearly better = primary upgrade driver.

---

## 4. Commerce and Fulfillment

### Payment

- **Digital (subscriptions)**: App Store IAP (iOS), Google Play Billing (Android). Web: Stripe. Platform fees: 15% Apple SBP, 15% Google first $1M.
- **Physical goods**: Stripe. Apple Pay + Google Pay. Physical goods exempt from IAP. This is the high-margin engine.
- **Stripe setup**: Stripe Elements, Payment Intents (3DS/SCA), Webhooks, Stripe Tax. 2.9% + 30c domestic US.
- **Merchant of record**: DoodleForge on all transactions. No marketplace payouts.

### Print-on-Demand

- **Primary POD**: Printful. Printify as backup with cost-comparison routing built in from day one.
- **Launch SKUs**: 8x10 print (unframed), 11x14 print (unframed), 8x10 framed (white/black/wood), 18x24 poster, Greeting cards (set of 10, 4x6), 5x5 square print. Phase 2: photo book, canvas, ornament.
- **Pricing**: Target 50-60% gross margin domestic US. Example: 18x24 poster retail $49, POD base ~$22.25, Stripe ~$1.72, net ~$25.
- **Order sync**: Checkout -> POD order via API -> tracking number -> DB update -> push notification. Webhook for fulfillment updates.
- **Refunds**: Quality defect = automatic reprint. Wrong item = immediate replacement. Changed mind within 1hr = cancel + full refund. After production = credit.

### Etsy (Phase 2 -- Do NOT Build at Launch)

Gated behind: IP detection live/tested, manual review of first 100 listings, legal review. When built: automated listing sync, controlled SKU templates, rate-limit-resilient client, IP attestation.

---

## 5. Virality and Growth Engine

Share templates are first-class features, not afterthoughts.

### Share Templates (Generated In-App)

- **Before/After Reveal Video**: 1-3s loop. Original dissolves into final. Watermark bottom right. Formatted for Stories (9:16) and Reels.
- **Forging Time-Lapse**: Scan -> cleanup -> style -> generation -> final. 5-8 seconds. Shows the magic.
- **Artist Gallery Plaque**: Museum card: artwork, child name, age, title, date. "DoodleForge" small at bottom.
- **Triptych Wall Mockup**: 3 artworks as gallery wall set. Realistic room mockup. Auto-generated at 3+ pieces.
- **Holiday Card Reveal**: Animated card reveal. Nov-Dec seasonal trigger.
- **Grandparent Gift Announcement**: Post-order shareable: artwork preview, mockup, gift message.

### Growth Loops

- **Grandparent Link**: Private per-child gallery. No account to view. Can order. Each order = email captured.
- **Classroom batch**: Teacher orders 25 -> each parent notified -> 15% convert. Lowest-CAC channel.
- **Annual Book Reminder**: Dec + birthday month: "You have 23 forges this year. Build [Child]'s book?"
- **Referral**: Refer parent -> both get 1 free Final credit. Unique link + dashboard.

---

## 6. Legal, Privacy, and Compliance

Build into data model and UI from day one. Cannot be retrofitted.

### Children's Privacy

- **Account model**: Parent-owned only. Children never create accounts or sign in. Data associated with parent account, child as labeled sub-entity.
- **COPPA**: Clear notice to parents, verifiable parental consent before collecting child info, retain only as needed, delete securely.
- **Child data**: Drawing images, child name, age, artwork -- all sensitive. Minimize. Never use for training without explicit opt-in.
- **GDPR**: Data minimization, storage limitation, in-app export + deletion, DPAs with all processors.
- **App store**: Apple Kids rules (no third-party analytics, no ads, parental gate). Google Families (no AAID).

### Data Retention

- **Uploads + outputs**: Retained until user deletes.
- **Intermediate files**: Auto-delete 30 days.
- **Order data**: 7 years (tax/finance).
- **Analytics/logs**: Aggregated only, no individual logs past 90 days, PII stripped at collection.
- **Training opt-in**: Default NEVER. Explicit opt-in with clear benefit. Revocable with data deletion.

### IP Protection

- **Character detection**: Classifier on upload and output. Known IP = block print, allow digital personal save.
- **Checkout attestation**: Required checkbox before physical order.
- **Audit logs**: Order ID, timestamp, attestation. Retained 3 years.

---

## 7. UI/UX Design System

### Visual Identity

- **Aesthetic**: Premium dark-mode first. Gallery/museum quality. Apple meets modern art gallery. Treats kid art as serious art.
- **Background**: #0A0A0A (near black)
- **Surface**: #141414
- **Card**: #1E1E1E
- **Primary accent**: #FF6B35 (orange -- energy, creativity, CTA)
- **Secondary accent**: #1B4F8A (deep blue -- trust, premium)
- **Success**: #16A34A

### Typography

- **Display/Headlines**: Clash Display or similar geometric display font
- **Body**: Inter or DM Sans
- **Code/metadata**: JetBrains Mono
- Never Arial or system-ui as primary

### Spacing

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px. No arbitrary values.

### Border Radius

Cards: 16px. Buttons: 12px. Inputs: 10px. Modals: 20px. Chips/tags: 999px (pill).

### Shadows

Sparingly. Primary: `0 4px 24px rgba(0,0,0,0.4)`. Elevated: `0 8px 40px rgba(0,0,0,0.6)`. No shadows on dark surfaces -- use border.

### Components

- **Primary button**: bg #FF6B35, white text 600/15px, padding 14px 28px, radius 12px, hover brighten 8%, active scale 0.97, disabled 40% opacity.
- **Ghost button**: border 1px solid rgba(255,255,255,0.2), white text, hover bg rgba(255,255,255,0.06).
- **Style tile**: 148x180px, image top 100px, name 14px semibold, promise 11px muted. Selected: orange border 2px + checkmark.
- **Artwork card**: Aspect ratio preserved, radius 12px, bottom strip (name muted + date), hover scale 1.02 + shadow.
- **Product card**: White bg, product render centered, price large orange. "From $X" variable. Tap: full configurator.
- **Before/After slider**: Full-width, drag handle circle, labels "Original" / "DoodleForge", handle glow orange, smooth touch + mouse.
- **Progress**: Full-screen dark overlay, animated ink/paint, percentage, copy cycling 2s.
- **Toast**: Bottom, above nav, auto-dismiss 3s. Types: Success (green border), Error (red), Info (blue). Max 2 stacked.
- **Bottom nav**: 5 items: Library (bookmark), Forge (wand, center, larger), Gifts (gift box), Orders (package), Account (person). Active: orange. Inactive: muted white.

### Motion

- **Reveal**: Paint-brush-stroke wipe over original. 1.2s ease-out. The wow moment.
- **Page transitions**: Slide-in right forward, slide-right back. 240ms. No cuts.
- **Loading**: Skeleton screens (not spinners). Match content shape.
- **Micro-interactions**: Button scale, card highlight flash, checkmark spring, favorite bounce + particles.
- **Reduced motion**: Respect `prefers-reduced-motion`. Fade fallback.

---

## 8. Data Model

| Table | Key Fields | Notes |
|-------|-----------|-------|
| users | id, email, name, subscription_tier, stripe_customer_id, created_at | Parent accounts only |
| children | id, user_id, name, birth_year, avatar_color, created_at | No PII beyond first name + optional birth year |
| drawings | id, child_id, user_id, original_url, cleaned_url, edge_map_url, created_at, deleted_at | Soft delete. Edge map auto-nulled 30 days. |
| forges | id, drawing_id, style_id, draft_urls[], final_url, print_url, status, inference_cost_cents, created_at | status: queued/processing/complete/failed |
| styles | id, name, slug, version, prompt_config (JSON), active, created_at | Versioned configs. Never hardcode prompts. |
| orders | id, user_id, stripe_payment_intent_id, pod_order_id, status, items (JSON), shipping_address (encrypted), total_cents, created_at | Address encrypted at rest |
| order_items | id, order_id, forge_id, product_sku, quantity, unit_price_cents, mockup_url | Links forge to physical product |
| share_links | id, user_id, child_id, token, type, expires_at, revoked_at | Private, revocable, not indexed |
| subscriptions | id, user_id, stripe_subscription_id, tier, status, current_period_end | Synced via Stripe webhooks |
| credit_ledger | id, user_id, type, delta, balance_after, reason, created_at | Append-only |
| ip_flags | id, drawing_id, forge_id, classifier_result (JSON), flagged, action_taken, created_at | IP audit log for disputes |
| vault_entries | id, user_id, child_id, original_url, cleaned_url, title, notes, auto_tags (JSON), created_at, deleted_at | Storage-only scans (no forge). Soft delete. |
| vault_shares | id, vault_owner_id, shared_with_email, permission (read/scan), token, created_at, revoked_at | Family member vault access |

---

## 9. API Endpoints

| Method + Path | Auth | Description |
|--------------|------|-------------|
| POST /auth/signup | None | Create parent account. Returns JWT. |
| POST /auth/login | None | Authenticate. Returns JWT + refresh. |
| POST /children | JWT | Add child profile. |
| GET /children | JWT | List children. |
| POST /drawings/upload | JWT | Upload preprocessed drawing. Returns drawing_id. |
| POST /forges | JWT | Initiate generation. Body: {drawing_id, style_id, quality}. Returns job_id. |
| GET /forges/:id | JWT | Poll status + result URLs. |
| WS /forges/:id/stream | JWT | WebSocket for real-time progress. |
| GET /styles | JWT | List active style presets. |
| GET /library | JWT | Paginated library. Query: child_id, year, sort. |
| POST /forges/:id/upscale | JWT | Trigger print-resolution upscale. |
| POST /mockups | JWT | Generate product mockup. Body: {forge_id, product_sku, options}. |
| POST /orders | JWT | Create order. Validates IP flag first. |
| GET /orders | JWT | List orders with status. |
| POST /webhooks/stripe | Stripe sig | Payment events. |
| POST /webhooks/pod | POD sig | Fulfillment events. |
| POST /share-links | JWT | Generate private share link. |
| GET /share/:token | None | Public share landing. No auth. |
| DELETE /account | JWT | Full deletion + Stripe cancel. |
| GET /credits/balance | JWT | Credit balance by type. |

---

## 10. Analytics

Instrument every event from day one.

### Core Funnel

forge_started, scan_completed, style_selected, draft_generated, final_generated, artwork_saved, share_exported, product_viewed, cart_updated, checkout_started, order_completed, subscription_started, share_link_opened, ip_flag_triggered, refund_requested

### Dashboard Metrics

- **Time-to-wow**: Median forge_started -> draft_generated. Target <=90s.
- **Activation rate**: % new users completing 1 forge on day 0. Target >=35%.
- **Share rate**: % forges -> share_exported. Target >=15%.
- **Print conversion**: % activated -> order within 14 days. Target >=3%.
- **Repeat order rate**: % first buyers -> second order within 90 days. Target >=10%.
- **Subscription attach**: % activated -> Pro within 30 days. Target >=2%.
- **Refund/redo rate**: % orders -> refund/reprint. Target <5%.
- **Inference cost/forge**: Average by type. Must trend down.
- **Revenue per activated user**: 30-day LTV proxy by channel.

---

## 11. Do NOT Build at Launch

- Public social feed / community (needs Trust and Safety team)
- Free-form AI prompting (breaks consistency, safety, cost)
- Etsy integration (Phase 2 with IP detection and legal review)
- Multi-seller marketplace (Stripe KYC complexity)
- Child-facing features (triggers full COPPA/Apple Kids stack)
- Video generation (unreliable, expensive, marginal value)
- Native iOS/Android apps (PWA first, native Phase 2)
- Teacher SIS integration (compliance and partnership complexity)
