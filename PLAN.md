# NFL Strategy — Development Plan

## Overview
Web-based recreation of the 1978 Tudor Games "NFL Strategy" board game.
Plain HTML/CSS/JS, no build step. Runs by opening `index.html` in a browser
or serving with `python3 -m http.server 8080`.

---

## How Claude Code Works With This Repo
Claude edits files in a sandboxed container at `/home/user/nflstrategy`.
Changes are committed and pushed to `claude/analyze-repo-SiqWE` on GitHub.
To get updates locally: `git pull origin claude/analyze-repo-SiqWE`.

---

## Game Rules (Researched)

### Core Mechanic
1. Both coaches secretly pick a play card simultaneously
2. The transparent defense card is laid over the offense card, revealing 5 outcome windows
3. The selector bead (pulled against a spring, released) lands on one of the windows
4. Hash mark position (L/C/R) further determines the exact yardage result
5. 6,120 total possible outcomes (34 offense × 12 defense × 15 bead positions × hash)

### Play Cards (1976/1978 edition)
- 34 offensive plays — color coded: Blue = runs, Red = passes, Purple = screens/draws/play-action
- 12 defensive plays
- 1 special teams card (kicks, punts, penalties)

### Scoring
| Result | Points |
|---|---|
| Touchdown | 6 |
| Extra point (PAT kick) | 1 |
| 2-point conversion | 2 |
| Field goal | 3 |
| Safety | 2 |

### Game Flow
- 4 downs to gain 10 yards for a first down
- 4 quarters, 15 minutes each
- 3 timeouts per team per half
- Turnovers: fumble or interception flips possession
- 4th down options: go for it, punt, or attempt field goal
- After any score → kickoff by scoring team's opponent

### Penalty Yardage (standard NFL)
- 5 yards: offside, false start, illegal formation, delay of game
- 10 yards: holding
- 15 yards: roughing the passer, pass interference (also spot foul in NFL), unnecessary roughness
- Defensive penalties = automatic first down

---

## File Structure

```
index.html          — Main game UI
playhelper.html     — Offline tool to create custom offensive plays
css/
  stylesheet.css    — All custom styles
js/
  offense.js        — Offensive play definitions (data)
  defense.js        — Defensive play definitions (data)
  gameflow.js       — Field logic, scoring, positions, scoreboard
  clock.js          — Game clock, quarter transitions, game end
  handlers.js       — Event handlers, coin flip, bead, corrections
  callplay.js       — Bead outcome calculation, kick play results
  offense-creator.js — Custom play builder tool (playhelper.html)
  todo.js           — Original dev notes (keep for reference)
  jquery.js         — jQuery 3.0 (local copy)
  bootstrap.min.js  — Bootstrap 4 (local copy)
```

---

## Status

### P1 — Critical (DONE)
- [x] Fix scoreboard home/away score swap (`gameflow.js:503`)
- [x] Fix turnover first-down marker (recalculate 10 yds in new offense direction)
- [x] Clock system — per-play time deduction, timeouts, quarter transitions, halftime, game end
- [x] Kick play outcomes — field goal (distance-based %), PAT (95%), kickoff (touchback/return), punt (distance + touchback)
- [x] Quarter end / halftime / game end modals

### P2 — Core Gameplay (TODO)
- [ ] **Penalty system** — define penalty types, attach to play matchup outcomes, apply yardage, auto-1st-down on defensive penalties
- [ ] **More offensive plays** — expand from 1 play (28 Sweep) to the full ~34 (runs, passes, screens, play-action)
- [ ] **More defensive plays** — fill out all 12 with complete zone data
- [ ] **Defense zone mapping fix** — clarify how defense zone IDs map to the 91 offensive play variation columns
- [ ] **Audible system** — after seeing defense, offense can swap to an alternate play before bead rolls
- [ ] **Points modal cleanup** — dynamic team name, correct scoring context (TD vs FG vs Safety), proper flow to kickoff

### P3 — Polish & Features (TODO)
- [ ] **Stats tracking** — yards per carry, completions, sacks, turnovers per team per game
- [ ] **Ball animation** — visual movement on field for runs, passes, kicks
- [ ] **Custom play persistence** — save plays from `playhelper.html`, load into game
- [ ] **AI computer player** — simple random; stretch: weighted by down/distance/field position
- [ ] **Remove debug plays** — strip `RunUITesting`, `PassUITesting`, `TurnoverTesting`, `defenseTesting`
- [ ] **Mobile layout** — responsive field view

---

## Known Bugs (Remaining)
- Points modal body is hardcoded placeholder text (does not show dynamic team/score info)
- `kickOffSetup()` uses `receiveFirst` for second-half kickoffs — should swap teams at halftime
- Incomplete pass detection in `gameflow.js:286` checks `playType !== "regular"` which is inverted — needs review

---

## Architecture Notes

### Why stay vanilla HTML/CSS/JS
- Zero build tooling — open `index.html` and it works
- Already ~50% built in this stack, migration cost > finishing cost
- Offline-capable by default (localStorage + static files)
- No dependency rot, no npm audit issues

### Why upgrade to a framework (if scope grows)
- State is scattered across 20+ `localStorage` calls — React/Vue/Svelte reactivity would eliminate the whole bug class of DOM/state desync
- The scoreboard swap bug and turnover first-down bug were both caused by manual DOM management
- Components would make scoreboard, field, modals independently testable
- TypeScript would catch malformed play data objects at write-time
- Svelte is the lightest-weight path: compiles to vanilla JS, minimal boilerplate

### Recommended framework if migrating: **Svelte**
- Closest mental model to the existing code
- Reactive declarations (`$:`) replace `localStorage` reads
- Compiles away — no runtime overhead
- Easy to migrate one component at a time

---

## Branch Info
- Working branch: `claude/analyze-repo-SiqWE`
- All Claude changes committed and pushed here
- Local feature work: `feature/rules-research` (merged into above)
