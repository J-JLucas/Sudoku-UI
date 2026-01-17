'use client';

type Props = {
  onReset: () => void;
};

export default function ResetButton({ onReset }: Props) {
  return <button onClick={onReset}>Reset</button>
}
