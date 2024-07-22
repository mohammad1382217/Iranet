import React from "react";
import { Link, useParams } from "react-router-dom";
const ButtonComponent = React.lazy(() => import("../../../../components/Button"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
import { FiDownload } from "react-icons/fi";
import { Parag } from "../../../../components/tools";
import CustomTable from "../../../../components/Table";
import type { CustomColumnType } from "../../../../components/Table";


export const dataTable = [
  {
    key: "1",
    date: "1401/01/01",
    hour: "12:21",
    price: "100000",
    Condition: ["موفق"],
    kindPay: ["پرداخت مستقیم"],
    reportCode: "123434",
  },
  {
    key: "2",
    date: "1200/01/01",
    hour: "10:21",
    price: "500000",
    Condition: ["ناموفق"],
    kindPay: ["واریز به حساب"],
    reportCode: "123434",
  },
];

const ViewListOfFinancialReport: React.FC = () => {
  const exportToExcel = async (dataSource: DataType[], columns: any[]) => {
    try {
      const { Workbook } = await import("exceljs");
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("جدول گزارشات فروش");

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

  const columns_UsersEntery: CustomColumnType<DataType>[] = [
    {
      title: "تاریخ",
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a: DataType, b: DataType) => -a.date.localeCompare(b.date),
      searchProps: true,
      // 
    },
    {
      title: "ساعت",
      dataIndex: "hour",
      align: "center",
      key: "hour",
      sorter: (a: DataType, b: DataType) => -a.hour.localeCompare(b.hour),
      searchProps: true,
      // 
    },
    {
      title: "مبلغ",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a: DataType, b: DataType) => -a.price.localeCompare(b.price),
      searchProps: true,
      // 
    },
    {
      title: "وضعیت",
      dataIndex: "Condition",
      key: "Condition",
      
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
      onFilter: (value: React.Key | boolean, record: DataType) => record.Condition.includes(value as string),
      render: (Condition: string[]) => (
        <span>
          {Condition.map((tag) => {
            let color: string;
            if (tag === "موفق") {
              color = "green";
            } else if (tag === "ناموفق") {
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
      title: "نوع پرداخت",
      dataIndex: "kindPay",
      key: "kindPay",
      
      align: "center",
      filters: [
        {
          text: "پرداخت مستقیم",
          value: "پرداخت مستقیم",
        },
        {
          text: "واریز به حساب",
          value: "واریز به حساب",
        },
      ],
      onFilter: (value: React.Key | boolean, record: DataType) => record.kindPay.includes(value as string),
      render: (kindPay: string[]) => (
        <span>
          {kindPay.map((tag) => {
            let color: string;
            if (tag === "پرداخت مستقیم") {
              color = "blue";
            } else if (tag === "واریز به حساب") {
              color = "pink";
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
      title: "کد رهگیری",
      dataIndex: "reportCode",
      align: "center",
      key: "reportCode",
      searchProps: true,
      // 
    },
  ];
  const { idstore } = useParams();

  return (
    <div>
      <div className="w-full bg-[#FAFAFA] flex flex-row md-max:items-start md-max:flex-col items-center justify-between p-4">
        <div className="flex flex-row  items-center justify-center">
          <p lang="fa" role="text" className="text-xl font-semibold text-textColor sm-max:text-base">
            لیست کل گزارشات مالی فروشگاه شمارۀ 2
          </p>
        </div>
        <div className="flex flex-row md-max:mt-4 md-max:w-full md-max:justify-end items-center justify-center gap-6">
          <ButtonComponent
            onClick={() => exportToExcel(dataTable, columns_UsersEntery)}
            ButtonClass="bg-white text-textColor text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center border border-solid border-green-800 gap-2"
          >
            <Parag Paragraph={"خروجی اکسل"} Pclass={""} />
            <FiDownload className="w-4 h-4" />
          </ButtonComponent>
          <Link to={`/admin/UserManagement/viewUser/${idstore}`}>
            <ButtonComponent ButtonClass="bg-primary text-xs font-bold sm-max:p-3 h-11 flex justify-center items-center">
              برگشت به نمایش کاربر
            </ButtonComponent>
          </Link>
        </div>
      </div>
      <div className="px-14 my-1 mt-10 sm-max:px-10 justify-between flex flex-col">
        <CustomTable
          className="mt-10"
          size="large"
          bordered
          dataSource={dataTable}
          columns={columns_UsersEntery}
          theme="primary"
        />
      </div>
    </div>
  );
};

export default ViewListOfFinancialReport;

// Types
interface DataType {
  key: React.Key;
  date: string;
  hour: string;
  price: string;
  Condition: string[];
  kindPay: string[];
  reportCode: string;
}

type DataIndex = keyof DataType;
