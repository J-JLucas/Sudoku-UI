"use client";

import { useEffect, useState } from "react";
import Board from "./Board";

import { SudokuBoard } from "@engine/SudokuBoard";
import type { CellValue } from "@engine/types";

type Pos = { r: number; c: number };

export default function SudokuApp() {
  const [board, setBoard] = useState(() => new SudokuBoard());
  const [selected, setSelected] = useState<Pos | null>(null);

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
    </main>
  );
}
