import React from "react";
import { Link } from "react-router-dom";
import rectangle_dashbaord_mini_box from "../assets/images/rectangle_dashbaord_mini_box.png";

export const DashboardCard: React.FC<DashboardCardProps> = ({
  HeaderCard,
  children,
  UrlLinkCard,
  LinkCard,
  OnClick,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${rectangle_dashbaord_mini_box})`,
      }}
      className="container h-44 px-5 pt-10 bg-cover rounded-lg lg:my-0 bg-gray-50 relative"
    >
      <div className="container">
        <h3 className="font-medium text-[#151515] text-lg 2xl:text-base">
          {HeaderCard}
        </h3>
        <div className="text-3xl mb-[1.125rem] mt-[11px] flex flex-row gap-6 xl:gap-3 items-center">
          {children}
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          to={UrlLinkCard}
          onClick={OnClick}
          className="flex justify-end cursor-pointer font-light text-base text-[#00503A] self-end absolute bottom-4 left-3"
        >
          {LinkCard}
        </Link>
      </div>
    </div>
  );
};

// Types
interface DashboardCardProps {
  HeaderCard: string;
  children: React.ReactNode;
  UrlLinkCard: string;
  LinkCard: React.ReactNode;
  OnClick: React.MouseEventHandler<HTMLAnchorElement>;
}