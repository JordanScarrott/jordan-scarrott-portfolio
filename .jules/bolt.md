# Bolt's Journal

## 2024-05-22 - [Layout Thrashing in Event Handlers]
**Learning:** Calling `getBoundingClientRect()` inside a `mousemove` handler forces the browser to recalculate layout (reflow) on every frame, which is extremely expensive and causes visual jank.
**Action:** Always cache dimensions in `useEffect` (or `useLayoutEffect`) and update them only on `resize` or `scroll` events, never inside the animation/interaction loop itself.

## 2024-05-22 - [Initial Entry]
**Learning:** Initialized Bolt's journal.
**Action:** Use this to track critical performance learnings.
