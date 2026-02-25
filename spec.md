# Specification

## Summary
**Goal:** Polish the CertiPrep AI UI with card outlines, a sun/moon theme toggle, uniform card sizes across all pages, a full security audit of the backend, and a frontend code review covering security, consistency, and error handling.

**Planned changes:**
- Add a visible border/outline to all dashboard cards in `Dashboard.tsx` using a consistent design token that works in both light and dark mode
- Replace the existing dark/light mode toggle in `Layout.tsx` with a sun ☀️ / moon 🌙 icon switcher (moon shown in light mode, sun shown in dark mode), with aria-label and persistent theme preference
- Standardize card dimensions across all pages (Dashboard, CertificationSelector, StudyMaterials, Flashcards, PracticeTest, QAPractice) using a shared Tailwind class or shared component based on the largest card footprint
- Audit `backend/main.mo` for missing access control on state-mutating functions, unguarded caller validation, cross-user data access vulnerabilities, and arithmetic overflow risks; apply all necessary fixes
- Audit frontend for unsanitized input/output, unsafe HTML rendering, inconsistent React Query error handling in `useQueries.ts`, and console.log statements exposing sensitive data; apply all necessary fixes
- Conduct a GUI consistency audit across all pages to unify typography scale, spacing/padding, button styles, and color usage; fix all inconsistencies found

**User-visible outcome:** Users will see clearly outlined, uniformly sized cards across all pages, a clean sun/moon theme toggle in the nav, consistent typography and button styles throughout the app, and improved security and error handling throughout the frontend and backend.
