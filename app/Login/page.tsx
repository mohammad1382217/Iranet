import React, { Suspense } from "react";
import * as yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/apiConfig";
import loginBg from "../assets/images/login-bg.webp";
import { Link, useNavigate } from "react-router-dom";
import { H1Title, Parag } from "../components/tools";
import { ToastContainer } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginSlice, useDispatch } from "../../lib/redux";
import Skeleton from "antd/es/skeleton/Skeleton";

// Lazy load ButtonComponent
const ButtonComponent = React.lazy(() => import("../components/Button"));

export const validateIranianNationalCode = (nationalCode: string): boolean => {
  if (/^[0-9]{10}$/.test(nationalCode)) {
    const check = parseInt(nationalCode[9]);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(nationalCode[i]) * (10 - i);
    }
    const reminder = sum % 11;

    if (
      (reminder < 2 && check === reminder) ||
      (reminder >= 2 && check === 11 - reminder)
    ) {
      return true;
    }
  }
  return false;
};

const validationSchema = yup.object().shape({
  nid: yup
    .string()
    .required("وارد کردن کدملی الزامی می باشد.")
    .test(
      "validateIranianNationalCode",
      " کد ملی معتبر نمی باشد.",
      validateIranianNationalCode
    ),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const showToastErrorMessage = (error: string) => {
  //   toast.error(error, {
  //     position: "top-center",
  //   });
  // };

  // const showToastMessage = () => {
  //   toast.error("خطایی سمت سرور رخ داده لطفا بعد از مدتی دوباره تلاش کنید!", {
  //     position: "top-center",
  //   });
  // };

  // const handleStatus = (response: AxiosResponse<any, any>) => {
  //   switch (response.data.nid[0]) {
  //     case -3:
  //       // handleNotCompleteSupplementary(response.headers["authorization"]);
  //       break;
  //     case "User Not Found!":
  //       showToastErrorMessage("کاربر مورد نظر وجود ندارد!");
  //       break;
  //     default:
  //       showToastMessage();
  //       break;
  //   }
  // };

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
          nid: "",
        }}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
            const handlePostLogin = async () => {
              try {
                const response = await axiosInstance.post("api/core/login/", values);
                dispatch(loginSlice.actions.setPhoneNumber(response.data.phone_number));
                navigate("/otp-valid");
                // handleStatus(response);
              } catch (error: any) {
                if (axios.isCancel(error)) {
                  console.log("Request canceled:", error.message);
                } else {
                  console.error("Error fetching data:", error);
                }
              }
            };
            handlePostLogin();
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
                  BoldTitle={"ورود به حساب کاربری"}
                  H1class={"h-9 text-2xl text-right font-semibold"}
                />
                <Parag
                  Paragraph={"برای ورود به حساب، اطلاعات خود را وارد کنید."}
                  Pclass={"text-base text-gray-600 text-right font-normal"}
                />
              </div>
              <div className="py-6 grid gap-3">
                <Field
                  type="text"
                  name="nid"
                  placeholder="کد ملی"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="nid"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <ToastContainer rtl={true} />
              <div className="grid gap-4">
                <Suspense fallback={<Skeleton className="w-full"/>}>
                  <ButtonComponent
                    Type="submit"
                    ButtonClass={
                      "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                    }
                  >
                    مرحله بعد
                  </ButtonComponent>
                </Suspense>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;