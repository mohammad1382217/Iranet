import React from "react";

export const HeaderButton: React.FC<HeaderButtonProps> = ({ element, name }) => {
  return (
    <div className="w-11/12 h-16 rounded-lg bg-[#FAFAFA] flex p-2 mt-5 justify-between items-center">
      <p className="font-medium text-lg text-[#151515]">{name}</p>
      {element}
    </div>
  );
};

// Types
interface HeaderButtonProps {
  element: string,
  name: string
}