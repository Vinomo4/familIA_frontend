# 🌟 FamilIA — Accessible Financial Empowerment & Family Care Circle

FamilIA is a modern **TanStack Start** web application designed to bridge the gap between financial independence for older adults and peace of mind for their family circles. By providing accessible tools, plain-language translations, and proactive monitoring, FamilIA helps seniors manage their finances autonomously while preserving a strong, respectful safety net.

---

## 🎯 The Core Mission

Modern banking interfaces are often overwhelming, filled with complex jargon, and target-rich environments for financial fraud. FamilIA transforms this experience:

1. **Empowering Seniors:** Providing a highly accessible, simplified companion that listens to their voice, reads back responses, and explains complex documents in plain language.
2. **Reassuring Families (Tutors):** Giving designated family members (tutors) a clear dashboard of activity, wallet monitoring, and fraud-detection indicators without stripping the senior of their agency.

---

## ✨ Key Product Features

| Feature                       | For Whom | Description                                                                                                                                                                |
| :---------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **🎙️ Multimodal Copilot**     | Seniors  | A friendly, accessible chat interface. Seniors can talk, upload images of bills/receipts, or type.                                                                         |
| **🔊 Text-to-Speech (TTS)**   | Seniors  | Auto-reads assistant responses out loud using a natural, localized voice. Supports play, pause, resume, and stop controls to enhance readability and combat visual strain. |
| **🛡️ Fraud & Anomaly Alerts** | Tutors   | Real-time analysis flags unusual withdrawals, erratic charges, or potential scams immediately.                                                                             |
| **📊 Financial Overview**     | Tutors   | Unified visual dashboard comparing digital cash estimates, bank balances, and upcoming recurring bills.                                                                    |
| **📝 Clear Explanations**     | Both     | Translates dense technical bank details, policies, or receipts into friendly, plain-language summaries.                                                                    |

---

## ⚙️ Tech Stack & Ecosystem

FamilIA uses a production-grade React meta-framework architecture for fast page loads and rich interactive states:

- **UI Framework:** [React 19](https://react.dev) with [TypeScript](https://www.typescriptlang.org)
- **Application Framework:** [TanStack Start](https://tanstack.com/start) (integrating SSR and server-client RPCs)
- **Routing:** [TanStack Router](https://tanstack.com/router) (type-safe, file-based routing)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query) (caching and remote states)
- **Styling & Motion:** [Tailwind CSS 4](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/), [Radix UI Primitives](https://www.radix-ui.com)
- **Data & Charts:** [Recharts](https://recharts.org) for financial analytics
- **Validation:** [Zod](https://zod.dev) with [React Hook Form](https://react-hook-form.com)

---

## 📂 Repository Structure

The code is cleanly organized to separate layout, logic, and configuration:

```text
├── src/
│   ├── routes/          # File-based router pages (landing, auth, dashboard, copilot)
│   ├── components/      # Shared visual primitives and layout widgets
│   │   ├── ui/          # Low-level UI primitives (buttons, inputs, carousels)
│   │   └── dashboard/   # Dashboard widgets (activity log, finance charts)
│   ├── lib/             # Storage controllers, mock data, and global utilities
│   ├── router.tsx       # Router configuration & query context setup
│   └── start.ts         # Bootstrap entry point for TanStack Start
├── docs/
│   ├── technical-stack.md  # Deep technical breakdown & voice synthesis flow
│   └── user-guide.md       # Interactive journey walkthrough for Tutors & Seniors
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or **Bun** 1.x
- A modern web browser with Web Speech API support (Chrome, Safari, Edge, Firefox)

### 1. Install Dependencies

Use Bun to install dependencies (due to the optimized lockfile):

```bash
bun install
```

_Alternatively, you can run `npm install` if you prefer._

### 2. Launch Development Server

Start the local development process:

```bash
bun run dev
```

Open the local server URL printed in the terminal (usually `http://localhost:3000`).

### 3. Build & Preview Production

Verify compilation and SSR server bundles:

```bash
bun run build
bun run preview
```

---

## 🛠️ CLI Reference

| Script    | Command           | Purpose                                              |
| :-------- | :---------------- | :--------------------------------------------------- |
| `dev`     | `bun run dev`     | Starts Vite dev server with hot reloading            |
| `build`   | `bun run build`   | Compiles code and generates production bundles       |
| `preview` | `bun run preview` | Spins up a local server to test the production build |
| `lint`    | `bun run lint`    | Analyzes code for linting errors using ESLint        |
| `format`  | `bun run format`  | Standardizes styling layouts with Prettier           |

---

## 🔒 Shared Elder State

To simulate database interactions on the client side:

- The elder's custom profile details (e.g., name, passcode, and cash baseline) are persisted inside the browser's `localStorage` via handlers inside [elder-profile.ts](file:///home/vinomo/programming/master/data_science_and_ai/familia-b3b8cda0/src/lib/elder-profile.ts).
- To clean or reset mock details, clear the browser's site data or use the log out action.

---

## 📚 Deep Dive Documentation

For a more comprehensive review of the project's details:

- 📘 **[User Journey Guide](file:///home/vinomo/programming/master/data_science_and_ai/familia-b3b8cda0/docs/user-guide.md)**: Explore the interactive flows, elder setup, and how to test the voice assistant step-by-step.
- 🛠️ **[Technical Architecture & Stack](file:///home/vinomo/programming/master/data_science_and_ai/familia-b3b8cda0/docs/technical-stack.md)**: Dive into API data handling, response routing, and the Text-to-Speech logic diagram.
