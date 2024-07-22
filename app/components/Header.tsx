import { HiMenu } from "react-icons/hi";
import React from "react";
const IconButton = React.lazy(()=> import("@material-tailwind/react/components/IconButton/index"));
const Drawer = React.lazy(()=> import("@material-tailwind/react/components/Drawer/index"));

import {
  appSlice,
  selectOpenLeft,
  selectOpenRight,
  useDispatch,
  useSelector,
} from "../../lib/redux";

const Header: React.FC<HeaderProps> = ({
  sidebarDrawer,
  NotificationDrawer,
  leftSectionHeader,
}) => {
  const dispatch = useDispatch();
  const [time, setTime] = React.useState(new Date());

  const options = { timeZone: "Asia/Tehran", hour12: false };
  const iranianTime = time.toLocaleTimeString("en-US", options);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openRight = useSelector(selectOpenRight);
  const openDrawerRight = () => dispatch(appSlice.actions.setOpenRight(true));
  const closeDrawerRight = () => dispatch(appSlice.actions.setOpenRight(false));
  const openLeft = useSelector(selectOpenLeft);
  const closeDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(false));
  return (
    <>
      <div className="flex lg-max:-mt-3 items-center flex-row w-full justify-between sm-max:text-[0.625rem] md-max:px-0 lg-max:!pr-0 px-1 sm-max:!px-1 select-none">
        <div className="z-40 lg-max:hidden">
          <div className="flex items-center justify-center gap-2">
            <h2> تاریخ و ساعت : </h2>
            <span>{new Intl.DateTimeFormat("fa-IR").format()}</span>
            <span> - </span>
            <span>{iranianTime}</span>
          </div>
        </div>
        <div className="hidden lg-max:block">
          <IconButton
            onClick={() => openDrawerRight()}
            className="bg-transparent shadow-none hover:shadow-none md-max:w-9 md-max:h-9 z-40"
          >
            <HiMenu className="w-6 h-6 text-black" />
          </IconButton>
        </div>
        <div className="flex items-center flex-row-reverse">
          {leftSectionHeader}
        </div>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={() => closeDrawerRight()}
        className="w-60"
      >
        <div className="mb-6 flex items-center">{sidebarDrawer}</div>
      </Drawer>
      <Drawer
        placement="left"
        open={openLeft}
        onClose={() => closeDrawerLeft()}
        className="p-6 fixed left-0 bottom-0 bg-gray-50"
      >
        {NotificationDrawer}
      </Drawer>
    </>
  );
};

export default Header;

// Types
interface HeaderProps {
  sidebarDrawer: React.ReactNode;
  NotificationDrawer: React.ReactNode;
  leftSectionHeader: React.ReactNode;
}
