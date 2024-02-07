import React from "react";
import { Parag } from "./tools";
import { Input } from "./input";
import Button_component from "./Button";
import { appSlice, selectIsLastStep, useDispatch, useSelector } from "../../lib/redux";

export const SendPostalCode: React.FC = () => {
  const dispatch = useDispatch();
  const isLastStep = useSelector(selectIsLastStep);
  const handleNext = () => {
    !isLastStep && dispatch(appSlice.actions.setActiveStep(1));
  };
  return (
      <div className="flex flex-col gap-3.5 mt-5 mb-10 px-6 w-96">
        <Input
          Type={"text"}
          InputName={""}
          InputClass={
            "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          }
          Placeholder="کد پستی"
        />
        <div className="flex items-center gap-2">
          <Parag
            Paragraph={"تعداد شماره های فعال در محدودۀ وارد شده:"}
            Pclass={"text-sm text-gray-600 text-right font-normal sm:text-xs"}
          />
          <div className="sm:text-xs sm:px-1 bg-blue-500 text-white flex py-1 px-3 items-start gap-10 rounded-lg">
            123
          </div>
        </div>
        <Input
          Type={"text"}
          InputName={""}
          InputClass={
            "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          }
          Placeholder="تعداد ارسال"
        />
        <Button_component
          onClick={handleNext}
          children={"تایید و ورود به مرحلۀ بعد"}
          ButtonClass={
            "flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"
          }
        />
      </div>
  );
};