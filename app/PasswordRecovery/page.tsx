import React from "react";
import * as yup from "yup";
import Modal from "../components/Modal";
import loginBg from "../assets/images/login-bg.webp";
import { H1Title, Parag } from "../components/tools";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../components/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  appSlice,
  selectShowModals,
  useDispatch,
  useSelector,
} from "../../lib/redux";

const validationSchema = yup.object().shape({
  owner_phone: yup
    .string()
    .required("وارد کردن شماره تماس الزامی می باشد.")
    .matches(
      /^09([0][1-5]|[1][0-9]|[3][1-9]|[2][1-9]|[9][0-9])[0-9]{7}$/,
      "شماره تلفن را درست وارد کنید"
    ),
});

const PasswordRecovery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModals = useSelector(selectShowModals);
  const showModalHandler = () => {
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
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
          owner_phone: "",
        }}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
            showModalHandler();
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
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <H1Title
                  BoldTitle={"بازیابی رمز عبور"}
                  H1class={"h-9 text-2xl text-right font-semibold"}
                />
                <Parag
                  Paragraph={
                    "شماره تماسی که با آن حساب کاربری دارید را وارد کنید"
                  }
                  Pclass={"text-sm text-gray-600 text-right font-normal"}
                />
              </div>
              <div className="py-8 grid gap-3">
                <Field
                  placeholder="شماره تماس"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="owner_phone"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    // const { name, value } = e.target;
                    // dispatch(
                    //   loginSlice.actions.setRegister({
                    //     key: name as keyof registers,
                    //     value: value,
                    //   })
                    // );
                  }}
                />
                <ErrorMessage
                  name="owner_phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* <ToastContainer rtl={true} /> */}
              <div className="grid gap-4">
                <ButtonComponent
                  Type="submit"
                  ButtonClass={
                    "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                  }
                >
                  بازیابی رمز
                </ButtonComponent>
                <div className="flex items-center justify-center">
                  <Parag
                    Paragraph={"حساب کاربری ندارید؟"}
                    Pclass={"text-sm font-medium text-gray-600"}
                  />
                  <Link to={"/Register"}>
                    <Parag
                      Paragraph={"ساخت حساب"}
                      Pclass={"text-sm font-medium text-textColor mx-1"}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <Modal
              modalClass="!min-w-[30%]"
              modalHeader={
                <Parag
                  Paragraph={"کد پیامک ارسال شده را وارد کنید"}
                  Pclass={"text-base text-blue-gray-500 font-normal"}
                />
              }
              modalBodyClass="!py-0"
              modalBody={
                <>
                  <Field
                    placeholder="کد ارسالی"
                    type="text"
                    className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    name="store_code"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      // const { name, value } = e.target;
                      // setFieldValue(name, value);
                      // dispatch(
                      //   loginSlice.actions.setRegister({
                      //     key: name as keyof registers,
                      //     value: value,
                      //   })
                      // );
                    }}
                  />
                  <ErrorMessage
                    name="store_code"
                    component="div"
                    className="text-red-500 text-sm text-"
                  />
                </>
              }
              modalFooter={
                <ButtonComponent
                  onClick={() => {navigate("/PasswordRecovery/NewPassword"); showModalHandler();}}
                  ButtonClass={
                    "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                  }
                >
                  تایید
                </ButtonComponent>
              }
              Open={showModals.showModalOrigin}
              HandleOpen={showModalHandler}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordRecovery;
