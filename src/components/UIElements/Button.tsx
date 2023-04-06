import { Link } from "react-router-dom";

import classes from "./Button.module.css";
import { ButtonProps } from "../../../types/types";

function Button({ children, to, onClick, inverted, disabled }: ButtonProps) {
  if (to) {
    return <Link to={to}>{children}</Link>;
  }

  return <button>{children}</button>;
}

export default Button;
