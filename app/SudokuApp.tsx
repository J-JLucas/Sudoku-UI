"use client";

import { useEffect, useState } from "react";
import Board from "./Board";

export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
type Pos = { r: number; c: number };

function makeEmptyGrid(): CellValue[][] {
  return Array.from({ length: 9 }, () => Array<CellValue>(9).fill(null));
}

export default function SudokuApp() {
  const [grid, setGrid] = useState<CellValue[][]>(() => makeEmptyGrid());
  const [selected, setSelected] = useState<Pos | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selected) return;

      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const v = Number(e.key) as CellValue;
        setGrid(prev => {
          const next = prev.map(r => r.slice());
          next[selected.r][selected.c] = v;
          return next;
        });
      }

      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();
        setGrid(prev => {
          const next = prev.map(r => r.slice());
          next[selected.r][selected.c] = null;
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <main>
      <h1>Sudoku Solver</h1>
      <Board grid={grid} selected={selected} onSelect={setSelected} />
      <p>Click a cell, type 1–9. Backspace/Delete clears.</p>
    </main>
  );
}
