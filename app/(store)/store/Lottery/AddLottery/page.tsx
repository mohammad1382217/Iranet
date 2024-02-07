import React from "react";
import { Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Button_component from "../../../../components/Button";
import { DateObject } from "react-multi-date-picker";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { AccordionCustomIcon } from "../../../../components/Accordion";
import { AccrodionFilters } from "../../../../components/AccrdionFilters";
import { Parag } from "../../../../components/tools";

const AddLottery: React.FC = () => {
  const navigate = useNavigate();
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {};

  const handleDateChange = (date: DateObject | DateObject[] | null) => {
    if (date instanceof DateObject) {
      //   dispatch(
      //     occasionalmessageSlice.actions.setsenddata(
      //       date?.convert(persian, persian_fa).format().toString() ?? ""
      //     )
      //   );
    }
  };

  const handleCreateLottery = () => {
    navigate("/store/Lottery/LotteryResult")
  };

  const goback = () => {
    navigate("/store/Lottery");
    // dispatch(occasionalmessageSlice.actions.setTitleMessage(""));
    // dispatch(occasionalmessageSlice.actions.settextmessage(""));
  };

  return (
    // <div className="flex flex-col justify-center min-h-screen p-6 mx-auto my-10 max-w-lg gap-3">
 <div className="flex flex-col mx-auto justify-center min-h-screen items-center my-10 max-w-lg gap-3 sm:w-80 w-96 ">
      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
        تنظیمات قرعه کشی</p>
      <Input
        value={""}
        onChange={
          (e) => {}
          // dispatch(
          //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
          // )
        }
        placeholder="عنوان قرعه کشی"
        className="mt-3 h-10"
      ></Input>
      <Select
        className="mt-2"
        size="large"
        mode="multiple"
        placeholder="انتخاب مخاطبین"
        // value={selectedItems}
        onChange={
          (e) => {}
          // dispatch(occasionalmessageSlice.actions.setSelectedOption(e))
        }
        style={{
          width: "100%",
        }}
        // options={filteredOptions.map((item) => ({
        //   value: item,
        //   label: item,
        // }))}
      />
      <div className="w-5/6 mt-3">

      <AccordionCustomIcon headerTitle={"مخاطبین 1"} Id={9}>
        <AccrodionFilters></AccrodionFilters>
      </AccordionCustomIcon>
      <AccordionCustomIcon headerTitle={"مخاطبین 2"} Id={10}>
        <AccrodionFilters></AccrodionFilters>
        </AccordionCustomIcon>
        </div>
      <Input
        value={""}
        onChange={
          (e) => {}
          // dispatch(
          //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
          // )
        }
        placeholder="تعداد برگزیدگان"
        className="mt-2 h-10"
      ></Input>
      <Parag
        Paragraph={"از 1 تا 50 نفر"}
        Pclass={"text-sm font-normal text-blue-gray-400 text-right"}
      />
      <div className="flex items-center justify-center gap-4">
        <Parag
          Paragraph={"تعداد کل شماره های فیلتر شده:"}
          Pclass={"text-sm font-normal text-[#151515] text-center"}
        />
        <Parag
          Paragraph={"124 نفر"}
          Pclass={"text-sm font-normal text-[#151515] text-center"}
        />
      </div>
      <Button_component
        disabled={false}
        ButtonClass="bg-[#2DCEA2] w-full mx-auto mt-8 text-xs font-bold h-11 flex justify-center items-center"
        onClick={() => handleCreateLottery()}
      >
        شروع قرعه کشی
      </Button_component>

      <Button
        onClick={goback}
        type="link"
        className="flex items-center justify-center -mt-2 mb-5 mx-auto"
        icon={
          <ArrowRightCircleIcon
            color="#E53935"
            strokeWidth={2.5}
            className={"h-3.5 w-3.5 mx-auto"}
          />
        }
      >
        <span className="text-sm text-[#151515] font-medium ">
          <span className="text-[#757575]">لغو عملیات و</span> برگشت به داشبورد
        </span>
      </Button>
    </div>
  );
};

export default AddLottery;