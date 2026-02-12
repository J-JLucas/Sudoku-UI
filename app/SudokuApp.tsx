"use client";

import { useEffect, useState } from "react";
import Board from "./Board";
import Button from "./Button";

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
  const [unsolvable, setUnsolvable] = useState(false);
  const [selected, setSelected] = useState<Pos | null>(null);
  const [fixedCells, setFixedCells] = useState<boolean[][]>(
    () => DEFAULT_BOARD.map(row => row.map(cell => cell !== null))
  );

  const handleReset = () => {
    setBoard(new SudokuBoard());
    setFixedCells(Array.from({ length: 9 }, () => Array(9).fill(false)));
    setSelected(null);
    setUnsolvable(false);
  };

  const handleSolve = () => {
    const next = board.clone();
    const success = SudokuSolver.solve(next);
    if (success) {
      setBoard(next);
      setUnsolvable(false);
    } else {
      setUnsolvable(true);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Navigation works regardless of board state
      if (!selected) {
        if (e.key.startsWith("Arrow")) {
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
        r = Math.max(0, Math.min(8, r));
        c = Math.max(0, Math.min(8, c));
        if (r !== selected.r || c !== selected.c) {
          setSelected({ r, c });
        }
        return;
      }

      // Fill Cell (1-9)
      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const v = Number(e.key) as CellValue;

        setUnsolvable(false);

        setBoard(prev => {
          const next = prev.clone();
          next.setCell(v, selected.r, selected.c);
          return next;
        });

        setFixedCells(prev => {
          const next = prev.map(row => [...row]);
          next[selected.r][selected.c] = true;
          return next;
        });
        return;
      }

      // Clear Cell (Backspace, Delete, or 0)
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();

        setUnsolvable(false);

        setBoard(prev => {
          const next = prev.clone();
          next.setCell(null, selected.r, selected.c);
          return next;
        });
        setFixedCells(prev => {
          const next = prev.map(row => [...row]);
          next[selected.r][selected.c] = false;
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
      <Board
        board={board}
        selected={selected}
        onSelect={setSelected}
        fixedCells={fixedCells}
        disabled={false} // Always editable
      />
      {unsolvable && <p className="error">This puzzle input is unsolvable!</p>}
      <div className="button-container">
        <Button label="Reset" onClick={handleReset} />
        <Button label="Solve" onClick={handleSolve} variant="primary" />
      </div>
    </main>
  );
}
