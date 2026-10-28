# Endor Academy

The Endor Labs partner learning platform: a gamified, self-paced academy for training partners to sell, deploy, and support **Endor Labs** — the agentic application security platform. Built as a dependency-free static site (HTML/CSS/vanilla JS) with an optional Node.js backend for server-side progress persistence.

## What's Inside

- **5 learning tracks, 37 modules** — Foundation, SCA & Reachability Deep Dive, Developer, Sales Enablement, and Technical SE tracks covering the Endor Labs platform (reachability-based SCA, AI SAST, secrets detection, container scanning, Package Firewall, coding agent governance, Endor Patches, SBOM/VEX, policies, and integrations).
- **8 interactive labs** — step-by-step walkthroughs with simulated terminals: first `endorctl` scan, reachability triage, Package Firewall configuration, secrets detection, container scanning, GitHub Actions integration, SBOM & VEX export, and MCP server/Agent Kit setup.
- **7 competitive battlecards** — Endor Labs vs. Snyk, Mend.io, Veracode, Checkmarx, Black Duck, GitHub Advanced Security, and Sonatype.
- **6 certification levels** — Associate, Professional, Expert, Partner Technical Specialist, Partner Sales Specialist, and Master Architect, with exams, certificates, and readiness tracking.
- **Gamification** — XP, levels, streaks, badges, leaderboards, and a quarterly certification challenge.
- **AI Coach** — a keyword-matched chat coach for product, certification, and competitive questions.

## Quick Start

### Static site (no build required)

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Progress is stored in `localStorage`. That's enough to run the entire academy.

### Optional backend (login + server-side progress)

```bash
npm install
cp .env.example .env               # set DATABASE_URL, SESSION_SECRET
docker compose up -d               # PostgreSQL 16 + backend (or use your own Postgres)
npm run start:backend              # http://localhost:3000
```

With the backend running, the frontend syncs progress on every save (`window.__ENDOR_API_URL__` overrides the API base URL).

## Development

```bash
npm run lint              # ESLint over js/
npm run build:modules     # regenerate modules/*.html from content/ partials + template
npm run check:modules     # CI guard: modules/ must match content/ + template
npm test                  # Playwright E2E (starts its own static server)
```

### Module content system

Module pages are generated — never hand-edit `modules/**/*.html` boilerplate:

- `content/modules/<track>/<file>.html` — each module's unique content (frontmatter + body)
- `templates/module.html` — shared scaffold (head, sidebar, scripts)
- `js/tracks.js` — the single source of truth for tracks, module titles, and durations
- `js/search.js` — the client-side search catalog

After editing content or the template, run `npm run build:modules` and commit the result.

Two helper scripts in `scripts/` support this system:

- `normalize-module-footers.py [track ...]` — ensures every module footer has a `mark-complete-btn` with the XP from its header meta (the button `js/module.js` uses to award XP) and links track-final modules to the certifications page. Safe to re-run.
- `extract-missing-partials.py` — generates a partial only for module pages that lack one. Use this instead of `build-modules.py extract` when you need to adopt a hand-edited page, since the plain `extract` overwrites every existing partial.

### Endor Labs content sources

Training content is based on Endor Labs' public product documentation and website (endorlabs.com, docs.endorlabs.com) plus published customer stories (Zebra Technologies, Egnyte, Rubrik, Atlassian, Glean, Astronomer). Battlecards are for partner enablement use and contrast on outcomes — never disparage competitors.

## Repository Layout

```
├── index.html              # dashboard
├── learning-paths.html     # 5 tracks
├── labs.html               # 8 labs
├── certifications.html     # 6 certifications
├── resources.html          # battlecards, playbooks, case studies
├── leaderboard.html        # gamification
├── ai-coach.html           # chat coach
├── certificate.html        # printable certificate
├── endor-platform-2026.html# platform narrative
├── battlecard-*.html       # 7 competitive battlecards
├── modules/                # generated module pages (5 tracks)
├── content/modules/        # module content partials (source of truth)
├── labs/                   # 8 interactive lab pages
├── js/                     # vanilla JS app modules
├── css/                    # styles (Endor Labs emerald palette)
├── backend/                # Express + PostgreSQL (auth + progress sync)
├── templates/              # module page template
├── scripts/                # python build/lint helpers
├── tests/e2e/              # Playwright specs
└── docs/                   # platform design documentation
```

## License

Sample partner enablement project. Content references Endor Labs product capabilities; Endor Labs and related marks belong to Endor Labs, Inc.
