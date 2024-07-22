import React, { ChangeEvent } from "react";
import { Parag } from "./tools";
import { weekDays } from "../Register/page";
import DatePicker, { DateObject } from "react-multi-date-picker";
import AccordionCustomIcon from "../components/Accordion";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import AccrodionFilters from "../components/AccrdionFilters";
import { appSlice, occasionalmessageSlice, selectedOccasionalMessageOpation, selectInputSenddateOccasionalMessage, selectInputTextMessageOccasionalMessage, selectInputTitileOccasionalMessage, selectOccasionalMessageOpations, useDispatch, useSelector } from "../../lib/redux";
const Input = React.lazy(() => import( "antd/es/input/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
import Textarea from "./TextArea";
const ButtonComponent = React.lazy(() => import("./Button"));
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const OccasionalMessage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const InputDate = useSelector(selectInputSenddateOccasionalMessage);
  const InputTitileMessage = useSelector(selectInputTitileOccasionalMessage);
  const InputTextMessage = useSelector(selectInputTextMessageOccasionalMessage);

  //select
  const Options = useSelector(selectOccasionalMessageOpations);
  const selectedItems = useSelector(selectedOccasionalMessageOpation);
  const filteredOptions = Options.filter((o) => !selectedItems.includes(o));

  const isDisabled =
    InputTextMessage === "" ||
    InputTitileMessage === "" ||
    selectedItems.length === 0;
    
  const handleNextLevel = () => {
    dispatch(appSlice.actions.setShowModals("showModalSendOccasionalMassage"));
    dispatch(appSlice.actions.setShowModals("showModalSendReport"));
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(occasionalmessageSlice.actions.settextmessage(e.target.value));
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

  const goback = () => {
    navigate("/store/");
    dispatch(occasionalmessageSlice.actions.setTitleMessage(""));
    dispatch(occasionalmessageSlice.actions.settextmessage(""));
  };

  return (
    <div className="flex flex-col mx-auto justify-center items-center w-auto">
      <Parag
        Paragraph={"تنظیمات پیام مناسبتی را انتخاب کنید."}
        Pclass={"text-sm font-normal text-blue-gray-600 self-start"}
      />
      <Input
        value={InputTitileMessage}
        onChange={(e) =>
          dispatch(
            occasionalmessageSlice.actions.setTitleMessage(e.target.value)
          )
        }
        placeholder="عنوان پیام مناسبتی"
        className="mt-5 h-10"
      ></Input>
      <Textarea
        ShowCount={true}
        TextAreaClass="mt-3 h-44"
        MaxLength={100}
        Value={InputTextMessage}
        onChange={onChange}
        Placeholder="متن پیام"
      />
      <div className="container flex flex-col items-center justify-center">
        <Select
          className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none mt-5"
          size="large"
          mode="multiple"
          placeholder="انتخاب مخاطبین"
          value={selectedItems as string[]}
          onChange={(e: unknown) =>
            dispatch(
              occasionalmessageSlice.actions.setSelectedOption(e as string[])
            )
          }
          style={{}}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
        <div className="w-5/6 mt-3">
          <AccordionCustomIcon headerTitle={"مخاطبین 1"} Id={17}>
            <AccrodionFilters></AccrodionFilters>
          </AccordionCustomIcon>
          <AccordionCustomIcon headerTitle={"مخاطبین 2"} Id={18}>
            <AccrodionFilters></AccrodionFilters>
          </AccordionCustomIcon>
        </div>
      </div>
      <DatePicker
        format="HH:mm:ss YYYY/MM/DD"
        // value={moment(InputDate).format('HH:mm:ss jYYYY/jMM/jDD')}
        onChange={(date) => handleDateChange(date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        calendarPosition="center"
        inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
        placeholder=" تاریخ و ساعت ارسال"
        plugins={[<TimePicker position="bottom" />]}
      />
      <Select
        className="appearance-none mt-3 block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
        size="large"
        // value={
        //   selectedItems === "" ? null : (selectedItems as string)
        // }
        placeholder="نوع شمارۀ فرستنده"
        // defaultValue={selectedItems as string}
        // onChange={handleSelectedItemsChange}
        style={{}}
        options={["نوع شماره فرستنده 1", "نوع شماره فرستنده 2"].map((item) => ({
          value: item,
          label: item,
        }))}
      />
      <ButtonComponent
        disabled={isDisabled}
        ButtonClass="bg-secondary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
        children="تایید و ورود به مرحلۀ بعد"
        onClick={handleNextLevel}
      />

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

export default OccasionalMessage;