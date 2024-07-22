import React from "react";
import { Parag } from "../../../../components/tools";
import { Link } from "react-router-dom";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
const Button = React.lazy(() => import( "antd/es/button/index"));
import CustomTable, { CustomColumnType } from "../../../../components/Table";

const data: DataType[] = [
  {
    key: "1",
    winners: "09197478890",
  },
  {
    key: "2",
    winners: "09109669332",
  },
  {
    key: "3",
    winners: "09109669332",
  },
  {
    key: "4",
    winners: "09197478890",
  },
];

const LotteryWinners: React.FC = () => {
  const columns: CustomColumnType<DataType>[] = [
    {
      title: "ردیف",
      dataIndex: "key",
      key: "key",
      align: "center",
      
    },
    {
      title: "شماره تلفن",
      dataIndex: "winners",
      key: "winners",
      align: "center",
      
      searchProps: true,
      render: (text: string) => <Link to={""}>{text}</Link>,
    },
    {
      title: "ردیف",
      dataIndex: "key",
      key: "key",
      align: "center",
      
    },
    {
      title: "شماره تلفن",
      dataIndex: "winners",
      key: "winners",
      align: "center",
      
      searchProps: true,
      render: (text: string) => <Link to={""}>{text}</Link>,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <div className="w-full h-16 rounded-lg flex p-3 justify-center items-center">
        <Parag
          Paragraph={"نتایج قرعه کشی"}
          Pclass={"text-center text-4xl font-bold"}
        />
      </div>
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <CustomTable
          bordered
          size="large"
          dataSource={data}
          columns={columns}
          theme="primary"
        />
      </div>
      <div className="grid gap-4 w-80 items-center justify-center">
        <Link to={`/admin/LotteryList`}>
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

export default LotteryWinners;

export interface DataType {
  key: React.Key;
  winners: string;
}