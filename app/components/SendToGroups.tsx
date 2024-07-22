import React from "react";
import { Parag } from "./tools";
import { appSlice, useDispatch } from "../../lib/redux";
import { weekDays } from "../Register/page";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ButtonComponent = React.lazy(() => import("./Button"));
const DatePicker = React.lazy(() => import("react-multi-date-picker"));
const Select = React.lazy(() => import("antd/es/select/index"));

const SendToGroups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextLevel = () => {
    dispatch(appSlice.actions.setShowModals("showModalSendToGroup"));
    dispatch(appSlice.actions.setShowModals("showModalSendReport"));
  };

  const goback = () => {
    navigate("/store/");
  };

  return (
    <div className="flex flex-col gap-3.5 max-w-96">
      <Parag
        Paragraph={
          "گروه مخاطبینی که قصد ارسال پیامک به آنها را دارید انتخاب کنید."
        }
        Pclass={"text-sm text-gray-600 text-right font-normal sm-max:text-xs"}
      />
      <Select
        className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-2"
        size="large"
        mode="multiple"
        placeholder="انتخاب گروه"
        // value={selectedItems}
        // onChange={
          // (e) => {}
          // dispatch(occasionalmessageSlice.actions.setSelectedOption(e))
        // }
        style={{}}
        // options={filteredOptions.map((item) => ({
        //   value: item,
        //   label: item,
        // }))}
      />
      <div className="flex items-center gap-2">
        <Parag
          Paragraph={"انتخاب بازه زمانی ثبت مخاطب (اختیاری)"}
          Pclass={"text-sm text-gray-600 text-right font-normal sm-max:text-xs"}
        />
      </div>
      <DatePicker
        format="YYYY/MM/DD"
        // value={""}
        // onChange={(date) => handleDateChange("date", date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        inputClass="outline-0 w-full bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3"
        placeholder="تاریخ شروع"
      />
      <DatePicker
        format="YYYY/MM/DD"
        // value={""}
        // onChange={(date) => handleDateChange("date",date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        inputClass="outline-0 w-full bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3"
        placeholder="تاریخ پایان"
      />
      <ButtonComponent
        onClick={handleNextLevel}
        ButtonClass={"flex-shrink-0 py-2.5 px-[18px] bg-secondary"}
      >
        تایید و ورود به مرحلۀ بعد
      </ButtonComponent>

      <ButtonComponent
        onClick={goback}
        ButtonClass="flex items-center justify-center mx-auto bg-white shadow-none hover:shadow-none"
      >
        <div className="flex items-center gap-2 text-sm text-[#151515] font-medium">
          <HiOutlineArrowCircleRight
            className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
          />
          <div>
            <span className="text-[#757575]">لغو عملیات و</span> برگشت به
            داشبورد
          </div>
        </div>
      </ButtonComponent>
    </div>
  );
};

export default SendToGroups;
