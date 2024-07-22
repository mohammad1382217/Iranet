import React from "react";
import { Link } from "react-router-dom";
import "../../../components/TableInputNote/TableInputNote.scss";
import { FiDownload } from "react-icons/fi";
import CustomTable, { type CustomColumnType } from "../../../components/Table";
const Button = React.lazy(() => import("antd/es/button/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Space = React.lazy(() => import("antd/es/space/index"));
const HeaderWithButton = React.lazy(
  () => import("../../../components/HeaderWithButton")
);

const dataTable: DataType[] = [
  {
    key: 1,
    nameStore: "فروشگاه شماره 1",
    dateSend: "1402/10/01 - 11:00",
    condition: "منتظر تایید اپراتور",
    sendMethod: "شماره",
  },
  {
    key: 2,
    nameStore: "فروشگاه شماره 2",
    dateSend: "1401/01/05 - 11:00",
    condition: "تایید شده در صف ارسال",
    sendMethod: "فایل",
  },
  {
    key: 3,
    nameStore: "فروشگاه شماره 3",
    dateSend: "1402/02/17 - 11:00",
    condition: "ارسال شده در انتظار گزارش",
    sendMethod: "گروه",
  },
  {
    key: 4,
    nameStore: "فروشگاه شماره 4",
    dateSend: "1403/05/09 - 11:00",
    condition: "پایان یافته",
    sendMethod: "انتخاب منطقه",
  },
  {
    key: 5,
    nameStore: "فروشگاه شماره 5",
    dateSend: "1404/08/06 - 11:00",
    condition: "نیاز به ویرایش متن",
    sendMethod: "کد پستی",
  },
  {
    key: 6,
    nameStore: "فروشگاه شماره 6",
    dateSend: "1405/05/03 - 11:00",
    condition: "منتظر تایید اپراتور",
    sendMethod: "پیام مناسبتی",
  },
];

const SmsSendingPanel: React.FC = () => {
  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "nameStore",
      key: "nameStore",
      searchProps: true,
    },
    {
      title: "شناسه ارسال",
      dataIndex: "",
      key: "",
      searchProps: true,
    },
    {
      title: "ارسال با..",
      dataIndex: "sendMethod",
      align: "center",
      filters: [
        {
          text: "شماره",
          value: "شماره",
        },
        {
          text: "فایل",
          value: "فایل",
        },
        {
          text: "گروه",
          value: "گروه",
        },
        {
          text: "انتخاب منطقه",
          value: "انتخاب منطقه",
        },
        {
          text: "کد پستی",
          value: "کد پستی",
        },
        {
          text: "پیام مناسبتی",
          value: "پیام مناسبتی",
        },
      ],
      onFilter: (value: boolean | React.Key, record: DataType) =>
        record.sendMethod.includes(value as string),
      render: (kind: string) => <Tag>{kind}</Tag>,
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      align: "center",
      filters: [
        {
          text: "منتظر تایید اپراتور",
          value: "منتظر تایید اپراتور",
        },
        {
          text: "تایید شده در صف ارسال",
          value: "تایید شده در صف ارسال",
        },
        {
          text: "ارسال شده در انتظار گزارش",
          value: "ارسال شده در انتظار گزارش",
        },
        {
          text: "پایان یافته",
          value: "پایان یافته",
        },
        {
          text: "نیاز به ویرایش متن",
          value: "نیاز به ویرایش متن",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.condition === value,
      render: (condition: string) => (
        <span>
          {[condition].map((tag) => {
            let color: string;
            if (tag === "منتظر تایید اپراتور") {
              color = "blue";
            } else if (tag === "تایید شده در صف ارسال") {
              color = "orange";
            } else if (tag === "ارسال شده در انتظار گزارش") {
              color = "green";
            } else if (tag === "پایان یافته") {
              color = "grey";
            } else if (tag === "نیاز به ویرایش متن") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
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
      title: "هزینه",
      dataIndex: "cost",
      align: "center",
      filters: [
        {
          text: "50000",
          value: "50000",
        },
        {
          text: "تایید شده در صف ارسال",
          value: "تایید شده در صف ارسال",
        },
        {
          text: "ارسال شده در انتظار گزارش",
          value: "ارسال شده در انتظار گزارش",
        },
        {
          text: "پایان یافته",
          value: "پایان یافته",
        },
        {
          text: "نیاز به ویرایش متن",
          value: "نیاز به ویرایش متن",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.condition === value,
      sorter: (a, b) => a.condition.localeCompare(b.condition),
      render: (condition: string) => (
        <span>
          {[condition].map((tag) => {
            let color: string;
            if (tag === "منتظر تایید اپراتور") {
              color = "blue";
            } else if (tag === "تایید شده در صف ارسال") {
              color = "orange";
            } else if (tag === "ارسال شده در انتظار گزارش") {
              color = "green";
            } else if (tag === "پایان یافته") {
              color = "grey";
            } else if (tag === "نیاز به ویرایش متن") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p
                lang="fa"
                role="text"
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
      title: "تاریخ  و ساعت ارسال",
      dataIndex: "dateSend",
      key: "dateSend",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.dateSend.localeCompare(b.dateSend),
    },
    {
      title: "عملیات",
      dataIndex: "key",
      align: "center",

      render: (index: number) => (
        <Space className="flex gap-4">
          <Link to={`/admin/SmsSendingPanel/viewSmsDetails/${index}`}>
            <Button className="p-0" type="link">
              ثبت گزارش
            </Button>
          </Link>
          <Link to={`/admin/SmsSendingPanel/viewSmsDetails/${index}`}>
            <Button className="p-0" type="link">
              تغییر وضعیت
            </Button>
          </Link>
          <Link to={`/admin/SmsSendingPanel/viewSmsDetails/${index}`}>
            <Button className="p-0" type="link">
              مشاهده
            </Button>
          </Link>
          <Link to={`/admin/SmsSendingPanel/viewSmsDetails/${index}`}>
            <Button className="p-0" type="link">
              <FiDownload className="w-6 h-6" />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full gap-10">
      <HeaderWithButton
        HeaderTitle={"لیست درخواست های ارسال"}
        Button={
          <></>
        }
      />
      <div className="container">
        <CustomTable columns={columns} dataSource={dataTable} theme="primary" />
      </div>
    </div>
  );
};

export default SmsSendingPanel;

// Types
interface DataType {
  key: React.Key;
  nameStore: string;
  dateSend: string;
  condition: string;
  sendMethod: string;
}
