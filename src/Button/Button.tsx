import React, { FC, ButtonHTMLAttributes } from "react";

import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  const compositeClassName = `Button ${className}`;

  return (
    <button {...props} className={compositeClassName}>
      {children}
    </button>
  );
};

export const TextButton: FC<ButtonProps> = ({ className, ...props }) => {
  const compositeClassName = `TextButton ${className}`;

  return <Button {...props} className={compositeClassName} />
}
