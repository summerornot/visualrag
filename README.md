# Visual RAG Explorer

An interactive educational tool for Product Managers to build intuition about how RAG (Retrieval-Augmented Generation) design decisions shape system behavior and product outcomes.

🔗 **Live Demo:** [https://visualragtool.vercel.app/](https://visualragtool.vercel.app/)

## What is Visual RAG?

Visual RAG is a hands-on exploration tool that helps non-technical stakeholders understand the tradeoffs and impacts of different RAG system configurations. Instead of reading documentation, you can **see** and **interact** with how different strategies affect retrieval quality, system performance, and answer accuracy.

## Who is this for?

Product Managers, Designers, and anyone working with RAG systems who wants to understand how it works under the hood.

## Tech Stack

- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS + DaisyUI

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── components/
│   ├── steps/              # Main flow screens
│   ├── visualizations/     # Interactive visual components
│   └── RangeSlider.tsx     # Reusable slider component
├── lib/
│   ├── data/
│   │   ├── constants.ts    # Pipeline stages, knob definitions
│   │   ├── consequences.ts # Mechanism explanations and impacts
│   │   └── interactions.ts # Cross-knob interaction effects
│   └── types.ts            # TypeScript interfaces
└── app/                    # Next.js app router
```

## Contributing

This tool covers common RAG strategies to help build intuition. It doesn't include all possible configurations.

**Have feedback or suggestions?** [Open an issue](https://github.com/summerornot/visualrag/issues)

## Connect

Created by [Shreya Bisht](https://www.linkedin.com/in/shreyabisht/)
