import React from "react";
import { Input } from "./input";
import { Button, Parag } from "./tools";
import Button_component from "./Button";
import { FaPlus } from "react-icons/fa";
import { HiOutlineMinusCircle } from "react-icons/hi";
import {
  useDispatch,
  useSelector,
  appSlice,
  selectIsLastStep,
  selectNotePhone,
} from "../../lib/redux";

export const SendByNumberPhone: React.FC = () => {
  const dispatch = useDispatch();
  const isLastStep = useSelector(selectIsLastStep);
  const NotePhone = useSelector(selectNotePhone);
  const handleNext = () => {
    !isLastStep && dispatch(appSlice.actions.setActiveStep(1));
  };

  const handleDelete = () => {};

  return (
    <div className="flex flex-col gap-3.5 mt-5 mb-10 px-6 w-96">
      <div className="inline-flex flex-col items-center justify-center gap-[5px]">
        <div className="w-full flex flex-row items-center justify-between">
          <Input
            Type={"text"}
            InputName={""}
            InputClass={
              "w-full outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4"
            }
            Placeholder={"شماره مخاطب"}
            InputOnChange={() => {}}
            Disabled={false}
          />
          <Button
            Type={"button"}
            ClassName={"border border-gray-300 rounded-lg mr-3.5 p-3 bg-white"}
            OnClick={() => {}}
          >
            <FaPlus className="h-3 w-3 text-blue-gray-300" />
          </Button>
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
            className="flex flex-row items-center justify-center gap-2 text-[#151515]"
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
      <Button_component
        onClick={handleNext}
        children={"تایید و ورود به مرحلۀ بعد"}
        ButtonClass={"flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"}
      />
    </div>
  );
};
