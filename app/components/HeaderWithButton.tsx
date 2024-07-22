import React from "react";

const HeaderWithButton: React.FC<HeaderButtonProps> = ({
  HeaderTitle,
  Button,
  ParentClass,
  headerClass,
}) => {
  return (
    <div className={`w-full h-16 px-10 sm-max:px-4 py-4 bg-cover rounded-lg hover:cursor-pointer bg-[#FAFAFA] flex justify-between items-center ${ParentClass}`}>
      <h2 className={`text-xl md-max:text-lg sm-max:!text-sm font-semibold text-textColor ${headerClass}`}>
        {HeaderTitle}
      </h2>
      {Button}
    </div>
  );
};

export default HeaderWithButton;

// Types
interface HeaderButtonProps {
  HeaderTitle: string;
  Button?: React.ReactNode;
  ParentClass?: string;
  headerClass?: string;
}
