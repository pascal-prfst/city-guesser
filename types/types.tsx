export type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  inverted?: true;
  className?: string;
  type?: string;
  disabled?: boolean;
};

export type Score = {
  name: string;
  score: number;
};
