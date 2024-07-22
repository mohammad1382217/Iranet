import React from "react";
import * as yup from "yup";
import loginBg from "../../assets/images/login-bg.webp";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ButtonComponent from "../../components/Button";
import { H1Title } from "../../components/tools";
import Modal from "../../components/Modal";
import { appSlice, selectShowModals, useDispatch, useSelector } from "../../../lib/redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = yup.object().shape({
  NewPassword: yup
    .string()
    .required("وارد کردن رمزعبور الزامی می باشد.")
    .required("وارد کردن رمز عبور فروشگاه الزامی می باشد.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "پسورد باید حداقل ۸ کاراکتر و شامل حروف و اعداد باشد."
    ),
  repeatNewPassword: yup
    .string()
    .required("وارد کردن تکرار رمز عبور فروشگاه الزامی می باشد.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "پسورد باید حداقل ۸ کاراکتر و شامل حروف و اعداد باشد."
    ),
});

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModals = useSelector(selectShowModals);
  const showModalHandler = () => dispatch(appSlice.actions.setShowModals("showModalOrigin"));

  const showToastErrorMessage = () => {
    toast.error("رمز های عبور مطابقت ندارند.", {
      position: "top-center",
    });
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen m-auto gap-4"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={{
          NewPassword: "",
          repeatNewPassword: "",
        }}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
            values.NewPassword === values.repeatNewPassword ?
            showModalHandler(): showToastErrorMessage();
          }
          // You can perform further actions with the form values here
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange }) => (
          <Form
            className="flex flex-col items-center justify-center bg-white w-[381px] sm-max:w-[320px] rounded-lg p-6"
            action=""
          >
            <H1Title
              BoldTitle={"رمز عبور جدید"}
              H1class={"h-9 text-2xl text-right font-semibold self-start"}
            />
            <div className="w-full py-8 grid gap-3">
              <Field
                type="password"
                name="NewPassword"
                placeholder="رمز عبور جدید"
                className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                onChange={handleChange}
              />
              <ErrorMessage
                name="NewPassword"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                type="password"
                name="repeatNewPassword"
                placeholder="تکرار رمز عبور جدید"
                className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                onChange={handleChange}
              />
              <ErrorMessage
                name="repeatNewPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <ButtonComponent
              Type="submit"
              ButtonClass={
                "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
              }
            >
              تغییر رمز
            </ButtonComponent>
            <Modal
              modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
              modalHeader={"رمز عبور شما با موفقیت تغییر یافت"}
              modalHeaderClass="mt-3 mb-0 pb-0 text-center mx-auto flex justify-center"
              modalBody={<></>}
              modalFooterClass="flex justify-between items-center -mt-3"
              modalFooter={
                <div className="w-full flex justify-center">
                  <ButtonComponent
                    onClick={() => {showModalHandler(); navigate("/Login")}}
                    children="ورود به حساب"
                    ButtonClass="bg-[#43A047]  text-xs font-bold h-11 flex items-center justify-center"
                  />
                </div>
              }
              Open={showModals.showModalOrigin}
              HandleOpen={showModalHandler}
            />
            <ToastContainer rtl={true} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPassword;
