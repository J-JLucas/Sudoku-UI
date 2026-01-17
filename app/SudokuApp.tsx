"use client";

import { use, useEffect, useState } from "react";
import Board from "./Board";
import ResetButton from "./ResetButton";
import SolveButton from "./SolveButton";


import type { CellValue } from "@engine/types";
import { SudokuBoard } from "@engine/SudokuBoard";
import { SudokuSolver } from "@engine/SudokuSolver";

type Pos = { r: number; c: number };

const DEFAULT_BOARD: CellValue[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];


export default function SudokuApp() {
  const [board, setBoard] = useState(() => new SudokuBoard(DEFAULT_BOARD));
  const [selected, setSelected] = useState<Pos | null>(null);

  const handleReset = () => {
    setBoard(new SudokuBoard());
    setSelected(null);
  };

  const handleSolve = () => {
    setBoard(prev => {
      const next = prev.clone();
      SudokuSolver.solve(next);
      return next;
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {

      if (!selected) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown" ||
          e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          setSelected({ r: 0, c: 0 });
        }
        return;
      }

      // Arrow key navigation
      if (e.key.startsWith("Arrow")) {
        e.preventDefault();

        let { r, c } = selected;

        switch (e.key) {
          case "ArrowUp": r -= 1; break;
          case "ArrowDown": r += 1; break;
          case "ArrowLeft": c -= 1; break;
          case "ArrowRight": c += 1; break;
        }

        // clamp to board
        r = Math.max(0, Math.min(8, r));
        c = Math.max(0, Math.min(8, c));

        // only update if it actually changed
        if (r !== selected.r || c !== selected.c) {
          setSelected({ r, c });
        }
        return;
      }

      // Fill Cell
      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const v = Number(e.key) as CellValue;

        setBoard(prev => {
          const next = prev.clone();
          next.setCell(v, selected.r, selected.c);
          return next;
        });
        return;
      }

      // Clear Cell
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();

        setBoard(prev => {
          const next = prev.clone();
          next.setCell(null, selected.r, selected.c);
          return next;
        });
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <main>
      <h1>Sudoku Solver</h1>
      <Board board={board} selected={selected} onSelect={setSelected} />
      <div className="button-container">
        <ResetButton onReset={handleReset} />
        <SolveButton onSolve={handleSolve} />
      </div>
    </main>
  );
}
