# WannabeGM Site Review — 2026-08-16

Reviewed the live site source directly in this folder (`WannabeGM/`, git remote `mike-harrington/WannabeGM`, deployed via GitHub Pages to www.wannabegm.com, working tree clean/in sync with `origin/master` at time of review — so what's below reflects what's actually live).

Filename starts with `_` on purpose — Jekyll excludes underscore-prefixed files from the build by default, so this won't accidentally become a public page if it ever gets committed. It's currently untracked/uncommitted either way (as are all the fixes below — nothing has been pushed to `origin/master`; review with `git diff` and commit when ready).

**Status: items #1–#5 below are fixed in the working tree. #6 (keepers.html staleness) was explicitly left alone per request. #7 (Cooper naming) is resolved — see note. #8–#13 are unstarted, listed for later.**

## Bugs (things that were visibly broken)

1. **FIXED — "League Buzz / Articles" cards on the homepage went nowhere.**
   `index.html`'s three article cards linked to literal placeholder text — `href="YOUR_ARTICLE_LINK_1.html"`, `_2.html`, `_3.html"` — none of which existed. `article1.html` and `article2.html` did already exist (styled, in-nav) but nothing linked to them. Card 1 now points to `article1.html`, card 2 to `article2.html`. Card 3 ("Latest: Harrington Wraps up a 10th Championship") had no matching article file anywhere in the repo, so rather than link it somewhere misleading it was removed — write/link an `article3.html` when that recap exists and re-add the card.

2. **FIXED — `fame.html` favicon tag was malformed.** Was `<link rel="icon" type="./Wannabelogo.jpeg" />` (file path in the `type` attribute, no `href`). Now `<link rel="icon" type="image/jpeg" href="./Wannabelogo.jpeg" />`.

3. **FIXED — malformed table markup in the homepage draft-order table.** Five rows had `<tr><td><b>Lotto Pick -$</td><td>2</td></tr></b>` — the `<b>` closed *after* `</tr>`, outside the row. Now correctly `<td><b>Lotto Pick -$</b></td>`.

4. **FIXED — duplicate `id="trackImageContainer"` in `media.html`.** Both the 2025 and 2024 draft-mix "Show Track Details" buttons shared one id, so `getElementById`/`querySelector` always grabbed the first match — clicking the 2024 button silently toggled the 2025 image. Now each mix has its own id (`trackImageContainer2025` / `trackImageContainer2024`), `toggleImage()` takes the target id and button as arguments, and all mix images are hidden on load (previously only the first was).

5. **FIXED — footer/header season mismatch on the homepage.** Header said "Season 23," footer said "Season 22." Footer now reads "Season 23" to match the header, the Yahoo link text, and the bulletin's "Draft day - Season 23" line.

## Stale / outdated content

6. **LEFT ALONE (per request) — `keepers.html` is a season behind.** Page heading says "2026-27 Keepers & Roster Notes" but every GM tab still shows "2024-2025 Draft Picks" and prospect notes that read like 2024 offseason content. Revisit when ready to refresh keeper data for real — not a quick/mechanical fix since it needs actual current-season keeper decisions from each GM, not just markup changes.

7. **RESOLVED — "Cooper" is not a separate GM.** `index.html`'s Lotto Draft Participants list uses "Cooper," `keepers.html`'s GM tabs use "Mini" — both refer to the same person, Chris Cooper ("Mini Cooper"). Not a bug, just an inconsistent nickname across pages; no site content needs to change. Recorded in the root `CLAUDE.md` so the alias is a single source of truth for future tooling (e.g. the draft-day analyzer roadmap item) instead of two names silently meaning the same GM.

## Design/UX inconsistency

8. **`media.html` is visually a different site.** `index.html`, `links.html`, `keepers.html`, and `fame.html` all share the same dark theme (inline `<style>` block, CSS variables, Inter/Poppins fonts). `media.html` instead links an external `hockey-styles.css` with Oswald/Roboto fonts and no shared color variables — it looks and feels like a leftover from an earlier design pass. Worth porting it to the shared inline dark theme for consistency, or better, extracting the common dark theme into one shared stylesheet all five pages `<link>` to (see #10).

9. **Nav link order is different on every page.** Same four/five links (Home, Links, Keepers, Media, Hall of Fame), but the order differs page to page (e.g. `links.html` puts Hall of Fame before Keepers; `keepers.html` puts Hall of Fame before Media; `index.html` puts Media before Hall of Fame). Small thing, but standardizing one order across all pages removes a bit of "did I click the right thing" friction for GMs.

10. **Every page duplicates the same ~200-line `<style>` block inline** rather than sharing one stylesheet. Any future palette/font change has to be hand-edited in 4+ places (already slightly drifted — see #8). Consolidating into one shared CSS file `<link>`ed from every page would make future edits much less error-prone, and is a prerequisite for doing #4/#8 cleanly.

11. **Deprecated `<font color="">` tags throughout `keepers.html`** (68 occurrences) and the unused `index (copy).html` / `index(newlinks).html` (72/23 occurrences). `<font>` was removed from the HTML5 spec; browsers still render it, but it can't be targeted by the shared stylesheet and makes the keeper tabs harder to restyle later. Low urgency, but worth swapping for CSS classes/spans next time that page gets touched anyway.

## Unused / unlinked files (no deletions — informational only)

Built by scanning every `href=`/`src=` across all `.html` files in this folder and checking which local files never show up as a target. None of the below are deleted or touched — nothing in the live nav points to them, but they're still sitting in the repo and, since this is a public GitHub repo served via GitHub Pages, still reachable by anyone who has/guesses the direct URL:

- `index (copy).html` — old full copy of the homepage (Oct 2023).
- `index(newlinks).html` — another old homepage variant (Sep 2024), links its own `style2.css`.
- `index2gm.html` — another old homepage variant (Nov 2024), links `style.css` and `links2.html`.
- `links2.html` — an older Links page, only referenced by `index2gm.html` (itself unlinked).
- `style.css` — used only by `index (copy).html` and `index2gm.html`.
- `style2.css` — used only by `index(newlinks).html`.
- `style3.css` — not referenced by any `.html` file in this folder at all.
- `hockey-styles1.css` — not referenced by any `.html` file in this folder at all (`hockey-styles.css`, no `1`, is the one actually in use by `media.html`).

As of this review, `article1.html` and `article2.html` are **no longer** on this list — they were unlinked before but are now wired into the homepage (fix #1 above).

If/when you want these gone or archived, say so explicitly and I'll handle it as its own step — not bundling that into this pass since you asked to keep them.

## Suggested priority order (remaining)

1. Refresh `keepers.html` season data (#6) — whenever you're ready, deliberately deferred for now.
2. Consolidate shared CSS (#10) — makes #4-style bugs less likely and #8/#9/#11 easier to knock out afterward.
3. Decide on the unused-files list above (archive vs. leave vs. delete) — purely cosmetic, no rush.

Nothing above requires touching Yahoo API/OAuth code, the draft matrix, or anything in the outer `WannabeGMs/` scratch folder — this review is scoped entirely to the deployed site in this `WannabeGM/` repo, per request.
