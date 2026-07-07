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

## Task Ledger

### Completed

- [x] Create persistent design context in `.impeccable.md`.
- [x] Write this lane document with critique findings and staged implementation plan.
- [x] Add structured creator data in `src/data/artists.ts`.
- [x] Add reusable `ArtistCard` component with image-ready placeholders.
- [x] Replace homepage creator name chips with creator cards.
- [x] Replace Hebrew homepage creator name chips with creator cards.
- [x] Upgrade `/artists` from a list into a card-based creator directory.
- [x] Add `/creator-submission` route for approved image, bio, and link submissions.
- [x] Make artist cards link to the creator submission flow.
- [x] Make exhibition artist tags clickable.
- [x] Add artist-directory anchors for known creators.
- [x] Route unknown exhibition artists to creator submission with the name prefilled.
- [x] Convert contact form from local toast-only behavior to prepared email communication.
- [x] Convert join form from local toast-only behavior to prepared email application.
- [x] Push the creator-profile lane to the fork remote.
- [x] Add custom CMS foundation with Vercel API functions, Neon schema bootstrap, magic-link auth, creator dashboard, admin review, and Cloudinary upload support.

### Next

- [ ] Create Neon project, add Vercel env vars, and run `/api/cms/bootstrap`.
- [ ] Create Cloudinary upload preset and add Cloudinary env vars.
- [ ] Seed or log in with the first admin email.
- [ ] Replace Weekly Practice homepage teaser with a real thumbnail, embedded video preview, or stronger editorial treatment.
- [ ] Add approved portraits or artwork thumbnails for featured creators.
- [ ] Add poster images for local exhibition videos.
- [ ] Correct and verify all exhibition artist names against the final approved roster.
- [ ] Add real creator links once supplied by the creators.
- [ ] Add Hebrew names and Hebrew-facing labels for more creator cards.
- [ ] Add individual creator profile pages if the directory needs deeper bios/work samples.

### Deferred Until Needed

- [ ] Add richer admin sections for exhibitions and Weekly Practice.
- [ ] Add creator-facing status history, comments, and revision comparison.
- [ ] Add full CMS-backed exhibition and Weekly Practice editing once artist approvals are stable.

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
