# Specification

## Summary
**Goal:** Expand the certification content library to exhaustive coverage for all 8 CompTIA certifications and strengthen the AI instructor persona to act as an authoritative professor across all study modes.

**Planned changes:**
- Expand `frontend/src/data/certifications.ts` to include fully exhaustive content for all 8 certifications (A+, Security+, Network+, Linux+, Cloud+, CySA+, PenTest+, CASP+): all official exam domains and sub-domains, objectives, port numbers, CLI commands and tools, protocols with OSI context, acronyms with definitions, key concepts, exam tips, and mnemonics
- Update the AI system prompt in `frontend/src/pages/StudyMode.tsx` and all other locations where AI prompts are constructed (QAPractice, Flashcards, PracticeTest review) to establish the AI as an expert CompTIA professor that proactively teaches all domain content, cites exam objectives/ports/commands/acronyms/protocols, provides exam tips and memory aids, and ensures exam readiness
- Audit and complete `backend/main.mo` to support storage and retrieval of all expanded certification content, question attempts, flashcard decks, and test results with full per-question breakdowns using stable variables

**User-visible outcome:** Students can rely entirely on CertiPrep AI to prepare for any of the 8 listed CompTIA exams — the AI will teach comprehensively like a professor, referencing real exam objectives, ports, commands, and acronyms, while all study data is fully persisted in the backend.
