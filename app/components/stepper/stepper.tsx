import "./stepper.scss";
import React from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { HiDocumentText, HiCheckCircle } from "react-icons/hi";
import Stepper from "@material-tailwind/react/components/Stepper/index";
import Step from "@material-tailwind/react/components/Stepper/Step";
import Progress from "@material-tailwind/react/components/Progress/index";
import {
  appSlice,
  selectActiveStep,
  SurveySlice,
  useDispatch,
  useSelector,
} from "../../../lib/redux";
const Typography = React.lazy(() => import("@material-tailwind/react/components/Typography/index"));

const StepperWithContent: React.FC = () => {
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
          className={
            "!rounded w-8 h-8 cursor-pointer bg-blue-gray-100 text-white" +
            (activeStep === 0 ? " bg-gray-900" : "")
          }
          onClick={() => dispatch(SurveySlice.actions.setActiveStep(0))}
        >
          <HiInformationCircle className="w-[19px] h-[1.125rem]" />
          <div className="absolute -bottom-[2.5rem] md-max:-bottom-8 w-max text-center">
            <Typography
              variant="h4"
              className="md-max:text-sm"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              اطلاعات اولیه
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
            "!rounded w-8 h-8 cursor-pointer bg-blue-gray-100 text-white" +
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
              گزینه ها
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
            "!rounded w-8 h-8 cursor-pointer bg-blue-gray-100 text-white" +
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
              تایید نهایی
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default StepperWithContent;