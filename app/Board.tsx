import Cell from "./Cell";

import { SudokuBoard } from "@engine/SudokuBoard";

type Pos = { r: number; c: number };

export default function Board(props: {
  board: SudokuBoard;
  selected: Pos | null;
  onSelect: (pos: Pos | null) => void;
  fixedCells: boolean[][];
  disabled: boolean;
}) {
  const { board, selected, onSelect, fixedCells, disabled } = props;

  return (
    <div className="board" role="grid" aria-label="Sudoku board">
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => {
          const value = board.getCell(r, c);
          const isSelected = selected?.r === r && selected?.c === c;

          return (
            <Cell
              key={`${r}-${c}`}
              value={value}
              selected={isSelected}
              fixed={fixedCells[r][c]}
              disabled={disabled}
              onClick={() => onSelect({ r, c })}
              onFocus={() => onSelect({ r, c })}
            />
          );
        })
      )}
    </div>
  );
}
