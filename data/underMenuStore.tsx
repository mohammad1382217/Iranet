import Chip from "@material-tailwind/react/components/Chip/index";
import {
  FiGrid,
  FiUsers,
  FiMessageSquare,
  FiMail,
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";
import { LuThumbsUp, LuGift } from "react-icons/lu";

export const underMenuStore = [
  {
    id: 1,
    title: <p lang="fa" role="text">داشبورد</p>,
    icon: <FiGrid className="w-4 h-4" />,
    redirect: "/store/dashboard",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 2,
    title: <p lang="fa" role="text">گروه ها</p>,
    icon: <FiUsers className="w-4 h-4" />,
    redirect: "/store/groups",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 3,
    title: <p lang="fa" role="text">ارسال پیامک</p>,
    icon: <FiMessageSquare className="w-4 h-4" />,
    redirect: "/store/SendSms",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 5,
    title: <p lang="fa" role="text">نظرسنجی و مسابقه</p>,
    icon: <LuThumbsUp className="w-4 h-4" />,
    redirect: "/store/survey",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 6,
    title: <p lang="fa" role="text">قرعه کشی</p>,
    icon: <LuGift className="w-4 h-4" />,
    redirect: "/store/lottery",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 7,
    title: (
      <div className="w-full h-10 !p-0 flex justify-between items-center rounded-lg select-none">
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
    redirect: "/store/tickets",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 8,
    title: <p lang="fa" role="text">گزارشات مالی</p>,
    icon: <FiBarChart2 className="w-4 h-4" />,
    redirect: "/store/financialReports",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 9,
    title: <p lang="fa" role="text">شارژ حساب</p>,
    icon: <FiTrendingUp className="w-4 h-4" />,
    redirect: "/store/chargeAccount",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
];
