# Open AI Roadmap

> A production-grade, interactive, open-access educational platform guiding learners from absolute beginners to building, training, evaluating, and deploying their own AI and Large Language Models from scratch.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-19%20Passed-22c55e?style=flat-square)](#automated-testing)
[![License](https://img.shields.io/badge/License-MIT-amber?style=flat-square)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [Platform Architecture & Features](#platform-architecture--features)
  - [1. Nine-Phase AI & LLM Curriculum](#1-nine-phase-ai--llm-curriculum)
  - [2. Interactive Checklists & Local Persistence](#2-interactive-checklists--local-persistence)
  - [3. Free Courses & Learning Resources Library](#3-free-courses--learning-resources-library)
  - [4. AI/LLM Projects & Coding Challenges Hub](#4-aillm-projects--coding-challenges-hub)
  - [5. Personalized Learning Dashboard](#5-personalized-learning-dashboard)
  - [6. Data Portability & Safety](#6-data-portability--safety)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Automated Testing & Quality Assurance](#automated-testing--quality-assurance)
- [Data Storage & Privacy](#data-storage--privacy)
- [SEO, Metadata & Accessibility](#seo-metadata--accessibility)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Open AI Roadmap** is a free, publicly accessible, full-stack educational web application designed to eliminate ambiguity in AI education. Instead of disconnected tutorials or high-level summaries, it offers an end-to-end, structured engineering roadmap that takes learners through every requisite discipline:

1. **Foundations**: Mathematics, Linear Algebra, Multivariable Calculus, Probability, and Python programming.
2. **Machine Learning**: Classical algorithms, loss functions, optimization, scikit-learn, and evaluation metrics.
3. **Deep Learning**: PyTorch from scratch, backpropagation, CNNs, RNNs, and modern training pipelines.
4. **NLP & Sequence Models**: Tokenization, embeddings, Seq2Seq, and attention mechanisms.
5. **Transformers & Modern LLM Architectures**: Self-attention, multi-head attention, RoPE, KV-cache, and decoder-only models.
6. **Pretraining & Data Pipelines**: Web crawling, deduplication, synthetic data, BPE tokenizers, and distributed pretraining.
7. **Post-Training & Alignment**: Supervised fine-tuning (SFT), LoRA/QLoRA, RLHF, DPO, and alignment evaluation.
8. **Inference Optimization & Deployment**: Quantization (GPTQ/AWQ), vLLM, PagedAttention, speculative decoding, and production serving.
9. **Autonomous Agents & Advanced Systems**: Function calling, tool use, memory systems, LangGraph, and multi-agent orchestration.

---

## Design Philosophy

The user interface follows an **editorial, human-crafted design language** inspired by classic scientific texts, academic typography, and modern minimalist interfaces.

- **Warm Ivory (`#F7F5EF`)**: Primary page background delivering low glare and an inviting reading experience.
- **Soft Sage (`#D9E5D6`)**: Muted background tints for secondary badges, filters, and cards.
- **Muted Green (`#A9B9A3`)**: Subtle borders, dividers, and contextual indicators.
- **Terracotta (`#C77D63`)**: Warm accent color used purposefully for interactive focus, active badges, and milestone markers.
- **Charcoal (`#292D29`)**: High-contrast, legible typography avoiding harsh pure blacks.

> **Zero Artificial Hype**: The interface strictly avoids neon gradients, glowing futuristic cards, floating 3D spheres, violet/purple SaaS cliches, or decorative robot imagery.

---

## Platform Architecture & Features

### 1. Nine-Phase AI & LLM Curriculum
- **Structured Hierarchy**: 9 comprehensive phases (Phase 0 through Phase 8), subdivided into foundational modules with actionable learning objectives, prerequisites, and estimated completion times.
- **Granular Topics**: 100+ topic checkpoints covering mathematical intuition, low-level Python/PyTorch implementations, and industry-standard workflows.
- **Visual Progress Indicators**: Real-time phase completion gauges, module progress bars, and milestone badges.

### 2. Interactive Checklists & Local Persistence
- **Instant Topic Checklists**: Toggle topic completion with one click; progress instantly recalculates across all navigation surfaces.
- **State Hydration**: Persistent storage via HTML5 `localStorage` (`ai_roadmap_state_v1`) with zero flicker and safe server-side rendering fallbacks.
- **Active Study Sessions**: Start, pause, log, and review study sessions tied to specific curriculum phases and topics.

### 3. Free Courses & Learning Resources Library
- **44 Curated, Verified Resources**: Free university lectures (Stanford CS229, CS336, MIT 6.S191), books (Goodfellow, Jurafsky), interactive courses (Fast.ai, Hugging Face, DeepLearning.AI), and foundational papers (Vaswani, Touvron, Hu).
- **Multi-Facet Search & Filtering**: Filter by phase, difficulty tier (Beginner, Intermediate, Advanced), format (Video, Book, Interactive, Course), and estimated completion hours.
- **Course Status Tracking**: Mark courses as *Saved*, *In Progress*, or *Completed* with personal notes.

### 4. AI/LLM Projects & Coding Challenges Hub
- **14 Milestone Engineering Projects**: Projects ranging from implementing a matrix math engine from scratch to building a 124M-parameter GPT-2 replica, implementing LoRA fine-tuning, and architecting an autonomous multi-agent code generator.
- **Interactive Task Lists**: Granular engineering milestones for each project with live completion checkboxes.
- **GitHub Repository Linking**: Attach, validate, and launch your personal GitHub implementation URLs directly from the UI.
- **Reference Architectures & Evaluation Criteria**: Rubrics, key concepts, and suggested extensions for every build.

### 5. Personalized Learning Dashboard
- **Consistency Analytics**: Real-time learning streak calculator (current streak, longest streak, active days, total study minutes).
- **Study Goal Tracker**: Set and monitor daily and weekly study targets (e.g. 5 hours/week, 3 topics/week).
- **Milestone Showcase**: Visual achievement badges unlocked dynamically as roadmap phases and capstone projects are completed.
- **Weekly Study Planner**: Plan and review study sessions across the calendar week.

### 6. Data Portability & Safety
- **100% Local-First**: No account creation, passwords, tracking cookies, or external databases. Your data never leaves your device.
- **JSON Data Export**: Full one-click backup of all topic checklists, course bookmarks, project tasks, GitHub links, and study notes into a timestamped JSON file.
- **Safe Import Preview**: Upload existing backups to inspect an interactive **Scope Diff Preview** (counts of topics, milestones, projects, courses, and sessions) before applying changes.
- **Merge vs. Replace Modes**: Choose between non-destructive merging with current state or a full clean replace with confirmation safeguards.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16.4.5](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict typing, no implicit `any`) |
| **Library** | [React 19](https://react.dev/) (Server Components & Client State Hooks) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) with semantic color tokens and dark mode |
| **UI Primitives** | [shadcn/ui](https://ui.shadcn.com/) inspired accessible modular components |
| **Animations** | [Motion](https://motion.dev/) (hardware-accelerated fluid transitions) |
| **Icons** | [Lucide React](https://lucide.dev/) (clean, stroke-based iconography) |
| **Testing** | Node.js Test Runner with `tsx` for TypeScript execution |

---

## Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or newer (v20+ or v22+ LTS recommended)
- **Package Manager**: npm (v9+), pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/open-ai-roadmap.git
   cd open-ai-roadmap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized static and partially prerendered production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run start
```

---

## Automated Testing & Quality Assurance

The codebase includes an automated test suite executed with `tsx` and the native Node.js test runner:

```bash
npm test
```

### Test Suites (19 Tests, 100% Passing)

1. **Cross-Dataset Linkage & Referential Integrity**
   - Verifies all 14 projects reference valid roadmap modules (`relatedModuleIds`).
   - Verifies all project course references map to existing IDs in the 44-course catalog (`relatedResourceIds`).
   - Verifies all 9 roadmap phases map to valid primary project milestone IDs.
   - Verifies all 44 courses target valid phase integers (Phases 0–8).
2. **Store Persistence & Schema Sanitization**
   - Validates fallback to defaults on empty/corrupted storage.
   - Enforces schema versioning (`schemaVersion: 1`).
   - Prunes unknown/bogus topic IDs upon state load.
   - Validates milestone backfill logic and study goal normalizers.
3. **Curriculum & Catalog Integrity**
   - Asserts exact phase count (Phase 0 through Phase 8).
   - Asserts exact project count (14 primary milestone projects).
   - Asserts exact resource count (44 curated learning resources).
4. **Date & Streak Calculation**
   - Verifies `YYYY-MM-DD` date key validation.
   - Verifies duration formatting (minutes to clean human-readable strings).
   - Verifies active streak and longest streak calculations across consecutive days.
5. **GitHub URL Validation**
   - Enforces valid repository URL format (`https://github.com/owner/repo`).
   - Rejects non-GitHub domains, javascript URIs, and malformed inputs.

---

## Data Storage & Privacy

Open AI Roadmap is designed with strict **user privacy and data sovereignty**:

- **No Remote Telemetry**: No third-party tracking scripts, analytics beacons, or remote logging.
- **No Authentication Barriers**: No sign-up walls, OAuth prompts, or passwords required to track progress.
- **Local Storage Key**: All state is serialized to `localStorage.getItem("ai_roadmap_state_v1")`.
- **Portability**: You own your learning records. Export your entire dataset as JSON at any time or restore it on any new device.

---

## SEO, Metadata & Accessibility

- **Semantic HTML**: Proper heading hierarchies (`h1` through `h4`), landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`), and ARIA labels on all interactive controls.
- **Search Engine Optimization**:
  - OpenGraph cards and Twitter summary metadata for all pages.
  - Next.js dynamic `sitemap.xml` mapping core pages, all 44 courses, and all 14 projects.
  - Next.js `robots.txt` allowing search indexing of educational content while disallowing local dashboard trackers.
  - Schema.org JSON-LD structured data (`WebSite` and `EducationalOccupationalProgram`) embedded in the root layout.
- **Accessibility**: High-contrast WCAG 2.1 AA compliant typography, clear focus rings, and full keyboard navigation support.

---

## Contributing

Contributions to curriculum improvements, new free course recommendations, and bug fixes are welcome!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/curriculum-enhancement`).
3. Ensure all tests and linters pass (`npm test && npm run lint`).
4. Commit your changes (`git commit -m 'Add Phase 5 attention visualization resource'`).
5. Push to the branch (`git push origin feature/curriculum-enhancement`).
6. Open a Pull Request.

---

## License

This project is open-source and licensed under the [MIT License](LICENSE).
