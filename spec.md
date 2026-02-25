# Specification

## Summary
**Goal:** Implement a full-page light/dark theme toggle using the sun/moon icon in the header, applying the selected theme globally across all UI elements and persisting the preference in localStorage.

**Planned changes:**
- Update the theme toggle logic in `frontend/src/components/Layout.tsx` to apply a `dark` class to the root HTML element or body, enabling Tailwind `dark:` variants globally
- Use the existing OKLCH-based CSS custom properties from `frontend/src/index.css` for light and dark color tokens
- Persist the user's theme preference to localStorage and restore it on page reload
- Ensure the sun/moon icon correctly reflects the current theme state
- Verify all pages (Dashboard, Certifications, Study Materials, Flashcards, Practice Test, Q&A Practice, Study Mode) correctly reflect the active theme

**User-visible outcome:** Clicking the sun/moon icon in the header switches the entire application between a bright light theme and a dark color scheme across all pages and UI elements, with the chosen preference remembered across page reloads.
