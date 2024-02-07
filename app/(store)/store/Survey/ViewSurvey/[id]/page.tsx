import React from "react";
import { Button, Input } from "antd";
import { weekDays } from "../../../../../Register/page";
import TextArea from "../../../../../components/TextArea";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Button_component from "../../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { Parag } from "../../../../../components/tools";
import { FaPlus } from "react-icons/fa";
import {
  SurveySlice,
  appSlice,
  selectEditingId,
  selectSurveyData,
  selectSurveyDatum,
  useDispatch,
  useSelector,
} from "../../../../../../lib/redux";
import { DataType } from "../../page";

const ViewSurvey : React.FC = () => {
  const [degree, setDegree] = React.useState(["عالی", "خوب", "متوسط"]);

  const SurveyData = useSelector(selectSurveyData);
  const SurveyDatum = useSelector(selectSurveyDatum);
  const editingId = useSelector(selectEditingId);
  const handleEditOpinion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      SurveySlice.actions.setSurveyDataKey({
        key: name as keyof DataType,
        value,
      })
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDateChange = (
    name: keyof DataType,
    date: DateObject | DateObject[] | null
  ) => {
    if (date instanceof DateObject) {
      dispatch(
        SurveySlice.actions.setSurveyDataKey({
          key: name,
          value: date?.convert(persian, persian_fa).format().toString() ?? "",
        })
      );
    }
  };

  const handleCreateLottery = () => {
    dispatch(SurveySlice.actions.setEditingId(0));
    dispatch(SurveySlice.actions.setUpdateSurveyDatum({index: editingId - 1 , modify: SurveyData}));
    goback();
  };

  const handleDelete = () => {};
  const goback = () => {
    navigate("/store/Survey");
  };
  return (
    <div className="flex flex-col mx-auto justify-center min-h-screen items-center my-10 sm:w-80 w-96 ">
      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
        فرم ایجاد و ویرایش نظرسنجی</p>
      <Input
        value={SurveyData.survayTitle}
        onChange={(e) => handleEditOpinion(e)}
        name="survayTitle"
        placeholder="عنوان نظرسنجی"
        className="mt-5 h-10"
      />
      <TextArea
        ShowCount={true}
        TextAreaClass="mt-3 h-44"
        MaxLength={100}
        Value={""}
        onChange={handleChange}
        Placeholder="متن سوال"
      />
      <div className="w-full flex flex-row items-center justify-between">
        <Input
          value={""}
          onChange={
            (e) => {}
            // dispatch(
            //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
            // )
          }
          placeholder="متن گزینه ها"
          className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4 mt-5"
        />
        <Button_component
          disabled={false}
          ButtonClass="border border-gray-300 rounded-lg mr-3.5 p-3 mt-5 bg-white"
          onClick={() => {}}
        >
          <FaPlus className="h-3 w-3 text-blue-gray-300" />
        </Button_component>
      </div>
      <Parag
        Paragraph={"حداکثر تعداد گزینه ها، 10 عدد می‌باشد"}
        Pclass={"mt-2.5 text-sm font-normal text-blue-gray-400 self-start"}
      />

      {degree.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-center gap-2 text-[#151515] w-full mt-3.5"
        >
          <Parag Paragraph={`${index + 1} .`} Pclass={""}></Parag>
          <Parag Paragraph={item} Pclass="flex-grow" />
          <HiOutlineMinusCircle
            className="text-red-500 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      ))}

      <DatePicker
        format="YYYY/MM/DD"
        // value={""}
        // onChange={(date) => handleDateChange("date", date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3"
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
        inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3"
        placeholder="تاریخ پایان"
      />
      <Button_component
        disabled={false}
        ButtonClass="bg-[#2DCEA2] w-full mx-auto mt-10 text-xs font-bold h-11 flex justify-center items-center"
        onClick={() => handleCreateLottery()}
      >
        ایجاد نظرسنجی
      </Button_component>

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
        <span className="text-sm text-[#151515] font-medium ">
          <span className="text-[#757575]">لغو عملیات و</span> برگشت به داشبورد
        </span>
      </Button>
    </div>
  );
};

export default ViewSurvey;
