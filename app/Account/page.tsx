import { useRef } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { H1Title, Parag } from "../components/tools";
import Button_component from "../components/Button";
import {
  appSlice,
  loginSlice,
  logins,
  selectLogin,
  selectShowModal,
  selectSupplementaryForm,
  supplementaryform,
  useDispatch,
  useSelector,
} from "../../lib/redux";
import * as yup from "yup";
import Select from "../components/select";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import DatePicker from "react-multi-date-picker";
import { weekDays } from "../Register/page";
import { Checkbox } from "@material-tailwind/react";
import md5 from "md5";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import Modal from "../components/Modal";

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

const maxFileSize = 5 * 1024 * 1024;
const supportedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
const supportedGifTypes = ["image/gif"];

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
  default_group: yup.string().required("وارد کردن گروه پیشفرض الزامی است."),
  default_phonebook: yup
    .string()
    .required("وارد کردن دفترچه پیشفرض الزامی است."),
  store_logo: yup
    .mixed()
    .test("fileSize", "حجم فایل نباید بالای 5 مگابایت باشد.", (value) => {
      if (value) {
        return (value as File).size <= maxFileSize;
      }
      return true; // Pass the test if the value is not provided
    })
    .test("fileType", "فرمت فایل باید jpg یا jpeg یا png باشد.", (value) => {
      if (value) {
        return supportedFileTypes.includes((value as File).type);
      }
      return true; // Pass the test if the value is not provided
    }),
  store_ad: yup
    .mixed()
    .test("fileSize", "حجم فایل نباید بالای 5 مگابایت باشد.", (value) => {
      if (value) {
        return (value as File).size <= maxFileSize;
      }
      return true; // Pass the test if the value is not provided
    })
    .test("fileType", "فرمت فایل باید gif باشد.", (value) => {
      if (value) {
        return supportedGifTypes.includes((value as File).type);
      }
      return true; // Pass the test if the value is not provided
    }),
});

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(selectLogin);
  const supplementaryform = useSelector(selectSupplementaryForm);
  const InputStoreLogoRef = useRef<HTMLInputElement>(null);
  const InputStoreAdRef = useRef<HTMLInputElement>(null);

  const showModal = useSelector(selectShowModal);
  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModal());
  };

  const handleFileClickStoreLogo = () => {
    if (InputStoreLogoRef.current) {
      InputStoreLogoRef.current.click();
    }
  };
  const handleFileClickStoreAd = () => {
    if (InputStoreAdRef.current) {
      InputStoreAdRef.current.click();
    }
  };

  const hash = (e: React.ChangeEvent<HTMLInputElement>): string => {
    const PasswordPlus: string = e.target.value + "deraz konandeh";
    return md5(PasswordPlus);
  };

  return (
    <Formik
      initialValues={login}
      onSubmit={(values) => {
        // Handle form submission
        if (values) {
        }
        console.log("Final form values:", values);
        // You can perform further actions with the form values here
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, values, setFieldValue }) => (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <Form
            className="flex flex-col justify-center items-center w-full"
            action=""
          >
            <div className="max-w-sm mx-auto">
              <div>
                <div className="mt-10">
                  <H1Title
                    BoldTitle={"اطلاعات حساب کاربری"}
                    H1class={
                      "h-9 w-[16.5rem] text-2xl text-right font-semibold"
                    }
                  />
                </div>
                <div>
                  <Parag
                    Paragraph={
                      "برای اعمال تغییرات، اطلاعات جدید را وارد کرده و دکمه ثبت را بزنید."
                    }
                    Pclass={"text-base text-gray-600 text-right font-normal"}
                  />
                </div>
              </div>
              <div className="py-8 grid gap-3">
                <Field
                  placeholder="عنوان فروشگاه"
                  type="text"
                  value={login.store_name}
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
                  value={login.owner_name}
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
                  value={login.owner_nid}
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
                      value={login.owner_birthdate}
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
                  value={login.owner_phone}
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
                  value={login.store_phone}
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
                  value={login.store_address}
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
                  value={login.store_post_code}
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
                  SelectOnChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
                <div className="py-8 grid gap-3">
                  <Field
                    placeholder="گروه پیشفرض"
                    type="text"
                    value={supplementaryform.default_group}
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="default_group"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setSupplementaryForm({
                          key: name as keyof supplementaryform,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="default_group"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Field
                    placeholder="دفترچه پیشفرض"
                    type="text"
                    value={supplementaryform.default_phonebook}
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="default_phonebook"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      const { name, value } = e.target;
                      setFieldValue(name, value);
                      dispatch(
                        loginSlice.actions.setSupplementaryForm({
                          key: name as keyof supplementaryform,
                          value: value,
                        })
                      );
                    }}
                  />
                  <ErrorMessage
                    name="default_phonebook"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <div>
                    <Parag
                      Paragraph={
                        "هر زمان مشتری شما، گروه خود را از منوی گروه بندی انتخاب نکند، شماره‌ی وارد شده در دفترچه تلفن پیشفرض ذخیره می‌شود، و پیام همین گروه برایش ارسال خواهد شد."
                      }
                      Pclass={"text-base text-gray-600 text-right font-normal"}
                    />
                  </div>
                  <Field
                    placeholder="لوگوی فروشگاه"
                    type="text"
                    value={supplementaryform.store_logo}
                    onClick={handleFileClickStoreLogo}
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer"
                    name="store_logo"
                    readOnly
                  />
                  <input
                    type="file"
                    ref={InputStoreLogoRef}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "store_logo",
                        e.target.files ? e.target.files[0] : null
                      );
                      dispatch(
                        loginSlice.actions.setSupplementaryForm({
                          key: "store_logo",
                          value: e.target.files ? e.target.files[0].name : "",
                        })
                      );
                    }}
                    style={{ display: "none" }}
                  />
                  <ErrorMessage
                    name="store_logo"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Parag
                    Paragraph={"لوگو با فرمت jpg یا png"}
                    Pclass={"text-base text-gray-600 text-right font-normal"}
                  />
                  <Field
                    placeholder="فایل تبلیغاتی"
                    type="text"
                    value={supplementaryform.store_ad}
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer"
                    name="store_ad"
                    readOnly
                    onClick={handleFileClickStoreAd}
                  />
                  <input
                    type="file"
                    ref={InputStoreAdRef}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "store_ad",
                        e.target.files ? e.target.files[0] : null
                      );
                      dispatch(
                        loginSlice.actions.setSupplementaryForm({
                          key: "store_ad",
                          value: e.target.files ? e.target.files[0].name : "",
                        })
                      );
                    }}
                    style={{ display: "none" }}
                  />
                  <ErrorMessage
                    name="store_ad"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <Parag
                    Paragraph={"فایل با فرمت gif و حجم نهایتاً 5مگابایت"}
                    Pclass={"text-base text-gray-600 text-right font-normal"}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3.5 mb-10">
                <Parag
                  Paragraph={"تغییر رمزعبور"}
                  Pclass={"text-base text-gray-600 text-right font-normal"}
                />
                <Field
                  placeholder="رمز عبور جدید"
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
                <Field
                  placeholder="تکرار رمز عبور جدید"
                  type="password"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="store_dup_password"
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
                  name="store_dup_password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-between mb-8">
                <div className="flex flex-col">
                  <Parag
                    Paragraph={"ارسال پیامک های اطلاع رسانی"}
                    Pclass={
                      "text-sm font-medium text-blue-gray-400 text-right mb-1"
                    }
                  />
                  <Parag
                    Paragraph={
                      "(هزینۀ پیامک های اطلاع رسانی پنل، از حساب کاربری کسر می‌شود)"
                    }
                    Pclass={"text-xs font-light text-blue-gray-400 text-right"}
                  />
                </div>
                <Checkbox ripple={false} defaultChecked crossOrigin={Button} />
              </div>
              <div className="grid gap-4 mb-10">
                <Button_component
                  ButtonClass={
                    "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                  }
                  onClick={() => showModalHandler()}
                >
                  ثبت تغییرات
                </Button_component>
                <NavLink to={`/store/dashboard`}>
                  <Button
                    type="link"
                    className="flex items-center justify-center mx-auto"
                    icon={
                      <HiOutlineArrowCircleRight
                        className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                      />
                    }
                  >
                    <span className="text-sm text-[#151515] font-medium">
                      برگشت به داشبورد
                    </span>
                  </Button>
                </NavLink>
              </div>
              <Modal
                modalClass="!min-w-[30%]"
                modalHeader={
                  <Parag
                    Paragraph={"کد پیامک ارسال شده را وارد کنید"}
                    Pclass={"text-base text-blue-gray-500 font-normal"}
                  />
                }
                modalBody={
                  <>
                    <Field
                      placeholder="کد پیامکی ارسال شده"
                      type="text"
                      className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      name="store_code"
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
                      name="store_code"
                      component="div"
                      className="text-red-500 text-sm text-"
                    />
                  </>
                }
                modalFooter={
                  <Button_component
                    ButtonClass={
                      "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                    }
                    onClick={() => showModalHandler()}
                  >
                    تایید
                  </Button_component>
                }
                Open={showModal}
                HandleOpen={showModalHandler}
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Account;
