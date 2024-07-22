import React from "react";
const Badge = React.lazy(() => import("antd/es/badge/index"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
import HeaderWithButton from "../../../components/HeaderWithButton";
import CustomTable, { CustomColumnType } from "../../../components/Table";

const data: DataType[] = [
  {
    key: "1",
    transactionType: "پیامک اطلاع رسانی",
    tariff: "تعرفه رایگان (12434 ریال)",
    price: "100,100",
    unit: "پیامک",
    remaining: "534,232,000",
    condition: "موفق",
    trackingCode:"03898725",
    dateRequest: "1400/00/00 - 12:21"
  },
  {
    key: "1",
    transactionType: "پیامک مناسبتی",
    tariff: "تعرفه رایگان (12434 ریال)",
    price: "100,100",
    unit: "پیامک",
    remaining: "534,232,000",
    condition: "موفق",
    trackingCode:"03898725",
    dateRequest: "1400/00/00 - 12:21",
  },
  {
    key: "1",
    transactionType:  "پرداخت مستقیم",
    tariff: "تعرفه رایگان (12434 ریال)",
    price: "100,100",
    unit: "پیامک",
    remaining: "534,232,000",
    condition: "موفق",
    trackingCode:"03898725",
    dateRequest: "1400/00/00 - 12:21",
  },
  {
    key: "1",
    transactionType: "واریز به حساب",
    tariff: "تعرفه رایگان (12434 ریال)",
    price: "100,100",
    unit: "پیامک",
    remaining: "534,232,000",
    condition: "موفق",
    trackingCode:"03898725",
    dateRequest: "1400/00/00 - 12:21",
  },
];

const FinancialReports: React.FC = () => {
  const columns: CustomColumnType<DataType>[] = [
    {
      title: "",
      dataIndex: "downUp",
      key: "downUp",
      width:"auto",
      align: "center",
      // sorter: (a, b) => +a.price - +b.price,
      render(value, record, index) {
        return index
      },
    },
    {
      title: "تاریخ  و ساعت تراکنش",
      dataIndex: "dateRequest",
      key: "dateRequst",
      align: "center",
      width:"15%",
      DateRangeProps: true,
      sorter: (a, b) => a.dateRequest.localeCompare(b.dateRequest),
      // render: (text) => <Link>{text}</Link>,
    },
    {
      title: "نوع تراکنش",
      dataIndex: "transactionType",
      key: "transactionType",
      align: "center",
      width:"10%",
      filters: [
        {
          text: "واریز به حساب",
          value: "واریز به حساب",
        },
        {
          text: "پیامک اطلاع رسانی",
          value: "پیامک اطلاع رسانی",
        },
        {
          text:  "پیامک مناسبتی",
          value:  "پیامک مناسبتی",
        },
        {
          text: "پرداخت مستقیم",
          value: "پرداخت مستقیم",
        },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.transactionType.includes(value as string),
      render: (transactionType: string) => (
        <span>
          {[transactionType].map((tag) => {
            let color: string;
            if (tag ===  "واریز به حساب") {
              color = "purple";
            } else if (tag ===  "پیامک اطلاع رسانی") {
              color = "gold";
            } else if (tag === "پیامک مناسبتی") {
              color = "volcano";
            } else if (tag === "پرداخت مستقیم") {
              color = "blue";
            } else {
              color = "";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "تعرفه",
      dataIndex: "tariff",
      key: "tariff",
      width:"10%",

      align: "center",
      searchProps: true,
      sorter: (a, b) => +a.tariff - +b.tariff,
    },
    {
      title: "مبلغ",
      dataIndex: "price",
      key: "price",
      width:"10%",
      align: "center",
      // searchProps: true,
      sorter: (a, b) => +a.price - +b.price,
    },
    {
      title: "واحد",
      dataIndex: "unit",
      key: "unit",
      width:"10%",

      align: "center",
      filters: [
        {
          text: "پیامک",
          value: "پیامک",
        },
      ],
      onFilter: (value: React.Key | boolean, record) =>
        record.transactionType.includes(value as string),
      render: (transactionType: string) => (
        <span>
          {[transactionType].map((tag) => {
            let color: string;
            if (tag === "پیامک") {
              color = "orange";
            } else {
              color = "blue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "مانده (پیامک)",
      dataIndex: "remaining",
      key: "remaining",
      align: "center",
      width:"10%",
      sorter: (a, b) => +a.remaining - +b.remaining,
    },
    {
      title: "وضعیت",
      dataIndex: "condition",
      align: "center",
      filters: [
        {
          text: "موفق",
          value: "موفق",
        },
        {
          text: "ناموفق",
          value: "ناموفق",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.condition === value,
      render: (condition: string) => (
        <span>
          {[condition].map((tag) => {
            let color: string;
            if (tag === "موفق") {
              color = "green";
            } else if (tag === "ناموفق") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <p lang="fa" role="text"
                key={condition}
                className="flex flex-row justify-center items-baseline"
              >
                {condition}
                <Badge className="mr-1" size="default" color={color}></Badge>
              </p>
            );
          })}
        </span>
      ),
    },
    {
      title: "کد رهگیری",
      dataIndex: "trackingCode",
      align: "center",
      searchProps: true,
    },
  ];

  return (
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full">
      <HeaderWithButton HeaderTitle={"لیست کل سوابق تراکنشات مالی"} />
      <div className="mt-10 mb-5 w-full p-0 bg-cover rounded-lg md-max:mb-3 hover:cursor-pointer">
        <CustomTable
          bordered
          size="large"
          dataSource={data}
          columns={columns}
          theme={"secondary"}
        />
      </div>
    </div>
  );
};

export default FinancialReports;

// Types
interface DataType {
  key: React.ReactNode;
  transactionType: string;
  tariff: string;
  price: string;
  unit: string;
  remaining: string;
  condition: string;
  dateRequest: string;
  trackingCode: string;
}
