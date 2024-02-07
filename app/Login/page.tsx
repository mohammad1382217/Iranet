import {
  loginSlice,
  selectSubmitInfo,
  submitInfo,
  useDispatch,
  useSelector,
} from "../../lib/redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { H1Title, Parag } from "../components/tools";
import Button_component from "../components/Button";
import loginBg from "../assets/images/login-bg.png";
import { IoEllipseOutline } from "react-icons/io5";
import * as yup from "yup";
import React from "react";
import md5 from "md5";
import axios from "axios";
import { BASE_URL } from "../api/apiConfig";

const validateIranianNationalCode = (nationalCode: string): boolean => {
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

export const hash = (e: React.ChangeEvent<HTMLInputElement>): string => {
  const PasswordPlus: string = e.target.value + "deraz konandeh";
  return md5(PasswordPlus);
};

const validationSchema = yup.object().shape({
  owner_nid: yup
    .string()
    .required("وارد کردن کدملی الزامی می باشد.")
    .test(
      "validateIranianNationalCode",
      " کد ملی معتبر نمی باشد.",
      validateIranianNationalCode
    ),
  store_password: yup
    .string()
    .required("وارد کردن رمز عبور فروشگاه الزامی می باشد.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
      "پسورد باید حداقل ۸ کاراکتر و شامل حروف و اعداد باشد."
    ),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitInfo = useSelector(selectSubmitInfo);

  return (
    <div
      className="flex flex-col justify-end items-center w-screen h-screen m-auto"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Formik
        initialValues={submitInfo}
        onSubmit={(values) => {
          // Handle form submission
          if (values) {
            navigate("/store/Dashboard");
          }
          console.log("Final form values:", values);
          const handlePostLogin = async () => {
            try {
              const response = await axios.post(`${BASE_URL}login`, values);
              const data = response.data;
              // dispatch(setLoginData([...LoginData, data]));
            } catch (error: any) {
              if (error.response) {
                console.log(error.message);
              }
            }
          };
          handlePostLogin();
          // You can perform further actions with the form values here
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, setFieldValue }) => (
          <div className="p-6">
            <div className="flex flex-col justify-center items-end rounded-lg p-6 bg-white mx-auto">
              <Form
                className="flex flex-col items-center justify-center"
                action=""
              >
                <div className="max-w-sm w-full">
                  <div>
                    <H1Title
                      BoldTitle={"ورود به حساب کاربری"}
                      H1class={"h-9 text-2xl text-right font-semibold"}
                    />
                  </div>
                  <div>
                    <Parag
                      Paragraph={"برای ورود به حساب، اطلاعات خود را وارد کنید."}
                      Pclass={"text-base text-gray-600 text-right font-normal"}
                    />
                  </div>
                  <div className="py-8 grid gap-3">
                    <Field
                      placeholder="کد ملی"
                      type="text"
                      className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      name="owner_nid"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        const { name, value } = e.target;
                        setFieldValue(name, value);
                        dispatch(
                          loginSlice.actions.setSubmitInfo({
                            key: name as keyof submitInfo,
                            value: value,
                          })
                        );
                      }}
                    />
                    <ErrorMessage
                      name="owner_nid"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <Field
                      placeholder="رمز عبور"
                      type="password"
                      className="outline-0 bg-white h-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                      name="store_password"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        const { name, value } = e.target;
                        setFieldValue(name, value);
                        dispatch(
                          loginSlice.actions.setSubmitInfo({
                            key: name as keyof submitInfo,
                            value: hash(e),
                          })
                        );
                      }}
                    />
                    <ErrorMessage
                      name="store_password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="grid gap-4">
                    <Button_component
                      Type="submit"
                      children={"ورود به حساب"}
                      ButtonClass={
                        "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
                      }
                    />
                    <div className="flex items-center justify-center">
                      <Parag
                        Paragraph={"حساب کاربری ندارید؟"}
                        Pclass={"text-sm font-medium text-gray-600"}
                      />
                      <Link to={"/Register"}>
                        <Parag
                          Paragraph={"ساخت حساب"}
                          Pclass={
                            "text-sm font-medium text-[#151515] mx-1 font-medium"
                          }
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <section className="flex justify-center items-center text-secondary gap-4 mt-20 mb-10 mx-auto">
        <IoEllipseOutline className="w-7 h-7 stroke-[3px]" />
        <Typography variant="h4" className="text-4xl font-normal">
          ایرانت
        </Typography>
      </section>
    </div>
  );
};

export default Login;