import React from "react";
import { FaRegTrashAlt, FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { LuSend, LuCheckCircle, LuLayoutGrid, LuBarChart2 } from "react-icons/lu";
import edit from "../../../../../assets/svg/edit.svg";
import Modal from "../../../../../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../../components/Button";
import "../../../../../components/TableInputNote/TableInputNote.scss";
import CustomTable, { CustomColumnType } from "../../../../../components/Table";
import {
  useSelector,
  useDispatch,
  StoreManagementSlice,
  selectShowModalsStoreManagement,
  selectSmsSendingData,
  smsSendingDataType,
} from "../../../../../../lib/redux";
import LazyImage from "../../../../../components/LazyImage";
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Input = React.lazy(() => import("antd/es/input/index"));
const ArrowRightCircleIcon = React.lazy(() => import("@heroicons/react/24/outline/ArrowRightCircleIcon"));

const ViewStore: React.FC = () => {
  const navigate = useNavigate();
  const { idStore } = useParams();
  const dispatch = useDispatch();
  const showModals = useSelector(selectShowModalsStoreManagement);
  const showModalHandler = (name: string) =>
    dispatch(StoreManagementSlice.actions.setShowModal(name));
  const SmsSendingDataTable = useSelector(selectSmsSendingData);
  const columns_SmsSending: CustomColumnType<smsSendingDataType>[] = [
    {
      title: "شناسه ارسال",
      dataIndex: "idSend",
      key: "idSend",
      searchProps: true,
      align: "center",
    },
    {
      title: "ارسال با..",
      align: "center",
      dataIndex: "sendMethod",
      filters: [
        {
          text: "شماره",
          value: "شماره",
        },
        {
          text: "فایل",
          value: "فایل",
        },
        {
          text: "گروه",
          value: "گروه",
        },
        {
          text: "انتخاب منطقه",
          value: "انتخاب منطقه",
        },
        {
          text: "کد پستی",
          value: "کد پستی",
        },
        {
          text: "پیام مناسبتی",
          value: "پیام مناسبتی",
        },
      ],
      onFilter: (value: boolean | React.Key, record: smsSendingDataType) =>
        record.sendMethod.includes(value as string),
      render: (kind: string) => <Tag>{kind}</Tag>,
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      align: "right",
      filters: [
        {
          text: "منتظر تایید اپراتور",
          value: "منتظر تایید اپراتور",
        },
        {
          text: "تایید شده در صف ارسال",
          value: "تایید شده در صف ارسال",
        },
        {
          text: "ارسال شده در انتظار گزارش",
          value: "ارسال شده در انتظار گزارش",
        },
        {
          text: "پایان یافته",
          value: "پایان یافته",
        },
        {
          text: "نیاز به ویرایش متن",
          value: "نیاز به ویرایش متن",
        },
      ],
      onFilter: (value: React.Key | boolean, record: smsSendingDataType) =>
        record.condition === value,
      render: (condition: string) => (
        <span>
          {[condition].map((tag) => {
            let color: string;
            if (tag === "منتظر تایید اپراتور") {
              color = "blue";
            } else if (tag === "تایید شده در صف ارسال") {
              color = "orange";
            } else if (tag === "ارسال شده در انتظار گزارش") {
              color = "green";
            } else if (tag === "پایان یافته") {
              color = "grey";
            } else if (tag === "نیاز به ویرایش متن") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row-reverse justify-end items-baseline"
              >
                {tag}
                <Badge
                  className="ml-1 mt-1"
                  size="default"
                  color={color}
                ></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
    {
      title: "تاریخ ارسال",
      dataIndex: "dateSend",
      key: "dateSend",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.dateSend.localeCompare(b.dateSend),
    },
  ];

  return (
    <div className="container flex flex-col items-center justify-center md-max:justify-center p-10 sm-max:p-5 sm-max:gap-2 gap-10">
      <section className="container flex sm-max:flex-col rounded-lg items-center justify-between p-3 bg-gray-50 ">
        <div className="container flex flex-row sm-max:justify-around items-center p-3">
          <div className="w-28 h-28 bg-[#424242] ml-3 rounded-md"></div>
          <div className="flex justify-around h-32 flex-col items-start">
            <p
              lang="fa"
              role="text"
              className="text-2xl xl-max:text-xl sm-max:text-base font-bold text-textColor flex justify-center items-center sm-max:flex-row"
            >
              نام فروشگاه
              <Tag color="#FB8C00" className="mr-1">
                فروشگاه تأیید نشده
              </Tag>
            </p>
            <p
              lang="fa"
              role="text"
              className="text-md mt-1 font-normal text-textColor"
            >
              نام مالک فروشگاه
            </p>
            <Button
              onClick={() => showModalHandler("storeInformation")}
              type="link"
              className="p-0 !text-[#0081E8] font-bold text-sm"
            >
              نمایش اطلاعات فروشگاه
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm-max:mt-4 px-3 sm-max:flex-row">
          <ButtonComponent
            Type="submit"
            onClick={() => {}}
            ButtonClass="!w-[140px] sm-max:!w-[120px] !h-[38px] sm-max:ml-3 border-[#4CAF50] border-[1px] bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center gap-2"
          >
            <LuCheckCircle color="#4CAF50" />
            <span className="text-black text-[12px] sm-max:text-[10px] font-bold">
              غیر فعال کردن کاربر
            </span>
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {}}
            ButtonClass="!w-[140px] sm-max:!w-[120px] !h-[38px] sm-max:mt-0 mt-3 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#E53935] gap-2"
          >
            <FaRegTrashAlt color="#FFFFFF" />
            <span className="text-[12px] font-bold">حذف فروشگاه</span>
          </ButtonComponent>
        </div>
      </section>
      <section className="flex flex-row justify-between md-max:justify-center 2xl-max:flex-col w-full gap-5">
        <section className="container w-full flex-col md-min:justify-center flex-start items-start flex xl-max:flex-col rounded-lg md-max:items-center justify-between gap-10">
          <div className="w-full  flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between container bg-gray-50 p-3 rounded-lg">
              <div className="flex my-1 gap-4 text-lg font-medium sm-max:text-sm text-textColor sm-max:flex-col 3xl-max:flex-row">
                <p lang="fa" role="text" className="w-max">
                  اطلاعات فروشگاه{" "}
                </p>
                <Tag
                  color="#2196F3"
                  className="flex items-center justify-center text-center w-max text-xs font-bold "
                >
                  تاریخ عضویت: ‘12:21 - 1401/01/01
                </Tag>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between container p-2 gap-y-2 bg-white border-[#ECEFF1] border-2 rounded-md">
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    نام فروشگاه : <span className="font-bold">محمد رضا</span>
                  </p>
                  <button
                    className="flex float-left"
                    onClick={() => showModalHandler("storeInformation")}
                  >
                    <div className="w-4 h-4"><LazyImage src={edit} alt="edit" width={16} height={16} /></div>
                    <span className="text-blue-gray-600 mr-2 font-normal text-sm">
                      ویرایش مشخصات
                    </span>
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    آدرس : <span className="font-bold">سلطانی</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    کد پستی : <span className="font-bold">0123456789</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    شماره تلفن : <span className="font-bold">09121141516</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    صنف : <span className="font-bold">09121141516</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    لوگوی فروشگاه :{" "}
                    <button
                      className="flex float-left flex-row-reverse mr-2"
                      onClick={() => showModalHandler("storeInformation")}
                    >
                      <div className="w-4 h-4"><LazyImage src={edit} alt="edit" width={16} height={16} /></div>
                      <span className="!text-[#0081E8] font-bold ml-2 text-sm">
                        مشاهده
                      </span>
                    </button>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    فایل تبلیغاتی :{" "}
                    <button
                      className="flex flex-row-reverse float-left mr-2"
                      onClick={() => showModalHandler("storeInformation")}
                    >
                      <div className="w-4 h-4"><LazyImage src={edit} alt="edit" width={16} height={16} /></div>
                      <span className="!text-[#0081E8] font-bold ml-2  text-sm">
                        مشاهده
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" flex-col w-full flex items-end sm-max:flex-col gap-4">
          <div className="w-full xl-max:container flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between container bg-gray-50 p-3 rounded-lg ">
              <div className="flex gap-4 text-lg font-medium sm-max:text-sm text-textColor 2xl-max:flex-col 3xl-max:flex-row">
                <p lang="fa" role="text" className="w-max">
                  تاریخچۀ ارسال پیامک
                </p>
                <Tag
                  color="#2196F3"
                  className="flex items-center justify-center text-center w-max text-xs font-bold lg-max:hidden"
                >
                  آخرین ارسال: ‘12:21 - 1401/01/01{" "}
                </Tag>
              </div>
              <div className="flex justify-center flex-row-reverse items-center">
                <ButtonComponent
                  size="sm"
                  onClick={() => navigate("/admin/SmsSendingPanel")}
                  ButtonClass="bg-primary w-max text-xs font-bold sm-max:p-3 h-9 flex justify-center items-center"
                >
                  نمایش همه
                </ButtonComponent>
              </div>
            </div>
            <div className="container rounded-lg">
              <CustomTable
                size="large"
                pagination={false}
                className="p-0 "
                dataSource={SmsSendingDataTable}
                columns={columns_SmsSending}
                theme="primary"
              />
            </div>
          </div>
        </section>
      </section>
      <section className="container sm-max:items-center flex md-max:flex-col justify-between items-start gap-5">
        <div className="w-full  md-max:mb-3 md-max:ml-0 p-4 rounded-lg bg-gray-50 flex flex-col">
          <p
            lang="fa"
            role="text"
            className="text-lg font-medium py-4 px-2 md-max:px-0"
          >
            اعتبار فعلی فروشگاه
          </p>
          <div className="flex flex-row-reverse  items-center justify-around sm-max:flex-col">
            <FaMinus
              color="#424242"
              className="cursor-pointer"
              onClick={() => showModalHandler("decreaseValue")}
            />
            <Input
              name={""}
              className={
                "outline-0 bg-white text-center h-10 border md-max: sm-max:order-first  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 py-1 pr-4 p-1 mb-0 md-max:mb-2 md-max:mr-0 mx-2"
              }
              placeholder={"50.000 تومان"}
              disabled={false}
            />
            <FaPlus
              color="#424242"
              className="cursor-pointer"
              onClick={() => showModalHandler("increaseValue")}
            />
          </div>
        </div>
        <div className="w-full  md-max:mb-3 md-max:ml-0  p-4 rounded-lg bg-gray-50 flex flex-col">
          <p
            lang="fa"
            role="text"
            className="text-lg lg-max:text-base md-max:!text-lg font-medium py-4 px-2 md-max:px-0"
          >
            شماره اختصاصی
          </p>
          <div className="flex  flex-row-reverse items-center justify-center">
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 mr-2"
              }
              placeholder={"09393273968"}
            />
            <ButtonComponent
              onClick={() => {}}
              ButtonClass="lg-max:!w-8/12 !w-6/12 !h-[38px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#43A047] gap-2 md-max:w-[200px] mb-0  md-max:ml-2 ml-2"
            >
              <span className="text-[12px] font-bold">ثبت</span>
            </ButtonComponent>
          </div>
        </div>
        <div className="w-full  md-max:mb-3 md-max:ml-0  p-4 rounded-lg bg-gray-50 flex flex-col">
          <p
            lang="fa"
            role="text"
            className="text-lg lg-max:text-base md-max:!text-lg font-medium py-4 px-2 md-max:px-0"
          >
            تعرفۀ کاربر (معیار محاسبۀ قیمت پیامک)
          </p>
          <div className="flex  flex-row-reverse items-center justify-center">
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white text-center h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 mr-2"
              }
              placeholder={"555 تومان"}
            />
            <ButtonComponent
              onClick={() => {}}
              ButtonClass="lg-max:!w-8/12 !w-6/12 !h-[38px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#43A047] gap-2 md-max:w-[200px] mb-0  md-max:ml-2 ml-2"
            >
              <span className="text-[12px] font-bold">اعمال تعرفه</span>
              <FaCheck />
            </ButtonComponent>
          </div>
        </div>
      </section>

      <section className="container flex sm-max:flex-col gap-4">
        <div className="flex flex-row w-3/4 sm-max:w-full md-max:justify-between">
          <ButtonComponent
            onClick={() =>
              navigate(
                `/admin/UserManagment/ViewListOfFinancialReport/${idStore}`
              )
            }
            ButtonClass="w-2/4  !mr-0  sm-max:!w-full !h-[50px] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
          >
            <LuBarChart2 color="#FFFFFF" size={16} />
            <span className="text-base md-max:text-sm font-bold scroll-auto">
              گزارشات مالی
            </span>
          </ButtonComponent>
          <ButtonComponent
            onClick={() =>
              navigate(`/admin/UserManagment/ViewSendReport/${idStore}`)
            }
            ButtonClass="w-2/4 sm-max:!mr-2 !mr-2  sm-max:!w-full sm-max:mr-0 !h-[50px] mr-2 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
          >
            <LuSend color="#FFFFFF" size={16} />
            <span className="text-base md-max:text-sm font-bold">
              گزارشات ارسال
            </span>
          </ButtonComponent>
        </div>
        <ButtonComponent
          onClick={() => {}}
          ButtonClass="w-1/2 !mr-0 md-max:w-1/3 sm-max:!w-full sm-max:mr-0 !h-[50px] mr-2 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
        >
          <LuLayoutGrid color="#FFFFFF" size={16} />
          <span className="text-base font-bold md-max:text-xs sm-max:!text-base">
            ورود به پنل فروشگاه
          </span>
        </ButtonComponent>
      </section>
      <Modal
        modalClass="!min-w-[25%] sm-max:!min-w-[80%]"
        modalHeader={"افزایش اعتبار"}
        modalHeaderClass=" mb-1 pb-0"
        modalBody={
          <div>
            <p
              lang="fa"
              role="text"
              className="text-blue-gray-600 text-base font-normal mb-2 -mt-3"
            >
              میزان افزایش اعتبار حساب فروشگاه را وارد کنید{" "}
            </p>
            <Input
              disabled={false}
              name={""}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"میزان افزایش"}
            />
          </div>
        }
        modalFooterClass="flex justify-between items-center -mt-3"
        modalFooter={
          <div className="w-full flex justify-center">
            <ButtonComponent
              onClick={() => showModalHandler("increaseValue")}
              children="تایید"
              ButtonClass="bg-primary w-full text-xs font-bold h-11 flex items-center justify-center"
            />
          </div>
        }
        Open={showModals.increaseValue}
        HandleOpen={() => showModalHandler("increaseValue")}
      />
      <Modal
        modalClass="!min-w-[25%] sm-max:!min-w-[80%]"
        modalHeader={"کاهش اعتبار"}
        modalHeaderClass=" mb-1 pb-0"
        modalBody={
          <div>
            <p
              lang="fa"
              role="text"
              className="text-blue-gray-600 text-base font-normal mb-2 -mt-3"
            >
              میزان کاهش اعتبار حساب فروشگاه را وارد کنید{" "}
            </p>
            <Input
              disabled={false}
              name={""}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"میزان کاهش"}
            />
          </div>
        }
        modalFooterClass="flex justify-between items-center -mt-3"
        modalFooter={
          <div className="w-full flex justify-center">
            <ButtonComponent
              onClick={() => showModalHandler("decreaseValue")}
              children="تایید"
              ButtonClass="bg-primary w-full text-xs font-bold h-11 flex items-center justify-center"
            />
          </div>
        }
        Open={showModals.decreaseValue}
        HandleOpen={() => showModalHandler("decreaseValue")}
      />
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[80%] mb-2  scroll-auto"
        modalHeader={"اطلاعات فروشگاه"}
        modalHeaderClass="mt-2"
        modalBody={
          <div className="space-y-3 overflow-x-hidden">
            <Input
              // disabled={true}
              name={""}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"نام فروشگاه"}
            />
            <Input
              // disabled={true}
              name={"آدرس"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"آدرس"}
            />
            <Input
              // disabled={true}
              name={"کد پستی"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"کد پستی"}
            />
            <Input
              // disabled={true}
              name={"شماره تماس"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"شماره تماس"}
            />
            <Input
              // disabled={true}
              name={"صنف"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"صنف"}
            />
            <ButtonComponent
              disabled={false}
              ButtonClass="bg-primary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              onClick={() => showModalHandler("storeInformation")}
            >
              ثبت تغییرات
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={() => showModalHandler("storeInformation")}
              // onClick={goback}
              type="link"
              className="flex items-center justify-center mx-auto"
              icon={
                <ArrowRightCircleIcon
                  color="#E53935"
                  strokeWidth={2.5}
                  className={"h-3.5 w-3.5 mx-auto"}
                />
              }
            >
              <span className="text-sm text-textColor font-medium ">
                برگشت به نمایش کاربر
              </span>
            </Button>
          </div>
        }
        Open={showModals.storeInformation}
        HandleOpen={() => showModalHandler("storeInformation")}
      />
    </div>
  );
};

export default ViewStore;

// Types
// interface DataType {
//   key: React.Key;
//   date: string;
//   hour: string;
// }
