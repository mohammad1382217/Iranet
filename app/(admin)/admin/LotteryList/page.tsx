import React from "react";
const Button = React.lazy(() => import("antd/es/button/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
import { Link, useNavigate } from "react-router-dom";
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { type CustomColumnType } from "../../../components/Table";

const data: DataType[] = [
  {
    key: "1",
    titleStore: "فروشگاه شماره 1",
    titleLottery: "قرعه کشی شماره 1",
    date: "1402/10/10",
    winners: "واریز به حساب",
  },
  {
    key: "2",
    titleStore: "فروشگاه شماره 2",
    titleLottery: "قرعه کشی شماره 2",
    date: "1401/10/20",
    winners: "پرداخت مستقیم",
  },
  {
    key: "3",
    titleStore: "فروشگاه شماره 3",
    titleLottery: "قرعه کشی شماره 3",
    date: "1400/12/21",
    winners: "پرداخت مستقیم",
  },
  {
    key: "4",
    titleStore: "فروشگاه شماره 4",
    titleLottery: "قرعه کشی شماره 4",
    date: "1400/08/08",
    winners: "واریز به حساب",
  },
];

const LotteryList: React.FC = () => {
  const navigate = useNavigate();

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "titleStore",
      key: "titleStore",
      // align: "center",
      searchProps: true,
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "شماره تماس مدیریت فروشگاه",
      dataIndex: "userName",
      key: "userName",
      // align: "center",
      searchProps: true,
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "عنوان قرعه کشی",
      dataIndex: "titleLottery",
      key: "titleLottery",
      // align: "center",
      searchProps: true,
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "تعداد برگزیدگان",
      dataIndex: "titleLottery",
      key: "titleLottery",
      // align: "center",
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text) => (
        <Tag
          color="#2196F3"
          className="flex items-center justify-center text-center w-max text-xs font-bold rounded-full px-2"
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text) => <Link to={""}>{text}</Link>,
    },
    {
      title: "برندگان",
      dataIndex: "winners",
      key: "winners",
      align: "center",
      render: (index: number) => (
        <Button
          className="p-0"
          type="link"
          onClick={() => navigate(`/admin/LotteryList/ShowLotteryWinners/${index - 1}`)}
        >
          مشاهدۀ برندگان
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton HeaderTitle={"لیست تمام قرعه کشی ها"} />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <CustomTable
          bordered
          size="large"
          dataSource={data}
          columns={columns}
          theme="primary"
        />
      </div>
    </div>
  );
};

export default LotteryList;

// Types
interface DataType {
  key: React.Key;
  titleStore: string;
  titleLottery: string;
  date: string;
  winners: string;
}
