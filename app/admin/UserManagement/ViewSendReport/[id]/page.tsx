import React from "react";
import { Link, useParams } from "react-router-dom";
const ButtonComponent = React.lazy(() => import("../../../../components/Button"));
const Tag = React.lazy(() => import("antd/es/tag/index"));
const Input = React.lazy(() => import( "antd/es/input/index"));
const Button = React.lazy(() => import( "antd/es/button/index"));
const Textarea = React.lazy(() => import( "../../../../components/TextArea"));
import Progress from "antd/es/progress/index";
import { FiDownload } from "react-icons/fi";
import { Parag } from "../../../../components/tools";
import CustomTable, { CustomColumnType } from "../../../../components/Table";
const Modal = React.lazy(() => import("../../../../components/Modal"));
import {
  useSelector,
  useDispatch, 
  appSlice,
  selectShowModals,
} from "../../../../../lib/redux";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { selectViewSendReportData } from "../../../../../lib/redux/slices/ViewSendReportSlice";
import "./tableresponsive.scss";

const ViewSendReport: React.FC = () => {
  const exportToExcel = async (dataSource: DataType[], columns: any[]) => {
    try {
      const { Workbook } = await import("exceljs");
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("جدول گزارشات ارسال");

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
  const dispatch = useDispatch();
  const showModals = useSelector(selectShowModals);
  const dataTable = useSelector(selectViewSendReportData);

  const columns_UsersEntery: CustomColumnType<DataType>[] = [
    {
      title: "تاریخ و ساعت درخواست",
      dataIndex: "dateSend",
      key: "date",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.dateSend.localeCompare(b.dateSend),
    },
    {
      title: "تاریخ و ساعت ارسال",
      dataIndex: "dateSend",
      key: "date",
      align: "center",
      DateRangeProps: true,
      sorter: (a, b) => a.dateSend.localeCompare(b.dateSend),
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
      title: "درصد موفقیت",
      dataIndex: "successPresent",
      align: "center",
      // filters: [
      //   {
      //     text: "موفقیت بالای 90 درصد",
      //     value: "موفقیت بالای 90 درصد",
      //   },
      // ],
      // onFilter: (value: boolean | React.Key, record: DataType) => record.sendMethod.includes(value as string),
      render: (successPresent: string) => (
        <Progress
          percent={+successPresent}
          status={
            +successPresent < 20
              ? "exception"
              : "normal" && +successPresent > 90
              ? "success"
              : "normal"
          }
        />
      ),
    },
    {
      title: "هزینه",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (b, a) =>
        parseFloat(a.price.replace(/,/g, "")) -
        parseFloat(b.price.replace(/,/g, "")),
      searchProps: true,
    },
    {
      title: "جزئیات بیشتر",
      dataIndex: "key",
      align: "center",
      width: "30%",
      render: (index: number) => (
        <Button
          className="p-0"
          type="link"
          onClick={() => {
            console.log(index);
            dispatch(appSlice.actions.setShowModals("showModalOrigin"));
          }}
        >
          مشاهده
        </Button>
      ),
    },
  ];
  const { idstore } = useParams();

  return (
    <div>
      <div className="w-full bg-[#FAFAFA] flex flex-row md-max:items-start md-max:flex-col items-center justify-between p-4">
        <div className="flex flex-row  items-center justify-center">
          <p lang="fa" role="text" className="text-xl font-semibold text-textColor sm-max:text-base">
            لیست کل گزارشات ارسال فروشگاه شمارۀ 2
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
      {/* رسپانسیو مدل 2 */}
      {/* <div className="w-full bg-[#FAFAFA] flex sm-max:flex-row items-center justify-between p-4">
        <div className="flex flex-row sm-max:flex-col items-center justify-center">
          <p lang="fa" role="text" className="text-xl md-max:text-base font-semibold text-textColor">
            لیست کل گزارشات ارسال فروشگاه شمارۀ 2
          </p>
        </div>
        <div className="flex flex-row sm-max:flex-col items-center justify-center gap-6 md-max:gap-2">
          <ButtonComponent
            onClick={() => exportToExcel(dataTable, columns_UsersEntery)}
            ButtonClass="bg-white text-textColor text-xs font-bold sm-max:p-3 md-max:px-2  h-11 flex justify-center items-center border border-solid border-green-800 gap-2"
          >
            <Parag Paragraph={"خروجی اکسل"} Pclass={""} />
            <FiDownload className="w-4 h-4" />
          </ButtonComponent>
          <Link to={`/admin/UserManagement/viewUser/${idstore}`}>
            <ButtonComponent ButtonClass="bg-primary text-xs font-bold sm-max:p-3 md-max:px-2 h-11 flex justify-center items-center">
              برگشت به نمایش کاربر
            </ButtonComponent>
          </Link>
        </div>
      </div> */}
      <div className="px-14 my-1 mt-10 sm-max:px-10 justify-between flex flex-col">
        <CustomTable
          className="w-full"
          size="large"
          bordered
          dataSource={dataTable}
          columns={columns_UsersEntery}
          theme="primary"
        />
      </div>
      <Modal
        modalClass="!min-w-[30%] sm-max:!min-w-[90%]"
        modalHeader={"جزئیات ارسال پیامک"}
        modalHeaderClass="mt-3 mb-0 pb-0"
        modalBody={
          <div>
            <Textarea
              TextAreaClass="p-3 mt-1"
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              Placeholder="متن پیامک"
            />
            <div className="flex flex-row ">
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3">
                تعداد کاراکتر ها:
                <Tag color="#2196F3" className="mr-3 rounded-lg ">
                  {/* {text.length} */}0
                </Tag>
              </p>
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3 mr-3">
                تعداد پیامک:
                <Tag color="#2196F3" className="mr-3 rounded-lg ">
                  3
                </Tag>
              </p>
            </div>
            <Input
              className="p-3 mt-1"
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              placeholder="تعداد شماره ها"
            />
            <div className="flex flex-row ">
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3">
                تعداد ارسال موفق:
                <Tag color="#43A047" className="mr-3 rounded-lg ">
                  20
                </Tag>
              </p>
              <p lang="fa" role="text" className="text-blue-gray-600 text-base font-normal mb-2 mt-3 mr-3">
                تعداد ارسال ناموفق:
                <Tag color="#E53935" className="mr-3 rounded-lg ">
                  3
                </Tag>
              </p>
            </div>
            <Input
              className="p-3 mt-1"
              // value={text}
              onChange={() => {
                // dispatch(
                //   StoreManagementsSlice.actions.setConfirmation(confirmation)
                // );
                // dispatch(StoreManagementsSlice.actions.setText(e.target.value));
                // dispatch(StoreManagementsSlice.actions.setGroupName(groupName));
              }}
              placeholder="نوع شمارۀ فرستنده"
            />
          </div>
        }
        modalFooterClass="flex justify-between items-center -mt-3"
        modalFooter={
          <div className="w-full flex flex-col justify-center">
            <Button
              onClick={() => {
                dispatch(appSlice.actions.setShowModals("showModalOrigin"));
              }}
              type="link"
              className="flex items-center justify-center mx-auto"
              icon={
                <HiOutlineArrowCircleRight
                  className={"h-3.5 w-3.5 mx-auto text-[#E53935]"}
                />
              }
            >
              <span className="text-sm text-textColor font-medium">
                برگشت به گزارش فعالیت{" "}
              </span>
            </Button>
          </div>
        }
        Open={showModals.showModalOrigin}
        HandleOpen={() => {
          dispatch(appSlice.actions.setShowModals("showModalOrigin"));
        }}
      />
    </div>
  );
};

export default ViewSendReport;

// Types
interface DataType {
  key: React.Key;
  dateRequest: string;
  dateSend: string;
  sendMethod: string;
  price: string;
  successPresent: number;
}

type DataIndex = keyof DataType;
