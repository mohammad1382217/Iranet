import React, { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { Parag } from "../../../components/tools";
import Textarea from "../../../components/TextArea";
import SendFile from "../../../components/SendFile";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import SendToGroups from "../../../components/SendToGroups";
import DashboardCard from "../../../components/DashboardCard";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import ButtonMaterial from "@material-tailwind/react/components/Button/index";
import SendPostalCode from "../../../components/SendPostalCode";
import RegionAndCountry from "../../../components/RegionAndCountry";
import HeaderWithButton from "../../../components/HeaderWithButton";
import SendByNumberPhone from "../../../components/SendByNumberPhone";
import CustomTable, { CustomColumnType } from "../../../components/Table";
import rectangle_dashbaord_mini_box from "../../../assets/images/rectangle_dashbaord_mini_box.webp";
import {
  appSlice,
  groupsSlice,
  occasionalmessageSlice,
  selectedOccasionalMessageOpation,
  selectsendReportData,
  selectShowModals,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
import OccasionalMessage from "../../../components/occasinalMassage";
import { weekDays } from "../../../Register/page";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePicker, { DateObject } from "react-multi-date-picker";
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const Button = React.lazy(() => import( "antd/es/button/index"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));

const SendSms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModals = useSelector(selectShowModals);
  const tableData = useSelector(selectsendReportData);
  // const [idDetails, setIdDetails] = React.useState(1);

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "تاریخ و ساعت ارسال",
      dataIndex: "senddate",
      key: "senddate",
      align: "center",
      DateRangeProps: true,
      sorter: (a: DataType, b: DataType) =>
        a.senddate.localeCompare(b.senddate),
    },
    {
      title: "شناسه ارسال",
      dataIndex: "recognize_send_code",
      key: "recognize_send_code",
      align: "center",
      searchProps: true,
    },
    {
      title: "ارسال با ...",
      dataIndex: "sendBy",
      key: "sendBy",
      align: "center",
      searchProps: true,
      render: (sendBy: string) => (
        <Tag className="font-normal p-1 text-xs text-[#000000D9]">{sendBy}</Tag>
      ),
    },
    {
      title: "هزینۀ",
      dataIndex: "final_price",
      key: "final_price",
      align: "center",
      filters: [
        {
          text: "200,000",
          value: "200000",
        },
        {
          text: "400,000",
          value: "400000",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.final_price.startsWith(value as string),
      sorter: (a: DataType, b: DataType) =>
        a.final_price.localeCompare(b.final_price),
    },
    {
      title: "جزئیات",
      align: "center",
      dataIndex: "key",
      key: "key",
      render: (Key: number) => (
        <Button
          className="p-0"
          type="link"
          onClick={() => showModalHandler(Key)}
        >
          مشاهدۀ
        </Button>
      ),
    },
  ];

  const showModalsHandler = (name: string) =>
    dispatch(appSlice.actions.setShowModals(name));

  const showModalHandler = (key?: number) => {
    // setIdDetails(key!);
    dispatch(appSlice.actions.setShowModals("showModalInformation"));
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(groupsSlice.actions.settextmessage(e.target.value));
  };

  const handleSelectedItemsChange = (selectedItems: string) => {
    dispatch(appSlice.actions.setSelectedItems(selectedItems));
  };

  const goDashboard = () => {
    navigate("/store/Dashboard");
  };

  const handleDateChange = (date: DateObject | DateObject[] | null) => {
    if (date instanceof DateObject) {
      dispatch(
        occasionalmessageSlice.actions.setsenddata(
          date?.convert(persian, persian_fa).format().toString() ?? ""
        )
      );
    }
  };

  //select
  const selectedItems = useSelector(selectedOccasionalMessageOpation);

  return (
    <div className="flex flex-col gap-10 p-10">
      <section className="grid grid-cols-1 gap-6">
        <section className="w-full grid 4xl-max:grid-cols-2 md-max:!grid-cols-1 gap-6">
          <DashboardCard
    isLink={false}
            handleClick={() => showModalsHandler("showModalSendToGroup")}
            UrlImage={rectangle_dashbaord_mini_box}
            className="w-full flex items-center justify-center !pt-0 !h-24 cursor-pointer"
          >
            <p lang="fa" role="text" className="text-2xl xl-max:text-lg lg-max:text-base md-max:text-sm sm-max:!text-xs font-semibold -mr-2 text-textColor">
              ارسال به گروه
            </p>
          </DashboardCard>
          <DashboardCard
    isLink={false}
            handleClick={() =>
              showModalsHandler("showModalSendOccasionalMassage")
            }
            UrlImage={rectangle_dashbaord_mini_box}
            className="w-full flex items-center justify-center !pt-0 !h-24 cursor-pointer"
          >
            <p lang="fa" role="text" className="text-2xl xl-max:text-lg lg-max:text-base md-max:text-sm sm-max:!text-xs font-semibold -mr-2 text-textColor">
              پیام مناسبتی
            </p>
          </DashboardCard>
        </section>
        <section className="w-full grid 4xl-max:grid-cols-4 md-max:!grid-cols-2 sm-max:grid-cols-1 gap-6">
          <DashboardCard
    isLink={false}
            handleClick={() => showModalsHandler("showModalSendByNumber")}
            UrlImage={rectangle_dashbaord_mini_box}
            className="w-full flex items-center justify-center !pt-0 !h-24 cursor-pointer"
          >
            <p lang="fa" role="text" className="text-xl xl-max:text-sm lg-max:text-lg md-max:!text-sm sm-max:!text-base font-semibold -mr-2 text-textColor">
              ارسال با شماره
            </p>
          </DashboardCard>
          <DashboardCard
    isLink={false}
            handleClick={() => showModalsHandler("showModalSendByFile")}
            UrlImage={rectangle_dashbaord_mini_box}
            className="w-full flex items-center justify-center !pt-0 !h-24 cursor-pointer"
          >
            <p lang="fa" role="text" className="text-xl xl-max:text-sm lg-max:text-lg md-max:!text-sm sm-max:!text-base font-semibold -mr-2 text-textColor">
              ارسال با فایل
            </p>
          </DashboardCard>
          <DashboardCard
    isLink={false}
            handleClick={() => showModalsHandler("showModalSendByRegion")}
            UrlImage={rectangle_dashbaord_mini_box}
            className="w-full flex items-center justify-center !pt-0 !h-24 cursor-pointer"
          >
            <p lang="fa" role="text" className="text-xl xl-max:text-sm lg-max:text-lg md-max:!text-sm sm-max:!text-base font-semibold -mr-2 text-textColor">
              ارسال به شهر و منطقه
            </p>
          </DashboardCard>
          <DashboardCard
    isLink={false}
            handleClick={() => showModalsHandler("showModalSendByPostalCode")}
            UrlImage={rectangle_dashbaord_mini_box}
            className="w-full flex items-center justify-center !pt-0 !h-24 cursor-pointer"
          >
            <p lang="fa" role="text" className="text-xl xl-max:text-sm lg-max:text-lg md-max:!text-sm sm-max:!text-base font-semibold -mr-2 text-textColor">
              ارسال با کدپستی
            </p>
          </DashboardCard>
        </section>
      </section>
      <Modal
        modalClass="sm-max:!min-w-[90%] p-6"
        modalHeader={"ارسال به گروه"}
        modalHeaderClass="p-0"
        modalBody={<SendToGroups />}
        modalBodyClass="pt-4 px-0 pb-0"
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalSendToGroup}
        HandleOpen={() => showModalsHandler("showModalSendToGroup")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%] block"
        modalHeader={"ارسال پیام مناسبتی"}
        modalBodyClass="h-[70vh] overflow-y-auto pt-0"
        modalBody={<OccasionalMessage />}
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalSendOccasionalMassage}
        HandleOpen={() => showModalsHandler("showModalSendOccasionalMassage")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%]"
        modalHeader={"ارسال با شماره"}
        modalHeaderClass="px-6"
        modalBodyClass="p-6 pt-0"
        modalBody={<SendByNumberPhone />}
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalSendByNumber}
        HandleOpen={() => showModalsHandler("showModalSendByNumber")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%]"
        modalHeader={"ارسال با فایل"}
        modalBody={<SendFile />}
        modalBodyClass="p-6 pt-0"
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalSendByFile}
        HandleOpen={() => showModalsHandler("showModalSendByFile")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%]"
        modalHeader={"ارسال با شهر ومنطقه"}
        modalBody={<RegionAndCountry />}
        modalBodyClass="p-6 pt-0"
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalSendByRegion}
        HandleOpen={() => showModalsHandler("showModalSendByRegion")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%]"
        modalHeader={"ارسال با کدپستی"}
        modalBody={<SendPostalCode />}
        modalBodyClass="p-6 pt-0"
        modalFooter={<></>}
        modalFooterClass="flex justify-between items-center hidden"
        Open={showModals.showModalSendByPostalCode}
        HandleOpen={() => showModalsHandler("showModalSendByPostalCode")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%] !min-w-[30%]"
        modalHeader={"اطلاعات پیامک"}
        modalHeaderClass="px-8"
        modalBody={
          <div className="flex flex-col w-96 gap-8 px-4 sm-max:px-10">
            <div className="flex flex-col">
              <Textarea
                ShowCount={true}
                TextAreaClass="h-44 !py-2 !px-1"
                MaxLength={1000}
                // Value={InputTextMessage}
                onChange={handleChange}
                Placeholder="متن پیامک"
              />
              <div className="flex my-1.5">
                <Parag
                  Paragraph={"حداکثر 1000 کاراکتر"}
                  Pclass={"text-sm font-normal"}
                />
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-row">
                  <div className="flex items-center justify-start gap-2 w-1/2">
                    <Parag
                      Paragraph={"تعداد کاراکتر ها:"}
                      Pclass={"text-base font-normal sm-max:text-xs"}
                    />
                    <Tag color="#2196F3">123</Tag>
                  </div>
                  <div className="flex items-center justify-start gap-2 w-1/2">
                    <Parag
                      Paragraph={"تعداد پیامک:"}
                      Pclass={"text-base font-normal sm-max:text-xs"}
                    />
                    <Tag color="#2196F3">123</Tag>
                  </div>
                </div>
                <Input
                  type={"text"}
                  name={""}
                  className={
                    "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  }
                  placeholder="تعداد شماره ها"
                  disabled={false}
                />
                <Select
                  className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                  size="large"
                  value={
                    selectedItems === "" ? null : (selectedItems as string)
                  }
                  placeholder="نوع شمارۀ فرستنده"
                  defaultValue={selectedItems as string}
                  onChange={() => handleSelectedItemsChange}
                  style={{}}
                  options={[].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <div className="flex items-center justify-start gap-2 w-max">
                  <Parag
                    Paragraph={"هزینۀ ارسال پیامک:"}
                    Pclass={"text-base font-normal sm-max:text-xs"}
                  />
                  <Tag color="#2196F3">150.000 تومان</Tag>
                </div>
                <ButtonComponent
                  onClick={() => {
                    dispatch(
                      appSlice.actions.setShowModals("showModalSendReport")
                    );
                    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
                  }}
                  ButtonClass={
                    "bg-secondary w-full mx-auto mt-2 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                  }
                >
                  ثبت نهایی
                </ButtonComponent>
                <Button
                  onClick={goDashboard}
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
                  <span className="text-sm text-[#151515] font-medium ">
                    <span className="text-[#757575]">لغو عملیات و</span> برگشت
                    به داشبورد
                  </span>
                </Button>
              </div>
            </div>
          </div>
        }
        modalBodyClass="p-6 pt-0"
        modalFooterClass="flex justify-between items-center hidden"
        modalFooter={
          <>
            <ButtonMaterial
              variant="gradient"
              color="green"
              onClick={() => showModalsHandler("showModalSendReport")}
            >
              <span>تایید</span>
            </ButtonMaterial>
            <ButtonMaterial
              variant="text"
              color="red"
              onClick={() => showModalsHandler("showModalSendReport")}
              className="mr-1"
            >
              <span>لغو</span>
            </ButtonMaterial>
          </>
        }
        Open={showModals.showModalSendReport}
        HandleOpen={() => showModalsHandler("showModalSendReport")}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%] !min-w-[30%]"
        modalHeader={"جزئیات ارسال"}
        modalHeaderClass="mb-0"
        modalBody={
          <div className="flex flex-col gap-3">
            <DatePicker
        format="HH:mm:ss YYYY/MM/DD"
        // value={moment(date).format('HH:mm:ss jYYYY/jMM/jDD')}
              onChange={(date) => handleDateChange(date)}
              weekDays={weekDays}
              className="custom-calendar"
              calendar={persian}
              locale={persian_fa}
              inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
              placeholder=" تاریخ و ساعت ارسال"
              plugins={[<TimePicker position="bottom" />]}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"شناسه ارسال"}
            />
            <Input
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              placeholder="نوع شمارۀ فرستنده"
            />
            <div className="flex flex-row ">
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3">
                تعداد کاراکتر ها:
                <Tag color="#2196F3" className="mr-3 rounded-lg ">
                  {/* {text.length} */}0
                </Tag>
              </p>
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3 mr-3">
                تعداد پیامک:
                <Tag color="#2196F3" className="mr-3 rounded-lg ">
                  3
                </Tag>
              </p>
            </div>
            <Textarea
              TextAreaClass="!h-32"
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              Placeholder="متن پیامک"
            />
            <div className="h-[1px] mx-auto my-2 w-full bg-blue-gray-50"></div>
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"تعداد ارسال موفق"}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"تعداد ارسال ناموفق"}
            />
            <Textarea
              TextAreaClass="!h-32"
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              Placeholder="توضیحات"
            />
            <div className="h-[1px] mx-auto my-2 w-full bg-blue-gray-50"></div>
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"هزینه برگشتی"}
            />
            <Parag
              Paragraph={"مبلغ : 150000 تومان"}
              Pclass={"text-sm text-center font-bold text-gray-600 self-start"}
            />
            <Input
              disabled={false}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 pr-4 p-1 md-max:mr-0 md-max:mb-0 "
              }
              placeholder={"هزینه نهایی"}
            />
            <Parag
              Paragraph={"مبلغ : 150000 تومان"}
              Pclass={"text-sm text-center font-bold text-gray-600 self-start"}
            />
            <Button
              onClick={() => {
                dispatch(
                  appSlice.actions.setShowModals("showModalInformation")
                );
              }}
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
        modalBodyClass="h-[70vh] overflow-y-auto p-6 pt-0"
        modalFooterClass="flex justify-between items-center hidden -mt-3"
        modalFooter={
          <div className="w-full flex flex-col justify-center">
            <Button
              onClick={() => {
                dispatch(
                  appSlice.actions.setShowModals("showModalInformation")
                );
              }}
              type="link"
              className="flex items-center justify-center mx-auto"
              icon={
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
              }
            >
              <span className="text-sm text-[#151515] font-medium">
                برگشت به گزارش فعالیت{" "}
              </span>
            </Button>
          </div>
        }
        Open={showModals.showModalInformation}
        HandleOpen={() => {
          dispatch(appSlice.actions.setShowModals("showModalInformation"));
        }}
      />
      <Modal
        modalClass="sm-max:!min-w-[90%]"
        modalHeader={"اطلاعات با موفقیت ثبت شد"}
        modalBody={
          "می‌تواند وضعیت ارسال را از بخش گزارشات ارسال، مشاهده نمایید."
        }
        modalFooterClass="flex justify-between items-center"
        modalFooter={
          <>
            <ButtonMaterial
              variant="text"
              color="red"
              onClick={() => showModalsHandler("showModalOrigin")}
              className="mr-1"
            >
              <span>لغو</span>
            </ButtonMaterial>
            <ButtonMaterial
              variant="gradient"
              color="green"
              onClick={() => showModalsHandler("showModalOrigin")}
            >
              <span>تایید نهایی</span>
            </ButtonMaterial>
          </>
        }
        Open={showModals.showModalOrigin}
        HandleOpen={() => showModalsHandler("showModalOrigin")}
      />
      <section className="flex flex-col items-center w-full h-full">
        <HeaderWithButton HeaderTitle={"لیست کل گزارشات ارسال پیامک"} />
        <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
          <CustomTable
            size="large"
            bordered
            dataSource={tableData}
            columns={columns}
            theme={"secondary"}
          />
        </div>
      </section>
    </div>
  );
};

export default SendSms;

// Types
export interface DataType {
  key: React.Key;
  senddate: string;
  recognize_send_code: number;
  final_price: string;
  sendBy: string[];
}
