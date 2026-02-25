# Specification

## Summary
**Goal:** Move the 8 CompTIA certification quick-access cards to the top of the Dashboard, Certification Selector, and Study Materials pages so they appear immediately below the page header.

**Planned changes:**
- On `Dashboard.tsx`, reorder content so the 8 certification cards (4-column grid) appear first, directly below the page header, with the "Your Certifications" heading and all other stats/content moved below the card grid.
- On `CertificationSelector.tsx`, reorder content so the 8 certification cards appear first, directly below the page header, with introductory text and domain detail sections moved below the card grid.
- On `StudyMaterials.tsx`, reorder content so the 8 certification study material cards appear first, directly below the page header, with any introductory or secondary content moved below the card grid.
- All card designs, styles, animations, grid layouts, and interactive functionality remain unchanged on all three pages.

**User-visible outcome:** Users immediately see all 8 certification quick-access cards at the top of the Dashboard, Certification Selector, and Study Materials pages without scrolling past introductory content.
