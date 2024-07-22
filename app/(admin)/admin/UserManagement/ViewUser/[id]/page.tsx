import React from "react";
import { LuLayoutGrid } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import edit from "../../../../../assets/svg/edit.svg";
import { FaRegCircleXmark } from "react-icons/fa6";
import Modal from "../../../../../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import "../../../../../components/TableInputNote/TableInputNote.scss";
import CustomTable, { CustomColumnType } from "../../../../../components/Table";
import {
  useSelector,
  useDispatch,
  appSlice,
  selectAuthenticationData,
  selectUserEnteryData,
  AuthenticationData,
  ticketsDataType,
  selectTicketsDataUserManagement,
  UserManagementSlice,
  selectShowModalsUserManagement,
  selectFileUserManagement,
} from "./../../../../../../lib/redux";
import {
  HiOutlineCloudUpload,
} from "react-icons/hi";
import message from "antd/es/message/index";
import Dragger from "antd/lib/upload/Dragger";
import ButtonComponent from "../../../../../components/Button";
import { maxFileSize } from "../../../../../(users)/users/Authentication/page";
import LazyImage from "../../../../../components/LazyImage";
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const Input = React.lazy(() => import("antd/es/input/index"));

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const { idUser } = useParams();
  const dispatch = useDispatch();
  const showModals = useSelector(selectShowModalsUserManagement);
  const showModalHandler = (name: string) =>
    dispatch(UserManagementSlice.actions.setShowModal(name));
  const AuthenticationInfromationTable = useSelector(selectAuthenticationData);
  const userEnteryData = useSelector(selectUserEnteryData);
  const ticketsData = useSelector(selectTicketsDataUserManagement);

  const columns_UsersEntery: CustomColumnType<DataType>[] = [
    {
      title: "ردیف",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "0",
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "ساعت",
      dataIndex: "hour",
      align: "center",
      key: "hour",
    },
  ];

  const columns_Autentication: CustomColumnType<AuthenticationData>[] = [
    {
      title: "عنوان",
      dataIndex: "title",
      // align: "center",
      key: "title",
    },
    {
      title: "جزئیات",
      dataIndex: "details",
      // align: "center",
      key: "details",
    },
    {
      title: "ویرایش",
      align: "center",
      dataIndex: "key",
      key: "key",
      render: (index: number) => {
        if (index === 1) {
          return (
            <Button
              className="p-0"
              type="link"
              onClick={() => showModalHandler("CardUser")}
            >
              ویرایش
            </Button>
          );
        } else if (index === 2) {
          return (
            <Button
              className="p-0"
              type="link"
              onClick={() => showModalHandler("DrrageModal")}
            >
              ویرایش
            </Button>
          );
        } else {
          return (
            <Button
              className="p-0"
              type="link"
              onClick={() => showModalHandler("birthdayUser")}
            >
              ویرایش
            </Button>
          );
        }
      },
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      key: "condition",
      align: "center",
      // filters: [
      //   {
      //     text: "در انتظار تایید",
      //     value: "در انتظار تایید",
      //   },
      //   {
      //     text: "تایید شده",
      //     value: "تایید شده",
      //   },
      //   {
      //     text: "عدم تایید",
      //     value: "عدم تایید",
      //   },
      // ],
      // onFilter: (value: React.Key | boolean, record: AuthenticationData) =>
      //   record.condition.includes(value as string),
      render: (Auth: string) => (
        <span>
          {[Auth].map((tag) => {
            let color: string;
            if (tag === "در انتظار تایید") {
              color = "blue";
            } else if (tag === "تایید شده") {
              color = "green";
            } else if (tag === "عدم تایید") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row-reverse justify-center items-baseline"
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
      title: "تأیید مدرک",
      dataIndex: "evidenceCinfrim",
      key: "evidenceCinfrim",
      // align: "center",
      // filters: [
      //   {
      //     text: "تایید",
      //     value: "تایید",
      //   },
      //   {
      //     text: "عدم تایید",
      //     value: "عدم تایید",
      //   },
      // ],
      // onFilter: (value: React.Key | boolean, record: AuthenticationData) =>
      //   record.evidenceCinfrim.includes(value as string),
      render: (Auth: string) => (
        <span>
          {[Auth].map((tag) => {
            let color: string;
            if (tag === "تایید") {
              color = "green";
            } else if (tag === "عدم تایید") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row-reverse justify-center items-baseline"
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
  ];

  const columns_ticket: CustomColumnType<ticketsDataType>[] = [
    {
      title: "کد شناسه",
      dataIndex: "recognizecode",
      key: "recognizecode",
      align: "center",
      searchProps: true,
      render: (tags: string) => (
        <Tag
          key={tags}
          color="#1890FF"
          className="font-normal mx-auto rounded-lg text-xs text-[#FFFFFF]"
        >
          {tags}
        </Tag>
      ),
    },
    {
      title: "تاریخ آخرین پیام",
      dataIndex: "date",
      key: "date",
      align: "center",

      searchProps: true,
      sorter: (a: ticketsDataType, b: ticketsDataType) =>
        -a.date.localeCompare(b.date),
    },

    {
      title: "دپارتمان",
      dataIndex: "department",
      key: "department",

      align: "center",
      filters: [
        {
          text: "مالی",
          value: "مالی",
        },
        {
          text: "مدیریت",
          value: "مدیریت",
        },
        {
          text: "ارسال پیامک",
          value: "ارسال پیامک",
        },
        {
          text: "فنی",
          value: "فنی",
        },
        {
          text: "پشتیبانی",
          value: "پشتیبانی",
        },
        {
          text: "طراحی و تولید",
          value: "طراحی و تولید",
        },
      ],
      onFilter: (value: React.Key | boolean, record: ticketsDataType) =>
        record.department === value,
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      align: "center",

      filters: [
        {
          text: "در انتظار پاسخ",
          value: "در انتظار پاسخ",
        },
        {
          text: "پاسخ داده شده",
          value: "پاسخ داده شده",
        },
        {
          text: "پاسخ داده شده در حال بررسی",
          value: "پاسخ داده شده در حال بررسی",
        },
        {
          text: "در حال بررسی",
          value: "در حال بررسی",
        },
        {
          text: "ارجاع به واحد مربوطه",
          value: "ارجاع به واحد مربوطه",
        },
        {
          text: "بسته شد",
          value: "بسته شد",
        },
      ],
      onFilter: (value: React.Key | boolean, record: ticketsDataType) =>
        record.condition === value,
      render: (Condition: string) => (
        <span>
          {[Condition].map((tag) => {
            let color: string;
            if (tag === "پاسخ داده شده و در حال بررسی") {
              color = "blue";
            } else if (tag === "در انتظار پاسخ") {
              color = "orange";
            } else if (tag === "پاسخ داده شده") {
              color = "green";
            } else if (tag === "ارجاع به واحد مربوطه") {
              color = "#FF4D4F";
            } else if (tag === "در حال بررسی") {
              color = "#FADB14";
            } else if (tag === "بسته شده") {
              color = "#D9D9D9";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
                key={tag}
                className="flex flex-row justify-center items-baseline"
              >
                {tag}
                <Badge className="mr-1" size="default" color={color}></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
  ];
  const File = useSelector(selectFileUserManagement);

  return (
    <div className="w-full flex flex-col items-center justify-center md-max:justify-center p-10 sm-max:p-5 sm-max:gap-2 gap-10">
      <section className="w-full flex sm-max:flex-col rounded-lg items-center justify-between p-3 bg-gray-50 ">
        <div className="w-full flex flex-row sm-max:justify-around items-center p-3">
          <div className="flex justify-around h-28 flex-col items-start">
            <p
              lang="fa"
              role="text"
              className="text-2xl xl-max:text-xl sm-max:text-base font-bold text-textColor flex justify-center items-center sm-max:flex-row"
            >
              نام و نام خانوادگی کاربر
              <Tag color="#43A047" className="mr-2 rounded-md">
                کاربر احراز شده
              </Tag>
            </p>
            <div className="flex">
              <p
                lang="fa"
                role="text"
                className="text-xl mt-1 font-normal text-blue-gray-600"
              >
                نام فروشگاه:
              </p>
              <p
                lang="fa"
                role="text"
                className="text-xl mt-1 mr-2 font-normal text-[#151515]"
              >
                فروشگاه سلطانی
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm-max:mt-4 px-3 sm-max:flex-row">
          <ButtonComponent
            Type="submit"
            onClick={() => {}}
            ButtonClass="!w-[140px] sm-max:!w-[120px] !h-[38px] sm-max:ml-3 border-[#EF6C00] border-[1px] bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-center items-center gap-2"
          >
            <FaRegCircleXmark color="#EF6C00" />
            <span className="text-black text-[11px] sm-max:text-[10px] font-bold">
              حذف احراز هویت کاربر
            </span>
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {}}
            ButtonClass="!w-[140px] sm-max:!w-[120px] !h-[38px] sm-max:mt-0 mt-3 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-[#E53935] gap-2"
          >
            <FaRegTrashAlt color="#FFFFFF" />
            <span className="text-[12px] font-bold">حذف کاربر</span>
          </ButtonComponent>
        </div>
      </section>
      <section className="flex flex-row justify-between lg-max:justify-center 2xl-max:flex-col w-full gap-5">
        <section className="w-full flex-col md-min:justify-center flex-start items-start flex xl-max:flex-col rounded-lg md-max:items-center justify-between gap-10">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between w-full bg-gray-50 p-3 rounded-lg ">
              <div className="flex my-1 gap-4 text-lg font-medium sm-max:text-sm text-textColor xs-max:flex-col 3xl-max:flex-row">
                <p lang="fa" role="text" className="w-max">
                  اطلاعات احراز هویت
                </p>
                <Tag
                  color="#2196F3"
                  className="flex items-center justify-center text-center w-max text-xs font-bold xs-max:hidden"
                >
                  آخرین ارسال: ‘12:21 - 1401/01/01
                </Tag>
              </div>
            </div>
            <div className="w-full rounded-lg">
              <CustomTable
                size="large"
                pagination={false}
                className="p-0 "
                dataSource={AuthenticationInfromationTable}
                columns={columns_Autentication}
                theme="primary"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between w-full bg-gray-50 p-3 rounded-lg">
              <div className="flex my-1 gap-4 text-lg font-medium sm-max:text-sm text-textColor xs-max:flex-col 3xl-max:flex-row">
                <p lang="fa" role="text" className="w-max">
                  مشخصات کاربر
                </p>
                <Tag
                  color="#2196F3"
                  className="flex items-center justify-center text-center w-max text-xs font-bold xs-max:hidden"
                >
                  تاریخ عضویت: ‘12:21 - 1401/01/01
                </Tag>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full p-3 bg-white border-[#ECEFF1] border-2 rounded-md">
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    نام : <span className="font-bold">محمد رضا</span>
                  </p>
                  <button
                    className="flex float-left"
                    onClick={() => showModalHandler("InformationUser")}
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
                    نام خانوادگی : <span className="font-bold">سلطانی</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    کد ملی : <span className="font-bold">0123456789</span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row p-1 justify-between w-full">
                  <p className="text-blue-gray-600 text-base font-normal">
                    شماره تماس : <span className="font-bold">09121141516</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between w-full bg-gray-50 p-3 rounded-lg">
              <div className="flex my-1 gap-4 text-lg font-medium sm-max:text-sm text-textColor xs-max:flex-col 3xl-max:flex-row">
                <p lang="fa" role="text" className="w-max">
                  تاریخچۀ ورود و فعالیت
                </p>
                <Tag
                  color="#2196F3"
                  className="flex items-center justify-center text-center w-max text-xs font-bold xs-max:hidden"
                >
                  آخرین لاگین: ‘12:21 - 1401/01/01
                </Tag>
              </div>
              <div className="flex justify-center flex-row-reverse items-center">
                <ButtonComponent
                  size="sm"
                  onClick={() => showModalHandler("entryHistory")}
                  ButtonClass="bg-primary w-max text-xs font-bold sm-max:p-3 h-9 flex justify-center items-center"
                >
                  نمایش همه
                </ButtonComponent>
              </div>
            </div>
          </div>
        </section>
        <section className=" flex-col w-full flex items-end sm-max:flex-col gap-4">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-between w-full bg-gray-50 p-3 rounded-lg ">
              <div className="flex my-1 gap-4 text-lg font-medium sm-max:text-sm text-textColor xs-max:flex-col 3xl-max:flex-row">
                <p lang="fa" role="text" className="w-max">
                  آخرین تیکت‌ها
                </p>
              </div>
              <div className="flex justify-center flex-row-reverse items-center">
                <ButtonComponent
                  size="sm"
                  onClick={() => navigate("/admin/Tickets")}
                  ButtonClass="bg-primary w-max text-xs font-bold sm-max:p-3 h-9 flex justify-center items-center"
                >
                  نمایش همه
                </ButtonComponent>
              </div>
            </div>
            <div className="w-full rounded-lg">
              <CustomTable
                size="large"
                pagination={false}
                className="p-0 "
                dataSource={ticketsData}
                columns={columns_ticket}
                theme="primary"
              />
            </div>
          </div>
          <ButtonComponent
            onClick={() => {}}
            ButtonClass="w-full md-max:w-1/3 sm-max:!w-full sm-max:mr-0 !h-[50px] mr-2 text-xs font-bold px-2.5 py-1.5 flex justify-center items-center bg-primary gap-2"
          >
            <LuLayoutGrid color="#FFFFFF" size={16} />
            <span className="text-base font-bold md-max:text-xs sm-max:!text-base">
              ورود به پنل فروشگاه
            </span>
          </ButtonComponent>
        </section>
      </section>
      <Modal
        modalClass="!min-w-[50%]"
        modalHeader={
          <div className="flex justify-between w-full">
            <p>تاریخچۀ ورود و فعالیت</p>
            <div>
              <span className="text-[#424242] text-base font-normal">
                آخرین لاگین :{" "}
              </span>
              <span className="text-[#151515] text-base font-normal">
                12:21’ 1 فروردین 1400
              </span>
            </div>
          </div>
        }
        modalHeaderClass="pb-0 pt-6"
        modalBodyClass="py-6"
        modalBody={
          <div className="w-full">
            <CustomTable
              size="large"
              bordered
              dataSource={userEnteryData}
              columns={columns_UsersEntery}
              theme="primary"
            />
          </div>
        }
        modalFooterClass="flex justify-between items-center pt-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={() => showModalHandler("entryHistory")}
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
              <span className="text-sm text-textColor font-medium ">برگشت</span>
            </Button>
          </div>
        }
        Open={showModals.entryHistory}
        HandleOpen={() => showModalHandler("entryHistory")}
      />
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%] mb-2  scroll-auto"
        modalHeader={"مشخصات کاربر"}
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
              placeholder={"نام"}
            />
            <Input
              // disabled={true}
              name={"نام خانوادگی"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"نام خانوادگی"}
            />
            <Input
              // disabled={true}
              name={"کد ملی"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"کد ملی"}
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
            <ButtonComponent
              disabled={false}
              ButtonClass="bg-primary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              onClick={() => showModalHandler("InformationUser")}
            >
              ثبت تغییرات
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={() => showModalHandler("InformationUser")}
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
        Open={showModals.InformationUser}
        HandleOpen={() => showModalHandler("InformationUser")}
      />
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%] mb-2  scroll-auto"
        modalHeader={"شماره کارت بانکی کاربر"}
        modalHeaderClass="mt-2"
        modalBody={
          <div className="space-y-3 overflow-x-hidden">
            <Input
              // disabled={true}
              name={"شماره کارت بانکی"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"شماره کارت بانکی"}
            />
            <ButtonComponent
              disabled={false}
              ButtonClass="bg-primary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              onClick={() => showModalHandler("CardUser")}
            >
              ثبت
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={() => showModalHandler("CardUser")}
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
        Open={showModals.CardUser}
        HandleOpen={() => showModalHandler("CardUser")}
      />
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%] mb-2  scroll-auto"
        modalHeader={"تاریخ تولد کاربر"}
        modalHeaderClass="mt-2"
        modalBody={
          <div className="space-y-3 overflow-x-hidden">
            <Input
              // disabled={true}
              name={"تاریخ تولد"}
              // InputValue={input[0]}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4 p-1"
              }
              placeholder={"تاریخ تولد"}
            />
            <ButtonComponent
              disabled={false}
              ButtonClass="bg-primary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              onClick={() => showModalHandler("birthdayUser")}
            >
              ثبت
            </ButtonComponent>
          </div>
        }
        modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={() => showModalHandler("birthdayUser")}
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
        Open={showModals.birthdayUser}
        HandleOpen={() => showModalHandler("birthdayUser")}
      />
      <Modal
        modalClass="!min-w-[50%] sm-max:!min-w-[90%] mb-2  scroll-auto"
        modalHeader={""}
        modalHeaderClass="mt-2"
        modalBody={
          <Dragger
            fileList={File}
            multiple={false}
            maxCount={1}
            beforeUpload={(file) => {
              const fileType = file.type;
              if (!fileType.startsWith("image/")) {
                // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                message.error("شما فقط میتوانید عکس بارگذاری نمایید!");
                return false;
              } else if (file.size > maxFileSize) {
                // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                message.error("حداکثر حجم مجاز 5 مگابایت می باشد.");
                return false;
              } else if (file && Array.isArray(file) && file.length > 1) {
                // dispatch(loginSlice.actions.setDefaultOwnerNationalCard());
                message.error("شما مجاز به بارگذاری فقط یک فایل هستید");
                return false;
              }
              // setFieldValue("national_card", file);
              showModalHandler("DrrageModal");
              message.success(`فایل ${file.name} با موفقیت بارگذاری شد.`);
              return false;
            }}
            onChange={(info) => {
              const fileList = [...info.fileList];
              // if (national_card.length !== 0) {
              //   dispatch(loginSlice.actions.setNationalCard(fileList));
              // }
            }}
          >
            <div className="flex flex-col justify-center h-[250px]">
              <p
                lang="fa"
                role="text"
                className="ant-upload-drag-icon flex items-center justify-center"
              >
                <HiOutlineCloudUpload className="w-12 h-12 text-primary" />
              </p>
              <p lang="fa" role="text" className="ant-upload-text">
                برای انتخاب فایل تبلیغ، کلیک کنید یا آن‌را به اینجا بکشید
              </p>
              <p lang="fa" role="text" className="ant-upload-hint">
                فایل با نسبت ابعاد 5:1 فرمت gif، jpg، png یا webp و حجم نهایتاً
                3مگابایت
              </p>
            </div>
          </Dragger>
        }
        modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
        modalFooter={
          <div className="w-full flex justify-center">
            <Button
              onClick={() => showModalHandler("birthdayUser")}
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
        Open={showModals.DrrageModal}
        HandleOpen={() => showModalHandler("DrrageModal")}
      />
    </div>
  );
};

export default ViewUser;

// Types
interface DataType {
  key: React.Key;
  date: string;
  hour: string;
}
