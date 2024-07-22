import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FaRegBell, FaTimes } from "react-icons/fa";
import { underMenuAdmin } from "../../data/underMenuAdmin";
import { appSlice, fetchAccountDataByIdThunk, useDispatch } from "../../lib/redux";
import headerImage from "../assets/images/avatar.webp";
import AdminSidebarImage from "../assets/images/blue_dashboard_header.webp";
import Skeleton from "antd/es/skeleton";

const MenuList = React.lazy(() => import("@material-tailwind/react/components/Menu/MenuList"));
const Header = React.lazy(() => import("../components/Header"));
const Sidebar = React.lazy(() => import("../components/Sidebar"));
const LiDashboard = React.lazy(() => import("../components/LiDashboard"));
const ProfileMenu = React.lazy(() => import("../components/ProfileMenu"));
const Notification = React.lazy(() => import("../components/Notification"));
const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography/index")
);

const RootAdminLayout: React.FC = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id")!;
  React.useEffect(() => {
    dispatch(fetchAccountDataByIdThunk({ id }));
  }, [dispatch]);
  
  const closeDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(false));
  const openDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(true));
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-20 w-full flex bg-white border-b border-solid border-[#dee2e6] lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out">
        <nav className="h-16 lg-max:h-14 flex flex-[1_0_0] flex-wrap mr-60 lg-max:mr-0 lg-max:px-3 items-center justify-between bg-[#FAFAFA] px-10 py-2 lg-max:py-4">
          <Suspense fallback={<Skeleton />}>
            <Header
              sidebarDrawer={
                <Sidebar
                  sidebarClass={`lg-max:!block select-none`}
                  sidebarImage={AdminSidebarImage}
                  titleOne={"پنل مدیریتی"}
                  titleTwo={"مدیریت اصلی"}
                  titleThree={"مدیریت مشتریان ایرانت"}
                 
                >
                  {underMenuAdmin.slice(0, 2).map((item) => (
                    <LiDashboard key={item.id} item={item} />
                  ))}
                  <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                  {underMenuAdmin.slice(2, 5).map((item) => (
                    <LiDashboard key={item.id} item={item} />
                  ))}
                  <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                  {underMenuAdmin.slice(5, 7).map((item) => (
                    <LiDashboard key={item.id} item={item} />
                  ))}
                  <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                  {underMenuAdmin.slice(7, 12).map((item) => (
                    <LiDashboard key={item.id} item={item} />
                  ))}
                </Sidebar>
              }
              NotificationDrawer={
                <>
                  <div className="my-3 flex justify-between items-center">
                    <h1 className="text-textColor font-bold text-2xl font-[Estedad-FD]">
                      اعلانات
                    </h1>
                    <FaTimes
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => closeDrawerLeft()}
                    />
                  </div>
                  <div className="w-full p-2 lg-max:mb-5 flex flex-col">
                    <Notification
                      NotificationHeader={"عنوان اعلان نمونه شماره 1"}
                      footerTitle={"تاریخ :"}
                      footerDate={"1400/00/00"}
                    >
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      است.
                    </Notification>
                  </div>
                </>
              }
              leftSectionHeader={
                <>
                  <ProfileMenu
                    titleProfile={
                      <>
                      <Typography
                        className="text-base sm-max:text-[0.625rem]"
                        variant="h2"
                        color="gray"
                      >
                        مدیریت سامانه
                      </Typography>
                      <Typography
                        variant="small"
                        className="sm-max:text-[0.5rem] font-thin text-blue-gray-600"
                      >
                        {`محمد محمدی`}
                      </Typography>
                    </>
                    }
                    avatarSrc={headerImage}
                    itemMenuList={
                      <MenuList>
                        <div className="w-full">
                          <div className="flex flex-row p-1 justify-between w-full">
                            <p className="text-blue-gray-600 text-base font-normal">
                              نام  :{" "}
                              <span className="font-bold">ابوعباس</span>
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-row p-1 justify-between w-full">
                            <p className="text-blue-gray-600 text-base font-normal">
                              نام خانوادگی :{" "}
                              <span className="font-bold">سلطانی</span>
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-row p-1 justify-between w-full">
                            <p className="text-blue-gray-600 text-base font-normal">
                              کد ملی :{" "}
                              <span className="font-bold">0123456789</span>
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-row p-1 justify-between w-full">
                            <p className="text-blue-gray-600 text-base font-normal">
                              شماره تماس :{" "}
                              <span className="font-bold">09121141516</span>
                            </p>
                          </div>
                        </div>
                      </MenuList>
                    }
                  />
                  <FaRegBell
                    className="ml-3 z-50 hover:cursor-pointer block"
                    onClick={() => openDrawerLeft()}
                    color="black"
                    size={20}
                  />
                  <FaRegBell
                    className="ml-3 z-50 hover:cursor-pointer xl-max:block hidden"
                    onClick={() => openDrawerLeft()}
                    color="black"
                    size={20}
                  />
                </>
              }
            />
          </Suspense>
        </nav>
        <Sidebar
          sidebarImage={AdminSidebarImage}
          titleOne={"پنل مدیریتی"}
          titleTwo={"مدیریت اصلی"}
          titleThree={"مدیریت مشتریان ایرانت"}
        >
          {underMenuAdmin.slice(0, 2).map((item) => (
            <Suspense key={item.id} fallback={<Skeleton />}>
              <LiDashboard key={item.id} item={item} />
            </Suspense>
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuAdmin.slice(2, 5).map((item) => (
            <Suspense key={item.id} fallback={<Skeleton />}>
              <LiDashboard key={item.id} item={item} />
            </Suspense>
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuAdmin.slice(5, 7).map((item) => (
            <Suspense key={item.id} fallback={<Skeleton />}>
              <LiDashboard key={item.id} item={item} />
            </Suspense>
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuAdmin.slice(7, 12).map((item) => (
            <Suspense key={item.id} fallback={<Skeleton />}>
              <LiDashboard key={item.id} item={item} />
            </Suspense>
          ))}
        </Sidebar>
      </header>

      <main className="min-h-screen mr-60 lg-max:mr-0 lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out">
        <Outlet />
      </main>

      <footer className="container flex justify-between mr-60 lg-max:mr-0 lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out"></footer>
    </>
  );
};

export default RootAdminLayout;
