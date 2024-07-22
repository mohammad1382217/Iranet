import React from "react";
import xmark from "../../assets/images/circle-xmark-solid.svg";
import { Link } from "react-router-dom";
const Button = React.lazy(() => import( "antd/es/button/index"));
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import LazyImage from "../../components/LazyImage";

const FailedPayment = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 mt-20 p-6">
      <LazyImage className="bg-cover" src={xmark} alt="" width={10} height={10} />
      <h1 className="text-red-600 text-3xl font-bold">
        پرداخت موفقیت آمیز نبود
      </h1>
      <p lang="fa" role="text" className="text-gray-600 text-xl font-medium max-w-lg text-justify">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است
      </p>
      <div className="grid gap-4 w-80 items-center justify-center">
        <Link to={`/store/`}>
          <Button
            type="link"
            className="flex items-center justify-center mx-auto"
            icon={
              <HiOutlineArrowCircleRight
                className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
              />
            }
          >
            <span className="text-sm text-textColor font-medium">
              برگشت به داشبورد
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FailedPayment;
