import React from "react";
import { HiUser, HiDocumentText, HiCheckCircle } from "react-icons/hi";
import Stepper from "@material-tailwind/react/components/Stepper";
import Step from "@material-tailwind/react/components/Stepper";
import Progress from "@material-tailwind/react/components/Progress";
const Typography = React.lazy(
  () => import("@material-tailwind/react/components/Typography/index")
);

import {
  appSlice,
  selectActiveStep,
  SurveySlice,
  useDispatch,
  useSelector,
} from "../../../lib/redux";

const StepperAddAudience: React.FC = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(selectActiveStep);
  return (
    <div className=" mt-10 sm-max:px-10">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => dispatch(appSlice.actions.setIsLastStep(value))}
        isFirstStep={(value) =>
          dispatch(appSlice.actions.setIsFirstStep(value))
        }
      >
        <Step
          className={
            "!rounded w-8 h-8 cursor-pointer bg-blue-gray-100 text-white justify-center" +
            (activeStep === 0 ? " bg-gray-900" : "")
          }
          onClick={() => dispatch(SurveySlice.actions.setActiveStep(0))}
        >
          <HiUser className="w-[19px] h-[1.125rem] text-white" />
          <div className="absolute -bottom-[2.5rem] md-max:-bottom-8 w-max text-center">
            <Typography
              variant="h4"
              className="md-max:text-sm"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              اطلاعات اولیه{" "}
            </Typography>
          </div>
        </Step>
        <Progress
          className="w-24 h-1 sm-max:w-12"
          value={activeStep === 1 ? 100 : 0}
          size="sm"
        />
        <Step
          className={
            "!rounded w-8 h-8 cursor-pointer bg-blue-gray-100 text-white justify-center" +
            (activeStep === 1 ? " bg-gray-900" : "")
          }
          onClick={() =>
            activeStep >= 1 && dispatch(SurveySlice.actions.setActiveStep(1))
          }
        >
          <HiDocumentText className="w-[19px] h-[1.125rem] text-white" />
          <div className="absolute -bottom-[2.5rem] md-max:-bottom-8 w-max text-center">
            <Typography
              variant="h4"
              className="md-max:text-sm"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              اطلاعات تکمیلی{" "}
            </Typography>
          </div>
        </Step>
        <Progress
          className="w-24 h-1 sm-max:w-12"
          value={activeStep === 2 ? 100 : 0}
          size="sm"
        />
        <Step
          className={
            "!rounded w-8 h-8 cursor-pointer bg-blue-gray-100 text-white justify-center" +
            (activeStep === 2 ? " bg-gray-900" : "")
          }
          onClick={() =>
            activeStep >= 2 && dispatch(SurveySlice.actions.setActiveStep(2))
          }
        >
          <HiCheckCircle className="w-[19px] h-[1.125rem] text-white" />
          <div className="absolute -bottom-[2.5rem] md-max:-bottom-8 w-max text-center">
            <Typography
              variant="h4"
              className="md-max:text-sm"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              ثبت نهایی
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default StepperAddAudience;
