import React, { ChangeEvent } from "react";
import Button_component from "../../../components/Button";
import { AccordionCustomIcon } from "../../../components/Accordion";
import { StepperWithContent } from "../../../components/stepper/stepper";
import { SendByNumberPhone } from "../../../components/SendByNumberPhone";
import { SendFile } from "../../../components/SendFile";
import { NotePhone } from "../../../components/NotePhone";
import { RegionAndCountry } from "../../../components/RegionAndCountry";
import { SendPostalCode } from "../../../components/SendPostalCode";
import { H1Title, Parag } from "../../../components/tools";
import Select from "../../../components/select";
import {
  appSlice,
  groupsSlice,
  selectActiveStep,
  selectInputTextMessage,
  selectShowModal,
  useDispatch,
  useSelector,
} from "../../../../lib/redux";
import { Input as MyInput } from "../../../components/input";
import { Button, Input } from "antd";
import { Button as ButtonMaterial } from "@material-tailwind/react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
const { TextArea } = Input;

const SendSms: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeStep = useSelector(selectActiveStep);
  const InputTextMessage = useSelector(selectInputTextMessage);
  const showModal = useSelector(selectShowModal);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(groupsSlice.actions.settextmessage(e.target.value));
  };

  const goDashboard = () => {
    navigate("/store/Dashboard");
  };

  const showModalHandler = () => dispatch(appSlice.actions.setShowModal());

  return (
    <>
      <div className="max-w-lg mx-auto">
        <StepperWithContent />
      </div>
      <div className="flex flex-col  items-center h-auto max-w-2xl mx-auto mt-20">
        {activeStep === 0 ? (
          <div className="flex flex-col w-full px-4 mb-5">
            <AccordionCustomIcon headerTitle={"ارسال با شماره"} Id={1}>
              <SendByNumberPhone />
            </AccordionCustomIcon>
            <AccordionCustomIcon headerTitle={"ارسال با فایل"} Id={2}>
              <SendFile />
            </AccordionCustomIcon>
            <AccordionCustomIcon headerTitle={"ارسال به دفترچه تلفن"} Id={3}>
              <NotePhone />
            </AccordionCustomIcon>
            <AccordionCustomIcon
              headerTitle={"ارسال بر اساس منطقه و کشور"}
              Id={4}
            >
              <RegionAndCountry />
            </AccordionCustomIcon>
            <AccordionCustomIcon headerTitle={"ارسال با کد پستی"} Id={5}>
              <SendPostalCode />
            </AccordionCustomIcon>
          </div>
        ) : (
          <div className="flex flex-col w-96 gap-8 p-4 ">
            <div className="">
              <H1Title
                BoldTitle={"اطلاعات پیامک"}
                H1class={"text-2xl font-semibold"}
              />
            </div>
            <div className="flex flex-col">
              <TextArea
                showCount
                className="h-44 !py-2 !px-1"
                maxLength={1000}
                value={InputTextMessage}
                onChange={handleChange}
                placeholder="متن پیامک"
              />
              <div className="flex my-1.5">
                <Parag
                  Paragraph={"حداکثر 1000 کاراکتر"}
                  Pclass={"text-sm font-normal"}
                />
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-row">
                  <div className="flex items-center justify-start gap-2 w-1/2">
                    <Parag
                      Paragraph={"تعداد کاراکتر ها:"}
                      Pclass={"text-base font-normal sm:text-xs"}
                    />
                    <div className="sm:text-xs bg-blue-500 text-white flex py-1 px-3 items-start gap-10 rounded-lg">
                      123
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-2 w-1/2">
                    <Parag
                      Paragraph={"تعداد پیامک:"}
                      Pclass={"text-base font-normal sm:text-xs"}
                    />
                    <div className="sm:text-xs bg-blue-500 text-white flex py-1 px-3 items-start gap-10 rounded-lg">
                      123
                    </div>
                  </div>
                </div>
                <MyInput
                  Type={"text"}
                  InputName={""}
                  InputClass={
                    "outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  }
                  Placeholder="تعداد شماره ها"
                  Disabled={false}
                />
                <Select
                  options={[]}
                  Selectclass={
                    "appearance-none block w-full py-2.5 px-3 text-sm font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                  }
                  DefaultValue={""}
                  SelectName={""}
                  SelectOnChange={() => {}}
                  oneOptionText={"نوع شمارۀ فرستنده"}
                />
                <div className="flex items-center justify-start gap-2 w-max">
                  <Parag
                    Paragraph={"هزینۀ ارسال پیامک:"}
                    Pclass={"text-base font-normal sm:text-xs"}
                  />
                  <div className="sm:text-xs bg-blue-500 text-white flex py-1 px-3 items-start gap-10 rounded-lg">
                    150.000 تومان
                  </div>
                </div>
                <Button_component
                  onClick={() => {
                    dispatch(appSlice.actions.setShowModal());
                    dispatch(appSlice.actions.setActiveStep(2));
                  }}
                  ButtonClass={
                    "bg-secondary w-full mx-auto mt-2 text-xs font-bold h-11 flex justify-center items-center"
                  }
                >
                  ثبت نهایی
                </Button_component>
                <Button
                  onClick={goDashboard}
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
                    <span className="text-[#757575]">لغو عملیات و</span> برگشت
                    به داشبورد
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
        <Modal
          modalHeader={"اطلاعات با موفقیت ثبت شد"}
          modalBody={
            "می‌تواند وضعیت ارسال را از بخش گزارشات ارسال، مشاهده نمایید."
          }
          modalFooterClass="flex justify-between items-center"
          modalFooter={
            <>
              <ButtonMaterial
                variant="gradient"
                color="green"
                onClick={() => {
                  showModalHandler();
                }}
              >
                <span>تایید</span>
              </ButtonMaterial>
              <ButtonMaterial
                variant="text"
                color="red"
                onClick={showModalHandler}
                className="mr-1"
              >
                <span>لغو</span>
              </ButtonMaterial>
            </>
          }
          Open={showModal}
          HandleOpen={showModalHandler}
        />
      </div>
    </>
  );
};

export default SendSms;
