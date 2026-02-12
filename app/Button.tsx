'use client';

type Props = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary'; // Allows us to distinguish the Solve button
};

export default function Button({ label, onClick, variant = 'secondary' }: Props) {
  const className = `button ${variant === 'primary' ? 'button--primary' : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
