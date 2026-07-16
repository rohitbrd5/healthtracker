# Health Tracker

A demo **Health Tracker** single-page app built with React + TypeScript, bundled by Vite, styled with Tailwind CSS, and tested with Vitest. This project was created to demonstrate Claude Code's capabilities for full-stack development.

## 🏃‍♂️ What It Does

Tracks your daily steps and computes:

- **Calories burned** (4 kcal per 1000 steps)
- **Daily progress** toward a 5000-step goal
- **Weekly summary** (trailing 7-day view)
- **Progress visualization** with a color-changing doughnut chart

## 🛠️ Tech Stack

| Layer       | Technology                 |
| ----------- | -------------------------- |
| Build Tool  | Vite                       |
| Language    | TypeScript                 |
| Framework   | React                      |
| Styling     | Tailwind CSS               |
| Testing     | Vitest + Testing Library   |
| Charts      | Chart.js + react-chartjs-2 |
| Persistence | localStorage               |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run tests
npm run test:run

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── App.tsx              # Main dashboard component
├── main.tsx             # Entry point
├── index.css            # Tailwind directives
├── components/
│   ├── StepsInput.tsx           # Form to add daily steps
│   ├── StepsProgressChart.tsx   # Goal progress doughnut chart
│   └── Summary.tsx              # Daily/weekly stats cards
├── utils/
│   └── health.ts                # Pure business logic (testable)
└── services/
    └── storage.ts               # localStorage abstraction
tests/
├── src/utils/health.test.ts
├── src/components/*.test.tsx
└── test/setup.ts                # Vitest setup
```

## 🎯 Architecture Highlights

**Separation of Concerns:**

- Business logic in `src/utils/health.ts` — pure functions, no React/DOM
- State persistence in `src/services/storage.ts` — single localStorage touchpoint
- UI in `src/App.tsx` — orchestrates state and components

**Key Functions:**

- `calculateCalories(steps)` → calories (4 kcal per 1000 steps)
- `getDailyEntries(entries)` → today's StepEntry
- `getWeeklyEntries(entries)` → trailing 7 days (inclusive)
- `getProgressColor(steps)` → color based on goal progress

## 📊 Progress Chart Colors

| Steps     | Color            | Description       |
| --------- | ---------------- | ----------------- |
| 0–2499    | Orange (#F97316) | Below 50% of goal |
| 2500–4999 | Yellow (#EAB308) | 50–99% of goal    |
| 5000+     | Green (#22C55E)  | Goal reached      |

## 🧪 Testing Strategy

```bash
# Unit tests for business logic
npx vitest run src/utils/health.test.ts

# Component tests
npx vitest run -t "calculateCalories"
```

---

## 🤖 Learning Claude Code

This project was built using Claude Code's full capabilities:

### 1. **Agent System**

- Used `/agents` for specialized tasks (code review, research, planning)
- Custom agents defined in `.claude/agents/` for domain-specific workflows

### 2. **Skills**

Various skills were used during development:

- `/pr-description` — Generate pull request descriptions
- `/verify` — End-to-end testing of changes
- `/deep-research` — Research web technologies and best practices
- `/code-review` — Code quality and correctness review
- `/simplify` — Refactor for cleaner code

### 3. **Hooks**

Claude Code hooks provide automation:

- **Pre-execution hooks** — Run linting/formatting before changes
- **Post-execution hooks** — Auto-commit, run tests, or update files
- **Permission hooks** — Control which tools require approval

### 4. **Memory System**

- Persistent memory in `.claude/memory/` for project context
- Automatic recall of project conventions and preferences

### 5. **Workflows**

Orchestrated multi-step processes:

```bash
# Example: comprehensive code review workflow
/workflow review-changes
```

### 6. **Context Management**

- Automatic summarization for long conversations
- Project-aware file navigation and suggestions

## 🔧 Project Configuration

**Important:** This project uses ESM (ES Modules):

- `package.json` sets `"type": "module"`
- Config files (`.js`) must use `export default`
- No CommonJS `module.exports`

**TypeScript Strict Mode:**

- `strict: true` enabled
- `noUnusedLocals` and `noUnusedParameters` enforced
- CI build will fail on unused variables

## 📝 Development Notes

**Chart.js Setup:**

```typescript
import { ArcElement, Tooltip } from "chart.js";
Chart.register(ArcElement, Tooltip);
```

Required for doughnut charts in react-chartjs-2.

**localStorage Service:**

```typescript
loadEntries(): StepEntry[]   // Returns [] on empty/corrupt data
saveEntries(entries: StepEntry[]): void
```

**Build Process:**

- `tsc --noEmit` for type checking
- `vite build` for production bundle
- No project references (single tsconfig.json)

## 🎓 Learning Resources

This project demonstrates:

- Modern React patterns (hooks, functional components)
- TypeScript best practices
- Test-driven development with Vitest
- Build tool configuration (Vite, Tailwind)
- Claude Code workflow integration
- Agent-based development workflows
