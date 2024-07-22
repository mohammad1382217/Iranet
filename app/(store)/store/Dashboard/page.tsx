import { FaPlus } from "react-icons/fa";
import React, { Suspense } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "../../../components/TableInputNote/TableInputNote.scss";
import raffle from "../../../assets/images/raffle_dashbaord.webp";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import rectangle_dashbaord_mini_box from "../../../assets/images/rectangle_dashbaord_mini_box.webp";
import rectangle_dashbaord_mini_boxRight from "../../../assets/images/rectangle_dashbaord_mini_boxRight.webp";
import {
  useSelector,
  useDispatch,
  appSlice,
  selectShowModals,
} from "../../../../lib/redux";

const Modal = React.lazy(() => import("../../../components/Modal"));
const Popover = React.lazy(() => import("antd/es/popover/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const DashboardCard = React.lazy(
  () => import("../../../components/DashboardCard")
);
const DialogTable = React.lazy(
  () => import("../../../components/anniversaryDialog")
);
const IconButton = React.lazy(
  () => import("@material-tailwind/react/components/IconButton/index")
);
const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography/index")
);
const PercentagePieChart = React.lazy(
  () => import("../../../components/PercentagePieChart")
);

const data: DataType[] = [
  {
    key: "1",
    SendCode: "12345678",
    time: "1400/00/00",
    text: "لورم  یپسوم متن ساختگی  یپسوم متن ساختگی ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ",
  },
  {
    key: "2",
    SendCode: "12345678",
    time: "1400/00/00",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت م ایپسوم متن ",
  },
  {
    key: "3",
    SendCode: "12345678",
    time: "1400/00/00",
    text: "لورم ایپسومایپسومایپسومایپسومایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ایپسومایپسومایپسومایپسومایپسوم",
  },
  {
    key: "4",
    SendCode: "12345678",
    time: "امروز",
    text: "لورم ایپسوم متنمتنمتنمتنمتنمتنمتنمتن ساختگی با تولید سادگی نامفهوم از صنعت ایپسومایپسومایپسومایپسومایپسومایپسومایپسومایپسومایپسومایپسوم",
  },
];

export const chartList: chartListType[] = [
  {
    lable: "عالی",
    percent: [20, 100],
    fill: "#FF5050",
  },
  {
    lable: "خوب",
    percent: [30, 100],
    fill: "#FD6E6E",
  },
  {
    lable: "متوسط",
    percent: [40, 100],
    fill: "#FF9C9C",
  },
  {
    lable: "ضعیف",
    percent: [0, 100],
    fill: "#FFB7B7",
  },
  {
    lable: "خیلی ضعیف",
    percent: [10, 100],
    fill: "#FFE3E3",
  },
];

const Dashboard = () => {
  // table dashbaord
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModals = useSelector(selectShowModals);

  const showModalHandler = (name: string) => {
    dispatch(appSlice.actions.setShowModals(name));
  };

  const showModalWelcomeHandler = () =>
    dispatch(appSlice.actions.setShowModals("showModalWelcome"));

  ///time dialog
  const [time, setTime] = React.useState(new Date());

  const options = { timeZone: "Asia/Tehran", hour12: false };
  const iranianTime = time.toLocaleTimeString("en-US", options);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const columns: CustomColumnType<any>[] = [
    {
      title: "شناسه ارسال",
      dataIndex: "SendCode",
      key: "SendCode",
      align: "center",
      searchProps: true,
    },
    {
      title: "تاریخ ارسال",
      dataIndex: "time",
      key: "time",
      align: "center",

      sorter: (a: DataType, b: DataType) => a.time.localeCompare(b.time),
    },
    {
      title: "متن پیام",
      dataIndex: "text",
      key: "text",
      ellipsis: true,

      searchProps: true,
      render: (text: string) => (
        <Popover className="" content={<div className="">{text}</div>}>
          <div className="flex justify-start">
            <span>{text.slice(0, 60)}</span>
            <span>...</span>
          </div>
        </Popover>
      ),
    },
  ];

  return (
    <>
      <div className="w-full p-10 sm-max:!py-2 sm-max:!px-5 xl-max:w-full h-full flex items-center justify-center flex-col gap-10 lg-max:gap-5">
        {/* -------- قرعه کشی -------- */}
        <section className="w-full flex flex-row lg-max:flex-col items-center gap-4">
          <div
            style={{
              backgroundImage: `url(${rectangle_dashbaord_mini_boxRight})`,
            }}
            className="w-full flex items-center h-16 py-3 px-6 md-max:mt-3 bg-cover rounded-lg hover:cursor-pointer bg-gray-50"
          >
            <Link
              className="w-full flex justify-between items-center"
              to="/store/AddAudience"
            >
              <h1 className="font-semibold text-2xl sm-max:text-sm inline">
                افزودن مخاطب
              </h1>
              <div className="font-normal text-sm sm-max:text-xs text-[#757575] inline">
                <FiUserPlus color="#FD6E6E" className="w-5 h-5" />
              </div>
            </Link>
          </div>
          <div
            style={{ backgroundImage: `url(${raffle})` }}
            className="w-full flex items-center h-16 py-3 px-6 md-max:mt-3 bg-cover rounded-lg hover:cursor-pointer bg-gray-50"
          >
            <Link
              className="w-full flex justify-between items-center"
              to="/store/lottery"
            >
              <h1 className="font-semibold text-2xl sm-max:text-sm inline">
                قرعه کشی
              </h1>
              <h2 className="font-normal text-sm sm-max:text-xs text-[#757575] inline">
                ورود به صفحۀ قرعه کشی ها
              </h2>
            </Link>
          </div>
        </section>
        {/* -------- باکس های سالگردو شارژ حساب شماره های ثبت شده -------- */}
        <section className="w-full grid grid-cols-3 lg-max:grid-cols-1 gap-4 items-center justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardCard
              HeaderCard={"تعداد شماره های ثبت شده"}
              LinkCard={""}
              OnClick={() => {}}
              UrlImage={rectangle_dashbaord_mini_box}
              classLink={"text-[#00503A]"}
              isLink={false}
            >
              <div className="flex flex-col">
                <div className="w-full flex flex-row gap-6 xl-max:gap-3">
                  <div className="2xl-max:!text-sm text-sm flex items-center font-light text-[#78909C] gap-2.5">
                    <span>امروز : </span>
                    <p
                      lang="fa"
                      role="text"
                      className="text-[#FD6E6E] text-2xl"
                    >
                      23
                    </p>
                  </div>
                  <div className="2xl-max:!text-sm text-sm flex items-center font-light text-[#78909C] gap-2.5">
                    <span>ماه قبل : </span>
                    <p
                      lang="fa"
                      role="text"
                      className="text-[#FD6E6E] text-2xl"
                    >
                      150
                    </p>
                  </div>
                </div>
                <div className="2xl-max:!text-sm text-sm flex items-center font-medium text-[#78909C] gap-2.5">
                  <span>تعداد کل مشتریان :</span>
                  <p lang="fa" role="text" className="text-[#FD6E6E] text-2xl">
                    500
                  </p>
                </div>
              </div>
            </DashboardCard>
            <DashboardCard
              HeaderCard={"موجودی فعلی حساب"}
              LinkCard={
                <div className="">
                  افزایش موجودی
                  <IconButton
                    aria-label="AddAudience"
                    className="rounded-lg h-6 w-6 mr-3 bg-secondary"
                  >
                    <FaPlus className="w-5 h-5 p-1" />
                  </IconButton>
                </div>
              }
              OnClick={() => showModalHandler("showModalChargeAccount")}
              UrlImage={rectangle_dashbaord_mini_box}
              classLink={"text-[#00503A]"}
              isLink={true}
            >
              <p lang="fa" role="text" className="text-[#FD6E6E]">
                256.000{" "}
              </p>
              <p
                lang="fa"
                role="text"
                className="text-sm font-light -mr-2 text-[#78909C]"
              >
                ریال
              </p>
            </DashboardCard>
            <DashboardCard
              HeaderCard={"تعداد سالگرد های امروز"}
              LinkCard={"مشاهدۀ همۀ سالگرد ها"}
              OnClick={() => showModalHandler("showModalOrigin")}
              UrlImage={rectangle_dashbaord_mini_box}
              classLink={"text-[#00503A]"}
              isLink={true}
            >
              <p
                lang="fa"
                role="text"
                className="text-5xl font-medium text-[#FD6E6E]"
              >
                28
              </p>
            </DashboardCard>
          </Suspense>
        </section>
        {/* -------- پیامک های ارسالی -------- */}
        <section className="w-full flex flex-col gap-5">
          <div className="w-full h-16 rounded-lg bg-gray-50 flex p-3 justify-between items-center">
            <p
              lang="fa"
              role="text"
              className="font-medium text-lg sm-max:text-sm text-textColor"
            >
              پیامک های ارسالی
            </p>
            <Link to="/store/SendSms">
              <ButtonComponent
                children="مشاهدۀ همۀ پیام ها"
                ButtonClass="bg-secondary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              />
            </Link>
          </div>
          {/* -------- جدول -------- */}
          <div className="w-full mt-10">
            <CustomTable
              bordered
              size="large"
              columns={columns}
              dataSource={data}
              theme={"secondary"}
            />
          </div>
        </section>
        {/* -------- نظر سنجی -------- */}
        <section
          className="w-full py-6 px-8 bg-cover flex gap-28 xl-max:gap-16 lg-max:!gap-6 lg-max:flex-col items-center bg-gray-50 bg-right justify-around bg-no-repeat h-atuo rounded-lg"
          style={{
            backgroundImage: `url(${rectangle_dashbaord_mini_boxRight})`,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 lg-max:w-full lg-max:justify-between">
            <div className="flex flex-col gap-2 lg-max:w-full lg-max:items-start lg-max:justify-between">
              <Typography
                className="font-semibold sm-max:text-lg text-xl"
                variant="h3"
              >
                آخرین نظر سنجی:
              </Typography>
              <Typography
                className="font sm-max:text-xl font-semibold text-2xl"
                variant="h3"
              >
                نظر سنجی عید نوروز
              </Typography>
            </div>
            <div className="lg-max:w-full flex lg-max:items-end md-max:items-end sm-max:items-start flex-col">
              <Link to="/store/survey">
                <Typography
                  variant="small"
                  className="font-normal font text-base text-teal-900 "
                >
                  ورود به صفحۀ نظر سنجی ها
                </Typography>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center text-xs">
            <PercentagePieChart chartData={chartList} />
          </div>
        </section>
      </div>

      {/* دیالوگ سالگرد */}
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          modalClass="!min-w-[60%] lg-max:!min-w-[90%]"
          modalHeaderClass="flex flex-row justify-between -mb-2"
          modalHeader={
            <>
              <p
                lang="fa"
                role="text"
                className="font-bold text-xl md-max:text-sm"
              ></p>
              <div className="flex flex-row">
                <span className="font-normal text-base"> تاریخ و ساعت : </span>
                <span className="font-normal text-base">
                  {new Intl.DateTimeFormat("fa-IR").format()}
                </span>
                <span> - </span>
                <span className="font-normal text-base">{iranianTime}</span>
              </div>
            </>
          }
          modalBody={<DialogTable />}
          modalFooter={
            <ButtonComponent
              onClick={() => showModalHandler("showModalOrigin")}
              children="برگشت به داشبورد"
              ButtonClass="bg-secondary text-xs font-bold h-11 -mt-6 flex items-center justify-center"
            />
          }
          modalFooterClass="flex items-center justify-center"
          Open={showModals.showModalOrigin}
          HandleOpen={() => showModalHandler("showModalOrigin")}
        />
        <Modal
          modalClass="!min-w-[28%] sm-max:!min-w-[90%] mb-2 scroll-auto"
          modalHeaderClass="flex items-center mx-auto text-2xl font-medium"
          modalHeader={"خوش آمدید!"}
          modalBody={
            "جهت مشاهده و تکمیل اطلاعات خود می‌توانید به صفحه حساب کاربری خود مراجعه کنید"
          }
          modalFooterClass="flex justify-center items-center"
          modalFooter={
            <div className="w-full flex gap-4">
              <ButtonComponent
                onClick={() => navigate("/store/Account")}
                ButtonClass="w-full bg-white text-xs font-bold text-black h-10 flex items-center justify-center border border-[#2DCEA2]"
              >
                حساب کاربری
              </ButtonComponent>
              <ButtonComponent
                ButtonClass="bg-secondary text-white px-10"
                onClick={() => {
                  showModalWelcomeHandler();
                }}
              >
                <span>تایید</span>
              </ButtonComponent>
            </div>
          }
          Open={showModals.showModalWelcome}
          HandleOpen={showModalWelcomeHandler}
        />
      </Suspense>
    </>
  );
};

export default Dashboard;

// Types
interface DataType {
  key: React.Key;
  SendCode: string;
  time: string;
  text: string;
}

type DataIndex = keyof DataType;

export interface chartListType {
  lable: string;
  percent: [number, number];
  fill: string;
}
