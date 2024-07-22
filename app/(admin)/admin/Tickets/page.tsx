import React from "react";
import { Link } from "react-router-dom";
const Button = React.lazy(() => import( "antd/es/button/index"));
const Space = React.lazy(() => import( "antd/es/space/index"));
import Switch from "antd/es/switch/index";
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
import "../../../components/TableInputNote/TableInputNote.scss";
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { CustomColumnType } from "../../../components/Table";

const data: DataType[] = [
  {
    key: 1,
    nameStore: "فروشگاه شماره 1",
    subject: "تیکت شمارۀ 1",
    idUser: 12345,
    DateMessage: "1400/00/00",
    department: "مالی",
    condition: "در انتظار پاسخ",
    answerPermission: false,
  },
  {
    key: 2,
    nameStore: "فروشگاه شماره 2",
    subject: "تیکت شمارۀ 2",
    idUser: 13945,
    DateMessage: "1402/00/00",
    department: "مدیریت",
    condition: "پاسخ داده شده",
    answerPermission: false,
  },
  {
    key: 3,
    nameStore: "فروشگاه شماره 3",
    subject: "تیکت شمارۀ 3",
    idUser: 19345,
    DateMessage: "1400/09/00",
    department: "ارسال پیامک",
    condition: "پاسخ داده شده و در حال بررسی",
    answerPermission: true,
  },
  {
    key: 4,
    nameStore: "فروشگاه شماره 4",
    subject: "تیکت شمارۀ 4",
    idUser: 14345,
    DateMessage: "1404/00/00",
    department: "پشتیبانی",
    condition: "در حال بررسی",
    answerPermission: false,
  },
  {
    key: 5,
    nameStore: "فروشگاه شماره 5",
    subject: "تیکت شمارۀ 5",
    idUser: 14345,
    DateMessage: "1404/00/00",
    department: "فنی",
    condition: "ارجاع به واحد مربوطه",
    answerPermission: false,
  },
];

const AdminTickets: React.FC = () => {
  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "nameStore",
      key: "nameStore",

      searchProps: true,
      // render: (_: string, record: DataType) => (
      //   <div className="w-full h-full">
      //     <p lang="fa" role="text"
      //       className={`${
      //         record.condition !== "در انتظار پاسخ" ? "" : "text-[#2F54EB]"
      //       }`}
      //     >
      //       {record.nameStore}
      //     </p>
      //   </div>
      // ),
    },
    {
      title: "موضوع",
      dataIndex: "subject",

      searchProps: true,
    },
    {
      title: "شناسه",
      dataIndex: "idUser",
      key: "idUser",
      align: "center",
      searchProps: true,
      render: (tags: string) => (
        <Tag
          key={tags}
          color="#1890FF"
          className="font-normal mx-auto rounded-lg text-xs text-[#FFFFFF]"
        >
          {tags}
        </Tag>
      ),
    },
    {
      title: "تاریخ آخرین پیام",
      dataIndex: "DateMessage",
      key: "DateMessage",
      align: "center",

      searchProps: true,
      sorter: (a: DataType, b: DataType) =>
        -a.DateMessage.localeCompare(b.DateMessage),
    },

    {
      title: "دپارتمان",
      dataIndex: "department",
      key: "department",

      align: "center",
      filters: [
        {
          text: "مالی",
          value: "مالی",
        },
        {
          text: "مدیریت",
          value: "مدیریت",
        },
        {
          text: "ارسال پیامک",
          value: "ارسال پیامک",
        },
        {
          text: "فنی",
          value: "فنی",
        },
        {
          text: "پشتیبانی",
          value: "پشتیبانی",
        },
        {
          text: "طراحی و تولید",
          value: "طراحی و تولید",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.department === value,
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      align: "center",

      filters: [
        {
          text: "در انتظار پاسخ",
          value: "در انتظار پاسخ",
        },
        {
          text: "پاسخ داده شده",
          value: "پاسخ داده شده",
        },
        {
          text: "پاسخ داده شده در حال بررسی",
          value: "پاسخ داده شده در حال بررسی",
        },
        {
          text: "در حال بررسی",
          value: "در حال بررسی",
        },
        {
          text: "ارجاع به واحد مربوطه",
          value: "ارجاع به واحد مربوطه",
        },
        {
          text: "بسته شد",
          value: "بسته شد",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.condition === value,
      render: (Condition: string) => (
        <span>
          {[Condition].map((tag) => {
            let color: string;
            if (tag === "پاسخ داده شده و در حال بررسی") {
              color = "blue";
            } else if (tag === "در انتظار پاسخ") {
              color = "orange";
            } else if (tag === "پاسخ داده شده") {
              color = "green";
            } else if (tag === "ارجاع به واحد مربوطه") {
              color = "#FF4D4F";
            } else if (tag === "در حال بررسی") {
              color = "#FADB14";
            } else if (tag === "بسته شده") {
              color = "#D9D9D9";
            } else {
              color = "";
            }
            return (
              <p lang="fa" role="text"
                key={tag}
                className="flex flex-row justify-center items-baseline"
              >
                {tag}
                <Badge className="mr-1" size="default" color={color}></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
    {
      title: "مجوز پاسخ",
      dataIndex: "answerPermission",
      key: "answerPermission",
      align: "center",
      filters: [
        {
          text: "بسته",
          value: true,
        },
        {
          text: "باز",
          value: false,
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.answerPermission === value,

      render: (answerPermission: boolean) => (
        <Space direction="horizontal">
          <Switch checked={answerPermission} size="small" defaultChecked />
        </Space>
      ),
    },
    {
      title: "",
      dataIndex: "key",
      align: "center",
      render: (key: number) => (
        <Link to={`/admin/tickets/viewTicket/${key}`}>
          <Button className="p-0" type="link">
            پاسخ
          </Button>
        </Link>
      ),
    },
  ];
  const sortedData = data.slice().sort((a, b) => {
    // Sort answerPermission users first
    if (a.condition && !b.condition) {
      return -1;
    } else if (!a.condition && b.condition) {
      return 1;
    }

    // If both are answerPermission or both are not answerPermission, sort based on other criteria
    // Here, I'm sorting based on the 'DateRecord' property as an example
    const dateA = new Date(a.DateMessage).getTime();
    const dateB = new Date(b.DateMessage).getTime();

    return dateA - dateB;
  });
  const getRowClassName = (record: DataType) => {
    return record.condition === "در انتظار پاسخ" ? "blue-row" : "";
  };
  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton HeaderTitle={"لیست تمام تیکت ها"} />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <CustomTable
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={sortedData}
          theme="primary"
        />
      </div>
    </div>
  );
};

export default AdminTickets;

// Types
interface DataType {
  key: React.Key;
  nameStore: string;
  subject: string;
  idUser: number;
  DateMessage: string;
  department: string;
  condition: string;
  answerPermission: boolean;
}