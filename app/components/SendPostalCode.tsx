import React from "react";
import { Parag } from "./tools";
const Input = React.lazy(() => import( "antd/es/input/index"));
const ButtonComponent = React.lazy(() => import("./Button"));
import {
  appSlice,
  useDispatch,
} from "../../lib/redux";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SendPostalCode: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextLevel = () => {
    dispatch(appSlice.actions.setShowModals("showModalSendByPostalCode"));
    dispatch(appSlice.actions.setShowModals("showModalSendReport"));
  };

  return (
    <div className="flex flex-col gap-3.5 max-w-96">
      <Parag
        Paragraph={
          "کد پستی منطقه مخاطبینی که قصد ارسال پیامک به آنها را دارید انتخاب کنید."
        }
        Pclass={"text-sm text-gray-600 text-right font-normal sm-max:text-xs"}
      />
      <Input
        name={""}
        className={
          "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        }
        placeholder="کد پستی"
        disabled={false}
      />
      <Input
        name={""}
        className={
          "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        }
        placeholder="تعداد ارسال"
        disabled={false}
      />
      <ButtonComponent
        onClick={handleNextLevel}
        ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
      >
        تایید و ورود به مرحلۀ بعد
      </ButtonComponent>
      <ButtonComponent
        onClick={()=> navigate("/store/Dashboard")}
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

export default SendPostalCode;