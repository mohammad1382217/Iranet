import { Chip } from "@material-tailwind/react";
import {
  FiGrid,
  FiSliders,
  FiUser,
  FiAlignCenter,
  FiBell,
  FiMessageSquare,
  FiMail,
  FiBarChart2,
} from "react-icons/fi";
import { LuBook, LuThumbsUp, LuGift } from "react-icons/lu";

export const underMenu = [
  {
    id: 1,
    title: <p>داشبورد</p>,
    icon: <FiGrid className="w-4 h-4" />,
    redirect: "/admin/dashboard",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 2,
    title: <p>تنظیمات</p>,
    icon: <FiSliders className="w-4 h-4" />,
    redirect: "/admin/Setting",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 3,
    title: <p>مدیریت کاربران</p>,
    icon: <FiUser className="w-4 h-4" />,
    redirect: "/admin/UserManagement",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 4,
    title: <p>مدیریت متن ها</p>,
    icon: <FiAlignCenter className="w-4 h-4" />,
    redirect: "/admin/ManagingTexts",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 5,
    title: <p>مدیریت اعلانات و تبلیغات</p>,
    icon: <FiBell className="w-4 h-4" />,
    redirect: "/admin/NotificationManagement",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 6,
    title: <p>پنل ارسال پیامک</p>,
    icon: <FiMessageSquare className="w-4 h-4" />,
    redirect: "/admin/SmsSendingPanel",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 7,
    title: (
      <div className="w-full h-10 !p-0 flex justify-between items-center rounded-lg">
        <div className="flex flex-row gap-2.5 items-center justify-start !p-0">
          <p>تیکت ها</p>
        </div>
        <Chip
          value="14"
          size="sm"
          variant="ghost"
          color="blue-gray"
          className="rounded-full h-6 w-6 flex items-center justify-center mx-2"
        />
      </div>
    ),
    icon: <FiMail className="w-4 h-4" />,
    redirect: "/admin/Tickets",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 8,
    title: <p>لیست دفترچه تلفن ها</p>,
    icon: <LuBook className="w-4 h-4" />,
    redirect: "/admin/ListOfPhonebooks",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 9,
    title: <p>لیست نظر سنجی ها</p>,
    icon: <LuThumbsUp className="w-4 h-4" />,
    redirect: "/admin/ListOfPolls",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 10,
    title: <p>لیست قرعه کشی ها</p>,
    icon: <LuGift className="w-4 h-4" />,
    redirect: "/admin/LotteryList",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 11,
    title: <p>لیست گزارشات مالی</p>,
    icon: <FiBarChart2 className="w-4 h-4" />,
    redirect: "/admin/ListOfFinancialReports",
    color: "#0081E8",
    backgroundColor: "#D9EEFE",
  },
];
