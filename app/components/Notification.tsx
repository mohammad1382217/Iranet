import React from "react";

export const Notification: React.FC<{ NotificatonClass: string }> = ({
  NotificatonClass
}) => {
  return (
    <div
      className={`p-2 bg-white flex flex-col rounded-lg justify-center gap-4 ${NotificatonClass}`}
    >
      <h2 className="text-base 2xl:!text-sm 3xl:text-base font-medium">
        متن عنوان اعلان نمونه شماره 1
      </h2>
      <div className="h-[1px] mx-auto w-10/12 bg-blue-gray-50"></div>
      <p className="font-normal text-sm">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
      </p>
      <div className="h-[1px] mx-auto w-10/12 bg-blue-gray-50"></div>
      <div className="flex flex-row justify-between w-full">
        <div className="font-light text-xs text-black/90">تاریخ :</div>
        <div className="font-light text-xs text-[#262626]">
          1400/00/00
        </div>
      </div>
    </div>
  );
};