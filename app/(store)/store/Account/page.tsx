import React from "react";
import { selectAccount, useSelector } from "../../../../lib/redux";
import HeaderWithButton from "../../../components/HeaderWithButton";
import LazyImage from "../../../components/LazyImage";
import edit from "../../../assets/svg/edit.svg";

const Account: React.FC = () => {
  // const navigate = useNavigate();
  const account = useSelector(selectAccount);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 p-10">
      <HeaderWithButton HeaderTitle={"حساب کاربری"} />
      <div className="w-full flex items-center justify-center gap-10">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <HeaderWithButton HeaderTitle={"اطلاعات کاربر"} />
          <div className="flex flex-col items-center justify-between container p-3 bg-white border-[#ECEFF1] border-2 rounded-md">
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  نام : <span className="font-bold">{account?.first_name}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  نام خانوادگی :{" "}
                  <span className="font-bold">{account?.last_name}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  کدملی <span className="font-bold">{account?.nid}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  تاریخ تولد{" "}
                  <span className="font-bold">{account?.birth_date}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  شماره تماس :{" "}
                  <span className="font-bold">{account?.phone_number}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  تصویر کارت ملی مالک:{" "}
                  <span className="font-bold">{account?.phone_number}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  شماره کارت بانکی مالک :{" "}
                  <span className="font-bold">{account?.bank_number}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <HeaderWithButton HeaderTitle={"اطلاعات فروشگاه"} />
          <div className="flex flex-col items-center justify-between container p-3 bg-white border-[#ECEFF1] border-2 rounded-md">
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  نام فروشگاه :{" "}
                  <span className="font-bold">{account?.first_name}</span>
                </p>
                <button className="flex float-left">
                  <div className="w-4 h-4">
                    <LazyImage src={edit} alt="edit" width={16} height={16} />
                  </div>
                  <span className="text-blue-gray-600 mr-2 font-normal text-sm">
                    ویرایش مشخصات
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  آدرس: <span className="font-bold">{account?.last_name}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  کد پستی:<span className="font-bold">{account?.nid}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  شماره تلفن:{" "}
                  <span className="font-bold">{account?.birth_date}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  صنف:{" "}
                  <span className="font-bold">{account?.phone_number}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  فایل تبلیغاتی:{" "}
                  <span className="font-bold">{account?.bank_number}</span>
                </p>
                <p className="text-blue-gray-600 text-base font-normal">
                  لوگوی فروشگاه:{" "}
                  <span className="font-bold">{account?.bank_number}</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-row p-1 justify-between w-full">
                <p className="text-blue-gray-600 text-base font-normal">
                  متن خوشامدگویی:{" "}
                  <span className="font-bold">{account?.phone_number}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;