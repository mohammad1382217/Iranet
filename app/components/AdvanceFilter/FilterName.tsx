import React from "react";
import { Input } from "../input";
import { Button, Parag } from "../tools";
import Button_component from "../Button";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineMinusCircle } from "react-icons/hi";

export const AccrodionFilterName: React.FC = () => {
  // const inputData
  const handleDelete = () => {};
  return (
    <div className="flex flex-col gap-1.5 mt-5 p-3   border border-gray-300 rounded-lg">
      <div className="flex justify-between flex-row items-center mb-2">
        <p className="text-lg font-extrabold text-[#212121]">فیلتر اسم</p>
        <Button_component
          // disabled
          ButtonClass="!w-[105px] !h-[34px] border-[#E53935] border-2 bg-[#FFFFFF] text-xs font-bold px-2.5 py-1.5 flex justify-between items-center gap-2"
        >
          <span className="text-[12px] text-[#263238]">حذف فیلتر</span>
          <FaRegTrashAlt className="w-4 h-4 leading-normal text-[#263238]" />
        </Button_component>
      </div>
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <div className="w-full flex flex-row items-center justify-between">
          <Input
            Type={"text"}
            InputName={""}
            InputClass={
              "w-full outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            Placeholder={"کلمۀ برگزیده"}
            InputOnChange={() => {}}
            Disabled={false}
          />
          <Button
            Type={"button"}
            ClassName={"border border-gray-300 rounded-lg mr-3.5 p-3 bg-white"}
            OnClick={() => {}}
          >
            <FaPlus className="h-3 w-3 text-blue-gray-300" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        {["سیده سادات", "احمد", "سید"].map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-2 text-[#151515]"
          >
            <Parag Paragraph={`${index + 1} .`} Pclass={""}></Parag>
            <Parag Paragraph={item} Pclass="flex-grow" />
            <HiOutlineMinusCircle
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
