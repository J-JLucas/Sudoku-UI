import type { CellValue } from "@engine/types";

export default function Cell(props: {
  value: CellValue;
  selected: boolean;
  onClick: () => void;
  onFocus: () => void;
}) {

  const { value, selected, onClick, onFocus } = props;

  return (
    <button
      type="button"
      className={selected ? "cell cell--selected" : "cell"}
      onClick={onClick}
      onFocus={onFocus}
    >
      {value ?? ""}
    </button>
  );
}
