import React from "react";
import { Typography } from "@material-tailwind/react";

interface HeaderSidebarProps {
  titleOne: string;
  titleTwo: string;
  titleThree: string;
}

export const HeaderSidebar: React.FC<HeaderSidebarProps> = ({
  titleOne,
  titleTwo,
  titleThree,
}) => {
  return (
    <div className="px-4 pt-5">
      <Typography variant="h6" color="white">
        {titleOne}
      </Typography>
      <Typography variant="h4" color="white">
        {titleTwo}
      </Typography>
      <Typography variant="small" color="white" className="font-normal">
        {titleThree}
      </Typography>
    </div>
  );
};