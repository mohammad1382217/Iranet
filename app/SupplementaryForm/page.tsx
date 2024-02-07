import { Button, H1Title, Parag } from "../components/tools";
import React, { useRef } from "react";
import {
  loginSlice,
  useDispatch,
  useSelector,
  supplementaryform,
  selectSupplementaryForm,
} from "../../lib/redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import loginBg from "../assets/images/login-bg.png";
import * as yup from "yup";
import { IoEllipseOutline } from "react-icons/io5";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/apiConfig";

const maxFileSize = 5 * 1024 * 1024;
const supportedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
const supportedGifTypes = ["image/gif"];

const validationSchema = yup.object().shape({
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

const SupplementaryForm: React.FC = () => {
  const supplementaryform = useSelector(selectSupplementaryForm);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const InputStoreLogoRef = useRef<HTMLInputElement>(null);
  const InputStoreAdRef = useRef<HTMLInputElement>(null);
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
        initialValues={supplementaryform}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
          }
          console.log("Final form values:", values);
          const handlePostSupplementaryForm = async () => {
            try {
              const response = await axios.post(`${BASE_URL}supplementary`, values);
              const data = response.data;
              // dispatch(setLoginData([...LoginData, data]));
            } catch (error: any) {
              if (error.response) {
                console.log(error.message);
              }
            }
          };
          handlePostSupplementaryForm();
          // You can perform further actions with the form values here
          navigate("/store/Dashboard");
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
                  <div className="mt-8">
                    <H1Title
                      BoldTitle={"فرم تکمیلی"}
                      H1class={
                        "h-9 text-2xl text-right font-semibold"
                      }
                    />
                  </div>
                  <div>
                    <Parag
                      Paragraph={
                        "بعد از وارد کردن اطلاعات تکمیلی، وارد پنل فروشگاهتان خواهید شد."
                      }
                      Pclass={"text-base text-gray-600 text-right font-normal"}
                    />
                  </div>
                </div>

                <div className="py-8 grid gap-3">
                  <Field
                    placeholder="گروه پیشفرض"
                    type="text"
                    className="placeholder:px-2 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    className="placeholder:px-2 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    className="placeholder:px-2 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
                    name="store_logo"
                    readOnly
                    onClick={handleFileClickStoreLogo}
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
                    className="placeholder:px-2 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
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
                <div className="grid gap-4 mb-8">
                  <Button
                    children={"ثبت نهایی اطلاعات"}
                    Type={"submit"}
                    ClassName={
                      "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                    }
                  />
                </div>
              </div>
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

export default SupplementaryForm;