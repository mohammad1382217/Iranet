import React from "react";
import { Stepper, Step, Typography, Progress } from "@material-tailwind/react";
import { HiUser, HiDocumentText, HiCheckCircle } from "react-icons/hi";
import {
  appSlice,
  selectActiveStep,
  useDispatch,
  useSelector,
} from "../../../lib/redux";
import "./stepper.scss";

export const StepperWithContent : React.FC = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(selectActiveStep);
  return (
    <div className="gap-6 inline-flex items-center justify-center w-full px-12 py-3 mt-10">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => dispatch(appSlice.actions.setIsLastStep(value))}
        isFirstStep={(value) =>
          dispatch(appSlice.actions.setIsFirstStep(value))
        }
      >
        <Step
          className={"!rounded w-8 h-8 cursor-pointer" + (activeStep === 0 ? " bg-gray-900 text-white" : "")}
          onClick={() => dispatch(appSlice.actions.setActiveStep(0))}
        >
          <HiUser className="w-[19px] h-[1.125rem]" />
          <div className="absolute -bottom-[2.5rem] md:-bottom-8 w-max text-center">
            <Typography
              variant="h6"
              className="md:text-sm"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              انتخاب مخاطبین
            </Typography>
          </div>
        </Step>
        <Progress
          className="w-24 h-1 sm:w-12"
          value={activeStep === 1 ? 100 : 0}
          size="sm"
        />
        <Step
          className={"!rounded w-8 h-8 cursor-pointer" + (activeStep === 1 ? " bg-gray-900 text-white" : "")}
          onClick={() => activeStep >= 1 && dispatch(appSlice.actions.setActiveStep(1))}
        >
          <HiDocumentText className="w-[19px] h-[1.125rem] text-white" />
          <div className="absolute -bottom-[2.5rem] md:-bottom-8 w-max text-center">
            <Typography
              variant="h6"
              className="md:text-sm"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              اطلاعات پیام
            </Typography>
          </div>
        </Step>
        <Progress
          className="w-24 h-1 sm:w-12"
          value={activeStep === 2 ? 100 : 0}
          size="sm"
        />
        <Step
          className={"!rounded w-8 h-8 cursor-pointer" + (activeStep === 2 ? " bg-gray-900 text-white" : "")}
          onClick={() => activeStep >= 2 && dispatch(appSlice.actions.setActiveStep(2))}
        >
          <HiCheckCircle className="w-[19px] h-[1.125rem] text-white" />
          <div className="absolute -bottom-[2.5rem] md:-bottom-8 w-max text-center">
            <Typography
              variant="h6"
              className="md:text-sm"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              تایید نهایی
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}