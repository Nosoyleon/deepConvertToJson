import React from "react";
import { string, func } from "prop-types";

function Button({ onClickHandler, text, className }) {
  return (
    <button className={className} type="button" onClick={onClickHandler}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClickHandler: func.isRequired,
  text: string.isRequired,
  className: string
};

export default Button;
