import React, { useRef } from "react";
import { Parag } from "./tools";
import Button_component from "./Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  appSlice,
  selectIsLastStep,
  selectSelectedTxtFile,
  useDispatch,
  useSelector,
} from "../../lib/redux";
import * as yup from "yup";

const maxFileSize = 5 * 1024 * 1024;
const supportedTextTypes = ["text/plain"];

export const SendFile: React.FC = () => {
  const dispatch = useDispatch();
  const isLastStep = useSelector(selectIsLastStep);
  const handleNext = () => {
    !isLastStep && dispatch(appSlice.actions.setActiveStep(1));
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
    <div className="flex flex-col gap-3.5 mt-5 mb-10 px-6 w-96">
      <Formik
        initialValues={{ selectedTxtFile }}
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
              className="text-red-500 text-sm"
            />
            <Parag
              Paragraph={"بارگذاری فایل با فرمت txt"}
              Pclass={"!w-full text-base text-gray-600 font-normal"}
            />
            <Button_component
              onClick={handleNext}
              children={"تایید و ورود به مرحلۀ بعد"}
              ButtonClass={
                "!w-full flex-shrink-0 mt-5 py-2.5 px-[18px] bg-secondary"
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};