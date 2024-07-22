import React from "react";
import img404 from "../assets/images/404page.svg";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#F5F5F5] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={img404} alt="" />
        <span className="text-4xl sm-max:text-3xl font-bold text-textColor mt-6 mb-3">
          صفحه یافت نشد{" "}
        </span>
        <Link to={"/"}>
          <p lang="fa" role="text" className="text-[#757575] text-xl sm-max:text-lg font-medium">
          برای ورود به صفحه اصلی سامانه،
          <span className="text-textColor cursor-pointer">کلیک کنید</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
