import axios from "axios";
import * as yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/apiConfig";
import Textarea from "./TextArea";
import { Field, Formik, Form, ErrorMessage, FieldProps } from "formik";
import {
  useSelector,
  useDispatch,
  selectGroups,
  selectActionId,
  groupsSlice,
} from "../../lib/redux";

const Tag = React.lazy(() => import("antd/es/tag/index"));
const ButtonComponent = React.lazy(() => import("./Button"));
const Spin = React.lazy(() => import("antd/es/spin/index"));

const validationSchema = yup.object().shape({
  title: yup.string().required("وارد کردن عنوان گروه الزامی است."),
  message: yup.string().required("وارد کردن متن پیامک اعضای گروه الزامی است."),
});

const ViewGroup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableGroup = useSelector(selectGroups);
  const idGroup = useSelector(selectActionId);
  console.log(idGroup);
  const showModalHandler = (name: string) =>
    dispatch(groupsSlice.actions.setShowModal(name));
  const [loading, setLoading] = React.useState(false);

  // const goback = () => {
  //   navigate("/store/Groups");
  // };

  const gruopIndex = tableGroup.findIndex((group) => group.id === idGroup);
  console.log(gruopIndex);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center justify-center p-5 sm-max:px-5 h-full sm-max:w-80 w-96 mx-auto">
        <Formik
          initialValues={{
            title: tableGroup[gruopIndex]?.title || "",
            message: tableGroup[gruopIndex]?.message || "",
          }}
          onSubmit={(values, actions) => {
            const handleEditGroups = async () => {
              setLoading(true);
              try {
                console.log("Final form values:", values);
                const response = await axiosInstance.patch(
                  `/api/store/group/${idGroup}/`,
                  {
                    ...values,
                  }
                );
                const data = response.data;
                console.log("API response:", data);

                //edit data
                if (response.status === 200) {
                  const newData = [...tableGroup];

                  newData.splice(gruopIndex, 1, {
                    ...newData[gruopIndex],
                    title: values.title,
                    message: values.message,
                  });
                  dispatch(groupsSlice.actions.setGroups(newData));
                }
                showModalHandler("editGroup");
                navigate("/store/groups");
              } catch (error) {
                // Handle errors
                if (axios.isCancel(error)) {
                  console.log("Request canceled:", error.message);
                } else {
                  console.error("Error submitting data:", error);
                }
              } finally {
                // Reset form fields and set submitting to false
                // actions.resetForm();
                actions.setSubmitting(false);
              }
              setLoading(false);
            };
            handleEditGroups();
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
                    فرم مشاهده و ویرایش گروه
                  </p>
                  <Field
                    disabled={tableGroup[0].id === idGroup}
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
                  <Field name="message">
                    {({ field }: FieldProps) => (
                      <Textarea
                        {...field}
                        Value={values.message}
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
                  <div className="flex flex-row-reverse justify-center items-center mt-5 gap-2">
                    <ButtonComponent
                      Type="submit"
                      // disabled={values.title_Group.length == 0 || values.textSms_Group.length == 0}
                      ButtonClass="bg-secondary  w-full sm-max:text-[10px] w-full mx-auto text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                    >
                      ثبت تغییرات
                    </ButtonComponent>
                    {tableGroup[0].id === idGroup ? null : (
                      <ButtonComponent
                        onClick={() => {
                          showModalHandler("editGroup");
                          showModalHandler("Groupfield");
                          dispatch(groupsSlice.actions.setGroupcheckboxes());
                          console.log(idGroup);
                        }}
                        children="فیلد ها"
                        ButtonClass="bg-[#FFFFFF] w-32 border-2 border-[#2DCEA2] text-[#263238] text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                      />
                    )}
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

export default ViewGroup;
