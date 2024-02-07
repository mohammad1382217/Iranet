import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import sidebarImage from "../assets/images/sidebar-image.jpg";
import headerImage from "../assets/images/header-image.png";
import { underMenu } from "../../data/underMenuStore";
import { LiDashboard } from "../components/LiDashboard";
import { IoEllipseOutline } from "react-icons/io5";
import { Typography } from "@material-tailwind/react";
import { Notification } from "../components/Notification";
import { appSlice, useDispatch } from "../../lib/redux";
import { FaRegBell, FaTimes } from "react-icons/fa";
import { ProfileMenu } from "../components/ProfileMenu";

const RootStoreLayout: React.FC = () => {
  const dispatch = useDispatch();
  const closeDrawerRight = () => dispatch(appSlice.actions.setOpenRight(false));
  const closeDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(false));
  const openDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(true));
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-20 w-full flex bg-white border-b border-solid border-[#dee2e6] lg:transition-[margin-right] lg:duration-300 lg:ease-in-out">
        <nav className="h-16 lg:h-14 flex flex-[1_0_0] flex-wrap mr-60 lg:mr-0 lg:px-3 items-center justify-between bg-[#FAFAFA] px-10 py-2 lg:py-4">
          <Header
            sidebarDrawer={
              <Sidebar
                sidebarClass="lg:!block"
                sidebarImage={sidebarImage}
                titleOne={"پنل مدیریتی"}
                titleTwo={"فروشگاه ها"}
                titleThree={"سامانه مدیریت مشتریان"}
                logo={
                  <section className="flex justify-center items-center text-white gap-1">
                    <IoEllipseOutline className="w-3 h-3 stroke-[3px]" />
                    <Typography variant="h4" className="text-xs font-normal">
                      ایرانت
                    </Typography>
                  </section>
                }
                closeIcon={
                  <FaTimes
                    className="h-5 w-5 cursor-pointer text-white"
                    onClick={() => closeDrawerRight()}
                  />
                }
              >
                {underMenu.slice(0, 1).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenu.slice(1, 3).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenu.slice(3, 8).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenu.slice(8, 12).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
              </Sidebar>
            }
            NotificationDrawer={
              <>
                <div className="my-3 flex justify-between items-center">
                  <h1 className="text-[#151515] font-bold text-2xl font-[Estedad-FD]">
                    اعلانات
                  </h1>
                  <FaTimes
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => closeDrawerLeft()}
                  />
                </div>
                <div className="w-full p-2 lg:mb-5 flex flex-col">
                  <Notification NotificatonClass={"!w-full !m-0"} />
                </div>
              </>
            }
            leftSectionHeader={
              <>
                <ProfileMenu
                  titleProfile={
                    <>
                      <Typography
                        className="sm:text-[0.625rem]"
                        variant="h6"
                        color="gray"
                      >
                        فروشگاه شماره 1
                      </Typography>
                      <Typography
                        variant="small"
                        className="sm:text-[0.5rem] font-thin"
                      >
                        محمد محمدی
                      </Typography>
                    </>
                  }
                  avatarSrc={headerImage}
                />
                <FaRegBell
                  className="ml-3 z-50 hover:cursor-pointer xl:block hidden"
                  onClick={() => openDrawerLeft()}
                  color="black"
                  size={20}
                />
              </>
            }
          />
        </nav>
        <Sidebar
          sidebarImage={sidebarImage}
          titleOne={"پنل مدیریتی"}
          titleTwo={"فروشگاه ها"}
          titleThree={"سامانه مدیریت مشتریان"}
          logo={
            <section className="flex justify-center items-center text-white gap-1">
              <IoEllipseOutline className="w-3 h-3 stroke-[3px]" />
              <Typography variant="h4" className="text-xs font-normal">
                ایرانت
              </Typography>
            </section>
          }
        >
          {underMenu.slice(0, 1).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenu.slice(1, 3).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenu.slice(3, 8).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenu.slice(8, 12).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
        </Sidebar>
      </header>

      <main className="min-h-screen mr-60 lg:mr-0 lg:transition-[margin-right] lg:duration-300 lg:ease-in-out">
        <Outlet />
      </main>

      <footer className="container flex justify-between mr-60 lg:mr-0 lg:transition-[margin-right] lg:duration-300 lg:ease-in-out"></footer>
    </>
  );
};

export default RootStoreLayout;
