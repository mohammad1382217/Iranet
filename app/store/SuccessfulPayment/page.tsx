import React from "react";
const Button = React.lazy(() => import( "antd/es/button/index"));
import { Link } from "react-router-dom";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import CustomTable, { CustomColumnType } from "../../components/Table";
import successfullPayment from "../../assets/images/SuccessfullPayment.svg";
import LazyImage from "../../components/LazyImage";

const data: SuccessfulPaymentData[] = [
  {
    key: "1",
    title: "تاریخ",
    value: "1400/00/00 - 12:21’",
  },
  {
    key: "2",
    title: "شماره ارجاع / پیگیری",
    value: "123456",
  },
  {
    key: "3",
    title: "نام پذیرنده",
    value: "لورم اپیسوم",
  },
  {
    key: "4",
    title: "کد پذیرنده",
    value: "123456789",
  },
  {
    key: "5",
    title: "شماره کارت",
    value: "012345******1234",
  },
  {
    key: "6",
    title: "نام پرداخت کننده",
    value: "محمد محمدی",
  },
  {
    key: "7",
    title: "شناسه پرداخت",
    value: "12345",
  },
];

const columns: CustomColumnType<SuccessfulPaymentData>[] = [
  {
    title: "",
    dataIndex: "title",
    align: "right",
  },
  {
    title: "",
    dataIndex: "value",
    align: "left",
  },
];

const SuccessfulPayment: React.FC = () => {
  return (
    <div className="h-screen max-w-md flex flex-col items-center justify-center gap-4 mt-20 p-6 mx-auto">
      <LazyImage className="bg-cover" src={successfullPayment} alt="" width={10} height={10} />
      <h1 className="text-green-500 text-3xl font-bold text-center">
        پرداخت با موفقیت انجام شد
      </h1>
      <p lang="fa" role="text" className="text-gray-600">
        مبلغ: <span className="text-textColor">150.000 تومان</span>
      </p>
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <CustomTable
          size="large"
          dataSource={data}
          columns={columns}
          theme={"secondary"}
          pagination={false}
          showHeader={false}
        />
      </div>
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

export default SuccessfulPayment;

// types
interface SuccessfulPaymentData {
  key: string;
  title: string;
  value: string;
}
