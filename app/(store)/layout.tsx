import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaPlus, FaRegBell, FaTimes } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Parag } from "../components/tools";
import {
  appSlice,
  fetchAccountDataByIdThunk,
  selectAccount,
  selectShowModals,
  useDispatch,
  useSelector,
} from "../../lib/redux";
import { underMenuStore } from "../../data/underMenuStore";
import headerImage from "../assets/images/avatar.webp";
import sidebarImage from "../assets/images/green_dashboard_header.webp";
import { LuCreditCard } from "react-icons/lu";
import { profileMenuItems } from "../../data/profileMenuItems";
const Alert = React.lazy(
  () => import("@material-tailwind/react/components/Alert/index")
);
const Modal = React.lazy(() => import("../components/Modal"));
const MenuList = React.lazy(
  () => import("@material-tailwind/react/components/Menu/MenuList")
);
const MenuItem = React.lazy(
  () => import("@material-tailwind/react/components/Menu/MenuItem")
);
const Header = React.lazy(() => import("../components/Header"));
const Sidebar = React.lazy(() => import("../components/Sidebar"));
const ProfileMenu = React.lazy(() => import("../components/ProfileMenu"));
const LiDashboard = React.lazy(() => import("../components/LiDashboard"));
const Notification = React.lazy(() => import("../components/Notification"));
const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography/index")
);

const IconOutlined = () => {
  return <HiOutlineInformationCircle className="h-6 w-6" />;
};

const RootStoreLayout: React.FC = () => {
  const id = localStorage.getItem("id")!;
  React.useEffect(() => {
    dispatch(fetchAccountDataByIdThunk({ id }));
  }, [])
  
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);

  const handleClickDirectPayment = () => {
    navigate("/store/DirectPayment");
    showModalHandler("showModalChargeAccount");
  };

  const handleClickDepositToTheAccount = () => {
    navigate("/store/DepositToTheAccount");
    showModalHandler("showModalChargeAccount");
  };

  // const closeDrawerRight = () => dispatch(appSlice.actions.setOpenRight(false));
  const closeDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(false));
  const openDrawerLeft = () => dispatch(appSlice.actions.setOpenLeft(true));
  const navigate = useNavigate();
  const showModals = useSelector(selectShowModals);
  const showModalHandler = (name: string) => {
    dispatch(appSlice.actions.setShowModals(name));
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-20 w-full flex bg-white border-b border-solid border-[#dee2e6] lg-max:transition-[margin-right] lg-max:duration-300 lg-max:ease-in-out">
        <nav className="h-16 lg-max:h-14 flex flex-[1_0_0] flex-wrap mr-60 lg-max:mr-0 lg-max:px-3 items-center justify-between bg-[#FAFAFA] px-10 py-2 lg-max:py-4">
          <Header
            sidebarDrawer={
              <Sidebar
                sidebarClass="lg-max:!block"
                sidebarImage={sidebarImage}
                titleOne={"پنل مدیریتی"}
                titleTwo={"فروشگاه ها"}
                titleThree={"باشگاه مشتریان ایرانت"}
              >
                {underMenuStore.slice(0, 1).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenuStore.slice(1, 3).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenuStore.slice(3, 5).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
                {underMenuStore.slice(5, 8).map((item) => (
                  <LiDashboard key={item.id} item={item} />
                ))}
                <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
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
                        className="!text-lg sm-max:!text-[0.625rem] text-gray-900"
                        variant="h2"
                        color="gray"
                      >
                       {`${account?.store.store_name}`}
                      </Typography>
                      <Typography
                        variant="small"
                        className="sm-max:text-[0.5rem] font-thin text-blue-gray-600"
                      >
                        {`${account?.first_name} ${account?.last_name}`}
                      </Typography>
                    </>
                  }
                  avatarSrc={headerImage}
                  itemMenuList={
                    <MenuList className="p-6 sm-max:min-w-[32px]">
                      <div className="bg-[#DFF8F2] flex flex-col gap-2 p-4 items-start justify-center hover:border-none rounded-md">
                        <section className="flex items-start gap-2">
                          <LuCreditCard
                            width={20}
                            height={20}
                            className="text-secondary w-5 h-5"
                          />
                          <span className="text-textColor text-sm font-medium">
                            موجودی حساب
                          </span>
                        </section>
                        <section className="flex items-center justify-between w-full">
                          <span className="text-[#00503A] text-sm font-medium">
                            256.000 تومان
                          </span>
                          <FaPlus className="text-secondary" />
                        </section>
                      </div>
                      {profileMenuItems.map((item, key: number) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                          <MenuItem
                            key={item.lable}
                            onClick={() => navigate(item.link)}
                            className={`flex text-center text-sm font-medium items-center gap-2 rounded ${
                              isLastItem
                                ? "hover:bg-red-600/10 focus:bg-red-600/10 active:bg-red-600/10"
                                : ""
                            }`}
                          >
                            {item.icon}
                            <Typography
                              as="span"
                              variant="small"
                              className="text-center text-sm font-medium"
                              color={isLastItem ? "red" : "inherit"}
                            >
                              {item.lable}
                            </Typography>
                          </MenuItem>
                        );
                      })}
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
          titleOne={"پنل مدیریتی"}
          titleTwo={"فروشگاه ها"}
          titleThree={"باشگاه مشتریان ایرانت"}
        >
          {underMenuStore.slice(0, 1).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuStore.slice(1, 3).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuStore.slice(3, 5).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <div className="h-[1px] mx-auto my-2 w-10/12 bg-blue-gray-50"></div>
          {underMenuStore.slice(5, 7).map((item) => (
            <LiDashboard key={item.id} item={item} />
          ))}
          <button
            // onClick={openRight ? closeDrawerRight : undefined}
            onClick={() => showModalHandler("showModalChargeAccount")}
            className="flex flex-row gap-2.5 h-10 transition ease-in-out delay-100 duration-100 items-center justify-start px-4 py-2 rounded-lg text-sm"
          >
            {underMenuStore[7].icon}
            {underMenuStore[7].title}
          </button>
        </Sidebar>
        <Modal
          modalClass="!min-w-[50%] inline-flex flex-col py-[30px] px-[40px] justify-center items-center gap-6 rounded-lg bg-white"
          modalHeader={"انتخاب روش پرداخت"}
          modalHeaderClass="text-4xl font-bold justify-center lg-max:text-2xl !p-0"
          modalBody={
            <div className="container flex items-center justify-center shrink-0 flex-wrap gap-4">
              <div
                onClick={() => handleClickDirectPayment()}
                className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-48 rounded-lg border border-solid border-light-blue-300 bg-light-blue-50 cursor-pointer"
              >
                <Parag
                  Paragraph={"پرداخت مستقیم"}
                  Pclass={"text-2xl text-center font-bold text-light-blue-600"}
                />
              </div>
              <div
                onClick={() => handleClickDepositToTheAccount()}
                className="flex items-center justify-center p-2 w-[calc((100%/2)-(((2-1)/2)*1rem))] h-48 rounded-lg border border-solid border-purple-300 bg-purple-50 cursor-pointer"
              >
                <Parag
                  Paragraph={"واریز به حساب"}
                  Pclass={"text-2xl text-center font-bold text-purple-600"}
                />
              </div>
            </div>
          }
          modalBodyClass="flex !container !p-0"
          modalFooterClass="flex justify-between items-center !p-0"
          modalFooter={
            <>
              <div className="container flex flex-col shrink-0 gap-2">
                <Alert
                  className="!border-0 !p-0 justify-center gap-2 self-stretch"
                  variant="outlined"
                  icon={<IconOutlined />}
                >
                  <Typography className="text-base font-normal">
                    برای استفاده از روش واریز به حساب، ابتدا مبلغ مورد نظر خود
                    را به یکی از شماره های زیر واریز کنید
                  </Typography>
                  <div className="container flex flex-col items-center justify-center text-lg font-light">
                    <ol className="container list-inside list-decimal flex flex-col gap-2">
                      <li className="flex items-center justify-evenly self-stretch flex-wrap">
                        شماره کارت:
                        <span className="">1234543210123454321</span>
                      </li>
                      <li className="flex items-center justify-evenly self-stretch flex-wrap">
                        شماره حساب:
                        <span className="">1234543210123454321</span>
                      </li>
                      <li className="flex items-center justify-evenly self-stretch flex-wrap">
                        شماره شبا:
                        <span className="">1234543210123454321</span>
                      </li>
                    </ol>
                  </div>
                </Alert>
              </div>
            </>
          }
          Open={showModals.showModalChargeAccount}
          HandleOpen={() => showModalHandler("showModalChargeAccount")}
        />
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

export default RootStoreLayout;
