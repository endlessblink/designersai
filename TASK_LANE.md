# Task Lane: Creator Profiles and Submission Flow

## Goal

Upgrade the site from a polished static brochure into a credible community platform where creators can be represented with images, bios, links, and a low-friction way to submit profile materials.

## Current Decision

Do not build user accounts yet. This Vite site has no backend, authentication, database, or storage, so a full self-service upload area would add too much operational surface for the current stage.

Instead, build the approval-friendly path:

1. Structured creator data in the repo.
2. Reusable creator cards with image placeholders.
3. Creator profile/material submission form that collects image-folder links.
4. Later: replace the form with Tally, Google Form, or Sanity when ongoing updates justify it.

## Design Critique Summary

### Anti-Patterns Verdict

Partial pass. The site avoids the worst AI-startup tropes: no neon gradients, no glassmorphism, no fake metric hero, and the editorial serif direction has a real point of view. The weak point is repeated generic section structure and creator name chips, which make the community feel like placeholder data.

### Priority Issues

1. Creator representation is too thin.
   The community is the main asset, but the homepage shows creators as text chips. Replace with cards, placeholders, bios, links, and profile readiness states.

2. Weekly Practice looks empty.
   The homepage video area looks like a missing embed. Add a real thumbnail, embedded video, or stronger editorial preview.

3. Hebrew experience is not complete enough.
   RTL exists, but creator names and community flow are still mostly English. Add Hebrew-specific labels and ordering where possible.

4. Forms are visually fine but operationally fake.
   Join/contact forms only toast locally. Use mailto for now or connect a form service.

5. The site needs more proof above the fold after the hero.
   Bring exhibitions, creators, and weekly practice closer to tangible evidence.

## Implementation Slices

### Slice 1: Creator Foundation

- Add `src/data/artists.ts`.
- Add reusable creator cards.
- Replace homepage name chips.
- Upgrade `/artists`.
- Add `/creator-submission` route.

### Slice 2: Media and Proof

- Add approved artist images or artwork thumbnails.
- Replace Weekly Practice teaser with a real visual.
- Add poster images for local videos.

### Slice 3: CMS/Form Upgrade

- Pick Tally or Sanity.
- Replace local mailto submission.
- Document creator material requirements.

## Verification

- `npm run lint`
- `npm test`
- `npm run build`
- Live spot check on `/`, `/artists`, and `/creator-submission`
