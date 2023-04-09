import { Link } from "react-router-dom";

import classes from "./Button.module.css";
import { ButtonProps } from "../../types/types";

function Button({ children, to, onClick, inverted, disabled }: ButtonProps) {
  if (to) {
    return (
      <div className={classes.button_container}>
        <Link className={`${classes.button} ${classes.link}`} to={to}>
          {children}
        </Link>
        <div className={classes.button_shadow}></div>
      </div>
    );
  }

  return (
    <div className={classes.button_container}>
      <button className={classes.button}>{children}</button>
      <div className={classes.button_shadow}></div>
    </div>
  );
}

export default Button;
