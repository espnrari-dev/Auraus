# AURA — Personal Dashboard You Can Trust

**AURA** is a private, offline‑first dashboard for your personal data — health, finances, habits, journal, and goals.

- **No cloud lock‑in.** Your data stays on your device.
- **Beautiful by default.** Enterprise‑grade UI with dark/light modes.
- **Reliable.** Full test suite and CI/CD.
- **Open source.** Auditable and free.

## Quick Start

```bash
git clone https://github.com/yourusername/aura.git
cd aura
npm install
npm run dev
Visit http://localhost:5173.

Stack

· React + TypeScript
· Vite
· Tailwind CSS
· Zustand (state)
· IndexedDB (idb)
· react-grid-layout (drag‑and‑drop)
· Vitest + Playwright (testing)

License

MIT

## Reproduction for Strangers

To reproduce the core functionality on a clean machine:

\`\`\`bash
git clone https://github.com/espnrari-dev/$repo
cd $repo
npm ci
npm test
\`\`\`

All tests should PASS. If you encounter issues, please open an issue.
