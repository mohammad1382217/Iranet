import React from "react";
import ButtonComponent from "../Button";
import { weekDays } from "../../Register/page";
import { FaRegTrashAlt } from "react-icons/fa";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
const DatePicker = React.lazy(() => import("react-multi-date-picker"));

const AccrodionFilterDate: React.FC = () => {
  // const inputData
  const [Date, setDate] = React.useState(["", ""]);
  const [disable, setDisable] = React.useState(true);
  // const handleDateChange = (date: DateObject | DateObject[] | null) => {};
  const handleDelete = () => {
    setDisable(true);
    console.log(Date);
    setDate(["", ""]);
  };
  
  React.useEffect(() => {
    if (Date[0].length > 0 || Date[1].length > 0) {
      setDisable(false);
      console.log(Date[0].length);
    }
  }, Date);
  
  return (
    <div className="flex flex-col gap-1.5 mt-5 p-3 border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-row items-center">
        <p lang="fa" role="text" className="text-lg font-extrabold text-[#212121]">
          فیلتر تاریخ تولد
        </p>
        <ButtonComponent
          disabled={disable}
          onClick={handleDelete}
          ButtonClass={`${
            disable ? "border-[#CFD8DC]" : "border-[#E53935]"
          } !w-[105px] !h-[34px]  border-2 bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2`}
        >
          {" "}
          <span className="text-[12px] text-[#263238]">حذف فیلتر</span>
          <FaRegTrashAlt className="w-4 h-4 leading-normal text-[#263238]" />
        </ButtonComponent>
      </div>
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p lang="fa" role="text" className="w-16 text-base font-normal text-textColor">از تاریخ</p>

          <DatePicker
            format="YYYY/MM/DD"
            // value={""}
            // onChange={(date) => handleDateChange(date)}
            value={Date[0]}
            onChange={(e) =>
              setDate([
                // new DateObject(e).convert(persian, persian_fa).format(),
                Date[1],
              ])
            }
            weekDays={weekDays}
            className="custom-calendar"
            calendar={persian}
            locale={persian_fa}
            inputClass="outline-0 text-center mt-3 w-full bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="تاریخ شروع"
          />
        </div>
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p lang="fa" role="text" className="w-16 text-base font-normal text-textColor">تا تاریخ</p>

          <DatePicker
            format="YYYY/MM/DD"
            value={Date[1]}
            // value={data}
            // onFocusedDateChange={(e) => {console.log(e) }}
            onChange={(e) =>
              setDate([
                Date[0],
                // new DateObject(e).convert(persian, persian_fa).format(),
              ])
            }
            // onChange={arrey =>  console.log(arrey.join(",\n")) }

            // onPropsChange={(e) => {console.log(e) }}
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

export default AccrodionFilterDate;