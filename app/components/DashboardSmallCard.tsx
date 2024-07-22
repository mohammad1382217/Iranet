import React from "react";
import { Parag } from "./tools";
import { Link, type To } from "react-router-dom";
const Typography = React.lazy(() => import("@material-tailwind/react/components/Typography/index"));

const DashboardSmallCard: React.FC<DashboardSmallCardProps> = ({
  HeaderCardOne,
  HeaderCardTwo,
  children,
  UrlImage,
  TypoclassName,
  childrenClass,
  className,
  href,
  LinkText,
  isLink = false,
  OnClick,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${UrlImage})`,
      }}
      className={`container flex flex-col items- justify-center min-h-[100px] p-5 bg-cover rounded-lg lg:my-0 bg-gray-50 gap-3 ${className}`}
      onClick={OnClick}
    >
      <div
        className={`container flex lg:items-center justify-between ${childrenClass}`}
      >
        <Typography
          variant="h3"
          className={`flex flex-col font-semibold text-textColor text-lg w-36 lg:w-max ${TypoclassName}`}
        >
          <Parag Paragraph={HeaderCardOne!} Pclass={""} />
          <Parag Paragraph={HeaderCardTwo!} Pclass={""} />
        </Typography>
        <div className={`text-3xl flex flex-row gap-6 xl:gap-3 items-center`}>
          {children}
        </div>
      </div>
      {isLink ? <Link className="text-base text-[#013259]" to={href!}>{LinkText}</Link> : <></>}
    </div>
  );
};

export default DashboardSmallCard;

// Types
interface DashboardSmallCardProps {
  HeaderCardOne?: string;
  HeaderCardTwo?: string;
  children: React.ReactNode;
  UrlImage: string;
  TypoclassName?: string;
  isLink?: boolean;
  href?: To;
  LinkText?: string;
  childrenClass?: string;
  className?: string;
  OnClick?: React.MouseEventHandler<HTMLDivElement>;
}
