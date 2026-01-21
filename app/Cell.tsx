import type { CellValue } from "@engine/types";

export default function Cell(props: {
  value: CellValue;
  selected: boolean;
  fixed: boolean;
  onClick: () => void;
  onFocus: () => void;
}) {

  const { value, selected, fixed, onClick, onFocus } = props;

  const classNames = ["cell"];
  if (selected) classNames.push("cell--selected");
  if (value !== null) classNames.push(fixed ? "cell--fixed" : "cell--solved");

  return (
    <button
      type="button"
      className={classNames.join(" ")}
      onClick={onClick}
      onFocus={onFocus}
    >
      {value ?? ""}
    </button>
  );
}
