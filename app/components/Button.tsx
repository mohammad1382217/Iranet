import React from "react";
import type { size } from "@material-tailwind/react/types/components/button";
const Button = React.lazy(() => import("@material-tailwind/react/components/Button/index"));


const ButtonComponent: React.FC<ButtonProps> = ({ children, ButtonClass, onClick, disabled, Type, size}) => {
  return (
    <Button size={size} type={Type} disabled={disabled} onClick={onClick} className={ButtonClass}>
      {children}
    </Button>
  );
};

export default ButtonComponent;

// Types
interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  ButtonClass?: string;
  Type? : "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: size;
}