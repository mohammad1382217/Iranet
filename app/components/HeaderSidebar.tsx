import React from "react";
const Typography = React.lazy(()=> import("@material-tailwind/react/components/Typography/index"));

interface HeaderSidebarProps {
  titleOne: string;
  titleTwo: string;
  titleThree: string;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({
  titleOne,
  titleTwo,
  titleThree,
}) => {
  return (
    <div className="px-4 pt-5">
      <Typography variant="h3" color="white" className={`${titleOne === '' ? 'py-2' : ''} text-xs font-bold`}>
        {titleOne}
      </Typography>
      <Typography variant="h4" color="white" className="text-lg font-bold">
        {titleTwo}
      </Typography>
      <Typography variant="small" color="white" className="font-normal text-xs">
        {titleThree}
      </Typography>
    </div>
  );
};

export default HeaderSidebar;