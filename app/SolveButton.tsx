'use client';

type Props = {
  onSolve: () => void;
};

export default function SolveButton({ onSolve }: Props) {
  return <button onClick={onSolve}>Solve</button>
}
