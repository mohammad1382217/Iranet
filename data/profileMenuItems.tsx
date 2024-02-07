import { ReactNode } from 'react'
import { HiLogout, HiUserCircle } from "react-icons/hi";

export const profileMenuItems : profileMenuItemsTypes[] = [
  {
    lable: "حساب کاربری",
    icon: <HiUserCircle color='#90A4AE' size={20} className='ml-1 md:ml-5 sm:ml-4' />,
    link: "/Account",
  },
  {
    lable: "خروج از حساب",
    icon: <HiLogout color='#E53935' size={20} className='ml-1 md:ml-5 sm:ml-4'/>,
    link: "/Login",
  },
]


export interface profileMenuItemsTypes {
  lable: string;
  icon: ReactNode;
  link: string;
}