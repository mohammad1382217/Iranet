import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export const Input: React.FC<InputProps> = ({
  Type,
  InputValue,
  Id,
  Disabled,
  InputName,
  InputClass,
  
  Placeholder,
  InputOnChange,
}) => {
  return (
    <input
      type={Type}
      value={InputValue}
      id={Id}
      disabled={Disabled}
      name={InputName}
      className={InputClass}
      placeholder={Placeholder}
      onChange={InputOnChange}
    />
  );
};

// Types
export interface InputProps {
  Type: HTMLInputTypeAttribute;
  InputValue?: string | undefined;
  Id?: string;
  Disabled:boolean,
  InputName: string;
  InputClass: string;
  Placeholder?: string;
  InputOnChange?: ChangeEventHandler<HTMLInputElement>;
}
