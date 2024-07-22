import React from "react";

import Input from "antd/es/input/index";

const { TextArea } = Input;

const Textarea: React.FC<TextareaProps> = ({
  ShowCount,
  TextAreaClass,
  MaxLength,
  Name,
  Value,
  Placeholder,
  onChange,
  disabled
}) => {
  return (
    <TextArea
      showCount={ShowCount}
      className={TextAreaClass}
      maxLength={MaxLength}
      name={Name}
      value={Value}
      onChange={onChange}
      placeholder={Placeholder}
      disabled={disabled}
    />
  );
};

export default Textarea;

// Types
interface TextareaProps {
  ShowCount?: boolean;
  TextAreaClass: string;
  MaxLength?: number;
  Name?: string;
  Value?: string | undefined;
  Placeholder: string;
  disabled? : boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
