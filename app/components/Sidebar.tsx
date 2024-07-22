import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import HeaderSidebar from "./HeaderSidebar";
import logo from "../assets/svg/logo.svg";
import LazyImage from "./LazyImage";

const Sidebar: React.FC<SidebarProps> = ({
  sidebarClass,
  sidebarImage,
  titleOne,
  titleTwo,
  titleThree,
  children,
}) => {
  const sidebarStyle: React.CSSProperties = {
    backgroundImage: `url(${sidebarImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <aside
      aria-label="Menu"
      className={`w-60 bg-gray-50 min-h-full h-screen fixed top-0 bottom-0 right-0 lg-max:hidden md-max:transition-[margin-right_0.3s_ease-in-out] block overflow-y-auto overflow-x-hidden z-10 shadow-lg text-black ${sidebarClass}`}
    >
      <div className="flex justify-start flex-col w-60">
        <div className="w-full h-32" style={sidebarStyle}>
          <section className="flex w-full justify-start items-start text-white px-4 pt-5">
            <LazyImage className="w-[31px] h-[9px] !object-fill"
              src={logo} alt={"logo"} width={31} height={9}
            />
          </section>
          <HeaderSidebar
            titleOne={titleOne}
            titleTwo={titleTwo}
            titleThree={titleThree}
          />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </aside>
  );
};

export default Sidebar;

// Types
interface SidebarProps {
  sidebarClass?: string;
  sidebarImage: string;
  titleOne: string;
  titleTwo: string;
  titleThree: string;
  children: ReactNode;
}

Sidebar.propTypes = {
  sidebarImage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
