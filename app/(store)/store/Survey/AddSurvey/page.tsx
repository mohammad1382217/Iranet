import React from "react";
import { Button, Input } from "antd";
import { weekDays } from "../../../../Register/page";
import TextArea from "../../../../components/TextArea";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Button_component from "../../../../components/Button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { Parag } from "../../../../components/tools";
import { FaPlus } from "react-icons/fa";
import {
  appSlice,
  selectShowModal,
  useDispatch,
  useSelector,
} from "../../../../../lib/redux";
import Modal from "../../../../components/Modal";

const AddSurvey: React.FC = () => {
  const [degree, setDegree] = React.useState(["عالی", "خوب", "متوسط"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowModal);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {};

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
    showModalHandler();
  };

  const handleDelete = () => {};

  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModal());
  };

  const goback = () => {
    navigate("/store/Survey");
    // dispatch(occasionalmessageSlice.actions.setTitleMessage(""));
    // dispatch(occasionalmessageSlice.actions.settextmessage(""));
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen p-6 mx-auto my-10 max-w-lg">
    <div className="flex flex-col mx-auto justify-center min-h-screen items-center my-10 sm:w-80 w-96 ">

      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
    فرم ایجاد و ویرایش نظرسنجی
      </p>
      <Input
        value={""}
        onChange={
          (e) => {}
          // dispatch(
          //   occasionalmessageSlice.actions.setTitleMessage(e.target.value)
          // )
        }
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
        // onChange={(date) => handleDateChange(date)}
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
        // onChange={(date) => handleDateChange(date)}
        weekDays={weekDays}
        className="custom-calendar"
        calendar={persian}
        locale={persian_fa}
        inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
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

      <Modal
        modalHeaderClass="flex flex-row justify-between"
        modalHeader={
          <>
            <h3 className="text-2xl font-semibold text-gray-900">
              نظرسنجی با موفقیت ثبت شد
            </h3>
          </>
        }
        modalBody={
          <>
            <Parag
              Paragraph={"لینک صفحۀ عمومی شرکت در نظرسنجی:"}
              Pclass={"text-base font-normal text-blue-gray-500 mb-4"}
            />
            <div className="container relative inline-flex items-center">
              <Input
                dir="ltr"
                placeholder="https://link.com/link_link"
                className="absolute flex items-center justify-center gap-2.5 flex-grow flex-shrink-0 rounded-lg border-blue-gray-100 h-10 py-3 pl-3 pr-1.5 placeholder:leading-tight placeholder:text-sm placeholder:font-normal placeholder:text-blue-gray-300 cursor-auto"
                readOnly
              />
              <Button_component
                ButtonClass={
                  "flex shrink-0 items-center justify-center relative -left-1 h-8 sm:!p-3 bg-blue-gray-300 text-xs font-bold ml-64"
                }
              >
                کپی کردن
              </Button_component>
            </div>
          </>
        }
        modalFooter={
          <Button_component
            onClick={()=> {
              showModalHandler();
              goback();
            }}
            ButtonClass="bg-secondary text-xs font-bold text-white h-10 flex items-center justify-center"
          >
            برگشت به داشبورد
          </Button_component>
        }
        modalFooterClass="flex items-center justify-center"
        Open={showModal}
        HandleOpen={showModalHandler}
      />
    </div>
  );
};

export default AddSurvey;
