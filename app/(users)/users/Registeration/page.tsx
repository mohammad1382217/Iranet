import React from "react";
import * as yup from "yup";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { H1Title, Parag } from "../../../components/tools";
import Textarea from "../../../components/TextArea";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import {
  appSlice,
  fetchStoreTextsThunk,
  fetchAddStoreThunk,
  selectAccount,
  selectSelectedItems,
  selectShowModals,
  useDispatch,
  useSelector,
  fetchAccountDataThunk,
} from "../../../../lib/redux";

const Select = React.lazy(() => import("antd/es/select/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));

const validationSchema = yup.object().shape({
  name: yup.string().required("وارد کردن نام فروشگاه الزامی می باشد."),
  phone: yup
    .string()
    .required("وارد کردن تلفن الزامی می باشد.")
    .matches(/^0\d{10}$/, "تلفن را درست وارد کنید"),
  address: yup.string().required("وارد کردن آدرس فروشگاه الزامی می باشد."),
  postal_code: yup
    .string()
    .required("وارد کردن کدپستی فروشگاه الزامی می باشد.")
    .matches(/(?<!\d)\d{10}(?!\d)$/, "کد پستی 10 رقمی را درست وارد کنید"),
  guild: yup.string().required("وارد کردن صنف فروشگاه الزامی می باشد."),
});

const validationTextsSchema = yup.object().shape({
  welcome_message: yup
    .string()
    .required("وارد کردن متن پیامک خوش آمد گویی الزامی است."),
  default_group_message: yup
    .string()
    .required("وارد کردن متن پیامک پیشفرض الزامی است."),
});

const Registeration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(fetchAccountDataThunk())
  }, [dispatch])
  

  const STATUS = {
    NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
    REGISTERED: "REGISTERED",
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    REJECTED: "REJECTED",
  };

  const account = useSelector(selectAccount);
  let status = STATUS.NOT_AUTHENTICATED;
  if (account?.verified) {
    if (account?.store.store_status === "") {
      status = STATUS.REGISTERED;
    } else if (account?.store.store_status === "P") {
      status = STATUS.PENDING;
    } else if (account?.store.store_status === "D") {
      status = STATUS.REJECTED;
    } else if (account?.store.store_status === "A") {
      status = STATUS.CONFIRMED;
    }
  }

  const renderContent: React.FC = () => {
    switch (status) {
      case STATUS.NOT_AUTHENTICATED:
        return (
          <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 ">
            <h1 className="text-[#E53935] text-3xl font-bold text-center">
              هویت شما احراز نشده است
            </h1>
            <p lang="fa" role="text" className="text-gray-600 text-center">
              {" "}
              جهت ثبت فروشگاه، ابتدا مراحل احراز هویت خود را انجام دهید.
            </p>
          </div>
        );
      case STATUS.REGISTERED:
        return (
          <Formik
            initialValues={{
              name: "",
              phone: "",
              address: "",
              postal_code: "",
              guild: "",
            }}
            onSubmit={(values) => {
              // Handle form submission
              if (values) {
                console.log("Final form values:", values);
                dispatch(fetchAddStoreThunk(values));
                showModalHandler();
              }
              // You can perform further actions with the form values here
            }}
            validationSchema={validationSchema}
          >
            {({ handleChange, setFieldValue, values }) => (
              <Form className="flex flex-col items-center justify-center bg-white w-[381px] sm-max:w-[320px] rounded-lg p-6 mt-20 mx-auto h-[calc(100vh-57px)]">
                <div>
                  <H1Title
                    BoldTitle={"درخواست ثبت فروشگاه"}
                    H1class={"h-9 text-2xl text-right font-semibold"}
                  />
                  <Parag
                    Pclass="text-[0.94rem] font-normal text-[#757575] "
                    Paragraph="جهت عضویت در باشگاه مشتریان ایرانت، اطلاعات خواسته شده را وارد کنید."
                  />
                </div>
                <div className="pt-3 grid gap-3">
                  <Field
                    placeholder="نام فروشگاه"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="آدرس فروشگاه"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="کد پستی"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="postal_code"
                    value={values.postal_code}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="postal_code"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="تلفن"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field name="guild">
                    {({ field }: FieldProps) => (
                      <Select
                        {...field}
                        placeholder="انتخاب صنف"
                        value={selectedItems === "" ? null : selectedItems}
                        size="large"
                        className="placeholder:text-sm appearance-none block w-full !text-sm font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                        onChange={(value: unknown) => {
                          handleChange(value);
                          handleSelectChange(value as string);
                          setFieldValue("guild", value as number);
                        }}
                        options={departments?.map((item) => ({
                          value: item.department_name,
                          label: item.department_name,
                        }))}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="guild"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grid gap-4">
                  <ButtonComponent
                    Type="submit"
                    ButtonClass="bg-secondary w-full mx-auto mt-4 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                    children="ثبت درخواست"
                  />
                </div>
                <Modal
                  modalClass="!min-w-[28%] sm-max:!min-w-[90%] mb-2 scroll-auto"
                  modalHeaderClass="flex justify-center items-center mx-auto"
                  modalHeader={"درخواست شما با موفقیت ثبت شد"}
                  modalBody={
                    "جهت ادامه عضویت، منتظر تایید ادمین باشید. وضعیت تایید یا عدم تایید فروشگاه شما، با پیامک اطلاع رسانی می‌گردد."
                  }
                  modalFooterClass="flex justify-center items-center"
                  modalFooter={
                    <>
                      <ButtonComponent
                        ButtonClass="bg-secondary text-white px-10"
                        onClick={() => {
                          showModalHandler();
                        }}
                      >
                        <span>تایید</span>
                      </ButtonComponent>
                    </>
                  }
                  Open={showModals.showModalOrigin}
                  HandleOpen={showModalHandler}
                />
              </Form>
            )}
          </Formik>
        );
      case STATUS.PENDING:
        return (
          <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 ">
            <h1 className="text-[#2DCEA2] text-3xl font-bold text-center">
              اطلاعات فروشگاه شما ثبت شد
            </h1>
            <p lang="fa" role="text" className="text-gray-600 text-center">
              برای تکمیل اطلاعات و ثبت نهایی در انتظار تایید ادمین بمانید
            </p>
          </div>
        );
      case STATUS.CONFIRMED:
        return (
          <Formik
            initialValues={{
              welcome_message: "",
              default_group_message: "",
            }}
            onSubmit={(values) => {
              // مدیریت ارسال فرم
              if (values) {
                console.log("Final form values:", values);
                dispatch(fetchStoreTextsThunk(values));
                navigate("/store/Dashboard");
                showModalWelcomeHandler();
              }
              // می‌توانید اقدامات بیشتری با مقادیر فرم انجام دهید
            }}
            validationSchema={validationTextsSchema}
          >
            {({ handleChange }) => (
              <Form className="flex flex-col items-center justify-center w-[381px] sm-max:w-[320px] rounded-lg p-6 mx-auto h-[calc(100vh-57px)]">
                <section className="w-full">
                  <H1Title
                    BoldTitle={"اطلاعات فروشگاه شما تایید شد"}
                    H1class={
                      "h-9 text-2xl text-right font-semibold text-[#2DCEA2]"
                    }
                  />
                  <Parag
                    Pclass="text-[0.94rem] font-normal text-[#757575]"
                    Paragraph="جهت عضویت در باشگاه مشتریان ایرانت، اطلاعات خواسته شده را وارد کنید."
                  />
                </section>
                <section className="w-full grid gap-3 mt-8">
                  <Field name="default_group_message">
                    {({ field }: FieldProps) => (
                      <Textarea
                        {...field}
                        Placeholder="متن پیامک گروه پیشفرض"
                        Name="default_group_message"
                        ShowCount={false}
                        TextAreaClass="!h-36 pt-3 pr-5"
                        MaxLength={100}
                        onChange={handleChange}
                      />
                    )}
                  </Field>
                  <Field name="welcome_message">
                    {({ field }: FieldProps) => (
                      <Textarea
                        {...field}
                        Placeholder="متن پیامک خوش‌آمد گویی"
                        Name="welcome_message"
                        ShowCount={false}
                        TextAreaClass="!h-36 pt-3 pr-5"
                        MaxLength={100}
                        onChange={handleChange}
                      />
                    )}
                  </Field>
                </section>
                <ButtonComponent
                  Type="submit"
                  ButtonClass="bg-secondary w-full mx-auto mt-6 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                >
                  ورود به پنل مدیریت فروشگاه
                </ButtonComponent>
               
              </Form>
            )}
          </Formik>
        );
      case STATUS.REJECTED:
        return (
          <div>
            <H1Title
              BoldTitle={"اطلاعات فروشگاه شما تایید نشد"}
              H1class={"h-9 text-2xl text-right font-semibold text-[#E53935]"}
            />
            <Parag
              Pclass="text-[0.94rem] font-normal text-[#757575]"
              Paragraph="جهت عضویت در باشگاه مشتریان ایرانت، اطلاعات خواسته شده را وارد کنید."
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSelectChange = (value: string | string[]) => {
    dispatch(appSlice.actions.setSelectedItems(value as string));
  };

  const showModals = useSelector(selectShowModals);
  const showModalHandler = () =>
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
  const showModalWelcomeHandler = () =>
    dispatch(appSlice.actions.setShowModals("showModalWelcome"));
  const selectedItems = useSelector(selectSelectedItems);
  // const departments = useSelector(selectDepartments);
  const departments = [
    {
      department_id: 1,
      department_name: "پوشاک",
    },
  ];

  return <>{renderContent({})}</>;
};

export default Registeration;

// types
export type texts = {
  default_group_message: string;
  welcome_message: string;
};
