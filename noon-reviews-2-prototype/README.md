# noon-reviews

Prototype of the revamped review-submission flow for the noon app, targeted at iPhone 13 mini (375 × 812).

Built with Expo SDK 55, React Native 0.83, TypeScript, and react-native-svg. Web is the primary preview surface; iOS Simulator works for native APIs (mic, camera) when needed.

## What's in here

- **Orders screen** — sticky search header, "Active orders" section with the live shipment card, and a draggable "Order history" sheet (handle bar, two snap anchors at y=111 and y=240, Emil-style spring + flick threshold)
- **Order history sheet** — title + filters row (sliders/caret SVGs, marketplace logo chips), 5 shipment cards using real noon.com-style products with marketplace tags, return-window pills, dotted dividers, and an interactive 5-star rating row with a 300ms staggered scale-punch shimmer + sentiment-color settle (red → orange → amber → light green → dark green)
- **Review entry screen** — circular product hero, rating pill (star + numeric), question, input box, "Speak your review" + "Next" CTAs
- **Shared-element morph** — when a star is tapped on a shipment card, the product image flies from the card up to the review screen's hero circle along an inverted (concave-up) arc over 800ms, rectangle → circle, with chrome cross-fading underneath

## Run it

```bash
cd noon-reviews
npm install
npm run web      # browser at http://localhost:8081 (or the port Expo picks)
npm run ios      # iOS Simulator (mic + camera work here)
```

The web preview wraps the app in a 375 × 812 device frame (`src/components/DeviceFrame.tsx`) so you can preview the layout at the exact target viewport without resizing your browser.

## Project layout

```
src/
├── components/                  # named, semantic UI building blocks
│   ├── Header.tsx               # 3 variants: default, photos, search
│   ├── ActiveOrdersSection.tsx
│   ├── ActiveOrderCard.tsx
│   ├── ProductImageStack.tsx    # image + marketplace tag stamp
│   ├── MarketplaceTag.tsx
│   ├── OrderHistorySheet.tsx    # PanResponder-driven draggable sheet
│   ├── OrderHistoryContents.tsx
│   ├── OrderHistoryTitleAndFilters.tsx
│   ├── OrderHistoryFiltersRow.tsx
│   ├── FilterChip.tsx
│   ├── MarketplaceFilterChip.tsx
│   ├── ShipmentsList.tsx        # owns rating state per card
│   ├── ShipmentCard.tsx         # forwards image ref for the morph
│   ├── RatingInputStars.tsx     # shimmer + sentiment color
│   └── MorphLayer.tsx           # arc + timing-driven hero transition
├── screens/
│   ├── OrdersScreen.tsx
│   └── ReviewEntryScreen.tsx
├── icons/                       # one named SVG per file
│   ├── ChevronLeftIcon.tsx
│   ├── ChevronRightIcon.tsx
│   ├── SearchIcon.tsx
│   ├── CrossIcon.tsx
│   ├── FilterIcon.tsx
│   ├── CaretDownIcon.tsx
│   ├── DeliveredTickIcon.tsx
│   ├── RewindCheckIcon.tsx
│   ├── StarIcon.tsx
│   └── AISpeakIcon.tsx
├── navigation/
│   └── RootNavigator.tsx        # screen state machine + morph orchestration
├── utils/
│   └── ratingColors.ts          # 1★→5★ sentiment color ramp
├── fonts.ts                     # Noontree weight map (300/400/500/600/700/800/900)
├── store.ts                     # AppProvider context (review state, photos, rating)
└── theme.ts                     # spacing, radius, color, typography tokens
assets/
├── fonts/                       # Noontree OTFs (Light → Black)
├── marketplace-tags/            # express / supermall / market / global
├── products/                    # sample-product.png
└── ...                          # icons, splash
```

## Design conventions

- **Every visible element is its own named component.** No bare `View`/`Text`/`Pressable` as a leaf — wrap in something descriptive (`StatusSeparator`, `OrderArrivalDate`, `RatingStar`, …) so design-tool overlays can reference parts unambiguously.
- **Local style sheets per file** named `s` or `styles`; tokens via `src/theme.ts` + `src/fonts.ts` + `src/utils/ratingColors.ts`.
- **Animations** use RN-core `Animated` + `PanResponder` for cross-platform predictability (Reanimated 4's web bundle was unreliable here). Easing curves follow Emil Kowalski's playbook — `bezier(0.32, 0.72, 0, 1)` for drawer-style motion, `bezier(0.34, 1.56, 0.64, 1)` for back-out punches.
- **Iconography** ships as inline SVG components (path + viewBox), no external icon font for the brand visuals.

## Status

- [x] Phase 0 — environment + device frame + navigator scaffold
- [x] Phase 1 — Orders screen (header, active orders, order history sheet, filters, shipment cards, rating row + shimmer)
- [x] Phase 2 — rating-to-review morph (product image flies along arc; sheet + screens cross-fade)
- [ ] Phase 2.5 — five stars converging into the rating pill (`★ 5`) as part of the morph
- [ ] Phase 3 — text review screen interactions (input focus, suggestions slot, voice button states, topic-coverage nudge)
- [ ] Phase 4 — voice-review listening / recording / processing screens with reactive ellipse gradients
- [ ] Phase 5 — add photos flow + camera capture
- [ ] Phase 6 — submit + success card

See `~/.claude/plans/context-now-i-ve-tender-piglet.md` for the full plan checked in earlier.
