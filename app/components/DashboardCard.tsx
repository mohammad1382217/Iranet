import React from "react";
import { Link } from "react-router-dom";

const DashboardCard: React.FC<DashboardCardProps> = ({
  HeaderCard,
  isLink,
  children,
  UrlLinkCard,
  LinkCard,
  UrlImage,
  classLink,
  className,
  OnClick,
  handleClick,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${UrlImage})`,
      }}
      className={`w-full h-44 px-5 pt-10 bg-cover rounded-lg lg-max:my-0 bg-gray-50 relative ${className}`}
      onClick={handleClick}
    >
      <div
        className={`container flex flex-col justify-start gap-2.5 ${className}`}
      >
        <div>
          <h3 className="font-medium text-textColor text-base">{HeaderCard}</h3>
        </div>
        <div className="text-3xl flex flex-row gap-6 xl-max:gap-3 items-center">
          {children}
        </div>
      </div>
      {isLink ? (
        <div className="flex justify-end">
          <Link
            to={UrlLinkCard!}
            onClick={OnClick}
            className={`flex justify-end cursor-pointer font-light text-base self-end absolute bottom-4 left-3 ${classLink}`}
          >
            {LinkCard}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardCard;

// Types
interface DashboardCardProps {
  HeaderCard?: string;
  children: React.ReactNode;
  isLink: boolean;
  UrlLinkCard?: string;
  className?: string;
  LinkCard?: React.ReactNode;
  UrlImage: string;
  classLink?: string;
  OnClick?: React.MouseEventHandler<HTMLAnchorElement>;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}
