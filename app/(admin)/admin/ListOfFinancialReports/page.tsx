import React from "react";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { Parag } from "../../../components/tools";
import "../../../components/TableInputNote/TableInputNote.scss";
import CustomTable, { type CustomColumnType } from "../../../components/Table"; 

const Tag = React.lazy(() => import("antd/es/tag/index"));
const Badge = React.lazy(() => import("antd/es/badge/index"));
const ButtonComponent = React.lazy(() => import("../../../components/Button"));
const HeaderWithButton = React.lazy(() => import("../../../components/HeaderWithButton"));

const dataTable: DataType[] = [
  {
    key: 1,
    storeName: "نام فروشگاه 1",
    userName: "0394359878",
    dateBuy: "1400/00/00 - 12:00",
    paymentMethod: "هزینۀ پیامک اطلاع رسانی",
    kind: "برداشت",
    price: "50.000",
    condition: "موفق",
    trackingCode: "12345",
  },
  {
    key: 2,
    storeName: "نام فروشگاه 2",
    userName: "0394359878",
    dateBuy: "1401/00/00 - 02:21",
    paymentMethod: "هزینۀ پیامک مناسبتی",
    kind: "برداشت",
    price: "50.000",
    condition: "ناموفق",
    trackingCode: "12345",
  },
  {
    key: 3,
    storeName: "نام فروشگاه 3",
    userName: "0394359878",
    dateBuy: "1405/00/00 - 22:21",
    paymentMethod: "پرداخت مستقیم",
    kind: "واریز",
    price: "80.000",
    condition: "ناموفق",
    trackingCode: "12345",
  },
  {
    key: 4,
    storeName: "نام فروشگاه 4",
    userName: "0394359878",
    dateBuy: "1405/00/00 - 22:21",
    paymentMethod: "واریز به حساب",
    kind: "واریز",
    price: "100.000",
    condition: "موفق",
    trackingCode: "12345",
  },
];

const ListOfFinancialReports: React.FC = () => {
  // export excel
  const exportToExcel = async (dataSource: DataType[], columns: any[]) => {
    try {
      const { Workbook } = await import("exceljs");
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("لیست گزارشات مالی");

      // active right-to-left excel
      worksheet.views = [{ rightToLeft: true }];

      // Add column headers
      columns.forEach((column, index) => {
        worksheet.getCell(1, index + 1).value = column.title;
      });

      // Add data rows
      dataSource.forEach((row, rowIndex) => {
        columns.forEach((column, columnIndex) => {
          worksheet.getCell(rowIndex + 2, columnIndex + 1).value = row[
            column.dataIndex as DataIndex
          ] as string;
        });
      });

      // Generate the Excel file
      const buffer = await workbook.xlsx.writeBuffer();

      // Create a Blob from the buffer
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };

  const columns: CustomColumnType<DataType>[] = [
    {
      title: "نام فروشگاه",
      dataIndex: "storeName",
      key: "storeName",
      searchProps: true,
    },
    {
      title: "نام کاربری",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      searchProps: true,
    },
    {
      title: "تاریخ  و ساعت تراکنش",
      dataIndex: "dateBuy",
      key: "dateBuy",
      align: "center",
      DateRangeProps: true,
      sorter: (a: DataType, b: DataType) => -a.dateBuy.localeCompare(b.dateBuy),
    },
    {
      title: "شیوۀ پرداخت",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
      filters: [
        {
          text: "هزینۀ پیامک اطلاع رسانی",
          value: "هزینۀ پیامک اطلاع رسانی",
        },
        {
          text: "هزینۀ پیامک مناسبتی",
          value: "هزینۀ پیامک مناسبتی",
        },
        {
          text: "پرداخت مستقیم",
          value: "پرداخت مستقیم",
        },
        {
          text: "واریز به حساب",
          value: "واریز به حساب",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.paymentMethod.includes(value as string),
      render: (paymentMethod: string) => (
        <span>
          {[paymentMethod].map((tag) => {
            let color: string;
            if (tag === "پرداخت مستقیم") {
              color = "blue";
            } else if (tag === "واریز به حساب") {
              color = "pink";
            } else if (tag === "هزینۀ پیامک مناسبتی") {
              color = "volcano";
            } else if (tag === "هزینۀ پیامک اطلاع رسانی") {
              color = "orange";
            } else {
              color = "";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "نوع",
      dataIndex: "kind",
      align: "center",
      filters: [
        {
          text: "واریز",
          value: "واریز",
        },
        {
          text: "برداشت",
          value: "برداشت",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) =>
        record.kind.includes(value as string),
      render: (kind: string) => (
        <span>
          {[kind].map((tag) => {
            let color: string;
            if (tag === "واریز") {
              color = "green";
            } else if (tag === "برداشت") {
              color = "red";
            } else {
              color = "";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "مبلغ",
      dataIndex: "price",
      searchProps: true,
      sorter: (a, b) => -(+a.price - +b.price),
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
    <div className="flex flex-col items-center p-10 sm-max:!p-5 xl-max:w-full h-full gap-10">
      <HeaderWithButton
        HeaderTitle={`لیست کل تراکنشات مالی`}
        Button={
          <div className="flex flex-row-reverse justify-end">
            <Link to="/admin/ListOfFinancialReports/SystemDeposit">
              <ButtonComponent ButtonClass="bg-primary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center">
                <div className="flex justify-center flex-row-reverse items-center sm-max:text-[0.625rem]">
                  مشاهده واریزی ها{" "}
                </div>
              </ButtonComponent>
            </Link>
            <ButtonComponent
              onClick={() => exportToExcel(dataTable, columns)}
              ButtonClass="bg-white text-textColor text-xs ml-3 font-bold sm-max:p-3 h-11 flex justify-center items-center border border-solid border-green-800 gap-2"
            >
              <Parag Paragraph={"خروجی اکسل"} Pclass={""} />
              <FiDownload className="w-4 h-4" />
            </ButtonComponent>
          </div>
        }
      />
      <div className="container">
        <CustomTable
          columns={columns}
          dataSource={dataTable}
          theme="primary"
        />
      </div>
    </div>
  );
};

export default ListOfFinancialReports;

// Types
interface DataType {
  key: React.Key;
  storeName: string;
  userName: string;
  dateBuy: string;
  paymentMethod: string;
  kind: string;
  price: string;
  condition: string;
  trackingCode: string;
}

type DataIndex = keyof DataType;
