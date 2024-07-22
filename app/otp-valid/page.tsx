// import * as yup from "yup";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import React, { FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import loginBg from "../assets/images/login-bg.webp";
import { H1Title, Parag } from "../components/tools";
import ButtonComponent from "../components/Button";
import {
  AccountData,
  fetchAccountDataThunk,
  loginSlice,
  selectOtp,
  selectPhoneNumber,
  useDispatch,
  useSelector,
  validateOtpThunk,
} from "../../lib/redux";
import axios from "axios";

const OtpValid = () => {
  const otp = useSelector(selectOtp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phone_number = useSelector(selectPhoneNumber);

  const showToastErrorMessage = (error: string) => {
    toast.error(error, {
      position: "top-center",
    });
  };

  const handleStatus = (account: AccountData[]) => {
    if (account[0]?.is_staff) {
      navigate("/admin/Dashboard");
    } else {
      if (account[0]?.verified && account[0].store.is_fill_default_text) {
        navigate("/store/Dashboard");
      } else {
        navigate("/users/Dashboard");
      }
    }
  };

  const formatIranianPhoneNumber = (phoneNumber: string) => {
    // حذف هر گونه کاراکتر اضافی (مثلاً فاصله، خط تیره و غیره)
    const cleanNumber = phoneNumber.replace(/[^\d]/g, "");

    // چک کردن طول شماره و صحت آن
    if (cleanNumber.length !== 11 || !cleanNumber.startsWith("09")) {
      navigate("/login");
      showToastErrorMessage("شماره تلفن معتبر نیست!");
    }

    // جدا کردن بخش‌های مختلف شماره
    const countryCode = "+98";
    const areaCode = cleanNumber.substring(1, 4);
    const stars = "****";
    const lastThreeDigits = cleanNumber.substring(8);

    // ساختن شماره به فرمت دلخواه
    return `${countryCode} ${areaCode} ${stars} ${lastThreeDigits}`;
  };

  const handleOtp = (e: string) => {
    dispatch(loginSlice.actions.setOtp(e));
    console.log(otp);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // ارسال OTP و دریافت توکن
      await dispatch(validateOtpThunk({ phone_number, otp })).unwrap();
      // در صورت موفقیت‌آمیز بودن OTP، دریافت اطلاعات حساب کاربری
      const resAcc = await dispatch(fetchAccountDataThunk()).unwrap();
      localStorage.setItem('id', resAcc[0].id);
      handleStatus(resAcc);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    }
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
      <form
        className="flex flex-col items-center justify-center bg-white w-[381px] sm-max:w-[320px] rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <H1Title
              dir="ltr"
              BoldTitle={formatIranianPhoneNumber(phone_number)}
              H1class={"h-9 text-2xl text-right font-semibold"}
            />
            <Parag
              Paragraph={"کد ارسال شده به شماره خود را اینجا وارد کنید."}
              Pclass={"text-base text-gray-600 text-right font-normal"}
            />
          </div>
          <div className="py-6 grid gap-3">
            <OtpInput
              value={otp}
              onChange={(otp) => handleOtp(otp)}
              numInputs={6}
              inputStyle={"!w-[50px] !h-[60px] border border-solid rounded-lg"}
              containerStyle={"w-full justify-between flex-row-reverse"}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
            />
          </div>
          <ToastContainer rtl={true} />
          <div className="grid gap-4">
            <ButtonComponent
              Type="submit"
              ButtonClass={
                "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
              }
            >
              ورود به حساب
            </ButtonComponent>
            <div className="flex items-center justify-center">
              <Parag
                Paragraph={"شماره را اشتباه وارد کردید؟"}
                Pclass={"text-sm font-medium text-gray-600"}
              />
              <Link to={"/Register"}>
                <Parag
                  Paragraph={"تغییر شماره"}
                  Pclass={"text-sm font-medium text-textColor mx-1"}
                />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpValid;