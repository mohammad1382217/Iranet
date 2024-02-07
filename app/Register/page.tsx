import {
  useDispatch,
  appSlice,
  logins,
  loginSlice,
  useSelector,
  selectLogin,
  selectShowModal,
} from "../../lib/redux";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import { Link, useNavigate } from "react-router-dom";
import { H1Title, Parag } from "../components/tools";
import Button_component from "../components/Button";
import loginBg from "../assets/images/login-bg.png";
import { Button, Typography } from "@material-tailwind/react";
import Select from "../components/select";
import Modal from "../components/Modal";
import { hash } from "../Login/page";
import * as yup from "yup";
import React from "react";
import { IoEllipseOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../api/apiConfig";

export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const validateIranianNationalCode = (nationalCode: string): boolean => {
  if (/^[0-9]{10}$/.test(nationalCode)) {
    const check = parseInt(nationalCode[9]);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(nationalCode[i]) * (10 - i);
    }
    const reminder = sum % 11;

    if (
      (reminder < 2 && check === reminder) ||
      (reminder >= 2 && check === 11 - reminder)
    ) {
      return true;
    }
  }
  return false;
};

const validationSchema = yup.object().shape({
  store_name: yup.string().required("وارد کردن عنوان فروشگاه الزامی می باشد."),
  owner_name: yup.string().required("وارد کردن نام مالک الزامی می باشد."),
  owner_nid: yup
    .string()
    .required("وارد کردن کدملی الزامی می باشد.")
    .test(
      "validateIranianNationalCode",
      " کد ملی معتبر نمی باشد.",
      validateIranianNationalCode
    ),
  owner_birthdate: yup
    .string()
    .required("وارد کردن تاریخ تولد الزامی می باشد."),
  owner_phone: yup
    .string()
    .required("وارد کردن شماره تماس الزامی می باشد.")
    .matches(/((0?9)|(\+?989))\d{9}/g, "شماره تلفن را درست وارد کنید"),
  store_phone: yup.string().required("وارد کردن تلفن محل کار الزامی می باشد."),
  store_address: yup
    .string()
    .required("وارد کردن آدرس فروشگاه الزامی می باشد."),
  store_post_code: yup
    .string()
    .required("وارد کردن کدپستی فروشگاه الزامی می باشد.")
    .matches(/(?<!\d)\d{10}(?!\d)$/, "کد پستی 10 رقمی را درست وارد کنید"),
  store_password: yup
    .string()
    .required("وارد کردن رمز عبور فروشگاه الزامی می باشد.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "پسورد باید حداقل ۸ کاراکتر و شامل حروف و اعداد باشد."
    ),
  store_department: yup
    .string()
    .required("وارد کردن صنف فروشگاه الزامی می باشد."),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const showModal = useSelector(selectShowModal);
  const showModalHandler = () => dispatch(appSlice.actions.setShowModal());

  return (
    <div
      className="flex flex-col justify-end items-center w-screen min-h-screen m-auto !overflow-auto gap-20"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={login}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
            showModalHandler();
          }
          console.log("Final form values:", values);
          const handlePostRegister = async () => {
            try {
              const response = await axios.post(`${BASE_URL}register`, values);
              const data = response.data;
              // dispatch(setLoginData([...LoginData, data]));
            } catch (error: any) {
              if (error.response) {
                console.log(error.message);
              }
            }
          };
          handlePostRegister();
          // You can perform further actions with the form values here
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, values, setFieldValue }) => (
          <div className="flex flex-col justify-center items-end rounded-lg p-6 bg-white mx-auto mt-28">
            <Form
              className="flex flex-col justify-center items-center"
              action=""
            >
              <div className="max-w-sm w-full">
                <div>
                  <div className="mt-10">
                    <H1Title
                      BoldTitle={"ساخت حساب کاربری جدید"}
                      H1class={
                        "h-9 w-[16.5rem] text-2xl text-right font-semibold"
                      }
                    />
                  </div>
                  <div>
                    <Parag
                      Paragraph={
                        "برای ساخت حساب جدید، اطلاعات خود را وارد کنید."
                      }
                      Pclass={"text-base text-gray-600 text-right font-normal"}
                    />
                  </div>
                </div>
                <div className="py-8 grid gap-3">
                  <Field
                    placeholder="عنوان فروشگاه"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="store_name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="store_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="نام مالک"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="owner_name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="owner_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="کد ملی"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="owner_nid"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="owner_nid"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field name="owner_birthdate">
                    {({ field }: FieldProps) => (
                      <DatePicker
                        {...field}
                        weekDays={weekDays}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        inputClass="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        id="BirthdayDate"
                        placeholder="تاریخ تولد"
                        format="YYYY/MM/DD" // Set the date format as needed
                        onChange={(date: DateObject | DateObject[] | null) => {
                          if (date instanceof DateObject) {
                            setFieldValue(
                              "owner_birthdate",
                              date
                                .convert(persian, persian_fa)
                                .format()
                                .toString()
                            );
                            dispatch(
                              loginSlice.actions.setLogin({
                                key: "owner_birthdate",
                                value: date
                                  .convert(persian, persian_fa)
                                  .format()
                                  .toString(),
                              })
                            );
                          }
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="owner_birthdate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="شماره تماس"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="owner_phone"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="owner_phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="تلفن محل کار"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="store_phone"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="store_phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="آدرس فروشگاه"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="store_address"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="store_address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="کد پستی"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="store_post_code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="store_post_code"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Select
                    options={["لباس فروشی", "نانوایی", "سوپرمارکتی"]}
                    Selectclass={
                      "appearance-none block w-full py-2.5 px-3 text-sm font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                    }
                    SelectName={"store_department"}
                    SelectOnChange={(
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: value,
                        })
                      );
                    }}
                    DefaultValue={""}
                    oneOptionText={"انتخاب صنف"}
                  />
                  <ErrorMessage
                    name="store_department"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="رمز عبور"
                    type="password"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="store_password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setLogin({
                          key: name as keyof logins,
                          value: hash(e),
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="store_password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grid gap-4 mb-10">
                  <Button_component
                    Type="submit"
                    children={"ساخت حساب"}
                    ButtonClass={
                      "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                    }
                  />
                  <div className="flex items-center justify-center">
                    <Parag
                      Paragraph={"در حال حاضر حساب کاربری دارد؟"}
                      Pclass={"text-sm font-medium text-gray-600"}
                    />
                    <Link to={"/Login"}>
                      <Parag
                        Paragraph={"وارد شوید"}
                        Pclass={
                          "text-sm font-medium text-[#151515] mx-1 font-medium"
                        }
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <Modal
                // modalClass="p-6"
                modalHeader={"اطلاعات با موفقیت ثبت شد"}
                modalBody={
                  "پس از بررسی و تایید اطلاعات ، پیام فعال سازی برای حساب شما ارسال میگردد."
                }
                modalFooterClass="flex justify-between items-center"
                modalFooter={
                  <>
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={() => {
                        showModalHandler();
                        navigate("/store/Supplementaryform");
                      }}
                    >
                      <span>تایید</span>
                    </Button>
                    <Button
                      variant="text"
                      color="red"
                      onClick={showModalHandler}
                      className="mr-1"
                    >
                      <span>لغو</span>
                    </Button>
                  </>
                }
                Open={showModal}
                HandleOpen={showModalHandler}
              />
            </Form>
          </div>
        )}
      </Formik>
      <section className="flex justify-center items-center text-secondary gap-4 mb-10 mx-auto">
        <IoEllipseOutline className="w-7 h-7 stroke-[3px]" />
        <Typography className="text-4xl font-normal">ایرانت</Typography>
      </section>
    </div>
  );
};

export default Register;