'use client';

type Props = {
  onReset: () => void;
};

export default function ResetButton({ onReset }: Props) {
  return (
    <button
      className="button"
      onClick={onReset}
    >
      Reset
    </button>
  );
}
