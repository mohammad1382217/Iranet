import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import type { chartListType } from "../../../(store)/store/Dashboard/page";
import CustomTable, { type CustomColumnType } from "../../../components/Table";
import rectangle_dashbaord_small_box_admin from "../../../assets/images/rectangle_dashbaord_small_box_admin.webp";
import rectangle_dashbaord_mini_boxRight_admin from "../../../assets/images/rectangle_dashbaord_mini_boxRight_admin.webp";
import Skeleton from "antd/es/skeleton/Skeleton";
import SkeletonButton from "antd/es/skeleton/Button";
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Popover = React.lazy(() => import("antd/es/popover/index"));
const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography/index")
);
const Chip = React.lazy(
  () => import("@material-tailwind/react/components/Chip/index")
);
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const Notification = React.lazy(
  () => import("../../../components/Notification")
);
const NotificationBox = React.lazy(
  () => import("../../../components/NotificationBox")
);
const PercentagePieChart = React.lazy(
  () => import("../../../components/PercentagePieChart")
);
const DashboardSmallCard = React.lazy(
  () => import("../../../components/DashboardSmallCard")
);

const chartList: chartListType[] = [
  {
    lable: "تبلیغاتی",
    percent: [20, 80],
    fill: "#FF7875",
  },
  {
    lable: "خدماتی",
    percent: [20, 80],
    fill: "#40A9FF",
  },
  {
    lable: "ترکیبی",
    percent: [50, 50],
    fill: "#73D13D",
  },
  {
    lable: "ویژه",
    percent: [10, 90],
    fill: "#FFA940",
  },
];

const AdminDashboard: React.FC = () => {
  const columns: CustomColumnType<DataType>[] = [
    {
      title: "عنوان فروشگاه",
      dataIndex: "store_name",
      key: "store_name",
      searchProps: true,
    },
    {
      title: "نام مالک",
      dataIndex: "first_name",
      key: "first_name",
      searchProps: true,
    },
    {
      title: "شماره تماس",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      searchProps: true,
      render: (phone: string) => (
        <Suspense fallback={<Skeleton />}>
          <Popover content={<div className="">{phone}</div>}>
            <div className="flex justify-center mx-7 px-2">
              <span>{phone.slice(0, 60)}</span>
              <span>...</span>
            </div>
          </Popover>
        </Suspense>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "events",
      align: "center",
      key: "events",
      ellipsis: true,
      render: (events: string) => (
        <Suspense fallback={<Skeleton />}>
          <Tag key={events}>{"نمایش اطلاعات کاربر"}</Tag>
        </Suspense>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-row lg-max:flex-col">
      <div className="w-3/4 p-10 sm-max:!py-3 sm-max:!px-5 xl-max:w-full h-full flex items-center content-center flex-col gap-4 lg-max:gap-5">
        <div className="container grid grid-cols-3 lg-max:grid-cols-1 gap-4 items-center justify-center">
          <Suspense fallback={<Skeleton />}>
            <DashboardSmallCard
              HeaderCardOne={"تعداد کل"}
              HeaderCardTwo="پیامک های ارسالی"
              UrlImage={rectangle_dashbaord_small_box_admin}
            >
              <p
                lang="fa"
                role="text"
                className="text-[#0081E8] text-3xl font-bold"
              >
                100
              </p>
            </DashboardSmallCard>
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <DashboardSmallCard
              HeaderCardOne={"تعداد"}
              HeaderCardTwo="پیامک های امروز"
              UrlImage={rectangle_dashbaord_small_box_admin}
            >
              <p
                lang="fa"
                role="text"
                className="text-[#0081E8] text-3xl font-bold"
              >
                5
              </p>
            </DashboardSmallCard>
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <DashboardSmallCard
              HeaderCardOne={"تعداد کل"}
              HeaderCardTwo="پیامک های برگشتی"
              UrlImage={rectangle_dashbaord_small_box_admin}
            >
              <p
                lang="fa"
                role="text"
                className="text-[#FD6E6E] text-3xl font-bold"
              >
                10
              </p>
            </DashboardSmallCard>
          </Suspense>
        </div>
        <div className="container grid grid-cols-3 lg-max:grid-cols-1 gap-4 items-center justify-center">
          <Suspense fallback={<Skeleton />}>
            <DashboardSmallCard
              HeaderCardOne={"تعداد پیامک های"}
              HeaderCardTwo="منتظر ارسال"
              UrlImage={rectangle_dashbaord_small_box_admin}
              isLink
              LinkText="ورود به پنل ارسال پیامک"
              href={"/admin/SmsSendingPanel"}
            >
              <p
                lang="fa"
                role="text"
                className="text-[#0081E8] text-3xl font-bold"
              >
                25
              </p>
            </DashboardSmallCard>
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <DashboardSmallCard
              HeaderCardOne={"تعداد گروه های"}
              HeaderCardTwo="منتظر تایید"
              UrlImage={rectangle_dashbaord_small_box_admin}
              isLink
              LinkText="مدیریت گروه ها"
              href={"/admin/ListOfGroups"}
            >
              <p
                lang="fa"
                role="text"
                className="text-[#0081E8] text-3xl font-bold"
              >
                100
              </p>
            </DashboardSmallCard>
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <DashboardSmallCard
              HeaderCardOne={"تعداد پرداخت های"}
              HeaderCardTwo="منتظر تایید"
              UrlImage={rectangle_dashbaord_small_box_admin}
              isLink
              LinkText="مشاهدۀ گزارشات مالی"
              href={"/admin/ListOfFinancialReports"}
            >
              <p
                lang="fa"
                role="text"
                className="text-[#0081E8] text-3xl font-bold"
              >
                100
              </p>
            </DashboardSmallCard>
          </Suspense>
        </div>
        {/* -------- کاربران منتظر تایید -------- */}
        <div className="container flex flex-col gap-5">
          <div className="container h-16 rounded-lg bg-gray-50 flex p-3 sm-max:p-2 justify-between items-center gap-2">
            <div className="container flex gap-4 sm-max:gap-2">
              <p
                lang="fa"
                role="text"
                className="font-medium text-lg sm-max:text-sm text-textColor w-max sm:hidden sm-max:block"
              >
                {"کاربران منتظر تایید"}
              </p>
              <p
                lang="fa"
                role="text"
                className="font-medium text-lg sm-max:text-sm text-textColor w-max sm:block sm-max:hidden"
              >
                کاربران منتظر تایید احراز هویت
              </p>
              <Suspense fallback={<Skeleton />}>
                <Badge
                  className="flex items-center py-1 px-3 sm-max:px-2 bg-[#0378D5] rounded-lg text-xs font-bold text-white w-max"
                  size="default"
                >
                  تعداد کاربران: 7
                </Badge>
              </Suspense>
            </div>
            <Link to="/admin/UserManagement">
              <Suspense fallback={<SkeletonButton />}>
                <ButtonComponent ButtonClass="bg-primary text-xs font-bold sm-max:p-2 h-11 flex justify-center items-center w-max">
                  مدیریت کاربران
                </ButtonComponent>
              </Suspense>
            </Link>
          </div>
          {/* -------- جدول -------- */}
          <div className="container">
            <Suspense fallback={<Skeleton />}>
              <CustomTable
                size="small"
                bordered
                columns={columns}
                dataSource={[]}
                theme="primary"
              />
            </Suspense>
          </div>
        </div>
        <div
          className="container py-6 px-8 bg-cover flex gap-28 xl-max:gap-16 lg-max:!gap-6 lg-max:flex-col items-center bg-gray-50 bg-right justify-around bg-no-repeat h-atuo rounded-lg"
          style={{
            backgroundImage: `url(${rectangle_dashbaord_mini_boxRight_admin})`,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 lg-max:w-full lg-max:justify-between">
            <div className="flex flex-col gap-2 lg-max:w-full lg-max:flex-start lg-max:justify-between">
              <Suspense fallback={<Skeleton />}>
                <Typography
                  className="font-semibold sm-max:text-lg text-xl"
                  variant="h4"
                >
                  تعداد انواع
                </Typography>
              </Suspense>
              <Suspense fallback={<Skeleton />}>
                <Typography
                  className="font sm-max:text-xl font-semibold text-2xl"
                  variant="h4"
                >
                  پیامک های ارسالی
                </Typography>
              </Suspense>
            </div>
            <div className="lg-max:w-full flex lg-max:items-start md-max:items-end sm-max:items-start flex-col">
              <Link to="/admin/SmsSendingPanel">
                <Suspense fallback={<Skeleton />}>
                  <Typography
                    variant="small"
                    className="font-normal font text-base text-blue-900"
                  >
                    ورود به پنل ارسال پیامک
                  </Typography>
                </Suspense>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center text-xs">
            <Suspense fallback={<Skeleton />}>
              <PercentagePieChart chartData={chartList} />
            </Suspense>
          </div>
        </div>
      </div>
      {/* -------- اعلانات -------- */}
      <NotificationBox>
        <div className="container flex items-center justify-between mb-6">
          <div className="flex items-center justify-center">
            <FiMail className="ml-2 text-gray-900" color="black" size={20} />
            <h1 className="font-bold text-2xl text-textColor">تیکت ها</h1>
          </div>
          <div>
            <Suspense fallback={<Skeleton />}>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full h-8 w-8 flex items-center justify-center text-base font-bold mx-2"
              />
            </Suspense>
          </div>
        </div>
        <Link to="/admin/tickets/viewTicket/1">
          <Suspense fallback={<Skeleton />}>
            <Notification
              NotificationHeader={"عنوان تیکت"}
              NotificationId="شناسه تیکت"
              NotificationIdClass="!block"
              footerTitle={"تاریخ :"}
              footerDate={"1400/00/00"}
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
            </Notification>
          </Suspense>
        </Link>
      </NotificationBox>
    </div>
  );
};

export default AdminDashboard;

// Types
interface DataType {
  key: React.Key;
  store_name: string;
  first_name: string;
  phone: string;
}
