import React from "react";
import { Button, Input, Upload, UploadProps, message } from "antd";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { Parag } from "../../../components/tools";
import Button_component from "../../../components/Button";
import { useDispatch } from "../../../../lib/redux";
import Textarea from "../../../components/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import DatePicker from "react-multi-date-picker";
import { weekDays } from "../../../Register/page";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const props: UploadProps = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,

    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const DepositToTheAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="container flex flex-col justify-center rounded-lg max-w-sm mx-auto gap-10 mt-14 p-6">
      <Parag Paragraph={"واریز به حساب"} Pclass={"text-2xl font-semibold"} />
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-3.5">
          <Input
            className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 pr-4"
            placeholder="شماره حساب یا کارت مبدا"
          />
          <Input
            className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 pr-4"
            placeholder="شماره پیگیری/رهگیری"
          />
          <Input
            className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 pr-4"
            placeholder="مبلغ"
          />
          <DatePicker
            // onChange={(date) => handleDateChange("date", date)}
            weekDays={weekDays}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-center"
            inputClass="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 pr-4"
            id="date"
            placeholder="تاریخ واریز"
          />
          <Upload {...props} maxCount={3} className="w-full !block">
            <Button
              className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 pr-4"
              icon={<UploadOutlined />}
            >
              قبض واریز
            </Button>
          </Upload>
          <Textarea
            TextAreaClass={"w-full !h-36"}
            Value={undefined}
            Placeholder={"توضیحات"}
            onChange={() => {}}
          />
        </div>
        <div className="grid w-full items-center mt-[1.125rem]">
          <Button_component
            ButtonClass={
              "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
            }
            onClick={() => navigate("/store/ChargeAccount")}
          >
            تایید
          </Button_component>
          <NavLink to={`/store/ChargeAccount`}>
            <Button
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
              <span className="text-sm text-[#151515] font-medium">
                <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                داشبورد
              </span>
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DepositToTheAccount;
