import React from "react";
import axios from "axios";
import * as yup from "yup";
import axiosInstance from "../../api/apiConfig";
import ButtonComponent from "../Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  useSelector,
  useDispatch,
  groupsSlice,
  selectActionId,
} from "../../../lib/redux";
import message from "antd/es/message/index";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
const Spin = React.lazy(() => import("antd/es/spin/index"));
const Button = React.lazy(() => import("antd/es/button/index"));

const AddContactsSingleFirstdata: React.FC = () => {
  // const tableData = useSelector(selectGroups);
  const dispatch = useDispatch();
  const actionId = useSelector(selectActionId);
  const showModalHandler = (name: string) =>
    dispatch(groupsSlice.actions.setShowModal(name));
  const [loading, setLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    phone_number: yup
      .string()
      .required("وارد کردن شماره تماس الزامی می باشد.")
      .matches(/((0?9)|(\+?989))\d{9}/g, "شماره تلفن را درست وارد کنید"),
  });

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center justify-center p-5 sm-max:px-5 h-full  w-96 sm-max:w-full mx-auto">
        <Formik
          initialValues={{
            phone_number: "",
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            const handlePostGroups = async () => {
             
                setLoading(true);
                try {
                  console.log("Final form values:", values);
                  const response = await axiosInstance.post(
                    `/api/store/group/${actionId}/mas/`,
                    values
                  );
                  const data = response.data;
                  if (data.detail === "ok") {
                    dispatch(
                      groupsSlice.actions.setAddContacts({
                        uuid: data.uuid,
                        available_field: data.available_field,
                      })
                    );
                    showModalHandler("addContactsSingleFirstdata");
                    showModalHandler("addContactsSingleFulldata");
                  } else {
                  }
                  console.log("API response:", data);
                } catch (error: any) {
                  // Handle errors
                  if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                  } else {
                    console.error("Error submitting data:", error);
                    message.error(error);
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
                    اطلاعات اولیه
                  </p>
                  <p
                    lang="fa"
                    role="text"
                    className="font-normal mt-2 text-base text-blue-gray-600"
                  >
                    شماره تماس و گروه بندی مخاطب را وارد کنید{" "}
                  </p>
                  <Field
                    placeholder="شماره تلفن"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                    name="phone_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm mt-1 sm-max:w-80 w-96"
                  />
                  <ButtonComponent
                    Type="submit"
                    ButtonClass="bg-secondary sm-max:text-[10px] w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                  >
                    تایید و ورود به مرحلۀ بعد
                  </ButtonComponent>

                  <Button
                    onClick={() => {
                      showModalHandler("addContactsSingleFirstdata");
                      showModalHandler("addContactsMethod");
                    }}
                    type="link"
                    className="flex items-center justify-center mx-auto"
                    icon={
                      <ArrowRightCircleIcon
                        color="#E53935"
                        strokeWidth={2.5}
                        className={"h-3.5 w-3.5 mx-auto"}
                      />
                    }
                  >
                    <span className="text-sm text-textColor font-medium ">
                      لغو عملیات و برگشت
                    </span>
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Spin>
  );
};

export default AddContactsSingleFirstdata;
