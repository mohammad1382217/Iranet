import React from "react";
import Button_component from "../Button";
import { FaRegTrashAlt } from "react-icons/fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { weekDays } from "../../Register/page";

export const AccrodionFilterDate: React.FC = () => {
  // const inputData
  const handleDelete = () => {};
  // const handleDateChange = (date: DateObject | DateObject[] | null) => {
  //   SetData(data);
  // };
  // const [data, SetData] = useState("");
  return (
    <div className="flex flex-col gap-1.5 mt-5 p-3   border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-row items-center">
        <p className="text-lg font-extrabold text-[#212121]">
          فیلتر تاریخ تولد
        </p>
        <Button_component ButtonClass="!w-[105px] !h-[34px] border-[#E53935] border-2 bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2">
          <span className="text-[12px] text-[#263238]">حذف فیلتر</span>
          <FaRegTrashAlt className="w-4 h-4 leading-normal text-[#263238]" />
        </Button_component>
      </div>
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p className="w-16 text-base font-normal text-[#151515]">از تاریخ</p>

          <DatePicker
            format="YYYY/MM/DD"
            // value={""}
            // onChange={(date) => handleDateChange(date)}
            weekDays={weekDays}
            className="custom-calendar"
            calendar={persian}
            locale={persian_fa}
            inputClass="outline-0 text-center mt-3 w-full bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="تاریخ شروع"
          />
        </div>
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p className="w-16 text-base font-normal text-[#151515]">تا تاریخ</p>

          <DatePicker
            format="YYYY/MM/DD"
            // value={data}
            // onChange={(date) => handleDateChange(date)}
            weekDays={weekDays}
            className="custom-calendar"
            calendar={persian}
            locale={persian_fa}
            inputClass="outline-0 text-center w-full bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="تاریخ پایان"
          />
        </div>
      </div>
    </div>
  );
};
