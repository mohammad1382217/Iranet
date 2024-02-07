import { Input } from "antd";
const { TextArea } = Input;

const Textarea: React.FC<TextareaProps> = ({
  ShowCount,
  TextAreaClass,
  MaxLength,
  Value,
  Placeholder,
  onChange,
}) => {
  return (
    <TextArea
      showCount={ShowCount}
      className={TextAreaClass}
      maxLength={MaxLength}
      value={Value}
      onChange={onChange}
      placeholder={Placeholder}
    />
  );
};

export default Textarea;

// Types
interface TextareaProps {
  ShowCount?: boolean;
  TextAreaClass: string;
  MaxLength?: number;
  Value: string | undefined;
  Placeholder: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}