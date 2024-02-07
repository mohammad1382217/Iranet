import { FaRegBell } from "react-icons/fa";
import { Notification } from "./Notification";

export const NotificationBox: React.FC<{ NotificatonBoxClass: string }> = ({
  NotificatonBoxClass,
}) => {
  return (
    <div
      className={`w-1/4 sticky left-0 top-16 bottom-0 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch xl:hidden bg-gray-50 p-6 flex flex-col flex-shrink-0 ${NotificatonBoxClass}`}
    >
      <div className="flex items-center justify-start mb-6">
        <FaRegBell className="ml-2 text-gray-900" color="black" size={20} />
        <h1 className="font-bold text-2xl text-[#151515]">اعلانات</h1>
      </div>

      <Notification NotificatonClass={""} />
    </div>
  );
};