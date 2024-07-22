import React from "react";
import Textarea from "../../components/TextArea";
import { Link, useParams } from "react-router-dom";
import { H1Title, Parag } from "../../components/tools";
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Button = React.lazy(() => import( "antd/es/button/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";
const DatePicker = React.lazy(() => import("react-multi-date-picker"));
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { weekDays } from "../../Register/page";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ViewSmsDeTailsReport: React.FC = () => {
  const { idSms } = useParams();
  console.log(idSms);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4 p-8 sm-max:px-0">
      <div className="w-96 sm-max:w-80 mx-auto gap-4 gap-y-6 flex flex-col">
        <div className="">
          <H1Title
            BoldTitle={"اطلاعات پیامک"}
            H1class={"text-2xl font-semibold"}
          />
        </div>
        <div className="flex flex-col">
          <Input placeholder="نام فروشگاه" value={''} className="mb-3 h-10"></Input>
          <DatePicker
              plugins={[<TimePicker />]}
              format="HH:mm:ss YYYY/MM/DD"
              // value={moment(SurveyData?.end_time).format('HH:mm:ss jYYYY/jMM/jDD')}
              weekDays={weekDays}
              className="custom-calendar text-right mr-3"
              calendar={persian}
              disabled
              locale={persian_fa}
              inputClass="outline-0 py-3 px-3 text-right mb-3 w-full bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              placeholder="تاریخ و ساعت درخواست"
            />
          <DatePicker
              plugins={[<TimePicker />]}
              format="HH:mm:ss YYYY/MM/DD"
              // value={moment(SurveyData?.end_time).format('HH:mm:ss jYYYY/jMM/jDD')}
              disabled
              weekDays={weekDays}
              className="custom-calendar text-right mr-3"
              calendar={persian}
              locale={persian_fa}
              inputClass="outline-0 py-3 px-3 text-right mb-3 w-full bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              placeholder="تاریخ و ساعت ارسال"
            />
          <Input
            placeholder="تعداد ارسال موفق"
            className="mb-3 h-10"
            value={''}
          />
          <Input
            //   value={InputTitileGroup}
            //   onChange={(e) =>
            //     dispatch(groupsSlice.actions.setTitileGroup(e.target.value))
            //   }
            placeholder="تعداد ارسال ناموفق"
            className="mb-3 h-10"
            value={''}
          />
          <Textarea
            ShowCount={true}
            TextAreaClass="h-44 !py-2 !px-1"
            MaxLength={1000}
            onChange={()=>{}}
            Placeholder="متن پیامک"
            Value=""
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
                  value={''}
                />
                <Button
                  className={
                    "border border-[#0081E8] h-10 w-10 rounded-lg mr-3 p-2 py-3 bg-white flex justify-center items-start"
                  }
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
              disabled={true}
              aria-readonly={true}
              // value={selectedItems === "" ? null : selectedItems as string}
              // onChange={handleSelectedItemsChange}
              placeholder="نوع شمارۀ فرستنده"
              options={["نوع 1", "نوع 2"].map((item) => ({
                value: item,
                label: item,
              }))}
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
                  برگشت به داشبورد
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewSmsDeTailsReport;
