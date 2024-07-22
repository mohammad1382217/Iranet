import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { weekDays } from "../../../../Register/page";
import { H1Title, Parag } from "../../../../components/tools";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import DatePicker, { DateObject } from "react-multi-date-picker";
import StepperWithContent from "../../../../components/stepper/stepper";
import {
  HiOutlineArrowCircleRight,
  HiOutlineDocumentDuplicate,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import {
  appSlice,
  fetchAddSurveyOptionsThunk,
  fetchAddSurveyThunk,
  fetchDeleteSurveyOptionsThunk,
  fetchSurveyOptionsThunk,
  selectActiveStep,
  selectShowModals,
  selectSurveyOptions,
  selectUuid,
  SurveySlice,
  useDispatch,
  useSelector,
} from "../../../../../lib/redux";
import { Form, Formik } from "formik";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from "moment-jalaali";

const Input = React.lazy(() => import("antd/es/input/index"));
const Modal = React.lazy(() => import("../../../../components/Modal"));
const Textarea = React.lazy(() => import("../../../../components/TextArea"));
const ButtonComponent = React.lazy(
  () => import("../../../../components/Button")
);

const AddSurvey: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModals = useSelector(selectShowModals);
  const uuid = useSelector(selectUuid);
  const surveyOptions = useSelector(selectSurveyOptions);

  const showModalHandler = (name: string) => {
    dispatch(appSlice.actions.setShowModals(name));
  };

  const handleCreateSurvey = () => {
    showModalHandler("showModalConfirmSurvey");
    dispatch(SurveySlice.actions.setActiveStep(2));
  };

  const handleDelete = async (id: number) => {
    await dispatch(fetchDeleteSurveyOptionsThunk({ uuid, id }));
    await dispatch(fetchSurveyOptionsThunk({ uuid }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://front-irannet.liara.run/store/SurveyView/${uuid}`).then(() => {
      alert("متن با موفقیت کپی شد!");
    }).catch((err) => {
      console.error("خطا در کپی کردن متن: ", err);
    });
  };

  const activeStep = useSelector(selectActiveStep);

  return (
    <section className="flex flex-col gap-24 px-6">
      <div className="w-full flex max-w-lg mx-auto">
        <StepperWithContent />
      </div>
      {activeStep === 0 ? (
        <Formik
          initialValues={{
            title: "",
            text: "",
            start_time: "",
            end_time: "",
          }}
          onSubmit={(values) => {
            // Handle form submission
            if (values) {
              console.log("Final form values:", values);
              dispatch(fetchAddSurveyThunk(values));
            }
            // You can perform further actions with the form values here
          }}
        >
          {({ handleChange, setFieldValue }) => (
            <Form className="w-full flex flex-col min-h-screen items-center max-w-lg self-center">
              <p
                lang="fa"
                role="text"
                className="text-2xl p-1 text-right self-start font-semibold sm-max:text-base text-textColor"
              >
                فرم ایجاد نظرسنجی و مسابقه
              </p>
              <Input
                name="title"
                onChange={handleChange}
                placeholder="عنوان نظرسنجی"
                className="mt-5 h-10"
              />
              <Textarea
                Name="text"
                ShowCount={true}
                TextAreaClass="mt-3 h-44"
                MaxLength={100}
                onChange={handleChange}
                Placeholder="متن نظرسنجی"
              />
              <DatePicker
                name="start_time"
                format="HH:mm:ss YYYY/MM/DD"
                onChange={(date: DateObject | DateObject[] | null) => {
                  if (date instanceof DateObject) {
                    setFieldValue(
                      "start_time",
                      moment(
                        date
                          .convert(persian, persian_en)
                          .format("YYYY-MM-DD HH:mm:ss")
                          .toString(),
                        "jYYYY/jMM/jDD HH:mm:ss"
                      )
                        .format("YYYY-MM-DD HH:mm:ss")
                        .toString()
                    );
                  }
                }}
                weekDays={weekDays}
                className="custom-calendar"
                calendar={persian}
                locale={persian_fa}
                inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-3"
                placeholder="تاریخ و ساعت شروع"
                plugins={[<TimePicker position="bottom" />]}
              />
              <DatePicker
                name="end_time"
                format="HH:mm:ss YYYY/MM/DD"
                onChange={(date: DateObject | DateObject[] | null) => {
                  if (date instanceof DateObject) {
                    setFieldValue(
                      "end_time",
                      moment(
                        date
                          .convert(persian, persian_en)
                          .format("YYYY-MM-DD HH:mm:ss")
                          .toString(),
                        "jYYYY/jMM/jDD HH:mm:ss"
                      )
                        .format("YYYY-MM-DD HH:mm:ss")
                        .toString()
                    );
                  }
                }}
                weekDays={weekDays}
                className="custom-calendar"
                calendar={persian}
                locale={persian_fa}
                inputClass="outline-0 w-full mt-5 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
                placeholder="تاریخ و ساعت پایان"
                plugins={[<TimePicker position="bottom" />]}
              />
              <ButtonComponent
                Type="submit"
                disabled={false}
                ButtonClass="bg-secondary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
              >
                ایجاد نظرسنجی
              </ButtonComponent>
              <Link to="/store/Survey" className="w-full">
                <ButtonComponent
                  onClick={() => {
                    dispatch(SurveySlice.actions.setActiveStep(0));
                  }}
                  ButtonClass="flex items-center justify-center mt-1 mx-auto bg-white shadow-none hover:shadow-none"
                >
                  <div className="flex items-center gap-2 text-sm text-textColor font-medium">
                    <HiOutlineArrowCircleRight
                      className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                    />
                    <div>
                      <span className="text-[#757575]">لغو عملیات و</span> برگشت
                      به داشبورد
                    </div>
                  </div>
                </ButtonComponent>
              </Link>
            </Form>
          )}
        </Formik>
      ) : (
        <section className="w-full max-w-lg self-center">
          <Formik
            initialValues={{
              title: "",
            }}
            onSubmit={(values) => {
              // Handle form submission
              if (values) {
                console.log("Final form values:", values);
                dispatch(
                  fetchAddSurveyOptionsThunk({ uuid, title: values.title })
                ).unwrap();
              }
              // You can perform further actions with the form values here
            }}
          >
            {({ handleChange }) => (
              <>
                <H1Title
                  BoldTitle={"گزینه های نظرسنجی و مسابقه"}
                  H1class={"h-9 text-2xl text-right font-semibold"}
                />
                <Form className="w-full flex flex-row items-center justify-between">
                  <Input
                    onChange={handleChange}
                    placeholder="متن گزینه ها"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block !w-full py-3 pr-4 mt-5"
                    name="title"
                  />
                  <ButtonComponent
                    Type="submit"
                    ButtonClass="border border-gray-300 rounded-lg mr-3.5 p-3 mt-5 bg-white"
                  >
                    <FaPlus className="h-3 w-3 text-blue-gray-300" />
                  </ButtonComponent>
                </Form>
              </>
            )}
          </Formik>
          <Parag
            Paragraph={"حداکثر تعداد گزینه ها، 10 عدد می‌باشد"}
            Pclass={"mt-2.5 text-sm font-normal text-blue-gray-400 self-start"}
          />

          {surveyOptions?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-2 text-textColor w-full mt-3.5"
            >
              <Parag Paragraph={`${index + 1} .`} Pclass={""}></Parag>
              <Parag Paragraph={item.title} Pclass="flex-grow" />
              <HiOutlineMinusCircle
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          ))}
          <ButtonComponent
            disabled={false}
            ButtonClass="bg-secondary w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
            onClick={handleCreateSurvey}
          >
            ایجاد نظرسنجی
          </ButtonComponent>
          <Link to="/store/Survey" className="w-full">
            <ButtonComponent
              onClick={() => {
                dispatch(SurveySlice.actions.setActiveStep(0));
              }}
              ButtonClass="flex items-center justify-center mt-1 mx-auto bg-white shadow-none hover:shadow-none"
            >
              <div className="flex items-center gap-2 text-sm text-textColor font-medium">
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
                <div>
                  <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                  داشبورد
                </div>
              </div>
            </ButtonComponent>
          </Link>
        </section>
      )}
      <Modal
        modalClass="sm-max:!min-w-[90%] !min-w-[30%]"
        modalHeaderClass="flex flex-row justify-between"
        modalHeader={
          <>
            <h3 className="text-2xl font-semibold text-gray-900">
              نظرسنجی با موفقیت ثبت شد
            </h3>
          </>
        }
        modalBody={
          <>
            <Parag
              Paragraph={"لینک صفحۀ عمومی شرکت در نظرسنجی:"}
              Pclass={"text-base font-normal text-blue-gray-500 mb-4"}
            />
            <div className="container flex items-center gap-3">
              <ButtonComponent
                ButtonClass={
                  "flex shrink-0 items-center justify-center h-8 sm-max:!p-3 bg-white border border-blue-gray-100 text-xs font-bold h-full"
                }
                onClick={handleCopy}
              >
                <HiOutlineDocumentDuplicate className="w-5 h-5 text-blue-gray-300" />
              </ButtonComponent>
              <Input
                style={{ direction: 'ltr', textAlign: 'left' }}
                placeholder={`https://front-irannet.liara.run/store/SurveyView/${uuid}`}
                className="flex items-center justify-center gap-2.5 flex-grow rounded-lg border-blue-gray-100 h-full py-3 pl-3 pr-1.5 placeholder:leading-tight placeholder:text-sm placeholder:font-normal placeholder:text-blue-gray-300 cursor-auto"
                readOnly
              />
            </div>
          </>
        }
        modalFooter={
          <div className="w-full flex gap-4">
            <ButtonComponent
              onClick={() => navigate(`/store/SurveyView/${uuid}`)}
              ButtonClass="w-full bg-white text-xs font-bold text-black h-10 flex items-center justify-center border border-[#2DCEA2]"
            >
              مشاهده نظرسنجی
            </ButtonComponent>
            <Link to="/store/Survey" className="w-full">
              <ButtonComponent
                onClick={() => {
                  showModalHandler("showModalConfirmSurvey");
                  dispatch(SurveySlice.actions.setActiveStep(0));
                }}
                ButtonClass="bg-secondary text-xs font-bold text-white h-10 flex items-center justify-center w-48"
              >
                برگشت به داشبورد
              </ButtonComponent>
            </Link>
          </div>
        }
        modalFooterClass="flex items-center justify-center"
        Open={showModals.showModalConfirmSurvey}
        HandleOpen={() => showModalHandler("showModalConfirmSurvey")}
      />
    </section>
  );
};

export default AddSurvey;
