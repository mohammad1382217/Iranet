import React, { Suspense } from "react";
import * as yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/apiConfig";
import loginBg from "../assets/images/login-bg.webp";
import { Link, useNavigate } from "react-router-dom";
import { H1Title, Parag } from "../components/tools";
import { ToastContainer, toast } from "react-toastify";
import { validateIranianNationalCode } from "../Login/page";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SkeletonButton from "antd/lib/skeleton/Button";
import {
  useDispatch,
  appSlice,
  useSelector,
  selectShowModals,
  fetchAddAccountThunk,
} from "../../lib/redux";

const Modal = React.lazy(() => import("../components/Modal"));
const ButtonComponent = React.lazy(() => import("../components/Button"));
const ArrowRightCircleIcon = React.lazy(
  () => import("@heroicons/react/24/outline/ArrowRightCircleIcon")
);
const Button = React.lazy(() => import("antd/es/button/index"));

export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const validationSchema = yup.object().shape({
  first_name: yup.string().required("وارد کردن نام الزامی می باشد."),
  last_name: yup.string().required("وارد کردن نام خانوادگی الزامی می باشد."),
  nid: yup
    .string()
    .required("وارد کردن کدملی الزامی می باشد.")
    .test(
      "validateIranianNationalCode",
      " کد ملی معتبر نمی باشد.",
      validateIranianNationalCode
    ),
    phone_number: yup
    .string()
    .required("وارد کردن شماره تماس الزامی می باشد.")
    .matches(
      /^09([0][1-5]|[1][0-9]|[3][1-9]|[2][1-9]|[9][0-9])[0-9]{7}$/,
      "شماره تلفن را درست وارد کنید"
    ),
});

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModals = useSelector(selectShowModals);
  const showModalHandler = () =>
    dispatch(appSlice.actions.setShowModals("showModalOrigin"));
  const showModalSeccessFullyRegisterHandler = () =>
    dispatch(appSlice.actions.setShowModals("showModalSeccessFullyRegister"));

  const showToastSuccessMessage = () => {
    toast.success( "ساخت حساب با موفقیت انجام شد.",
      {
        position: "top-center",
      }
    );
  };

  const showToastMessage = () => {
    toast.error("خطایی سمت سرور رخ داده لطفا بعد از مدتی دوباره تلاش کنید!", {
      position: "top-center",
    });
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen m-auto !overflow-auto gap-20"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          nid: "",
          phone_number: "",
        }}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
            console.log(values);
            const handlePostRegister = async () => {
              try {
                await dispatch(fetchAddAccountThunk(values)).unwrap();
                navigate("/login");
                showToastSuccessMessage();
              } catch (error: any) {
                if (axios.isCancel(error)) {
                  showToastMessage();
                  console.log("Request canceled:", error.message);
                } else {
                  showToastMessage();
                  console.error("Error fetching data:", error);
                }
              }
            };
            handlePostRegister();
          }
          // You can perform further actions with the form values here
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange }) => (
          <Form
            className="flex flex-col items-center justify-center bg-white w-[381px] sm-max:w-[320px] rounded-lg p-6 mt-28"
            action=""
          >
            <div className="max-w-sm w-full">
              <div className="flex flex-col gap-2">
                <H1Title
                  BoldTitle={"ساخت حساب کاربری جدید"}
                  H1class={"h-9 w-[16.5rem] text-2xl text-right font-semibold"}
                />
                <Parag
                  Paragraph={"برای ساخت حساب جدید، اطلاعات خود را وارد کنید."}
                  Pclass={"text-base text-gray-600 text-right font-normal"}
                />
              </div>

              <div className="pt-8 pb-6 grid gap-3">
                <Field
                  placeholder="نام"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="first_name"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <Field
                  placeholder="نام خانوادگی"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="last_name"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <Field
                  placeholder="کد ملی"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="nid"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="nid"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <Field
                  placeholder="شماره تماس"
                  type="text"
                  className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  name="phone_number"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="phone_number"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="grid gap-4 mb-10">
                <p
                  lang="fa"
                  role="text"
                  className="text-sm font-medium text-gray-600"
                >
                  ساخت حساب به منزله تایید{" "}
                  <span
                    onClick={showModalHandler}
                    className="text-sm font-semibold text-textColor mx-1 cursor-pointer select-none"
                  >
                    قوانین و مقررات
                  </span>{" "}
                  سامانه است
                </p>
                <Suspense fallback={<SkeletonButton />}>
                  <ButtonComponent
                    Type="submit"
                    ButtonClass={
                      "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                    }
                  >
                    ساخت حساب
                  </ButtonComponent>
                </Suspense>
                <div className="flex items-center justify-center">
                  <Parag
                    Paragraph={"در حال حاضر حساب کاربری دارد؟"}
                    Pclass={"text-sm font-medium text-gray-600"}
                  />
                  <Link to={"/Login"}>
                    <Parag
                      Paragraph={"وارد شوید"}
                      Pclass={"text-sm font-semibold text-textColor mx-1"}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <Suspense fallback={<div>loading...</div>}>
              <Modal
                modalClass="!min-w-[30%]"
                modalHeader={
                  <div className="flex flex-col gap-2">
                    <H1Title
                      BoldTitle={"قوانین و مقررات"}
                      H1class={
                        "h-9 w-[16.5rem] text-2xl text-right font-semibold"
                      }
                    />
                    <Parag
                      Paragraph={
                        "قوانین و مقررات کاربران سامانه باشگاه مشتریان ایرانت"
                      }
                      Pclass={"text-base text-gray-600 text-right font-normal"}
                    />
                  </div>
                }
                modalBodyClass="!py-0"
                modalBody={
                  <>
                    <ol className="list-decimal pr-5">
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate, iste nemo nisi rem labore molestiae magni
                        nobis provident et voluptas quae mollitia eligendi quam
                        laborum non veniam repellat libero dolorem.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate, iste nemo nisi rem labore molestiae magni
                        nobis provident et voluptas quae mollitia eligendi quam
                        laborum non veniam repellat libero dolorem.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptate, iste nemo nisi rem labore molestiae magni
                        nobis provident et voluptas quae mollitia eligendi quam
                        laborum non veniam repellat libero dolorem.
                      </li>
                    </ol>
                  </>
                }
                modalFooter={
                  <Button
                    onClick={() => {
                      showModalHandler();
                      showModalSeccessFullyRegisterHandler();
                    }}
                    type="link"
                    className="flex items-center justify-center mt-1 mb-5 mx-auto !outline-0 active:!border-none active:!outline-none"
                    icon={
                      <ArrowRightCircleIcon
                        color="#E53935"
                        strokeWidth={2.5}
                        className={"h-3.5 w-3.5 mx-auto"}
                      />
                    }
                  >
                    <span className="text-sm text-textColor font-medium outline-0 hover:border-none">
                      برگشت
                    </span>
                  </Button>
                }
                Open={showModals.showModalOrigin}
                HandleOpen={showModalHandler}
              />
            </Suspense>
          </Form>
        )}
      </Formik>
      <ToastContainer rtl={true} />
    </div>
  );
};

export default Register;