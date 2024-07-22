import axios from "axios";
import React from "react";
import * as yup from "yup";
import axiosInstance from "../api/apiConfig";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import Textarea from "./TextArea";
import message from "antd/es/message/index";
import { JointContent } from "antd/es/message/interface";
import {
  useDispatch,
  groupsSlice,
} from "../../lib/redux";

const Spin = React.lazy(() => import("antd/es/spin/index"));
const ButtonComponent = React.lazy(() => import("./Button"));
const Tag = React.lazy(() => import("antd/es/tag/index"));

const AddGroup: React.FC = () => {
  const dispatch = useDispatch();
  const showModalHandler = (name: string) =>
    dispatch(groupsSlice.actions.setShowModal(name));
  const [loading, setLoading] = React.useState(false);
  const validationSchema = yup.object().shape({
    title: yup.string().required("وارد کردن عنوان گروه الزامی است."),
    message: yup
      .string()
      .required("وارد کردن متن پیامک اعضای گروه الزامی است."),
  });

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center justify-center p-5 sm-max:px-5 h-full sm-max:w-80 w-96 mx-auto">
        <Formik
          initialValues={{
            title: "",
            message: "",
          }}
          onSubmit={(values, actions) => {
            console.log(values);

            const handlePostGroups = async () => {
              setLoading(true);
              try {
                console.log("Final form values:", values);
                const response = await axiosInstance.post(
                  "api/store/group/",
                  values
                );
                const data = response.data;
                if (response.status === 201) {
                  showModalHandler("successfulladdGroup");
                  showModalHandler("addGroup");
                  dispatch(groupsSlice.actions.setActionId(response.data.id));
                }
                console.log("API response:", data);
              } catch (error: unknown) {
                // Handle errors
                if (axios.isCancel(error)) {
                  console.log("Request canceled:", error.message);
                } else {
                  console.error("Error submitting data:", error);
                  message.error(error as JointContent);
                }
              } finally {
                // Reset form fields and set submitting to false
                actions.resetForm();
                actions.setSubmitting(false);
              }
              setLoading(false);
            };
            handlePostGroups();
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, handleBlur }) => (
            <div className="container flex flex-col justify-center items-end rounded-lg bg-white">
              <Form
                className="container flex flex-col items-center justify-center"
                action=""
              >
                <div className="max-w-sm w-full">
                  <p
                    lang="fa"
                    role="text"
                    className="text-2xl p-1 text-right self-start font-semibold sm-max:text-base text-textColor"
                  >
                    فرم ایجاد گروه
                  </p>
                  <Field
                    placeholder="عنوان گروه"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1 sm-max:w-80 w-96"
                  />
                  <Field>
                    {({ field }: FieldProps) => (
                      <Textarea
                        {...field}
                        Placeholder="متن پیامک اعضای گروه"
                        Name="message"
                        ShowCount={true}
                        TextAreaClass="mt-3 h-44"
                        MaxLength={100}
                        onChange={handleChange}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <div className="w-full">
                    <p
                      lang="fa"
                      role="text"
                      className="text-[#78909C] font-normal text-right text-sm mt-5"
                    >
                      حداکثر 100 کاراکتر
                    </p>
                    <p
                      lang="fa"
                      role="text"
                      className="text-[#78909C] font-normal text-right text-sm mt-2"
                    >
                      کلمه لغو ۱۱ به انتهای همه پیام ها اضافه خواهد شد.
                    </p>
                  </div>
                  <div className="flex flex-row w-full mt-5">
                    <span className="text-textColor text-base font-normal">
                      تعداد کاراکتر ها:{" "}
                      <Tag color="#2196F3">{values.message.length}</Tag>
                    </span>
                    <span className="text-textColor text-base font-normal mr-4">
                      تعداد پیامک ها: <Tag color="#2196F3">12</Tag>
                    </span>
                  </div>
                  <ButtonComponent
                    Type="submit"
                    // onClick={()=>{
                    //   showModalHandler('successfulladdGroup');
                    //   showModalHandler('addGroup')
                    // }}

                    // disabled={values.title_Group.length == 0 || values.textSms_Group.length == 0}
                    ButtonClass="bg-secondary sm-max:text-[10px] w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                  >
                    ایجاد گروه
                  </ButtonComponent>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Spin>
  );
};

export default AddGroup;
