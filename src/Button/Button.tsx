import React, { FC, ButtonHTMLAttributes } from "react";

import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  const compositeClassName = `Button ${className}`;

  return (
    <button className={compositeClassName} {...props}>
      {children}
    </button>
  );
};
