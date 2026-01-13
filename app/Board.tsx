import Cell from "./Cell";
import type { CellValue } from "./SudokuApp";

type Pos = { r: number; c: number };

export default function Board(props: {
  grid: CellValue[][];
  selected: Pos | null;
  onSelect: (pos: Pos) => void;
}) {
  const { grid, selected, onSelect } = props;

  return (
    <div
      className="board"
      role="grid"
      aria-label="Sudoku board"
    >
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Cell
            key={`${r}-${c}`}
            value={value}
            selected={!!selected && selected.r === r && selected.c === c}
            onClick={() => onSelect({ r, c })}
            onFocus={() => onSelect({ r, c })}
          />
        ))
      )}
    </div>
  );
}
