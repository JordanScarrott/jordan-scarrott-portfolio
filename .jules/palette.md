## 2024-05-23 - Missing Skip-to-Content Link
**Learning:** The application layout uses fixed positioning for navigation and overlays (`SystemTerminal`), making keyboard navigation tedious. A "Skip to Content" link is critical for accessibility but is completely absent.
**Action:** Always include a visually hidden "Skip to Content" link as the first interactive element in the `App` component that anchors to the main content area wrapper (`<main>`). This ensures keyboard users can bypass repetitive navigation links.
