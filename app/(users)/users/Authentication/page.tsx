import * as yup from "yup";
import React from "react";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import message from "antd/es/message/index";
import Modal from "../../../components/Modal";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import { H1Title } from "../../../components/tools";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import {
  AuthenticationSlice,
  selectShowModalSeccessFullyAuthentication,
  useSelector,
  useDispatch,
  selectOwnerNationalCardAuthenticationUsers,
  fetchAccountDataThunk,
  selectAccount,
} from "../../../../lib/redux";
import { DateObject } from "react-multi-date-picker";
import persian_en from "react-date-object/locales/persian_en";
import axiosInstance from "../../../api/apiConfig";

const Spin = React.lazy(() => import("antd/es/spin/index"));
const Button = React.lazy(() => import("antd/es/button/index"));
const DatePicker = React.lazy(() => import("react-multi-date-picker"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));

export const maxFileSize = 5 * 1024 * 1024;
const supportedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const validationSchema = yup.object().shape({
  bank_number: yup
    .string()
    .required("شماره کارت بانکی الزامی است.")
    .length(16, "شماره کارت بانکی 16 رقم میباشد"),
  birth_date: yup.string().required("تاریخ تولد الزامی است."),
  national_card: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          "fileSize",
          "حجم فایل نباید بالای 5 مگابایت باشد.",
          (value: any) => {
            if (!value) return false;
            return value.size <= maxFileSize;
          }
        )
        .test(
          "fileType",
          "فرمت فایل باید jpg یا jpeg یا png باشد.",
          (value: any) => {
            if (!value) return false;
            return supportedFileTypes.includes(value.type);
          }
        )
    )
    .required("آپلود کارت ملی مالک الزامی است.")
    .min(1, "آپلود کارت ملی مالک الزامی است."),
});
export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const Authentication: React.FC = () => {
  const dispatch = useDispatch();

  const showModalSeccessFullyAuthentication = useSelector(
    selectShowModalSeccessFullyAuthentication
  );

  const showModalSeccessFullyAuthenticationHandler = () =>
    dispatch(
      AuthenticationSlice.actions.setShowModalSeccessFullyAuthentication()
    );
  const account = useSelector(selectAccount);
  const [status, setStatus] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const getAccount = async (modal: boolean) => {
    try {
      const resAcc = await dispatch(fetchAccountDataThunk()).unwrap();
      if (
        resAcc[0].bank_number !== null &&
        resAcc[0].birth_date !== null &&
        resAcc[0].national_card !== null &&
        resAcc[0].verified === false
      ) {
        setStatus("PendingRequest");
        dispatch(
          AuthenticationSlice.actions.setNationalCard([
            {
              uid: "0",
              name: "تصویر_کارت_ملی_مالک.png",
              status: "done",
              url: resAcc[0].national_card,
            },
          ])
        );
      } else if (resAcc[0].verified === true) {
        setStatus("verifiedRequest");
      } else {
        setStatus("NoRequest");
      }
      if (modal) {
        showModalSeccessFullyAuthenticationHandler();
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  React.useEffect(() => {
    setloading(true);
    getAccount(false);
    setloading(false);
  }, []);

  const national_card = useSelector(selectOwnerNationalCardAuthenticationUsers);
  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center justify-center min-h-screen max-w-lg sm-max:px-5 h-full  sm-max:w-80 w-96 mx-auto">
        {status === "NoRequest" ? (
          <Formik
            initialValues={{
              bank_number: "",
              birth_date: "",
              national_card: [],
            }}
            onSubmit={async (values) => {
              console.log("Final form values:", values);
              const formData = new FormData();

              if (values) {
                // console.log("Final form values:", values);
                formData.append("bank_number", values.bank_number);
                formData.append("birth_date", values.birth_date);
                values.national_card.forEach(
                  (file: { originFileObj: File }) => {
                    formData.append(
                      "national_card",
                      file.originFileObj as File
                    );
                  }
                );
                console.log("formData values:", formData);
                console.log(account?.id);
                const handlePostveritfy = async () => {
                  try {
                    setloading(true);
                    const response = await axiosInstance.put(
                      `api/core/${account?.id}/verify/`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    console.log(response.data);
                    if (response.data.detail === "ok") {
                      showModalSeccessFullyAuthenticationHandler();
                    }
                    setloading(false);
                  } catch (error: any) {
                    if (axios.isCancel(error)) {
                      console.log("Request canceled:", error.message);
                    } else {
                      console.error("Error fetching data:", error);
                    }
                  }
                };
                handlePostveritfy();
                await dispatch(fetchAccountDataThunk());
              }
            }}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, values }) => (
              <div className="container flex flex-col justify-center items-end rounded-lg bg-white">
                <Form
                  className="container flex flex-col items-center justify-center"
                  encType="multipart/form-data"
                  action=""
                >
                  <div className="w-full">
                    <div>
                      <H1Title
                        BoldTitle={"احراز هویت"}
                        H1class={"h-9 text-2xl text-right font-semibold"}
                      />
                      <p
                        lang="fa"
                        role="text"
                        className="text-[0.94rem] mt-2 font-normal text-[#757575] "
                      >
                        جهت احراز هویت کاربری، مدارک خواسته شده را بارگزاری
                        کنید.
                      </p>
                      <p
                        lang="fa"
                        role="text"
                        className="text-[0.94rem] mt-4 font-normal text-[#757575] "
                      >
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.{" "}
                      </p>
                      <p
                        lang="fa"
                        role="text"
                        className="text-[0.94rem] mt-2 font-normal text-[#757575] "
                      >
                        و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                        با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در
                        شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
                        متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                        برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
                        پیشرو در زبان فارسی ایجاد کرد.
                      </p>
                    </div>
                    <div className="pt-3 grid gap-3">
                      <Field className="w-full" name="national_card">
                        {({ field }: FieldProps) => {
                          return (
                            <Upload
                              {...field}
                              fileList={national_card}
                              multiple={false}
                              maxCount={1}
                              beforeUpload={(file) => {
                                const fileType = file.type;
                                if (
                                  !fileType.startsWith("image/") ||
                                  fileType === "image/gif"
                                ) {
                                  dispatch(
                                    AuthenticationSlice.actions.setDefaultOwnerNationalCard()
                                  );
                                  message.error(
                                    "شما فقط میتوانید عکس بارگذاری نمایید!"
                                  );
                                  setFieldValue("national_card", []);
                                  return false;
                                } else if (file.size > maxFileSize) {
                                  dispatch(
                                    AuthenticationSlice.actions.setDefaultOwnerNationalCard()
                                  );
                                  message.error(
                                    "حداکثر حجم مجاز 5 مگابایت می باشد."
                                  );
                                  setFieldValue("national_card", []);
                                  return false;
                                } else if (
                                  file &&
                                  Array.isArray(file) &&
                                  file.length > 1
                                ) {
                                  dispatch(
                                    AuthenticationSlice.actions.setDefaultOwnerNationalCard()
                                  );
                                  message.error(
                                    "شما مجاز به بارگذاری فقط یک فایل هستید"
                                  );
                                  setFieldValue("national_card", []);
                                  return false;
                                }
                                setFieldValue("national_card", file);
                                message.success(
                                  `فایل ${file.name} با موفقیت بارگذاری شد.`
                                );
                                return false;
                              }}
                              onChange={(info) => {
                                const fileList = [...info.fileList];
                                setFieldValue("national_card", fileList);

                                if (values.national_card.length !== 0) {
                                  dispatch(
                                    AuthenticationSlice.actions.setNationalCard(
                                      fileList
                                    )
                                  );
                                }
                              }}
                              // showUploadList={false}
                            >
                              <Button
                                className="h-10 w-full flex items-center justify-start"
                                icon={<UploadOutlined />}
                              >
                                تصویر کارت ملی مالک
                              </Button>
                            </Upload>
                          );
                        }}
                      </Field>
                      <ErrorMessage
                        name="national_card"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <Field
                        placeholder="شماره کارت بانکی مالک"
                        type="text"
                        className="outline-0 bg-white h-11 border border-gray-300 placeholder:text-[#90A4AE] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        name="bank_number"
                      />
                      <ErrorMessage
                        name="bank_number"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <Field name="birth_date">
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
                            onChange={(
                              date: DateObject | DateObject[] | null
                            ) => {
                              if (date instanceof DateObject) {
                                setFieldValue(
                                  "birth_date",
                                  date
                                    .convert(persian, persian_en)
                                    .format("YYYY-MM-DD")
                                    .toString()
                                );
                              }
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="birth_date"
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
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        ) : status === "PendingRequest" ? (
          <Formik
            initialValues={{
              bank_number: account?.bank_number,
              birth_date: account?.birth_date,
              national_card: [],
            }}
            onSubmit={async (values) => {
              console.log("Final form values:", values);
              const formData = new FormData();

              if (values) {
                // console.log("Final form values:", values);
                formData.append("bank_number", values.bank_number!);
                formData.append("birth_date", values.birth_date!);
                values.national_card.forEach(
                  (file: { originFileObj: File }) => {
                    formData.append(
                      "national_card",
                      file.originFileObj as File
                    );
                  }
                );
                console.log("formData values:", formData);
                let id = localStorage.getItem("id");

                console.log(id);
                const handlePostveritfy = async () => {
                  try {
                    const response = await axiosInstance.put(
                      `api/core/${id}/verify/`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    console.log(response.data);
                    if (response.data.detail === "ok") {
                      showModalSeccessFullyAuthenticationHandler();
                    }
                  } catch (error: any) {
                    if (axios.isCancel(error)) {
                      console.log("Request canceled:", error.message);
                    } else {
                      console.error("Error fetching data:", error);
                    }
                  }
                };
                handlePostveritfy();
                await dispatch(fetchAccountDataThunk());
              }
            }}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, values }) => (
              <div className="container flex flex-col justify-center items-end rounded-lg bg-white">
                <Form
                  className="container flex flex-col items-center justify-center"
                  encType="multipart/form-data"
                  action=""
                >
                  <div className="w-full">
                    <div>
                      <H1Title
                        BoldTitle={"احراز هویت"}
                        H1class={"h-9 text-2xl text-right font-semibold"}
                      />
                      <p
                        lang="fa"
                        role="text"
                        className="text-[0.94rem] mt-2 font-normal text-[#757575] "
                      >
                        جهت احراز هویت کاربری، مدارک خواسته شده را بارگزاری
                        کنید.
                      </p>
                    </div>
                    <div className="pt-3 grid gap-3">
                      <Field className="w-full" name="national_card">
                        {({ field }: FieldProps) => {
                          return (
                            <Upload
                              {...field}
                              fileList={national_card}
                              multiple={false}
                              maxCount={1}
                              defaultFileList={[
                                {
                                  uid: "1",
                                  name: "xxx.png",
                                  status: "done",
                                  url: account?.national_card!,
                                  percent: 100,
                                },
                              ]}
                              beforeUpload={(file) => {
                                const fileType = file.type;
                                if (
                                  !fileType.startsWith("image/") ||
                                  fileType === "image/gif"
                                ) {
                                  dispatch(
                                    AuthenticationSlice.actions.setDefaultOwnerNationalCard()
                                  );
                                  message.error(
                                    "شما فقط میتوانید عکس بارگذاری نمایید!"
                                  );
                                  setFieldValue("national_card", []);
                                  return false;
                                } else if (file.size > maxFileSize) {
                                  dispatch(
                                    AuthenticationSlice.actions.setDefaultOwnerNationalCard()
                                  );
                                  message.error(
                                    "حداکثر حجم مجاز 5 مگابایت می باشد."
                                  );
                                  setFieldValue("national_card", []);
                                  return false;
                                } else if (
                                  file &&
                                  Array.isArray(file) &&
                                  file.length > 1
                                ) {
                                  dispatch(
                                    AuthenticationSlice.actions.setDefaultOwnerNationalCard()
                                  );
                                  message.error(
                                    "شما مجاز به بارگذاری فقط یک فایل هستید"
                                  );
                                  setFieldValue("national_card", []);
                                  return false;
                                }
                                setFieldValue("national_card", file);
                                message.success(
                                  `فایل ${file.name} با موفقیت بارگذاری شد.`
                                );
                                return false;
                              }}
                              onChange={(info) => {
                                const fileList = [...info.fileList];
                                setFieldValue("national_card", fileList);

                                if (values.national_card.length !== 0) {
                                  dispatch(
                                    AuthenticationSlice.actions.setNationalCard(
                                      fileList
                                    )
                                  );
                                }
                              }}
                            >
                              <Button
                                className="h-10 w-full flex items-center justify-start"
                                icon={<UploadOutlined />}
                              >
                                تصویر کارت ملی مالک
                              </Button>
                            </Upload>
                          );
                        }}
                      </Field>
                      <ErrorMessage
                        name="national_card"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <Field
                        placeholder="شماره کارت بانکی مالک"
                        type="text"
                        className="outline-0 bg-white h-11 border border-gray-300 placeholder:text-[#90A4AE] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        name="bank_number"
                      />
                      <ErrorMessage
                        name="bank_number"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                      <Field name="birth_date">
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
                            onChange={(
                              date: DateObject | DateObject[] | null
                            ) => {
                              if (date instanceof DateObject) {
                                setFieldValue(
                                  "birth_date",
                                  date
                                    .convert(persian, persian_en)
                                    .format("YYYY-MM-DD")
                                    .toString()
                                );
                              }
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="birth_date"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="grid gap-4">
                      <p
                        lang="fa"
                        role="text"
                        className="text-[0.94rem] mt-4 font-normal text-[#757575] "
                      >
                        اطلاعات شما در حال حاضر ثبت شده و در دست بررسی است. پس
                        از بررسی ادمین و تایید اطلاعات، شما قادر به ثبت فروشگاه
                        خواهید بود.
                      </p>
                      <ButtonComponent
                        Type="submit"
                        ButtonClass="bg-secondary w-full mx-auto mt-4 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                        children="ذخیره تغییرات"
                      />
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        ) : (
          <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 ">
            <h1 className="text-[#2DCEA2] text-3xl font-bold text-center">
              هویت شما تایید شد
            </h1>
            <p lang="fa" role="text" className="text-gray-600 text-center">
              برای تکمیل اطلاعات و ثبت فروشگاه، می‌توانید از منوی سایت، اقدام
              کنید
            </p>
          </div>
        )}

        <Modal
          modalClass="!min-w-[28%] sm-max:!min-w-[90%] mb-2  scroll-auto"
          modalHeaderClass="flex justify-center items-center mx-auto !mb-0"
          modalHeader={`درخواست شما با موفقیت ${
            status === "NoRequest" ? "ثبت شد" : "تغییر کرد"
          } `}
          modalBodyClass="!mt-0"
          modalBody={
            "جهت ثبت فروشگاه، منتظر وضعیت احراز هویت، توسط ادمین باشید. وضعیت تایید یا عدم تایید هویت شما، با پیامک اطلاع رسانی می‌گردد."
          }
          modalFooterClass="flex justify-center items-center"
          modalFooter={
            <>
              <ButtonComponent
                ButtonClass="bg-secondary text-white px-10"
                onClick={() => {
                  getAccount(true);
                }}
              >
                <span>تایید</span>
              </ButtonComponent>
            </>
          }
          Open={showModalSeccessFullyAuthentication}
          HandleOpen={showModalSeccessFullyAuthenticationHandler}
        />
      </div>
    </Spin>
  );
};

export default Authentication;
