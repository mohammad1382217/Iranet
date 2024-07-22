import Chip from "@material-tailwind/react/components/Chip/index";
import {
  FiGrid,
  FiSliders,
  FiUser,
  FiBell,
  FiMessageSquare,
  FiMail,
  FiBarChart2,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuThumbsUp, LuGift } from "react-icons/lu";

export const underMenuAdmin = [
  {
    id: 1,
    title: <p lang="fa" role="text">داشبورد</p>,
    icon: <FiGrid className="w-4 h-4" />,
    redirect: "/admin/dashboard",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 2,
    title: <p lang="fa" role="text">تنظیمات</p>,
    icon: <FiSliders className="w-4 h-4" />,
    redirect: "/admin/Setting",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 3,
    title: <p lang="fa" role="text">مدیریت کاربران</p>,
    icon: <FiUser className="w-4 h-4" />,
    redirect: "/admin/UserManagement",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 4,
    title: <p lang="fa" role="text">مدیریت فروشگاه ها</p>,
    icon: <HiOutlineShoppingBag className="w-4 h-4" />,
    redirect: "/admin/StoreManagement",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 5,
    title: <p lang="fa" role="text">مدیریت اعلانات و تبلیغات</p>,
    icon: <FiBell className="w-4 h-4" />,
    redirect: "/admin/NotificationManagement",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 6,
    title: <p lang="fa" role="text">پنل ارسال پیامک</p>,
    icon: <FiMessageSquare className="w-4 h-4" />,
    redirect: "/admin/SmsSendingPanel",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 7,
    title: (
      <div className="w-full h-10 !p-0 flex justify-between items-center rounded-lg">
        <div className="flex flex-row gap-2.5 items-center justify-start !p-0">
          <p lang="fa" role="text">تیکت ها</p>
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
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 8,
    title: <p lang="fa" role="text">لیست گروه ها</p>,
    icon: <FiUsers className="w-4 h-4" />,
    redirect: "/admin/ListOfGroups",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 9,
    title: <p lang="fa" role="text">لیست نظر سنجی ها</p>,
    icon: <LuThumbsUp className="w-4 h-4" />,
    redirect: "/admin/ListOfPolls",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 10,
    title: <p lang="fa" role="text">لیست قرعه کشی ها</p>,
    icon: <LuGift className="w-4 h-4" />,
    redirect: "/admin/LotteryList",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
  {
    id: 11,
    title: <p lang="fa" role="text">لیست گزارشات مالی</p>,
    icon: <FiBarChart2 className="w-4 h-4" />,
    redirect: "/admin/ListOfFinancialReports",
    color: "#013259",
    backgroundColor: "#D9EEFE",
  },
];
