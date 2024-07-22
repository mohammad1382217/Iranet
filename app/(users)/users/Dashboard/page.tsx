import React from "react";
import IconButton from "@material-tailwind/react/components/IconButton/index";
import { LuUserCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import {
  fetchAccountDataThunk,
  fetchStoreThunk,
  selectAccount,
  useSelector,
  useDispatch,
  selectStoreAccount
} from "../../../../lib/redux";

const Spin = React.lazy(() => import("antd/es/spin/index"));

const UsersDashboard = () => {
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const StoreAccount = useSelector(selectStoreAccount);

  const [loading, setloading] = React.useState(false);

  React.useEffect(() => {
    setloading(true);
    Promise.allSettled([dispatch(fetchAccountDataThunk()),dispatch(fetchStoreThunk())]);
    setloading(false);
  }, [dispatch]);

  const StatusRender: React.FC = () => {
    if (
      account?.bank_number === null &&
      account?.birth_date === null &&
      account?.national_card === null &&
      account?.verified === false
    ) {
      return (
        <div className="bg-[#FAFAFA] rounded-lg gap-3 md-max:p-3 p-5 w-full flex flex-row items-center justify-between mt-10">
          <div>
            <h1 className="text-textColor font-semibold text-xl">
              وضعیت ثبت فروشگاه
            </h1>
            <section className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D9D9D9] ml-2 mt-2"></div>
              <p
                lang="fa"
                role="text"
                className="text-[#212121] flex flex-row justify-center items-center font-normal text-base mt-2"
              >
                برای ثبت فروشگاه، ابتدا باید هویت خود را احراز کنید
              </p>
            </section>
          </div>
          <Link
            to={""}
            className=" gap-3 md-max:gap-0  flex items-center justify-center"
          >
            <span className="text-[#00503A] md-max:text-xs font-light ml-1">
              احراز هویت
            </span>
            <IconButton className="bg-[#2DCEA2] rounded-xl">
              <LuUserCheck className="h-5 w-5 text-[#FFFFFF]" />
            </IconButton>
          </Link>
        </div>
      );
    } else if (StoreAccount?.status === "P") {
      return (
        <div className="bg-[#FAFAFA] rounded-lg gap-3 md-max:p-3 p-5 w-full flex flex-row items-center justify-between mt-10">
          <div>
            <h1 className="text-textColor font-semibold text-xl">
              وضعیت ثبت فروشگاه
            </h1>
            <section className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1890FF] ml-2 mt-2"></div>
              <p
                lang="fa"
                role="text"
                className="text-[#212121] flex flex-row justify-center items-center font-normal text-base mt-2"
              >
                اطلاعات فروشگاه ثبت شده و در انتظار تایید ادمین می‌باشد{" "}
              </p>
            </section>
          </div>
          <p className="text-base font-light text-[#BDBDBD]">در انتظار تایید</p>
        </div>
      );
    } else if (StoreAccount?.status === "A") {
      return (
        <div className="bg-[#FAFAFA] rounded-lg gap-3 md-max:p-3 p-5 w-full flex flex-row items-center justify-between mt-10">
          <div>
            <h1 className="text-textColor font-semibold text-xl">
              وضعیت ثبت فروشگاه
            </h1>
            <section className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#52C41A] ml-2 mt-2"></div>
              <p
                lang="fa"
                role="text"
                className="text-[#212121] flex flex-row justify-center items-center font-normal text-base mt-2"
              >
                تبریک! فروشگاه شما توسط ادمین تایید شد
              </p>
            </section>
          </div>
          <Link
            to={"/store"}
            className=" gap-3 md-max:gap-0  flex items-center justify-center"
          >
            <span className="text-[#00503A] md-max:text-xs font-light ml-1">
              ورود به پنل مدیریت فروشگاه{" "}
            </span>
            <IconButton className="bg-[#2DCEA2] rounded-xl">
              <FaCheck className="h-5 w-5 text-[#FFFFFF]" />
            </IconButton>
          </Link>
        </div>
      );
    } else if (StoreAccount?.status === "D") {
      return (
        <div className="bg-[#FAFAFA] rounded-lg gap-3 md-max:p-3 p-5 w-full flex flex-row items-center justify-between mt-10">
          <div>
            <h1 className="text-textColor font-semibold text-xl">
              وضعیت ثبت فروشگاه
            </h1>
            <section className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF4D4F] ml-2 mt-2"></div>
              <p
                lang="fa"
                role="text"
                className="text-[#212121] flex flex-row justify-center items-center font-normal text-base mt-2"
              >
                اطلاعات فروشگاه شما توسط ادمین تایید نشد{" "}
              </p>
            </section>
          </div>
          <Link
            to={"/users/tickets"}
            className=" gap-3 md-max:gap-0  flex items-center justify-center"
          >
            <span className="text-[#00503A] md-max:text-xs font-light ml-1">
              مشاهده پاسخ ادمین{" "}
            </span>
            <IconButton className="bg-[#2DCEA2] rounded-xl">
              <CiMail className="h-5 w-5 text-[#FFFFFF]" />
            </IconButton>
          </Link>
        </div>
      );
    } else if (
      account?.verified === true &&
      account?.store?.store_id === "" &&
      account?.store?.store_status === ""
    ) {
      return (
        <div className="bg-[#FAFAFA] rounded-lg gap-3 md-max:p-3 p-5 w-full flex flex-row items-center justify-between mt-10">
          <div>
            <h1 className="text-textColor font-semibold text-xl">
              وضعیت ثبت فروشگاه
            </h1>
            <section className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D9D9D9] ml-2 mt-2"></div>
              <p
                lang="fa"
                role="text"
                className="text-[#212121] flex flex-row justify-center items-center font-normal text-base mt-2"
              >
                هویت شما احراز شد. در حال حاضر فروشگاهی برای شما ثبت نشده است{" "}
              </p>
            </section>
          </div>
          <Link
            to={"/users/Registeration"}
            className=" gap-3 md-max:gap-0  flex items-center justify-center"
          >
            <span className="text-[#00503A] md-max:text-xs font-light ml-1">
              ثبت فروشگاه
            </span>
            <IconButton className="bg-[#2DCEA2] rounded-xl">
              <HiOutlineShoppingBag className="h-5 w-5 text-[#FFFFFF]" />
            </IconButton>
          </Link>
        </div>
      );
    } else if (
      account?.bank_number !== null &&
      account?.birth_date !== null &&
      account?.national_card !== null &&
      account?.verified === true &&
      account?.store?.store_id !== "" &&
      account?.store?.store_status !== ""
    ) {
      return (
        <div className="bg-[#FAFAFA] rounded-lg gap-3 md-max:p-3 p-5 w-full flex flex-row items-center justify-between mt-10">
          <div>
            <h1 className="text-textColor font-semibold text-xl">
              وضعیت ثبت فروشگاه
            </h1>
            <section className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1890FF] ml-2 mt-2"></div>
              <p
                lang="fa"
                role="text"
                className="text-[#212121] flex flex-row justify-center items-center font-normal text-base mt-2"
              >
                اطلاعات فروشگاه ثبت شده و در انتظار تایید ادمین می‌باشد
              </p>
            </section>
          </div>
          <p className="text-base font-light text-[#BDBDBD]">در انتظار تایید</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
        <div className="bg-[#FAFAFA] rounded-lg gap-6 p-5">
          <h1 className="text-textColor font-semibold text-2xl">
            سامانه باشگاه مشتریان ایرانت
          </h1>
          <p
            lang="fa"
            role="text"
            className="text-[#212121] font-normal text-lg mt-5"
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است. و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد.
          </p>
        </div>

        <StatusRender />
      </div>
    </Spin>
  );
};

export default UsersDashboard;