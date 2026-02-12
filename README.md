# Sudoku UI - React Sudoku Solver

A clean, high-performance Sudoku Solver interface built with Next.js 15 and TypeScript. Designed as a modular frontend for a decoupled logic engine. Try it [here!](https://j-jlucas.github.io/Sudoku-UI/)
### 🎯 Project Goals:
- GUI Development: Practicing real-time state management and keyboard-driven UX.
- Architecture: Implementing a modular project structure using Git Submodules.
- Frontend Practice: Transitioning from backend logic to a polished React environment.

### 🛠️ Tech Stack
- Framework: Next.js 15 (App Router)
- Logic: Custom TypeScript Backtracking Engine (via @engine alias)
- Styling: Modern Pure CSS
- Deployment: CI/CD via GitHub Actions to GitHub Pages

### 🧩 Submodule Setup
The core solver logic resides in a separate repository to maintain a strict separation of concerns.
To clone and initialize we must add the ``--recursive`` flag:
```Bash
git clone --recursive https://github.com/J-JLucas/Sudoku-UI.git
```
