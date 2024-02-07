import { Chip } from "@material-tailwind/react";
import {
  FiGrid,
  FiUsers,
  FiMessageSquare,
  FiCalendar,
  FiMail,
  FiSend,
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";
import { LuBook, LuThumbsUp, LuGift } from "react-icons/lu";

export const underMenu = [
  {
    id: 1,
    title: <p>داشبورد</p>,
    icon: <FiGrid className="w-4 h-4" />,
    redirect: "/store/dashboard",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 2,
    title: <p>گروه ها</p>,
    icon: <FiUsers className="w-4 h-4" />,
    redirect: "/store/groups",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 3,
    title: <p>دفترچه ها</p>,
    icon: <LuBook className="w-4 h-4" />,
    redirect: "/store/notes",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 4,
    title: <p>ارسال پیامک</p>,
    icon: <FiMessageSquare className="w-4 h-4" />,
    redirect: "/store/SendSms",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 5,
    title: <p>پیام های مناسبتی</p>,
    icon: <FiCalendar className="w-4 h-4" />,
    redirect: "/store/occasionalMessage",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 6,
    title: <p>نظرسنجی ها</p>,
    icon: <LuThumbsUp className="w-4 h-4" />,
    redirect: "/store/survey",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 7,
    title: <p>قرعه کشی</p>,
    icon: <LuGift className="w-4 h-4" />,
    redirect: "/store/lottery",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 8,
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
    redirect: "/store/tickets",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 9,
    title: <p>گزارشات ارسال</p>,
    icon: <FiSend className="w-4 h-4" />,
    redirect: "/store/sendReports",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 10,
    title: <p>گزارشات مالی</p>,
    icon: <FiBarChart2 className="w-4 h-4" />,
    redirect: "/store/financialReports",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 11,
    title: <p>شارژ حساب</p>,
    icon: <FiTrendingUp className="w-4 h-4" />,
    redirect: "/store/chargeAccount",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
];
