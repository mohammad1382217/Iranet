import React from "react";
import Modal from "../../components/Modal";
import StepperAddAudience from "./stepper";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import {
  appSlice,
  selectActiveStep,
  selectSelectedItems,
  selectShowModals,
  SurveySlice,
  useDispatch,
  useSelector,
} from "../../../lib/redux";

const Input = React.lazy(() => import( "antd/es/input/index"));
const Select = React.lazy(() => import("antd/es/select/index"));
const Button = React.lazy(() => import( "antd/es/button/index"));

const AddAudience: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeStep = useSelector(selectActiveStep);
  const selectedItems = useSelector(selectSelectedItems);
  const showModals = useSelector(selectShowModals);

  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   dispatch(groupsSlice.actions.settextmessage(e.target.value));
  // };

  const handleSelectedItemsChange = (selectedItems: string) => {
    dispatch(appSlice.actions.setSelectedItems(selectedItems));
  };

  const goDashboard = () => {
    navigate("/store/Dashboard");
  };

  const showModalHandler = () => dispatch(appSlice.actions.setShowModals("showModalOrigin"));

  return (
    <>
      <div className="max-w-lg mx-auto my-10 mt-20">
        <StepperAddAudience />
      </div>
      <div className="flex flex-col items-center h-auto max-w-2xl mx-auto mt-20 ">
        {activeStep === 0 ? (
          <div className="flex flex-col w-96 gap-5 p-4 sm-max:px-10">
            <p lang="fa" role="text" className="text-textColor font-semibold text-2xl flex flex-col">
              اطلاعات اولیه{" "}
              <span className="text-[#757575] text-base font-normal mt-1">
                شماره تماس و گروه بندی مخاطب را وارد کنید
              </span>
            </p>

            <Input
              type={"text"}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              }
              placeholder="شماره تماس"
              disabled={false}
            />
            <Select
              className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
              size="large"
              value={selectedItems === "" ? null : (selectedItems as string)}
              placeholder="گروه"
              defaultValue={selectedItems as string}
              onChange={() => handleSelectedItemsChange}
              style={{}}
              options={[].map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <ButtonComponent
              onClick={() => {
                // dispatch(appSlice.actions.setShowModals("showModalOrigin"));
                dispatch(SurveySlice.actions.setActiveStep(1));
              }}
              ButtonClass={
                "bg-secondary w-full mx-auto text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              }
            >
              تایید و ورود به مرحلۀ بعد{" "}
            </ButtonComponent>
            <Link to="/store/dashboard">
              <Button
                type="link"
                onClick={() => dispatch(SurveySlice.actions.setActiveStep(0))}
                className="flex items-center justify-center mx-auto"
                icon={
                  <ArrowRightCircleIcon
                    color="#E53935"
                    strokeWidth={2.5}
                    className={"h-3.5 w-3.5 mx-auto"}
                  />
                }
              >
                <div className="text-sm text-textColor font-medium ">
                  <span className="text-[#757575]"> لغو عملیات و </span>
                  <span className="text-sm text-textColor font-medium ">
                    برگشت به داشبورد
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col w-96 gap-5 p-4 sm-max:px-10">
            <p lang="fa" role="text" className="text-textColor font-semibold text-2xl flex flex-col">
              اطلاعات تکمیلی{" "}
            </p>

            <Input
              type={"text"}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              }
              placeholder="متن پیشفرض"
              disabled={false}
            />
            <Input
              type={"text"}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              }
              placeholder="متن پیشفرض"
              disabled={false}
            />
            <Input
              type={"text"}
              name={""}
              className={
                "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              }
              placeholder="متن پیشفرض"
              disabled={false}
            />

            <ButtonComponent
              onClick={() => {
                dispatch(appSlice.actions.setShowModals("showModalOrigin"));
                dispatch(SurveySlice.actions.setActiveStep(2));
              }}
              ButtonClass={
                "bg-secondary w-full mx-auto text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              }
            >
              ثبت مخاطب{" "}
            </ButtonComponent>
            <Link to="/store/dashboard">
              <Button
                type="link"
                onClick={() => dispatch(SurveySlice.actions.setActiveStep(0))}
                className="flex items-center justify-center mx-auto"
                icon={
                  <ArrowRightCircleIcon
                    color="#E53935"
                    strokeWidth={2.5}
                    className={"h-3.5 w-3.5 mx-auto"}
                  />
                }
              >
                <div className="text-sm text-textColor font-medium ">
                  <span className="text-[#757575]"> لغو عملیات و </span>
                  <span className="text-sm text-textColor font-medium ">
                    برگشت به داشبورد
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        )}
        <Modal
          modalClass="!min-w-[25%] sm-max:!min-w-[90%] px-5 p-0"
          modalHeader={"اطلاعات با موفقیت ثبت شد"}
          modalHeaderClass="flex justify-start text-right pb-0"
          modalBody={
            <div className="flex justify-start">
              مخاطب به دفترچۀ مورد نظر اضافه گردید
            </div>
          }
          modalFooterClass="flex justify-between items-center"
          modalFooter={
            <div className="w-full flex justify-center">
              <ButtonComponent
                onClick={() => {
                  showModalHandler();
                  dispatch(SurveySlice.actions.setActiveStep(0));
                  goDashboard();
                }}
                ButtonClass="bg-[#2DCEA2] text-xs font-bold h-11 flex items-center justify-center"
              >
                تایید
              </ButtonComponent>
            </div>
          }
          Open={showModals.showModalOrigin}
          HandleOpen={showModalHandler}
        />
      </div>
    </>
  );
};

export default AddAudience;