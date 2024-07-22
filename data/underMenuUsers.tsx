import Chip from "@material-tailwind/react/components/Chip/index";
import {
  FiGrid,
  FiMail,
} from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuUserCheck } from "react-icons/lu";

export const underMenuUsers = [
  {
    id: 1,
    title: <p lang="fa" role="text">داشبورد</p>,
    icon: <FiGrid className="w-4 h-4" />,
    redirect: "/users/dashboard",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 2,
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
    redirect: "/users/tickets",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
  {
    id: 3,
    title: <p lang="fa" role="text">احراز هویت</p>,
    icon: <LuUserCheck className="w-4 h-4" />,
    redirect: "/users/Authentication",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },  {
    id: 4,
    title: <p lang="fa" role="text">ثبت فروشگاه</p>,
    icon: <HiOutlineShoppingBag className="w-4 h-4" />,
    redirect: "/users/Registeration",
    color: "#00503A",
    backgroundColor: "#DFF8F2",
  },
];
