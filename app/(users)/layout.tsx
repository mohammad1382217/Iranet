import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaRegBell } from "react-icons/fa";
import ProfileMenu from "../components/ProfileMenu";
import LiDashboard from "../components/LiDashboard";
import { appSlice, fetchAccountDataByIdThunk, selectAccount, useDispatch, useSelector } from "../../lib/redux";
import { underMenuUsers } from "../../data/underMenuUsers";
import headerImage from "../assets/images/avatar.webp";
import sidebarImage from "../assets/images/green_dashboard_header.webp";
const MenuList = React.lazy(() => import("@material-tailwind/react/components/Menu/MenuList"));
const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography/index")
);

const RootusersLayout: React.FC = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id")!;
  React.useEffect(() => {
    dispatch(fetchAccountDataByIdThunk({ id }));
  }, [dispatch]);
  
  const closeDrawerRight = () => dispatch(appSlice.actions.setOpenRight(false));
  // const closeDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(false));
  const openDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(true));
  const account = useSelector(selectAccount);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-20 w-full flex bg-white border-b border-solid border-[#dee2e6] lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out">
        <nav className="h-16 lg-max:h-14 flex flex-[1_0_0] flex-wrap mr-60 lg-max:mr-0 lg-max:px-3 items-center justify-between bg-[#FAFAFA] px-10 py-2 lg-max:py-4">
          <Header
            sidebarDrawer={
              <Sidebar
                sidebarClass="lg-max:!block"
                sidebarImage={sidebarImage}
                titleOne={""}
                titleTwo={"پنل کاربران"}
                titleThree={"سامانه باشگاه مشتریان ایرانت"}
              >
                {underMenuUsers.slice(0, 2).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenuUsers.slice(2, 4).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
              </Sidebar>
            }
            NotificationDrawer={<></>}
            leftSectionHeader={
              <>
                <ProfileMenu
                  titleProfile={
                    <>
                     
                      <Typography
                        variant="small"
                        className="sm-max:text-[0.5rem] font-thin text-blue-gray-600"
                      >
                        {`${account?.first_name} ${account?.last_name}`}
                      </Typography>
                      <Typography
                        className="!text-lg sm-max:!text-[0.625rem] text-gray-900"
                        variant="h2"
                        color="gray"
                      >
                        {account?.verified === false ? <span className="text-[#FD6E6E]  text-sm font-normal">احراز نشده</span> : <span className="text-[#2DCEA2] text-sm font-normal">احراز شده</span>}
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
                            <span className="font-bold">{account?.first_name}</span>
                          </p>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex flex-row p-1 justify-between w-full">
                          <p className="text-blue-gray-600 text-base font-normal">
                            نام خانوادگی :{" "}
                            <span className="font-bold">{account?.last_name}</span>
                          </p>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex flex-row p-1 justify-between w-full">
                          <p className="text-blue-gray-600 text-base font-normal">
                            کد ملی :{" "}
                            <span className="font-bold">{account?.nid}</span>
                          </p>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex flex-row p-1 justify-between w-full">
                          <p className="text-blue-gray-600 text-base font-normal">
                            شماره تماس :{" "}
                            <span className="font-bold">{account?.phone_number}</span>
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
              </>
            }
          />
        </nav>
        <Sidebar
          sidebarImage={sidebarImage}
          titleOne={""}
          titleTwo={"پنل کاربران"}
          titleThree={"سامانه باشگاه مشتریان ایرانت"}
        >
          {underMenuUsers.slice(0, 2).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuUsers.slice(2, 4).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
        </Sidebar>
      </header>

      <main
        className={`min-h-screen mr-60 lg-max:mr-0 lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out`}
      >
        <Outlet />
      </main>

      <footer className="container flex justify-between mr-60 lg-max:mr-0 lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out"></footer>
    </>
  );
};

export default RootusersLayout;