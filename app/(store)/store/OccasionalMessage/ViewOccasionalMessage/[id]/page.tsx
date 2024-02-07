import { Input, Select, Button } from "antd";
import React, { ChangeEvent, useEffect } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Button_component from "../../../../../components/Button";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import TextArea from "../../../../../components/TextArea";
import {
  occasionalmessageSlice,
  selectOccasionalMessageOpations,
  selectedOccasionalMessageOpation,
  selectInputTitileOccasionalMessage,
  selectInputSenddateOccasionalMessage,
  selectoccasionalmessageData,
  selectInputTextMessageOccasionalMessage,
  useSelector,
  useDispatch,
} from "../../../../../../lib/redux";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AccordionCustomIcon } from "../../../../../components/Accordion";
import { AccrodionFilters } from "../../../../../components/AccrdionFilters";
export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const ViewOccasionalMessage : React.FC = () => {
  const { idMessage } = useParams<{ idMessage: string }>();
  const parsedidMessage = idMessage!;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goback = () => {
    navigate("/store/OccasionalMessage");
    dispatch(occasionalmessageSlice.actions.setTitleMessage(""));
    dispatch(occasionalmessageSlice.actions.settextmessage(""));
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(occasionalmessageSlice.actions.settextmessage(e.target.value));
  };
  const tableMessage = useSelector(selectoccasionalmessageData);
  const InputTitileMessage = useSelector(selectInputTitileOccasionalMessage);
  const InputTextMessage = useSelector(selectInputTextMessageOccasionalMessage);
  const InputDate = useSelector(selectInputSenddateOccasionalMessage);

  useEffect(() => {
    dispatch(
      occasionalmessageSlice.actions.setTitleMessage(
        tableMessage[parseInt(parsedidMessage) - 1].titlemessage
      )
    );
    dispatch(
      occasionalmessageSlice.actions.settextmessage(
        tableMessage[parseInt(parsedidMessage) - 1].textmessage
      )
    );
    dispatch(
      occasionalmessageSlice.actions.setSelectedOption(
        tableMessage[parseInt(parsedidMessage) - 1].users
      )
    );
    dispatch(
      occasionalmessageSlice.actions.setsenddata(
        tableMessage[parseInt(parsedidMessage) - 1].senddate
      )
    );
  }, []);

  const isDisabled = InputTextMessage === "" || InputTitileMessage === "";
  //select
  const OPTIONS = useSelector(selectOccasionalMessageOpations);
  const selectedItems = useSelector(selectedOccasionalMessageOpation);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const handleDateChange = (date: DateObject | DateObject[] | null) => {
    if (date instanceof DateObject) {
      dispatch(
        occasionalmessageSlice.actions.setsenddata(
          date?.convert(persian, persian_fa).format().toString() ?? ""
        )
      );
    }
  };
  const handleEditGroup = () => {
    let newData = [...tableMessage];
    const data = newData.splice(parseInt(parsedidMessage) - 1, 1, {
      ...newData[parseInt(parsedidMessage) - 1],
      titlemessage: InputTitileMessage,
      // senddate: "1400/00/00",
      users: selectedItems,
      textmessage: InputTextMessage,
    });
    // console.log("data");
    dispatch(occasionalmessageSlice.actions.setNewData(newData));
    dispatch(occasionalmessageSlice.actions.setTitleMessage(""));
    dispatch(occasionalmessageSlice.actions.settextmessage(""));
    navigate("/store/OccasionalMessage");
  };
  return (
    <div>
      <div className="flex flex-col mx-auto justify-center items-center my-10 sm:w-80 w-96 ">
      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
          فرم ویرایش پیام های مناسبتی
        </p>
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
        <TextArea
          ShowCount={true}
          TextAreaClass="mt-3 h-44"
          MaxLength={100}
          Value={InputTextMessage}
          onChange={(e) => handleChange(e)}
          Placeholder="متن پیام"
        />
        <Select
          className="mt-5"
          size="large"
          mode="multiple"
          placeholder="انتخاب مخاطبین"
          value={selectedItems}
          onChange={(e) =>
            dispatch(occasionalmessageSlice.actions.setSelectedOption(e))
          }
          style={{
            width: "100%",
          }}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />
        <div className="w-5/6 mt-5">
          <AccordionCustomIcon headerTitle={"مخاطبین 1"} Id={6}>
           <AccrodionFilters></AccrodionFilters>
          </AccordionCustomIcon>
          <AccordionCustomIcon headerTitle={"مخاطبین 2"} Id={7}>
          <AccrodionFilters></AccrodionFilters>
          </AccordionCustomIcon>
        </div>
        <DatePicker
          format="YYYY/MM/DD HH:mm:ss"
          value={InputDate}
          onChange={(date) => handleDateChange(date)}
          weekDays={weekDays}
          className="custom-calendar"
          calendar={persian}
          locale={persian_fa}
          calendarPosition="center"
          inputClass="outline-0 w-96 sm:w-80 mt-3  bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3"
          placeholder=" تاریخ و ساعت ارسال"
          plugins={[<TimePicker position="bottom" />]}
        />
        <Button_component
          onClick={handleEditGroup}
          disabled={isDisabled}
          ButtonClass="bg-[#2DCEA2] w-full mx-auto mt-8 text-xs font-bold h-11 flex justify-center items-center"
          children="ذخیرۀ تغییرات"
        />
        <Button
          onClick={goback}
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
          <NavLink to={"/store/occasionalMessage"}>
          <span className="text-sm text-[#151515] font-medium ">
          <span className="text-[#757575]">لغو عملیات و</span> برگشت به داشبورد
        </span>
            {/* <span className="text-sm text-[#151515] font-medium ">
              برگشت به داشبورد
            </span> */}
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default ViewOccasionalMessage;