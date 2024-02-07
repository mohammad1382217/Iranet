import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { HeaderSidebar } from "./HeaderSidebar";

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarClass,
  sidebarImage,
  titleOne,
  titleTwo,
  titleThree,
  logo,
  closeIcon,
  children,
}) => {
  const sidebarStyle: React.CSSProperties = {
    backgroundImage: `url(${sidebarImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <aside 
      className={`w-60 bg-gray-50 min-h-full h-screen fixed top-0 bottom-0 right-0 lg:hidden md:transition-[margin-right_0.3s_ease-in-out] block overflow-y-auto overflow-x-hidden z-10 shadow-lg text-black ${sidebarClass}`}
    >
      <div className="flex justify-start flex-col w-60">
        <div className="w-full h-36" style={sidebarStyle}>
          <div className="flex items-center justify-between px-4 mt-4">
            {logo}
            {closeIcon}
          </div>
          <HeaderSidebar titleOne={titleOne} titleTwo={titleTwo} titleThree={titleThree}/>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </aside>
  );
};

// Types
interface SidebarProps {
  sidebarClass?: string;
  sidebarImage: string;
  titleOne: string;
  titleTwo: string;
  titleThree: string;
  logo: ReactNode;
  closeIcon?: ReactNode;
  children: ReactNode;
}

Sidebar.propTypes = {
  sidebarImage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};