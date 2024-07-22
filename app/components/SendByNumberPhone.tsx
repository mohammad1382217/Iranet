import React from "react";
import { Parag } from "./tools";
const ButtonComponent = React.lazy(() => import("./Button"));
const Input = React.lazy(() => import( "antd/es/input/index"));
import { FaPlus } from "react-icons/fa";
import { HiOutlineArrowCircleRight, HiOutlineMinusCircle } from "react-icons/hi";

import {
  useDispatch,
  useSelector,
  appSlice,
  selectNotePhone,
} from "../../lib/redux";
import { useNavigate } from "react-router-dom";

const SendByNumberPhone: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const NotePhone = useSelector(selectNotePhone);
  
  const handleNextLevel = () => {
    dispatch(appSlice.actions.setShowModals("showModalSendByNumber"));
    dispatch(appSlice.actions.setShowModals("showModalSendReport"));
  };

  const handleDelete = () => {};

  return (
    <div className="flex flex-col gap-3.5 max-w-96">
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <Parag
          Paragraph={
            "شماره تلفن مخاطبینی که قصد ارسال پیامک به آنها را دارید وارید کنید."
          }
          Pclass={"text-sm font-normal text-blue-gray-600 self-start pb-2"}
        />
        <div className="w-full flex flex-row items-center justify-between">
          <Input
            type={"text"}
            name={""}
            className={
              "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            placeholder={"شماره مخاطب"}
            onChange={() => {}}
            disabled={false}
          />

          <ButtonComponent
            ButtonClass={
              "border border-gray-300 rounded-lg mr-3.5 p-3 bg-white"
            }
            onClick={() => {}}
          >
            <FaPlus className="h-3 w-3 text-blue-gray-300" />
          </ButtonComponent>
        </div>
        <Parag
          Paragraph={"می‌توانید تا 400 شماره وارد کنید"}
          Pclass={"text-sm font-normal text-blue-gray-400 self-start"}
        />
      </div>
      <div className="flex flex-col gap-2 px-4">
        {NotePhone.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-2 text-textColor"
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
      <ButtonComponent
        onClick={handleNextLevel}
        ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
      >
        تایید و ورود به مرحلۀ بعد
      </ButtonComponent>
      <ButtonComponent
        onClick={() => navigate("/store/Dashboard")}
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

export default SendByNumberPhone;