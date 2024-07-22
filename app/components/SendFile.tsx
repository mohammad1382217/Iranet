import * as yup from "yup";
import { Parag } from "./tools";
import React, { useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
const ButtonComponent = React.lazy(() => import("./Button"));

import {
  appSlice,
  selectSelectedTxtFile,
  useDispatch,
  useSelector,
} from "../../lib/redux";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const maxFileSize = 5 * 1024 * 1024;
const supportedTextTypes = ["text/plain"];

const SendFile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNextLevel = () => {
    dispatch(appSlice.actions.setShowModals("showModalSendByFile"));
    dispatch(appSlice.actions.setShowModals("showModalSendReport"));
  };

  const InputTxtRef = useRef<HTMLInputElement>(null);
  const validationSchema = yup.object().shape({
    selectedTxtFile: yup
      .mixed()
      .test(
        "fileSize",
        "حجم فایل نباید بالای 5 مگابایت باشد.",
        (value) => value && (value as File).size <= maxFileSize
      )
      .test(
        "fileType",
        "فرمت فایل باید txt باشد.",
        (value) => value && supportedTextTypes.includes((value as File).type)
      ),
  });
  const handleFileClickTxt = () => {
    if (InputTxtRef.current) {
      InputTxtRef.current.click();
    }
  };
  const selectedTxtFile = useSelector(selectSelectedTxtFile);

  return (
    <div className="flex flex-col gap-3.5 max-w-96">
      <Parag
        Paragraph={
          "فایل حاوی شماره تلفن مخاطبینی که قصد ارسال پیامک به آنها را دارید انتخاب کنید."
        }
        Pclass={"text-sm text-gray-600 text-right font-normal sm-max:text-xs"}
      />
      <Formik
        initialValues={{ selectedTxtFile }}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {}
          console.log("Final form values:", values);
          // You can perform further actions with the form values here
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, setFieldValue }) => (
          <Form
            className="flex flex-col justify-center items-center h-full w-full gap-2"
            action=""
          >
            <Field
              placeholder="انتخاب فایل"
              type="text"
              value={selectedTxtFile}
              className="!w-full placeholder:px-2 outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer"
              name="selectedTxtFile"
              readOnly
              onClick={handleFileClickTxt}
            />
            <input
              type="file"
              ref={InputTxtRef}
              onChange={(e) => {
                handleChange(e);
                setFieldValue(
                  "selectedTxtFile",
                  e.target.files ? e.target.files[0] : null
                );
                dispatch(
                  appSlice.actions.setSelectedTxtfile(
                    e.target.files ? e.target.files[0].name : ""
                  )
                );
              }}
              style={{ display: "none" }}
            />
            <ErrorMessage
              name="selectedTxtFile"
              component="div"
              className="text-red-500 text-sm self-start"
            />
            <Parag
              Paragraph={"بارگذاری فایل با فرمت txt"}
              Pclass={"!w-full text-base text-gray-600 font-normal"}
            />
            <ButtonComponent
              onClick={handleNextLevel}
              ButtonClass={
                "!w-full flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"
              }
            >
              تایید و ورود به مرحلۀ بعد
            </ButtonComponent>
            <ButtonComponent
              onClick={() => navigate("/store/Dashboard")}
              ButtonClass="flex items-center justify-center mx-auto bg-white shadow-none hover:shadow-none"
            >
              <div className="flex items-center gap-2 text-sm text-[#151515] font-medium">
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
                <div>
                  <span className="text-[#757575]">لغو عملیات و</span> برگشت به
                  داشبورد
                </div>
              </div>
            </ButtonComponent>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendFile;
