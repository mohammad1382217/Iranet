import React from "react";
import { Input } from "../input";
import Button_component from "../Button";
import { FaRegTrashAlt } from "react-icons/fa";

export const AccrodionFilterNumber: React.FC = () => {
  // const inputData
  const handleDelete = () => {};
  // const handleDateChange = (date: DateObject | DateObject[] | null) => {
  //   SetData(data);
  // };
  // const [data, SetData] = useState("");
  return (
    <div className="flex flex-col gap-2.5 mt-5 p-3   border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-row items-center">
        <p className="text-lg font-extrabold text-[#212121]">فیلتر سایز کفش</p>
        <Button_component
          disabled={true}
          // ButtonClass="!w-[105px] !h-[34px] border-[#E53935] border-2 bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2"
          ButtonClass="!w-[105px] !h-[34px] border-[#CFD8DC] border-2 bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2"
        >
          <span className="text-[12px] text-[#263238]">حذف فیلتر</span>
          <FaRegTrashAlt className="w-4 h-4 leading-normal text-[#263238]" />
        </Button_component>
      </div>
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p className="w-16 text-base font-normal text-[#151515]">از تعداد</p>

          <Input
            Disabled={true}
            Type={"text"}
            InputName={""}
            InputClass={
              "w-full outline-0 bg-white h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4"
            }
            // Placeholder={"کلمۀ برگزیده"}
            InputOnChange={() => {}}
          />
        </div>
        <div className="w-full flex flex-row items-baseline justify-between ">
          <p className="w-16 text-base font-normal text-[#151515]">تا تعداد</p>

          <Input
            Disabled={true}
            Type={"text"}
            InputName={""}
            InputClass={
              "w-full outline-0 bg-white h-8 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-1 pr-4"
            }
            // Placeholder={"کلمۀ برگزیده"}
            InputOnChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
