import axios from "axios";
import React from "react";
import * as yup from "yup";
import axiosInstance from "../../api/apiConfig";
import ButtonComponent from "../Button";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import {
  useSelector,
  useDispatch,
  groupsSlice,
  selectActionId,
  selectGroups,
  selectAddContacts,
  available_field,
} from "../../../lib/redux";
import message from "antd/es/message/index";
import ArrowRightCircleIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon";
import DatePicker from "react-multi-date-picker";
import { weekDays } from "../../Register/page";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import persian_en from "react-date-object/locales/persian_en";
import { fetchGroup } from "../../../lib/redux/slices/groupsSlice/fetchGroups";

const Button = React.lazy(() => import("antd/es/button/index"));
const Spin = React.lazy(() => import("antd/es/spin/index"));

const AddContactsSingleFulldata: React.FC = () => {
  const dispatch = useDispatch();
  const actionId = useSelector(selectActionId);
  const TableData = useSelector(selectGroups);
  const [loading, setLoading] = React.useState(false);
  const groupIndex = TableData.findIndex((group) => group.id === actionId);
  if (groupIndex === -1) {
    console.error("Group not found in state.groups");
    return;
  }
  const addContactsData = useSelector(selectAddContacts);
  const showModalHandler = (name: string) =>
    dispatch(groupsSlice.actions.setShowModal(name));

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center justify-center p-5 sm-max:px-5 h-full  w-96 sm-max:w-full mx-auto">
        <Formik
          initialValues={{
            name: "",
            last_name: "",
            full_name: "",
            age: "",
            birth_date: "",
            empty_field1: "",
            empty_field2: "",
            empty_field3: "",
            empty_field4: "",
            empty_field5: "",
          }}
          onSubmit={(values, actions) => {
            const handlePostGroups = async () => {
              const updatedFields = {} as available_field;

              if (addContactsData.available_field.name) {
                updatedFields.name = values.name;
              }
              if (addContactsData.available_field.last_name) {
                updatedFields.last_name = values.last_name;
              }
              if (addContactsData.available_field.full_name) {
                updatedFields.full_name = values.full_name;
              }
              if (addContactsData.available_field.birth_date) {
                updatedFields.birth_date = values.birth_date;
              }
              if (addContactsData.available_field.age) {
                updatedFields.age = values.age;
              }
              if (addContactsData.available_field.empty_field1) {
                updatedFields.empty_field1 = values.empty_field1;
              }
              if (addContactsData.available_field.empty_field2) {
                updatedFields.empty_field2 = values.empty_field2;
              }
              if (addContactsData.available_field.empty_field3) {
                updatedFields.empty_field3 = values.empty_field3;
              }
              if (addContactsData.available_field.empty_field4) {
                updatedFields.empty_field4 = values.empty_field4;
              }
              if (addContactsData.available_field.empty_field5) {
                updatedFields.empty_field5 = values.empty_field5;
              }

              setLoading(true);

              try {
                console.log("Final form values:", values);
                const response = await axiosInstance.put(
                  `/api/store/group/member/update/${addContactsData.uuid}/`,
                  updatedFields
                );
                const data = response.data;
                if (response.status === 200) {
                  showModalHandler("addContactsSingleFulldata");
                  const fetchGroups = dispatch(
                    fetchGroup({ group_id: "group_id" })
                  );
                  fetchGroups;
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
          // validationSchema={validationSchema}
        >
          {({ handleChange, values, handleBlur, setFieldValue }) => (
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
                    اطلاعات تکمیلی
                  </p>

                  {addContactsData.available_field.name ? (
                    <>
                      <Field
                        placeholder="نام"
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1 sm-max:w-80 w-96"
                      />
                    </>
                  ) : null}
                  {addContactsData.available_field.last_name ? (
                    <>
                      <Field
                        placeholder="نام خانوادگی"
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="last_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-sm mt-1 sm-max:w-80 w-96"
                      />
                    </>
                  ) : null}
                  {addContactsData.available_field.full_name ? (
                    <>
                      <Field
                        placeholder="نام و نام خانوادگی"
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="full_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="full_name"
                        component="div"
                        className="text-red-500 text-sm mt-1 sm-max:w-80 w-96"
                      />
                    </>
                  ) : null}
                  {addContactsData.available_field.age ? (
                    <>
                      <Field
                        placeholder="سن"
                        type="number"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="age"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-red-500 text-sm mt-1 sm-max:w-80 w-96"
                      />
                    </>
                  ) : null}
                  {addContactsData.available_field.birth_date ? (
                    <>
                      <Field name="birth_date">
                        {({ field }: FieldProps) => (
                          <DatePicker
                            {...field}
                            weekDays={weekDays}
                            value={values.birth_date}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            inputClass="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                            id="BirthdayDate"
                            placeholder="تاریخ تولد"
                            format="YYYY/MM/DD" // Set the date format as needed
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
                    </>
                  ) : null}
                  {addContactsData.available_field.empty_field1 ? (
                    <>
                      <Field
                        placeholder={
                          addContactsData.available_field.empty_field1
                        }
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="empty_field1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}

                  {addContactsData.available_field.empty_field2 ? (
                    <>
                      <Field
                        placeholder={
                          addContactsData.available_field.empty_field2
                        }
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="empty_field2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}
                  {addContactsData.available_field.empty_field3 ? (
                    <>
                      <Field
                        placeholder={
                          addContactsData.available_field.empty_field3
                        }
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="empty_field3"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}

                  {addContactsData.available_field.empty_field4 ? (
                    <>
                      <Field
                        placeholder={
                          addContactsData.available_field.empty_field4
                        }
                        type="text"
                        className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="empty_field4"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}
                  {addContactsData.available_field.empty_field5 ? (
                    <>
                      <Field
                        placeholder={
                          addContactsData.available_field.empty_field5
                        }
                        type="text"
                        className="outline-0  bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mt-5"
                        name="empty_field5"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}
                  <ButtonComponent
                    Type="submit"
                    ButtonClass="bg-secondary sm-max:text-[10px] w-full mx-auto mt-10 text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center"
                  >
                    ثبت مخاطب{" "}
                  </ButtonComponent>

                  <Button
                    onClick={() => {
                      showModalHandler("addContactsSingleFulldata");
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

export default AddContactsSingleFulldata;
