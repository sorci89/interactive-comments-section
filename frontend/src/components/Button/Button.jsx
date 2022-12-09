import React from "react";

const Button = ({ children, onClick, type, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
