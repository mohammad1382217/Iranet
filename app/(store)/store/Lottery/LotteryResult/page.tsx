import { Button, ConfigProvider, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import fa_IR from "antd/locale/fa_IR";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Parag } from "../../../../components/tools";
import Button_component from "../../../../components/Button";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const data: DataType[] = [
  {
    key: "1",
    name: "محمد",
    family: "محمدی",
    winners: "09197478890",
  },
  {
    key: "2",
    name: "محمد",
    family: "محمدی",
    winners: "09109669332",
  },
  {
    key: "3",
    name: "محمد",
    family: "محمدی",
    winners: "09109669332",
  },
  {
    key: "4",
    name: "محمد",
    family: "محمدی",
    winners: "09197478890",
  },
];

const LotteryResult: React.FC = () => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "33.3%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "family",
      key: "family",
      align: "center",
      width: "33.3%",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "شماره تلفن",
      dataIndex: "winners",
      key: "winners",
      align: "center",
      width: "33.3%",
      render: (text: string) => <a>{text}</a>,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-10 sm:!p-5 xl:w-full h-full">
      <div className="w-full h-16 rounded-lg flex p-3 justify-center items-center">
        <Parag
          Paragraph={"نتایج قرعه کشی"}
          Pclass={"text-center text-4xl lg:text-2xl font-bold"}
        />
      </div>
      <div className="mb-5 w-full p-0 bg-cover rounded-lg md:mb-3 hover:cursor-pointer">
        <ConfigProvider locale={fa_IR}>
          <Table
            className="mt-5"
            bordered
            dataSource={data}
            columns={columns}
          />
        </ConfigProvider>
      </div>
      <div className="grid gap-4 w-80 items-center">
        <Button_component
          ButtonClass={
            "w-full gap-2 text-sm px-[1.125rem] py-2.5 text-white rounded-lg bg-secondary hover:bg-hover-secondary shadow-gray-500/20"
          }
          onClick={()=> navigate("/store/Lottery")}
        >
          ثبت نتیجه
        </Button_component>
        <NavLink to={`/store/Lottery`}>
          <Button
            type="link"
            className="flex items-center justify-center mx-auto"
            icon={
              <HiOutlineArrowCircleRight
                className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
              />
            }
          >
            <span className="text-sm text-[#151515] font-medium">
              برگشت به داشبورد
            </span>
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default LotteryResult;

interface DataType {
  key: React.Key;
  name: string;
  family: string;
  winners: string;
}
