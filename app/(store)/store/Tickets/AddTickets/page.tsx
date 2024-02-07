import React, { useRef } from "react";
import { Input, Select, Button, Upload, UploadProps, message } from "antd";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Button_component from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import {
  ticketsSlice,
  selectticketsOpations,
  selectedticketsOpation,
  selectInputSubjectTicket,
  selectticketsData,
  selectInputdescriptionTicket,
  useSelector,
  useDispatch,
  selectedTicketform,
} from "../../../../../lib/redux";
import Textarea from "../../../../components/TextArea";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { UploadOutlined } from "@ant-design/icons";

const maxFileSize = 5 * 1024 * 1024;
const supportedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const validationSchema = yup.object().shape({
  Attachment: yup
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
});

const AddTickets: React.FC = () => {
  const ticketform = useSelector(selectedTicketform);
  const InputAttachmentRef = useRef<HTMLInputElement>(null);
  const handleFileClickAttachment = () => {
    if (InputAttachmentRef.current) {
      InputAttachmentRef.current.click();
    }
  };
  // let textarea;
  const goback = () => {
    navigate("/store/Tickets");
    dispatch(ticketsSlice.actions.setSubjectTicket(""));
    dispatch(ticketsSlice.actions.setdescription(""));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableGroup = useSelector(selectticketsData);
  const InputTitileGroup = useSelector(selectInputSubjectTicket);
  const InputTextMessage = useSelector(selectInputdescriptionTicket);

  const handleCreateGroup = () => {
    try {
      const newData = [
        ...tableGroup,
        {
          key: tableGroup.length + 1,
          ticketname: InputTitileGroup,
          date: "1400/00/00",
          recognizecode: 12345,
          Condition: ["درانتظار پاسخ"],
        },
      ];
      dispatch(ticketsSlice.actions.setNewData(newData));
      dispatch(ticketsSlice.actions.setSubjectTicket(""));
      dispatch(ticketsSlice.actions.setdescription(""));
      navigate("/store/Tickets");
    } catch (error) {
      alert(error);
    }
  };

  const isDisabled = InputTextMessage === "" || InputTitileGroup === "";

  //select
  const OPTIONS = useSelector(selectticketsOpations);
  const selectedItems = useSelector(selectedticketsOpation);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,

      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen p-6 mx-auto my-10 max-w-lg">
    <div className="flex flex-col mx-auto justify-center min-h-screen items-center my-10 max-w-lg gap-3 sm:w-80 w-96 ">
      <p className="text-2xl p-1 text-right self-start font-semibold sm:text-base text-[#151515]">
        ثبت تیکت جدید
      </p>
      <Formik
        initialValues={ticketform}
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
          <Form>
            <Input
              value={InputTitileGroup}
              onChange={(e) =>
                dispatch(ticketsSlice.actions.setSubjectTicket(e.target.value))
              }
              placeholder="موضوع"
              className="mt-5 h-10"
            ></Input>
            <Select
              className="mt-5"
              size="large"
              placeholder="دپارتمان"
              // value={selectedItems}
              onChange={(e) =>
                dispatch(ticketsSlice.actions.setSelectedOption(e))
              }
              style={{
                width: "100%",
              }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <Textarea
              ShowCount={true}
              TextAreaClass="mt-3 h-44"
              MaxLength={100}
              Value={InputTextMessage}
              onChange={(e) => {
                dispatch(ticketsSlice.actions.setdescription(e.target.value));
              }}
              Placeholder="توضیحات"
            />
            <div className="w-full">
              <p className="text-[#78909C] font-normal text-right text-sm mt-2">
                حداکثر 2000 کاراکتر
              </p>
            </div>
            <Upload {...props} maxCount={3} className="w-full mt-3">
              <Button
                className="h-10 w-full mt-2  justify-between items-center flex-row-reverse"
                icon={<UploadOutlined />}
              >
                ضمیمه
              </Button>
            </Upload>
            {/* <Field
              placeholder="ضمیمه"
              type="text"
              value={ticketform.Attachment}
              className="placeholder:px-2  outline-0 bg-white mt-3 h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              name="Attachment"
              readOnly
              onClick={handleFileClickAttachment}
            ></Field>
            <input
              type="file"
              ref={InputAttachmentRef}
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "Attachment",
                  e.target.files ? e.target.files[0] : null
                );
                dispatch(
                  ticketsSlice.actions.setTicketForm({
                    key: "Attachment",
                    value: e.target.files ? e.target.files[0].name : "",
                  })
                );
              }}
              style={{ display: "none" }}
            /> */}
            <ErrorMessage
              name="Attachment"
              component="div"
              className="text-red-500 text-sm"
            />
          </Form>
        )}
      </Formik>
      <div className="w-full">
        <p className="text-[#78909C] font-normal text-right text-sm mt-2">
          حجم حداکثر 5مگابایت
        </p>
      </div>
      <Button_component
        disabled={isDisabled}
        ButtonClass="bg-secondary w-full mx-auto mt-10 text-xs font-bold h-11 flex justify-center items-center"
        children="ارسال تیکت"
        onClick={handleCreateGroup}
      />

      <Button
        onClick={goback}
        type="link"
        className="flex items-center justify-center -mt-2 mb-5 mx-auto"
        icon={
          <ArrowRightCircleIcon
            color="#E53935"
            strokeWidth={2.5}
            className={"h-3.5 w-3.5 mx-auto"}
          />
        }
      >
        <span className="text-sm text-[#151515] font-medium ">
          <span className="text-[#757575]">لغو عملیات و</span> برگشت به داشبورد
        </span>
      </Button>
    </div>
  );
};

export default AddTickets;
