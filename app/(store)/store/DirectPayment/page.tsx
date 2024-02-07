import React from "react";
import { Parag } from "../../../components/tools";
import { Button, Input } from "antd";
import behpardakht from "../../../assets/images/behpardakht_logo.png";
import Tejarat from "../../../assets/images/Top-Tap-Tejarat-Electronic-Logo.png";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import zarinpal from "../../../assets/images/zarin-pal.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button_component from "../../../components/Button";
import { Checkbox } from "@material-tailwind/react";
import {
  appSlice,
  selectActiveCheckBoxDirectPayment,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";

export const CheckboxCustomStyles: React.FC<CheckboxCustomStylesProps> = ({
  Checked,
  OnChange,
}) => {
  return (
    <Checkbox
      checked={Checked}
      onChange={OnChange}
      ripple={false}
      className="h-4 w-4 rounded-full border-blue-gray-100 bg-white transition-all hover:scale-105 hover:before:opacity-0"
      crossOrigin={Button}
    />
  );
};

const DirectPayment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeCheckBoxDirectPayment = useSelector(
    selectActiveCheckBoxDirectPayment
  );
  const handleCheckPointClick = (point: number) => {
    dispatch(appSlice.actions.setActiveCheckBoxDirectPayment(point));
  };
  return (
    <div className="container flex flex-col justify-center rounded-lg max-w-sm mx-auto gap-10 mt-14 p-6">
      <Parag Paragraph={"پرداخت مستقیم"} Pclass={"text-2xl font-semibold"} />
      <div className="flex flex-col gap-3.5">
        <div>
          <Input
            className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-3 pr-4"
            placeholder="مبلغ"
          />
          <Parag
            Paragraph={"حداقل 20 هزار تومان"}
            Pclass={
              "text-sm font-medium text-blue-gray-400 text-right mb-1 mt-[5px]"
            }
          />
        </div>
        <div className="flex gap-2">
          <Parag
            Paragraph={"مبلغ"}
            Pclass={
              "text-base font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
          <Parag
            Paragraph={"150 هزار تومان"}
            Pclass={
              "text-base font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
        </div>
        <div>
          <Parag
            Paragraph={"درگاه پرداخت مورد نظر خود را انتخاب کنید:"}
            Pclass={
              "text-lg font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
        </div>
        <div className="container flex sm:flex-wrap items-center justify-center gap-2 p-6">
          <div onClick={() => handleCheckPointClick(1)} className="sm:container flex flex-col items-center justify-center w-[115px] h-[100px] py-3 px-4 rounded-lg bg-[#FF001A] bg-opacity-10 border border-solid border-[#FF001A] gap-2 cursor-pointer">
            <div
              className="w-[84px] h-[50px] flex flex-col"
              style={{
                backgroundImage: `url(${behpardakht})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="container flex items-center justify-center gap-2">
              <CheckboxCustomStyles
                Checked={activeCheckBoxDirectPayment === 1}
                OnChange={() => handleCheckPointClick(1)}
              />
              <Parag
                Paragraph={"ملت"}
                Pclass={"text-xs font-medium text-[#151515] text-right"}
              />
            </div>
          </div>
          <div onClick={() => handleCheckPointClick(2)} className="sm:container flex flex-col items-center justify-center w-[148px] h-[100px] py-3 px-4 rounded-lg bg-[#033F88] bg-opacity-10 border border-solid border-[#033F88] gap-2 cursor-pointer">
            <div
              className="w-[116px] h-[50px]"
              style={{
                backgroundImage: `url(${Tejarat})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="flex items-center justify-center gap-2">
              <CheckboxCustomStyles
                Checked={activeCheckBoxDirectPayment === 2}
                OnChange={() => handleCheckPointClick(2)}
              />
              <Parag
                Paragraph={"پارسیان"}
                Pclass={"text-xs font-medium text-[#151515] text-right"}
              />
            </div>
          </div>
          <div onClick={() => handleCheckPointClick(3)} className="sm:container flex flex-col items-center justify-center w-auto h-[100px] py-3 px-4 rounded-lg bg-[#FFD100] bg-opacity-10 border border-solid border-[#FFD100] gap-2 cursor-pointer">
            <div
              className="w-[50px] h-[50px]"
              style={{
                backgroundImage: `url(${zarinpal})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="flex items-center justify-center gap-2">
              <CheckboxCustomStyles
                Checked={activeCheckBoxDirectPayment === 3}
                OnChange={() => handleCheckPointClick(3)}
              />
              <Parag
                Paragraph={"زرین پال"}
                Pclass={"text-xs font-medium text-[#151515] text-right w-max"}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Parag
            Paragraph={"قابل پرداخت:"}
            Pclass={
              "text-base font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
          <Parag
            Paragraph={"100.000 تومان + 9.000 مالیات بر ارزش افزوده"}
            Pclass={
              "text-base font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
        </div>
        <div className="flex gap-2">
          <Parag
            Paragraph={"شارژ نهایی:"}
            Pclass={
              "text-base font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
          <Parag
            Paragraph={"1234.56 پیامک"}
            Pclass={
              "text-base font-normal text-[#151515] text-right mb-1 mt-[5px]"
            }
          />
        </div>
        <div className="grid w-full items-center">
          <Button_component
            ButtonClass={
              "w-full gap-2 text-sm mt-2 px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
            }
            onClick={() => navigate("/store/ChargeAccount")}
          >
            تکمیل پرداخت (به علاوۀ 9درصد ارزش افزوده)
          </Button_component>
          <NavLink to={`/store/ChargeAccount`}>
            <Button
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
                <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                داشبورد
              </span>
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DirectPayment;

// Types
interface CheckboxCustomStylesProps {
  Checked: boolean;
  OnChange: React.ChangeEventHandler<HTMLInputElement>;
}
