import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Upload from "antd/es/upload/Upload";
import message from "antd/es/message/index";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import { H1Title } from "../../../../components/tools";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
const Select = React.lazy(() => import("antd/es/select/index"));
const Spin = React.lazy(() => import("antd/es/spin/index"));;
import axiosInstance from "../../../../api/apiConfig";
import axios from "axios";
import { UploadFile } from "antd/lib";
const Textarea = React.lazy(() => import("../../../../components/TextArea"));
const ButtonComponent = React.lazy(
  () => import("../../../../components/Button")
);
const Button = React.lazy(() => import("antd/es/button/index"));

export const maxFileSize = 5 * 1024 * 1024;

const validationSchema = yup.object().shape({});

const StoresAddTickets: React.FC = () => {
  const DEPARTMENT_CHOICES = [
    { value: "F", label: "مالی" },
    { value: "M", label: "مدیریت" },
    { value: "SMSM", label: "ارسال پیامک" },
    { value: "T", label: "فنی" },
    { value: "DAP", label: "طراحی تولید" },
  ];

  const goback = () => {
    navigate("/store/Tickets");
  };
  const navigate = useNavigate();
  // const[Filelist,setFlieList] = useState<UploadFile<any>[]>;
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const [loading, setloading] = React.useState(false);

  return (
    <Spin spinning={loading} size="large">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-lg sm-max:px-5 h-full my-10 sm-max:w-80 w-96 mx-auto">
        <Formik
          initialValues={{
            title: "",
            description: "",
            department: "",
            Attachment: [],
          }}
          onSubmit={(values) => {
            console.log("Final form values:", values);
            const formData = new FormData();

            if (values) {
              console.log("Final form values:", values.Attachment);
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("department", values.department);
              values.Attachment.forEach((file, index) => {
                formData.append(`file${index + 1}`, file as any);
              });
              console.log("formData values:", formData);
              const handlePostNewTicket = async () => {
                try {
                  setloading(true);
                  const response = await axiosInstance.post(
                    `/api/ticket/`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  console.log(response.data);
                  if (response.status === 201) {
                    // showModalSeccessFullyAuthenticationHandler();
                    message.success('تیکت با موفقیت ارسال شد .')
                    navigate('/store/tickets/');
                  }
                  else{
                    message.error('مشکلی در ارسال بوجود آمد لطفا مجدد تلاش کنید !')
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
              handlePostNewTicket();
            }
          }}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values }) => (
            <div className="container flex flex-col justify-center items-end rounded-lg bg-white">
              <Form
                className="container flex flex-col items-center justify-center"
                action=""
              >
                <div className="w-full">
                  <div>
                    <H1Title
                      BoldTitle={"ثبت تیکت جدید"}
                      H1class={"h-9 text-2xl text-right font-semibold"}
                    />
                  </div>
                  <div className="pt-8 grid gap-3">
                    <Field
                      placeholder="موضوع"
                      type="text"
                      className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      name="title"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("title", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <Field name="department">
                      {() => (
                        <Select
                          // {...field}
                          placeholder="دپارتمان"
                          size="large"
                          className="appearance-none block w-full font-normal text-[#90A4AE] bg-transparent bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out focus:bg-white focus:border-blue-500 focus:outline-none"
                          onChange={(value: unknown) =>
                            setFieldValue("department", value as string)
                          }
                          defaultActiveFirstOption
                          options={DEPARTMENT_CHOICES.map((item) => ({
                            value: item.value,
                            label: item.label,
                          }))}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <Field name="description">
                      {({ field }: FieldProps) => (
                        <Textarea
                          {...field}
                          Placeholder="توضیحات"
                          ShowCount={true}
                          TextAreaClass="mt-3 h-44"
                          MaxLength={100}
                          onChange={(e) => {
                            setFieldValue("description", e.target.value);
                          }}
                        />
                      )}
                    </Field>
                    <div className="w-full">
                      <p
                        lang="fa"
                        role="text"
                        className="text-[#78909C] font-normal text-right text-sm mt-2"
                      >
                        حداکثر 2000 کاراکتر
                      </p>
                    </div>
                    <Field name="Attachment">
                      {({ field }: FieldProps) => (
                        <Upload
                          {...field}
                          fileList={fileList}
                          maxCount={3}
                          beforeUpload={(file) => {
                            if (values.Attachment.length >= 3) {
                              message.error(
                                "شما مجاز به بارگذاری سه فایل هستید"
                              );
                            } else if (file.size > maxFileSize) {
                              message.error(
                                "حداکثر حجم مجاز 5 مگابایت می باشد."
                              );
                            } else {
                              setFieldValue("Attachment", [...fileList, file]);
                              setFileList([...fileList, file]);
                              message.success(
                                `فایل ${file.name} با موفقیت بارگذاری شد.`
                              );
                            }
                            return false;
                          }}
                          onChange={(info: any) => {
                            const newfileList = [...info.fileList];
                            if (
                              info.fileList[values.Attachment.length].size >
                              maxFileSize
                            ) {
                              // message.error("حداکثر حجم مجاز 5 مگابایت باشد.");
                              // setFileList([...fileList]);
                              // setFieldValue("Attachment", [...fileList]);
                              return false;
                            } else {
                              setFieldValue("Attachment", newfileList);

                              if (values.Attachment.length !== 0) {
                                setFileList(newfileList);
                              }
                            }
                          }}
                          // showUploadList={false}
                        >
                          <Button
                            className="h-10 w-full flex items-center justify-start"
                            icon={<UploadOutlined />}
                          >
                            ضمیمه
                          </Button>
                        </Upload>
                      )}
                    </Field>
                    <ErrorMessage
                      name="Attachment"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="grid gap-4">
                    <div className="w-full mt-4">
                      <p
                        lang="fa"
                        role="text"
                        className="text-[#78909C] font-normal text-right text-sm "
                      >
                        امکان آپلود 3 فایل تا حجم حداکثر 5 مگابایت
                      </p>
                    </div>
                    <ButtonComponent
                      Type="submit"
                      // disabled={isDisabled}
                      ButtonClass="bg-secondary w-full mx-auto mt-4 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                      children="ارسال تیکت"
                      // onClick={handleCreateGroup}
                    />

                    <Button
                      onClick={goback}
                      type="link"
                      className="flex items-center justify-center -mt-4 mb-5 mx-auto"
                      icon={
                        <ArrowRightCircleIcon
                          color="#E53935"
                          strokeWidth={2.5}
                          className={"h-3.5 w-3.5 mx-auto"}
                        />
                      }
                    >
                      <span className="text-sm text-textColor font-medium ">
                        <span className="text-[#757575]">لغو عملیات و</span>{" "}
                        برگشت به داشبورد
                      </span>
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Spin>
  );
};

export default StoresAddTickets;
