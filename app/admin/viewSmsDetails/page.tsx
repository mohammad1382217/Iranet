import React from "react";
import Modal from "../../components/Modal";
import { weekDays } from "../../Register/page";
const DatePicker = React.lazy(() => import("react-multi-date-picker"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Button = React.lazy(() => import( "antd/es/button/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
import Textarea from "../../components/TextArea";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
import { Link } from "react-router-dom";
import { H1Title, Parag } from "../../components/tools";
import ButtonComponent from "../../components/Button";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const ViewSmsDeTails: React.FC = () => {
  const [ModalConfirmReport, setModalConfirmReport] = React.useState(false);
  const ModalHandlerConfirmReport = () =>
    setModalConfirmReport(!ModalConfirmReport);
  const [ModalConfirmReportAdmin, setModalConfirmReportAdmin] =
    React.useState(false);
  const ModalHandlerConfirmReportAdmin = () =>
    setModalConfirmReportAdmin(!ModalConfirmReportAdmin);
  const [ModalConfirmReportFinal, setModalConfirmReportFinal] =
    React.useState(false);
  const ModalHandlerConfirmReportFinal = () =>
    setModalConfirmReportFinal(!ModalConfirmReportFinal);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4 p-8 ">
      <div className="sm-max:px-5 h-full my-10 sm-max:w-80 w-96 mx-auto gap-4 gap-y-6 flex flex-col">
        <div className="">
          <H1Title
            BoldTitle={"اطلاعات پیامک"}
            H1class={"text-2xl font-semibold"}
          />
        </div>
        <div className="flex flex-col">
          <Input
            //   value={InputTitileGroup}
            //   onChange={(e) =>
            //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
            //   }
            value={''}
            placeholder="عنوان پیامک"
            className="mb-3 h-10"
          ></Input>
          <Textarea
            ShowCount={true}
            TextAreaClass="h-44 !py-2 !px-1"
            MaxLength={1000}
            // Value={InputTextMessage}
            // onChange={handleChange}
            Value={''}

            Placeholder="متن پیامک"
            onChange={() => {}}
          />
          <div className="flex my-1.5">
            <Parag
              Paragraph={"حداکثر 1000 کاراکتر"}
              Pclass={"text-sm text-[#78909C] font-normal"}
            />
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-row">
              <div className="flex items-center justify-start gap-2 w-1/2">
                <Parag
                  Paragraph={"تعداد کاراکتر ها:"}
                  Pclass={"text-base font-normal sm-max:text-xs"}
                />
                <Tag
                  color="#2196F3"
                  className="sm-max:text-xs bg-blue-500 text-white flex py-0.5 px-2 items-start rounded-lg"
                >
                  123
                </Tag>
              </div>
              <div className="flex items-center justify-start gap-2 w-1/2">
                <Parag
                  Paragraph={"تعداد پیامک:"}
                  Pclass={"text-base font-normal sm-max:text-xs"}
                />
                <Tag
                  color="#2196F3"
                  className="sm-max:text-xs bg-blue-500 text-white flex py-0.5 px-2 items-start rounded-lg"
                >
                  123
                </Tag>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-row items-center justify-between">
                <Input
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
                  placeholder={"تعداد شماره ها"}
                  // InputOnChange={(e) => {
                  //   setinput(e.target.value);
                  // }}
                  // Disabled={false}
                  value={''}

                />
                <Button
                  className={
                    "border border-[#0081E8] h-10 w-10 rounded-lg mr-3 p-2 py-3 bg-white flex justify-center items-start"
                  }
                  // OnClick={handelAddItem}
                >
                  <DownloadOutlined
                    color="#0081E8"
                    className="h-10 w-10 text-[#0081E8] "
                  />
                </Button>
              </div>
            </div>

            <Select
              className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
              size="large"
              // value={selectedItems === "" ? null : selectedItems as string}
              placeholder="نوع شمارۀ فرستنده"
              // defaultValue={selectedItems as string}
              // onChange={handleSelectedItemsChange}
              style={{
                
              }}
              options={["نوع 1", "نوع 2"].map((item) => ({
                value: item,
                label: item,
              }))}
              disabled
            />
            <div className="flex items-center justify-start gap-2 w-max">
              <Parag
                Paragraph={"هزینۀ ارسال پیامک:"}
                Pclass={"text-base font-normal sm-max:text-xs"}
              />
              <Tag
                color="#2196F3"
                className="sm-max:text-xs bg-blue-500 text-white flex py-0.5 px-2 items-start rounded-lg"
              >
                150.000 تومان
              </Tag>
            </div>
            <Input
          
            value={''}
            placeholder="تاریخ و ساعت درخواست"
            className="mb-3 h-10"
          ></Input>
            <ButtonComponent
              onClick={ModalHandlerConfirmReport}
              ButtonClass={
                "bg-[#0081E8] w-full mx-auto mt-2 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              }
            >
              ثبت گزارش
            </ButtonComponent>
            <Link to={"/admin/SmsSendingPanel/"}>
              <Button
                // onClick={goDashboard}
                type="link"
                className="flex items-center justify-center mt-1 mb-5 mx-auto"
                icon={
                  <ArrowRightCircleIcon
                    color="#E53935"
                    strokeWidth={2.5}
                    className={"h-3.5 w-3.5 mx-auto"}
                  />
                }
              >
                <span className="text-sm text-textColor font-medium ">
                  <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                  داشبورد
                </span>
              </Button>
            </Link>
            <Modal
              modalClass="!min-w-[35%] sm-max:!min-w-[90%] h-[95vh] mb-2 p-4 overflow-y-scroll scroll-auto"
              modalHeader={"منوی ثبت گزارش"}
              modalHeaderClass="mt-2 -mb-5"
              modalBody={
                <div className="">
                  {/* <DatePicker
                    disableDayPicker
                    plugins={[<TimePicker />]}
        format="HH:mm:ss YYYY/MM/DD"
        value={moment(SurveyData?.end_time).format('HH:mm:ss jYYYY/jMM/jDD')}
                    onChange={(e) => { console.log(e) }}
                    className="custom-calendar"
                    locale={persian_fa}
                    inputClass="outline-0 py-3 text-center mt-3 w-full bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="تاریخ و ساعت"
                  /> */}
                  <DatePicker
                    plugins={[<TimePicker />]}
                    format="HH:mm:ss YYYY/MM/DD"
                    // value={moment(SurveyData?.end_time).format('HH:mm:ss jYYYY/jMM/jDD')}
                    weekDays={weekDays}
                    className="custom-calendar text-right mr-3"
                    calendar={persian}
                    locale={persian_fa}
                    inputClass="outline-0 py-3 px-3 text-right mt-3 w-full bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="تاریخ و ساعت"
                  />
                  <Input
                    //   value={InputTitileGroup}
                    //   onChange={(e) =>
                    //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                    //   }
                    placeholder="تعداد ارسال موفق"
                    className="mb-3 mt-3 h-10"
                  ></Input>
                  <Input
                    //   value={InputTitileGroup}
                    //   onChange={(e) =>
                    //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
                    //   }
                    placeholder="تعداد ارسال ناموفق"
                    className="mb-3 h-10"
                  ></Input>
                  <Select
                    className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                    size="large"
                    // value={selectedItems === "" ? null : selectedItems as string}
                    placeholder="وضعیت"
                    // defaultValue={selectedItems as string}
                    // onChange={handleSelectedItemsChange}
                    style={{
                      
                    }}
                    options={[
                      "تایید شده در صف ارسال",
                      "ارسال شده در انتظار گزارش",
                      "پایان یافته",
                      "نیاز به ویرایش متن",
                      "منتظر تایید اپراتور",
                    ].map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                  <Textarea
                    ShowCount={true}
                    TextAreaClass="h-44 !py-2 !px-1 mb-3 mt-3"
                    MaxLength={1000}
                    // Value={InputTextMessage}
                    // onChange={handleChange}
                    Placeholder="توضیحات"
                    onChange={() => {}}
                  />
                  <Input placeholder="هزینه نهایی" className="mb-3 mt-4 h-10" />
                  <p lang="fa" role="text" className="text-textColor text-sm">
                    مبلغ : <span>150 هزار تومان</span>
                  </p>
                  <ButtonComponent
                    onClick={ModalHandlerConfirmReportAdmin}
                    ButtonClass={
                      "bg-[#0081E8] w-full mx-auto mt-2 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                    }
                  >
                    ثبت گزارش
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={ModalHandlerConfirmReportFinal}
                    ButtonClass={
                      "border-[#0081E8] border-[2px] bg-white w-full mx-auto mt-2 text-xs text-textColor font-bold sm-max:p-3 h-11 flex justify-center items-center"
                    }
                  >
                    تایید نهایی
                  </ButtonComponent>
                </div>
              }
              modalFooterClass="flex justify-between items-center mb-2 -mt-2 p-0"
              modalFooter={
                <div className="w-full flex justify-center">
                  <Button
                    onClick={ModalHandlerConfirmReport}
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
                      لغو عملیات و برگشت
                    </span>
                  </Button>
                </div>
              }
              Open={ModalConfirmReport}
              HandleOpen={ModalHandlerConfirmReport}
            />
            <Modal
              modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
              modalHeader={"گزارش با موفقیت ثبت شد"}
              modalHeaderClass="mt-3 mb-0 pb-0 text-center mx-auto flex justify-center"
              modalBody={<></>}
              modalFooterClass="flex justify-between items-center -mt-3"
              modalFooter={
                <div className="w-full flex justify-center">
                  <ButtonComponent
                    onClick={() => ModalHandlerConfirmReportAdmin()}
                    children="تایید"
                    ButtonClass="bg-[#43A047]  text-xs font-bold h-11 flex items-center justify-center"
                  />
                </div>
              }
              Open={ModalConfirmReportAdmin}
              HandleOpen={ModalHandlerConfirmReportAdmin}
            />
            <Modal
              modalClass="!min-w-[400px] sm-max:!min-w-[90%] flex flex-col gap-2"
              modalHeader={"مطمئنید می‌خواهید این پیامک را ثبت کنید؟"}
              modalHeaderClass="text-2xl font-semibold mb-0 pb-0"
              modalBodyClass="py-0"
              modalBody={
                <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal">
                  با تایید این بخش، هزینه ها محاسبه شده و از حساب کسر می‌شود و
                  دیگر قابل ویرایش نیست.
                </p>
              }
              modalFooterClass="flex justify-between items-center pt-0"
              modalFooter={
                <div className="w-full flex justify-center pt-4">
                  <ButtonComponent
                    onClick={() => ModalHandlerConfirmReportFinal()}
                    children="ثبت نهایی"
                    ButtonClass="bg-primary  text-xs font-bold h-11 flex items-center justify-center"
                  />
                </div>
              }
              Open={ModalConfirmReportFinal}
              HandleOpen={ModalHandlerConfirmReportFinal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewSmsDeTails;
