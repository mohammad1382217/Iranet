import React from "react";
import Button_component from "./Button";
import Select from "./select";
import {
  appSlice,
  selectIsLastStep,
  useDispatch,
  useSelector,
} from "../../lib/redux";

export const NotePhone: React.FC = () => {
  const dispatch = useDispatch();
  const isLastStep = useSelector(selectIsLastStep);
  const handleNext = () => {
    !isLastStep && dispatch(appSlice.actions.setActiveStep(1));
  };

  return (
    <div className="flex flex-col gap-3.5 mt-5 mb-10 px-6 w-96">
      <Select
        options={[]}
        Selectclass={
          "appearance-none block w-full py-2.5 px-3 text-sm font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
        }
        DefaultValue={""}
        SelectName={""}
        SelectOnChange={() => {}}
        oneOptionText={"انتخاب دفترچه"}
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