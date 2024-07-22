import React from "react";

const Notification: React.FC<NotificationProps> = ({
  NotificationClass,
  NotificationHeader,
  NotificationId,
  NotificationIdClass,
  footerTitle,
  footerDate,
  children,
}) => {
  return (
    <div
      className={`p-2.5 bg-white flex flex-col rounded-lg justify-center gap-4 ${NotificationClass}`}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg 2xl-max:!text-sm 3xl-max:text-base font-medium text-textColor">
          {NotificationHeader}
        </h2>
        <span className={`text-xs font-light hidden ${NotificationIdClass}`}>{NotificationId}</span>
      </div>
      <div className="h-[1px] mx-auto w-10/12 bg-blue-gray-50"></div>
      <p lang="fa" role="text" className="font-normal text-sm">{children}</p>
      <div className="h-[1px] mx-auto w-10/12 bg-blue-gray-50"></div>
      <div className="flex flex-row justify-between w-full">
        <div className="font-light text-xs text-black/90">{footerTitle}</div>
        <div className="font-light text-xs text-[#262626]">{footerDate}</div>
      </div>
    </div>
  );
};

export default Notification;

// Types
interface NotificationProps {
  NotificationClass?: string;
  NotificationHeader?: string;
  NotificationId?: string;
  NotificationIdClass?: string;
  footerTitle?: string;
  footerDate?: string;
  children?: React.ReactNode;
}
