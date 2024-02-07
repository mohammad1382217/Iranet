import React from "react";
import { Button } from "@material-tailwind/react";

const ButtonComponent: React.FC<ButtonProps> = ({ children, ButtonClass, onClick, disabled, Type }) => {
  return (
    <Button type={Type} disabled={disabled} onClick={onClick} className={ButtonClass}>
      {children}
    </Button>
  );
};

export default ButtonComponent;

// Types
interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  ButtonClass: string;
  Type? : "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}